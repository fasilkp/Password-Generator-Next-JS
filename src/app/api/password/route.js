import passwordModel from "@/models/passwordModel";
import dbConnect from "../../../../config/dbConnect"
import { cookies } from 'next/headers'
import { appLog, errLog } from "@/_lib/appLogger";
import { decrypt, encrypt } from "@/_lib/encryptDecrypt";


export async function GET(request) {
  try {
    const userId = cookies().get("userId").value;
    await dbConnect();
    let passwords = await passwordModel.find({ userId });
    passwords = passwords.map((item) => {
      return { appName: item.appName, userName: item.userName, _id: item._id, password: decrypt(item.password) }
    })
    return Response.json({ err: false, message: "Success", passwords })
  } catch (err) {
    errLog("password get internal server error", err)
    return Response.json({ err: true, message: "something went wrong" })
  }
}

export async function POST(req) {
  try {
    await dbConnect();
    const userId = cookies().get("userId").value;
    const reqBody = await req.json();
    appLog(reqBody)
    const { appName, password, userName } = reqBody;
    if (!appName || !password || !userName) {
      return Response.json({ err: true, message: "please input all details" })
    }
    let passwordExist = await passwordModel.findOne({ userId, appName, userName });
    if (passwordExist) {
      return Response.json({ err: true, message: "password already exist" })
    }
    const encyptedPassword = encrypt(password);
    const newPassword = await passwordModel.create({ appName, userName, userId, password: encyptedPassword })
    return Response.json({ err: false, message: "Success" })

  } catch (err) {
    errLog(err)
    return Response.json({ err: true, message: "Internal Server Error" })
    
  }
}
export async function DELETE(req) {
  try {
    await dbConnect()
    appLog(req.query)
    const userId = cookies().get("userId").value;
    // await passwordModel.deleteOne({ userId, _id: req.body.id })
    return Response.json({ err: false, message: "Successfully deleted" })
  } catch (err) {
    errLog(err)
    return Response.json({ err: true, message: "Internal Server Error" })
  }
}