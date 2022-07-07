import React, { Component, Fragment } from "react";
import "./../../public/data.json";

const API = process.env.API;
console.log(process.env.API);

import Card from "../components/Card/Card";

export default class List extends Component {
  constructor() {
    super();

    this.state = {
      data: [],
      searchTerm: "",
      error: "",
      loading: true,
    };
  }
  async handleSubmit(e) {
    e.preventDefault();
    if (!this.state.searchTerm) {
      return this.setState({ error: " escribe un texto valido papu" });
    }
    const res = await fetch(`${API}&s=${this.state.searchTerm}`);
    const data = await res.json();

    if (!data.Search) {
      return this.setState({ error: " no results" });
    }

    this.setState({ data: data.Search, error: "", searchTerm: "" });
  }

  async componentDidMount() {
    // alprincipio usabamos local, const res = await fetch("/../data.json");
    const res = await fetch(`${API}&s=batman`);
    const resJson = await res.json();
    this.setState({ data: resJson.Search, loading: false });
  }

  render() {
    const { data, loading } = this.state;
    if (loading) {
      return <h3> Loading...</h3>;
    }

    return (
      <Fragment>
        <div className="row">
          <div className="card mt-3">
            <div className="card-header">Information And Specifications</div>
            <div className="card-body">
              {/* <h5 className="card-title">Special title treatment</h5> */}
              <p className="card-text">
              practical example of React Consuming API (movies and series of OMD) -Without- create-react-app. i install babel and webpack manually.
              React Hooks, React class components and function components are used. as Prop.types for validation. we use environment variables for save the api address out of the code. react-router-dom for manage the routes and Bootstrap for the styling.
              </p>
              <a href="#" className="btn btn-primary">
                GitHub Code
              </a>
              <a href="#" className="btn btn-primary mx-1">
                Personal Website
              </a>
                          </div>
          </div>
        </div>
        <div className="row">
          <div className="col-md-4 offset-md-4 p-4">
            <form onSubmit={(e) => this.handleSubmit(e)}>
              <input
                type="text"
                className="form-control"
                placeholder="search baby"
                onChange={(e) => this.setState({ searchTerm: e.target.value })}
                value={this.state.searchTerm}
                autoFocus
              />
            </form>
            <p>{this.state.error ? this.state.error : ""}</p>
          </div>
        </div>

        <div className="row">
          {data.map((movies, i) => {
            return <Card movie={movies} key={i} />;
          })}
        </div>
      </Fragment>
    );
  }
}
/** el estado no es mas que un objeto que va almacenar algunos datos
 * en este caso los datos relacionados con las peliculas
 * creo la propiedad data vacia porq van a venir desde un archivo y no desde la app
 */
/** una vez consulte los datos del json los voy a montar en data
 * resJson es lo que obtube desde el archivo y ahora los datos estan en la prop data y por ende los puedo recorrer desde mi app
 */
/** del estado, de la prop data, como es un arreglo y quiero recorrerlo hago un map
 * le pongo movie como le pudiera poner pepito
 * y por cada movie devolveme un div,h1 con el titulo de esa movie
 */
