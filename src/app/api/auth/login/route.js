import dbConnect from "../../../../../config/dbConnect"
import { cookies } from 'next/headers'
import jwt from 'jsonwebtoken'
import UserModel from "@/models/userModel"
import bcrypt from 'bcryptjs'
import { appLog } from "@/_lib/appLogger"

export async function GET(request) {
    try {
        const reqHeaders= new Headers(request.headers)
        const token = reqHeaders.get('Authorization')
        await dbConnect()
        if (!token){
            return Response.json({ login: false, error: true, message: "no token" });
        }
        const verifiedJWT = jwt.verify(token, process.env.JWT_SECRET);
        const user = await UserModel.findById(verifiedJWT.id, { password: 0 });
        if (!user) {
            return Response.json({ login: false, message: "invalid user" });
        }
        appLog({ user, login: true, token }, "login chcek")
        return Response.json({ user, login: true, token });
    } catch (err) {
        console.log("error in login get", err)
        return Response.json({ login: false, error: err });
    }
}

export async function POST(request) {

    try {
        console.log("login post working")
        await dbConnect()
        const { email, password } = await request.json()
        if (!email || !password) {
            return Response.json({ err: true, message: "please input all details" })
        }
        let user = await UserModel.findOne({ email });
        if (!user) {
            return Response.json({ err: true, message: "no user found" })
        }
        if (!bcrypt.compareSync(password, user.password)) {
            return Response.json({ err: true, message: "Invalid password" })

        }
        const token = jwt.sign(
            {
                id: user._id
            },
            process.env.JWT_SECRET
        )
        console.log(token)
        cookies().set({
            name: 'token',
            value: token,
            maxAge: 1000 * 60 * 5,
            httpOnly: true,
            path: '/',
        })
        return Response.json({ err: false, message: "Success", token })
    } catch (err) {
        console.log(err)
        Response.json({ err: true, message: "something went wrong" })
    }

}
