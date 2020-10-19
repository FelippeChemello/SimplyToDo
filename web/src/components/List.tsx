import { AnyAaaaRecord } from 'dns'
import React, { forwardRef, useEffect, useState } from 'react'
import { BsLockFill } from 'react-icons/bs'
import { FiCheck, FiEdit, FiPlus, FiX } from 'react-icons/fi'
import { Link, useHistory } from 'react-router-dom'
import api from '../services/api'

import '../styles/components/list.css'
import Todo from './Todo'

interface ListProps {
    listPath: string
    password: string
    hasPasswordbeenTyped: boolean
    setHasPasswordbeenTyped: any
    isLocked: boolean
    setIsLocked: any
    hasAddedNewTodo: boolean
    setHasAddedNewTodo: any
    setListHasPassword: any
}

interface Todo {
    id: number
    title: string
    isDone: boolean
}

const List = ({
    listPath,
    password,
    hasPasswordbeenTyped,
    setHasPasswordbeenTyped,
    isLocked,
    setIsLocked,
    hasAddedNewTodo,
    setHasAddedNewTodo,
    setListHasPassword,
}: ListProps) => {
    const history = useHistory()
    const [isTitleEditable, setIsTitleEditable] = useState(false)
    const [isDescriptionEditable, setIsDescriptionEditable] = useState(false)
    const [title, setTitle] = useState('')
    const [description, setDescription] = useState('')
    const [todos, setTodos] = useState<Todo[]>([])

    useEffect(() => {
        if (hasPasswordbeenTyped != false) {
            handlePasswordEntered()
        }

        if (hasAddedNewTodo != false) {
            getTodoList()
        }
    }, [listPath, hasPasswordbeenTyped, hasAddedNewTodo])

    function handlePasswordEntered() {
        if (isLocked) {
            getTodoList()
        } else {
            changePassword()
        }
    }

    function getTodoList() {
        api.post(`todos/${listPath}`, { password })
            .then(response => {
                console.log(response)
                setTitle(response.data.name)
                setDescription(response.data.description || 'Descrição da Lista')
                setTodos(response.data.todos || [])
                setHasPasswordbeenTyped(false)
                setIsLocked(false)
            })
            .catch(error => {
                switch (error.response.status) {
                    case 404:
                        alert('A lista solicitada não existe')
                        history.push('/')
                        break
                    case 403:
                        setTitle('Esta lista é protegida por senha, por favor, autentique-se')
                        setListHasPassword(true)
                        setDescription('')
                        setIsLocked(true)
                        setHasPasswordbeenTyped(false)
                        setHasAddedNewTodo(false)
                }
            })
    }

    function changePassword() {
        if (password != '') {
            api.patch(`todos/${listPath}/password`, { password })
                .then(response => {
                    alert('Senha atribuida/alterada com sucesso')
                })
                .catch(error => {
                    switch (error.response.status) {
                        case 404:
                            alert('A lista solicitada não existe')
                            history.push('/')
                            break
                    }
                })
        }
    }

    function handleListInfoUpdate() {
        api.put(`todos/${listPath}`, { password, title, description })
            .then(response => {
                console.log(response)
                setTitle(response.data.name)
                setDescription(response.data.description)
                setIsLocked(false)
            })
            .catch(error => {
                switch (error.response.status) {
                    case 404:
                        alert('A lista solicitada não existe')
                        history.push('/')
                        break
                    case 403:
                        setTitle('Esta lista é protegida por senha, por favor, autentique-se')
                        setDescription('')
                        setIsLocked(true)
                }
            })
    }

    function deleteList() {
        api.post(`todos/${listPath}/delete`, { password })
            .then(response => {
                alert('Lista deletada com sucesso')
                history.push('/')
            })
            .catch(error => {
                switch (error.response.status) {
                    case 412:
                        alert('Todos os items devem estar finalizados para excluir a lista')
                        break
                    case 404:
                        alert('A lista solicitada não existe')
                        history.push('/')
                        break
                    case 403:
                        setTitle('Esta lista é protegida por senha, por favor, autentique-se')
                        setDescription('')
                        setIsLocked(true)
                }
            })
    }

    return (
        <>
            <main className='list'>
                <div className='list-wrapper'>
                    {isTitleEditable ? (
                        <div className='input-title-description'>
                            <input value={title} onChange={event => setTitle(event.target.value)} className='h1' />
                            <FiCheck
                                size={24}
                                onClick={() => {
                                    setIsTitleEditable(false)
                                    handleListInfoUpdate()
                                }}
                                className='icon-edit-confirm'
                            />
                        </div>
                    ) : (
                        <>
                            <h1>
                                {title}
                                {!isLocked && (
                                    <FiEdit
                                        size={24}
                                        onClick={() => {
                                            setIsTitleEditable(true)
                                        }}
                                        className='icon-edit-confirm'
                                    />
                                )}
                            </h1>
                        </>
                    )}
                    {isDescriptionEditable ? (
                        <div className='input-title-description'>
                            <input value={description} onChange={event => setDescription(event.target.value)} className='h3' />
                            <FiCheck
                                size={16}
                                onClick={() => {
                                    setIsDescriptionEditable(false)
                                    handleListInfoUpdate()
                                }}
                                className='icon-edit-confirm'
                            />
                        </div>
                    ) : (
                        <div>
                            <h3>
                                {description}
                                {!isLocked && (
                                    <FiEdit
                                        size={16}
                                        onClick={() => {
                                            setIsDescriptionEditable(true)
                                        }}
                                        className='icon-edit-confirm'
                                    />
                                )}
                            </h3>
                        </div>
                    )}

                    {isLocked && <BsLockFill size={128} color='#17d6eb' className='locked' />}

                    {!isLocked &&
                        todos.map(todo => (
                            <Todo key={todo.id} title={todo.title} listPath={listPath} todoId={todo.id} password={password} isDone={todo.isDone} />
                        ))}
                </div>
            </main>
            {!isLocked && (
                <>
                    <button className='delete-list' onClick={deleteList}>
                        <FiX size={32} color='#FFF' /> <span>Excluir Lista</span>
                    </button>

                    <Link to={`/list/${listPath}/create-todo`} className='create-todo'>
                        <span>Adicionar Novo Item</span> <FiPlus size={32} color='#FFF' />
                    </Link>
                </>
            )}
        </>
    )
}

export default List
