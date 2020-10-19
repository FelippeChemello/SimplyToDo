import React from 'react'
import { BrowserRouter, Switch, Route } from 'react-router-dom'

import Landing from './pages/Landing'
import App from './pages/App'
import Todo from './components/TodoDetails'
import CreateTodo from './components/CreateTodo'

function Routes() {
    return (
        <BrowserRouter>
            <Switch>
                <Route path='/' exact component={Landing} />
                <Route path='/list/:id' exact component={App} />
                <Route path='/list/:id/:action/:todoId?' component={App} />
            </Switch>
        </BrowserRouter>
    )
}

export default Routes
