import React from 'react';
import './../css/Eventos.css'
import { Link } from 'react-router-dom';

import img_1 from './../imgs/imguno.jpg'
import img_2 from './../imgs/imgdos.jpeg'
import img_3 from './../imgs/imgtres.jpeg'
import imgcuatro from './../imgs/imgcuatro.webp'

import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';


import Navbar from './NavBar';

import Fotter from './Fotter';


function Eventos() {
    return (
        <div className="content_nosotros">

            <Navbar />

            <header id="home" className="header">
                <div className="overlay"></div>
                <div className="header-content">
                    <p>¡Haz Que Tus Eventos Florezcan con El Jardín de Naru!</p>
                    <h6>Eventos</h6>
                    <Link style={{textDecoration:'none'}} to="/comprar_plantas">
                        <button className="btn_comprar_aqui_eventos btn btn-outline-light">Comprar Aquí</button>
                    </Link>
                </div>
            </header>

            <section id="about">
                <div className="container">
                    <div className="about-wrapper">
                        <div className="after"><h1>Natural</h1></div>
                        <div className="content">
                            <h5 className="title mb-3">Transforma Tu Evento en un Oasis de Frescura</h5>
                            <div className="row">
                                <div className="col">
                                    <p>Sumérgete en la frescura de la naturaleza al incorporar plantas en tu evento. Crear un ambiente natural no solo es estéticamente agradable, sino que también aporta una sensación relajante y acogedora a cualquier espacio.</p>
                                    <p><b>Descubre la armonía que solo las plantas pueden ofrecer a tu evento especial.</b></p>
                                    <p>Las plantas no solo son hermosas, sino que también contribuyen a un evento más sostenible y respetuoso con el medio ambiente. Dale un toque verde a tu celebración y sorprende a tus invitados.</p>
                                    <p>Aquí en El Jardín de Naru, te ofrecemos una selección única de plantas para eventos, asegurando que tu ocasión sea recordada por su frescura y vitalidad.</p>
                                </div>
                                <div className="col">
                                    <p>
                                        ¿Deseas que tu evento sea inolvidable? Descubre cómo las plantas pueden crear una experiencia única y natural que deleitará a tus invitados. Aporta un toque fresco y vibrante a cualquier ocasión especial. Con nuestras exquisitas opciones de decoración floral y plantas cuidadosamente seleccionadas, tu evento se transformará en un rincón lleno de vida y armonía. Desde elegantes centros de mesa hasta rincones verdes que inspiran conversaciones, nuestras plantas son la clave para añadir un toque distintivo a tu celebración. ¡Deja que la magia de la naturaleza forme parte de tu evento y crea recuerdos inolvidables!
                                    </p>
                                </div>

                            </div>
                        </div>
                    </div>
                </div>
            </section>


            <section>
                <div className="container">
                    <div className="row justify-content-between align-items-center">
                        <div className="col-md-6">
                            <div className="img-wrapper">
                                <div className="after"></div>
                                <img src={img_1} className="w-100" alt="Sobre Nosotros" />
                            </div>
                        </div>
                        <div className="col-md-5">
                            <h6 className="title mb-3">Decora con Plantas Únicas y Especiales</h6>
                            <p>En El Jardín de Naru, ofrecemos una amplia variedad de plantas perfectas para decorar tu evento. Ya sea una boda, una fiesta corporativa o cualquier celebración, nuestras plantas especiales añaden un toque único y encantador.</p>
                            <p className="text-muted">Descubre cómo nuestras plantas pueden elevar la decoración de tu evento a otro nivel. Cada planta cuenta una historia, ¿cuál será la tuya?</p>
                            <Link style={{textDecoration:'none'}} to="/comprar_plantas">
                            <button className="btn_ver_mas_eventos_dale btn btn-outline-success btn-sm">Ver Más</button>
                            </Link>
                        </div>
                    </div>
                </div>
            </section>


            <section>
                <div className="container">
                    <div className="row justify-content-between align-items-center">
                        <div className="col-md-5">
                            <h6 className="title mb-3">Vive una Experiencia Botánica Única</h6>
                            <p>Imagina un evento donde cada rincón está lleno de vida y frescura. Con nuestras plantas, puedes crear una experiencia botánica única para tus invitados. Desde suculentas elegantes hasta exuberantes helechos, tenemos la planta perfecta para cada ocasión.</p>
                            <p className="text-muted">Transforma tu evento en un oasis verde. ¡Descubre las posibilidades botánicas con El Jardín de Naru!</p>
                            <Link style={{textDecoration:'none'}} to="/nosotros">
                            <button className="btn_ver_mas_eventos_dale btn btn-outline-success btn-sm">Más Información</button>
                            </Link>
                        </div>
                        <div className="col-md-6">
                            <div className="img-wrapper">
                                <div className="after right"></div>
                                <img src={img_2} className="w-100" alt="Sobre Nosotros" />
                            </div>
                        </div>
                    </div>
                </div>
            </section>


            <section>
                <div className="container">
                    <div className="row justify-content-between align-items-center">
                        <div className="col-md-6">
                            <div className="img-wrapper">
                                <div className="after"></div>
                                <img src={img_3} className="w-100" alt="Sobre Nosotros" />
                            </div>
                        </div>
                        <div className="col-md-5">
                            <h6 className="title mb-3">Plantas Especiales para Eventos Inolvidables</h6>
                            <p>¿Buscas una forma única de hacer que tu evento sea inolvidable? Nuestras plantas especiales están diseñadas para eso. Desde regalos verdes hasta centros de mesa vibrantes, nuestras plantas añaden un toque de frescura y originalidad a cualquier evento especial.</p>
                            <p className="text-muted">Descubre cómo nuestras plantas pueden convertir tu evento en una experiencia inolvidable. ¡Haz que cada momento cuente con El Jardín de Naru!</p>
                            <Link style={{textDecoration:'none'}} to="/comprar_plantas">
                            <button className="btn_ver_mas_eventos_dale btn btn-outline-success btn-sm">Conoce Más</button>
                            </Link>
                        </div>
                    </div>
                </div>
            </section>

            <section>
                <div className="container">
                    <div className="row justify-content-between align-items-center">
                        <div className="col-md-5">
                            <h6 className="title mb-3">Descubre la Variedad de Nuestros Productos</h6>
                            <p>Sumérgete en un mundo de variedad botánica con nuestra amplia gama de productos. Desde coloridas flores hasta elegantes macetas, ofrecemos una selección que se adapta a todos los gustos y estilos.</p>
                            <p className="text-muted">Encuentra la pieza perfecta para complementar tu evento y añadir un toque único con El Jardín de Naru. Explora nuestra colección hoy mismo.</p>
                            <Link style={{textDecoration:'none'}} to="/preguntas-frecuentes">
                            <button className="btn_ver_mas_eventos_dale btn btn-outline-success btn-sm">Más Información</button>
                            </Link>
                        </div>
                        <div className="col-md-6">
                            <div className="img-wrapper">
                                <div className="after right"></div>
                                <img src={imgcuatro} className="w-100" alt="Sobre Nosotros" />
                            </div>
                        </div>
                    </div>
                </div>
            </section>





            <Fotter />
            {/* <script src="./../assets/vendors/jquery/jquery-3.4.1.js"></script> */}
            <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.1.3/dist/js/bootstrap.bundle.min.js"></script>
            <script src="//cdnjs.cloudflare.com/ajax/libs/jquery/3.2.1/jquery.min.js"></script>

            {/* <script src="./../assets/vendors/bootstrap/bootstrap.bundle.js"></script> */}
        </div>
    );
}

export default Eventos;
