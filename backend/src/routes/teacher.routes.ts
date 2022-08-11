import express from 'express';
import { getTeacherCoursesHandler } from '../controllers/teacher.controller';
//import { deserializeUser } from '../middleware/deserializeUser';
//import { requireUser } from '../middleware/requireUser';
import { validate } from '../middleware/validate';
import { getTeacherSchema } from '../schemas/teacher.schema';

const router = express.Router();

// Get teacher courses
router.get('/:teacherId/courses', validate(getTeacherSchema), getTeacherCoursesHandler);

export default router;
