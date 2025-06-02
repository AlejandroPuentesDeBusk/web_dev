import jwt from 'jsonwebtoken';
import { token } from 'morgan';


const ACCESS_SECRET = 'secret1234utd';

export const generateAccessToken = (userId: string) =>{
    return jwt.sign(
        { userId },
        ACCESS_SECRET,
        {
            expiresIn: '15m'
        }
    )
} 


//aqui creamos esto para verificar que el token haya sido creado con un user id y nuestra clave
export const verifyAccessToken = (token:string): {userId:string} | null  => {

    try{
        const decoded = jwt.verify(token, ACCESS_SECRET) as {userId: string};

        return decoded;
    }catch (error){
        return null;

    };
    
};