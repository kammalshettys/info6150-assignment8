const express = require('express')
const JOI = require('joi');
const ErrorHandler =  require('../model/error.model')
const MESSAGE = require('../constant/Message')
const validateData = (data)=>{
    var obj = {
        name :data.name,
        password: data.password,
        email: data.email
    }
    var regExName = /^[a-zA-Z ]*$/;
    var regPassword = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/;
    var schema = JOI.object().keys({
        name: JOI.string().required().pattern(regExName).messages({
            'string.pattern.base': MESSAGE.INVALID_NAME
        }),
        email: JOI.string().email().message(MESSAGE.INVALID_EMAIL),
        password: JOI.string().pattern(regPassword).messages({
            'string.pattern.base': MESSAGE.INVALID_PASSWORD
        })
    })
    console.log(data._doc);
    return schema.validate(obj,{abortEarly:false});
}

const validateEmail = (data)=>{
    var obj = {
        email: data.email
    }
    var schema = JOI.object().keys({
        email: JOI.string().email().message(MESSAGE.INVALID_EMAIL),
    })
    return schema.validate(obj,{abortEarly:false});
}




const validatePassword = (name)=>{
    var regExPassword = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/
    var lowerCaseLetters = /[a-z]/g;
    var upperCaseLetters = /[A-Z]/g;
    var numbers = /[0-9]/g;
    var specialCharacter = /[^A-Za-z0-9\s]/g;


}

const ErrorObj = (message, isJOI)=>{
    let error = null;;
    if(isJOI){
        let str = message.trim().split('.');
         error = str.map(e=>{
           const erStr = e.split(":");
            return new ErrorHandler(erStr[0].trim(),erStr[1].trim());
        });
    }
    else{
        const erStr = message.split(":");
        error= new ErrorHandler(erStr[0],erStr[1]);
    }
    return error;
}

module.exports = {
    validateData: validateData,
    validateEmail:validateEmail,
    ErrorObj: ErrorObj
}