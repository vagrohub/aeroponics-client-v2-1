import { useState } from 'react';
import { Device, Experimet, User } from '../../interface/User';
import Header from '../../components/Header';
import Main from '../../components/Main';
import Navbar from '../../components/Navbar';
import { pinBody, unPinBody } from '../../utils/dom';
import { useUserData } from './hooks';
import { useMenuControl } from '../../components/Header/hooks';
import NewDevice from '../../Modal/NewDevice';
import NewExperiment from '../../Modal/NewExperiment';
import CurrentDevice from '../../Modal/CurrentDevice';
import CurrentExperiment from '../../Modal/CurrentExperiment';
import './dashboard.scss';

interface DashboardProps {
    isMobile: boolean;
    user: User;
}
const Dashboard = ({ isMobile, user }: DashboardProps) => {
    const {
        experimentList,
        setExperiment,
        selectExperiment,
        deviceList,
        setDevice,
        selectDevice
    } = useUserData(user);

    const onSelectDeviceHandler = (id: string) => {
        setDevice(deviceList.find(
            (device: Device) => device._id === id)
        );
    };

    const onSelectExperimentHandler = (id: string) => {
        setExperiment(experimentList.find(
            (experiment: Experimet) => experiment._id === id)
        );
    };

    const [isMenuHidden, onToggleMenuShow] = useMenuControl();

    const [idShowModal, setIdShowModal] = useState<string>('newDevice');
    const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

    const openModal = () => {
        pinBody();
        setIsModalOpen(true);
    };
    const closeModal = () => {
        unPinBody();
        setIsModalOpen(false);
    };

    const showModal = (id: string) => {
        setIdShowModal(id);
        openModal();
    };

    const getIsOpenConcreteModal = (id: string) => {
        return isModalOpen && idShowModal === id;
    };

    return (
        <div className='dashboard'>
            <div className='dashboard__header'>
                <Header
                    isMobile={isMobile}
                >
                    <Header.Brand />

                    <Header.Toggle callback={onToggleMenuShow} />

                    <Header.Collapse isHidden={isMenuHidden && isMobile}>
                        <Navbar isMobile={isMobile}>
                            <Navbar.Settings
                                isSelectDevice={!!selectDevice}
                                isSelectExperiment={!!selectExperiment}
                                toggleShowModal={showModal}
                            />
                            <Navbar.Devices
                                deviceList={deviceList}
                                onSelectDeviceHandler={onSelectDeviceHandler}
                            />
                            <Navbar.Experimets
                                experimentList={experimentList}
                                onSelectExperimentHandler={onSelectExperimentHandler}
                            />
                        </Navbar>
                    </Header.Collapse>
                </Header>
            </div>

            <div className='dashboard__main'>
                <Main
                    isMobile={isMobile}
                    user={user}
                    selectedExperiment={selectExperiment}
                    selectedDevice={selectDevice}
                >
                    <Main.Greetings />
                    <Main.Description />
                    <Main.PerformanceIndicators />
                </Main>

                <NewDevice
                    isMobile={isMobile}
                    isModalOpen={getIsOpenConcreteModal('newDevice')}
                    closeModal={closeModal}
                />

                <NewExperiment
                    isMobile={isMobile}
                    isModalOpen={getIsOpenConcreteModal('newExperiment')}
                    closeModal={closeModal}
                />

                {
                    selectDevice?.name
                    &&
                    <CurrentDevice
                        isMobile={isMobile}
                        isModalOpen={getIsOpenConcreteModal('currentDevice')}
                        currentDeviceName={selectDevice.name}
                        currentDeviceDescription={selectDevice.description}
                        closeModal={closeModal}
                    />
                }

                {
                    selectExperiment?.title
                    &&
                    <CurrentExperiment
                        isMobile={isMobile}
                        isModalOpen={getIsOpenConcreteModal('currentExperiment')}
                        currentExperimentName={selectExperiment.title}
                        currentExperimentDescription={selectExperiment.description}
                        closeModal={closeModal}
                    />
                }
            </div>
        </div>
    );
};

export default Dashboard;

