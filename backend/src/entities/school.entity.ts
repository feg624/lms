import { Entity, PrimaryGeneratedColumn, Column, Index, OneToMany } from 'typeorm';
import { Course } from './course.entity';
import { SchoolUser } from './schooluser.entity';

@Entity('schools')
@Index(['name'], {unique: true})
export class School {

  @PrimaryGeneratedColumn({name: 'school_id', primaryKeyConstraintName: 'pk_schools'})
  id: number;

  @Column({name: 'name', width: 100, nullable: false})
  name: string;

  @OneToMany(() => SchoolUser, (schoolUser) => schoolUser.school)
  schoolUsers: SchoolUser[];

  @OneToMany(() => Course, (course) => course.school)
  courses: Course[];

};
