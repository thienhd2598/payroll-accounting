import { Exclude } from 'class-transformer';
import { Staff } from 'src/staff/staff.entity';
import { Column, Entity, OneToMany, CreateDateColumn, UpdateDateColumn, PrimaryGeneratedColumn, ManyToOne } from 'typeorm';

@Entity()
export class AdvanceSalary {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column()
    name: string;

    @Column()
    price: number;

    @Column()
    note: string;

    @Column()
    debt_account: number;

    @Column()
    has_account: number;

    @CreateDateColumn()
    created_at: Date;

    @UpdateDateColumn()
    updated_at: Date;

    @ManyToOne((_type) => Staff, (staff) => staff.advance_salary, { eager: false })
    @Exclude({ toPlainOnly: true })
    staff: Staff
}