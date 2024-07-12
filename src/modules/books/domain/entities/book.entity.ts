import { Borrowed } from '../../../members/domain/entities/borrowed.entity';
import { Entity, Column, PrimaryGeneratedColumn, OneToMany, Unique } from 'typeorm';

@Entity({
    name: 'books'
})
export class Book {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ unique: true })
    code: string;

    @Column()
    title: string;

    @Column()
    author: string;

    @Column()
    stock: number;

    @OneToMany(() => Borrowed, borrowed => borrowed.book)
    borrowedBy: Borrowed[]
}