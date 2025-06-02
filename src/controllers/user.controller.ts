import { Request, response, Response } from 'express';
import { User } from '../models/user.ts';
import bcrypt from 'bcrypt';


export const getAllUsers = async (req: Request, res: Response) => {
  try {
    const users = await User.find({ status: true }).select('-password'); // sin passwords
    res.status(200).json(users);
  } catch (error) {
    res.status(500).json({ message: 'Error al obtener los usuarios', error });
  }
};


export const getUserByUsername = async (req: Request, res: Response) => {
  const { username } = req.params;

  try {
    const user = await User.findOne({ username });

    if (!user) {
      return res.status(404).json({ message: "Usuario no encontrado" });
    }

    res.json(user);
  } catch (error) {
    console.error("Error al buscar usuario por username:", error);
    res.status(500).json({ message: "Error del servidor" });
  }
};



export const saveUser = async (req: Request, res: Response) => {
  try {
    const { firstName, lastName, username, email, password, role } = req.body;

    // Generar hash de la contraseña con bcrypt
    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(password, saltRounds);

    const newUser = new User({
      firstName,
      lastName,
      username,
      email,
      password: hashedPassword,
      role,
    });

    const user = await newUser.save();
    return res.json({ user });
  } catch (error) {
    console.error('Error al guardar usuario:', error);
    res.status(500).json({ message: 'Error al guardar el usuario', error });
  }
};


export const updateUser = async (req:Request, res:Response) => {

  const { userId } = req.params;

  const {email, password, firstName, lastName, role, username} = req.body

  const user = await User.findById(userId);

  if (!user){
    return res.status(404).json({message: "the user doesn't exist"})
  }

  const userEmail = await User.findOne({email});

  if(userEmail && userEmail.id !== userId){

    return res.status(426).json({message: "The email is already in use"})
  }

  //If ternario, es mas corto en una sola linea

  user.password= password!=null?password:user.password

  user.email = email;
  user.role = role;
  user.firstName = firstName;
  user.lastName= lastName;
  user.username= username


  const updateUser = await user.save();

  return res.json({updateUser});

}



export const deleteUser = async(req:Request, res:Response) =>{

  const { userId } = req.params;

  const user = await User.findById(userId);


  if (!user){
    return res.status(404).json({message:"The user doesn't exists"})
  }

  user.status = false;
  user.deleteDate = new Date;

  const deleteUser = await user.save();
  return res.json({deleteUser})
}