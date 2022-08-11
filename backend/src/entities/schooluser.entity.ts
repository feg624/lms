import { Entity, PrimaryGeneratedColumn, Column, OneToOne, JoinColumn, ManyToOne } from 'typeorm';
import { School } from './school.entity';
import { SchoolAdmin } from './schooladmin.entity';
import { Student } from './student.entity';
import { Teacher } from './teacher.entity';
import { User } from './user.entity';

@Entity('school_users')
export class SchoolUser {

  @PrimaryGeneratedColumn({name: 'school_user_id', primaryKeyConstraintName: 'pk_school_users'})
  id: number;

  @OneToOne(() => User)
  @JoinColumn({name: 'user_id', foreignKeyConstraintName: 'fk_school_users_users'})
  user: User;

  @ManyToOne(() => School, (school) => school.schoolUsers, {nullable: false})
  @JoinColumn({name: 'school_id', foreignKeyConstraintName: 'fk_school_users_schools'})
  school: School;

  @OneToOne(() => SchoolAdmin, (schoolAdmin) => schoolAdmin.schoolUser, {nullable: true})
  schoolAdmin: SchoolAdmin;

  @OneToOne(() => Teacher, (teacher) => teacher.schoolUser, {nullable: true})
  teacher: Teacher;

  @OneToOne(() => Student, (student) => student.schoolUser, {nullable: true})
  student: Student;

};
