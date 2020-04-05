import React from 'react'
import Carousel from 'react-bootstrap/Carousel'
import { Typography } from '@material-ui/core'
import img from '../../../assets/meet_team.svg'
import img2 from '../../../assets/mobile_messages.svg'
import img3 from '../../../assets/success_factor.svg'
import img4 from '../../../assets/web_search.svg'

export default function CustomCarousel() {
    return (
        <Carousel>
            <Carousel.Item>
                <img
                    className="d-block w-100"
                    src={img}
                    alt="First slide"
                />
                <Typography
                    variant="h5">
                    Conheca seu publico
                </Typography>
                <Typography
                    color="textSecondary"
                    gutterBottom>
                    Tenha acesso a todos os dados dos usuario que usam seu chatbot
                </Typography>
            </Carousel.Item>

            <Carousel.Item>
                <img
                    className="d-block w-100"
                    src={img2}
                    alt="Third slide"
                />

                <Typography
                    variant="h5">
                    Veja o que estao perguntando
                </Typography>
                <Typography
                    color="textSecondary"
                    gutterBottom>
                    Voce podera ver as perguntas mais frequentes bem como os assuntos mais falados
                </Typography>
            </Carousel.Item>
            <Carousel.Item>
                <img
                    className="d-block w-100"
                    src={img3}
                    alt="Third slide"
                />

                <Typography
                    variant="h5">
                    Novas possibilidades
                </Typography>
                <Typography
                    color="textSecondary"
                    gutterBottom>
                    Gere novas solucoes e insights com toda informacao que é disponibilizada
                </Typography>
            </Carousel.Item>

            <Carousel.Item>
                <img
                    className="d-block w-100"
                    src={img4}
                    alt="First slide"
                />

                <Typography
                    variant="h5">
                    Muito mais
                </Typography>
                <Typography
                    color="textSecondary"
                    gutterBottom>
                    faca consultas, gere relatorios.....
                </Typography>
            </Carousel.Item>
        </Carousel>
    )
}