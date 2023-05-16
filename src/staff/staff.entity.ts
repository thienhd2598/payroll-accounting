import { Exclude } from 'class-transformer';
import { Column, Entity, ManyToOne, CreateDateColumn, UpdateDateColumn, PrimaryGeneratedColumn } from 'typeorm';
import { Department } from '../department/department.entity';
import { Position } from '../position/position.entity';
import { IncomeTax } from '../income-tax/income-tax.entity';

@Entity()
export class Staff {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column()
    name: string;

    @Column()
    phone: string;

    @Column()
    birthday: string;

    @Column()
    address: string;

    @Column()
    date_from: string;

    @Column()
    tax_code: string;

    @ManyToOne((_type) => Department, (department) => department.staff, { eager: false })
    @Exclude({ toPlainOnly: true })
    department: Department;

    @ManyToOne((_type) => Position, (position) => position.staff, { eager: false })
    @Exclude({ toPlainOnly: true })
    position: Position;

    @ManyToOne((_type) => IncomeTax, (it) => it.staff, { eager: false })
    @Exclude({ toPlainOnly: true })
    income_tax: IncomeTax;

    @CreateDateColumn()
    created_at: Date;

    @UpdateDateColumn()
    updated_at: Date;
}