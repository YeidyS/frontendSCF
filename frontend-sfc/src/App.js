import logo from './logo.svg';
import './App.css';
import './estilos/home.css';
import Footer from './componeteshome/Footer';
import cnd from './img/logo.png';
import REmpleado from './Crud/REmpleado';
import ReactBootstrap from "./componeteshome/Header";
import BodyCard from "./componeteshome/BodyCard";
import {Routes, Route} from "react-router-dom"; 
import RActivo from './Crud/RActivo';
import RTActivo from './Crud/RTActivo';
import ILogin from './login/ILogin';
import RLogin from './login/RLogin';

function App() {
  return (
    <>
    <img className="imgcnd" src={cnd} alt="" />
      <div className="App">
        <header>
        
        <ReactBootstrap/> 
        <Routes>
         <Route path='/inicio' exact element={<BodyCard/>}/>
         <Route path='/registrarempleado' element={<REmpleado/>}/>
         <Route path='/registraractivo' element={<RActivo/>}/>
         <Route path='/registrartipodeactivo' element={<RTActivo/>}/>
        </Routes>
        
        </header>

        {/* <ILogin/>
        <RLogin/> */}
        <footer>
         <Footer></Footer>
        </footer>
      </div>
      
    </>
  );
}

export default App;
