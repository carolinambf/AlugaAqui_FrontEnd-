import React, { useState, useEffect } from "react";
import {
  fetchMovies,
  fetchGenre,
  fetchMovieByGenre,
  fetchPersons,
  fetchTopratedMovie,
} from "../../service/moviedb";
import RBCarousel from "react-bootstrap-carousel";
import "react-bootstrap-carousel/dist/react-bootstrap-carousel.css";
import { Link } from "react-router-dom";
import ReactStars from "react-rating-stars-component";

export function Home() {                                             // página inicial
  const [nowPlaying, setNowPlaying] = useState([]);
  const [genres, setGenres] = useState([]);
  const [movieByGenre, setMovieByGenre] = useState([]);
  const [persons, setPersons] = useState([]);
  const [topRated, setTopRated] = useState([]);

  useEffect(() => {
    const fetchAPI = async () => {                                  // API externa
      setNowPlaying(await fetchMovies());
      setGenres(await fetchGenre());
      setMovieByGenre(await fetchMovieByGenre(28));
      setPersons(await fetchPersons());
      setTopRated(await fetchTopratedMovie());
    };
     
    fetchAPI();
  }, []);

  const handleGenreClick = async (genre_id) => {                    // género dos filmes
    setMovieByGenre(await fetchMovieByGenre(genre_id));
  };
  const movies = nowPlaying.slice(0, 5).map((item, index) => {      // filmes na tela a passar automaticamente
    return (
      <div style={{ height: 400, width: "100%" }} key={index}>
        <div className="carousel-center">
          <img style={{ height: 600 }} src={item.backPoster} alt={item.title} />
        </div>
        <div className="carousel-center">
          
        </div>
        <div
          className="carousel-caption"                                // nome dos filmes que passam automaticamente na tela
          style={{ textAlign: "center", fontSize: 70, textShadow:  "2px 2px FireBrick" , textDecoration: "overline" }}
        >
          {item.title}
        </div>
      </div>
    );
  });
   
  const genreList = genres.map((item, index) => {                     // lista de géneros 
    return (
      
     <li className="list-inline-item" key={index} >
        <button 
          type="button"
          className="btn btn-outline-info"
          onClick={() => {
            handleGenreClick(item.id);
          }}
        >
          {item.name}
        </button>
        
      </li> 
     
    );
  });

  const movieList = movieByGenre.slice(0, 4).map((item, index) => {
    return (
      <div className="col-md-3 col-sm-6" key={index}>
        <div className="card">
          <Link to={`/movie/${item.id}`}>
            <img className="img-fluid" src={item.poster} alt={item.title}></img>
          </Link>
        </div>
        <div className="mt-3">
          <p style={{ fontWeight: "bolder" }}>{item.title}</p>
          <p>Classifição: {item.rating}</p>                                        
          {/* Classificação com estrelas */}
          <ReactStars
            count={item.rating}
            size={20}
            color1={"#ff170f"} //ver!! 
          ></ReactStars>
        </div>
      </div>
    );
  });

  const trendingPersons = persons.slice(0, 4).map((p, i) => {                   // atores Destacados da Semana 
    return (
      <div className="col-md-3 text-center" key={i}>
        <img
          className="img-fluid rounded-circle mx-auto d-block"
          src={p.profileImg}
          alt={p.name}
        ></img>
        <p className="font-weight-bold text-center">{p.name}</p>
                   
      </div>
    );
  });

  const topRatedList = topRated.slice(0, 4).map((item, index) => {                    // top Filmes da Semana 
    return (
      <div className="col-md-3" key={index}>
        <div className="card">
          <Link to={`/movie/${item.id}`}>
            <img className="img-fluid" src={item.poster} alt={item.title}></img>
          </Link>
        </div>
        <div className="mt-3">
          <p style={{ fontWeight: "bolder" }}>{item.title}</p>
          <p>Classificação: {item.rating}</p>
          <ReactStars
            count={item.rating}
            size={20}
            color1={"#f4c10f"}
          ></ReactStars>
        </div>
      </div>
    );
  });

  return (                                                     // layuout da página inicial
    <div className="container">
      <div className="row mt-2">
        <div className="col">
          <RBCarousel
            autoplay={true}
            pauseOnVisibility={true}
            slidesshowSpeed={5000}
            version={4}
            indicators={false}
          >
            {movies}
          </RBCarousel>
        </div>
      </div>

      <div className="row mt-3">
        <div className="col">
          <ul className="list-inline">{genreList}</ul>
        </div>
      </div>

      <div className="row mt-3">
        <div className="col">
          
        </div>
      </div>
      <div className="row mt-3">{movieList}</div>

      <div className="row mt-3">
        <div className="col">
          <p className="font-weight-bold" style={{ color: "#B22222" , fontSize: 30}}>
            DESTACADOS DA SEMANA
          </p>
        </div>
      </div>

      <div className="row mt-3">
        <div className="col">
        </div>
      </div>
      <div className="row mt-3">{trendingPersons}</div>

      <div className="row mt-3">
        <div className="col">
          <p className="font-weight-bold" style={{ color: "#B22222", fontSize: 30 }}>
            MELHORES FILMES DO MOMENTO
          </p>
        </div>
      </div>

      <div className="row mt-3">
        <div className="col">
          
        </div>
      </div>
      <div className="row mt-3">{topRatedList}</div>

      <hr className="mt-5" style={{ borderTop: "1px solid #B22222" }}></hr>

      <div className="row mt-3 mb-5">
        <div className="col-md-8 col-sm-6" style={{ color: "#5a606b" }}>
          <h3>Sobre Nós</h3>
          <p>
            Somos duas alunas no segundo ano de Engenharia Informática no Instituto Politécnico de Tomar. 
            A realização deste projeto foi um desafio para nós, principalmente e tendo em conta a situação atual no nosso país e mundo. O nosso segundo semetre foi passado em casa com aulas online e nem sempre a aprendizagem foi fácil.
          </p>
          
          <ul className="list-inline">
            
            <li className="list-inline-item">
              <a href="https://www.youtube.com/" style={{ color: "#B22222" }}>
                <i className="fab fa-youtube"></i>
              </a>
            </li>
            
            <li className="list-inline-item">
              <a href="https://www.instagram.com/aluga_aqui/" style={{ color: "#B22222" }}>
                <i className="fab fa-instagram"></i>
              </a>
            </li>
          </ul>
        </div>
        <div className="col-md-4 col-sm-6" style={{ color: "#5a606b" }}>
          <h3>CONTACTA-NOS</h3>
          <ul className="list-unstyled">
            <li>
              <p>
                <strong>
                  <i className="fas fa-map-marker-alt"></i> MORADA:
                </strong>{" "}
                INSTITUTO POLITÉCNICO DE TOMAR
              </p>
            </li>
            <li>
            <p>
                <strong>
                  <i className="fas fa-envelope"></i> Email:
                </strong>{" "}
                aluno21071@ipt.pt
              </p>
            </li>
            <li>
              <p>
                <strong>
                  <i className="fas fa-envelope"></i> Email:
                </strong>{" "}
                aluno21074@ipt.pt
              </p>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}