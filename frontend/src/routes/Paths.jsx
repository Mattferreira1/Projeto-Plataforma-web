import { BrowserRouter, Route, Routes } from "react-router-dom";
import LayoutPage from "../layout/LayoutPage";
import Home from "../pages/Home";
import Login from "../pages/Login";
import { useContext } from "react";
import { context } from "../Contexts/AuthContext";
import LandingPage from "../pages/LandingPage";

const Paths = () => {

    const { logado } = useContext(context);

    return ( 
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<LayoutPage/>}>
                    <Route index element={<LandingPage/>}/>
                    <Route path="/Login" element={<Login/>}/>
                    {
                        logado &&(
                            <>
                            <Route path="/Home" element={<Home/>}/>
                            </>
                        )
                    }
                </Route>
            </Routes>
        </BrowserRouter>
     );
}
 
export default Paths;