import React from 'react';
import { login } from '../../service/utilizador';
import { withRouter } from "react-router";

class Login extends React.Component {                             // página de Login

  constructor(props) {
    super(props);
    this.state = {
      email: "",
      palavraPasse: "",
    }
  }

  entrar() {                                                                    // iniciar sessão com email e password
    login({
      email: this.state.email,
      password: this.state.palavraPasse,
    })
    .then(data => {
      if(data.error) {
        alert("Erro: " + data.error);                                          
      } else {
        let token = data.token;
        localStorage.setItem("token", token);
        window.location = window.location.href.replace("/login", "/dashboard");     // nome no dashboard
      }
    });
  }

  render() {                                                   // formulário de inicio de sessão 
    return (
      <div className="container pt-4">
        <h1>Login</h1>
        <form className="mt-4">
          <div className="form-group">
            <label>Email</label>
            <input onChange={event => this.setState({ email: event.target.value })} type="email" className="form-control" />
          </div>
          <div className="form-group">
            <label>Palavra-passe</label>
            <input onChange={event => this.setState({ palavraPasse: event.target.value })} type="password" className="form-control" />
          </div>
          <button onClick={() => this.entrar()} type="button" className="btn btn-primary">Entrar</button>
        </form>
      </div>
    );
  }

}

export default withRouter(Login);
