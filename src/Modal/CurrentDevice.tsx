import Input from '../components/Input';
import Textarea from '../components/Textarea';
import { createRegister } from '../utils/reactHookForm';
import WithModal from './WithModal';

interface CurrentDeviceProps {
    isMobile: boolean;
    isModalOpen: boolean;
    currentDeviceName: string;
    currentDeviceDescription: string;
    closeModal(): void;
}
const CurrentDevice = ({
    currentDeviceName,
    currentDeviceDescription,
    isMobile,
    isModalOpen,
    closeModal
}: CurrentDeviceProps) => {
    const renderCurrentDeviceBody = (register: any, errors: any) => {
        const descriptionRegister = createRegister(register, 'description', 6);
        const nameRegister = createRegister(register, 'name', 3);

        return (
            <>
                <Input
                    label='Название:'
                    type='text'
                    isMobile={isMobile}
                    errorMessage={errors?.name?.message}
                    {...nameRegister}
                >
                    {currentDeviceName}
                </Input>

                <Textarea
                    label='Описание'
                    isMobile={isMobile}
                    errorMessage={errors?.description?.message}
                    {...descriptionRegister}
                >
                    {currentDeviceDescription}
                </Textarea>
            </>
        )
    };

    const onSubmitHandler = (data: any) => {
        return new Promise((resolve) => {
            resolve(data)
        });
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
