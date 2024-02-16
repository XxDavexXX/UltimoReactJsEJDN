import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';

import TelefonoImg from './../imgs/telefono.png';
import MapaImg from './../imgs/mapa.png';
import logoHomeNaru2 from './../imgs/logoHomeNaru2.png';
import icon_user_default from './../imgs/icon_user_default.webp';
import Button from 'react-bootstrap/Button';
import Offcanvas from 'react-bootstrap/Offcanvas';
import Alert from 'react-bootstrap/Alert';

import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import './../css/NavBar.css'

// Firebase Auth 
import { app, analytics, auth } from '../firebase/firebaseConfig';
import { GoogleAuthProvider, signInWithPopup, signOut } from "firebase/auth";
import { getAuth } from "firebase/auth";
  


function Navbar() {

    const [show, setShow] = useState(false);
    const [showAlert, setShowAlert] = useState(false);
    const [showAlert2, setShowAlert2] = useState(false);
    const [showAlertEditDireccion, setShowEditDireccion] = useState(false);
    const [showAlertEditNombre, setShowEditNombre] = useState(false);
    const [showAlertEditTelefono, setShowEditTelefono] = useState(false);

    const [datosUsuario, setDatosUsuarios] = useState(false);
    const [uid_cod, setUidCod] = useState(false);

  
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    // Firebase 
    const [user, setUser] = useState(null);
    const provider = new GoogleAuthProvider();

    useEffect(() => {
        const unsubscribe = auth.onAuthStateChanged((user) => {
            if (user) {
                setUser(user);
                setUidCod(user.uid)
            } else {
                setUser(null);
            }
        });
    
        return () => {
            unsubscribe();
        };
    }, []);
    
    useEffect(() => {
        if (uid_cod) {
            fetch(`http://localhost:8000/usuarios/uid/${uid_cod}`)
                .then((response) => response.json())
                .then((data) => setDatosUsuarios(data))
                .catch((error) => console.log(error));
        }
    }, [uid_cod]);

    const handleEditAddress = async (event) => {
        event.preventDefault();

        const newAddress = event.target.querySelector('.direccion-input').value;

        // Aquí deberías tener una función que actualice la dirección de envío en la base de datos.
        // Por ejemplo, usando fetch o axios para enviar una solicitud PUT a tu API.
        // Asumamos que tienes una ruta en tu backend para actualizar la dirección de envío.
        const response = await fetch(`http://localhost:8000/usuarios/${uid_cod}/`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ direccion_envio: newAddress }),
        });

        if (response.ok) {
            // La dirección de envío se actualizó correctamente en la base de datos.
            // Puedes hacer algo aquí, como mostrar un mensaje de éxito o recargar la página.
            console.log('Dirección de envío actualizada correctamente.');
            setShowEditDireccion(true);

        } else {
            // Error al actualizar la dirección de envío en la base de datos.
            console.error('Error al actualizar la dirección de envío.');
        }
    };
    const handleEditNombre = async (event) => {
        event.preventDefault();

        const newNombre = event.target.querySelector('.nombre-input').value;

        // Aquí deberías tener una función que actualice la dirección de envío en la base de datos.
        // Por ejemplo, usando fetch o axios para enviar una solicitud PUT a tu API.
        // Asumamos que tienes una ruta en tu backend para actualizar la dirección de envío.
        const response = await fetch(`http://localhost:8000/usuarios/${uid_cod}/nombre`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ nombre: newNombre }),
        });

        if (response.ok) {
            // La dirección de envío se actualizó correctamente en la base de datos.
            // Puedes hacer algo aquí, como mostrar un mensaje de éxito o recargar la página.
            console.log('El nombre de usuario fue actualizada correctamente.');
            setShowEditNombre(true);

        } else {
            // Error al actualizar la dirección de envío en la base de datos.
            console.error('Error al actualizar el nombre.');
        }
    };
    
    const handleEditTel = async (event) => {
        event.preventDefault();

        const newTelefono = event.target.querySelector('.telefono-input').value;

        // Aquí deberías tener una función que actualice la dirección de envío en la base de datos.
        // Por ejemplo, usando fetch o axios para enviar una solicitud PUT a tu API.
        // Asumamos que tienes una ruta en tu backend para actualizar la dirección de envío.
        const response = await fetch(`http://localhost:8000/usuarios/${uid_cod}/telefono`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ telefono: newTelefono }),
        });

        if (response.ok) {
            // La Têlefono de envío se actualizó correctamente en la base de datos.
            // Puedes hacer algo aquí, como mostrar un mensaje de éxito o recargar la página.
            console.log('Têlefono de envío actualizada correctamente.');
            setShowEditTelefono(true);

        } else {
            // Error al actualizar la Têlefono de envío en la base de datos.
            console.error('Error al actualizar el Têlefono.');
        }
    };

    // console.log(datosUsuario);

    function handleLogin() {
        signInWithPopup(auth, provider)
          .then((result) => {
            // Inicio de sesión exitoso
            const credential = GoogleAuthProvider.credentialFromResult(result);
            const token = credential.accessToken;
            // const user = result.user;
            // Puedes usar 'user' para acceder a la información del usuario
            const user = auth.currentUser;
            if (user) {
                const name = user.displayName;
                const email = user.email;
                const photoURL = user.photoURL;
                console.log(name, email, photoURL); // Agrega esta línea para ver la información del usuario en la consola
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

      function handleLogout() {
        signOut(auth)
          .then(() => {
            // Sesión cerrada exitosamente
            console.log("Sesión cerrada exitosamente");
            setShowAlert2(true);
          })
          .catch((error) => {
            // Error al cerrar la sesión
            console.log(error);
          });
      }
      
    // Firebase 


    const location = useLocation();
    const { pathname } = location;

    const [menuOpen, setMenuOpen] = useState(false);

    const handleToggleMenu = () => {
        setMenuOpen(!menuOpen);
    
        // Obtén la referencia al elemento body
        const body = document.querySelector('body');
    
        if (!menuOpen) {
            // Si el menú se abre, agrega estilos al body
            body.style.overflow = 'hidden';
            body.style.paddingRight = '19px';
        } else {
            // Si el menú se cierra, restaura los estilos originales del body
            body.style.overflow = 'auto';
            body.style.paddingRight = '0';
        }
    };

    const handleLinkClick = () => {
        setMenuOpen(false);

        // Restaura los estilos originales del body al hacer clic en un enlace
        const body = document.querySelector('body');
        body.style.overflow = 'visible';
        body.style.paddingRight = '0';
    };

    return (
        <div className="contendor_todos_navbars">
            <div className="call_to_action">

                {/* Responsive 1150 px */}

                <div className="responsive_content_nums">
                    <div className="responsive_content_nums_div">
                        <div className="responsive_content_num_dos">
                            <div>I</div>
                        </div>
                        <div className="responsive_content_num">
                            <img className="img_telefono" src={TelefonoImg} alt="Icon de Telefono" />
                            <div>(+51) 903 - 010 - 882 / (+01 - 497 - 1991)</div>
                        </div>
                    </div>
                    <div className="responsive_content_nums_div">
                        <div className="responsive_content_num_dos">
                            <div>I</div>
                        </div>
                        <div className="responsive_content_num_tres">
                            <img className="img_telefono" src={MapaImg} alt="Icon de marcador de maps" />
                            <div>El Cuadro, Chaclacayo, Lima - Perú</div>
                        </div>
                    </div>
                </div>

                {/* Responsive 1150 px */}

                <div className="content_num">
                    <img className="img_telefono" src={TelefonoImg} alt="Icon de Telefono" />
                    <div>(+51) 903 - 010 - 882 / (+01 - 497 - 1991)</div>
                </div>
                <div className="content_num_dos">
                    <div>I</div>
                </div>
                <div className="content_num_tres">
                    <img className="img_telefono" src={MapaImg} alt="Icon de marcador de maps" />
                    <div>El Cuadro, Chaclacayo, Lima - Perú</div>
                </div>
                <div className="content_num_dos">
                    <div>I</div>
                </div>
                {showAlert2 && (
                <div className="contenedor_alert_registro_exitoso">
                    <Alert key={"warning"} className="alerta_registro_exitoso" variant={"warning"} onClose={() => setShowAlert(false)} dismissible>
                        Haz cerrado sesión correctamente.
                    </Alert>
                </div>
                )}
                {showAlertEditDireccion && (
                <div className="contenedor_alert_registro_exitoso">
                    <Alert key={"warning"} className="alerta_registro_exitoso" variant={"success"} onClose={() => setShowEditDireccion(false)} dismissible>
                        Dirección actualizada correctamente.
                    </Alert>
                </div>
                )}
                {showAlertEditNombre && (
                <div className="contenedor_alert_registro_exitoso">
                    <Alert key={"warning"} className="alerta_registro_exitoso" variant={"success"} onClose={() => setShowEditNombre(false)} dismissible>
                        Nombre actualizado correctamente.
                    </Alert>
                </div>
                )}
                {showAlertEditTelefono && (
                <div className="contenedor_alert_registro_exitoso">
                    <Alert key={"warning"} className="alerta_registro_exitoso" variant={"success"} onClose={() => setShowEditTelefono(false)} dismissible>
                        Télefono actualizado correctamente.
                    </Alert>
                </div>
                )}

                {user ? (
                        <div>
                            <img onClick={handleShow} style={{borderRadius:"50%",height:"60px"}} src={user.photoURL || icon_user_default} alt="Profile" />
                            <Offcanvas show={show} onHide={handleClose} placement='end' className="superponer_offcanvas">
                                <Offcanvas.Header closeButton>
                                    <Offcanvas.Title>Tu Perfil</Offcanvas.Title>
                                    </Offcanvas.Header>
                                    <Offcanvas.Body>
                                        <div style={{display:"flex",flexDirection:'column',width:"100%",height:'100%'}}>
                                            <div style={{height:'90%'}}>
                                                <div style={{display:"flex",width:"100%", justifyContent:'center', marginTop:'10px'}}>
                                                <img style={{borderRadius:"50%",height:"180px"}} src={user.photoURL || icon_user_default} referrerpolicy="no-referrer" alt="Profile" />
                                                </div>

                                                <div style={{display:"flex",flexDirection:'column',width:"100%", justifyContent:'flex-start', margin:'20px 10px 10px 10px'}}>
                                                    <b>Nombre:</b>
                                                    {datosUsuario ? (datosUsuario.nombre ? datosUsuario.nombre : 
                                                        <form className="direccion-form" onSubmit={handleEditNombre}>
                                                            <input className="nombre-input" placeholder="ejm. Tito Quispe" type="text" />
                                                            <button className="direccion-btn" type="submit">Editar</button>
                                                        </form> 
                                                    ) : ''}
                                                </div>
                                                <div style={{display:"flex",flexDirection:'column',width:"100%", justifyContent:'flex-start', margin:'10px'}}>
                                                    <b>Correo:</b>
                                                    {user.email}
                                                </div>
                                                <div style={{display:"flex",flexDirection:'column',width:"100%", justifyContent:'flex-start', margin:'10px'}}>
                                                    <b>Teléfono:</b>
                                                    {datosUsuario ? (datosUsuario.telefono ? `+51 ${datosUsuario.telefono}` : 
                                                        <form className="direccion-form" onSubmit={handleEditTel}>
                                                            <input className="telefono-input" placeholder="ejm. ###-###-###" type="text" />
                                                            <button className="direccion-btn" type="submit">Editar</button>
                                                        </form> 
                                                    ) : ''}

                                                </div>
                                                <div style={{display:"flex",flexDirection:'column',width:"100%", justifyContent:'flex-start', margin:'10px'}}>
                                                    <b>Dirección de envios:</b>
                                                    {datosUsuario ? (datosUsuario.direccion_envio ? datosUsuario.direccion_envio : 
                                                        <form className="direccion-form" onSubmit={handleEditAddress}>
                                                            <input className="direccion-input" placeholder="ejm. Av. Cusco 128" type="text" />
                                                            <button className="direccion-btn" type="submit">Editar</button>
                                                        </form> 
                                                    ) : ''}
                                                </div>
                                            </div>
                                            <div style={{display:"flex",justifyContent:'center',alignItems:'flex-end',width:"100%",height:'10%',marginBottom:'20px'}}>
                                                <Button onClick={handleLogout} variant="danger" className="btn_cerrar_sesion">Cerrar Sesión</Button>
                                            </div>
                                        </div>
                                       
                                        
                                    </Offcanvas.Body>
                            </Offcanvas>
                        </div>
                ) : (

                    <div className="contenedor_log_sign_flex">
                        <div className="content_num_cuatro div_cuatro_uno">
                            <Link className="btn_go_register_form" to="/form_registrarse">
                                <button className="btn" >
                                    <div className="wrapper">
                                        <div className="text">Registrarse </div>

                                        <div className="flower flower1">
                                            <div className="petal one"></div>
                                            <div className="petal two"></div>
                                            <div className="petal three"></div>
                                            <div className="petal four"></div>
                                        </div>
                                        <div className="flower flower2">
                                            <div className="petal one"></div>
                                            <div className="petal two"></div>
                                            <div className="petal three"></div>
                                            <div className="petal four"></div>
                                        </div>
                                        <div className="flower flower3">
                                            <div className="petal one"></div>
                                            <div className="petal two"></div>
                                            <div className="petal three"></div>
                                            <div className="petal four"></div>
                                        </div>
                                        <div className="flower flower4">
                                            <div className="petal one"></div>
                                            <div className="petal two"></div>
                                            <div className="petal three"></div>
                                            <div className="petal four"></div>
                                        </div>
                                        <div className="flower flower5">
                                            <div className="petal one"></div>
                                            <div className="petal two"></div>
                                            <div className="petal three"></div>
                                            <div className="petal four"></div>
                                        </div>
                                        <div className="flower flower6">
                                            <div className="petal one"></div>
                                            <div className="petal two"></div>
                                            <div className="petal three"></div>
                                            <div className="petal four"></div>
                                        </div>
                                    </div>
                                </button>
                            </Link>
                        </div>
                        <div className="content_num_cuatro">
                            <Link className="btn_go_register_form" to="/form_login">
                                <button className="btn">
                                    <div className="wrapper">
                                        <div className="text">Login </div>

                                        <div className="flower flower1">
                                            <div className="petal one"></div>
                                            <div className="petal two"></div>
                                            <div className="petal three"></div>
                                            <div className="petal four"></div>
                                        </div>
                                        <div className="flower flower2">
                                            <div className="petal one"></div>
                                            <div className="petal two"></div>
                                            <div className="petal three"></div>
                                            <div className="petal four"></div>
                                        </div>
                                        <div className="flower flower3">
                                            <div className="petal one"></div>
                                            <div className="petal two"></div>
                                            <div className="petal three"></div>
                                            <div className="petal four"></div>
                                        </div>
                                        <div className="flower flower4">
                                            <div className="petal one"></div>
                                            <div className="petal two"></div>
                                            <div className="petal three"></div>
                                            <div className="petal four"></div>
                                        </div>
                                        <div className="flower flower5">
                                            <div className="petal one"></div>
                                            <div className="petal two"></div>
                                            <div className="petal three"></div>
                                            <div className="petal four"></div>
                                        </div>
                                        <div className="flower flower6">
                                            <div className="petal one"></div>
                                            <div className="petal two"></div>
                                            <div className="petal three"></div>
                                            <div className="petal four"></div>
                                        </div>
                                    </div>
                                </button>
                            </Link>
                        </div>
                    </div>

                )}


            </div>

            {/* Responsive 780 px */}

            <nav className="navbar responsive_siete_ochenta_navbar bg-body-tertiary fixed-top">

                
                <div className="container-fluid">


                    <button className="navbar-toggler" type="button" data-bs-toggle="offcanvas" data-bs-target="#offcanvasNavbar" aria-controls="offcanvasNavbar" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>

                    {user ? (
                        <div>
                            <img onClick={handleShow} style={{borderRadius:"50%",height:"60px"}} src={user.photoURL || icon_user_default} alt="Profile" />
                        </div>
                    ) : (

                        <div className="content_num_cuatro div_cuatro_uno">
                            <Link className="btn_go_register_form" to="/form_registrarse">
                                <button className="btn" >
                                    <div className="wrapper">
                                        <div className="text">Registrarse </div>

                                        <div className="flower flower1">
                                            <div className="petal one"></div>
                                            <div className="petal two"></div>
                                            <div className="petal three"></div>
                                            <div className="petal four"></div>
                                        </div>
                                        <div className="flower flower2">
                                            <div className="petal one"></div>
                                            <div className="petal two"></div>
                                            <div className="petal three"></div>
                                            <div className="petal four"></div>
                                        </div>
                                        <div className="flower flower3">
                                            <div className="petal one"></div>
                                            <div className="petal two"></div>
                                            <div className="petal three"></div>
                                            <div className="petal four"></div>
                                        </div>
                                        <div className="flower flower4">
                                            <div className="petal one"></div>
                                            <div className="petal two"></div>
                                            <div className="petal three"></div>
                                            <div className="petal four"></div>
                                        </div>
                                        <div className="flower flower5">
                                            <div className="petal one"></div>
                                            <div className="petal two"></div>
                                            <div className="petal three"></div>
                                            <div className="petal four"></div>
                                        </div>
                                        <div className="flower flower6">
                                            <div className="petal one"></div>
                                            <div className="petal two"></div>
                                            <div className="petal three"></div>
                                            <div className="petal four"></div>
                                        </div>
                                    </div>
                                </button>
                            </Link>
                            
                        </div>
                    )}


                    <div className={`offcanvas offcanvas-end${menuOpen ? ' show' : ''}`} tabIndex="-1" id="offcanvasNavbar" aria-labelledby="offcanvasNavbarLabel">
                        <div className="offcanvas-header">
                            <button type="button" className="btn-close justify-content-end" data-bs-dismiss="offcanvas" aria-label="Close" onClick={handleToggleMenu}></button>
                        </div>
                        <div className="offcanvas-body">
                            <ul className="navbar-nav justify-content-start flex-grow-1 pe-3 contenedor_ul_siete_ochenta">

                                <li className="navbar-item">
                                    <Link style={{ width: '60px' }} className={`nav-link a_nav_celular ${pathname === '/' ? 'active active_link_this' : ''}`} to="/" onClick={handleLinkClick}>Inicio</Link>
                                </li>

                                <li className="navbar-item">
                                    <Link style={{ width: '170px' }} className={`nav-link a_nav_celular ${pathname === '/comprar_plantas' ? 'active active_link_this' : ''}`} to="/comprar_plantas" onClick={handleLinkClick}>Comprar plantas</Link>
                                </li>
                                <li className="navbar-item">
                                    <Link style={{ width: '95px' }} className={`nav-link a_nav_celular ${pathname === '/nosotros' ? 'active active_link_this' : ''}`} to="/nosotros" onClick={handleLinkClick}>Nosotros</Link>
                                </li>
                                <li className="navbar-item">
                                    <Link style={{ width: '205px' }} className={`nav-link a_nav_celular ${pathname === '/preguntas-frecuentes' ? 'active active_link_this' : ''}`} to="/preguntas-frecuentes" onClick={handleLinkClick}>Preguntas frecuentes</Link>
                                </li>
                                <li className="navbar-item">
                                    <Link style={{ width: '85px' }} className={`nav-link a_nav_celular ${pathname === '/eventos' ? 'active active_link_this' : ''}`} to="/eventos" onClick={handleLinkClick}>Eventos</Link>
                                </li>
                            </ul>

                            <div className="content_num_cuatro_responsive_siete_ochenta justify-content-center flex-grow-1 pe-3">
                                <Link className="btn_go_register_form" to="/form_login">
                                    <button className="btn btn_flores_log">
                                        <div className="wrapper">
                                            <div className="text">Login </div>

                                            <div className="flower flower1">
                                                <div className="petal one"></div>
                                                <div className="petal two"></div>
                                                <div className="petal three"></div>
                                                <div className="petal four"></div>
                                            </div>
                                            <div className="flower flower2">
                                                <div className="petal one"></div>
                                                <div className="petal two"></div>
                                                <div className="petal three"></div>
                                                <div className="petal four"></div>
                                            </div>
                                            <div className="flower flower3">
                                                <div className="petal one"></div>
                                                <div className="petal two"></div>
                                                <div className="petal three"></div>
                                                <div className="petal four"></div>
                                            </div>
                                            <div className="flower flower4">
                                                <div className="petal one"></div>
                                                <div className="petal two"></div>
                                                <div className="petal three"></div>
                                                <div className="petal four"></div>
                                            </div>
                                            <div className="flower flower5">
                                                <div className="petal one"></div>
                                                <div className="petal two"></div>
                                                <div className="petal three"></div>
                                                <div className="petal four"></div>
                                            </div>
                                            <div className="flower flower6">
                                                <div className="petal one"></div>
                                                <div className="petal two"></div>
                                                <div className="petal three"></div>
                                                <div className="petal four"></div>
                                            </div>
                                        </div>
                                    </button>
                                </Link>
                            </div>

                        </div>
                    </div>

                </div>
            </nav>


            {/* Responsive 780 px */}

            <nav className="navbar_div_blanco">
                <div className="content_logo_navbar">
                    <img className="img_logo" src={logoHomeNaru2} alt="Logo de El Jardín de Naru" />
                    <ul className="navbar-items ul_normal_inicio_completo">
                        <li className="navbar-item">
                            <Link className={`navbar-list ${pathname === '/' ? 'active' : ''}`} to="/">Inicio</Link>
                        </li>
                        <li className="navbar-item">
                            <Link className={`navbar-list ${pathname === '/comprar_plantas' ? 'active' : ''}`} to="/comprar_plantas">Comprar plantas</Link>
                        </li>
                        <li className="navbar-item">
                            <Link className={`navbar-list ${pathname === '/nosotros' ? 'active' : ''}`} to="/nosotros">Nosotros</Link>
                        </li>
                        <li className="navbar-item">
                            <Link className={`navbar-list ${pathname === '/preguntas-frecuentes' ? 'active' : ''}`} to="/preguntas-frecuentes">Preguntas frecuentes</Link>
                        </li>
                        <li className="navbar-item">
                            <Link className={`navbar-list ${pathname === '/eventos' ? 'active' : ''}`} to="/eventos">Eventos</Link>
                        </li>
                    </ul>
                </div>
            </nav>
            <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.1.3/dist/js/bootstrap.bundle.min.js"></script>
            <script src="//cdnjs.cloudflare.com/ajax/libs/jquery/3.2.1/jquery.min.js"></script>
        </div>
    );
}

export default Navbar;
