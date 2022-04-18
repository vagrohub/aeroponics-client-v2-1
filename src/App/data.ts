import { User } from "../core/interface/User";

const user: User = {
    username: 'Admin',
    email: 'test@mail.ru',
    password: 'toor',
    deviceList: [
        {
            name: 'тестовое устройство',
            cycles: [],
            description: 'описание тестового утройства',
            currentExperiment: {
                title: 'Выращиваем горох',
                description: 'Тестируем выращвание гороха',
                lastUpdate: new Date(2022, 1, 24, 16, 40),
                measurements: [
                    {
                        danger: false,
                        tempRoom: 25.5,
                        tempWater: 20,
                        lightSensor: 2,
                        lightWorkingTime: 100,
                        lightOffTime: new Date(2022, 1, 24, 16),
                        pumpTime: 10,
                        pumpSleep: 20,
                        date: new Date(2022, 1, 24, 16),
                        _id: '0'
                    }
                ],
                _id: '0'
            },
            _id: '0'
        },
        {
            name: 'Еще одно устройство',
            cycles: [],
            description: 'описание еще одного устройства',
            currentExperiment: {
                title: 'Выращиваем помидор',
                description: 'Тестируем выращвание помидора',
                lastUpdate: new Date(2022, 1, 24, 16, 40),
                measurements: [
                    {
                        danger: false,
                        tempRoom: 25.5,
                        tempWater: 20,
                        lightSensor: 2,
                        lightWorkingTime: 100,
                        lightOffTime: new Date(2022, 1, 24, 16),
                        pumpTime: 10,
                        pumpSleep: 20,
                        date: new Date(2022, 1, 24, 16),
                        _id: '0'
                    }
                ],
                _id: '0'
            },
            _id: '1'
        }
    ],
    _id: '0'
};

export {
    user
}