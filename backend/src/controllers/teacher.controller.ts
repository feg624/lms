import { NextFunction, Request, Response } from 'express';
import { GetTeacherInput } from '../schemas/teacher.schema';
import { getCoursesByTeacherId } from '../services/teacher.service';

export const getTeacherCoursesHandler = async (
  req: Request<GetTeacherInput>,
  res: Response,
  next: NextFunction
) => {
  const teacher = await getCoursesByTeacherId(parseInt(req.params.teacherId));
  if (teacher) {
    res.status(200).json(teacher.courses.map(c => {
      return {
        id: c.id,
        name: c.name,
        attendees: c.attendees.map(a => a.student.schoolUser.user.name),
      };
    }));
  }
  else {
    res.status(404).json(null);
  }
};
