const { Observable } = require('rxjs');

const messageObservable = new Observable((subscriber) => {
    const intervalId = setInterval(() => {
        if (Math.random() < 0.1) {
            const error = 'Random error';
            console.log(`[Sender]: Error: ${error}`);
            subscriber.error(error);
            return;
        }

        const message = `Message sent at ${new Date().toISOString()}`;
        console.log(`[Sender]: ${message}`);
        subscriber.next(message);
    }, 2000);

    return () => {
        clearInterval(intervalId);
        console.log('[Sender]: Cleanup completed');
    };
});

function receiverA() {
    messageObservable.subscribe({
        next: (msg) => console.log(`[Receiver A]: Received: ${msg}`),
        error: (err) => console.log(`[Receiver A]: Error: ${err}`),
        complete: () => console.log('[Receiver A]: Stream completed'),
    });
}

function receiverB() {
    messageObservable.subscribe({
        next: (msg) => console.log(`[Receiver B]: Received: ${msg}`),
        error: (err) => console.log(`[Receiver B]: Error: ${err}`),
        complete: () => console.log('[Receiver B]: Stream completed'),
    });
}

receiverA();
receiverB();
