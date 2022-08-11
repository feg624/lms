import { object, string, TypeOf } from 'zod';

const params = {
  params: object({
    schoolId: string().regex(/^\d+$/, 'schoolId must be a number')
  }),
};

export const getSchoolSchema = object({
  ...params,
});

export const createSchoolSchema = object({
  body: object({
    name: string({
      required_error: 'Name is required',
    }),
  }),
});

export type GetSchoolInput = TypeOf<typeof getSchoolSchema>['params'];
export type CreateSchoolInput = TypeOf<typeof createSchoolSchema>['body'];
