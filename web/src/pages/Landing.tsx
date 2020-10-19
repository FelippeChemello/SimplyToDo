import React, { useState } from 'react'
import { FiArrowRight } from 'react-icons/fi'
import { useHistory } from 'react-router-dom'

import api from '../services/api'
import logoImg from '../images/logo-text.svg'
import '../styles/pages/landing.css'
import Axios from 'axios'

export default function Landing() {
    const history = useHistory()
    const [listName, setListName] = useState('')

    function handleEnterApp(event: any) {
        event.preventDefault()

        api.get(`todos/${listName}`)
            .then(response => {
                history.push(`/list/${listName}`)
            })
            .catch(error => {
                switch (error.response.status) {
                    case 404:
                        createNewList(listName)
                        break
                    case 403:
                        history.push(`/list/${listName}`)
                    default:
                        alert('Ocorreu um erro desconhecido, por favor tente novamente mais tarde')
                        break
                }
            })
    }

    function createNewList(path: string) {
        api.post('todos', { path })
            .then(response => {
                if (response.status === 201) {
                    history.push(`/list/${listName}`)
                }
            })
            .catch(error => {
                alert('Ocorreu um erro desconhecido, por favor tente novamente mais tarde')
            })
    }

    return (
        <div id='page-landing'>
            <div className='content-wrapper'>
                <img src={logoImg} alt='logo' />

                <main>
                    <h1> Organize sua lista de tarefas </h1>
                    <p> Crie sua lista de tarefas de maneira fácil sem cadastro e utilize em qualquer device.</p>
                </main>

                <form className='access-list'>
                    <input type='text' value={listName} onChange={event => setListName(event.target.value)}></input>
                    <button className='enter-app' onClick={handleEnterApp}>
                        <FiArrowRight size={26} color='rgba(0, 0, 0, 0.6)' />
                    </button>
                </form>
            </div>
        </div>
    )
}
