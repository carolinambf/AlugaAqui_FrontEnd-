import React from "react";
import "./App.css";
import {  Switch, Route } from "react-router-dom";
import { Home } from "./components/home/Home";
import { MovieDetail } from "./components/moviedetail/MovieDetail";
import * as ReactBootStrap from "react-bootstrap";


export function App() {
  return (
    <main>
    <div className="App">
    
     <ReactBootStrap.Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
     <ReactBootStrap.Navbar.Brand ><img alt="" src="./img/alugaaqui.jpg" weign="40" height="40"/>ALUGA-AQUI </ReactBootStrap.Navbar.Brand>
     <ReactBootStrap.Navbar.Toggle aria-controls="resposive-navbar-nav"/>
     <ReactBootStrap.Navbar.Collapse id="resposive-navbar-nav">
     <ReactBootStrap.Nav className="mr-auto">
     <ReactBootStrap.Nav.Link href="/">Página Inicial</ReactBootStrap.Nav.Link>
     </ReactBootStrap.Nav>
     <ReactBootStrap.Nav>
     <ReactBootStrap.Nav.Link href="">Iniciar Sessão</ReactBootStrap.Nav.Link>
     <ReactBootStrap.Nav.Link href="">Inscrever-se</ReactBootStrap.Nav.Link>
     </ReactBootStrap.Nav>
   
     </ReactBootStrap.Navbar.Collapse>
     </ReactBootStrap.Navbar>



    </div>
    
    
      <Switch>
        <Route path="/" component={Home} exact />
        <Route path="/movie/:id" component={MovieDetail} />
      </Switch>
    
    </main>
  );
}

export default App;