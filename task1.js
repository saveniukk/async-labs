asyncFind = (array, asyncCallback, finalCallback) => {
    let index = 0;

    processNext = () => {
        if (index >= array.length) {
            return finalCallback(undefined);
        }

        const element = array[index];
        asyncCallback(element, index, array, (error, result) => {
            if (error) {
                return finalCallback(error);
            }

            if (result) {
                finalCallback(null, element);
            } else {
                index++;
                processNext();
            }
        });
    }

    processNext();
}

//demo case
demo = () => {
    const data = [-10, 2, 3, 4, 5,];

    const isGreaterThanThree = (num, index, array, callback) => {
        setTimeout(() => {
            callback(null, num > 3);
        }, 200);
    };

    console.log("Finding element greater than 3...");
    asyncFind(data, isGreaterThanThree, (error, result) => {
        console.log(`Error: ${error}, Result: ${result}`)
    });
}

demo();