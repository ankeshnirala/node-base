import { Request, Response, NextFunction } from "express";
import { validationResult } from "express-validator";

import { RequestValidationError } from "../errors/req.validation";

const validateRequest = (req: Request, res: Response, next: NextFunction) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    throw new RequestValidationError(errors.array());
  }

  next();
};

export { validateRequest };
