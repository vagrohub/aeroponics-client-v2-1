import { useEffect, useState } from 'react';
import { Device, Experimet, User } from '../../core/interface/User';

const ejectLastDeviceFromUser = (user: User): Device | undefined => {
    return user.deviceList.at(-1);
};

const ejectLastExperimentFromDevice = (device: Device | undefined): Experimet | undefined => {
    if (!device) {
        return undefined
    }
    return device.currentExperiment;
};

const ejectDeviceListFromUser = (user: User): Device[] => {
    return user.deviceList;
};

const ejectExperimentListFromDevice = (device: Device | undefined): Experimet[] => {
    if (!device) {
        return [];
    }
    return [device.currentExperiment, ...device.cycles]
};

const useUserData = (user: User) => {
    const [selectDevice, setDevice] =
        useState<Device | undefined>(ejectLastDeviceFromUser(user));
    const [deviceList, setDeviceList] =
        useState<Device[]>(ejectDeviceListFromUser(user));

    const [selectExperiment, setExperiment] = 
        useState(ejectLastExperimentFromDevice(selectDevice));
    const [experimentList, setExperimentList] =
        useState(ejectExperimentListFromDevice(selectDevice))

    // update info
    useEffect(() => {
        console.log('new user');
        setDeviceList(ejectDeviceListFromUser(user));
        setExperimentList(ejectExperimentListFromDevice(selectDevice))
    }, [user]);

    useEffect(() => {
        setExperiment(ejectLastExperimentFromDevice(selectDevice))
        setExperimentList(ejectExperimentListFromDevice(selectDevice))
    }, [selectDevice]);

    return {
        deviceList,
        selectDevice,
        setDevice,
        experimentList,
        selectExperiment,
        setExperiment
    };
};

export {
    useUserData
}