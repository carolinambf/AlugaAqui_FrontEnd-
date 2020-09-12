import React, { useState, useEffect } from "react";
import {
  fetchMovieDetail,
  fetchMovieVideos,
  fetchCasts,
  fetchSimilarMovie,
} from "../../service/moviedb";
import "react-bootstrap-carousel/dist/react-bootstrap-carousel.css";
import { Modal, Button } from "react-bootstrap";
import ReactPlayer from "react-player";
import ReactStars from "react-rating-stars-component";
import { Link } from "react-router-dom";
import { rent } from "../../service/aluguer";
import { price } from "../../service/filmes";
import { useHistory } from "react-router-dom";

export function MovieDetail({ match }) {
  let params = match.params;
  let genres = [];
  const [isOpen, setIsOpen] = useState(false);
  const [detail, setDetail] = useState([]);
  const [video, setVideo] = useState([]);
  const [casts, setCasts] = useState([]);
  const [similarMovie, setSimilarMovie] = useState([]);
  const history = useHistory();
  
  const rentMovie = function(id, title) {
    rent({
      movie_id: id,
      movie_name: title,
    }).then(aluguer => {
      history.push('/dashboard');
    })
  };

  useEffect(() => {
    const fetchAPI = async () => {
      let movie = await fetchMovieDetail(params.id);
      movie.price = await price(movie.id);
      setDetail(movie);
      setVideo(await fetchMovieVideos(params.id));
      setCasts(await fetchCasts(params.id));
      setSimilarMovie(await fetchSimilarMovie(params.id));
    };

    fetchAPI();
  }, [params.id]);

  genres = detail.genres;

  const MoviePalyerModal = (props) => {
    const youtubeUrl = "https://www.youtube.com/watch?v=";
    return (
      <Modal
        {...props}
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title
            id="contained-modal-title-vcenter"
            style={{ color: "#B22222", fontWeight: "bolder" }}
          >
            {detail.title}
          </Modal.Title>
        </Modal.Header>
        <Modal.Body style={{ backgroundColor: "#B22222" }}>
          <ReactPlayer
            className="container-fluid"
            url={youtubeUrl + video.key}
            playing
            width="100%"
          ></ReactPlayer>
        </Modal.Body>
      </Modal>
    );
  };

  let genresList;
  if (genres) {
    genresList = genres.map((g, i) => {
      return (
        <li className="list-inline-item" key={i}>
          <button type="button" className="btn btn-outline-info">
            {g.name}
          </button>
        </li>
      );
    });
  }

  const castList = casts.slice(0, 4).map((c, i) => {
    return (
      <div className="col-md-3 text-center" key={i}>
        <img
          className="img-fluid rounded-circle mx-auto d-block"
          src={c.img}
          alt={c.name}
        ></img>
        <p className="font-weight-bold text-center">{c.name}</p>
        <p
          className="font-weight-light text-center"
          style={{ color: "#ffffff" }}
        >
          {c.character}
        </p>
      </div>
    );
  });

  const similarMovieList = similarMovie.slice(0, 4).map((item, index) => {
    return (
      <div className="col-md-3 col-sm-6" key={index}>
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

  return (
    <div className="container">
      <div className="row mt-2">
        <MoviePalyerModal
          show={isOpen}
          onHide={() => {
            setIsOpen(false);
          }}
        ></MoviePalyerModal>
        <div className="col text-center" style={{ width: "100%" }}>
          <img
            className="img-fluid"
            src={`http://image.tmdb.org/t/p/original/${detail.backdrop_path}`}
            alt={detail.title}
          ></img>
          <div className="carousel-center">
            <i
              onClick={() => setIsOpen(true)}
              className="far fa-play-circle"
              style={{ fontSize: 90, color: "#B22222", cursor: "pointer" }}
            ></i>
          </div>
          <div
            className="carousel-caption"
            style={{ textAlign: "center", fontSize: 30, fontFamily: "comic sans MS", textShadow:  "2px 2px FireBrick" , textDecoration: "overline" }}
          >
            {detail.title}
          </div>
        </div>
      </div>

      <div className="row mt-3">
        <div className="col">
          <p style={{ color: "#B22222", fontWeight: "bolder",fontSize: 30 }}>GÉNERO</p>
        </div>
      </div>

      <div className="row mt-3">
        <div className="col">
          <ul className="list-inline">{genresList}</ul>
        </div>
      </div>

      <div className="row mt-3">
        <div className="col">
          <div className="text-center">

            <ReactStars
              count={detail.vote_average}
              size={20}
              color1={"#f4c10f"}
            ></ReactStars>
          </div>
          <div className="mt-3">
            <p style={{ color: "#B22222", fontWeight: "bolder", fontSize: 30 }}>PREÇO DE ALUGUER</p> 
            <div>
              { localStorage.getItem("token") ? <>
                <Button className="mr-2" onClick={() => rentMovie(detail.id, detail.title)} style={{ backgroundColor: "#B22222", border: "none" }}>
                  ALUGAR
                </Button>
                <span className="mr-2">POR</span>
              </> : (
                <p className="text-muted">Crie uma conta para alugar este filme</p>
              ) }
              <span className="h4">{detail.price}€</span>
            </div>
      
            <p className="mt-4" style={{ color: "#B22222", fontWeight: "bolder", fontSize: 30 }}>RESUMO</p>
            {detail.overview}
          </div>
        </div>
      </div>

      <div className="row mt-3">
        <div className="col-md-3">
          <p style={{ color: "#B22222", fontWeight: "bolder" }}>DATA DA REALIZAÇÃO</p>
          <p style={{ color: "#ffffff" }}>{detail.release_date}</p>
        </div>
        <div className="col-md-3">
          <p style={{ color: "#B22222", fontWeight: "bolder" }}>DURAÇÃO</p>
          <p style={{ color: "#ffffff" }}>{detail.runtime}</p>
        </div>
        <div className="col-md-3">
          <p style={{ color: "#B22222", fontWeight: "bolder" }}>HOMEPAGE</p>
          <p style={{ color: "#ffffff" }}>{detail.homepage}</p>
        </div>
      </div>

      <div className="row mt-3">
        <div className="col">
          <p style={{ color: "#B22222", fontWeight: "bolder", fontSize: 30 }}>ELENCO</p>
        </div>
      </div>
      <div className="row mt-3">{castList}</div>

      <div className="row mt-3">
        <div className="col">
          <p style={{ color: "#B22222", fontWeight: "bolder", fontSize: 30   }}>
            FILMES SEMELHANTES 
          </p>
        </div>
      </div>

      <div className="row mt-3">{similarMovieList}</div>

      <hr className="mt-5" style={{ borderTop: "1px solid #B22222" }}></hr>

      <div className="row mt-3 mb-5">
        <div className="col-md-8 col-sm-6" style={{ color: "#5a606b" }}>
          <h3>SOBRE NÓS</h3>
          <p>
          Somos duas alunas no segundo ano de Engenharia Informática no Instituto Politécnico de Tomar. 
            A realização deste projeto foi um desafio para nós, principalmente e tendo em conta a situação atual no nosso país e mundo. O nosso segundo semetre foi passado em casa com aulas online e nem sempre a aprendizagem foi fácil.          </p>
          <p>
           
          </p>
          <ul className="list-inline">
            <li className="list-inline-item">
              <a href="https://www.youtube.com//" style={{ color: "#B22222" }}>
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
          <h3>CONTACTA-NOS </h3>
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
                  <i className="fas fa-map-marker-alt"></i> Email:
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