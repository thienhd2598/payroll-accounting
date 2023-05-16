import { Module } from '@nestjs/common';
import { TasksModule } from './tasks/tasks.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from './auth/auth.module';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { configValidationSchema } from './config.schema';
import { DepartmentModule } from './department/department.module';
import { PositionModule } from './position/position.module';
import { IncomeTaxModule } from './income-tax/income-tax.module';
import { StaffModule } from './staff/staff.module';
import { TimeKeepingModule } from './time-keeping/time-keeping.module';
import { SalaryInformationModule } from './salary-information/salary-information.module';
import { AdvanceSalaryModule } from './advance-salary/advance-salary.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: [`.env.stage.${process.env.STAGE}`],
      validationSchema: configValidationSchema,
    }),
    TasksModule,
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: async (configService: ConfigService) => {
        const isProduction = configService.get('STAGE') === 'prod';

        return {
          ssl: isProduction,
          extra: {
            ssl: isProduction ? { rejectUnauthorized: false } : null,
          },
          type: 'postgres',
          autoLoadEntities: true,
          synchronize: true,
          host: configService.get('DB_HOST'),
          port: configService.get('DB_PORT'),
          username: configService.get('DB_USERNAME'),
          password: configService.get('DB_PASSWORD'),
          database: configService.get('DB_DATABASE'),
        };
      },
    }),
    AuthModule,
    DepartmentModule,
    PositionModule,
    IncomeTaxModule,
    StaffModule,
    TimeKeepingModule,
    SalaryInformationModule,
    AdvanceSalaryModule,
  ],
})
export class AppModule {}
