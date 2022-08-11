import { NextFunction, Request, Response } from 'express';
import { CreateSchoolInput, GetSchoolInput } from '../schemas/school.schema';
import { getSchools, getUsersBySchoolId, getCoursesBySchoolId, createSchool } from '../services/school.service';

export const getSchoolsHandler = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const schools = await getSchools();
  res.status(200).json(schools);
};

export const getSchoolUsersHandler = async (
  req: Request<GetSchoolInput>,
  res: Response,
  next: NextFunction
) => {
  const school = await getUsersBySchoolId(parseInt(req.params.schoolId));
  if (school) {
    res.status(200).json(school.schoolUsers.map(su => {
      return {
        id: su.user.id,
        name: su.user.name,
        email: su.user.email,
        schoolAdmin: su.schoolAdmin ?? null,
        teacher: su.teacher ?? null,
        student: su.student ?? null,
      };
    }));
  }
  else {
    res.status(404).json(null);
  }
};

export const getSchoolCoursesHandler = async (
  req: Request<GetSchoolInput>,
  res: Response,
  next: NextFunction
) => {
  const school = await getCoursesBySchoolId(parseInt(req.params.schoolId));
  if (school) {
    res.status(200).json(school.courses.map(c => {
      return {
        id: c.id,
        name: c.name,
        teacher: {
          id: c.teacher.id,
          name: c.teacher.schoolUser.user.name,
        }
      };
    }));
  }
  else {
    res.status(404).json(null);
  }
};

export const createSchoolHandler = async (
  req: Request<{}, {}, CreateSchoolInput>,
  res: Response,
  next: NextFunction
) => {
  const school = await createSchool(req.body);
  res.status(201).json(school);
};
