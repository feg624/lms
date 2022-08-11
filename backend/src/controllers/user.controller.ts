import { NextFunction, Request, Response } from 'express';
import { User } from '../entities/user.entity';
import { getUsers } from '../services/user.service';

export const getUsersHandler = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const users: User[] = await getUsers();
  res.status(200).json(users.map(u => {
    return {
      id: u.id,
      name: u.name,
      email: u.email,
      superAdmin: u.superAdmin ?? null,
      school: u.schoolUser?.school ?? null,
      schoolAdmin: u.schoolUser?.schoolAdmin ?? null,
      teacher: u.schoolUser?.teacher ?? null,
      student: u.schoolUser?.student ?? null,
    }
  }));
};
