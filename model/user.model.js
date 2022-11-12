const mogoose = require('mongoose');
var bcrypt = require('bcryptjs');
var validate = require('../services/validations')
var MESSAGE = require('../constant/Message');
const Message = require('../constant/Message');


const schema = mogoose.Schema({
    name:{
        type:String,
        required:true
    },
    email:{
        type: String,
        required: true,
        unique:true
    },
    password:{
        type:String,
        required: true
    }
}) 

var Users = mogoose.model('User',schema);

 Users.createUser = async function(user,func){
    const valid = validate.validateData(user);
    const isDublicate = await Users.findOne({email:user.email});
    if(isDublicate){
        func(validate.ErrorObj(MESSAGE.EMAIL_ALREADY_PRESENT,false),null);
        return;
    }
    if(valid.error){
        func(validate.ErrorObj(valid.error.message,true),null);
        return;
    }
        const salt = await bcrypt.genSaltSync(10);
        const hash = await bcrypt.hash(user.password,salt);
        user.password = hash;
        user.save((err,result)=>{
            if(err){
                func(err,null);
            }
            else{
                func(null,'successfully saved');
            }
        })   
}

Users.editUser = async function(user,func){
    const doc = await Users.findOne({email:user.email});
    if(!doc){

        func(validate.ErrorObj(MESSAGE.EMAIL_NOT_PRESENT,false),null);
        return;
    }
    const valid = validate.validateData(user);
    if(valid.error){
        func(validate.ErrorObj(valid.error.message,true),null);
        return;
    }

    const param = {
        email:user.email,
        name:user.name,
        password:user.password
    }
    doc.updateOne(param,(error,result)=>{
        if(error){
            func(error,null);
        }
        else{
            func(null,'Successfully updated');
        }
    });
}

Users.deleteDoc = async function(user,func){
    const doc = await Users.findOne({email:user.email});
    const valid = validate.validateEmail(user);
    if(valid.error){
        func(validate.ErrorObj(valid.error.message,true),null);
        return;
    }
    if(!doc){
        func(validate.ErrorObj(MESSAGE.EMAIL_NOT_PRESENT,false),null);
        return;
    }
    doc.deleteOne((error,result)=>{
        if(error){
            func(error,null);
        }
        else{
            func(null,{message:'successfully deleted'});
        }
    });
}

Users.getAllDoc = async function(func){
    const records = await  Users.find();
    const data = records.map((e)=>{
        return {
            name:e.name,
            email: e.email,
            password: e.password,
        }
    })
    console.log(records);
    if(data.length<1){
        func(null,{message:MESSAGE.NO_USER_FOUND});
    }
    else{
        func(null,data);
    }
}

module.exports = Users;