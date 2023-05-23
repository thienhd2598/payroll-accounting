import { Exclude } from 'class-transformer';
import { Staff } from 'src/staff/staff.entity';
import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, OneToOne, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm';

@Entity()
export class SalaryInformation {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column()
    month: number;

    @Column()
    year: number;

    @Column()
    work_days: number;

    @Column()
    work_hours: number;

    @Column()
    bonus_hours: number;

    @Column()
    bonus_hours_holiday: number;

    @CreateDateColumn()
    created_at: Date;

    @UpdateDateColumn()
    updated_at: Date;

    @OneToOne((_type) => Staff, (staff) => staff.salary_information, { eager: false })    
    @JoinColumn()
    staff: Staff
}