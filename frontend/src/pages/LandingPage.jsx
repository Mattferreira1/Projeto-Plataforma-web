import { Link,} from "react-router-dom";
import banner from "../assets/image1-1.jpg"
const LandingPage = () => {
    return ( 
        <div className="vh-100 vw-100">
            <nav class="navbar navbar-expand-lg bg-secondary text-white">
                <div class="container-fluid">
                    <a class="navbar-brand" href="#">TaskBoard</a>
                    <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                    <span class="navbar-toggler-icon"></span>
                    </button>
                    <div class="collapse navbar-collapse" id="navbarNav">
                    <ul class="navbar-nav">
                        <li class="nav-item">
                            <Link class="nav-link" to="/Login">Login</Link>
                        </li>
                        <li class="nav-item">
                            <Link class="nav-link" to="/Cadastro">Cadastrar</Link>
                        </li>
                    </ul>
                    </div>
                </div>
            </nav>
            <img className='w-100 h-75' src={banner} alt="" />
            <div className="p-3 d-flex gap-2 shadow">
                <div className="w-50 h-50 shadow p-4 ">
                    <h1>Apresentação</h1>
                    <p>Apresentamos para vocês, nossa plataforma de gestão de usuários e tarefas, uma solução que busca organiza fluxos de trabalho e promove a produtividade de equipes e indivíduos. </p>
                </div>

                <div className="w-50 h-25 shadow p-4 ">
                    <h1>Uma ótima escolha</h1>
                    <p>Nosso site é recomendado para:</p>
                    <ul>
                        <li>. Pequenas empresas </li>
                        <li>. Profissionais autônomos</li>


                    </ul>
                </div>
                <div className="w-50 h-25 shadow p-4 ">
                    <h1>Vantagens</h1>
                        <p>Interface intuitiva e acessível, reduzindo a curva de aprendizado.</p>
 
                </div>
            </div>
            <footer className="p-1 bg-secondary text-center">
                Direitos reservados aos criadores.
            </footer>
        </div>
     );
}
 
export default LandingPage;