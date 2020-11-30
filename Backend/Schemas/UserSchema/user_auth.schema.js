const mongoose=require('mongoose');
const schema=mongoose.Schema;

var validateLength = function(minLength, maxLength) {
    minLength = minLength || 32;
    maxLength = maxLength || 40;
    return {
      validator : function(value) {
        if (value === undefined) return false;
        return value.length >= minLength && value.length <= maxLength;
      },
      message : 'Optional field is shorter than the minimum allowed length (' + minLength + ') or larger than the maximum allowed length (' + maxLength + ')'
    }
  }


const sch={
  name:{
    type:String,
    required:[true,"must be fill"]
  },
    email:{
        type:String,
        required:[true,"must be fill"],
        unique:[true,"must be unique"],
        lowercase: true,
        set: v => v.toLowerCase()
    },
    password:{
        type:String,
        required:[true,"must be fill"],
        validate : validateLength(32,40)
    },
    refreshToken : {
      type : String
    }
}

const user_auth=new schema(sch,{
    timestamps:true
});

module.exports=user_auth;


