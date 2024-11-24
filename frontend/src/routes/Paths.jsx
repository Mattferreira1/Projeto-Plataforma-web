import { BrowserRouter, Route, Routes } from "react-router-dom";
import LayoutPage from "../layout/LayoutPage";
import Home from "../pages/Home";
import Login from "../pages/Login";
import { useContext } from "react";
import { context } from "../Contexts/AuthContext";

const Paths = () => {

    const { logado } = useContext(context);

    return ( 
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<LayoutPage/>}>
                    <Route index element={<Login/>}/>
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