import { LMSDataSource } from '../utils/data-source';
import { Student } from '../entities/student.entity';

const studentsRepo = LMSDataSource.getRepository(Student);

export const getCoursesByStudentId = async (id: number) => {
  return await studentsRepo.findOne({
    where: {
      id: id
    },
    relations: {
      attendees: {
        course: {
          teacher: {
            schoolUser: {
              user: true,
            }
          }
        }
      }
    }
  });
};
