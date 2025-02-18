import { NextFunction,  Request, Response } from "express"
import {CustomJwtPayload} from '../utils/customJwtPayload'
import { HttpException} from '../exceptions/httpException'
import jwt from 'jsonwebtoken'


const TOKEN_PASSWORD = process.env.TOKEN_PASSWORD || "pass"


export function isAuthenticate(req:Request, res:Response, next:NextFunction){
    console.log("Cookie en isAuthenticate:");
    console.log(req.cookies);
    const tokenReceived = req.cookies.token
    //test error no hay cookies?
    if(!tokenReceived) return next(new HttpException(403, JSON.stringify(req.cookies)))
    //if(!tokenReceived) return next(new HttpException(403, "Access Denied"))
    try{
        const tokenDecodificado = jwt.verify(tokenReceived,TOKEN_PASSWORD)
        req.user = tokenDecodificado as CustomJwtPayload
        next()
    }catch(error){
        next(error)
    }
}


