import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from 'typeorm';
import { Borrowed } from './borrowed.entity';

@Entity({
    name: 'members'
})
export class Member {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ unique: true })
    code: string;

    @Column()
    name: string;

    @Column({ type: 'timestamp', name: 'penalty_end_date', nullable: true })
    penaltyEndDate: Date|null

    @OneToMany(() => Borrowed, borrowed => borrowed.member)
    borrowedBooks: Borrowed[]

    isPenalized() {
        return this.penaltyEndDate && new Date() < this.penaltyEndDate;
    }
}