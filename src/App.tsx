import Footer from "./components/Footer/Footer"
import Header from "./components/Header/Header"
import { BrowserRouter as Router } from 'react-router-dom';
import AppRoutes from "./routes/AppRoutes"
import { Container } from "react-bootstrap";
import { Suspense } from "react";
import Loader from "./components/Loader/Loader";
import {ToastContainer} from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import NavBarChef from "./components/NavBar-Chef/NavBarChef";


function App() {
  return (
    <>
      <ToastContainer/>
      <Router>
          <Container style={{minHeight: '85vh', minWidth: '100%', padding:'0'}}>
            <Suspense fallback={<Loader/>}>
            <NavBarChef/>
              <AppRoutes/>
            </Suspense>
          </Container>
            
          <Footer/>
      </Router>
    </>
  )
}

export default App
