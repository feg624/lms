import { Entity, PrimaryGeneratedColumn, Column, Index, ManyToOne, JoinColumn, OneToMany } from 'typeorm';
import { Attendee } from './attendee.entity';
import { School } from './school.entity';
import { Teacher } from './teacher.entity';

@Entity('courses')
@Index(['name'], {unique: true})
export class Course {

  @PrimaryGeneratedColumn({name: 'course_id', primaryKeyConstraintName: 'pk_courses'})
  id: number;

  @Column({name: 'name', width: 100, nullable: false})
  name: string;

  @Column({name: 'description', width: 10000, nullable: true})
  description: string;

  @Column({name: 'deleted', nullable: false, default: false})
  deleted: boolean;

  @ManyToOne(() => Teacher, (teacher) => teacher.courses, {nullable: false})
  @JoinColumn({name: 'teacher_id', foreignKeyConstraintName: 'fk_courses_teachers'})
  teacher: Teacher;

  @ManyToOne(() => School, (school) => school.courses, {nullable: false})
  @JoinColumn({name: 'school_id', foreignKeyConstraintName: 'fk_courses_schools'})
  school: School;

  @OneToMany(() => Attendee, (attendee) => attendee.course)
  attendees: Attendee[];

  // @ManyToMany(() => Student, (student) => student.courses)
  // students: Student[];

};
