import Input from '../components/Input';
import Textarea from '../components/Textarea';
import { createRegister } from '../utils/reactHookForm';
import WithModal from './WithModal';

interface NewExperimentProps {
    isMobile: boolean;
    isModalOpen: boolean;
    closeModal(): void;
}
const NewExperiment = ({
    isMobile,
    isModalOpen,
    closeModal
}: NewExperimentProps) => {
    const renderNewExperimentBody = (register: any, errors: any) => {
        const descriptionRegister = createRegister(register, 'description', 6);
        const titleRegister = createRegister(register, 'title', 3);

        return (
            <>
                <Input
                    label='Название:'
                    type='text'
                    isMobile={isMobile}
                    errorMessage={errors?.title?.message}
                    {...titleRegister}
                >
                    Супер эксперимент
                </Input>

                <Textarea
                    label='Описание'
                    isMobile={isMobile}
                    errorMessage={errors?.description?.message}
                    {...descriptionRegister}
                >
                    Полезное описание супер эксперимента
                </Textarea>
            </>
        );
    };

    const onSubmitHandler = (data: any) => {
        return new Promise(resolve => resolve(data));
    };

    return (
        <WithModal
            title='Новый эксперимент'
            isMobile={isMobile}
            isModalOpen={isModalOpen}
            closeModal={closeModal}
            onSubmitHandler={onSubmitHandler}
        >
            {renderNewExperimentBody}
        </WithModal>
    );
};

export default NewExperiment;