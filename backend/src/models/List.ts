import { Entity, Column, PrimaryGeneratedColumn, OneToMany, JoinColumn } from 'typeorm'

import Todo from './Todo'

@Entity('lists')
export default class List {
    @PrimaryGeneratedColumn('increment')
    id: number

    @Column()
    path: string

    @Column()
    name: string

    @Column()
    password: string

    @Column()
    description: number

    @OneToMany(() => Todo, todo => todo.list, {
        cascade: ['insert', 'update'],
    })
    @JoinColumn({ name: 'listId' })
    todos: Todo[]
}
