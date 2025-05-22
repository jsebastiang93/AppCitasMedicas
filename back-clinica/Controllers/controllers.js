const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const Usuario = require('../Models/Usuario'); // Asegúrate de que la ruta sea correcta

const registrarUsuario = async (req, res) => {
  try {
    const {
      nombre,
      documento,
      telefono,
      fechaNacimiento,
      correo,
      sexo,
      contraseña,
      rol
    } = req.body;

    // Encriptar la contraseña
    const saltRounds = parseInt(process.env.BCRYPT_SALT_ROUNDS) || 10;
    const hashedPassword = await bcrypt.hash(contraseña, saltRounds);

    const nuevoUsuario = new Usuario({
      nombre,
      documento,
      telefono,
      fechaNacimiento,
      correo,
      sexo,
      contraseña: hashedPassword,
      rol
    });

    await nuevoUsuario.save();
    res.status(201).json({ mensaje: 'Usuario registrado correctamente' });
  } catch (error) {
    console.error('Error al registrar usuario:', error);
    res.status(500).json({ error: 'Error al registrar usuario' });
  }
};


// Login de usuario
const loginUsuario = async (req, res) => {
  const { correo, contraseña } = req.body;

  try {
    const usuario = await Usuario.findOne({ correo });
    if (!usuario) {
      return res.status(404).json({ mensaje: 'Usuario no encontrado' });
    }

    const contraseñaValida = await bcrypt.compare(contraseña, usuario.contraseña);
    if (!contraseñaValida) {
      return res.status(401).json({ mensaje: 'Contraseña incorrecta' });
    }

    const token = jwt.sign(
      { id: usuario._id, rol: usuario.rol },
      process.env.JWT_SECRET,
      { expiresIn: '1h' }
    );

    res.status(200).json({ token });

  } catch (error) {
    console.error('Error en loginUsuario:', error);
    res.status(500).json({ mensaje: 'Error en el servidor' });
  }
};


module.exports = { registrarUsuario, loginUsuario };