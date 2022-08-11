import { LMSDataSource } from '../utils/data-source';
import { Teacher } from '../entities/teacher.entity';

const teachersRepo = LMSDataSource.getRepository(Teacher);

export const getCoursesByTeacherId = async (id: number) => {
  return await teachersRepo.findOne({
    where: {
      id: id
    },
    relations: {
      courses: {
        attendees: {
          student: {
            schoolUser: {
              user: true,
            }
          }
        }
      }
    }
  });
};
