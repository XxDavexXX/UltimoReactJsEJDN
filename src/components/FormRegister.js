import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import video_forms from '../videos/video_fondo_forms_auth.mp4'
import Alert from 'react-bootstrap/Alert';

import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import './../css/FormRegister.css'

// Firebase Auth 
import { auth } from '../firebase/firebaseConfig';
import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth"; 


function FormRegister() {

       // Firebase 
       const [user, setUser] = useState(null);
       const [emailUser, setEmail] = useState("");
       const [showAlert, setShowAlert] = useState(false);
       const [showAlert2, setShowAlert2] = useState(false);
       const [showAlert3, setShowAlert3] = useState(false);
       const [showAlert4, setShowAlert4] = useState(false);
       const [showAlert5, setShowAlert5] = useState(false);
       const [showAlert6, setShowAlert6] = useState(false);
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
   
         
    function handleSignin() {
        signInWithPopup(auth, provider)
            .then((result) => {
                // Inicio de sesión exitoso
            const credential = GoogleAuthProvider.credentialFromResult(result);
            const token = credential.accessToken;
            const user = result.user;
            
            // Verificar si el usuario ya está registrado en tu tabla de usuarios
            // Utiliza la información de Firebase para buscar o crear el registro en Django
            const uid = user.uid;
            const displayName = user.displayName;
            const email = user.email;

            // Realizar una solicitud a tu backend (Django) para verificar o crear el usuario
            // Puedes usar fetch o axios para hacer la solicitud HTTP
            fetch('https://eljardindenaru.onrender.com/api/registrar_usuario/', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    uid: uid,
                    nombre: displayName,
                    email: email,
                }),
            })
            .then(response => response.json())
            .then(data => {
                // Aquí puedes manejar la respuesta del servidor, si es necesario
                console.log('Usuario registrado en Django:', data);
            });

            if (user) {
                const name = user.displayName;
                const email = user.email;
                const photoURL = user.photoURL;
                console.log(name, email, photoURL); // Agrega esta línea para ver la información del usuario en la consola
            }
            setShowAlert(true);
            

            // Resto del código...
        })
        .catch((error) => {
            // Manejar errores
            console.error('Error en el inicio de sesión:', error);
            setShowAlert3(true);
        });
    }

    
    function handleSubmitFormRegister(event) {
        event.preventDefault();
        const email = event.target.email.value;
        const password = event.target.password.value;

      
        // Registro de usuario en Firebase
        createUserWithEmailAndPassword(auth, email, password)
          .then((userCredential) => {
            // Registro exitoso en Firebase
            const user = userCredential.user;
            const uid = user.uid;
      
            // Registro de usuario en Django
            fetch('https://eljardindenaru.onrender.com/api/register_with_email_password/', {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json',
              },
              body: JSON.stringify({
                email: email,
                password: password,
                uid: uid, // Incluir también el UID obtenido de Firebase
              }),
            })
            .then(response => response.json())
            .then(data => {
              if (data.error) {
                // Si la API de Django devuelve un error, manejarlo aquí
                console.log('Error al registrar usuario:', data.error);
                setShowAlert4(true);
                // Aquí puedes mostrar un mensaje de error al usuario según sea necesario
              } else {
                // Registro exitoso en la base de datos de Django
                console.log('Usuario registrado exitosamente en Django:', data.message);
                setEmail(email);
                setShowAlert2(true); // Mostrar alerta de registro exitoso
              }
            })
            .catch(error => {
              // Manejar errores al registrar usuario en Django
              console.error('Error al registrar usuario en Django:', error);
              setShowAlert5(true);
            });
          })
          .catch((error) => {
            // Error en el registro en Firebase
            const errorCode = error.code;
            const errorMessage = error.message;
            console.error('Error en el registro en Firebase:', errorCode, errorMessage);
            setShowAlert6(true);
            // Aquí puedes mostrar un mensaje de error al usuario según sea necesario
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
                        Error en el inicio de sesión, comunicarse con +51 903 010 882.
                    </Alert>
                </div>
            )}
            {showAlert4 && (
                <div className="contenedor_alert_registro_exitoso">
                    <Alert key={"danger"} className="alerta_registro_exitoso" variant={"danger"} onClose={() => setShowAlert(false)} dismissible>
                        Error al registrar usuario en la Base de Datos.
                    </Alert>
                </div>
            )}
            {showAlert5 && (
                <div className="contenedor_alert_registro_exitoso">
                    <Alert key={"danger"} className="alerta_registro_exitoso" variant={"danger"} onClose={() => setShowAlert(false)} dismissible>
                    Error al registrar usuario en Django.
                    </Alert>
                </div>
            )}
            {showAlert6 && (
                <div className="contenedor_alert_registro_exitoso">
                    <Alert key={"danger"} className="alerta_registro_exitoso" variant={"danger"} onClose={() => setShowAlert(false)} dismissible>
                    Error en el registro en Firebase.
                    </Alert>
                </div>
            )}

            <video className="video_fondo_form_register" autoPlay loop muted>
                <source src={video_forms}></source>
            </video>


            <div className="container_form_register">
                <div className="heading_form_register">Sign In</div>
                <form onSubmit={handleSubmitFormRegister} className="form_form_register">
                    <input required="" className="input_form_register" type="email" name="email" id="email" placeholder="E-mail"/>
                    <input required="" className="input_form_register" type="password" name="password" id="password" placeholder="Password"/>
                    <input className="login-button" type="submit" value="Sign In"/>
                    
                </form>
                <div className="social-account-container">
                    <span className="title_form_register">Or Sign in with</span>
                    <div className="social-accounts">
                    <button className="social-button google" onClick={handleSignin}>
                        <svg className="svg" xmlns="http://www.w3.org/2000/svg" height="1em" viewBox="0 0 488 512">
                        <path d="M488 261.8C488 403.3 391.1 504 248 504 110.8 504 0 393.2 0 256S110.8 8 248 8c66.8 0 123 24.5 166.3 64.9l-67.5 64.9C258.5 52.6 94.3 116.6 94.3 256c0 86.5 69.1 156.6 153.7 156.6 98.2 0 135-70.4 140.8-106.9H248v-85.3h236.1c2.3 12.7 3.9 24.9 3.9 41.4z"></path>
                        </svg></button>
                    </div>
                </div>
                <span className="agreement span_log_in_go">Si ya tienes una cuenta <Link to="/form_login" className="direccionar_login_page" href="#">Log in</Link></span>
            </div>
        </div>
    );
}

export default FormRegister;
