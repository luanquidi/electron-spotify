import React, { useState } from 'react'
import { Button, Icon, Form, Input } from 'semantic-ui-react';
import { toast } from 'react-toastify';
import { validateEmail } from '../../../utils/Validations';
import firebase  from '../../../utils/firebase';
import 'firebase/auth';

//Styles
import './LoginForm.scss';

export default function LoginForm(props) {

    const { setSelectedForm } = props;
    const [showPassword, setShowPassword] = useState(false);
    const [dataForm, setDataForm] = useState(defaultDataForm());
    const [formError, setFormError] = useState({});
    const [isLoading, setIsLoading] = useState(false);
    const [userActive, setUserActive] = useState(true);
    const [user, setUser] = useState(null);

    const onSubmit = () => {
        setFormError({});
        let errors = {};
        let formOk = true;

        if(!validateEmail(dataForm.email)){
            errors.email = true;
            formOk = false;
        }

        if(dataForm.password.length < 6){
            errors.password = true;
            formOk = false;
        }

        setFormError(errors);

        if(formOk){
            setIsLoading(true);
            firebase.auth().signInWithEmailAndPassword(dataForm.email, dataForm.password).then((response) => {
                setUser(response.user);
                setUserActive(response.user.emailVerified);
                if(!response.user.emailVerified){
                    toast.warning('Para poder hacer login antes tienes que verificar tu email');
                }
                
            }).catch(e => {
                handlerErrors(e.code);
            }).finally(() => {
                setIsLoading(false);
            });
        }
    }

    const onChange = (e) => {
        setDataForm({
            ...dataForm,
            [e.target.name]: e.target.value
        })
        
    }

    return (
        <div className="login-form">
            <h1>Música para todos</h1>

            <Form onSubmit={onSubmit} onChange={onChange}>
                <Form.Field>
                    <Input 
                        type="text"
                        name="email"
                        placeholder="Correo electrónico"
                        icon="mail outline"
                        error={formError.email}
                    />
                    {formError.email && (
                        <span className="error-text">Por favor, introduce un correo electrónico válido.</span>
                    )}
                </Form.Field>

                <Form.Field>
                    <Input 
                        type={showPassword ? 'text' : 'password'}
                        name="password"
                        placeholder="Contraseña"
                        icon={
                            showPassword ? (
                                <Icon name="eye slash outline" link onClick={() => setShowPassword(!showPassword)} />
                            ) : (
                                <Icon name="eye" link onClick={() => setShowPassword(!showPassword)} />
                            )
                        }
                        error={formError.password}
                    />
                    {formError.password && (
                        <span className="error-text">Por favor, ingresa una contraseña con almenos 6 carácteres.</span>
                    )}
                </Form.Field>

                <Button type="submit" loading={isLoading}>
                    Iniciar sesión
                </Button>
            </Form>

            {!userActive && (
                <ButtonResetSendEmailVerification 
                    user={user}
                    setIsLoading={setIsLoading}
                    setUserActive={setUserActive}
                />
            )}

            <div className="login-form__options">
                <p onClick={() => setSelectedForm(null)}>Volver</p>
                <p>¿No tienes cuenta? <span onClick={() => setSelectedForm('register')}>Regístrarte</span></p>
            </div>
        </div>
    )
}
function ButtonResetSendEmailVerification (props) {

    const { user, setIsLoading, setUserActive } = props;

    const resendVerificationEmail = () => {

        user.sendEmailVerification().then(() => {

            toast.success('Se ha enviado el email de verificación.');

        }).catch((e)=> {

            handlerErrors(e.code);

        }).finally(()=> {

            setIsLoading(false);
            setUserActive(true);

        });
    }

    return (
        <div className="resend-verification-email">
            <p>Si no has recibido el email de verificación puedes volver a enviarlo haciendo click <span onClick={resendVerificationEmail}>aquí.</span></p>
        </div>
    )
}

function handlerErrors (code) {

    switch (code) {
        case 'auth/wrong-password':
            toast.warning('El usuario o la contraseña son incorrectos.')
            break;

        case 'auth/too-many-requests':
            toast.warning('Has enviado demasiadas solicitudes de reenvío de email de confirmación en muy poco tiempo.')
            break;

        case 'auth/user-not-found':
            toast.warning('El usuario o la contraseña son incorrectos.')
            break;
    
        default:
            break;
    }
}

function defaultDataForm () {
    return {
        email: '',
        password: ''
    }
}