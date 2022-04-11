import { Device } from '../../interface/User';
import Details from '../Details';
import { useNavbarContext } from './hooks';

interface DevicesProps {
    deviceList: Device[];
    onSelectDeviceHandler(id: string): void
}
const Devices = ({ deviceList, onSelectDeviceHandler }: DevicesProps) => {
    const { isMobile } = useNavbarContext();

    return (
        <Details isMobile={isMobile}>
            <Details.Summary>устройства</Details.Summary>

            <Details.Body>
                {
                    deviceList.map(device => {
                        return (
                            <Details.Item key={device._id}>
                                <span onClick={
                                    () => {
                                        onSelectDeviceHandler(device._id)
                                    }
                                }>
                                    {device.name}
                                </span>
                            </Details.Item>
                        );
                    })
                }
            </Details.Body>
        </Details>
    );
};

export default Devices;