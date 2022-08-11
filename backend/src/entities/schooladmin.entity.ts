import { Entity, PrimaryGeneratedColumn, Column, OneToOne, JoinColumn, ManyToOne } from 'typeorm';
import { SchoolUser } from './schooluser.entity';

@Entity('school_admins')
export class SchoolAdmin {

  @PrimaryGeneratedColumn({name: 'school_admin_id', primaryKeyConstraintName: 'pk_school_admins'})
  id: number;

  @OneToOne(() => SchoolUser)
  @JoinColumn({name: 'school_user_id', foreignKeyConstraintName: 'fk_school_admins_school_users'})
  schoolUser: SchoolUser;

};
