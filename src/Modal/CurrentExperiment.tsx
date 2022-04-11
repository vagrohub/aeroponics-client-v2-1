import Input from '../components/Input';
import Textarea from '../components/Textarea';
import { createRegister } from '../utils/reactHookForm';
import WithModal from './WithModal';

interface CurrentExperimentProps {
    isMobile: boolean;
    isModalOpen: boolean;
    currentExperimentName: string;
    currentExperimentDescription: string;
    closeModal(): void;
}
const CurrentExperiment = ({
    isMobile,
    isModalOpen,
    currentExperimentName,
    currentExperimentDescription,
    closeModal
}: CurrentExperimentProps) => {
    const renderCurrentExperimentBody = (register: any, errors: any) => {
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
                    {currentExperimentName}
                </Input>

                <Textarea
                    label='Описание'
                    isMobile={isMobile}
                    errorMessage={errors?.description?.message}
                    {...descriptionRegister}
                >
                    {currentExperimentDescription}
                </Textarea>
            </>
        )
    };

    const onSubmitHandler = (data: any) => {
        return new Promise(resolve => {
            resolve(data);
        });
    };

    return (
        <WithModal
            title='Текущий эксперимент'
            isMobile={isMobile}
            isModalOpen={isModalOpen}
            closeModal={closeModal}
            onSubmitHandler={onSubmitHandler}
        >
            {renderCurrentExperimentBody}
        </WithModal>
    )
};

export default CurrentExperiment;