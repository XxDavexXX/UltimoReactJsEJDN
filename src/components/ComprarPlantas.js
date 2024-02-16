import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import './../css/ComprarPlantas.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle'
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Accordion from 'react-bootstrap/Accordion';
import Dropdown from 'react-bootstrap/Dropdown';
import DropdownButton from 'react-bootstrap/DropdownButton';
import ic_cuadricula from './../imgs/ic_cuadricula.png'
import ic_menu_lateral from './../imgs/ic_menu_lateral.png'
import ic_ojo from './../imgs/ic_ojo.png'
import ic_carrito_compras from './../imgs/ic_carrito_compras.png'
import Navbar from './NavBar';
import Fotter from './Fotter';

// Firebase Auth 
import { auth } from '../firebase/firebaseConfig';


function MyVerticallyCenteredModal(props) {

    if (!props.planta) {
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
                    <div className="titulo_modal_ojo_planta">{props.planta.nombre}</div>
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <div className="modal-content contenedor_img_desc_modal">
                    <div className="modal-img-container">
                        <img
                            src={`${process.env.PUBLIC_URL}/${props.planta.imgplanta}`}
                            alt={props.planta.nombre}
                            className="modal-img"
                        />
                    </div>
                    <div className="modal-description">
                        <h4>Descripción</h4>
                        <p className="descripcion_plantas_producto_modal_cp">
                            {props.planta.descripcion}
                        </p>
                        <h4>Precio</h4>
                        <p>
                            S/. {props.planta.precio}
                        </p>
                        <h4>Stock</h4>
                        <p>
                            {props.planta.stock}
                        </p>
                        <h4>Categoria</h4>
                        <p className="categoria_p">
                            {props.planta.categoria}
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

function ComprarPlantas() {

    const [minVal, setMinVal] = useState(0);
    const [maxVal, setMaxVal] = useState(500);
    const priceGap = 1;

    const rangeInputMin = useRef();
    const rangeInputMax = useRef();
    const range = useRef();

    const [minVal2, setMinVal2] = useState(0);
    const [maxVal2, setMaxVal2] = useState(500);
    const priceGap2 = 1;

    const rangeInputMin2 = useRef();
    const rangeInputMax2 = useRef();
    const range2 = useRef();

    const [modalShow, setModalShow] = React.useState(false);

    const [user, setUser] = useState(null);

    const [plantas, setPlantas] = useState([]);
    const [selectedPlanta, setSelectedPlanta] = useState(null);

    const [tiposSeleccionados, setTiposSeleccionados] = useState([]);
    const [tiposSeleccionados2, setTiposSeleccionados2] = useState([]);

    const [plantastipos, setPlantasTipos] = useState([]);

    const [loading, setLoading] = useState(true);

    const [filterTimeout, setFilterTimeout] = useState(null);

    const [mostrarDetalles, setMostrarDetalles] = useState(false);

    const handleIconClick = () => {
        setMostrarDetalles(!mostrarDetalles);
    };

    // Guardando el valor de las varibble de orden 

    const [ultimaOpcionSeleccionada, setUltimaOpcionSeleccionada] = useState(null);
    const [ultimaOpcionSeleccionada2, setUltimaOpcionSeleccionada2] = useState(null);


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

        const fetchPlantasData = async () => {
            try {
                const response = await fetch('https://eljardindenaru.onrender.com/');
                const data = await response.json();
                setPlantas(data);
                setLoading(false); // Marca como cargados los datos cuando la solicitud es exitosa
            } catch (error) {
                console.error('Error fetching plantas:', error);
                setLoading(false); // Marca como cargados los datos en caso de error
            }
        };

        fetchPlantasData();
    }, []);

    // Registro sin filtros de los tipos de platnas para los checkbox 
    
    useEffect(() => {

        const fetchPlantasTiposData = async () => {
            try {
                const responsetipoplanta = await fetch('http://127.0.0.1:8000/tipo-planta/');
                const datatipoplanta = await responsetipoplanta.json();
                setPlantasTipos(datatipoplanta);
                setLoading(false); // Marca como cargados los datos cuando la solicitud es exitosa
            } catch (error) {
                console.error('Error fetching tipos plantas:', error);
                setLoading(false); // Marca como cargados los datos en caso de error
            }
        };

        fetchPlantasTiposData();
    }, []);

    
    // Iniciamos con el filtro de Checkbox osea tipo de plantas 
    
    const handleCheckboxChange = (tipoId) => {
        setTiposSeleccionados((prevTipos) => {
            if (prevTipos.includes(tipoId)) {
                return prevTipos.filter(id => id !== tipoId);
            } else {
                return [...prevTipos, tipoId];
            }
        });
    };

    useEffect(() => {
        const nuevaURL = construirURL(tiposSeleccionados);
        cargarRegistros(nuevaURL);
    }, [tiposSeleccionados]);

    const construirURL = (tiposSeleccionados) => {
        const currentMinVal = rangeInputMin.current.value;
        const currentMaxVal = rangeInputMax.current.value;
        const baseURL = `http://127.0.0.1:8000/plantas-by-filters/?ordering=${ultimaOpcionSeleccionada}&min_price=${currentMinVal}&max_price=${currentMaxVal}`;
        const queryString = tiposSeleccionados.map(id => `tipo_planta_id=${id}`).join('&');
        return `${baseURL}&${queryString}`;
    };

    const cargarRegistros = async (url) => {
        setLoading(true);
        try {
            const response = await fetch(url);
            const data = await response.json();
            setPlantas(data);
        } catch (error) {
            console.error('Error fetching plantas:', error);
        } finally {
            setLoading(false);
        }
    };


            // movil 

    const handleCheckboxChange2 = (tipoId2) => {
        setTiposSeleccionados2((prevTipos2) => {
            if (prevTipos2.includes(tipoId2)) {
                return prevTipos2.filter(id => id !== tipoId2);
            } else {
                return [...prevTipos2, tipoId2];
            }
        });
    };

    useEffect(() => {
        const nuevaURL = construirURL2(tiposSeleccionados2);
        cargarRegistros2(nuevaURL);
    }, [tiposSeleccionados2]);

    const construirURL2 = (tiposSeleccionados2) => {
        const currentMinVal2 = rangeInputMin2.current.value;
        const currentMaxVal2 = rangeInputMax2.current.value;
        const baseURL = `http://127.0.0.1:8000/plantas-by-filters/?ordering=${ultimaOpcionSeleccionada2}&min_price=${currentMinVal2}&max_price=${currentMaxVal2}`;
        const queryString = tiposSeleccionados2.map(id => `tipo_planta_id=${id}`).join('&');
        return `${baseURL}&${queryString}`;
    };

    const cargarRegistros2 = async (url) => {
        setLoading(true);
        try {
            const response = await fetch(url);
            const data = await response.json();
            setPlantas(data);
        } catch (error) {
            console.error('Error fetching plantas:', error);
        } finally {
            setLoading(false);
        }
    };
    
    // Iniciamos con los filtros por orden 

    // Ordenando por precio de menos a mas 

    const construirURLOrdenPrecioMenosMas = (tiposSeleccionados) => {
        const currentMinVal = rangeInputMin.current.value;
        const currentMaxVal = rangeInputMax.current.value;
        const baseURL = `http://127.0.0.1:8000/plantas-by-filters/?ordering=precio_menos_mas&min_price=${currentMinVal}&max_price=${currentMaxVal}`;
        const queryString = tiposSeleccionados.map(id => `tipo_planta_id=${id}`).join('&');
        return `${baseURL}&${queryString}`;
    };

    const fetchPlantasOrdenadasMenosMas = async () => {
        setLoading(true);
        try {

            setUltimaOpcionSeleccionada('precio_menos_mas');

            const nuevaURL = construirURLOrdenPrecioMenosMas(tiposSeleccionados);

            const response = await fetch(nuevaURL);
            const data = await response.json();
            setPlantas(data);
        } catch (error) {
            console.error('Error fetching plantas:', error);
        } finally {
            setLoading(false); // Desactiva el estado de carga, independientemente del resultado
        }
    };

    const handleOrdenarPorPrecioMenosMas = () => {
        fetchPlantasOrdenadasMenosMas();
    };

                    // Movil 

                    const construirURLOrdenPrecioMenosMas2 = (tiposSeleccionados2) => {
                        const currentMinVal2 = rangeInputMin2.current.value;
                        const currentMaxVal2 = rangeInputMax2.current.value;
                        const baseURL = `http://127.0.0.1:8000/plantas-by-filters/?ordering=precio_menos_mas&min_price=${currentMinVal2}&max_price=${currentMaxVal2}`;
                        const queryString = tiposSeleccionados2.map(id => `tipo_planta_id=${id}`).join('&');
                        return `${baseURL}&${queryString}`;
                    };
                
                    const fetchPlantasOrdenadasMenosMas2 = async () => {
                        setLoading(true);
                        try {
                
                            setUltimaOpcionSeleccionada2('precio_menos_mas');
                
                            const nuevaURL = construirURLOrdenPrecioMenosMas2(tiposSeleccionados2);
                
                            const response = await fetch(nuevaURL);
                            const data = await response.json();
                            setPlantas(data);
                        } catch (error) {
                            console.error('Error fetching plantas:', error);
                        } finally {
                            setLoading(false); // Desactiva el estado de carga, independientemente del resultado
                        }
                    };
                
                    const handleOrdenarPorPrecioMenosMas2 = () => {
                        fetchPlantasOrdenadasMenosMas2();
                    };


    // Ordenando por Precio de Mas a Menos 

    const construirURLOrdenPrecioMasMenos = (tiposSeleccionados) => {
        const currentMinVal = rangeInputMin.current.value;
        const currentMaxVal = rangeInputMax.current.value;
        const baseURL = `http://127.0.0.1:8000/plantas-by-filters/?ordering=precio_mas_menos&min_price=${currentMinVal}&max_price=${currentMaxVal}`;
        const queryString = tiposSeleccionados.map(id => `tipo_planta_id=${id}`).join('&');
        return `${baseURL}&${queryString}`;
    };

    const fetchPlantasOrdenadasMasMenos = async () => {
        setLoading(true);
        try {

            setUltimaOpcionSeleccionada('precio_mas_menos');

            const nuevaURL = construirURLOrdenPrecioMasMenos(tiposSeleccionados);

            const response = await fetch(nuevaURL);
            const data = await response.json();
            setPlantas(data);
        } catch (error) {
            console.error('Error fetching plantas:', error);
        } finally {
            setLoading(false); 
        }
    };

    const handleOrdenarPorPrecioMasMenos = () => {
        fetchPlantasOrdenadasMasMenos();
    };

                // Movil 

                const construirURLOrdenPrecioMasMenos2 = (tiposSeleccionados2) => {
                    const currentMinVal2 = rangeInputMin2.current.value;
                    const currentMaxVal2 = rangeInputMax2.current.value;
                    const baseURL = `http://127.0.0.1:8000/plantas-by-filters/?ordering=precio_mas_menos&min_price=${currentMinVal2}&max_price=${currentMaxVal2}`;
                    const queryString = tiposSeleccionados2.map(id => `tipo_planta_id=${id}`).join('&');
                    return `${baseURL}&${queryString}`;
                };
            
                const fetchPlantasOrdenadasMasMenos2 = async () => {
                    setLoading(true);
                    try {
            
                        setUltimaOpcionSeleccionada2('precio_mas_menos');
            
                        const nuevaURL = construirURLOrdenPrecioMasMenos2(tiposSeleccionados2);
            
                        const response = await fetch(nuevaURL);
                        const data = await response.json();
                        setPlantas(data);
                    } catch (error) {
                        console.error('Error fetching plantas:', error);
                    } finally {
                        setLoading(false); 
                    }
                };
            
                const handleOrdenarPorPrecioMasMenos2 = () => {
                    fetchPlantasOrdenadasMasMenos2();
                };

    // Ordenando por Relevancia las plantas 

    const construirURLOrdenPorRelevancia = (tiposSeleccionados) => {
        const currentMinVal = rangeInputMin.current.value;
        const currentMaxVal = rangeInputMax.current.value;
        const baseURL = `http://127.0.0.1:8000/plantas-by-filters/?ordering=random_id&min_price=${currentMinVal}&max_price=${currentMaxVal}`;
        const queryString = tiposSeleccionados.map(id => `tipo_planta_id=${id}`).join('&');
        return `${baseURL}&${queryString}`;
    };


    const fetchPlantasOrdenadasRelevancia = async () => {
        setLoading(true);
        try {
            
            setUltimaOpcionSeleccionada('random_id');
            
            const nuevaURL = construirURLOrdenPorRelevancia(tiposSeleccionados);

            const response = await fetch(nuevaURL);
            const data = await response.json();
            setPlantas(data);
        } catch (error) {
            console.error('Error fetching plantas:', error);
        } finally {
            setLoading(false); // Desactiva el estado de carga, independientemente del resultado
        }
    };

    const handleOrdenarPorRelevancia = () => {
        fetchPlantasOrdenadasRelevancia();
    };

                // Movil 

                const construirURLOrdenPorRelevancia2 = (tiposSeleccionados2) => {
                    const currentMinVal2 = rangeInputMin2.current.value;
                    const currentMaxVal2 = rangeInputMax2.current.value;
                    const baseURL = `http://127.0.0.1:8000/plantas-by-filters/?ordering=random_id&min_price=${currentMinVal2}&max_price=${currentMaxVal2}`;
                    const queryString = tiposSeleccionados2.map(id => `tipo_planta_id=${id}`).join('&');
                    return `${baseURL}&${queryString}`;
                };
            
            
                const fetchPlantasOrdenadasRelevancia2 = async () => {
                    setLoading(true);
                    try {
                        
                        setUltimaOpcionSeleccionada2('random_id');
                        
                        const nuevaURL = construirURLOrdenPorRelevancia2(tiposSeleccionados2);
            
                        const response = await fetch(nuevaURL);
                        const data = await response.json();
                        setPlantas(data);
                    } catch (error) {
                        console.error('Error fetching plantas:', error);
                    } finally {
                        setLoading(false); // Desactiva el estado de carga, independientemente del resultado
                    }
                };
            
                const handleOrdenarPorRelevancia2 = () => {
                    fetchPlantasOrdenadasRelevancia2();
                };

    // Ordenar por Alfabeto de la A a la Z 

    const construirURLOrdenPorAlfabetoAtoZ = (tiposSeleccionados) => {
        const currentMinVal = rangeInputMin.current.value;
        const currentMaxVal = rangeInputMax.current.value;
        const baseURL = `http://127.0.0.1:8000/plantas-by-filters/?ordering=nombre_a_z&min_price=${currentMinVal}&max_price=${currentMaxVal}`;
        const queryString = tiposSeleccionados.map(id => `tipo_planta_id=${id}`).join('&');
        return `${baseURL}&${queryString}`;
    };

    const fetchPlantasOrdenadasAtoZ = async () => {
        setLoading(true);
        try {

            setUltimaOpcionSeleccionada('nombre_a_z');

            const nuevaURL = construirURLOrdenPorAlfabetoAtoZ(tiposSeleccionados);

            const response = await fetch(nuevaURL);
            const data = await response.json();
            setPlantas(data);
        } catch (error) {
            console.error('Error fetching plantas:', error);
        } finally {
            setLoading(false); // Desactiva el estado de carga, independientemente del resultado
        }
    };

    const handleOrdenarPorAtoZ = () => {
        fetchPlantasOrdenadasAtoZ();
    };

                // Movil 

                const construirURLOrdenPorAlfabetoAtoZ2 = (tiposSeleccionados2) => {
                    const currentMinVal2 = rangeInputMin2.current.value;
                    const currentMaxVal2 = rangeInputMax2.current.value;
                    const baseURL = `http://127.0.0.1:8000/plantas-by-filters/?ordering=nombre_a_z&min_price=${currentMinVal2}&max_price=${currentMaxVal2}`;
                    const queryString = tiposSeleccionados2.map(id => `tipo_planta_id=${id}`).join('&');
                    return `${baseURL}&${queryString}`;
                };
            
                const fetchPlantasOrdenadasAtoZ2 = async () => {
                    setLoading(true);
                    try {
            
                        setUltimaOpcionSeleccionada2('nombre_a_z');
            
                        const nuevaURL = construirURLOrdenPorAlfabetoAtoZ2(tiposSeleccionados2);
            
                        const response = await fetch(nuevaURL);
                        const data = await response.json();
                        setPlantas(data);
                    } catch (error) {
                        console.error('Error fetching plantas:', error);
                    } finally {
                        setLoading(false); // Desactiva el estado de carga, independientemente del resultado
                    }
                };
            
                const handleOrdenarPorAtoZ2 = () => {
                    fetchPlantasOrdenadasAtoZ2();
                };



     // Ordenar por Alfabeto de la Z a la A

     const construirURLOrdenPorAlfabetoZtoA = (tiposSeleccionados) => {
        const currentMinVal = rangeInputMin.current.value;
        const currentMaxVal = rangeInputMax.current.value;
        const baseURL = `http://127.0.0.1:8000/plantas-by-filters/?ordering=nombre_z_a&min_price=${currentMinVal}&max_price=${currentMaxVal}`;
        const queryString = tiposSeleccionados.map(id => `tipo_planta_id=${id}`).join('&');
        return `${baseURL}&${queryString}`;
    };

    const fetchPlantasOrdenadasZtoA = async () => {
        setLoading(true);
        try {

            setUltimaOpcionSeleccionada('nombre_z_a');

            const nuevaURL = construirURLOrdenPorAlfabetoZtoA(tiposSeleccionados);

            const response = await fetch(nuevaURL);
            const data = await response.json();
            setPlantas(data);
        } catch (error) {
            console.error('Error fetching plantas:', error);
        } finally {
            setLoading(false); // Desactiva el estado de carga, independientemente del resultado
        }
    };

    const handleOrdenarPorZtoA = () => {
        fetchPlantasOrdenadasZtoA();
    };

                    // Movil 

                    const construirURLOrdenPorAlfabetoZtoA2 = (tiposSeleccionados2) => {
                        const currentMinVal2 = rangeInputMin2.current.value;
                        const currentMaxVal2 = rangeInputMax2.current.value;
                        const baseURL = `http://127.0.0.1:8000/plantas-by-filters/?ordering=nombre_z_a&min_price=${currentMinVal2}&max_price=${currentMaxVal2}`;
                        const queryString = tiposSeleccionados2.map(id => `tipo_planta_id=${id}`).join('&');
                        return `${baseURL}&${queryString}`;
                    };
                
                    const fetchPlantasOrdenadasZtoA2 = async () => {
                        setLoading(true);
                        try {
                
                            setUltimaOpcionSeleccionada2('nombre_z_a');
                
                            const nuevaURL = construirURLOrdenPorAlfabetoZtoA2(tiposSeleccionados2);
                
                            const response = await fetch(nuevaURL);
                            const data = await response.json();
                            setPlantas(data);
                        } catch (error) {
                            console.error('Error fetching plantas:', error);
                        } finally {
                            setLoading(false); // Desactiva el estado de carga, independientemente del resultado
                        }
                    };
                
                    const handleOrdenarPorZtoA2 = () => {
                        fetchPlantasOrdenadasZtoA2();
                    };

    // Ahora empezamos a filtrar pero por rango de precios para PC

    const construirURLFiltrarMinyMax = (tiposSeleccionados) => {
        const currentMinVal = rangeInputMin.current.value;
        const currentMaxVal = rangeInputMax.current.value;

        const baseURL = `http://127.0.0.1:8000/plantas-by-filters/?ordering=${ultimaOpcionSeleccionada}&min_price=${currentMinVal}&max_price=${currentMaxVal}`;
        const queryString = tiposSeleccionados.map(id => `tipo_planta_id=${id}`).join('&');
        return `${baseURL}&${queryString}`;
    };

    const fetchPlantasFiltrarMinyMax = async () => {
        setLoading(true);
        try {

            const nuevaURL = construirURLFiltrarMinyMax(tiposSeleccionados);

            const response = await fetch(nuevaURL);
            const data = await response.json();
            setPlantas(data);
        } catch (error) {
            console.error('Error fetching plantas:', error);
        } finally {
            setLoading(false);
        }
    };


    const handleFiltrarMinyMax = () => {
        fetchPlantasFiltrarMinyMax();
    };

    // Ahora empezamos a filtrar pero por rango de precios para Movile

    const construirURLFiltrarMinyMax2 = (tiposSeleccionados2) => {
        const currentMinVal2 = rangeInputMin2.current.value;
        const currentMaxVal2 = rangeInputMax2.current.value;

        const baseURL = `http://127.0.0.1:8000/plantas-by-filters/?ordering=${ultimaOpcionSeleccionada2}&min_price=${currentMinVal2}&max_price=${currentMaxVal2}`;
        const queryString = tiposSeleccionados2.map(id => `tipo_planta_id=${id}`).join('&');
        return `${baseURL}&${queryString}`;
    };

    
    const fetchPlantasFiltrarMinyMax2 = async () => {
        setLoading(true);
        try {
            const nuevaURL = construirURLFiltrarMinyMax2(tiposSeleccionados2);

            const response = await fetch(nuevaURL);
            const data = await response.json();
            setPlantas(data);
        } catch (error) {
            console.error('Error fetching plantas:', error);
        } finally {
            setLoading(false);
        }
    };

    
    const handleFiltrarMinyMax2 = () => {
        fetchPlantasFiltrarMinyMax2();
    };

    // Logica para que se establescan los valores del Range Input 

    useEffect(() => {
        range.current.style.left = ((minVal / rangeInputMin.current.max) * 100) + "%";
        range.current.style.right = 100 - ((maxVal / rangeInputMax.current.max) * 100) + "%";


    }, [minVal, maxVal]);

    useEffect(() => {
        range2.current.style.left = ((minVal2 / rangeInputMin2.current.max) * 100) + "%";
        range2.current.style.right = 100 - ((maxVal2 / rangeInputMax2.current.max) * 100) + "%";


    }, [minVal2, maxVal2]);

    const handleMinChange2 = (e) => {
        let val2 = parseInt(e.target.value);
        if ((maxVal2 - val2) < priceGap2) {
            val2 = maxVal2 - priceGap2;
        }
        setMinVal2(val2);

        // Agrega un retardo antes de activar el filtro
        clearTimeout(filterTimeout);
        const timeout = setTimeout(() => {
            handleFiltrarMinyMax2();
        }, 500); // 500 milisegundos de retardo, ajusta según tus necesidades
        setFilterTimeout(timeout);
    };

    const handleMaxChange2 = (e) => {
        let val2 = parseInt(e.target.value);
        if ((val2 - minVal2) < priceGap2) {
            val2 = minVal2 + priceGap2;
        }
        setMaxVal2(val2);

        // Agrega un retardo antes de activar el filtro
        clearTimeout(filterTimeout);
        const timeout = setTimeout(() => {
            handleFiltrarMinyMax2();
        }, 500); // 500 milisegundos de retardo, ajusta según tus necesidades
        setFilterTimeout(timeout);
    };
    const handleMinChange = (e) => {
        let val = parseInt(e.target.value);
        if ((maxVal - val) < priceGap) {
            val = maxVal - priceGap;
        }
        setMinVal(val);

        // Agrega un retardo antes de activar el filtro
        clearTimeout(filterTimeout);
        const timeout = setTimeout(() => {
            handleFiltrarMinyMax();
        }, 500); // 500 milisegundos de retardo, ajusta según tus necesidades
        setFilterTimeout(timeout);
    };

    const handleMaxChange = (e) => {
        let val = parseInt(e.target.value);
        if ((val - minVal) < priceGap) {
            val = minVal + priceGap;
        }
        setMaxVal(val);

        clearTimeout(filterTimeout);
        const timeout = setTimeout(() => {
            handleFiltrarMinyMax();
        }, 500); // 500 milisegundos de retardo, ajusta según tus necesidades
        setFilterTimeout(timeout);
    };

    // Aca recien termina la logica de establecer Valores del range Input 

    // Mostrar el modal 


    const handlePlantaClick = (planta) => {
        setSelectedPlanta(planta);
        setModalShow(true);
    };

    // Borrar los filtros, en reaslidad solo estoy reiniciando la pagina 

    const handleBorrarFiltros = () => {
        // Recarga la página cuando se hace clic en el botón
        window.location.reload();
      };

    return (
        <div className="contenedor_compra_plantas">
            <div className="contenedor_tag_navbar">
                <Navbar></Navbar>
            </div>
            <div className="contenedor_filtros_secciones">
                <div className="contenedor_titulo_filtros">
                    <div className="contenedor_titulo_filtros_content">
                        <div className="titulo_filtros">Filtrar</div>
                        <div className="contenedor_filtros">

                            {/* ///// */}

                            <div className="responsive_movile">

                                <Accordion className="acordion_filtros_movile" defaultActiveKey="">
                                    <Accordion.Item eventKey="0">
                                        <Accordion.Header>Precio</Accordion.Header>
                                        <Accordion.Body>
                                            <p className="contenedor_filtros_precio_subtitulo">Usa el range o digite el min y max precio</p>
                                            <div className="price-input">
                                                <div className="field">
                                                    <span>Min S/.</span>
                                                    <input type="number" disabled className="input-min" value={minVal2} onChange={handleMinChange} />
                                                </div>
                                                <div className="separator">-</div>
                                                <div className="field">
                                                    <span>Max S/.</span>
                                                    <input type="number" disabled className="input-max" value={maxVal2} onChange={handleMaxChange} />
                                                </div>
                                            </div>
                                            <div className="slider">
                                                <div className="progress" ref={range2}></div>
                                            </div>
                                            <div className="range-input">
                                                <input type="range" className="range-min" min="0" max="500" value={minVal2} step="1" onChange={handleMinChange2} ref={rangeInputMin2} />
                                                <input type="range" className="range-max" min="0" max="500" value={maxVal2} step="1" onChange={handleMaxChange2} ref={rangeInputMax2} />
                                            </div>

                                        </Accordion.Body>
                                    </Accordion.Item>
                                    <Accordion.Item eventKey="1">
                                        <Accordion.Header>Tipos Plantas</Accordion.Header>
                                        <Accordion.Body>
                                            
                                            {plantastipos.map((plantastipo) => (
                                                <div key={plantastipo.id}>
                                                    <div className="contenedor_filtros_tipos_plantas_tipos">
                                                        <input
                                                            id={plantastipo.id}
                                                            className="checkbox_tipo_planta"
                                                            type="checkbox"
                                                            checked={tiposSeleccionados2.includes(plantastipo.id)}
                                                            onChange={() => handleCheckboxChange2(plantastipo.id)}
                                                        />
                                                        <div className="nombre_tipo_planta">{plantastipo.nombre}</div>
                                                    </div>
                                                </div>
                                            ))}

                                        </Accordion.Body>
                                    </Accordion.Item>
                                    <Accordion.Item eventKey="2">
                                        <Accordion.Header>Borrar Filtros</Accordion.Header>
                                        <Accordion.Body>
                                            <div className="contenedor_filtros_borrar">
                                                <button className="btn_borrar_filtros"  onClick={handleBorrarFiltros}>
                                                    <span className="shadow"></span>
                                                    <span className="edge"></span>
                                                    <span className="front text"> X
                                                    </span>
                                                </button>
                                            </div>
                                        </Accordion.Body>
                                    </Accordion.Item>
                                </Accordion>
                            </div>

                            <div className="responsive_pc">
                                <div className="contenedor_filtros_precio">
                                    <div className="contenedor_filtros_precio_titulo">Precio</div>
                                    <p className="contenedor_filtros_precio_subtitulo">Usa el range o digite el min y max precio</p>
                                    <div className="price-input">
                                        <div className="field">
                                            <span>Min S/.</span>
                                            <input type="number" disabled className="input-min" value={minVal} onChange={handleMinChange} />
                                        </div>
                                        <div className="separator">-</div>
                                        <div className="field">
                                            <span>Max S/.</span>
                                            <input type="number" disabled className="input-max" value={maxVal} onChange={handleMaxChange} />
                                        </div>
                                    </div>
                                    <div className="slider">
                                        <div className="progress" ref={range}></div>
                                    </div>
                                    <div className="range-input">
                                        <input type="range" className="range-min" min="0" max="500" value={minVal} step="1" onChange={handleMinChange} ref={rangeInputMin} />
                                        <input type="range" className="range-max" min="0" max="500" value={maxVal} step="1" onChange={handleMaxChange} ref={rangeInputMax} />
                                    </div>
                                </div>

                                <div className="hr_personal"></div>

                                {/* ?////// */}

                                <div className="contenedor_filtros_tipos_plantas">
                                    <div className="contenedor_filtros_tipos_plantas_titulo">Tipos plantas</div>

                                    {plantastipos.map((plantastipo) => (
                                        <div key={plantastipo.id}>
                                            <div className="contenedor_filtros_tipos_plantas_tipos">
                                                <input
                                                    id={plantastipo.id}
                                                    className="checkbox_tipo_planta"
                                                    type="checkbox"
                                                    checked={tiposSeleccionados.includes(plantastipo.id)}
                                                    onChange={() => handleCheckboxChange(plantastipo.id)}
                                                />
                                                <div className="nombre_tipo_planta">{plantastipo.nombre}</div>
                                            </div>
                                        </div>
                                    ))}


                                </div>


                                {/* ?///// */}

                                <div className="hr_personal"></div>

                                <div className="contenedor_filtros_borrar">
                                    <div className="contenedor_filtros_borrar_seccion">Borrar Filtros</div>
                                    <button className="btn_borrar_filtros" onClick={handleBorrarFiltros}>
                                        <span className="shadow"></span>
                                        <span className="edge"></span>
                                        <span className="front"> X </span>
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="contenedor_secciones">


                    <div className="contenedor_head_plantas_secciones">
                        <div className="content_icons_shop_plant_views">
                            {/* <img className="views_plants_icons active_img_details_cp" alt="views_plants_icons" src={ic_cuadricula}></img> */}
                            <img
                                className={`views_plants_icons ${!mostrarDetalles ? 'active_img_details_cp' : ''}`}
                                alt="views_plants_icons"
                                src={ic_cuadricula}
                                onClick={handleIconClick}
                            />
                            {/* <img className="views_plants_icons  icon2_detail_view" alt="icon2_detail_view" src={ic_menu_lateral}></img> */}
                            <img
                                className={`views_plants_icons icon2_detail_view ${mostrarDetalles ? 'active_img_details_cp' : ''}`}
                                alt="icon2_detail_view"
                                src={ic_menu_lateral}
                                onClick={handleIconClick}
                            />
                        </div>

                        <div className="content_icons_shop_plant_filter parte_pc_ordenar_cp">
                            <DropdownButton style={{ background: 'transparent !important' }} id="dropdown-item-button" className="" 
                            title="Ordernar por">
                                <Dropdown.Item as="button" onClick={handleOrdenarPorRelevancia}>
                                    Relevancia
                                </Dropdown.Item>
                                <Dropdown.Item as="button" onClick={handleOrdenarPorAtoZ}>
                                    Nombre de la A a la Z
                                </Dropdown.Item>
                                <Dropdown.Item as="button" onClick={handleOrdenarPorZtoA}>
                                    Nombre de la Z a la A
                                </Dropdown.Item>
                                <Dropdown.Item as="button" onClick={handleOrdenarPorPrecioMenosMas}>
                                    Precio más bajo a más alto
                                </Dropdown.Item>
                                <Dropdown.Item as="button" onClick={handleOrdenarPorPrecioMasMenos}>
                                    Precio más alto a más bajo
                                </Dropdown.Item>
                            </DropdownButton>
                        </div>
                        
                        <div className="content_icons_shop_plant_filter parte_movil_ordenar_cp">
                            <DropdownButton style={{ background: 'transparent !important' }} id="dropdown-item-button" className="" 
                            title="Ordernar por">
                                <Dropdown.Item as="button" onClick={handleOrdenarPorRelevancia2}>
                                    Relevancia
                                </Dropdown.Item>
                                <Dropdown.Item as="button" onClick={handleOrdenarPorAtoZ2}>
                                    Nombre de la A a la Z
                                </Dropdown.Item>
                                <Dropdown.Item as="button" onClick={handleOrdenarPorZtoA2}>
                                    Nombre de la Z a la A
                                </Dropdown.Item>
                                <Dropdown.Item as="button" onClick={handleOrdenarPorPrecioMenosMas2}>
                                    Precio más bajo a más alto
                                </Dropdown.Item>
                                <Dropdown.Item as="button" onClick={handleOrdenarPorPrecioMasMenos2}>
                                    Precio más alto a más bajo
                                </Dropdown.Item>
                            </DropdownButton>
                        </div>
                    </div>

                    {loading &&
                        <div className="container_loader">
                            <div className="tree_arbol_loader">
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

                    {!loading && (
                        <div className="contenedor_two_secciones_cp_details_cuadricula">

                            <div className={`contenedor_body_plantas_secciones ${mostrarDetalles ? 'hidden' : ''}`}>
                                

                                {plantas.map((planta) => (
                                    <div className="producto_planta" key={planta.id} onClick={() => handlePlantaClick(planta)}>
                                        <img className="imagen_producto" src={`${process.env.PUBLIC_URL}/${planta.imgplanta}`} alt={planta.nombre} />


                                        <div className="comprar_planta_cuadricula">
                                            <h2>{planta.nombre}</h2>
                                            <Link to={`/planta/${planta.id}/${planta.categoria}`}>
                                                  <button className="btn_comprar_planta">Comprar</button>
                                            </Link>
                                        </div>
                                        <p className="precio_plantas_cp">S/. {planta.precio}</p>
                                        <div className="botones_superior">
                                            <Button className="botones_superior_btn btn_ojo_ic" variant="primary" onClick={() => handlePlantaClick(planta)}>
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
                        
                            <div className={`contenedor_body_plantas_secciones_details_cp ${mostrarDetalles ? '' : 'hidden'}`}>
                                {plantas.map((planta) => (
                                    <div className="producto_planta_details_cp" key={planta.id}>
                                        <div className="contenedor_imagen_producto_details_cp">
                                            <img className="imagen_producto_details_cp" src={`${process.env.PUBLIC_URL}/${planta.imgplanta}`} alt={planta.nombre} />
                                        </div>
                                        <div className="producto_planta__details_cp">
                                            <h2 className="titulo_plantas_detail_cp">{planta.nombre}</h2>
                                            <p className="precio_plantas_cp">S/. {planta.precio}</p>
                                            <p className="descripcion_detalles_text_cp_details">{planta.descripcion}</p>
                                            <div className={planta.stock > 0 ? "disponible_cp_planta_detail" : "no-disponible"}>
                                                {planta.stock > 0 ? "Disponible" : "No disponible"}
                                            </div>
                                            <div className="comprar_planta_cuadricula btn_cp_details_comprar">
                                                <Link to={`/planta/${planta.id}/${planta.categoria}`}>
                                                  <button className="btn_comprar_planta">Comprar</button>
                                                </Link>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>

                        </div>

                    )}

                    <MyVerticallyCenteredModal
                        show={modalShow}
                        onHide={() => setModalShow(false)}
                        planta={selectedPlanta}
                    />

                </div>
            </div>
            <Fotter />
            <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.1.3/dist/js/bootstrap.bundle.min.js"></script>
            <script src="//cdnjs.cloudflare.com/ajax/libs/jquery/3.2.1/jquery.min.js"></script>
        </div>
    );
}

export default ComprarPlantas;
