const asyncFind = async (array, predicate) => {
    for (let index = 0; index < array.length; index++) {
        const element = array[index];
        const result = await Promise.resolve(predicate(element, index, array));
        if (result) {
            return element;
        }
    }
    return undefined;
};

const demo = () => {
    const data = [-10, 2, 3, 4, 5];

    const isGreaterThanThree = (num) => {
        return new Promise((resolve) => {
            setTimeout(() => {
                resolve(num < 3);
            }, 100);
        });
    };

    console.log("Finding element lower than 3...");
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
