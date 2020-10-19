import { Request, Response } from 'express'
import { getConnection, getRepository, UpdateDateColumn } from 'typeorm'

import List from '../models/List'

export default {
    async show(request: Request, response: Response) {
        const { path } = request.params
        const { password } = request.body || null

        console.log(path)

        const listRepository = getRepository(List)

        try {
            const list = await listRepository.findOneOrFail(
                { path },
                {
                    relations: ['todos'],
                }
            )

            if ((list.password && !password) || (list.password && list.password != password)) {
                return response.status(403).json({ message: 'This list has password, please authenticate yourself' })
            }

            return response.status(200).json(list)
        } catch (exception) {
            return response.status(404).json({ message: 'List was not find' })
        }
    },

    async create(request: Request, response: Response) {
        console.log(request.body)

        const { path } = request.body

        const listRepository = getRepository(List)

        //validar se path tem espaços, não pode ter

        const listData = {
            path: path.toLocaleLowerCase(),
            name: path,
        }

        const list = listRepository.create(listData)

        await listRepository.save(list)

        return response.status(201).json(list)
    },

    async setPassword(request: Request, response: Response) {
        const { path } = request.params
        const { password } = request.body

        const listRepository = getRepository(List)

        try {
            const list = await listRepository.findOneOrFail(
                { path },
                {
                    relations: ['todos'],
                }
            )

            if (!list.password) {
                list.password = password

                await listRepository.save(list)

                return response.status(200).json(list)
            }
        } catch (exception) {
            return response.status(404).json({ message: 'List was not find' })
        }
    },

    async update(request: Request, response: Response) {
        const { path } = request.params
        const { password, title, description } = request.body

        const listRepository = getRepository(List)

        try {
            const list = await listRepository.findOneOrFail(
                { path },
                {
                    relations: ['todos'],
                }
            )

            if ((list.password && !password) || (list.password && list.password != password)) {
                return response.status(403).json({ message: 'This list has password, please authenticate yourself' })
            }

            list.name = title
            list.description = description

            await listRepository.save(list)

            return response.status(200).json(list)
        } catch (exception) {
            return response.status(404).json({ message: 'List was not find' })
        }
    },

    async delete(request: Request, response: Response) {
        const { path } = request.params
        const { password } = request.body

        const listRepository = getRepository(List)

        try {
            const list = await listRepository.findOneOrFail({ path }, { relations: ['todos'] })

            if ((list.password && !password) || (list.password && list.password != password)) {
                return response.status(403).json({ message: 'You must be authenticated to perform this action' })
            }

            if (list.todos) {
                let hasTodosNotDone = false

                list.todos.forEach(todo => {
                    if (!todo.isDone) hasTodosNotDone = true
                })

                if (hasTodosNotDone) {
                    return response.status(412).send({ message: 'List has not done Todos' })
                }
            }

            await getConnection().createQueryBuilder().delete().from(List).where('path = :path', { path }).execute()

            return response.status(204).send()
        } catch (exception) {
            console.log(exception)
            return response.status(404).json({ message: 'List was not find' })
        }
    },
}
