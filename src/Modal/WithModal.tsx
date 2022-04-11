import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import ClosedButton from '../components/ClosedButton';
import Form from '../components/Form';
import Headline, { Levels } from '../components/Headline';
import Modal from '../components/Modal';
import ResponseError from '../components/ResponseError';
import SimpleButton from '../components/SimpleButton';

interface WithModalProps {
    title: string;
    isMobile: boolean;
    isModalOpen: boolean;
    closeModal(): void;
    onSubmitHandler(data: any): Promise<any>
    children(register: any, errors: any): JSX.Element
}
const WithModal = ({
    title,
    isMobile,
    isModalOpen,
    closeModal,
    onSubmitHandler,
    children
}: WithModalProps) => {
    const {
        register,
        formState: {
            errors,
            isValid
        },
        handleSubmit
    } = useForm({
        mode: 'onBlur'
    });
    const [errorFromServer, setErrorFromServer] = useState();
    const [isOpen, setIsOpen] = useState(isModalOpen)

    const wrapperOnSubmitHandler = async (data: any) => {
        const response = await onSubmitHandler(data);
        console.log(response)

        if (response?.error) {
            setErrorFromServer(response);
        } else {
            setErrorFromServer(undefined);
            setIsOpen(false)
        }
    };

    useEffect(() => {
        setIsOpen(isModalOpen);
    }, [isModalOpen]);

    return (
        <Modal isMobile={isMobile} isOpen={isOpen}>
            <Modal.Dialog>
                <Form onSubmit={handleSubmit(wrapperOnSubmitHandler)}>
                    <Modal.Header>
                        <Modal.Title>
                            <Headline
                                level={Levels.Second}
                                isMobile={isMobile}
                                value={title}
                            />
                        </Modal.Title>
                        <ClosedButton
                            isMobile={isMobile}
                            onClickHandler={closeModal}
                        />
                    </Modal.Header>

                    <Modal.Body>
                        <ResponseError
                            error={errorFromServer}
                        />
                        {children(register, errors)}
                    </Modal.Body>

                    <Modal.Footer>
                        <SimpleButton
                            isMobile={isMobile}
                            isDisabled={!isValid}
                            isFill={isMobile}
                            text='сохранить'
                            value='сохранить'
                            type='submit'
                        />
                        <SimpleButton
                            isMobile={isMobile}
                            isFill={isMobile}
                            text='отмена'
                            type='reset'
                            value='отмена'
                            onClick={closeModal}
                        />
                    </Modal.Footer>
                </Form>
            </Modal.Dialog>
        </Modal >
    );
};

export default WithModal;