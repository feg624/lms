import { NextFunction, Request, Response } from 'express';
import { GetStudentInput } from '../schemas/student.schema';
import { getCoursesByStudentId } from '../services/student.service';

export const getStudentCoursesHandler = async (
  req: Request<GetStudentInput>,
  res: Response,
  next: NextFunction
) => {
  const student = await getCoursesByStudentId(parseInt(req.params.studentId));
  if (student) {
    res.status(200).json(student.attendees.map(a => {
      return {
        id: a.course.id,
        name: a.course.name,
        teacher: a.course.teacher.schoolUser.user.name,
      };
    }));
  }
  else {
    res.status(404).json(null);
  }
};
