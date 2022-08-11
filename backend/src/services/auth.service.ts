import { User } from '../entities/user.entity';
import { LMSDataSource } from '../utils/data-source';

const usersRepo = LMSDataSource.getRepository(User);

export const findUserByEmail = async (email: string) => {
  const user = await usersRepo.findOne({
    where: {
      email: email
    },
    relations: {
      superAdmin: true,
      schoolUser: {
        school: true,
        schoolAdmin: true,
        teacher: true,
        student: true
      }
    }
  });

  return user;
};
