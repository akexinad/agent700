import { validateInput } from "../validations";

// jest.mock("../utils/error.ts");
// const mockedDependency = <jest.Mock<typeof throwError>>throwError;

describe("the input validator", () => {
    it("should return an empty array if the input consists of 0's and 1's separated by a single space", () => {
        const inputA = "0 1 0 1 0 1 0 1 1 1 1 0 0 0";

        const validateA = validateInput(inputA);

        expect(validateA.length).toBe(0);
    });

    it("should return an array of invalid items if the inputs are not spaced correctly or consist of more than 0's and 1's", () => {
        const inputA = "0   1 01 00 av foo bar";
        const inputB = "      0 1 0 1  0 1 0 1";
        const inputC =
            "   -1     0 1 0 1 -0 1 0 1 '' & # % @ #* ) !  {  <  > >  }   ";
        const inputD = "          0 1 0 1 0 1 0 1 1 1 1 0 0 0      ";

        const validateA = validateInput(inputA);
        const validateB = validateInput(inputB);
        const validateC = validateInput(inputC);
        const validateD = validateInput(inputD);

        expect(validateA.length).toBeGreaterThan(0);
        expect(validateB.length).toBeGreaterThan(0);
        expect(validateC.length).toBeGreaterThan(0);
        expect(validateD.length).toBeGreaterThan(0);
    });
});
