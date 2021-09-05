import rl from "readline-sync";
import { RobotData } from "./types";
import { COMPASS, DESTINATION } from "./utils/constants";
import { createCommandList } from "./utils/createCommandList";
import { distanceCalculator } from "./utils/distanceCalculator";
import { throwError } from "./utils/error";
import {
    validateRobotPositioning,
    validateInput,
    validPassword,
    validateRobotOrientation
} from "./validations";

export const initialCmd = (data: RobotData): void => {
    const input = rl.question("Move Robot \n> ").trim();

    if (validPassword(input)) {
        showPositionDetails(data);

        return initialCmd(data);
    }

    const invalidCharacters = validateInput(input);

    if (invalidCharacters.length) {
        throwError(
            "Robot only accepts initial command in the from of '0' or '1'"
        );

        return initialCmd(data);
    }

    const commandList = createCommandList(input);

    moveRobot(data, commandList);

    initialCmd(data);
};

export const moveRobot = (data: RobotData, commandList: string[]): RobotData => {
    commandList.forEach((command) => {
        const { position, orientation } = data;
        const [x, y] = position;

        if (command === "q") {
            process.exit();
        }

        if (command === "01") {
            const newCoords: [number, number] = [
                x + COMPASS[orientation][0],
                y + COMPASS[orientation][1]
            ];

            validateRobotPositioning(data, newCoords);
        }

        if (command === "0" || command === "1") {
            validateRobotOrientation(data, command);
        }
    });

    return data;
};

const showPositionDetails = (data: RobotData) => {
    const [destX, destY] = DESTINATION
    
    const { checkPointCount, position } = data;
    const [x, y] = position;
    const distanceFromBase = distanceCalculator(x, y);
    const distanceToDestination = distanceCalculator(destX - x, destY - y);

    console.log(
        `
        Current Coordinates:        ${position}
        No. of checkpoints reached: ${checkPointCount}
        Distance from base:         ${distanceFromBase}
        Distance to destination:    ${distanceToDestination}
        `
    );
};
