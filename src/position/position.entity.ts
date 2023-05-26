import { Staff } from 'src/staff/staff.entity';
import { Column, Entity, OneToMany, CreateDateColumn, UpdateDateColumn, PrimaryGeneratedColumn, IsNull } from 'typeorm';

@Entity()
export class Position {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column()
    name: string;

    @Column({ type: 'decimal', default: 0 })    
    allowance: number;

    @CreateDateColumn()
    created_at: Date;

    @UpdateDateColumn()
    updated_at: Date;

    @OneToMany((_type) => Staff, (staff) => staff.department, { eager: true })
    staff: Staff;
}