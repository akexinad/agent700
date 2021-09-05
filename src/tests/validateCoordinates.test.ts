import { RobotData } from "../types";
import { DESTINATION } from "../utils/constants";
import { throwError } from "../utils/error";
import { validateRobotPositioning } from "../validations";

jest.mock("../utils/error", () => {
    return {
        throwError: jest.fn()
    };
});

const mockExit = jest
    .spyOn(process, "exit")
    .mockImplementation((_?: number) => undefined as never);

const mockDataNoCheckpoints: RobotData = {
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

const mockDataOneCheckpoint: RobotData = {
    orientation: "NORTH",
    position: [0, 0],
    checkPointCount: 1,
    checkPoints: [
        {
            number: "one",
            coordinate: [5, 5],
            passed: true
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

const mockDataTwoCheckpoints: RobotData = {
    orientation: "NORTH",
    position: [0, 0],
    checkPointCount: 2,
    checkPoints: [
        {
            number: "one",
            coordinate: [5, 5],
            passed: true
        },
        {
            number: "two",
            coordinate: [10, 10],
            passed: true
        },
        {
            number: "three",
            coordinate: [15, 15],
            passed: false
        }
    ]
};

const mockDataAllCheckpoints: RobotData = {
    orientation: "NORTH",
    position: [0, 0],
    checkPointCount: 3,
    checkPoints: [
        {
            number: "one",
            coordinate: [5, 5],
            passed: true
        },
        {
            number: "two",
            coordinate: [10, 10],
            passed: true
        },
        {
            number: "three",
            coordinate: [15, 15],
            passed: true
        }
    ]
};

const [destX, destY] = DESTINATION;

/**
 * For some reason the mock fucntion calls are not clearing correctly
 */

afterEach(() => {
    jest.clearAllMocks();
    jest.resetAllMocks();
});

describe("the coordinate validator", () => {
    it("should exit with error as robot is out of bounds", () => {
        validateRobotPositioning(mockDataNoCheckpoints, [destX + 1, 19]);

        expect(throwError).toHaveBeenCalledTimes(1);
        expect(mockExit).toHaveBeenCalledTimes(1);
    });

    it("should exit with error as robot is out of bounds", () => {
        validateRobotPositioning(mockDataNoCheckpoints, [-1, -1]);

        expect(throwError).toHaveBeenCalledTimes(1);
        expect(mockExit).toHaveBeenCalledTimes(1);
    });

    it("should exit with error as robot did not go through the check points before arriving at the destination and it should not return data.", () => {
        const data = validateRobotPositioning(mockDataNoCheckpoints, [
            destX,
            destY
        ]);

        expect(throwError).toHaveBeenCalledTimes(1);
        expect(mockExit).toHaveBeenCalledTimes(1);

        expect(data).toBeUndefined();
    });

    it("should exit with an error since only one checkpoint has been passed and it should not return data.", () => {
        const data = validateRobotPositioning(mockDataOneCheckpoint, [
            destX,
            destY
        ]);

        expect(throwError).toHaveBeenCalledTimes(1);
        expect(mockExit).toHaveBeenCalledTimes(1);

        expect(data).toBeUndefined();
    });

    it("should exit with an error since only two checkpoint has been passed and it should not return data.", () => {
        const data = validateRobotPositioning(mockDataTwoCheckpoints, [
            destX,
            destY
        ]);

        expect(throwError).toHaveBeenCalledTimes(1);
        expect(mockExit).toHaveBeenCalledTimes(1);

        expect(data).toBeUndefined();
    });

    it("should exit with no error since all checkpoints has been passed", () => {
        validateRobotPositioning(mockDataAllCheckpoints, [destX, destY]);

        expect(throwError).not.toHaveBeenCalled();
        expect(mockExit).toHaveBeenCalledTimes(1);
    });

    it("should exit with no error and increase the checkpoint count by 1", () => {
        const data = validateRobotPositioning(mockDataNoCheckpoints, [5, 5]);

        expect(throwError).not.toHaveBeenCalled();
        expect(data.checkPointCount).toBe(1);
        expect(data.checkPoints[0].passed).toBeTruthy();
    });

    it("should exit with no error and increase the checkpoint count by 2", () => {
        const data = validateRobotPositioning(mockDataNoCheckpoints, [10, 10]);

        expect(throwError).not.toHaveBeenCalled();
        expect(data.checkPointCount).toBe(2);
        expect(data.checkPoints[1].passed).toBeTruthy();
    });

    it("should exit with no error and increase the checkpoint count by 3", () => {
        const data = validateRobotPositioning(mockDataNoCheckpoints, [15, 15]);

        expect(throwError).not.toHaveBeenCalled();
        expect(data.checkPointCount).toBe(3);
        expect(data.checkPoints[2].passed).toBeTruthy();
    });
});
