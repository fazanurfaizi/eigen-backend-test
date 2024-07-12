import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, JoinColumn } from 'typeorm';
import { Member } from './member.entity';
import { Book } from '../../../../modules/books/domain/entities/book.entity';

@Entity({
    name: 'borrowed'
})
export class Borrowed {
    @PrimaryGeneratedColumn()
    id: number

    @ManyToOne(() => Member, member => member.borrowedBooks, { eager: true })
    @JoinColumn({ name: 'member_id' })
    member: Member

    @ManyToOne(() => Book, book => book.borrowedBy, { eager: true })
    @JoinColumn({ name: 'book_id' })
    book: Book

    @Column({ type: 'timestamp', name: 'borrowed_at' })
    borrowedAt: Date;

    @Column({ type: 'timestamp', name: 'returned_at', nullable: true })
    returnedAt: Date | null;
}