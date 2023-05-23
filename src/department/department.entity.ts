import { Staff } from 'src/staff/staff.entity';
import { Column, Entity, OneToMany, CreateDateColumn, UpdateDateColumn, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Department {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column()
    name: string;

    @Column()
    phone: string;

    @CreateDateColumn()
    created_at: Date;

    @UpdateDateColumn()
    updated_at: Date;

    @OneToMany((_type) => Staff, (staff) => staff.department, { eager: true })
    staff: Staff;
}