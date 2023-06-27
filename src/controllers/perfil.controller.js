
const User = require('../models/User') //importar modelo
const fs = require('fs-extra')

const renderPerfil = async (req,res) => {
    // const perfil = await User.findById(req.params.id).lean()

    // console.log("perfil: ",perfil)
    // console.log("perfil:", User.date)


    const USER = await User.findById(req.user._id).lean()
    console.log(USER)
    res.render('user/Perfil',{USER})
    //console.log("render perfil:", req.user._id)
}

const renderEdit = async (req,res) => {

    //const editarP = await User.findById(req.params._id).lean()
    //if(editarP._id != req.params.id) return res.redirect('/portafolios')
    const editarP = await User.findById(req.user._id).lean()
    res.render('user/editarPerfil',{editarP})
    
    console.log("wwwwwwww-------",req.params._id)
    console.log("editarP: ", editarP)
}

const updateEdit = async (req,res) => {
    const editarP = await User.findById(req.user._id).lean()
    if(editarP._id != req.user._id) return res.redirect('user/perfil')
    console.log("editarP de update: ",{editarP})
    const data ={
        names:req.body.names || editarP.names,
        date: req.body.date || editarP.date,
        location:req.body.location || editarP.location,
        ocupation:req.body.ocupation || editarP.ocupation
    }
    await editarP.findByIdAndUpdate(req.user._id,{names,date,location,ocupation})
    res.redirect('user/perfil')
}

module.exports={
    renderPerfil,
    renderEdit,
    updateEdit
}