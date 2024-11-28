import { Link, useNavigate } from "react-router-dom";  
import { useState } from "react";
import axios from "axios";

const Cadastro = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [termsAccepted, setTermsAccepted] = useState(false);
  const [error, setError] = useState("");  
  const navigate = useNavigate();  

  function register(e) {
    e.preventDefault();

    
    if (!email || !password || !confirmPassword) {
      alert("Todos os campos são obrigatórios.");
      return;
    }

    if (password !== confirmPassword) {
      alert("As senhas precisam ser idênticas.");
      return;
    }

    if (!termsAccepted) {
      alert("Você deve concordar com os Termos e Serviços.");
      return;
    }

    let data = {
      email: email,
      password: password,
    };

   
    axios
      .post("http://localhost:3001/register", data)
      .then(function (response) {
        alert(response.data.message); 
        
        navigate("/login");  
      })
      .catch(function (error) {
  
        if (error.response) {
          setError(error.response.data.message);
        } else {
          setError("Erro de conexão com o servidor.");
        }
      });
  }

  return (
    <>
      <div className="v-100 min-vh-100 d-flex justify-content-center align-items-center">
        <div className="w-25 py-5">
          <h1 className="h3 text-center mb-4">Cadastro</h1>
          {error && <div className="alert alert-danger">{error}</div>} 
          <form onSubmit={register}>
            <div className="mb-3">
              <label className="form-label" htmlFor="email">
                E-mail
              </label>
              <div className="input-group">
                <input
                  className="form-control"
                  type="email"
                  name="email"
                  id="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              
              </div>
            </div>
            <div className="mb-3">
              <label className="form-label" htmlFor="password">
                Senha
              </label>
              <input
                className="form-control"
                type="password"
                name="password"
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
            <div className="mb-3">
              <label className="form-label" htmlFor="confirm-password">
                Confirme sua senha
              </label>
              <input
                className="form-control"
                type="password"
                name="confirm-password"
                id="confirm-password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                required
              />
              <div className="form-text">As senhas precisam ser idênticas</div>
            </div>
            <div className="form-check form-switch mb-3">
              <input
                className="form-check-input"
                type="checkbox"
                name="terms"
                id="terms"
                checked={termsAccepted}
                onChange={() => setTermsAccepted(!termsAccepted)}
              />
              <label className="form-label" htmlFor="terms">
                Concordo com os Termos e Serviço
              </label>
            </div>
            <button className="btn btn-primary w-100" type="submit">
              Cadastrar
            </button>
            <Link to="/Login" className="mt-2 d-block text-center">
              Voltar
            </Link>
          </form>
        </div>
      </div>
    </>
  );
};

export default Cadastro;