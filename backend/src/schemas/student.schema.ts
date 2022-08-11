import { object, string, TypeOf } from 'zod';

const params = {
  params: object({
    studentId: string().regex(/^\d+$/, 'studentId must be a number')
  }),
};

export const getStudentSchema = object({
  ...params,
});

export type GetStudentInput = TypeOf<typeof getStudentSchema>['params'];
