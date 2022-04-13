import Textarea from '../components/Textarea';
import { createRegister } from '../utils/reactHookForm';
import DeviceService from '../serverServices/Device';
import WithModal from './WithModal';
import Headline, { Levels } from '../components/Headline';
import { Device } from '../interface/User';

interface SelectDeviceProps {
    isMobile: boolean;
    isModalOpen: boolean;
    selectDevice: Device
    closeModal(): void;
}
const SelectDevice = ({
    selectDevice,
    isMobile,
    isModalOpen,
    closeModal
}: SelectDeviceProps) => {
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
        const deviceService = new DeviceService();

        return await deviceService.edditDescription(
            selectDevice._id,
            data.description
        );
    };

    return (
        <WithModal
            title='Выбранное устройство'
            isMobile={isMobile}
            isModalOpen={isModalOpen}
            closeModal={closeModal}
            onSubmitHandler={onSubmitHandler}
        >
            {renderCurrentDeviceBody}
        </WithModal>
    )
};

export default SelectDevice;
