const asyncFind = (array, predicate) => {
    return new Promise((resolve, reject) => {
        const processNext = (index) => {
            const element = array[index];

            if (index >= array.length) {
                return resolve(undefined);
            }

            Promise.resolve(predicate(element, index, array))
                .then((result) => {
                    if (result) {
                        resolve(element);
                    } else {
                        processNext(index + 1);
                    }
                })
                .catch(reject);
        };

        processNext(0);
    });
};


const demo = () => {
    const data = [-10, 2, 3, 4, 5,];

    const isGreaterThanThree = (num) => {
        return new Promise((resolve) => {
            setTimeout(() => {
                resolve(num > 3);
            }, 100);
        });
    };

    console.log("Finding element greater than 3...");
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
}

demo();
