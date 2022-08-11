import { Entity, PrimaryGeneratedColumn, Index, ManyToOne, JoinColumn } from 'typeorm';
import { Course } from './course.entity';
import { Student } from './student.entity';

@Entity('attendees')
//@Index(['course_id', 'student_id'], {unique: true})
export class Attendee {

  @PrimaryGeneratedColumn({name: 'attendee_id', primaryKeyConstraintName: 'pk_attendees'})
  id: number;

  @ManyToOne(() => Course, (course) => course.attendees, {nullable: false})
  @JoinColumn({name: 'course_id', foreignKeyConstraintName: 'fk_attendees_courses'})
  course: Course;

  @ManyToOne(() => Student, (student) => student.attendees, {nullable: false})
  @JoinColumn({name: 'student_id', foreignKeyConstraintName: 'fk_attendees_students'})
  student: Student;

};
