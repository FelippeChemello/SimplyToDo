import React, { useState } from 'react'
import { FiArrowRight } from 'react-icons/fi'
import { Link, useHistory } from 'react-router-dom'
import api from '../services/api'

import '../styles/components/todo.css'

interface TodoItem {
    title: string
    todoId: number
    listPath: string
    password: string
    isDone: boolean
}

export default function Todo({ title, todoId, listPath, password, isDone }: TodoItem) {
    const history = useHistory()
    const [isDoneIn, setIsDoneIn] = useState(isDone)

    function handleIsDoneChange() {
        api.patch(`todo/${todoId}/isDone`, { listPath, password })
            .then(response => {
                if (response.status === 204) {
                    setIsDoneIn(!isDoneIn)
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

    return (
        <div className='todo-item'>
            <h1 className='todo-status'>
                <input id='todo-status' type='checkbox' checked={isDoneIn} onChange={handleIsDoneChange} />
                {title}
            </h1>

            <Link to={`/list/${listPath}/todo/${todoId}`} className='link'>
                <FiArrowRight size={24} color='#FFF' />
            </Link>
        </div>
    )
}
