const User = require('../model/users')
const bcrypt = require('bcrypt')

exports.register = async (req,res)=> {
    try{
        const{username,fullName,email,alamat,phoneNumber,password} = req.body
        const salt = await bcrypt.genSalt(10)
        const hashedPassword = await bcrypt.hash(password, salt)

        const newUser = new User ({
            username,
            email,
            alamat,
            fullName,
            phoneNumber,
            password:hashedPassword
        })

        const user = await newUser.save()

        res.status(201).send(user)
    }catch (e) {
        return e
    }
}

exports.login =async (req,res)=> {
    try{
        const user = await User.findOne({username:req.body.username})
        !user && res.status(404).send({message:'user not found'})
        console.log(user);

        const validPassword = await bcrypt.compare(req.body.password,user.password)
        !validPassword && res.status(400).send({message:'Wrong Password'})
        console.log(validPassword);

        res.status(200).send({message: 'success login', data:user})
    } catch(e) {
        return e
    }
}