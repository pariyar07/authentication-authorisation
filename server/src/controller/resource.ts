import { Request, Response } from 'express';

const resourceDummy = (req: Request, res: Response) => {
  return res
    .status(200)
    .send('<h1>You have successfully accessed resource!</h1>');
};

export default resourceDummy;
