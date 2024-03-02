import React, { useState, useEffect, useRef } from 'react';
import { useParams } from "react-router-dom";
import { Link } from 'react-router-dom';
import './../css/PagarPage.css'
import QR_YAPE from './../imgs/qr_yape.jpeg'
import emailjs from '@emailjs/browser';
import Alert from 'react-bootstrap/Alert';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';


import { auth } from '../firebase/firebaseConfig';

import Navbar from './NavBar';

import Fotter from './Fotter';


function PagarPage(){
    const { id } = useParams();
    const { categoria } = useParams();
    const { macetaplanta } = useParams();
    const [planta, setPlanta] = useState(null);
    const [showAlert, setShowAlert] = useState(false);
    const [showAlert2, setShowAlert2] = useState(false);
    const [maceta, setMaceta] = useState(null);
    const [idmaceta, setIdMaceta] = useState(null);
    const [plantamaceta, setPlantaMaceta] = useState(null);
    const [user, setUser] = useState(null);
    const [datosUsuario, setDatosUsuarios] = useState(false);
    const [uid_cod, setUidCod] = useState(false);
    const [buttonDisabled, setButtonDisabled] = useState(false);

    // const [loading, setLoading] = useState(true);
    const [cantidad, setCantidad] = useState(1);
    const delivery = 12;

    useEffect(() => {
        fetch(`https://eljardindenaru.onrender.com/fotos_planta_maceta/planta/${id}/${macetaplanta}`)
          .then((response) => response.json())
          .then((data) => {
            setPlantaMaceta(data);
            setIdMaceta(data.maceta);
          })
          .catch((error) => {
            console.log(error);
        });
    }, [id, macetaplanta]);

    
    useEffect(() => {
        fetch(`https://eljardindenaru.onrender.com/macetas/${idmaceta}`)
          .then((response) => response.json())
          .then((data) => setMaceta(data))
          .catch((error) => {
            console.log(error);// Cambiar loading a false en caso de error
        });
      }, [idmaceta]);

    const handleCantidadChange = (event) => {
        setCantidad(Number(event.target.value));
      };

    // console.log(id);
    // console.log(categoria);

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
            fetch(`https://eljardindenaru.onrender.com/usuarios/uid/${uid_cod}`)
                .then((response) => response.json())
                .then((data) => setDatosUsuarios(data))
                .catch((error) => {
                    console.log(error);
                });
        }
    }, [uid_cod]);

  useEffect(() => {
    fetch(`https://eljardindenaru.onrender.com/plantas/${id}/${categoria}`)
      .then((response) => response.json())
      .then((data) => setPlanta(data))
      .catch((error) => {
        console.log(error);
    });
  }, [id, categoria]);
  console.log(maceta);

    const form = useRef();

    const sendEmail = (e) => {
      e.preventDefault();
      setButtonDisabled(true);
      emailjs
        .sendForm('service_q7yi996', 'template_3tfletq', form.current, {
          publicKey: 'oLMOSMnzsCqsfBCVy',
        })
        .then(
          () => {
            if(!buttonDisabled){
                console.log('SUCCESS!');
                setShowAlert2(true)
            }else{
                console.log('Ya se ah enviado un correo!');
            }
          },
          (error) => {
            console.log('FAILED...', error.text);
            setButtonDisabled(false);
          },
        );
    };

    const isUserDataValid = datosUsuario && datosUsuario.nombre !== '' && datosUsuario.email !== '' && datosUsuario.telefono !== '' && datosUsuario.direccion_envio !== '';

    const handleFormSubmit = (event) => {
        if (isUserDataValid == false) {
            setShowAlert(true);
            event.preventDefault();
        }
    };

    return (

        <div style={{width:"100%", height:"100vh"}}>
            {!planta &&
                <div className="container_loader loader_pd_center">
                    <div className="tree_arbol_loader top_non_px">
                        {[0, 1, 2, 3].map((x) => (
                            <div className="branch_loader" style={{ '--x': x }} key={x}>
                                {[0, 1, 2, 3].map((i) => (
                                    <span style={{ '--i': i }} key={i}></span>
                                ))}
                            </div>
                        ))}
                        <div className="stem">
                            {[0, 1, 2, 3].map((i) => (
                                <span style={{ '--i': i }} key={i}></span>
                            ))}
                        </div>
                        <span className="shadow"></span>
                    </div>
                </div>
            }
        
            {planta && (
                <div className="content_nosotros">

                    {showAlert && (
                        <div className="contenedor_alert_registro_exitoso">
                            <Alert key={"danger"} className="alerta_form_mal_datos_usuarios" variant={"danger"} onClose={() => setShowAlert(false)} dismissible>
                                Por favor completar todos los Datos de Usuario.
                            </Alert>
                        </div>
                    )}

                {showAlert2 && (
                        <div className="contenedor_alert_registro_exitoso">
                            <Alert key={"success"} className="alerta_form_mal_datos_usuarios" variant={"success"} onClose={() => setShowAlert(false)} dismissible>
                                
                                Correo de compra completada enviada exitosamente.<Link className="link_regresar_home" to="/">Click aquí</Link> para regresar.
                            </Alert>
                        </div>
                )}

                    <Navbar />    

                            <div className="center-wrapper-pp">
                                <div className="content_pp">
                                    <div className='contenedor_datos_perfil'>
                                        <div className='contenedor_datos_perfil_tittle'>Datos del Usuario:</div>
                                        <div className='contenedor_datos_perfil_inputs'>
                                            <div className='contenedor_datos_perfil_inputs_uno'>
                                                <div className='content_content_datos_users'>
                                                    <div style={{marginBottom:'10px'}}>Nombre* :</div>
                                                    <input placeholder="No definido" value={datosUsuario ? datosUsuario.nombre : 'No definido'} disabled type="text" name="text" class="input_pp_dp"/>
                                                    {datosUsuario.nombre ? '' : <div style={{color:'red', fontWeight:'500'}}>Edita el campo Nombre en tu perfíl.</div>}
                                                </div>
                                                <div className='content_content_datos_users'>
                                                    <div style={{marginBottom:'10px'}}>Email* :</div>
                                                    <input placeholder="No definido" value={datosUsuario ? datosUsuario.email : 'No definido'}  disabled type="text" name="text" class="input_pp_dp"/>
                                                </div>
                                            </div>
                                            <div className='contenedor_datos_perfil_inputs_uno'>
                                                <div className='content_content_datos_users'>
                                                    <div style={{marginBottom:'10px'}}>Telefono* :</div>
                                                    <input placeholder="No definido" value={datosUsuario ? datosUsuario.telefono : 'No definido'}  disabled type="text" name="text" class="input_pp_dp"/>
                                                    {datosUsuario.telefono ? '' : <div style={{color:'red', fontWeight:'500'}}>Edita el campo Telefono en tu perfíl.</div>}
                                                </div>
                                                <div className='content_content_datos_users'>
                                                    <div style={{marginBottom:'10px'}}>Dirección* :</div>
                                                    <input placeholder="No definido" value={datosUsuario ? datosUsuario.direccion_envio : 'No definido'}  disabled type="text" name="text" class="input_pp_dp"/>
                                                    {datosUsuario.direccion_envio ? '' : <div style={{color:'red', fontWeight:'500'}}>Edita el campo Dirección en tu perfíl.</div>}
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <hr></hr>
                                    <div className="bag-product_pp">
                                        <div className="image_pp">
                                            <img src={`${process.env.PUBLIC_URL}/${plantamaceta ? plantamaceta.imagen:'...cargando'}`} alt='Cargando ...' className="product-image_pp"/>
                                        </div>
                                        <div className="description_pp">
                                            <p className="product-code_pp small_pp muted_pp">Código del producto: {planta ? Math.round(planta.id * 2230 / 4) : 'Cargando...'}</p>
                                            <h1 style={{fontFamily:'a', fontWeight:'900'}} className='h1_pp'>{planta ? planta.nombre : 'Cargando...'}</h1>
                                            <p><button className='button_pp_cate'> {planta ? planta.categoria : 'Cargando...'} </button></p>
                                            <p className="description-text_pp">{planta ? planta.cuidados : 'Cargando...'}</p>
                                            <p><button class="btn_pp_pp">{planta ? planta.dificultad : 'Cargando...'}</button></p>
                                            <h2 className='h2_pp'>S/. {planta ? (Number(planta.precio) + Number(plantamaceta ? plantamaceta.maceta_precio : 0.00)).toFixed(2) : 'Cargando...'}</h2>
                
                                            <div className="quantity-wrapper_pp">
                                                <div>
                                                    <label htmlFor="quantity">Cantidad:</label>
                                                    <select className='select_pp' name="quantity" value={cantidad} onChange={handleCantidadChange}>
                                                        <option value disabled>Seleccionar</option>
                                                        <option value="1" selected>1</option>
                                                        <option value="2">2</option>
                                                        <option value="3">3</option>
                                                        <option value="4">4</option>
                                                        <option value="5">5</option>
                                                        <option value="6">6</option>
                                                        <option value="7">7</option>
                                                        <option value="8">8</option>
                                                        <option value="9">9</option>
                                                        <option value="10">10</option>
                                                    </select>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="bag-total_pp">
                                        <div className="subtotal_pp">
                                            <p className="small_pp_firstline">Subtotal:</p>
                                            <p className="small_pp_firstline">S/. {planta && plantamaceta ? ((Number(planta.precio) + Number(plantamaceta ? plantamaceta.maceta_precio : 0.00)) * cantidad).toFixed(2) : 'Cargando...'}</p>
                                        </div>
                                        <div className="delivery">
                                            <p className="small_pp_secondline">Delivery (Precio estandar):<br></br>
                                            </p>
                                            <p className="small_pp_secondline">S/. {delivery.toFixed(2)}</p>
                                        </div>
                                        <hr></hr>
                                        <div className="total_pp">
                                            <h3 className='small_pp_tercerline'>Total:</h3>
                                            <h3 className='small_pp_tercerline'>S/. {planta && plantamaceta ? (((Number(planta.precio) + Number(plantamaceta ? plantamaceta.maceta_precio : 0.00)) * cantidad) + delivery).toFixed(2) : 'Cargando...'}</h3>
                                        </div>
                                        <div className='contendir_btn_form_etc_dalenomas' style={{width:'100%', height:'100%', display:'flex', justifyContent:'center'}}>
                                            <form ref={form} onSubmit={sendEmail}>
                                            {/* Datos de Usuario  */}
                                            <input type="text" hidden id="nombre" value={datosUsuario ? datosUsuario.nombre : 'No definido'} name="user_name" required />
                                            <input type="email" id="email"hidden value={datosUsuario ? datosUsuario.email : 'No definido'} name="user_email" required />
                                            <input type="tel" id="telefono" hidden value={datosUsuario ? datosUsuario.telefono : 'No definido'} name="user_telefono" required />
                                            <input type="text" id="direccion" hidden value={datosUsuario ? datosUsuario.direccion_envio : 'No definido'} name="user_direccion_envio" required />
                                            {/* Datos Producto (Planta)  */}
                                            <input type="text" hidden id="nombre_planta" value={planta ? planta.nombre : 'No definido'} name="user_nombre_planta" required />
                                            <input type="text" hidden id="tipo_nombre_planta" value={planta ? planta.tipo_planta_id.nombre : 'No definido'} name="user_tipo_planta" required />
                                            <input type="text" hidden id="categoria_planta" value={planta ? planta.categoria : 'No definido'} name="user_categoria_planta" required />
                                            <input type="text" hidden id="descripcion_planta" value={planta ? planta.descripcion : 'No definido'} name="user_descripcion_planta" required />
                                            <input type="text" hidden id="precio_planta_solo" value={planta ? planta.precio : 'No definido'} name="user_precio_planta_solo" required />
                                            {/* Datos Producto (Maceta)  */}
                                            <input type="text" hidden id="nombre_maceta" value={maceta ? maceta.nombre : 'No definido'} name="user_nombre_maceta" required />
                                            <input type="text" hidden id="medidasmaceta" value={maceta ? maceta.medidasmaceta : 'No definido'} name="user_medidasmaceta" required />
                                            <input type="text" hidden id="material_maceta" value={maceta ? maceta.material : 'No definido'} name="user_material_maceta" required />
                                            <input type="text" hidden id="precio_maceta_solo" value={maceta ? maceta.precio : 'No definido'} name="user_precio_maceta_solo" required />
                                            <input type="text" hidden id="incluye_maceta" value={maceta ? maceta.incluye : 'No definido'} name="user_incluye_maceta" required />
                                            {/* Datos Producto (Planta con Maceta)  */}
                                            <input type="text" hidden id="medidasmacetaplanta" value={plantamaceta ? plantamaceta.medidasmacetaplanta : 'No definido'} name="user_medidasmacetaplanta" required />
                
                                            {/* precios compra  */}
                                            <input type="number" id="cantidad" hidden value={cantidad} name="user_cantidad_producto" required />
                                            <input type="text" id="precio_delivery" hidden value={delivery.toFixed(2)} name="user_precio_delivery" required />
                                            <input type="text" id="precio_unidad" hidden value={planta ? (Number(planta.precio) + Number(plantamaceta ? plantamaceta.maceta_precio : 0.00)).toFixed(2) : 'Cargando...'} name="user_precio_unidad" required />
                                            <input type="text" id="precio_subtotal" hidden value={planta && plantamaceta ? ((Number(planta.precio) + Number(plantamaceta ? plantamaceta.maceta_precio : 0.00)) * cantidad).toFixed(2) : 'Cargando...'} name="user_precio_subtotal" required />
                                            <input type="text" id="precio_total" hidden value={planta && plantamaceta ? (((Number(planta.precio) + Number(plantamaceta ? plantamaceta.maceta_precio : 0.00)) * cantidad) + delivery).toFixed(2) : 'Cargando...'} name="user_precio_total" required />
                                                <button className='button_pp_btn_pagar_yape' disabled={buttonDisabled}>
                                                    <span> <input style={{width:'100%', background:'#2a8d7e',color:'#fff', border:'none'}} type="submit" value="Confirmar Pago y Enviar Detalles" onClick={handleFormSubmit}/> </span>
                                                </button>
                                            </form>
                                            {/* <button className='button_pp_btn_pagar_yape'>
                                                <span> Confirmar Pago y Enviar Detalles </span>
                                            </button> */}
                                        </div>
                                    </div>
                
                                    <div className='contenedor_yape'>
                                        <div className="contenedor_yape_img">
                                            <img src={QR_YAPE}></img>
                                        </div>
                                        <div className='contenedor_yape_text'>
                                            <div>¡Hola a todos los amantes de las plantas! <br></br> <br></br>
                
                                            En El Jardín de Naru, queremos hacer que tu experiencia de compra sea lo más conveniente y segura posible. Por eso, hemos implementado una nueva opción de pago a través de QR, ¡sí, así de fácil y rápido! <br></br> <br></br>
                
                                            Cuando completes tu compra, tendrás la opción de pagar escaneando nuestro código QR con tu aplicación de pago favorita "Yape". Este método de pago es extremadamente seguro y eficiente, lo que significa que puedes pagar tus plantas con total tranquilidad. <br></br> <br></br>
                
                                            Una vez que hayas realizado el pago, nuestro equipo se encargará de validar la transacción lo más pronto posible. Una vez confirmado el pago, nos pondremos en contacto contigo para coordinar la entrega de tus plantas. ¡Así de simple! <br></br><br></br>
                
                                            Recuerda que esta opción de pago es completamente segura, te animamos a probarla para disfrutar de una experiencia de compra aún más fluida. ¡Esperamos poder llevarte tus plantas pronto y verte disfrutando de un pequeño trozo de naturaleza en tu hogar!<br></br><br></br>
                
                                            ¡Gracias por confiar en El Jardín de Naru para tus compras de plantas!
                                            </div>
                                        </div>
                                    </div>
                
                                    <div className="help">
                                        <p style={{fontFamily:'a', fontSize:'22px'}}>Necesitas ayuda? Llama gratis a +51 903 010 882</p>
                                    </div>
                                </div>
                            </div>

                    
                    <Fotter />


                    {/* <script src="./../assets/vendors/jquery/jquery-3.4.1.js"></script> */}
                    <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.1.3/dist/js/bootstrap.bundle.min.js"></script>
                    <script src="//cdnjs.cloudflare.com/ajax/libs/jquery/3.2.1/jquery.min.js"></script>

                    {/* <script src="./../assets/vendors/bootstrap/bootstrap.bundle.js"></script> */}
                </div>
            )}

        </div>

    );
}

export default PagarPage;
