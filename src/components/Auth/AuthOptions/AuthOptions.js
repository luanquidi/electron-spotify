import React from 'react'
import { Button } from 'semantic-ui-react';

//Styles
import "./AuthOptions.scss";

export default function AuthOptions(props) {

    const { setSelectedForm } = props;


    return (
        <div className="auth-options">
            <h2>Millones de canciones gratis en Musicfy</h2>
            <Button className="ui button register" onClick={() => setSelectedForm('register')}>Registrate gratis</Button>
            <Button className="ui button login" onClick={()=> setSelectedForm('login')}>Iniciar sesión</Button>
        </div>
    );
}


