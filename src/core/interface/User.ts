interface Measurement {
    danger: boolean,
    tempRoom: number,
    tempWater: number,
    lightSensor: number,
    lightWorkingTime: number,
    lightOffTime: Date,
    pumpTime: number,
    pumpSleep: number,
    date: Date
    _id: string;
}

interface Experimet {
    title: string;
    description: string;
    measurements: Measurement[];
    lastUpdate: Date;
    _id: string;
}

interface Device {
    name: string;
    description: string;
    cycles: Experimet[];
    currentExperiment: Experimet;
    _id: string;
}

interface MainUserInfo {
    username: string;
    email: string;
    _id: string;
}

interface User extends MainUserInfo {
    password: string;
    deviceList: Device[];
}

export type {
    Measurement,
    Experimet,
    Device,
    MainUserInfo,
    User
}