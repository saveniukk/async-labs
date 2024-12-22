const asyncFind = (array, predicate, signal) => {
    return new Promise((resolve, reject) => {
        const element = array[index];
        
        if (signal?.aborted) {
            return reject(new Error('Operation aborted'));
        }

        const processNext = (index) => {
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