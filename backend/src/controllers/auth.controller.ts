import { NextFunction, Request, Response } from 'express';

const CLIENT_HOME_URL = `${process.env.CLIENT_DOMAIN}/`;

export const userInfoHandler = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  if (req.user) {
    res.status(200).json({
      id: req.user.userEntity.id,
      name: req.user.userEntity.name,
      email: req.user.userEntity.email,
      picture: req.user.picture,
      superAdmin: req.user.userEntity.superAdmin ?? null,
      school: req.user.userEntity.schoolUser?.school ?? null,
      schoolAdmin: req.user.userEntity.schoolUser?.schoolAdmin ?? null,
      teacher: req.user.userEntity.schoolUser?.teacher ?? null,
      student: req.user.userEntity.schoolUser?.student ?? null,
    });
  }
  else {
    res.status(401).json(null);
  }
};

export const logoutHandler = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  await req.logout({
    keepSessionInfo: false
  }, () => {});
  req.session = null;
  req.sessionOptions.maxAge = 0;
  res.redirect(CLIENT_HOME_URL);
};
