import React, { Component, Fragment } from "react";
import "./../../public/data.json";

const API = process.env.API;
console.log(process.env.API)

import Card from "../components/Card/Card";

export default class List extends Component {
  constructor() {
    super();
    /** el estado no es mas que un objeto que va almacenar algunos datos
     * en este caso los datos relacionados con las peliculas
     * creo la propiedad data vacia porq van a venir desde un archivo y no desde la app
     */
    this.state = {
      data: [],
      searchTerm: '',
      error: '',
      loading:true,
    };
  }
  async handleSubmit(e) {
      e.preventDefault();
      if (!this.state.searchTerm) {
        return this.setState({error:' escribe un texto valido papu'})
      }
    const res = await fetch(`${API}&s=${this.state.searchTerm}`)
    const data = await res.json();

    if (!data.Search ) {
        return this.setState({error:' no results'})
    }

     this.setState({data: data.Search, error: '', searchTerm:'' })
  }


  async componentDidMount() {
    // const res = await fetch("/../data.json");
    const res = await fetch(`${API}&s=batman`)
    const resJson = await res.json();
    this.setState({ data: resJson.Search, loading:false  });
  }
  /** una vez consulte los datos del json los voy a montar en data lina 21
   * resJson es lo que obtube desde el archivo y ahora los datos estan en la prop data y por ende los puedo recorrer
   * dsde mi app
   */
  render() {


    const { data , loading  } = this.state;
    if (loading) { return  <h3> Loading...</h3> }
    /** del estado, de la prop data, como es un arreglo y quiero recorrerlo hago un map
     * le pongo movie como le pudiera poner pepito
     * y por cada movie devolveme un div,h1 con el titulo de esa movie
     */
    return (
    <Fragment>
        <div className="row">
            <div className="col-md-4 offset-md-4 p-4">
                <form onSubmit={e => this.handleSubmit(e)}>
                    <input
                    type="text"
                    className="form-control"
                    placeholder="search baby"
                    onChange={ e => this.setState({searchTerm: e.target.value})}
                    value={this.state.searchTerm}
                    autoFocus
                       />
                </form>
                <p>
                    {this.state.error ? this.state.error : ''}
                </p>
            </div>
        </div>

        <div className="row">
    {
    data.map((movies,i) => {
      return <Card movie={movies} key={i}/>    })
    }
  </div>
    </Fragment>
  );
  }
}
