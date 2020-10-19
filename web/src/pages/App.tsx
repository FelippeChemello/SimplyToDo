import React, { FormEvent, useEffect, useRef, useState } from 'react'
import { BrowserRouter, Link, Route, useHistory, useParams } from 'react-router-dom'
import { FiPlus, FiEdit, FiCheck, FiArrowRight } from 'react-icons/fi'
import { BsLockFill } from 'react-icons/bs'

import CreateTodo from '../components/CreateTodo'
import List from '../components/List'
import TodoDetails from '../components/TodoDetails'
import miniLogo from '../images/logo.svg'

import '../styles/pages/app.css'

interface RouteParams {
    id: string
    action: string | undefined
    todoId: string | undefined
}

export default function App() {
    const history = useHistory()
    const routeParams = useParams<RouteParams>()
    const [password, setPassword] = useState('')
    const [hasPasswordbeenTyped, setHasPasswordbeenTyped] = useState(true)
    const [hasAddedNewTodo, setHasAddedNewTodo] = useState(false)
    const [isLocked, setIsLocked] = useState(true)
    const [listHasPassowrd, setListHasPassword] = useState(false)

    function handlePasswordList(event: FormEvent) {
        event.preventDefault()

        setHasPasswordbeenTyped(true)
    }

    function renderSubPage() {
        console.log(routeParams)

        switch (routeParams.action) {
            case 'todo':
                return <TodoDetails password={password} setHasChangedTodo={setHasAddedNewTodo} />
            case 'create-todo':
                return <CreateTodo listPath={routeParams.id} password={password} setHasAddedNewTodo={setHasAddedNewTodo} />
            default:
                return (
                    <List
                        listPath={routeParams.id}
                        password={password}
                        hasPasswordbeenTyped={hasPasswordbeenTyped}
                        setHasPasswordbeenTyped={setHasPasswordbeenTyped}
                        isLocked={isLocked}
                        setIsLocked={setIsLocked}
                        hasAddedNewTodo={hasAddedNewTodo}
                        setHasAddedNewTodo={setHasAddedNewTodo}
                        setListHasPassword={setListHasPassword}
                    />
                )
        }
    }

    return (
        <div id='page-list'>
            <aside>
                <header>
                    <img src={miniLogo} alt='to-do app' />

                    <h2> Adicione ou remova tarefas da lista</h2>
                    <p> Torne seu dia mais produtivo </p>
                </header>

                <footer>
                    <form className='input-block'>
                        <label htmlFor='name'>Senha</label>
                        <div className='password-submit'>
                            <input id='name' value={password} onChange={event => setPassword(event.target.value)} type='password' />
                            {(isLocked || (!isLocked && !listHasPassowrd)) && (
                                <button onClick={handlePasswordList}>
                                    <FiArrowRight size={26} color='rgba(0, 0, 0, 0.6)' />
                                </button>
                            )}
                        </div>
                    </form>
                </footer>
            </aside>

            <main>{renderSubPage()}</main>
        </div>
    )
}
