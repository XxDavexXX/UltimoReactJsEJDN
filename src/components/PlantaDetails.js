import React, { useState, useEffect, useContext } from 'react';
import { useParams } from "react-router-dom";
import { Link } from 'react-router-dom';

import Navbar from './NavBar';
import Fotter from './Fotter';
import Table from 'react-bootstrap/Table';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import ic_ojo from './../imgs/ic_ojo.png'
import ic_carrito_compras from './../imgs/ic_carrito_compras.png'

import Tab from 'react-bootstrap/Tab';
import Tabs from 'react-bootstrap/Tabs';

import "../css/PlantaDetails.css";

import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';

// Firebase Auth 
import { auth } from '../firebase/firebaseConfig';


function MyVerticallyCenteredModalPd(props) {

    if (!props.plantacategoria) {
        return null; // O puedes manejar este caso de otra manera según tus necesidades
    }

    return (
        <Modal
            {...props}
            size="lg"
            aria-labelledby="contained-modal-title-vcenter"
            centered
            className="darle_radio_modal"
        >
            <Modal.Header className="header_modal_ojo_planta" closeButton>
                <Modal.Title id="contained-modal-title-vcenter">
                    <div className="titulo_modal_ojo_planta">{props.plantacategoria.nombre}</div>
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <div className="modal-content contenedor_img_desc_modal">
                    <div className="modal-img-container">
                        <img
                            src={`${process.env.PUBLIC_URL}/${props.plantacategoria.imgplanta}`}
                            alt={props.plantacategoria.nombre}
                            className="modal-img"
                        />
                    </div>
                    <div className="modal-description">
                        <h4>Descripción</h4>
                        <p className="descripcion_plantas_producto_modal_cp">
                            {props.plantacategoria.descripcion}
                        </p>
                        <h4>Precio</h4>
                        <p>
                            S/. {props.plantacategoria.precio}
                        </p>
                        <h4>Stock</h4>
                        <p>
                            {props.plantacategoria.stock}
                        </p>
                        <h4>Categoria</h4>
                        <p className="categoria_p">
                            {props.plantacategoria.categoria}
                        </p>
                    </div>
                </div>
            </Modal.Body>
            <Modal.Footer className="fotter_ojo_planta">
                <Button className="btn_close_modal_ojo" onClick={props.onHide}>Close</Button>
            </Modal.Footer>
        </Modal>

    );
}

