import { Exclude } from 'class-transformer';
import { Staff } from 'src/staff/staff.entity';
import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, OneToOne, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm';

@Entity()
export class SalaryInformation {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column()
    salary_basic: number;

    @Column()
    work_hours_standard: number;

    @Column()
    work_day_standard: number;

    @Column()
    insurance_social_rate: number;

    @Column()
    insurance_health_rate: number;

    @Column()
    insurance_unemployment_rate: number;

    @Column()
    tax_personal: number;

    @CreateDateColumn()
    created_at: Date;

    @UpdateDateColumn()
    updated_at: Date;

    @OneToOne((_type) => Staff, (staff) => staff.salary_information, { eager: false })    
    @JoinColumn()
    staff: Staff
}