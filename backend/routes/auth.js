const express = require('express')
const router = express.Router()
const db = require('../config/db')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')

router.post('/login', async (req, res) => {
  try {
    const { correo, password } = req.body
    
    const [users] = await db.query('SELECT * FROM USUARIOS WHERE correo = ?', [correo])
    if (users.length === 0) return res.status(401).json({ error: 'Credenciales inválidas' })
    
    const user = users[0]
    const validPassword = await bcrypt.compare(password, user.password)
    
    if (!validPassword) return res.status(401).json({ error: 'Credenciales inválidas' })
    
    const [vendedor] = await db.query('SELECT * FROM VENDEDORES WHERE USUARIOS_id_usuario = ?', [user.id_usuario])
    const role = vendedor.length > 0 ? 'vendedor' : 'cliente'
    
    const token = jwt.sign(
      { id: user.id_usuario, correo: user.correo, role },
      process.env.JWT_SECRET,
      { expiresIn: '24h' }
    )
    
    res.json({
      token,
      user: {
        id: user.id_usuario,
        nombre: user.nombre,
        correo: user.correo,
        role
      }
    })
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
})

router.post('/register', async (req, res) => {
  try {
    const { nombre, telefono, correo, password, role } = req.body
    
    const hashedPassword = await bcrypt.hash(password, 10)
    
    const [result] = await db.query(
      'INSERT INTO USUARIOS (nombre, telefono, correo, password) VALUES (?, ?, ?, ?)',
      [nombre, telefono, correo, hashedPassword]
    )
    
    if (role === 'vendedor') {
      const { negocio, zona } = req.body
      await db.query(
        'INSERT INTO VENDEDORES (negocio, zona, telefono, USUARIOS_id_usuario) VALUES (?, ?, ?, ?)',
        [negocio, zona, telefono, result.insertId]
      )
    }
    
    res.status(201).json({ message: 'Usuario registrado' })
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
})

module.exports = router