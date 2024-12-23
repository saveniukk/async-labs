const asyncFind = (array, asyncCallback, finalCallback) => {
    let index = 0;

    const processNext = () => {
        const element = array[index];

        if (index >= array.length) {
            return finalCallback(undefined);
        }

        asyncCallback(element, index, array, (error, result) => {
            if (error) {
                return finalCallback(error);
            }
            if (result) {
                return finalCallback(null, element);
            }
            
            index++;
            processNext();
        });
    }
    processNext();
}

//demo case
const demo = () => {
    const data = [-10, 2, 3, 4, 5,];

    const isGreaterThanThree = (num, index, array, callback) => {
        setTimeout(() => {
            callback(null, num > 3);
        }, 200);
    };

    asyncFind(data, isGreaterThanThree, (error, result) => {
        console.log(`Error: ${error}, Result: ${result}`)
    });
}

demo();
