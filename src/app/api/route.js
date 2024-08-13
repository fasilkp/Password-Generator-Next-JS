import dbConnect from "../../../config/dbConnect"

export async function GET(){
    // await connectDB();
    dbConnect().then(()=>{
        console.log("Database connected")
      }).catch(err=>{
        console.log("middleware err", err)
      })
    return Response.json({name:"hello world"}, {status:201})
}