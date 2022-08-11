import express from 'express';
import { getSchoolsHandler, getSchoolUsersHandler, createSchoolHandler, getSchoolCoursesHandler } from '../controllers/school.controller';
//import { deserializeUser } from '../middleware/deserializeUser';
//import { requireUser } from '../middleware/requireUser';
import { validate } from '../middleware/validate';
import { getSchoolSchema, createSchoolSchema } from '../schemas/school.schema';

const router = express.Router();

// Get schools
router.get('/', getSchoolsHandler);

// Get school users
router.get('/:schoolId/users', validate(getSchoolSchema), getSchoolUsersHandler);

// Get school courses
router.get('/:schoolId/courses', validate(getSchoolSchema), getSchoolCoursesHandler);

// Create school
router.post('/', validate(createSchoolSchema), createSchoolHandler);

export default router;
