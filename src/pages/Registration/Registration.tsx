import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { Link } from 'react-router-dom';
import Admission from '../../containers/Admission';
import Form from '../../components/ui/Form';
import Input from '../../components/smart/Input';
import SimpleButton from '../../components/ui/SimpleButton';
import ResponseError from '../../core/elementaryEntities/ResponseError';
import { useAuthContext } from '../../core/provider/AuthProvider';

interface RegistrationProps {
    isMobile: boolean;
    goHome: Function;
}
const Registration = ({ isMobile, goHome }: RegistrationProps) => {
    const [error, setError] = useState<string>('');
    const authContext = useAuthContext();
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

    const onSubmitHandler = (data: any) => {
        authContext.registration(data.email, data.username, data.password, (error: ResponseError) => {
            if (error) {
                setError(error.error)
            } else {
                setError('')
                goHome();
            }
        });
    };

    return (
        <Admission
            isMobile={isMobile}
            error={error}
            title='Регистрация'
            img={require('./registration.png')}
        >
            <Form
                onSubmit={handleSubmit(onSubmitHandler)}
                className='admission-page__form'
            >
                <Input
                    label='Почта:'
                    type='email'
                    errorMessage={errors?.email?.message}
                    isMobile={isMobile}
                    {...register('email', {
                        required: 'Поле обязательно к заполнению',
                        minLength: {
                            value: 3,
                            message: 'минимум 3 символа'
                        }
                    })}
                >
                    email@email.com
                </Input>

                <Input
                    label='Имя:'
                    type='text'
                    errorMessage={errors?.username?.message}
                    isMobile={isMobile}
                    {...register('username', {
                        required: 'Поле обязательно к заполнению',
                        minLength: {
                            value: 3,
                            message: 'минимум 3 символа'
                        }
                    })}
                >
                    Иван
                </Input>

                <Input
                    label='Пароль:'
                    type='password'
                    errorMessage={errors?.password?.message}
                    isMobile={isMobile}
                    {...register('password', {
                        required: 'Поле обязательно к заполнению',
                        minLength: {
                            value: 6,
                            message: 'минимум 6 символов'
                        }
                    })}
                >
                    1234567
                </Input>

                <Admission.Footer>
                    <SimpleButton
                        isDisabled={!isValid}
                        isMobile={isMobile}
                        isFill={isMobile}
                        type='submit'
                        value='Зарегистрироваться'
                        text='Зарегистрироваться'
                    />

                    <Link to='/auth'>Вход в аккаунт</Link>
                </Admission.Footer>
            </Form>
        </Admission>
    );
};

export default Registration;