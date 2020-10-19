import React, { FormEvent, useEffect, useState } from 'react'
import { Link, useHistory, useParams } from 'react-router-dom'
import { FiArrowLeft, FiArrowRight, FiPlus, FiX } from 'react-icons/fi'

import api from '../services/api'

import '../styles/pages/create-todo.css'

interface RouteParams {
    id: string
}

interface CreateTodoProps {
    listPath: string
    password: string
    setHasAddedNewTodo: any
}

export default function CreateTodo({ listPath, password, setHasAddedNewTodo }: CreateTodoProps) {
    const history = useHistory()

    const [title, setTitle] = useState('')
    const [description, setDescription] = useState('')

    async function handleSubmit(event: FormEvent) {
        event.preventDefault()

        await api
            .post('todo', {
                listPath,
                password,
                title,
                description,
            })
            .then(response => {
                setHasAddedNewTodo(true)
                history.push(`/list/${listPath}`)
            })
            .catch(error => {
                switch (error.response.status) {
                    case 404:
                        alert('A lista solicitada não existe')
                        history.push('/')
                        break
                    case 403:
                        history.push(`/list/${listPath}`)
                }
            })
    }

    return (
        <div id='page-create-todo'>
            <main>
                <form onSubmit={handleSubmit} className='create-todo-form'>
                    <fieldset>
                        <legend>Dados</legend>

                        <div className='input-block'>
                            <label htmlFor='name'>Titulo</label>
                            <input id='name' value={title} onChange={event => setTitle(event.target.value)} />
                        </div>

                        <div className='input-block'>
                            <label htmlFor='about'>Descrição</label>
                            <textarea id='name' maxLength={300} value={description} onChange={event => setDescription(event.target.value)} />
                        </div>
                    </fieldset>

                    <button className='confirm-button' type='submit'>
                        Confirmar
                    </button>
                </form>
            </main>

            <Link to={`/list/${listPath}`} className='back-button'>
                <FiArrowLeft size={32} color='#FFF' /> <span>Voltar</span>
            </Link>
        </div>
    )
}
