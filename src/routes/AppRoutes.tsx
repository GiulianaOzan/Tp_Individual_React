import { Route, Routes } from "react-router-dom"
import HomePage from "../pages/HomePage"
import Carrito from "../pages/Carrito"
// import Empleados from "../pages/Empleados"
import Producto from "../pages/Producto"
import Empleado from "../pages/Empleado"


const AppRoutes: React.FC = () => {
  return (
    <Routes>
        <Route path= '/' element={<HomePage/>}/>
        <Route path='/Producto' element={<Producto/>}/>
        <Route path='/Carrito' element={<Carrito/>}/>
        <Route path='/Empleado' element={<Empleado/>}/>
        
       
    </Routes>
  )
}

export default AppRoutes