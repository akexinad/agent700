export const createCommandList = (str: string) => {
    const split = str.split(" ");

    const createCmds = (array: string[], result: string[] = []): string[] => {
        if (!array.length) {
            return result;
        }

        if (array.length === 1) {
            result.push(array[0]);
            array.shift();
            return result;
        }

        if (array[0] === "1") {
            result.push(array[0]);
            array.shift();
            return createCmds(array, result);
        }

        if (array[0] === array[1]) {
            result.push(array[0]);
            array.shift();
            return createCmds(array, result);
        }

        if (array[0] !== array[1]) {
            result.push(array[0] + array[1]);
            array.shift();
            array.shift();
            return createCmds(array, result);
        }

        return createCmds(array, result);
    };

    return createCmds(split);
};
