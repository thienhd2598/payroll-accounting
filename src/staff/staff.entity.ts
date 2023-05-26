import { Exclude } from 'class-transformer';
import { Column, Entity, ManyToOne, CreateDateColumn, UpdateDateColumn, PrimaryGeneratedColumn, OneToMany, JoinColumn, OneToOne } from 'typeorm';
import { Department } from '../department/department.entity';
import { Position } from '../position/position.entity';
import { IncomeTax } from '../income-tax/income-tax.entity';
import { AdvanceSalary } from 'src/advance-salary/advance-salary.entity';
import { TimeKeeping } from 'src/time-keeping/time-keeping.entity';
import { SalaryInformation } from 'src/salary-information/salary-information.entity';

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

    @OneToMany((_type) => AdvanceSalary, (as) => as.staff, { eager: true })
    advance_salary: AdvanceSalary;

    @OneToMany((_type) => TimeKeeping, (tk) => tk.staff, { eager: true })
    time_keeping: TimeKeeping;

    @OneToMany((_type) => SalaryInformation, (si) => si.staff, { eager: true })        
    @Exclude({ toPlainOnly: true })
    salary_information: SalaryInformation;

    @CreateDateColumn()
    created_at: Date;

    @UpdateDateColumn()
    updated_at: Date;
}