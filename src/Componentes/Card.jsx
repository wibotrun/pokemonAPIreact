import React, { useState } from "react";
import axios from "axios";
import logo from '../pikachushadow.png';
function Card() {
  const [busqueda, setBusqueda] = useState("");
  const [resultadosPoke, setResultadosPoke] = useState("");
  const [imagenPokemon,setImagenPokemon] = useState(logo)
  const [tipos,setTipos] = useState('')
const [colores,setColores] = useState({ electric: "#FFEA70",
fairy: "#feabff",
normal: "#B09398",
fire: "#FF675C",
water: "#0596C7",
ice: "#AFEAFD",
rock: "#999799",
flying: "#7AE7C7",
grass: "#4A9681",
psychic: "#FFC6D9",
ghost: "#561D25",
bug: "#A2FAA3",
poison: "#795663",
ground: "#D2B074",
dragon: "#DA627D",
steel: "#1D8A99",
fighting: "#2F2F2F",
default: "#2A1A1F",})
  const handleInputValue = (e) => {
    setBusqueda(e.currentTarget.value.toLowerCase());
    console.log("input value", busqueda);
  };
const handleSubmit =()=>{
buscarPokemon()
setBusqueda('')
}
  const buscarPokemon = async () => {
    try {
      const resultado = await axios.get(
        `https://pokeapi.co/api/v2/pokemon/${busqueda}/`
      );
      let datos = await resultado.data;
      console.log(datos)
setResultadosPoke(datos)
setImagenPokemon(datos.sprites.front_default)
datos.types.length > 1 ? setTipos([datos.types[0].type.name,datos.types[1].type.name]):setTipos([datos.types[0].type.name])


    } catch (e) {
      console.log('Pokemon not found',e)
      setImagenPokemon(logo)
      setResultadosPoke({name:'Not found'})
      setTipos('')
    }
  };


const getStyle=()=>{
  return {color:`${colores[tipos[0]]}`}
}
const getStyle2=()=>{
  return {color:`${colores[tipos[1]]}`}
}


  return (
    <>
      <div className="formBusqueda">
        <input type="text" value={busqueda} onChange={handleInputValue} className="inputBusqueda" placeholder="Busque un pokemon.."/>
        <button onClick={handleSubmit}>Buscar</button>
      </div>
      <div className="cardContainer">
       <div className="headerCard">
       <h2 className="pokeName">{resultadosPoke.name}</h2>
        <img  src={imagenPokemon} alt="iamgenpoke" className="imagenPokemon"></img>
       </div>
       <div className="footerCard">
        <h4 style={getStyle()}>{tipos[0]}</h4> <h4 style={getStyle2()}>{tipos[1]}</h4> 
        </div>
      </div>
    </>
  )
}

export default Card;
