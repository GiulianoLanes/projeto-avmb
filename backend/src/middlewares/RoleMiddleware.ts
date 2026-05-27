import type { NextFunction, Request, Response } from "express";
import type { JwtPayload } from "jsonwebtoken";

export function requireRole(...roles: ("user" | "admin")[]) {
  return (
    req: Request & { user: JwtPayload },
    res: Response,
    next: NextFunction,
  ) => {
    if (!req.user) {
      return res.status(401).json({ message: "Não Autorizado" });
    }

    if (!roles.includes(req.user.role)) {
      return res.status(403).json({ message: "Acesso Negado" });
    }

    return next();
  };
}
