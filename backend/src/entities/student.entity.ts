import { Entity, PrimaryGeneratedColumn, OneToOne, JoinColumn, OneToMany } from 'typeorm';
import { Attendee } from './attendee.entity';
import { SchoolUser } from './schooluser.entity';

@Entity('students')
export class Student {

  @PrimaryGeneratedColumn({name: 'student_id', primaryKeyConstraintName: 'pk_students'})
  id: number;

  @OneToOne(() => SchoolUser)
  @JoinColumn({name: 'school_user_id', foreignKeyConstraintName: 'fk_students_school_users'})
  schoolUser: SchoolUser;

  @OneToMany(() => Attendee, (attendee) => attendee.student)
  attendees: Attendee[];

  // @ManyToMany(() => Course, (course) => course.students)
  // @JoinTable({
  //   name: 'attends',
  //   joinColumn: {
  //     name: 'student_id',
  //     foreignKeyConstraintName: 'fk_attends_students'
  //   },
  //   inverseJoinColumn: {
  //     name: 'course_id',
  //     foreignKeyConstraintName: 'fk_attends_courses'
  //   },
  // })
  // courses: Course[];
  
};
