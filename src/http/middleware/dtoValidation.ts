import { NextFunction, Request, Response } from "express"
import { ZodError, AnyZodObject, ZodEffects } from "zod"
import { fromZodError } from "zod-validation-error"

const dtoValidation = (
  schemaToValidate: ZodEffects<AnyZodObject> | AnyZodObject
) => {
  return (req: Request, res: Response, next: NextFunction) => {
    try {
      schemaToValidate.parse(req.body)

      next()
    } catch (e) {
      if (e instanceof ZodError) {
        const dtoErrors = fromZodError(e).details

        return res.status(400).send({
          errors: dtoErrors,
          message: "Validation failed",
        })
      }
    }
  }
}

export default dtoValidation
