const db = require('../config/db')

const getAll = async (req, res) => {
  try {
    const [rows] = await db.query(`
      SELECT v.*, u.nombre as usuario_nombre, u.correo, u.telefono as usuario_telefono
      FROM VENDEDORES v
      JOIN USUARIOS u ON v.USUARIOS_id_usuario = u.id_usuario
    `)
    res.json(rows)
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
}

const getById = async (req, res) => {
  try {
    const [rows] = await db.query('SELECT * FROM VENDEDORES WHERE id_vendedor = ?', [req.params.id])
    if (rows.length === 0) return res.status(404).json({ error: 'Vendedor no encontrado' })
    res.json(rows[0])
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
}

const create = async (req, res) => {
  try {
    const { negocio, zona, telefono, USUARIOS_id_usuario } = req.body
    const [result] = await db.query(
      'INSERT INTO VENDEDORES (negocio, zona, telefono, USUARIOS_id_usuario) VALUES (?, ?, ?, ?)',
      [negocio, zona, telefono, USUARIOS_id_usuario]
    )
    res.status(201).json({ id_vendedor: result.insertId, negocio, zona, telefono, USUARIOS_id_usuario })
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
}

const update = async (req, res) => {
  try {
    const { negocio, zona, telefono } = req.body
    await db.query(
      'UPDATE VENDEDORES SET negocio = ?, zona = ?, telefono = ? WHERE id_vendedor = ?',
      [negocio, zona, telefono, req.params.id]
    )
    res.json({ message: 'Vendedor actualizado' })
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
}

const remove = async (req, res) => {
  try {
    await db.query('DELETE FROM VENDEDORES WHERE id_vendedor = ?', [req.params.id])
    res.json({ message: 'Vendedor eliminado' })
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
}

module.exports = { getAll, getById, create, update, remove }