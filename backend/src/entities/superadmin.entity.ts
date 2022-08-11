import { Entity, PrimaryGeneratedColumn, Column, OneToOne, JoinColumn } from 'typeorm';
import { User } from './user.entity';

@Entity('super_admins')
export class SuperAdmin {

  @PrimaryGeneratedColumn({name: 'super_admin_id', primaryKeyConstraintName: 'pk_super_admins'})
  id: number;

  @OneToOne(() => User)
  @JoinColumn({name: 'user_id', foreignKeyConstraintName: 'fk_super_admins_users'})
  user: User;

};
