import { Router } from 'express'

import ListController from './controllers/ListController'
import TodoController from './controllers/TodoController'

const routes = Router()

routes.get('/todos/:path', ListController.show)
routes.post('/todos/:path', ListController.show)
routes.put('/todos/:path', ListController.update)
routes.post('/todos/:path/delete', ListController.delete)
routes.patch('/todos/:path/password', ListController.setPassword)
routes.post('/todos', ListController.create)

routes.post('/todo', TodoController.create)
routes.post('/todo/:id', TodoController.show)
routes.patch('/todo/:id/isDone', TodoController.isDone)
routes.post('/todo/:id/delete', TodoController.delete)

export default routes
