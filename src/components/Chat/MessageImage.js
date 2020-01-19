import React from 'react'
// import { Container } from './styles';

export default function MessageImage(props) {
    
  return (
    <>
    {props.data.title}
    <div>
        <img alt="imagem" src={props.data.img} width={200}></img>
    </div>
    
    </>
  )
}
