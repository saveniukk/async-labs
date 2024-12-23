const asyncFind = (array, predicate, signal) => {
    return new Promise((resolve, reject) => {

        if (signal?.aborted) {
            return reject(new Error('Operation aborted'));
        }

        const processNext = (index) => {
            const element = array[index];
            
            if (index >= array.length) {
                return resolve(undefined);
            }

            Promise.resolve(predicate(element, index, array))
                .then((result) => {
                    if (signal?.aborted) {
                        return reject(new Error('Operation aborted'));
                    }

                    if (result) {
                        resolve(element);
                    } else {
                        processNext(index + 1);
                    }
                })
                .catch(reject);
        };

        processNext(0);

        if (signal) {
            signal.addEventListener('abort', () => {
                reject(new Error('Operation aborted'));
            });
        }
    });
};

const demo = () => {
    const controller = new AbortController();
    const { signal } = controller;
    const data = [-10, 2, 3, 4, 5];

    const isGreaterThanThree = (num) => {
        return new Promise((resolve) => {
            setTimeout(() => {
                resolve(num > 3);
            }, 100);
        });
    };

    asyncFind(data, isGreaterThanThree, signal)
        .then((result) => {
            if (result !== undefined) {
                console.log("Found:", result);
            } else {
                console.log("No element found.");
            }
        })
        .catch((error) => {
            console.error("Error:", error.message);
        });


    setTimeout(() => {
        controller.abort();
    }, 250);
};

demo();
