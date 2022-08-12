import 'reflect-metadata';
import { DataSource } from 'typeorm';
import { School } from '../entities/school.entity';
import { SchoolUser } from '../entities/schooluser.entity';
import { SuperAdmin } from '../entities/superadmin.entity';
import { User } from '../entities/user.entity';
import { SchoolAdmin } from '../entities/schooladmin.entity';
import { Teacher } from '../entities/teacher.entity';
import { Student } from '../entities/student.entity';
import { Course } from '../entities/course.entity';
import { Attendee } from '../entities/attendee.entity';

export const LMSDataSource = new DataSource({
    type: 'postgres',
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    username: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_DATABASE,
    synchronize: true,
    logging: false,
    entities: [User, SuperAdmin, School, SchoolUser, SchoolAdmin, Teacher, Student, Course, Attendee],
    migrations: ['src/migration/*.ts'],
    subscribers: [],
});
