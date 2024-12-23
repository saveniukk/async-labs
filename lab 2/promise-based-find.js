const asyncFind = (array, predicate) => {
    return new Promise((resolve, reject) => {
        const processNext = (index) => {
            if (index >= array.length) {
                return resolve(undefined);
            }

            predicate(array[index], index, array)
                .then((result) => {
                    if (result) {
                        resolve(array[index]);
                    } else {
                        processNext(index + 1);
                    }
                })
                .catch((error) => {
                    reject(error);
                });
        };

        processNext(0);
    });
};

const demo = () => {
    const data = [-10, 2, 3, 4, 5];

    const isGreaterThanThree = (num) => {
        return new Promise((resolve) => {
            setTimeout(() => {
                resolve(num > 3);
            }, 100);
        });
    };

    asyncFind(data, isGreaterThanThree)
        .then((result) => {
            if (result !== undefined) {
                console.log("Found:", result);
            } else {
                console.log("No element found.");
            }
        })
        .catch((error) => {
            console.error("Error:", error);
        });
};

demo();
