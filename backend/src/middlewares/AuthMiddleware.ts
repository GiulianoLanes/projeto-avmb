import type { NextFunction, Request, Response } from "express";
import jwt, { type JwtPayload } from "jsonwebtoken";
import { authConfig } from "../config/AuthConfig.js";

export function requireAuth(req: Request, res: Response, next: NextFunction) {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader?.startsWith("Bearer ")) {
    return res.status(401).json({ message: "Não Autorizado" });
  }

  const [, token] = authHeader.split(" ");

  try {
    const payload = jwt.verify(token, authConfig.jwtSecret);

    if (payload.sub == null) {
      return res.status(401).json({ message: "Não Autorizado" });
    }

    const userId = Number(payload.sub);

    if (Number.isNaN(userId)) {
      return res.status(401).json({ message: "Não Autorizado" });
    }

    req.user = payload as JwtPayload;
    req.userId = userId;

    return next();
  } catch (error) {
    return res.status(401).json({ message: "Não Autorizado" });
  }
}
