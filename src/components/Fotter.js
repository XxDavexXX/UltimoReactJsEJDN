import React from 'react';
import './../css/Fotter.css'
import { Link } from 'react-router-dom';


function Fotter() {
  const whatsappUrl = "https://api.whatsapp.com/send?phone=51903010882&text=Hola%20vengo%20de%20la%20web%20Jard%C3%ADn%20de%20Naru%F0%9F%8C%B5%F0%9F%8C%B9%F0%9F%8C%BB%2C%20quisiera%20mayor%20informaci%C3%B3n%20!";

    return (
      <div>
        {/* Fotter */}
        <section id="footer">
          <div className="container">
            <div className="row text-center text-xs-center text-sm-left text-md-left">
              <div className="col-xs-12 col-sm-4 col-md-4">
                <h5>Links principales</h5>
                <ul className="list-unstyled quick-links">
                  <li><Link to="/" ><i className="fa fa-angle-double-right"></i>Inicio</Link></li>
                  <li><Link to="/nosotros"  ><i className="fa fa-angle-double-right"></i>Nosotros</Link></li>
                  <li><Link to="/comprar_plantas"  ><i className="fa fa-angle-double-right"></i>Plantas</Link></li>
                  <li><Link to="/eventos"  ><i className="fa fa-angle-double-right"></i>Eventos</Link></li>
                  <li><Link to="/preguntas-frecuentes"  ><i className="fa fa-angle-double-right"></i>Preguntas</Link></li>
                </ul>
              </div>
              <div className="col-xs-12 col-sm-4 col-md-4">
                <h5>Links secundarios</h5>
                <ul className="list-unstyled quick-links">
                  <li><Link to="/" ><i className="fa fa-angle-double-right"></i>Bienvenida</Link></li>
                  <li><Link to="/nosotros"  ><i className="fa fa-angle-double-right"></i>Conócenos</Link></li>
                  <li><Link to="/comprar_plantas"  ><i className="fa fa-angle-double-right"></i>Tipos plantas</Link></li>
                  <li><Link to="/eventos"  ><i className="fa fa-angle-double-right"></i>Proyectos</Link></li>
                  <li><Link to="/preguntas-frecuentes"  ><i className="fa fa-angle-double-right"></i>FAQS</Link></li>
                </ul>
              </div>
              <div className="col-xs-12 col-sm-4 col-md-4">
                <h5>Links atajos</h5>
                <ul className="list-unstyled quick-links">
                <li><Link to="/" ><i className="fa fa-angle-double-right"></i>Comenzar</Link></li>
                  <li><Link to="/nosotros"  ><i className="fa fa-angle-double-right"></i>Reseña</Link></li>
                  <li><Link to="/comprar_plantas"  ><i className="fa fa-angle-double-right"></i>Comprar</Link></li>
                  <li><Link to="/eventos"  ><i className="fa fa-angle-double-right"></i>Decoración</Link></li>
                  <li><Link to="/preguntas-frecuentes"  ><i className="fa fa-angle-double-right"></i>Dudas</Link></li>
                </ul>
              </div>
            </div>
            <div className="row">
              <div className="col-xs-12 col-sm-12 col-md-12 mt-2 mt-sm-5">
                {/* <ul className="list-unstyled list-inline social text-center">
                  <li className="list-inline-item"><a href={whatsappUrl} ><i className="fa fa-facebook"></i></a></li>
                  <li className="list-inline-item"><a href={whatsappUrl} ><i className="fa fa-twitter"></i></a></li>
                  <li className="list-inline-item"><a  href={whatsappUrl}><i className="fa fa-instagram"></i></a></li>
                  <li className="list-inline-item"><a  href={whatsappUrl}><i className="fa fa-google-plus"></i></a></li>
                  <li className="list-inline-item"><a  href={whatsappUrl} target="_blank" rel="noreferrer"><i className="fa fa-envelope"></i></a></li>
                </ul> */}
              </div>
            </div>
            <div className="row">
              <div className="col-xs-12 col-sm-12 col-md-12 mt-2 mt-sm-2 text-center text-white">
                <p><u><a href={whatsappUrl} target='blank_'>El Jardin de Naru</a></u>, En Lima - Perú [un vivero de propiedad total de Tito Quispe y Nancy Chuan.]</p>
                <p className="h6">
                  &copy; All rights reserved by Dave Ryan Santivañez Munguia.
                  <a
                    className="text-green ml-2"
                    href={whatsappUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                  </a>
                </p>

              </div>
            </div>
          </div>
        </section>

        {/* Fotter */}
      </div>
    );
  }
  
  export default Fotter;
  