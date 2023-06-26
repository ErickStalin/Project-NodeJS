const { renderPerfil, renderEdit, updateEdit} = require('../controllers/perfil.controller')
const{Router} = require('express')
const router = Router()

router.post('/user/perfil', renderPerfil)

router.get('/user/editarPerfil/:id', renderEdit)

router.put('/user/editarPerfil/:id', updateEdit)

module.exports = router