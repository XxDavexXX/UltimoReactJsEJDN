import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import video_forms from '../videos/video_fondo_forms_auth.mp4'
import Alert from 'react-bootstrap/Alert';

import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import './../css/FormLogin.css'

// Firebase Auth 
import { app, analytics, auth } from '../firebase/firebaseConfig';
import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";


function FormLogin() {

       // Firebase 
       const [user, setUser] = useState(null);
       const [emailUser, setEmail] = useState("");
       const [showAlert, setShowAlert] = useState(false);
       const [showAlert2, setShowAlert2] = useState(false);
       const [showAlert3, setShowAlert3] = useState(false);
       const [showAlert4, setShowAlert4] = useState(false);
       const [showAlert5, setShowAlert5] = useState(false);
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
   
       function handleLogin() {
        signInWithPopup(auth, provider)
            .then((result) => {
                const credential = GoogleAuthProvider.credentialFromResult(result);
                const token = credential.accessToken;
                const user = auth.currentUser;
                if (user) {
                    const name = user.displayName;
                    const email = user.email;
                    const photoURL = user.photoURL;
    
                    // Verificar si el correo electrónico está registrado en la base de datos
                    fetch('http://localhost:8000/api/verificar_email/?email=' + email)
                        .then(response => response.json())
                        .then(data => {
                            if (data.error) {
                                console.log('Error al verificar el correo electrónico:', data.error);
                                // Manejar el error según sea necesario
                            } else {
                                // Si el correo electrónico está registrado en la base de datos
                                console.log('Correo electrónico verificado:', email);
                                console.log(name, email, photoURL);
                                setShowAlert(true);
    
                                // Evitar el inicio de sesión si el correo electrónico no está registrado
                                if (data.message === 'El correo electrónico no está registrado') {
                                    console.log('No se puede iniciar sesión porque el correo electrónico no está registrado.');
                                    // Aquí puedes mostrar un mensaje al usuario o tomar otras acciones según sea necesario
                                    // Por ejemplo, redirigirlo a una página de registro
                                    auth.signOut();
                                    setShowAlert(false);
                                    return;
                                } else {
                                    // Iniciar sesión solo si el correo electrónico está registrado
                                    console.log('Iniciar sesión permitido porque el correo electrónico está registrado.');
                                    // Aquí puedes agregar la lógica para iniciar sesión
                                }
                            }
                        })
                        .catch(error => {
                            console.error('Error al verificar el correo electrónico:', error);
                            // Manejar el error según sea necesario
                        });
                }
            })
            .catch((error) => {
                // Error en el inicio de sesión
                const errorCode = error.code;
                const errorMessage = error.message;
                const email = error.email;
                const credential = GoogleAuthProvider.credentialFromError(error);
            });
    }
    
    

    function handleSubmitFormLogin(event) {
        event.preventDefault();
        const email = event.target.email.value;
        const password = event.target.password.value;
        setEmail(email);
        console.log(email, password);
    
        // Verificar si el correo electrónico está registrado en la base de datos
        fetch('http://localhost:8000/api/verificar_email/?email=' + email)
            .then(response => response.json())
            .then(data => {
                if (data.error) {
                    console.log('Error al verificar el correo electrónico:', data.error);
                    setShowAlert5(true);
                    // Manejar el error según sea necesario
                } else {
                    // Si el correo electrónico está registrado en la base de datos
                    console.log('Correo electrónico verificado:', email);
    
                    // Iniciar sesión solo si el correo electrónico está registrado
                    if (data.message === 'El correo electrónico ya está registrado') {
                        // Autenticar al usuario con correo electrónico y contraseña
                        signInWithEmailAndPassword(auth, email, password)
                            .then((userCredential) => {
                                // Autenticación exitosa
                                const user = userCredential.user;
                                console.log(user);
                                setShowAlert2(true);
                            })
                            .catch((error) => {
                                // Error en la autenticación
                                const errorCode = error.code;
                                const errorMessage = error.message;
                                console.log(errorCode, errorMessage);
                            });
                    } else {
                        console.log('No se puede iniciar sesión porque el correo electrónico no está registrado.');
                        setShowAlert3(true);
                        // Aquí puedes mostrar un mensaje al usuario o tomar otras acciones según sea necesario
                        // Por ejemplo, redirigirlo a una página de registro
                    }
                }
            })
            .catch(error => {
                console.error('Error al verificar el correo electrónico:', error);
                setShowAlert4(true);
                // Manejar el error según sea necesario
            });
    }
    

       // Firebase 
   

    return (
        <div className="contendor_form_register_total">

            {showAlert && (
                <div className="contenedor_alert_registro_exitoso">
                    <Alert key={"success"} className="alerta_registro_exitoso" variant={"success"} onClose={() => setShowAlert(false)} dismissible>
                        Bienvenido <b>{user.displayName}.</b> <Link className="link_regresar_home" to="/">Click aquí</Link> para regresar.
                    </Alert>
                </div>
            )}

            {showAlert2 && (
                <div className="contenedor_alert_registro_exitoso">
                    <Alert key={"success"} className="alerta_registro_exitoso" variant={"success"} onClose={() => setShowAlert(false)} dismissible>
                        Bienvenido <b>{emailUser}.</b> <Link className="link_regresar_home" to="/">Click aquí</Link> para regresar.
                    </Alert>
                </div>
            )}

            {showAlert3 && (
                <div className="contenedor_alert_registro_exitoso">
                    <Alert key={"danger"} className="alerta_registro_exitoso" variant={"danger"} onClose={() => setShowAlert(false)} dismissible>
                        Primero debes registrar una cuenta.
                    </Alert>
                </div>
            )}
            {showAlert4 && (
                <div className="contenedor_alert_registro_exitoso">
                    <Alert key={"danger"} className="alerta_registro_exitoso" variant={"danger"} onClose={() => setShowAlert(false)} dismissible>
                    Error al verificar el correo electrónico.
                    </Alert>
                </div>
            )}
            {showAlert5 && (
                <div className="contenedor_alert_registro_exitoso">
                    <Alert key={"danger"} className="alerta_registro_exitoso" variant={"danger"} onClose={() => setShowAlert(false)} dismissible>
                    Error al verificar el correo electrónico.
                    </Alert>
                </div>
            )}

            <video className="video_fondo_form_register" autoPlay loop muted>
                <source src={video_forms}></source>
            </video>


            <div className="container_form_register">
                <div className="heading_form_register">Log In</div>
                <form onSubmit={handleSubmitFormLogin} className="form_form_register">
                    <input required="" className="input_form_register" type="email" name="email" id="email" placeholder="E-mail"/>
                    <input required="" className="input_form_register" type="password" name="password" id="password" placeholder="Password"/>
                    <span className="forgot-password"><Link className="a_form_register forgot_password_link" to="/form_forgot_password">Forgot Password ?</Link></span>
                    <input className="login-button" type="submit" value="Log In"/>
                    
                </form>
                <div className="social-account-container">
                    <span className="title_form_register">Or Log in</span>
                    <div className="social-accounts">
                    <button className="social-button google" onClick={handleLogin}>
                        <svg className="svg" xmlns="http://www.w3.org/2000/svg" height="1em" viewBox="0 0 488 512">
                        <path d="M488 261.8C488 403.3 391.1 504 248 504 110.8 504 0 393.2 0 256S110.8 8 248 8c66.8 0 123 24.5 166.3 64.9l-67.5 64.9C258.5 52.6 94.3 116.6 94.3 256c0 86.5 69.1 156.6 153.7 156.6 98.2 0 135-70.4 140.8-106.9H248v-85.3h236.1c2.3 12.7 3.9 24.9 3.9 41.4z"></path>
                        </svg></button>
                    </div>
                </div>
                <span className="agreement span_log_in_go">Si aún no tienes una cuenta <Link to="/form_registrarse" className="direccionar_login_page" href="#">sign in</Link></span>
            </div>
        </div>
    );
}

export default FormLogin;
