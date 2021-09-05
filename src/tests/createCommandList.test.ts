import { createCommandList } from "../utils/createCommandList";

describe("the command list creator", () => {
    it("should create a list of commands that move the robot.", () => {
        const commandList = createCommandList("0 1 0 1 0 1 0 1");

        expect(commandList.length).toEqual(4);
    });

    it("should create a list of commands that rotate the robot.", () => {
        const commandList = createCommandList("1 1 1 1");

        expect(commandList.length).toEqual(4);
    });

    it("should create a list of commands that rotate the robot.", () => {
        const commandList = createCommandList("0 0 0 0");

        expect(commandList.length).toEqual(4);
    });

    it("shoud create a total of 50 commands that takes the robot through every checkpoint and to the destination", () => {
        const commandList = createCommandList(
            "0 1 0 1 0 1 0 1 0 1 0 0 1 0 1 0 1 0 1 0 1 1 1 0 1 0 1 0 1 0 1 0 1 0 0 1 0 1 0 1 0 1 0 1 1 1 0 1 0 1 0 1 0 1 0 1 0 0 1 0 1 0 1 0 1 0 1 1 1 0 1 0 1 0 1 0 1 0 1 0 0 1 0 1 0 1 0 1 0 1"
        );

        expect(commandList.length).toEqual(50);
    });
});
