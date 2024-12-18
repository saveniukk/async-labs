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