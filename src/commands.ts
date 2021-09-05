import rl from "readline-sync";
import { RobotData } from "./types";
import { COMPASS, DESTINATION } from "./utils/constants";
import { createCommandList } from "./utils/createCommandList";
import { distanceCalculator } from "./utils/distanceCalculator";
import { throwError } from "./utils/error";
import {
    validateRobotPositioning,
    validateInput,
    validatePassword,
    validateRobotOrientation
} from "./validations";

/**
 * This function will validate the input and check whether it's an 
 * attampted password or command.
 * 
 * @param data The robot's orientation, position and checkpoint progress.
 */
export const initialCommand = (data: RobotData): void => {
    const input = rl.question("Move Robot \n> ").trim();

    const password = validatePassword(input);
    
    if (password) {
        showPositionDetails(data);

        return initialCommand(data);
    }

    const invalidCharacters = validateInput(input);

    if (invalidCharacters.length) {
        throwError(
            "Robot only accepts initial command in the from of '0' or '1'"
        );

        return initialCommand(data);
    }

    const commandList = createCommandList(input);

    moveRobot(data, commandList);

    initialCommand(data);
};

/**
 * 
 * @param data The robot's orientation, position and checkpoint progress.
 * @param commandList A list of commands. Use createCommandList to make command array.
 * @returns Updated data of the robots orientation, position and checkpoint progress.
 */
export const moveRobot = (data: RobotData, commandList: string[]): RobotData => {
    commandList.forEach((command) => {
        const { position, orientation } = data;
        const [x, y] = position;

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

/**
 * When the user gives the password this function will return a kind of status
 * report
 * 
 * @param data The robot's orientation, position and checkpoint progress.
 */
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
