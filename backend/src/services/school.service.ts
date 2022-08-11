import { School } from '../entities/school.entity';
import { LMSDataSource } from '../utils/data-source';

const schoolsRepo = LMSDataSource.getRepository(School);

export const getSchools = async () => {
  return await schoolsRepo.find({
    order: {
      id: 'ASC'
    }
  });
};

export const getUsersBySchoolId = async (id: number) => {
  return await schoolsRepo.findOne({
    where: {
      id: id
    },
    relations: {
      schoolUsers: {
        user: true,
        schoolAdmin: true,
        teacher: true,
        student: true
      }
    }
  });
};

export const getCoursesBySchoolId = async (id: number) => {
  return await schoolsRepo.findOne({
    where: {
      id: id
    },
    relations: {
      courses: {
        teacher: {
          schoolUser: {
            user: true
          }
        }
      }
    }
  });
};

export const createSchool = async (input: Partial<School>) => {
  return await schoolsRepo.save(schoolsRepo.create({...input}));
};
