import { Request, Response } from 'express';
import jwt from 'jsonwebtoken';
import NodeCache from 'node-cache';
import { generateAccessToken, verifyAccessToken } from '../utils/token';
import dayjs from 'dayjs';

import { cache } from '../utils/cache';
import { channel } from 'diagnostics_channel';

export const loginMethod = (req: Request, res: Response) => {

    let name: string = 'Michelle';

    const { username, password } = req.body;

    if (username !== "admin" || password !== "1234") {
        return res.status(401).json({ message: "credenciales incorrectas" });
    }

    //token
    let userId = '12345';
    const accessToken = generateAccessToken(userId);


    //cache
    cache.set(userId, accessToken, 60 * 15);
    return res.json({ accessToken });

    //cache
}


export const getTimeToken = (req:Request, res:Response) => {

    const {userId} = req.params;

    const ttl = cache.getTtl(userId);

    if(!ttl ){
        return res.status(404).json({
            message: "Token not found or doesn't exist"
        });
    }

    const now = Date.now();
    const timeToLife = Math.floor((ttl - now)/1000);
    const expTime = dayjs(ttl).format('HH:mm:ss');

    return res.json({timeToLife, expTime});

};


export const verifyTokenMethod = (req: Request, res: Response) => {

    const {token} = req.body;

    if(!token){
        return res.status(400).json({message: 'Token is required'})
    };

    const decoded = verifyAccessToken(token);

    if(!decoded){

        return res.status(401).json({message: 'Invalid or expired token'});
    }

    return res.json({message: 'Token is valid', userId: decoded.userId});
}



export const updateToken = (req: Request, res:Response) => {

    const {userId} = req.params;

    const ttl = cache.getTtl(userId);

    if(!ttl ){
        return res.status(404).json({
            message: "Token not found or doesn't exist"
        });
    }


    const newTimeToken: number = 60*15;

    cache.ttl(userId, newTimeToken); //actualizar el tiempo de vida      

    res.json({message:"Update token time etc"});


}