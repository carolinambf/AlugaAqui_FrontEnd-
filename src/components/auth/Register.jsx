import React from 'react';
import { registar, login } from '../../service/utilizador';
import { withRouter } from 'react-router-dom';

class Register extends React.Component {                                    // página de Criar Conta

  constructor(props) {
    super(props);

    this.state = {
      nome: "",
      nif: "",
      email: "",
      palavraPasse: "",
    }
  }

  criarConta() {             
    registar({                                                                 // resgistar com: nome, email, nif e password
      name: this.state.nome,
      email: this.state.email,
      nif: this.state.nif,
      password: this.state.palavraPasse,
    })
    .then(user => {
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
          window.location = window.location.href.replace("/register", "/dashboard");    //inicia sessão 
        }
      });
    });
  }

  render() {                                                             // formulário de criação de conta
    return (
      <div className="container pt-4">
        <h1>Criar uma Conta</h1>
        <form className="mt-4">
          <div className="form-group">
            <label>Nome</label>
            <input onChange={event => this.setState({ nome: event.target.value })} type="text" className="form-control" />
          </div>
          <div className="form-group">
            <label>NIF</label>
            <input onChange={event => this.setState({ nif: event.target.value })} type="text" className="form-control" />
          </div>
          <div className="form-group">
            <label>Email</label>
            <input onChange={event => this.setState({ email: event.target.value })} type="email" className="form-control" />
          </div>
          <div className="form-group">
            <label>Palavra-passe</label>
            <input onChange={event => this.setState({ palavraPasse: event.target.value })} type="password" className="form-control" />
          </div>
          <button onClick={() => this.criarConta()} type="button" className="btn btn-primary">Submeter</button>
        </form>
      </div>
    );
  }

}

export default withRouter(Register);
