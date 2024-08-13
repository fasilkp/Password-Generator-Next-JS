import dbConnect from "../../../../config/dbConnect"

export async function GET(){
    dbConnect().then(()=>{
        console.log("Database connected")
      }).catch(err=>{
        console.log("middleware err", err)
      })
    return Response.json({name:"hello world"}, {status:201})
}

export async function POST(){
    dbConnect().then(()=>{
        console.log("Database connected")
      }).catch(err=>{
        console.log("middleware err", err)
      })
    return Response.json({name:"hello world"}, {status:201})
}

export async function PATCH(){
    dbConnect().then(()=>{
        console.log("Database connected")
      }).catch(err=>{
        console.log("middleware err", err)
      })
    return Response.json({name:"hello world"}, {status:201})
}