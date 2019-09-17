'use strict'

//Constructores

class Seguro{
  constructor (marca, anio, tipo) {
  this.marca = marca;
  this.anio = anio;
  this.tipo = tipo;
  }

  cotizarSeguro(){
    const base = 2000;
    let precio;
    if(this.marca === "1"){
      precio = base * 1.15;
    }else if(this.marca === "2"){
      precio = base * 1.2;
    }else{
      precio = base * 1.25;
    }
    const diferencia = new Date().getFullYear() - this.anio;
    precio = precio - ((diferencia * 3) * precio) / 100;
    if(this.tipo === "basico"){
      precio = precio * 1.3;
    }else{
      precio  = precio * 1.5;
    }
    return precio;
  }
}

//Lo que se muestra
class Interfaz{
  mostrarError(mensaje, tipo){
    const div = document.createElement('div')

    if(tipo === 'error'){
      div.classList.add('mensaje', 'error')
    }
    else{
      div.classList.add('mensaje', 'correcto')
    }
    div.innerHTML = `${mensaje}`
    cotizar.insertBefore(div, document.querySelector('.form-group'))
    setTimeout(function(){
        document.querySelector('.mensaje').remove()
    },2000)
  }

    mostrarResultado(seguro, precio){
      const resultado = document.getElementById('resultado');
      let marca;
      if(seguro.marca === 'americano'){
        marca = 'Americano';
      }else if(seguro.marca = 'asiatico'){
        marca = 'Asiatico';
      }else{
        marca = 'Europeo';
      }
      const div  = document.createElement('div')
      div.innerHTML = 
      `
      <p class='header'>Resumen:</p>
      <p>Marca: ${marca}</p>
      <p>Año: ${seguro.anio}</p>
      <p>Tipo: ${seguro.tipo}</p>
      <p>Precio: ${precio}</p>
      `
      const spinner = document.querySelector('#cargando img');
      spinner.style.display = 'block';
      setTimeout(function(){
        resultado.appendChild(div);
        spinner.style.display = 'none';
      },2000)
    }
  
  }

//variables

const cotizar = document.querySelector('#cotizar-seguro')

//addEventListener

addEventListeners();

function addEventListeners(){
  cotizar.addEventListener('submit', cotizarSeguro)
}

function cotizarSeguro (event){
  event.preventDefault();
  const marca = document.querySelector('#marca')
  const marcaSeleccionada = marca.options[marca.selectedIndex].value
  const anio = document.querySelector('#anio')
  const anioSeleccionado = anio.options[anio.selectedIndex].value
  const tipo = document.querySelector('input[name="tipo"]:checked').value

  const interfaz = new Interfaz()

  if(marcaSeleccionada === '' || anioSeleccionado === '' || tipo === ''){
    interfaz.mostrarError('Por favor, rellene todos los campos del formulario', 'error')
  }else{
    const resultado = document.querySelector('#resultado div')
    if(resultado !== null){
      resultado.remove()
    }
    const seguro = new Seguro(marcaSeleccionada, anioSeleccionado, tipo)
    const precio = seguro.cotizarSeguro();
    interfaz.mostrarResultado(seguro, precio);
    interfaz.mostrarError('Cotizando ....', 'exito')
  }
}

//Determinamos los años del selector
const maxYear = new Date().getFullYear()
const minYear = maxYear - 20;

const ElegirAnio = document.querySelector('#anio')
for(let i = maxYear; i >= minYear; i--){
  let option = document.createElement('option');
  option.value = i;
  option.innerHTML = i;

  ElegirAnio.appendChild(option);
}


