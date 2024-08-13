import { appLog, errLog } from "@/_lib/appLogger"
import dbConnect from "../../../../../config/dbConnect"
import { cookies } from "next/headers";
import passwordModel from "@/models/passwordModel";

export const DELETE = async (_req, {params}) => {
    try {
        await dbConnect()
        const userId = cookies().get("userId").value;
        await passwordModel.deleteOne({ userId, _id: params.id })
        return Response.json({ err: false, message: "Successfully deleted" })
      } catch (err) {
        errLog(err)
        return Response.json({ err: true, message: "Internal Server Error" })
      }
}
