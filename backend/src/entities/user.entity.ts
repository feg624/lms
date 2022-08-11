import { Entity, PrimaryGeneratedColumn, Column, OneToOne, Index } from 'typeorm';
import { SchoolUser } from './schooluser.entity';
import { SuperAdmin } from './superadmin.entity';

@Entity('users')
@Index(['email'], {unique: true})
export class User {

  @PrimaryGeneratedColumn({name: 'user_id', primaryKeyConstraintName: 'pk_users'})
  id: number;

  @Column({name: 'display_name', width: 100, nullable: false})
  name: string;

  @Column({name: 'email', width: 100, nullable: false})
  email: string;

  @OneToOne(() => SuperAdmin, (superAdmin) => superAdmin.user, {nullable: true})
  superAdmin: SuperAdmin;

  @OneToOne(() => SchoolUser, (schoolUser) => schoolUser.user, {nullable: true})
  schoolUser: SchoolUser;

};