function Planta() {
  const { id } = useParams();
  const { categoria } = useParams();
  const [planta, setPlanta] = useState(null);
  const [plantasmacetas, setPlantaMaceta] = useState(null);
  const [macetas, setMaceta] = useState(null);
  const [plantaCategorias, setPlantaCategorias] = useState(null);

  const [modalShow, setModalShow] = React.useState(false);
  const [selectedPlanta, setSelectedPlanta] = useState(null);

  const [imagenPrincipal, setImagenPrincipal] = useState(null);

  const [selectedImage, setSelectedImage] = useState(null);

  const [user, setUser] = useState(null);
  
  const [precio_m_p, setPrecio] = useState(null);
    // Registro completo sin filtros de las planta 

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


  useEffect(() => {
    fetch(`https://eljardindenaru.onrender.com/plantas/${id}/${categoria}`)
      .then((response) => response.json())
      .then((data) => setPlanta(data))
      .catch((error) => console.log(error));
  }, [id, categoria]);

  const cambiarImagenPrincipal = (nuevaImagen) => {
    if (planta) {
      setImagenPrincipal(`${process.env.PUBLIC_URL}/${nuevaImagen}`);
      setSelectedImage(nuevaImagen);
    }
  }

  const handleClick = (registro) => {
    cambiarImagenPrincipal(registro.imagen);
    setPrecio(registro.maceta_precio);
    setMaceta(registro);
  }


  useEffect(() => {
    fetch(`https://eljardindenaru.onrender.com/plantas/${categoria}`)
      .then((response) => response.json())
      .then((data) => setPlantaCategorias(data))
      .catch((error) => console.log(error));
  }, [categoria]);
  
  useEffect(() => {
    fetch(`https://eljardindenaru.onrender.com/fotos_planta_maceta/planta/${id}/`)
      .then((response) => response.json())
      .then((data) => {
        setPlantaMaceta(data)
        if (data && Array.isArray(data)) {
          const filteredMacetas = data.filter(item => item.maceta_precio === 0 || item.maceta_precio === 0.00);
          if (filteredMacetas.length > 0) {
            setMaceta(filteredMacetas[0]); // Tomar el primer elemento si hay coincidencias
          }
        }
      })
      .catch((error) => console.log(error));
  }, [id]);

  

    console.log(user);

  const handlePlantaClick = (plantacategoria) => {
        setSelectedPlanta(plantacategoria);
        setModalShow(true);
        console.log(plantacategoria);
    };


  // Aquí separas el campo beneficios por el caracter "-" y lo guardas en una variable

  let beneficios = [];
  if (planta && planta.beneficios) {
    beneficios = planta.beneficios.split("-");
  }
  
  const listItems = beneficios.map((beneficio, index) => <li className="li_ecomerce_pd_description" key={index + beneficio}>{beneficio}</li>); // Aquí asignas una clave única a cada elemento <li>


// Aquí recorres el array de beneficios y creas un elemento <li> por cada beneficio



  return (

    <div style={{width:"100%", height:"100vh", overflow:"hidden"}}>
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
            <div className="contenedor_pd_total content_pd_details">
            <Navbar/>
    
             {/* <!-- Breadcrumb Section Begin --> */}
            <div className="breadcrumb-section set-bg">
                <div className="container_pd">
                    <div className="row">
                        <div className="col-lg-12 text-center contenedor_titulo_responsive_600_700">
                            <div className="breadcrumb__text">
                                {/* Mostrar el nombre de la planta si existe */}
                                <h2>{planta ? planta.nombre : 'Cargando...'}</h2>
                                <div className="breadcrumb__option">
                                    <a href="./index.html">Home</a>
                                    <a href="./index.html">Comprar Plantas</a>
                                    <span>{planta ? planta.nombre : 'Cargando...'}</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            {/* <!-- Breadcrumb Section End --> */}
    
            <div className="contenedor_product_ecomerce_pd">
                <section className="product_ecomerce_pd">
                    <div className="product__photo">
                        <div className="photo-container">
                            <div className="photo-main">
                                <div className="controls_ecomerce_pd">
                                    <i className="material-icons">share</i>
                                    <i className="material-icons">favorite_border</i>
                                </div>
    
                                <img className="img_product_ecomerce_pd" src={imagenPrincipal ? imagenPrincipal : `${process.env.PUBLIC_URL}/${planta ? planta.imgplanta:'...cargando'}`} alt='Cargando ...'/>
    
                            </div>
                            <div className="photo-album">
                                <ul className="ul_ecomercer_pd_photo_main">
                                    {planta && (
                                        <li className={`li_ecomerce_pd ${selectedImage === planta.imgplanta ? 'img_elegida_fotos_detail_pd' : ''}`}>
                                            <img className={`img_product_ecomerce_pd`}  src={`${process.env.PUBLIC_URL}/${planta.imgplanta}`} alt='Cargando ...' onClick={() => cambiarImagenPrincipal(planta.imgplanta)} />
                                        </li>
                                    )}
                                    {planta && (
                                        <li className={`li_ecomerce_pd ${selectedImage === planta.imgplantaparteuno ? 'img_elegida_fotos_detail_pd' : ''}`}>
                                            <img className="img_product_ecomerce_pd" src={`${process.env.PUBLIC_URL}/${planta.imgplantaparteuno}`} alt='Cargando ...' onClick={() => cambiarImagenPrincipal(planta.imgplantaparteuno)} />
                                        </li>
                                    )}
                                    {planta && (
                                        <li className={`li_ecomerce_pd ${selectedImage === planta.imgplantapartedos ? 'img_elegida_fotos_detail_pd' : ''}`}>
                                            <img className="img_product_ecomerce_pd" src={`${process.env.PUBLIC_URL}/${planta.imgplantapartedos}`} alt='Cargando ...' onClick={() => cambiarImagenPrincipal(planta.imgplantapartedos)} />
                                        </li>
                                    )}
                                    {planta && (
                                        <li className={`li_ecomerce_pd ${selectedImage === planta.imgplantapartetres ? 'img_elegida_fotos_detail_pd' : ''}`}>
                                            <img className="img_product_ecomerce_pd" src={`${process.env.PUBLIC_URL}/${planta.imgplantapartetres}`} alt='Cargando ...' onClick={() => cambiarImagenPrincipal(planta.imgplantapartetres)} />
                                        </li>
                                    )}
                                    {planta && (
                                        <li className={`li_ecomerce_pd ${selectedImage === planta.imgplantapartecuatro ? 'img_elegida_fotos_detail_pd' : ''}`}>
                                            <img className="img_product_ecomerce_pd" src={`${process.env.PUBLIC_URL}/${planta.imgplantapartecuatro}`} alt='Cargando ...' onClick={() => cambiarImagenPrincipal(planta.imgplantapartecuatro)} />
                                        </li>
                                    )}
                                    {planta && (
                                        <li className={`li_ecomerce_pd ${selectedImage === planta.imgplantapartecinco ? 'img_elegida_fotos_detail_pd' : ''}`}>
                                            <img className="img_product_ecomerce_pd" src={`${process.env.PUBLIC_URL}/${planta.imgplantapartecinco}`} alt='Cargando ...' onClick={() => cambiarImagenPrincipal(planta.imgplantapartecinco)} />
                                        </li>
                                    )}
                                    {planta && (
                                        <li className={`li_ecomerce_pd ${selectedImage === planta.imgplantaparteseis ? 'img_elegida_fotos_detail_pd' : ''}`}>
                                            <img className="img_product_ecomerce_pd" src={`${process.env.PUBLIC_URL}/${planta.imgplantaparteseis}`} alt='Cargando ...' onClick={() => cambiarImagenPrincipal(planta.imgplantaparteseis)} />
                                        </li>
                                    )}
                                </ul>
                            </div>
                        </div>
                    </div>
                    <div className="product__info">
                        <div className="title_ecomerce_pd">
                            <h1 className="h1_title_ecomerce_pd">{planta ? planta.nombre : 'Cargando...'}</h1>
                            <span className="spam_ecomerce_pd">COD: {planta ? Math.round(planta.id * 2230 / 4) : 'Cargando...'}</span>
                        </div>
                        <div className="price_ecomerce_pd">
                            <span className="spam_ecomerce_pd_2">
                                S/. {precio_m_p ? parseFloat(precio_m_p) + parseFloat(planta.precio) : planta ? planta.precio : 'Cargando...'}
                            </span>
                        </div>
    
                        <div className="variant_ecomerce_pd">
                            <h3 className="h_tres">SELECCIONA UNA MACETA</h3>
                            
                            <ul className="ul_ecomercer_pd_variant">
                                {plantasmacetas && plantasmacetas.map((registro, index) => (
                                    <li className={`li_ecomerce_pd ${selectedImage === registro.imagen ? 'img_elegida_fotos_detail_pd' : ''}`} key={index}>
                                        
                                        <img
                                            className="img_product_ecomerce_pd"
                                            src={`${process.env.PUBLIC_URL}/${registro.maceta_img}`}
                                            alt={registro.planta || 'Cargando ...'}
                                            onClick={() => handleClick(registro)}
                                        />
                                        {registro.maceta_precio === 0 || registro.maceta_precio === '0.00' || registro.maceta_precio === '0' || registro.maceta_precio === 0.00 && (
                                            <span style={{ width: '100%', display: 'flex', justifyContent: 'center', color: 'red', fontFamily: 'a', fontSize: '19px' }}>Gratis</span>
                                        )}
                                    </li>
                                ))}
                            </ul>
    
                        </div>
                        <div className="description">
                            <h3 className="h_tres_description">BENEFICIOS</h3>
                            <ul className="ul_ecomercer_pd_description">{listItems}</ul>
                        </div>
                        {/* <button className="buy--btn">AÑADIR AL CARRITO</button> */}
                        {/* <Link to='/pagar-page'>
                            <button className="buy--btn comprar_last_btn">COMPRAR</button>
                        </Link> */}
                        {user === null ? (
                            <Link className='contenedor_btn_comprar_pd_cosas_plants' to="/form_login">
                            <button className="comprar_last_btn buy--btn">Comprar</button>
                            </Link>
                        ) : (
                            <Link className='contenedor_btn_comprar_pd_cosas_plants' to={`/pagar-page/${planta ? planta.id : ''}/${planta ? planta.categoria : ''}/${macetas ? macetas.id : ''}/`}>
                            <button className="comprar_last_btn buy--btn">Comprar</button>
                            </Link>
                        )}
                        
                    </div>
                </section>
    
            </div>
            <div className="detail_descripcion_pd">
                <Tabs
                    defaultActiveKey="profile"
                    id="uncontrolled-tab-example"
                    className="mb-3 ul_detail_descripcion"
                    >
                    <Tab className="descripcion_ul_pd" eventKey="profile" title="Descripción">
                        <div className="descripcion_ul_pd_tittle">¿Cómo no matarla?</div>
                        <div><b style={{color: 'rgb(11, 99, 16)'}}>Ubicación y Luz:</b> {planta ? planta.ubi_luz : 'Cargando...'}</div> <br></br>
                        <div><b style={{color: 'rgb(11, 99, 16)'}}>Riego y Abono:</b> {planta ? planta.riego_abono : 'Cargando...'}</div> <br></br>
                        <div><b style={{color: 'rgb(11, 99, 16)'}}>Tierra:</b> {planta ? planta.tierra : 'Cargando...'}</div><br></br>
                        <div><b style={{color: 'rgb(11, 99, 16)'}}>Cuidados:</b> {planta ? planta.cuidados : 'Cargando...'}</div>
                    </Tab>
                    <Tab className="descripcion_ul_pd" eventKey="home" title="Detalles del producto">
                        <div className="descripcion_ul_pd_titulo_ficha">Ficha técnica</div>
                        <Table striped bordered hover variant="success">
                            <tbody style={{width:'100%'}}>
                                <tr>
                                    <td className="td_detalle_producto">Medidas De La Maceta</td>
                                    <td className="td_detalle_producto">{macetas ? macetas.maceta_material : 'Elegir maceta para calcular ...'}</td>
                                </tr>
                                <tr>
                                    <td className="td_detalle_producto">Medidas De La Planta + Maceta</td>
                                    <td className="td_detalle_producto">{macetas ? macetas.medidasmacetaplanta : 'Elegir maceta para calcular ...'}</td>
                                </tr>
                                <tr>
                                    <td className="td_detalle_producto">Material De La Maceta</td>
                                    <td className="td_detalle_producto">{macetas ? macetas.maceta_medidasmaceta : 'Elegir maceta para calcular ...'}</td>
                                </tr>
                                <tr>
                                    <td className="td_detalle_producto">Dificultad</td>
                                    <td className="td_detalle_producto">{planta ? planta.dificultad : 'Cargando...'}</td>
                                </tr>
                                <tr>
                                    <td className="td_detalle_producto">Incluye:</td>
                                    <td className="td_detalle_producto">{macetas ? macetas.maceta_incluye : 'Elegir maceta para calcular ...'}</td>
                                </tr>
                                <tr>
                                    <td className="td_detalle_producto">Tamaño</td>
                                    <td className="td_detalle_producto">{planta ? planta.tamano : 'Cargando...'}</td>
                                </tr>
                                <tr>
                                    <td className="td_detalle_producto">Lugar</td>
                                    <td className="td_detalle_producto">{planta ? planta.lugara : 'Cargando...'}</td>
                                </tr>
                                <tr>
                                    <td className="td_detalle_producto">Lugar</td>
                                    <td className="td_detalle_producto">{planta ? planta.lugarb : 'Cargando...'}</td>
                                </tr>
                                <tr>
                                    <td className="td_detalle_producto">Lugar</td>
                                    <td className="td_detalle_producto">{planta ? planta.lugarc : 'Cargando...'}</td>
                                </tr>
                                <tr>
                                    <td className="td_detalle_producto">Tipo De Planta</td>
                                    <td className="td_detalle_producto">{planta ? planta.tipo_planta_id.nombre : 'Cargando...'}</td>
                                </tr>
                            </tbody>
                            </Table>
                    </Tab>
                </Tabs>
            </div>
            <br></br>
            <br></br>
            <div className="contenedor_4_products_pd">
                <div className="contenedor_4_products_pd_title">4 Productos Más En La Misma Categoría:</div>
                <div className="contenedor_4_products_pd_subraya"></div>
                <br></br>
                <br></br>
                <div className="contenedor_4_products_pd_secciones">
    
                    {plantaCategorias && plantaCategorias.slice(0,4).map((plantacategoria) => (
                        <div className="producto_planta_pd_4_secciones" key={plantacategoria.id}>
                            <img className="imagen_producto_contenedor_4" src={`${process.env.PUBLIC_URL}/${plantacategoria.imgplanta}`} alt={plantacategoria.nombre} />
    
    
                            <div className="comprar_planta_cuadricula">
                                <h2>{plantacategoria.nombre}</h2>
                                <Link to={`/planta/${plantacategoria.id}/${plantacategoria.categoria}`}>
                                        <button className="btn_comprar_planta">Comprar</button>
                                </Link>
                            </div>
                            <p className="precio_plantas_cp">S/. {plantacategoria.precio}</p>
                            <div className="botones_superior">
                                <Button className="botones_superior_btn btn_ojo_ic" variant="primary" onClick={() => handlePlantaClick(plantacategoria)}>
                                    <img className="ic_ojo" src={ic_ojo} alt="Ver Detalles" />
                                </Button>
                                {/* {user ? (
                                    <Link to="/form_login">
                                    <Button className="botones_superior_btn btn_ojo_ic" variant="primary">
                                        <img className="ic_ojo" src={ic_carrito_compras} alt="Agregar al Carrito" />
                                    </Button>
                                    </Link>
                                ) : (
                                    <Button className="botones_superior_btn btn_ojo_ic" variant="primary">
                                        <Link to="/form_login">
                                            <img className="ic_ojo" src={ic_carrito_compras} alt="Agregar al Carrito" />
                                        </Link>
                                    </Button>
                                )} */}
                            </div>
                        </div>
                    ))}
                </div>
                <div className="uno_dos_sesenta_responsive">
    
                    {plantaCategorias && plantaCategorias.slice(0,4).map((plantacategoria) => (
                        <div className="producto_planta_pd_4_secciones" key={plantacategoria.id}>
                            <img className="imagen_producto_contenedor_4" src={`${process.env.PUBLIC_URL}/${plantacategoria.imgplanta}`} alt={plantacategoria.nombre} />
    
    
                            <div className="comprar_planta_cuadricula">
                                <h2>{plantacategoria.nombre}</h2>
                                <Link to={`/planta/${plantacategoria.id}/${plantacategoria.categoria}`}>
                                        <button className="btn_comprar_planta">Comprar</button>
                                </Link>
                            </div>
                            <p className="precio_plantas_cp">S/. {plantacategoria.precio}</p>
                            <div className="botones_superior">
                                <Button className="botones_superior_btn btn_ojo_ic" variant="primary" onClick={() => handlePlantaClick(plantacategoria)}>
                                    <img className="ic_ojo" src={ic_ojo} alt="Ver Detalles" />
                                </Button>
                            </div>
                        </div>
                    ))}
                </div>
                <MyVerticallyCenteredModalPd
                    show={modalShow}
                    onHide={() => setModalShow(false)}
                    plantacategoria={selectedPlanta}
                />
    
            </div>
            <br></br>
            <br></br>
            <Fotter></Fotter>
            
            <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.1.3/dist/js/bootstrap.bundle.min.js"></script>
            <script src="//cdnjs.cloudflare.com/ajax/libs/jquery/3.2.1/jquery.min.js"></script>
            </div>
        )}

    </div>

    
  );
}

export default Planta;
