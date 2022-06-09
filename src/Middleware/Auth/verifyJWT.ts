import { NextFunction, Request, Response } from "express";
import jwt from 'jsonwebtoken';

function verifyJWT(req: Request, res: Response, next: NextFunction) {

  let token = req.headers['authorization']?.split(' ').concat()[1]

  if (!token) return res.status(401).json({ auth: false, message: 'No token provided.' });

  jwt.verify(String(token), String(process.env.SECRET), (err, decoded) => {
    if (err) {
      return res.status(500).json({ auth: false, message: 'Failed to authenticate token.' })
    }
    //Caso o JWT PASSOU, SEGUE O FLUXO NORMALMENTE
    next();
  });
}

export default verifyJWT