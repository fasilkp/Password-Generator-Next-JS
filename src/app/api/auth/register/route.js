import dbConnect from "../../../../../config/dbConnect"
import { cookies } from 'next/headers'
import jwt from 'jsonwebtoken'
import UserModel from "@/models/userModel"
import validatePassword from "@/_lib/validatePassword"
import bcrypt from 'bcryptjs'
const salt = bcrypt.genSaltSync(10);

export async function POST(request){
    
    try{
        console.log("login post working")
        await dbConnect()
        const {email, password, name}= await request.json()
        if(!email || !password || !name){
            return Response.json({err:true, message:"please input all details"})
        }
        const validationPassword = validatePassword(password)
        if (!validationPassword.status) {
            return Response.json({err:true, message:validationPassword.message[0].message})
        }
        let user = await UserModel.findOne({email});
        if(user){
            return Response.json({err:true, message:"user already exist"})
        }
        const hashPassword = bcrypt.hashSync(password, salt);
        user = await UserModel.create({name, email, password:hashPassword})
        const token = jwt.sign(
            {
                id: user._id
            },
            process.env.JWT_SECRET
        )
        cookies().set('token', token, { httpOnly: true,
            secure: true,
            maxAge: 1000 * 60 * 5,
            sameSite: "none", });
            console.log("login post cookies set")
            return Response.json({err:false, message:"Success"})
    }catch(err){
        console.log(err)
        Response.json({err:true, message:"something went wrong"})
    }
}
