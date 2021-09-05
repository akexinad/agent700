type CheckPoint = {
    number: "one" | "two" | "three";
    coordinate: [number, number];
    passed: boolean;
};

export type RobotData = {
    orientation: "NORTH" | "EAST" | "SOUTH" | "WEST";
    position: [number, number];
    checkPointCount: number;
    checkPoints: CheckPoint[];
};

export type RobotPosition = {
    orientation: "NORTH" | "EAST" | "SOUTH" | "WEST";
    coordinates: [number, number];
};
