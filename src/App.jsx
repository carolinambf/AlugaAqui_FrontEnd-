import React from "react";
import "./App.css";
import {  Switch, Route, withRouter } from "react-router-dom";
import { Home } from "./components/home/Home";
import { MovieDetail } from "./components/moviedetail/MovieDetail";
import * as ReactBootStrap from "react-bootstrap";
import Dashboard from "./components/dashboard/Dashboard";
import Register from "./components/auth/Register";
import Login from "./components/auth/Login";
import { autenticado, logout } from "./service/utilizador";

class App extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      user: null,
      loaded: false,
    }
  }

  componentDidMount() {                              // método executado depois de o componente renderizado para o dom, através dele podemos aceder ao dom mais tarde
    let that = this;
    autenticado()
    .then(user => {
      if(user.error) {
        localStorage.removeItem("token");
        user = null;
      }
      that.setState({
        user: user,
        loaded: true,
      });
    })
  }

  sair() {                                                  // logout 
    let that = this;
    logout()
    .then(res => {
      localStorage.removeItem("token");
      that.props.history.push("/");
      that.setState({
        user: null,
        loaded: true,
      });
    })
  }

  render() { 
    return (
      <main>
      <div className="App">

      {/* Navbar  */}

      <ReactBootStrap.Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
        <ReactBootStrap.Navbar.Brand >
          <img alt="" src="./img/alugaaqui-negative.png" width="50" height="50"/>
          <span className="ml-2">ALUGA-AQUI</span>
        </ReactBootStrap.Navbar.Brand>
        <ReactBootStrap.Navbar.Toggle aria-controls="resposive-navbar-nav"/>
        <ReactBootStrap.Navbar.Collapse id="resposive-navbar-nav">
        <ReactBootStrap.Nav className="mr-auto">
          <ReactBootStrap.Nav.Link href="/">Página Inicial</ReactBootStrap.Nav.Link>
          { this.state.loaded && this.state.user &&
            <ReactBootStrap.Nav.Link href="/dashboard">Filmes Alugados</ReactBootStrap.Nav.Link>
          }
        </ReactBootStrap.Nav>
        { this.state.loaded && 
          <ReactBootStrap.Nav>
            { this.state.user ? <>
              <ReactBootStrap.Dropdown as={ReactBootStrap.Nav.Item}>
                <ReactBootStrap.Dropdown.Toggle as={ReactBootStrap.Nav.Link}>{ this.state.user.name }</ReactBootStrap.Dropdown.Toggle>
                <ReactBootStrap.Dropdown.Menu>
                  <ReactBootStrap.Dropdown.Item onClick={() => this.sair()}>Logout</ReactBootStrap.Dropdown.Item>
                </ReactBootStrap.Dropdown.Menu>
              </ReactBootStrap.Dropdown>
            </> : <>
              <ReactBootStrap.Nav.Link href="/login">Iniciar Sessão</ReactBootStrap.Nav.Link>
              <ReactBootStrap.Nav.Link href="/register">Criar Conta</ReactBootStrap.Nav.Link>
            </>}
          </ReactBootStrap.Nav>
        }
      
        </ReactBootStrap.Navbar.Collapse>
      </ReactBootStrap.Navbar>

      </div>
      
      
        <Switch>  
          
      {/* Rotas  */}

          <Route path="/" component={Home} exact />
          <Route path="/movie/:id" component={MovieDetail} />
          <Route path="/dashboard" component={Dashboard} />
          <Route path="/register" component={Register} />
          <Route path="/login" component={Login} />
        </Switch>
      
      </main>
    );
  }
}

export default withRouter(App);
