/**
 * A funciton using a recursive method to check each item in the array and
 * compare it to the item on it's right.
 * 
 * After the comparison, the item is then shifted off the array, and the 
 * updated array is passed back into the function where the comparisons are
 * repeated.
 * 
 * @param str After validation the string argument passed to this function will just be single spaced 1's and 0's.
 * @returns an array of robot commands. Ex ["01" "01" "0" "1"]
 */
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
