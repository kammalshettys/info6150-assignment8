const express = require('express');
const Users = require('../model/user.model');
const route = express.Router();
const User = require('../model/user.model');

route.post('/create',(req,res)=>{
    let user = new User({
        name:req.body.name,
        email:req.body.email,
        password: req.body.password
    })
    User.createUser(user,(error,success)=>{
        if(error){
            return res.status(500).json({isSuccess:false,error:error})
        }
        else{
            return res.status(200).json({isSuccess:true,data:{message:success}})
        }

    })
})

route.post('/edit',(req,res)=>{
    const param = {
        name:req.body.name,
        email:req.body.email,
        password: req.body.password
    }
    Users.editUser(param,(error,result)=>{
        if(error){
            return res.status(500).json({isSuccess:false,error:error})
        }
        else{
            return res.status(200).json({isSuccess:true,data:{message:result}})

        }
    });
})

route.delete('/delete',(req,res)=>{
    const param = {
        email: req.body.email,
    }
    Users.deleteDoc(param,(error,result)=>{
        if(error){
            res.json({isSuccess:false, error:error})
        }
        else{
            res.json({isSuccess:false, data:result});
        }
    });
});

route.get('/getAll',(req,res)=>{
    Users.getAllDoc((error,records)=>{
        if(error){
            res.json({isSuccess:false, message:"error"});
        }
        else{
            res.json({isSuccess:true, data:records})
        }
    })
})
module.exports = route;