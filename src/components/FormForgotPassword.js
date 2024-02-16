import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import video_forms from '../videos/video_fondo_forms_auth.mp4'
import Alert from 'react-bootstrap/Alert';

import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import './../css/FormLogin.css'

// Firebase Auth 
import { app, analytics, auth } from '../firebase/firebaseConfig';
import { GoogleAuthProvider } from "firebase/auth";
import { getAuth, sendPasswordResetEmail } from "firebase/auth";


function FormForgotPassword() {

       // Firebase 
       const [user, setUser] = useState(null);
       const [emailUser, setEmail] = useState("");
       const [showAlert2, setShowAlert2] = useState(false);
       const [showAlert, setShowAlert] = useState(false);
       const provider = new GoogleAuthProvider();
   
       useEffect(() => {
           const unsubscribe = auth.onAuthStateChanged((user) => {
           if (user) {
           setUser(user);
           } else {
           setUser(null);
           }
       });
   
       return () => {
           unsubscribe();
       };
       }, []);

          function handleSubmitForgotPassword(event) {
            event.preventDefault();
            const email = event.target.email.value;
            setEmail(email);
            console.log(email);
    
            sendPasswordResetEmail(auth, email)
                .then(() => {
                    // Correo para restablecer contraseña enviado exitosamente
                    console.log("Correo para restablecer contraseña enviado");
                    setShowAlert2(true);
                })
                .catch((error) => {
                    // Error al enviar el correo para restablecer contraseña
                    const errorCode = error.code;
                    const errorMessage = error.message;
                    console.log(errorCode, errorMessage);
                });
        }

       // Firebase 
   

    return (
        <div className="contendor_form_register_total">

            {showAlert2 && (
                <div className="contenedor_alert_registro_exitoso">
                    <Alert key={"success"} className="alerta_registro_exitoso" variant={"success"} onClose={() => setShowAlert(false)} dismissible>
                        Correo de recuperación enviado a <b>{emailUser}.</b> <Link className="link_regresar_home" to="/form_login">Click aquí</Link> para regresar al Log in.
                    </Alert>
                </div>
            )}

            <video className="video_fondo_form_register" autoPlay loop muted>
                <source src={video_forms}></source>
            </video>


            <div className="container_form_register">
                <div className="heading_form_register">Olvidaste tu contraseña ?</div>
                <form onSubmit={handleSubmitForgotPassword} className="form_form_register">
                    <input required="" className="input_form_register" type="email" name="email" id="email" placeholder="E-mail"/>
                    <input className="login-button" type="submit" value="Cambiar contraseña"/>
                    
                </form>
                <span className="agreement span_log_in_go">Si aún no tienes una cuenta <Link to="/form_registrarse" className="direccionar_login_page" href="#">sign in</Link></span>
            </div>
        </div>
    );
}

export default FormForgotPassword;
