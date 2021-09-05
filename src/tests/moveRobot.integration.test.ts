import { moveRobot } from "../commands";
import { RobotData } from "../types";
import { createCommandList } from "../utils/createCommandList";
import { throwError } from "../utils/error";
import {
    validateRobotOrientation,
    validateRobotPositioning
} from "../validations";

jest.mock("../validations.ts", () => {
    return {
        validateRobotPositioning: jest.fn(),
        validateRobotOrientation: jest.fn()
    };
});

jest.mock("../utils/error", () => {
    return {
        throwError: jest.fn()
    };
});

const mockData: RobotData = {
    orientation: "NORTH",
    position: [0, 0],
    checkPointCount: 0,
    checkPoints: [
        {
            number: "one",
            coordinate: [5, 5],
            passed: false
        },
        {
            number: "two",
            coordinate: [10, 10],
            passed: false
        },
        {
            number: "three",
            coordinate: [15, 15],
            passed: false
        }
    ]
};

afterEach(() => {
    jest.clearAllMocks();
    jest.resetAllMocks();
});

describe("the moveRobot command and integration", () => {
    it("should move the robot through all checkpoints and to the destination with no errors", () => {
        const commandList = createCommandList(
            "0 1 0 1 0 1 0 1 0 1 0 0 1 0 1 0 1 0 1 0 1 1 1 0 1 0 1 0 1 0 1 0 1 0 0 1 0 1 0 1 0 1 0 1 1 1 0 1 0 1 0 1 0 1 0 1 0 0 1 0 1 0 1 0 1 0 1 1 1 0 1 0 1 0 1 0 1 0 1 0 0 1 0 1 0 1 0 1 0 1"
        );

        moveRobot(mockData, commandList);

        expect(validateRobotPositioning).toHaveBeenCalledTimes(40);
        expect(validateRobotOrientation).toHaveBeenCalledTimes(10);
        expect

        expect(throwError).not.toHaveBeenCalled();
    });

});
