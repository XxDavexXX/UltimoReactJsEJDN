import React, { useRef } from 'react';
import './../css/Home.css'
import { Link } from 'react-router-dom';

import emailjs from '@emailjs/browser';

import planta_img1 from './../imgs/planta_img1.jpg';
import planta_img2 from './../imgs/planta_img2.jpeg';
import planta_img3 from './../imgs/planta_img3.jpg';
import planta_img4 from './../imgs/planta_img4.jpeg';
import planta_img5 from './../imgs/planta_img5.jpeg';
import planta_img6 from './../imgs/planta_img6.jpeg';
import planta_img7 from './../imgs/planta_img7.jpg';
import planta_img8 from './../imgs/planta_img8.jpg';
import planta_img9 from './../imgs/planta_img9.webp';
import accesorio_uno from './../imgs/accesorio_uno.webp';
import accsesorio_dos from './../imgs/accsesorio_dos.webp';
import accsesorio_tres from './../imgs/accsesorio_tres.webp';

import Navbar from './NavBar';

import Fotter from './Fotter';


function Home() {

    const [showAlert, setShowAlert] = useState(false);

    const form = useRef();

    const sendEmail = (e) => {
      e.preventDefault();

      emailjs
        .sendForm('service_q7yi996', 'template_7ndrkpa', form.current, {
          publicKey: 'oLMOSMnzsCqsfBCVy',
        })
        .then(
          () => {
            console.log('SUCCESS!');
            setShowAlert(true);
            resetFormFields();
          },
          (error) => {
            console.log('FAILED...', error.text);
          },
        );
    };

    const resetFormFields = () => {
      form.current.reset(); // Reinicia los valores de los campos del formulario
    };

    return (
      <div>

        {showAlert && (
                <div className="contenedor_alert_registro_exitoso">
                    <Alert key={"success"} className="alerta_form_mal_datos_usuarios" variant={"success"} onClose={() => setShowAlert(false)} dismissible>
                        Correo enviado exitosamente.
                    </Alert>
                </div>
        )}

        <Navbar />

        <div className="content_content_img_intro">
          <div className="content_img_intro">
            <div className="primer_content">
              <div className="content-all">
                <div className="content-carrousel">
                  <figure><img alt="planta_imgs" src={planta_img1} /></figure>
                  <figure><img alt="planta_imgs" src={planta_img1} /></figure>
                  <figure><img alt="planta_imgs" src={planta_img2} /></figure>
                  <figure><img alt="planta_imgs" src={planta_img3} /></figure>
                  <figure><img alt="planta_imgs" src={planta_img4} /></figure>
                  <figure><img alt="planta_imgs" src={planta_img5} /></figure>
                  <figure><img alt="planta_imgs" src={planta_img6} /></figure>
                  <figure><img alt="planta_imgs" src={planta_img7} /></figure>
                  <figure><img alt="planta_imgs" src={planta_img8} /></figure>
                  <figure><img alt="planta_imgs" src={planta_img9} /></figure>
                </div> alt="planta_imgs"
              </div>
            </div>

            <div className="segundo_content">
              <div className="segundo_content_title">Explora el mundo botánico en El Jardín de Naru</div>
              <div className="segundo_content_text">¿Te apasionan las plantas? ¿Buscas algo más que un simple adorno? En El Jardín de Naru, te invitamos a explorar nuestro extenso catálogo de plantas externas, internas, decorativas y medicinales. Cada planta cuenta una historia, ¿cuál será la tuya?</div>
              <div className="segundo_content_text">En El Jardín de Naru, hemos creado un espacio donde los amantes de las plantas encuentran su refugio. Sumérgete en un mundo de colores, fragancias y beneficios naturales. Navega por nuestras secciones y descubre cómo la naturaleza puede transformar tu entorno y mejorar tu bienestar.</div>
              <button className="button">
                <span className="button-decor"></span>
                <div className="button-content">
                  <div className="button__icon">
                    <svg viewBox="0 0 50 50" fill="none" xmlns="http://www.w3.org/2000/svg" width="24">
                      <circle opacity="0.5" cx="25" cy="25" r="23" fill="url(#icon-payments-cat_svg__paint0_linear_1141_21101)"></circle>
                      <mask id="icon-payments-cat_svg__a" fill="#fff">
                        <path fillRule="evenodd" clipRule="evenodd" d="M34.42 15.93c.382-1.145-.706-2.234-1.851-1.852l-18.568 6.189c-1.186.395-1.362 2-.29 2.644l5.12 3.072a1.464 1.464 0 001.733-.167l5.394-4.854a1.464 1.464 0 011.958 2.177l-5.154 4.638a1.464 1.464 0 00-.276 1.841l3.101 5.17c.644 1.072 2.25.896 2.645-.29L34.42 15.93z">
                        </path>
                      </mask>
                      <path fillRule="evenodd" clipRule="evenodd" d="M34.42 15.93c.382-1.145-.706-2.234-1.851-1.852l-18.568 6.189c-1.186.395-1.362 2-.29 2.644l5.12 3.072a1.464 1.464 0 001.733-.167l5.394-4.854a1.464 1.464 0 011.958 2.177l-5.154 4.638a1.464 1.464 0 00-.276 1.841l3.101 5.17c.644 1.072 2.25.896 2.645-.29L34.42 15.93z" fill="#fff"></path>
                      <path d="M25.958 20.962l-1.47-1.632 1.47 1.632zm2.067.109l-1.632 1.469 1.632-1.469zm-.109 2.068l-1.469-1.633 1.47 1.633zm-5.154 4.638l-1.469-1.632 1.469 1.632zm-.276 1.841l-1.883 1.13 1.883-1.13zM34.42 15.93l-2.084-.695 2.084.695zm-19.725 6.42l18.568-6.189-1.39-4.167-18.567 6.19 1.389 4.166zm5.265 1.75l-5.12-3.072-2.26 3.766 5.12 3.072 2.26-3.766zm2.072 3.348l5.394-4.854-2.938-3.264-5.394 4.854 2.938 3.264zm5.394-4.854a.732.732 0 01-1.034-.054l3.265-2.938a3.66 3.66 0 00-5.17-.272l2.939 3.265zm-1.034-.054a.732.732 0 01.054-1.034l2.938 3.265a3.66 3.66 0 00.273-5.169l-3.265 2.938zm.054-1.034l-5.154 4.639 2.938 3.264 5.154-4.638-2.938-3.265zm1.023 12.152l-3.101-5.17-3.766 2.26 3.101 5.17 3.766-2.26zm4.867-18.423l-6.189 18.568 4.167 1.389 6.19-18.568-4.168-1.389zm-8.633 20.682c1.61 2.682 5.622 2.241 6.611-.725l-4.167-1.39a.732.732 0 011.322-.144l-3.766 2.26zm-6.003-8.05a3.66 3.66 0 004.332-.419l-2.938-3.264a.732.732 0 01.866-.084l-2.26 3.766zm3.592-1.722a3.66 3.66 0 00-.69 4.603l3.766-2.26c.18.301.122.687-.138.921l-2.938-3.264zm11.97-9.984a.732.732 0 01-.925-.926l4.166 1.389c.954-2.861-1.768-5.583-4.63-4.63l1.39 4.167zm-19.956 2.022c-2.967.99-3.407 5.003-.726 6.611l2.26-3.766a.732.732 0 01-.145 1.322l-1.39-4.167z" fill="#fff" mask="url(#icon-payments-cat_svg__a)"></path>
                      <defs>
                        <linearGradient id="icon-payments-cat_svg__paint0_linear_1141_21101" x1="25" y1="2" x2="25" y2="48" gradientUnits="userSpaceOnUse">
                          <stop stopColor="#fff" stopOpacity="0.71"></stop>
                          <stop offset="1" stopColor="#fff" stopOpacity="0"></stop>
                        </linearGradient>
                      </defs>
                    </svg>
                  </div>
                  <Link to='/eventos'>
                    <span className="button__text">Ver más</span>
                  </Link>
                </div>
              </button>
            </div>

          </div>
        </div>

        <div className="content_accesorios_title">
          <div className="content_accesorios_title_div">
            <div className="content_accesorios_title_div_dos">TRAE LA NATURALEZA DEVUELTA A TU HOGAR</div>
          </div>
        </div>

        <div className="content_accesorios">

          <div className="content_accesorios_uno">
            <img className="content_accesorios_uno_one_img" alt="content_accesorios_uno_one_img" src={accesorio_uno}></img>
            <div className="content_accesorios_uno_one_div">
              <div className="content_accesorios_uno_one_div_div_one">Colección</div>
              <div className="content_accesorios_uno_one_div_div_dos">PLANTAS</div>
            </div>
          </div>

          <div className="content_accesorios_uno">
            <img className="content_accesorios_uno_one_img" alt="content_accesorios_uno_one_img" src={accsesorio_dos}></img>
            <div className="content_accesorios_uno_one_div">
              <div className="content_accesorios_uno_one_div_div_one">Colección</div>
              <div className="content_accesorios_uno_one_div_div_dos">MACETAS & PARANTES</div>
            </div>
          </div>

          <div className="content_accesorios_uno">
            <img className="content_accesorios_uno_one_img" alt="content_accesorios_uno_one_img" src={accsesorio_tres}></img>
            <div className="content_accesorios_uno_one_div">
              <div className="content_accesorios_uno_one_div_div_one">Colección</div>
              <div className="content_accesorios_uno_one_div_div_dos">ACCESORIOS</div>
            </div>
          </div>

        </div>

        <div className="content_hero">
          <div className="hero">
            <div className="textos-hero">
              {/*  */}
              <div className="formulario">
              {/* <form ref={form} onSubmit={sendEmail}>
                <label>Name</label>
                <input type="text" name="user_name" />
                <label>Email</label>
                <input type="email" name="user_email" />
                <label>Message</label>
                <textarea name="message" />
                <input type="submit" value="Send" />
              </form> */}
                <form className='form_home_css' ref={form} onSubmit={sendEmail}>
                  <div className="titulo_form">Para algún pedido especial o consulta</div>
                  <div className="contenedor_filas_form">
                    <div className="contenedor_filas_form_uno">
                      <label htmlFor="nombre">Nombre *</label>
                      <input type="text" id="nombre" placeholder="Por ejemplo, Dave" name="user_name" required />
                    </div>
                    <div className="contenedor_filas_form_uno">
                      <label htmlFor="apellido">Apellido</label>
                      <input type="text" id="apellido" placeholder="Por ejemplo, Santivanez" name="user_apellido" required />
                    </div>
                  </div>
                  <div className="contenedor_filas_form">
                    <div className="contenedor_filas_form_uno">
                      <label htmlFor="email">Email *</label>
                      <input type="email" id="email" placeholder="Por ejemplo, mail@ejemplo.com" name="user_email" required />
                    </div>
                    <div className="contenedor_filas_form_uno">
                      <label htmlFor="telefono">Teléfono</label>
                      <input type="tel" id="telefono" placeholder="Por ejemplo, 903 - 010 - 882" name="user_telefono" required />
                    </div>
                  </div>
                  <div className="contenedor_filas_form">
                    <div className="contenedor_filas_form_textarea">
                      <label htmlFor="mensaje">Mensaje *</label>
                      <textarea className="message_input" placeholder="Escribe tu mensaje aquí..." id="mensaje" rows="5" cols="30" name="message" required></textarea>
                    </div>
                  </div>
                  <input className='btn_form_send' type="submit" value="Enviar" />
                  {/* <button className="btn_form_send" onClick={enviarFormulario}>
                    <span className="spam_form">Enviar</span>
                    <div className="top"></div>
                    <div className="left"></div>
                    <div className="bottom"></div>
                    <div className="right"></div>
                  </button> */}


                  {/*  */}


                </form>
              </div>
              {/*  */}
            </div>
            <div id="visita" className="svg-hero" style={{ height: '150px', overflow: 'hidden' }}>
              <svg viewBox="0 0 500 150" preserveAspectRatio="none" style={{ height: '100%', width: '100%' }}>
                <path d="M0.00,49.98 C149.99,150.00 349.20,-49.98 500.00,49.98 L500.00,150.00 L0.00,150.00 Z" style={{ stroke: 'none', fill: 'rgb(255, 255, 255)' }}></path>
              </svg>
            </div>
          </div>
        </div>


        <div className="contenedor_mapa">
        </div>
          <center className="centrado_mapa"><iframe title="Titulo Unico" src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3902.7336494930273!2d-76.8007488254864!3d-11.992922940899478!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x9105e9b6d0f9fe4b%3A0x918ada97c63ef207!2sEl%20Cuadro%2C%20Chaclacayo%2015472!5e0!3m2!1ses!2spe!4v1703201244053!5m2!1ses!2spe" width="90%" height="450" allowFullScreen="" loading="lazy" referrerPolicy="no-referrer-when-downgrade"></iframe></center>
        <div className="contenedor_mapa">
        </div>
       



        <Fotter />



      </div>
    );
  }
  
  export default Home;
  