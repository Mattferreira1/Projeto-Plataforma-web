import { Link } from "react-router-dom";

const Cadastro = () => {
    return ( 
        <>

<div class="v-100 min-vh-100 d-flex justify-content-center align-items-center">
            <div class="w-25 py-5">
                <h1 class="h3 text-center mb-4">Cadastro</h1>
                <form action="">
                    <div class="mb-3">
                        <label class="form-label" for="username">Nome de usuário</label>
                        <div class="input-group">
                            <input type="text" class="form-control" name="username" id="username"/>
                        </div>
                    </div>
                    <div class="mb-3">
                        <label class="form-label" for="email">E-mail</label>
                        <div class="input-group">
                            <input class="form-control" type="email" name="email" id="email"/>
                            <span class="input-group-text">@exemplo.com</span>
                        </div>
                    </div>
                    <div class="mb-3">
                        <label class="form-label" for="age">Data de nascimento</label>
                        <input class="form-control" type="date" name="age" id="age"/>
                    </div>
                    <div class="mb-3">
                        <label class="form-label" for="">Senha</label>
                        <input class="form-control" type="password" name="password" id="password"/>
                        <div class="form-text">A senha deve possuir 8 caracteres</div>
                        <div class="form-text">A senha deve possuir uma letra maiúscula</div>
                    </div>
                    <div class="mb-3">
                        <label class="form-label" for="confirm-password">Confirme sua senha</label>
                        <input class="form-control" type="password" name="confirm-password" id="confirm-password"/>
                        <div class="form-text">As senhas precisam ser idênticas</div>
                    </div>
                    <div class="form-check form-switch mb-3">
                        <input class="form-check-input" type="checkbox" name="terms" id="terms"/> 
                        <label class="form-label" for="">Concordo com os Termos e Serviço</label>
                    </div>
                    <button class="btn btn-primary w-100">Cadastrar</button>
                    <Link to="/Login" className="mt-2">Voltar</Link>
                </form>
            </div>
    </div>
        </>
     );
}
 
export default Cadastro;