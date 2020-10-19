import React, { useEffect, useState } from 'react'
import { FiArrowLeft, FiClock, FiInfo } from 'react-icons/fi'
import { Map, Marker, TileLayer } from 'react-leaflet'
import { Link, useHistory, useParams } from 'react-router-dom'

import api from '../services/api'

import '../styles/pages/todo.css'

interface RouteParams {
    todoId: string | undefined
    id: string
}

interface TodoProps {
    password: string
    setHasChangedTodo: any
}

interface Todo {
    id: number
    listId: number
    title: string
    description: string
    isDone: boolean
    createdDate: number
    updatedDate: number
}

export default function Todo({ password, setHasChangedTodo }: TodoProps) {
    const history = useHistory()
    const routeParams = useParams<RouteParams>()
    const todoId = routeParams.todoId
    const listPath = routeParams.id
    const [todo, setTodo] = useState<Todo>()
    const [isDone, setIsDone] = useState(false)

    useEffect(() => {
        api.post(`todo/${todoId}`, { password, listPath })
            .then(response => {
                setTodo(response.data)
                setIsDone(response.data.isDone)
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
    }, [todoId])

    function handleIsDoneChange() {
        api.patch(`todo/${todoId}/isDone`, { listPath, password })
            .then(response => {
                if (response.status === 204) {
                    setHasChangedTodo(true)
                    setIsDone(!isDone)
                }
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

    function handleDeleteTodo() {
        console.log(listPath)
        api.post(`todo/${todoId}/delete`, { listPath, password })
            .then(response => {
                if (response.status === 204) {
                    setHasChangedTodo(true)
                    history.push(`/list/${listPath}`)
                }
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

    if (!todo) {
        return (
            <div id='page-orphanage'>
                <div className='page-loading'></div>
            </div>
        )
    }

    return (
        <div id='page-todo'>
            <main>
                <div className='todo-details'>
                    <div className='todo-details-content'>
                        <h1>{todo.title}</h1>
                        <p>{todo.description}</p>
                        <p className='todo-status'>
                            <input id='todo-status' type='checkbox' checked={isDone} onChange={handleIsDoneChange} />
                            Finalizada
                        </p>
                        <button onClick={handleDeleteTodo}>Excluir Nota</button>
                    </div>
                </div>
            </main>

            <Link to={`/list/${listPath}`} className='back-button'>
                <FiArrowLeft size={32} color='#FFF' /> <span>Voltar</span>
            </Link>
        </div>
    )
}
