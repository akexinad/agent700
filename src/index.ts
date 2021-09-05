import { initialCmd } from "./commands";
import { RobotData } from "./types";

console.log(`AGENT 700`);

const robotData: RobotData = {
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


initialCmd(robotData);
