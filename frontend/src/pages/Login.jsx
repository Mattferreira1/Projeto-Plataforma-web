import { Link, useNavigate } from "react-router-dom";
import { IconField } from 'primereact/iconfield';
import { InputIcon } from 'primereact/inputicon';
import { Button } from 'primereact/button';
import { InputText } from 'primereact/inputtext';
import { useContext, useState } from "react";
import { useForm } from "react-hook-form";
import { context } from "../Contexts/AuthContext";
import axios from "axios";

const Login = () => {
    const [MostrarSenha, setMostrarSenha] = useState(false);
    const { register, handleSubmit } = useForm();
    const { setLogado } = useContext(context);
    const navigate = useNavigate();

    const logar = async (dados) => {
        
        try {
            const response = await axios.post('http://localhost:3001/login', {
                email: dados.email,
                password: dados.senha
            });
        
            if (response.status === 200) {
                setLogado(true);
                navigate("/Home");
            }
        } catch (error) {
            console.error(error);
            alert("Erro ao fazer login. Verifique suas credenciais.");
        }
    };

    return (
        <>
            <div className="bg-primary-500 h-screen flex align-items-center justify-content-center px-3">
                <form onSubmit={handleSubmit(logar)} className="col-12 md:col-3 surface-0 p-3 border-round-md">
                    <h1 className="text-center text-4x1">Login</h1>
                    <label htmlFor="email" className="block uppercase font-bold text-sm mb-1">Email</label>
                    <InputText
                        className="w-full mb-3"
                        type="email"
                        placeholder="Digite seu Email"
                        id="email"
                        {...register("email", { required: true })}
                    />

                    <label htmlFor="senha" className="block uppercase font-bold text-sm mb-1">Senha</label>
                    <div className="mb-3">
                        <IconField>
                            <InputIcon className={`pi ${MostrarSenha ? 'pi-eye' : 'pi-eye-slash'} cursor-pointer`}
                                onClick={() => setMostrarSenha(!MostrarSenha)}
                            />
                            <InputText
                                className="w-full"
                                {...register("senha", { required: true })}
                                type={MostrarSenha ? "text" : "password"}
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
                    <Link to="/Cadastro" className="mt-2">Cadastrar</Link>
                </form>
            </div>
        </>
    );
};

export default Login;
