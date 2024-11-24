import { Link, useNavigate } from "react-router-dom";

import { IconField } from 'primereact/iconfield';
import { InputIcon } from 'primereact/inputicon';
import { Button } from 'primereact/button';
import { InputText } from 'primereact/inputtext';
import { useContext, useState } from "react";
import { useForm } from "react-hook-form";
import { context } from "../Contexts/AuthContext";



const Login = () => {
    const [MostrarSenha, setMostrarSenha]= useState(false)

    const {register, handleSubmit} = useForm();

    const { setLogado} = useContext(context)
    const navigate = useNavigate()

    function logar(dados){
        if(dados.email == "admin@admin" && dados.senha == "admin"){
            setLogado(true);
            navigate("/Home")
        }
    
        
    }
    return ( 
        <>
        <div class="bg-primary-500 h-screen flex align-items-center justify-content-center px-3">
            <form onSubmit={handleSubmit(logar)} class="col-12 md:col-3 surface-0 p-3 border-round-md ">
                <h1 className="text-center text-4x1">Login</h1>
                <label htmlFor="email" class="block uppercase font-bold text-sm mb-1">Email</label>
                <InputText
                className="w-full mb-3"
                type="email"
                placeholder="Digite seu Email"
                id="email"
                {...register("email", {required: true})}
                />

                <label htmlFor="senha" class="block uppercase font-bold text-sm mb-1">Senha</label>
                <div class="mb-3">

                <IconField>
                    <InputIcon className={`pi ${MostrarSenha ? 'pi-eye' : 'pi-eye-slash'} cursor-pointer`}
                     onClick={()=> setMostrarSenha(!MostrarSenha)}>
                    </InputIcon>
                    <InputText 
                    className="w-full"
                    {...register("senha", {required: true})}
                    type={MostrarSenha? "text" : "password"}
                    id="senha"
                    placeholder="********"
                    />
                </IconField>
                </div>
                    <Button 
                    label="Entrar"
                    type="submit"
                    className="w-full"
                     />
            </form>
        </div>
        <Link to="/Home">Home</Link>
        </>
     );
}
 
export default Login;