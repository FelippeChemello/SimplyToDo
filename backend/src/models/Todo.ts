import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, JoinColumn, Timestamp } from 'typeorm'

import List from './List'

@Entity('todoItems')
export default class Todo {
    @PrimaryGeneratedColumn('increment')
    id: number

    @Column()
    title: string

    @Column()
    description: string

    @Column()
    isDone: boolean

    @Column()
    createdDate: number

    @Column()
    updatedDate: number

    @ManyToOne(() => List, list => list.todos)
    @JoinColumn({ name: 'listId' })
    list: List
}
