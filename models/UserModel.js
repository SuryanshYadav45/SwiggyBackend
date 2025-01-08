const mongoose= require('mongoose')

const UserSchema=mongoose.Schema({
    fullname:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true,
        unique:true
    },
    password:{
        type:String,
        required:true,
    },
    photoUrl:{
        type:String,
        default:'https://imgs.search.brave.com/07-jioEUUCOU6rDsw4zPH6qgHC_OUgVQGGlvPcNlsyY/rs:fit:860:0:0/g:ce/aHR0cHM6Ly90My5m/dGNkbi5uZXQvanBn/LzA1LzE0LzE4LzQ2/LzM2MF9GXzUxNDE4/NDY1MV9XNXJWQ2Fi/S0tSSDZIM21WYjYy/allXZnVYaW84Yzhz/aS5qcGc',
        
    }
},{
    timestamps:true,
});

const UserModel=mongoose.model('user',UserSchema)

module.exports=UserModel