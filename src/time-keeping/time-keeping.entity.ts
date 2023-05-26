import { Exclude } from 'class-transformer';
import { Staff } from 'src/staff/staff.entity';
import { Column, CreateDateColumn, Entity, ManyToOne, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm';

@Entity()
export class TimeKeeping {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column()
    month: number;

    @Column()
    year: number;

    @Column({ type: 'decimal', default: 0 })
    work_days: number;

    @Column({ type: 'decimal', default: 0 })
    work_days_holiday: number;

    @Column({ type: 'decimal', default: 0 })
    bonus_hours: number;

    @Column({ type: 'decimal', default: 0 })
    bonus_hours_holiday: number;

    @CreateDateColumn()
    created_at: Date;

    @UpdateDateColumn()
    updated_at: Date;

    @ManyToOne((_type) => Staff, (staff) => staff.time_keeping, { eager: false })
    @Exclude({ toPlainOnly: true })
    staff: Staff
}