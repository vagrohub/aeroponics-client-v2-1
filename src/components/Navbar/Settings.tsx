import ActiveElement from '../ActiveElement';
import Details from '../Details';
import { useNavbarContext } from './hooks';

interface SettingsProps {
    toggleShowModal(id: 'newDevice' | 'newExperiment' | 'currentDevice' | 'currentExperiment'): void
    isSelectExperiment: boolean;
    isSelectDevice: boolean;
}
const Settings = ({
    toggleShowModal,
    isSelectDevice,
    isSelectExperiment
}: SettingsProps) => {
    const { isMobile } = useNavbarContext();

    return (
        <Details isMobile={isMobile}>
            <Details.Summary>Настройки</Details.Summary>

            <Details.Body>
                <Details.Group>
                    <Details.Item>
                        <ActiveElement
                            isMobile={isMobile}
                            onClickHandler={
                                () => toggleShowModal('newDevice')
                            }
                        >
                            Новое устройство
                        </ActiveElement>
                    </Details.Item>
                    <Details.Item>
                        <ActiveElement
                            isMobile={isMobile}
                            onClickHandler={
                                () => toggleShowModal('newExperiment')
                            }
                        >
                            Новый эксперимент
                        </ActiveElement>
                    </Details.Item>
                </Details.Group>

                {
                    (isSelectDevice && isSelectExperiment)
                    &&
                    <Details.Group>
                        {
                            isSelectDevice
                                ? (
                                    <Details.Item>
                                        <ActiveElement
                                            isMobile={isMobile}
                                            onClickHandler={
                                                () => toggleShowModal('currentDevice')
                                            }
                                        >
                                            Выбранное устройство
                                        </ActiveElement>
                                    </Details.Item>
                                )
                                : null
                        }
                        {
                            isSelectExperiment
                                ? (
                                    <Details.Item>
                                        <ActiveElement
                                            isMobile={isMobile}
                                            onClickHandler={
                                                () => toggleShowModal('currentExperiment')
                                            }
                                        >
                                            Выбранный эксперимент
                                        </ActiveElement>
                                    </Details.Item>
                                )
                                : null
                        }
                    </Details.Group>
                }
            </Details.Body>
        </Details >
    );
};

export default Settings;