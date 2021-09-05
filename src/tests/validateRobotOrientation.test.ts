import { RobotData } from "../types";
import { validateRobotOrientation } from "../validations";

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

describe("the robot orientation validator", () => {
    it("should rotate the robot so it's facing south, then back to north", () => {
        const data = validateRobotOrientation(mockData, "1");

        expect(data.orientation).toBe("SOUTH");

        validateRobotOrientation(data, "1");

        expect(data.orientation).toBe("NORTH");
    });

    it("should rotate the robot so it's facing east, then west then back to east", () => {
        const data = validateRobotOrientation(mockData, "0");

        expect(data.orientation).toBe("EAST");

        validateRobotOrientation(data, "0");

        expect(data.orientation).toBe("WEST");

        validateRobotOrientation(data, "0");

        expect(data.orientation).toBe("EAST");
    });
});
