import React from 'react';
import { all, devolver } from '../../service/aluguer';
import { Link } from 'react-router-dom';

export default class Dashboard extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      alugueres: [],
    }
  }

  updateTable() {
    all().then(alugueres => {
      this.setState({
        alugueres: alugueres,
      })
    });
  }

  componentDidMount(){ 
    if(!localStorage.getItem("token")) {
      window.location = window.location.href.replace("/dashboard", "/");
    } else {
      this.updateTable();
    }
  }

  devolverFilme(id) {
    let that = this;
    devolver(id)
    .then(function() {
      that.updateTable();
    });
  }

  render() {
    return (
      <div className="container pt-4">
        <h1>Filmes Alugados</h1>
        <table className="mt-3 table table-dark">
          <thead>
            <tr>
              <th scope="col">Filme</th>
              <th scope="col">Data Aluguer</th>
              <th scope="col">Data Entrega</th>
              <th scope="col">Preço</th>
              <th scope="col"></th>
            </tr>
          </thead>
          <tbody>
            { this.state.alugueres.map(aluguer => (
              <tr key={ aluguer._id }>
                <td><Link to={"/movie/" + aluguer.movie_id}>{ aluguer.movie_name }</Link></td>
                <td>{ new Date(aluguer.date_added).toLocaleString() }</td>
                <td>{ aluguer.date_returned === null ? "Não entregue" : new Date(aluguer.date_returned).toLocaleString() }</td>
                <td>{ aluguer.price } €</td>
                <td>
                  { aluguer.date_returned === null ? (
                    <button onClick={() => this.devolverFilme(aluguer._id)} className="btn btn-sm btn-outline-danger">Devolver</button>
                  ) : "Entregue" }
                </td>
              </tr>
            )) }
            
          </tbody>
        </table>
      </div>
    );
  }

}
