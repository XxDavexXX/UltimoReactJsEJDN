import React from 'react';
import './../css/Nosotros.css'

import planta_nosotros from './../imgs/plantas_nosotros.webp';
import imagen_nosotros from './../imgs/imagen_nosotros.png';
import numero_uno_nosotros from './../imgs/numero_uno_nosotros.png';
import numero_dos_nosotros from './../imgs/numero_dos_nosotros.png';
import numero_tres_nosotros from './../imgs/numero_tres_nosotros.png';
import numero_cuatro_nosotros from './../imgs/numero_cuatro_nosotros.png';
import planta_compromiso from './../imgs/planta_compromiso.webp';

import Navbar from './NavBar';

import Fotter from './Fotter';


function Nosotros() {
    return (
        <div className="content_nosotros">

            <Navbar />

            <div className="contenedor_info_nosotros">
                <div className="contenedor_info_hoja_blanca">
                    <img className="planta_nosotros" alt="planta_nosotros" src={planta_nosotros}></img>
                    <div className="contenedor_info_hoja_verde">
                        <img className="imagen_nosotros" alt="imagen_nosotros" src={imagen_nosotros}></img>
                        <div className="titulo_nosotros">
                            Nuestra Historia: Cultivando Vida, Inspirando Cambio
                            <br></br>
                            <br></br>
                        </div>
                        <div className="contenedor_texto_nosotros">
                            <div className="contenido_texto_nosotros">
                                En el corazón de nuestro legado, Tito Quispe Gandulias, un amante incondicional de la naturaleza, encontró en la compañía de su esposa, Mari Nancy Chuan, la musa para dar vida a un sueño extraordinario: transformar nuestro entorno y hacer del mundo un lugar más hermoso.
                                <br></br>
                                <br></br>
                                En el año 2020, este visionario dúo decidió convertir su pasión por las plantas en algo más grande. Surgió así la idea de crear un santuario verde, no solo como un vivero, sino como un oasis de vitalidad que pudiera trascender los límites de un hogar convencional.
                                <br></br>
                                <br></br>
                                De esta visión nació "El Jardín de Naru". No es solo una tienda en línea, sino una invitación a reconectar con la naturaleza, a encontrar la paz en medio del caos y a descubrir la magia que solo las plantas pueden ofrecer.
                                <br></br>
                                <br></br>
                                En cada rincón de "El Jardín de Naru", no solo encontrarás plantas exquisitamente seleccionadas, sino también la oportunidad de decorar tu espacio con elementos naturales. Buscamos armonizar tu ajetreada vida urbana con la serenidad que solo la naturaleza puede proporcionar.
                                <br></br>
                                <br></br>
                                En "El Jardín de Naru", no solo nos preocupamos por ofrecerte plantas hermosas; también somos defensores comprometidos del medio ambiente. Buscamos no solo vender plantas, sino inspirar un cambio positivo en la relación entre las personas y la naturaleza. Nos esforzamos por ser una plataforma sostenible y consciente, donde cada compra contribuye a nuestro compromiso con la protección del planeta.
                                <br></br>
                                <br></br>
                                Te invitamos a ser parte de esta aventura verde. Convierte tu espacio en un santuario, no solo para tus plantas sino también para tu bienestar. Descubre cómo tu elección de cada planta y cada compra puede marcar la diferencia.
                                <br></br>
                                <br></br>
                                ¡Ayúdanos a cultivar un mundo más verde y vibrante!
                            </div>
                        </div>
                    </div>
                    <img className="planta_compromiso" alt="planta_compromiso" src={planta_compromiso}></img>
                </div>
            </div>
            <div className="contenedor_compromiso">
                <div className="contenido_compromiso_cuatro_partes">
                    <div className="titulo_compromisos">Nuestros Compromisos</div>
                    <div className="secciones_compromisos">
                        <div className="primera_seccion">
                            <img className="numero_uno_nosotros" alt="numero_uno_nosotros" src={numero_uno_nosotros}></img>
                            <div className="numero_uno_nosotros_div">En "El Jardín de Naru", nos comprometemos a ofrecerte plantas y productos de la más alta calidad. Cada elemento seleccionado es cuidadosamente escogido para asegurar su salud y vitalidad, brindándote un toque único de naturaleza que transformará tu espacio.</div>
                        </div>
                        <div className="primera_seccion parte2_compromiso">
                            <div className="numero_uno_nosotros_div">Nos enorgullece ser defensores del medio ambiente. Comprometidos con prácticas sostenibles, trabajamos activamente para minimizar nuestro impacto en la naturaleza. Desde nuestros empaques hasta las variedades de plantas que ofrecemos, cada decisión está guiada por la responsabilidad ambiental.</div>
                            <img className="numero_uno_nosotros" alt="numero_uno_nosotros" src={numero_dos_nosotros}></img>
                        </div>
                        <div className="primera_seccion">
                            <img className="numero_uno_nosotros" alt="numero_uno_nosotros" src={numero_tres_nosotros}></img>
                            <div className="numero_uno_nosotros_div">Entendemos que cada cliente es único. Nos comprometemos a brindarte una experiencia personalizada desde el momento en que exploras nuestro catálogo hasta la entrega de tu selección. Nuestro equipo está aquí para ayudarte a encontrar las plantas perfectas que se adapten a tus necesidades y estilo de vida.</div>
                        </div>
                        <div className="primera_seccion parte2_compromiso">
                            <div className="numero_uno_nosotros_div">En "El Jardín de Naru", no solo vendemos plantas; también buscamos cultivar el conocimiento. Nos comprometemos a proporcionar recursos educativos que te ayudarán a cuidar y disfrutar de tus plantas. Desde consejos de cuidado hasta inspiración para la decoración, queremos ser tu fuente confiable en el fascinante mundo botánico.</div>
                            <img className="numero_uno_nosotros" alt="numero_uno_nosotros" src={numero_cuatro_nosotros}></img>
                        </div>
                    </div>
                </div>
            </div>

            <Fotter />

        </div>
    );
}

export default Nosotros;
