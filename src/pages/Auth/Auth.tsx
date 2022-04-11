import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { Link, useNavigate } from 'react-router-dom';
import Admission from '../../components/Admission';
import Form from '../../components/Form';
import Input from '../../components/Input';
import SimpleButton from '../../components/SimpleButton';
import ResponseError from '../../elementaryEntities/ResponseError';
import useAuthContext from '../../hooks/useAuthContext';

interface AuthProps {
    isMobile: boolean;
    goHome: Function;
}
const Auth = ({ isMobile, goHome }: AuthProps) => {
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
        authContext.login(data.email, data.password, (error: ResponseError) => {
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
            title='Вход в аккаунт'
            img={require('./enter.png')}
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
                        value='Вход'
                        text='Регистрация'
                    />

                    <Link to='/registration'>Регистрация</Link>
                </Admission.Footer>
            </Form>
        </Admission>
    );
};

export default Auth;