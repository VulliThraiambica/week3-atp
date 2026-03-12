//create mini-exprsess app(seperate route)
import exp from 'express'
export const prodapp=exp.Router()
import { hash,compare } from 'bcryptjs';
import { prodmodel } from '../models/prodmodel.js';
import jwt from 'jsonwebtoken'
import { verifytoken } from '../middleware/verifytoken.js';
const {sign}=jwt
prodapp.post('/auth',async (req,res) => {
    //get prod cred obj from client
    const{prodname,prodid}=req.body
    let prod=await prodmodel.findOne({prodname:prodname})
    //if prod not 
    if(prod===null){
        return res.status(404).json({meassage:"invalid prod"})
    }
    //compare prodname
if(prodname !== prod.prodname || prodid !== prod.prodid){
    return res.status(400).json({message:"invalid prod credentials"})
}
// if prodname  matched
// create token(jsonwebtoken-jwt-jaat)
   const signedtoken= sign({prodname:prod.prodname},'abcdef',{expiresIn:"1h"}) //sign(  ,secret key,validity("10 ms,10d for days, 10w for week",10 is sec))
   //STORE IN COOKIE
   res.cookie("token",signedtoken, { 
    httpOnly:true,
    sameSite:"lax",
secure:false}) 
    
   //send token in res
res.status(200).json({message:"login success",token:signedtoken})
})

// SIGN = ENCODE
//VERIFY = DECODE


prodapp.post("/prod",async(req,res)=>
{
    const newprod=req.body;
    
    const newproddoc= new prodmodel(newprod)
 await newproddoc.save()
    res.status(201).json({message : "prod created"})
});
prodapp.get("/prod",verifytoken,async(req,res)=>{
  let prodlist= await prodmodel.find();
  res.status(200).json({message:"prod fetched ", payload:prodlist})
})
prodapp.get("/prod/:id",async(req,res)=>{
    const pid=req.params.id 
    const prodobj=await prodmodel.findOne({_id:pid}) //findByid(uid)
    if(!prodobj){
        return res.status(404).json({message:"prod not found "})
    }
    res.status(200).json({message:"prod is found",payload:prodobj})
})
// use find one method to read a doc with non obj id fields
// use find by id to read doc with obj id

prodapp.put("/prod/:id",async(req,res)=>{
//get mdified user
const modifiedprod=req.body;
const pid=req.params.id;
//find user by id and update
const produser= await prodmodel.findByIdAndUpdate(pid,{$set:{...modifiedprod}},{new:true,runValidators:true})//
res.status(200).json({message:"prod modified",payload:produser})
})

//delete prod

prodapp.delete("/prod/:id",async(req,res)=>{

const obj=req.body;
const pid=req.params.id;
const delprod= await prodmodel.findByIdAndDelete(pid)

if(!delprod)
{
    return res.status(404).json({message:"there is no prod"})
}
res.status(200).json({message:"prod deleted",payload:delprod})
})