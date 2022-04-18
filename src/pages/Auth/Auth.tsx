import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { Link } from 'react-router-dom';
import Admission from '../../containers/Admission';
import Form from '../../components/ui/Form';
import Input from '../../components/smart/Input';
import SimpleButton from '../../components/ui/SimpleButton';
import ResponseError from '../../core/elementaryEntities/ResponseError';
import { useAuthContext } from '../../core/provider/AuthProvider';

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
                        text='Вход'
                    />

                    <Link to='/registration'>Регистрация</Link>
                </Admission.Footer>
            </Form>
        </Admission>
    );
};

export default Auth;