import { MigrationInterface, QueryRunner } from "typeorm"

export class InitialData1660308119497 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`insert into users(user_id, display_name, email) values (1, 'Franco Guidoli', 'francoguidoli@gmail.com');`);
        await queryRunner.query(`insert into users(user_id, display_name, email) values (2, 'School Admin 1', 'admin_1@fake.com');`);
        await queryRunner.query(`insert into users(user_id, display_name, email) values (3, 'Teacher 1_1', 'teacher_1_1@fake.com');`);
        await queryRunner.query(`insert into users(user_id, display_name, email) values (4, 'Student 1_1', 'student_1_1@fake.com');`);
        await queryRunner.query(`insert into users(user_id, display_name, email) values (5, 'Student 1_2', 'student_1_2@fake.com');`);
        await queryRunner.query(`insert into users(user_id, display_name, email) values (6, 'School Admin 2', 'admin_2@fake.com');`);
        await queryRunner.query(`insert into users(user_id, display_name, email) values (7, 'Teacher 2_1', 'teacher_2_1@fake.com');`);
        await queryRunner.query(`insert into users(user_id, display_name, email) values (8, 'Student 2_1', 'student_2_1@fake.com');`);
        await queryRunner.query(`insert into users(user_id, display_name, email) values (9, 'Student 2_2', 'student_2_2@fake.com');`);
        await queryRunner.query(`insert into users(user_id, display_name, email) values (10, 'Teacher 1_2', 'teacher_1_2@fake.com');`);
        await queryRunner.query(`insert into users(user_id, display_name, email) values (11, 'Teacher 2_2', 'teacher_2_2@fake.com');`);
        
        await queryRunner.query(`insert into schools(school_id, "name") values (1, 'School 1');`);
        await queryRunner.query(`insert into schools(school_id, "name") values (2, 'School 2');`);
        
        await queryRunner.query(`insert into school_users(school_user_id, user_id, school_id) values (1, 2, 1);`);
        await queryRunner.query(`insert into school_users(school_user_id, user_id, school_id) values (2, 3, 1);`);
        await queryRunner.query(`insert into school_users(school_user_id, user_id, school_id) values (3, 4, 1);`);
        await queryRunner.query(`insert into school_users(school_user_id, user_id, school_id) values (4, 5, 1);`);
        await queryRunner.query(`insert into school_users(school_user_id, user_id, school_id) values (9, 10, 1);`);
        
        await queryRunner.query(`insert into school_users(school_user_id, user_id, school_id) values (5, 6, 2);`);
        await queryRunner.query(`insert into school_users(school_user_id, user_id, school_id) values (6, 7, 2);`);
        await queryRunner.query(`insert into school_users(school_user_id, user_id, school_id) values (7, 8, 2);`);
        await queryRunner.query(`insert into school_users(school_user_id, user_id, school_id) values (8, 9, 2);`);
        await queryRunner.query(`insert into school_users(school_user_id, user_id, school_id) values (10, 11, 2);`);
        
        await queryRunner.query(`insert into super_admins(user_id) values (1);`);
        
        await queryRunner.query(`insert into school_admins(school_admin_id, school_user_id) values (1, 1);`);
        await queryRunner.query(`insert into teachers(teacher_id, school_user_id) values (1, 2);`);
        await queryRunner.query(`insert into teachers(teacher_id, school_user_id) values (2, 9);`);
        await queryRunner.query(`insert into students(student_id, school_user_id) values (1, 3);`);
        await queryRunner.query(`insert into students(student_id, school_user_id) values (2, 4);`);
        
        await queryRunner.query(`insert into school_admins(school_admin_id, school_user_id) values (2, 5);`);
        await queryRunner.query(`insert into teachers(teacher_id, school_user_id) values (3, 6);`);
        await queryRunner.query(`insert into teachers(teacher_id, school_user_id) values (4, 10);`);
        await queryRunner.query(`insert into students(student_id, school_user_id) values (3, 7);`);
        await queryRunner.query(`insert into students(student_id, school_user_id) values (4, 8);`);
        
        await queryRunner.query(`insert into courses(course_id, "name", description, teacher_id, school_id) values (1, 'Course 1_1', 'Description 1_1', 1, 1);`);
        await queryRunner.query(`insert into courses(course_id, "name", description, teacher_id, school_id) values (2, 'Course 1_2', 'Description 1_2', 2, 1);`);
        
        await queryRunner.query(`insert into courses(course_id, "name", description, teacher_id, school_id) values (3, 'Course 2_1', 'Description 2_1', 3, 2);`);
        await queryRunner.query(`insert into courses(course_id, "name", description, teacher_id, school_id) values (4, 'Course 2_2', 'Description 2_2', 4, 2);`);
        
        await queryRunner.query(`insert into attendees(attendee_id, course_id, student_id) values (1, 1, 1);`);
        await queryRunner.query(`insert into attendees(attendee_id, course_id, student_id) values (2, 1, 2);`);
        await queryRunner.query(`insert into attendees(attendee_id, course_id, student_id) values (3, 2, 1);`);
        await queryRunner.query(`insert into attendees(attendee_id, course_id, student_id) values (4, 2, 2);`);
        
        await queryRunner.query(`insert into attendees(attendee_id, course_id, student_id) values (5, 3, 3);`);
        await queryRunner.query(`insert into attendees(attendee_id, course_id, student_id) values (6, 3, 4);`);
        await queryRunner.query(`insert into attendees(attendee_id, course_id, student_id) values (7, 4, 3);`);
        await queryRunner.query(`insert into attendees(attendee_id, course_id, student_id) values (8, 4, 4);`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
    }

}
