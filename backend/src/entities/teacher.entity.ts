import { Entity, PrimaryGeneratedColumn, Column, OneToOne, JoinColumn, ManyToOne, OneToMany } from 'typeorm';
import { Course } from './course.entity';
import { SchoolUser } from './schooluser.entity';

@Entity('teachers')
export class Teacher {

  @PrimaryGeneratedColumn({name: 'teacher_id', primaryKeyConstraintName: 'pk_teachers'})
  id: number;

  @OneToOne(() => SchoolUser)
  @JoinColumn({name: 'school_user_id', foreignKeyConstraintName: 'fk_teachers_school_users'})
  schoolUser: SchoolUser;

  @OneToMany(() => Course, (course) => course.teacher)
  courses: Course[];

};
