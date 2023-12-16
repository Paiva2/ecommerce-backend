import jwt from "jsonwebtoken"

interface JwtSchema {
  sub: string
  iat: number
  exp: number
}

export default function jwtDecode(token: string) {
  const formatToken = token.replace("Bearer", "").trim()

  return jwt.verify(formatToken, process.env.JWT_SECRET as string) as JwtSchema
}
