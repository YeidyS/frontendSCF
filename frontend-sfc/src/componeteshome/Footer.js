import React from "react"
import imgg from '../img/logo-cnd-ab.png'
import certi from '../img/certificados.PNG'
import '../estilos/home.css';
const Footer = ()=>{
    return(
        <>
            <footer className="text-white py-4 bg-dark footerdesc">
                <div className="container">
                    <nav className="row">
                        <div className="col-12 col-md-3 d-flex align-items-center justify-content-center">
                            
                        </div>
                        <ul className="col-12 col-md-5 list-unstyled">
                        <img src={imgg} className="mx-2" width='200' alt="" />
                            <li className="front-weight-bold mb-2">Cerveceria Nacional Dominicana</li>
                            <li className="text-center">2021 © CERVECERIA NACIONAL DOMINICANA. TODOS LOS DERECHOS RESERVADOS. </li>
                        </ul>
                        <ul className="col-12 col-md-4 list-unstyled">
                        <li className="front-weight-bold mb-3"><img src={certi} width="200" alt="" /></li>
                        <div className="redes">
                            <li className="bi">
                                <i className="bi bi-facebook"></i>
                                <i className="bi bi-instagram"></i>
                                <i className="bi bi-twitter"></i>
                            </li>
                         </div>   
                        </ul>
                    </nav>
                </div>
            </footer>
        </>
    )
}

export default Footer;