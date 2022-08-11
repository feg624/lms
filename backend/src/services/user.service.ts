import { User } from '../entities/user.entity';
import { LMSDataSource } from '../utils/data-source';

const usersRepo = LMSDataSource.getRepository(User);

export const getUsers = async () => {
  return await usersRepo.find({
    order: {
      id: 'ASC'
    },
    relations: {
      superAdmin: true,
      schoolUser: {
        school: true,
        schoolAdmin: true,
        teacher: true,
        student: true,
      }
    }
  });
};
