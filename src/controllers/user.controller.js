const User = require('../models/User') //importar modelo
const passport = require("passport")
const { sendMailToUser } = require("../config/nodemailer")



const renderRegisterForm =(req,res)=>{
    res.render('user/registerForm')
}

const registerNewUser = async(req,res)=>{
    //DESESTRUCTURAR LOS DATOS DEL FORMULARIO
    const{name,email,password,confirmpassword} = req.body
    //VALIDAR QUE TODOS LOS CAMPOS ESTEN COMPLETOS
    if (Object.values(req.body).includes("")) return res.send("Lo sentimos, debes llenar todos los campos")
    //VALIDAR QUE LAS PASSWORD SEAN IGUALES
    if(password != confirmpassword) return res.send("Lo sentimos, los passwords no coinciden")
    //VERIFICAR EL USUARIO EN BASE AL EMAIL
    const userBDD = await User.findOne({email})
    //VERIFICAR SI EXISTE EL USUARIO
    if(userBDD) return res.send("Lo sentimos, el email ya se encuentra registrado")
    //GUARDAR EL REGISTRO EN LA BD
    const newUser = await new User({name,email,password,confirmpassword})
    //ENCRIPTAR LA PASSWORD Y ENVIO
    newUser.password = await newUser.encrypPassword(password)
    const token = newUser.crearToken()
    sendMailToUser(email,token)
    newUser.save()
    res.redirect('/user/login')
}


const renderLoginForm =(req,res)=>{
    res.render('user/loginForm')
}

const loginUser = passport.authenticate('local',{
    failureRedirect:'/user/login',
    successRedirect:'/portafolios'
})


const logoutUser =(req,res)=>{
    req.logout((err)=>{
        if (err) return res.send("Ocurrio un error") 
        res.redirect('/');
    });
}


const confirmEmail = async(req,res)=>{
    if(!(req.params.token)) return res.send("Lo sentimos, no se puede validar la cuenta")
    const userBDD = await User.findOne({token:req.params.token})
    userBDD.token = null
    userBDD.confirmEmail=true
    await userBDD.save()
    res.send('Token confirmado, ya puedes iniciar sesión');
}

const perfilUsuario = (req, res) => {
    res.render('user/perfil');
}

module.exports={
    renderRegisterForm,
    registerNewUser,
    renderLoginForm,
    loginUser,
    logoutUser,
    confirmEmail,
    perfilUsuario
}