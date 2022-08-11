import express from 'express';
import { getStudentCoursesHandler } from '../controllers/student.controller';
//import { deserializeUser } from '../middleware/deserializeUser';
//import { requireUser } from '../middleware/requireUser';
import { validate } from '../middleware/validate';
import { getStudentSchema } from '../schemas/student.schema';

const router = express.Router();

// Get student courses
router.get('/:studentId/courses', validate(getStudentSchema), getStudentCoursesHandler);

export default router;
