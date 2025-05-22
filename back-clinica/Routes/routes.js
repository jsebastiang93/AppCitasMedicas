const express = require('express');
const router = express.Router();
const { registrarUsuario, loginUsuario } = require('../Controllers/controllers');

router.post('/registrar', registrarUsuario);
router.post('/login', loginUsuario);

module.exports = router;