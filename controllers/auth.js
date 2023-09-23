const User = require('../model/user')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

const login = async(req,res)=>{
    try {
        //-------checkif user exist
        const userData = await User.findOne({Email: req.body.Email})
        if (!userData){
            return res.status(401).json('User Not Found')
        }
        //------compare password
        const PasswordMatch = bcrypt.compareSync(req.body.Password, userData.Password)
        if(!PasswordMatch){
            return res.status(401).json('Invalid Password')
        }
        //-------create a web token that last for a 24hrs
        let SecretKey = process.env.SECRET_KEY
        const data = {
            id: userData._id,
            time: Date()
        }
        const token = jwt.sign({
            exp: Math.floor(Date.now() / 1000) + (60 * 60 * 24),
            data,
          }, SecretKey);
        res.status(200).send({token,userData})
    } catch (error) {
        res.status(500).json({err: error})
    }
}
const register = async(req,res)=>{
    try {
        //------hash password
        const salt = await bcrypt.genSalt(Number(process.env.SALT));
        const hashPassword = await bcrypt.hash(req.body.Password, salt);
        // ------create user and save to DB
        const NewUser = new User({
            Name : req.body.Name,
            Email : req.body.Email,
            Password : hashPassword
        })
        let SaveUser = await NewUser.save()
        //--------remove password and send the rest
        const {Password, ...others} = SaveUser._doc
        res.status(200).json(others)
    } catch (error) {
        console.log({err: error})
    }
}
const logout = async(req,res)=>{
    try {
        if(!req.header(tokenHeaderKey)){
            res.status(400).json('token does not exist')
        }
        jwt.destroy()
        res.status(200).json('User successfully signout')
    } catch (error) {
        console.log({err: error})
    }
}

module.exports = {login, register, logout}