import { Request, Response, NextFunction } from "express";
import { verify } from "jsonwebtoken";

interface IPayload {
   sub: string;
}

export function ensureAuthenticated(
   request: Request,
   response: Response,
   next: NextFunction
) {
   // Recebendo o token
   const authToken = request.headers.authorization;

   // Validar token preenchido
   if (!authToken) {
      return response.status(401).end();
   }

   const [, token] = authToken.split(" ");

   try {
      // Validar se token é valido
      const { sub } = verify(token, "matheusdev") as IPayload;

      // Recuperar informções do usuario
      request.user_id = sub;

      return next();
   } catch (error) {
      return response.status(401).end();
   }
}
