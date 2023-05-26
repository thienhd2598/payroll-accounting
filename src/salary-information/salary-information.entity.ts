import { Exclude } from 'class-transformer';
import { Staff } from 'src/staff/staff.entity';
import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, OneToOne, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm';

@Entity()
export class SalaryInformation {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column({ type: 'decimal', default: 0 })
    salary_basic: number;

    @Column({ type: 'decimal', default: 0 })
    work_hours_standard: number;

    @Column({ type: 'decimal', default: 0 })
    work_day_standard: number;

    @Column({ type: 'decimal', default: 0 })
    insurance_social_rate: number;

    @Column({ type: 'decimal', default: 0 })
    insurance_health_rate: number;

    @Column({ type: 'decimal', default: 0 })
    insurance_unemployment_rate: number;

    @CreateDateColumn()
    created_at: Date;

    @UpdateDateColumn()
    updated_at: Date;

    @OneToOne((_type) => Staff, (staff) => staff.salary_information, { eager: false })    
    @JoinColumn()
    staff: Staff
}