import { object, string, TypeOf } from 'zod';

const params = {
  params: object({
    teacherId: string().regex(/^\d+$/, 'teacherId must be a number')
  }),
};

export const getTeacherSchema = object({
  ...params,
});

export type GetTeacherInput = TypeOf<typeof getTeacherSchema>['params'];
