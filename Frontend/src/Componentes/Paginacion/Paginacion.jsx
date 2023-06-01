import React, { useState } from 'react'
import {BsArrowRightCircleFill, BsArrowLeftCircleFill} from 'react-icons/bs'
import './paginacion.css'

const Paginacion = ({pagina, setPagina, maximo}) => {
  const [paginaActual, setPaginaActual] = useState(1)

  const nextPage = () => {
    setPaginaActual(parseInt(paginaActual) + 1)
    setPagina(parseInt(pagina) + 1)
  }

  const previousPage = () => {
    setPaginaActual(parseInt(paginaActual) - 1)
    setPagina(parseInt(pagina) - 1)
  }

  const onKeyDown = e => {
    if(e.keyCode == 13) {
      setPagina (parseInt(e.target.value));
      if(
        parseInt(e.target.value < 1) ||
        parseInt(e.target.value) > Math.ceil(maximo) ||
        isNaN(parseInt (e.target.value))
      ){
        setPagina(1);
        setInput(1);
      }else {
        setPagina(parseInt (e.target.value));
      }
    }
  }

  const onChange = e => {
    setPaginaActual (e.target.value);
  }

  return (
    <div className='paginacion-contenedor'>
        <button className='previous-button' disabled={pagina === 1 || pagina < 1} onClick={previousPage}>
          <BsArrowLeftCircleFill />
        </button>
        <input 
          type='text' 
          onChange={e => onChange(e)}
          onKeyDown={e => onKeyDown(e)}
          name="page"
          value={paginaActual} 
        />
        <p>de {Math.ceil(maximo)}</p>
        <button 
          disabled={pagina === Math.ceil(maximo) || pagina > Math.ceil(maximo)}
          onClick={nextPage}
        >
          <BsArrowRightCircleFill />
        </button>
    </div>
  )
}

export default Paginacion