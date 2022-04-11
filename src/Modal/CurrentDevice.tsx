import Textarea from '../components/Textarea';
import { createRegister } from '../utils/reactHookForm';
import DeviceService from '../serverServices/Device';
import WithModal from './WithModal';
import Headline, { Levels } from '../components/Headline';
import { Device } from '../interface/User';

interface CurrentDeviceProps {
    isMobile: boolean;
    isModalOpen: boolean;
    selectDevice: Device
    closeModal(): void;
}
const CurrentDevice = ({
    selectDevice,
    isMobile,
    isModalOpen,
    closeModal
}: CurrentDeviceProps) => {
    const renderCurrentDeviceBody = (register: any, errors: any) => {
        const descriptionRegister = createRegister(register, 'description', 6);

        return (
            <>
                <Headline
                    level={Levels.Third}
                    isMobile={isMobile}
                    value={selectDevice.name}                    
                />

                <Textarea
                    label='Описание'
                    isMobile={isMobile}
                    errorMessage={errors?.description?.message}
                    {...descriptionRegister}
                >
                    {selectDevice.description}
                </Textarea>
            </>
        )
    };

    const onSubmitHandler = async (data: any) => {
        const device = new DeviceService();

        if (data?.description === selectDevice.description) {
            return new Promise((_, reject) => reject('Description has not been changed'))
        }

        console.log(selectDevice);
        

        return await device.edditDescription(
            selectDevice._id,
            data.description
        );
    };

    return (
        <WithModal
            title='Текущее устройство'
            isMobile={isMobile}
            isModalOpen={isModalOpen}
            closeModal={closeModal}
            onSubmitHandler={onSubmitHandler}
        >
            {renderCurrentDeviceBody}
        </WithModal>
    )
};

export default CurrentDevice;
