import { NextFunction, Request, Response } from "express"
import jwt from "jsonwebtoken"

export default function verifyToken(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    if (!req.headers.authorization) throw new Error()

    const formatToken = req.headers.authorization.replace("Bearer", "").trim()

    jwt.verify(formatToken, process.env.JWT_SECRET as string)

    next()
  } catch (e) {
    return res.status(400).send({ message: "Invalid authentication token." })
  }
}
