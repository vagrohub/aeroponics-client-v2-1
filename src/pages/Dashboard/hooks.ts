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

const getCurrentExperiment = (experimnetList: Experimet[], currentExperiment: Experimet) => {
    return experimnetList.find(experiment => experiment._id === currentExperiment._id);
}

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
        if (selectDevice) {
            setDevice(user.deviceList.find(device => device._id === selectDevice._id));
        } else {
            setDevice(ejectLastDeviceFromUser(user));
        }

        setDeviceList(ejectDeviceListFromUser(user));
        setExperimentList(ejectExperimentListFromDevice(selectDevice));

        if (selectExperiment) {
            setExperiment(getCurrentExperiment(experimentList, selectExperiment))
        } else {
            setExperiment(ejectLastExperimentFromDevice(selectDevice))
        }
    }, [user]);

    useEffect(() => {
        setExperimentList(ejectExperimentListFromDevice(selectDevice))

        if (selectExperiment) {
            setExperiment(
                getCurrentExperiment(experimentList, selectExperiment)
                ||
                ejectLastExperimentFromDevice(selectDevice)
            )
        } else {
            setExperiment(ejectLastExperimentFromDevice(selectDevice))
        }
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