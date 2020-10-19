import { Request, Response } from 'express'
import { getConnection, getRepository } from 'typeorm'

import List from '../models/List'
import Todo from '../models/Todo'

export default {
    async show(request: Request, response: Response) {
        const { id } = request.params
        const { listPath, password } = request.body

        const todoRepository = getRepository(Todo)
        const listRepository = getRepository(List)

        try {
            const list = await listRepository.findOneOrFail({ path: listPath }, { relations: ['todos'] })

            if ((list.password && !password) || (list.password && list.password != password)) {
                return response.status(403).json({ message: 'You must be authenticated to perform this action' })
            }

            const todo = await todoRepository.findOneOrFail(id, {
                relations: ['list'],
            })

            if (todo.list.id != list.id) throw new Error("Todo doesn't belong to this list")

            return response.status(200).json(todo)
        } catch (exception) {
            console.log(exception)
            return response.status(404).json({ message: 'List was not find' })
        }
    },

    async create(request: Request, response: Response) {
        const { listPath, password, title, description } = request.body

        const todoRepository = getRepository(Todo)
        const listRepository = getRepository(List)

        try {
            const list = await listRepository.findOneOrFail({ path: listPath })

            if ((list.password && !password) || (list.password && list.password != password)) {
                return response.status(403).json({ message: 'You must be authenticated to perform this action' })
            }

            const todoData = {
                list: list,
                title,
                description,
                isDone: false,
                createdDate: Date.now(),
                updatedDate: Date.now(),
            }

            const todo = todoRepository.create(todoData)

            await todoRepository.save(todo)

            return response.status(201).json(list)
        } catch (exception) {
            return response.status(404).json({ message: 'List was not find' })
        }
    },

    async isDone(request: Request, response: Response) {
        const { id } = request.params
        const { listPath, password } = request.body

        const todoRepository = getRepository(Todo)
        const listRepository = getRepository(List)

        try {
            const list = await listRepository.findOneOrFail({ path: listPath }, { relations: ['todos'] })

            if ((list.password && !password) || (list.password && list.password != password)) {
                return response.status(403).json({ message: 'You must be authenticated to perform this action' })
            }

            const todo = await todoRepository.findOneOrFail(id, {
                relations: ['list'],
            })

            if (todo.list.id != list.id) throw new Error("Todo doesn't belong to this list")

            todo.isDone = !todo.isDone

            await todoRepository.save(todo)

            return response.status(204).send()
        } catch (exception) {
            return response.status(404).json({ message: 'List was not find' })
        }
    },

    async delete(request: Request, response: Response) {
        const { id } = request.params
        const { listPath, password } = request.body

        console.log(request.body)

        const todoRepository = getRepository(Todo)
        const listRepository = getRepository(List)

        try {
            const list = await listRepository.findOneOrFail({ path: listPath }, { relations: ['todos'] })

            if ((list.password && !password) || (list.password && list.password != password)) {
                return response.status(403).json({ message: 'You must be authenticated to perform this action' })
            }

            const todo = await todoRepository.findOneOrFail(id, {
                relations: ['list'],
            })

            if (todo.list.id != list.id) throw new Error("Todo doesn't belong to this list")

            await getConnection().createQueryBuilder().delete().from(Todo).where('id = :id', { id }).execute()

            return response.status(204).send()
        } catch (exception) {
            console.log(exception)
            return response.status(404).json({ message: 'List was not find' })
        }
    },
}
