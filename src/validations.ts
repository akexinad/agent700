import { RobotData } from "./types";
import { DESTINATION, PASSWORD } from "./utils/constants";
import { throwError } from "./utils/error";

export const validateInput = (input: string) => {
    const inputArray = input.split(" ");

    const invalidChars = inputArray.filter((item) => {
        /**
         * Strange JS quirk. The filter method doesn't
         * pick up empty spaces.
         */
        if (item === "") {
            return [""];
        }

        if (+item > 1 || +item < 0 || isNaN(+item) || item.length > 1) {
            return item;
        }
    });

    return invalidChars;
};

export const validPassword = (input: string) => {
    if (input === PASSWORD) return true;

    return false;
};

export const validateRobotPositioning = (
    data: RobotData,
    coordinates: [number, number]
): RobotData => {
    const [x, y] = coordinates;

    const [destX, destY] = DESTINATION;

    if (x === destX && y === destY && data.checkPointCount === 3) {
        console.log(
            "SUCCESS: All checkpoints have been passed. MISSION ACCOMPLISHED"
        );

        data.position = [x, y];

        return process.exit();
    }

    if (x === destX && y === destY && data.checkPointCount < 3) {
        throwError(
            "Checkpoints have been missed and enemy has been alerted. Robot has been destroyed."
        );

        return process.exit();
    }

    if (x < 0 || x > destX) {
        throwError("Robot Lost. Will self destructed");

        return process.exit();
    }

    if (y < 0 || y > destY) {
        throwError("Robot Lost. Will self destructed");

        return process.exit();
    }

    data.checkPoints.map((checkPoint) => {
        const [checkPointX, checkPointY] = checkPoint.coordinate;

        if (x === checkPointX && y === checkPointY) {
            checkPoint.passed = true;

            data.checkPointCount += 1;

            console.log(
                `SUCCESS: checkpoint number ${checkPoint.number} has been reached!`
            );
        }

        data.position = [x, y];

        return data;
    });

    return data;
};

export const validateRobotOrientation = (data: RobotData, command: string) => {
    const { orientation } = data;

    if (command === "0") {
        if (orientation === "NORTH" || orientation === "WEST") {
            data.orientation = "EAST";
        } else {
            data.orientation = "WEST";
        }
    }

    if (command === "1") {
        if (orientation === "WEST" || orientation === "SOUTH") {
            data.orientation = "NORTH";
        } else {
            data.orientation = "SOUTH";
        }
    }

    return data;
};
