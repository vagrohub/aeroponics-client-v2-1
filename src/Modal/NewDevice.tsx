import Input from '../components/Input';
import Textarea from '../components/Textarea';
import { createRegister } from '../utils/reactHookForm';
import WithModal from './WithModal';

interface NewDeviceProps {
    isMobile: boolean;
    isModalOpen: boolean;
    closeModal(): void;
}
const NewDevice = ({
    isMobile,
    isModalOpen,
    closeModal
}: NewDeviceProps) => {
    const renderNewDeviceBody = (register: any, errors: any) => {
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
                    Супер устройство
                </Input>

                <Textarea
                    label='Описание'
                    isMobile={isMobile}
                    errorMessage={errors?.description?.message}
                    {...descriptionRegister}
                >
                    Полезное описание супер устройства
                </Textarea>
            </>
        );
    }

    const onSubmitHandler = (data: any) => {
        return new Promise((resolve) => {
            resolve(data)
        });
    }

    return (
        <WithModal
            title='Новое устройство'
            isMobile={isMobile}
            isModalOpen={isModalOpen}
            closeModal={closeModal}
            onSubmitHandler={onSubmitHandler}
        >
            {renderNewDeviceBody}
        </WithModal>
    );
}

export default NewDevice;