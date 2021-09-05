/**
 * I made the assumption that using pythagoras was adeqaute to calculate
 * distance.
 * 
 * @returns An integer calculated using pythagoras' theorem.
 */
export const distanceCalculator = (x: number, y: number): number => {
    return Math.round(Math.sqrt(Math.pow(x, 2) + Math.pow(y, 2)));
};
