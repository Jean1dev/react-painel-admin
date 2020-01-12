import React from 'react'
// import { Container } from './styles';

export default function MessageImage(props) {
    
  return (
    <>
    {props.data.title}
    <div>
        <img src={props.data.img} width={200}></img>
    </div>
    
    </>
  )
}
