const db = require('../config/db')

const getAll = async (req, res) => {
  try {
    const [rows] = await db.query(`
      SELECT p.*, v.negocio as vendedor_nombre
      FROM PRODUCTOS p
      JOIN VENDEDORES v ON p.VENDEDORES_id_vendedor = v.id_vendedor
    `)
    res.json(rows)
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
}

const getById = async (req, res) => {
  try {
    const [rows] = await db.query('SELECT * FROM PRODUCTOS WHERE id_producto = ?', [req.params.id])
    if (rows.length === 0) return res.status(404).json({ error: 'Producto no encontrado' })
    res.json(rows[0])
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
}

const getByVendedor = async (req, res) => {
  try {
    const [rows] = await db.query('SELECT * FROM PRODUCTOS WHERE VENDEDORES_id_vendedor = ?', [req.params.id])
    res.json(rows)
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
}

const create = async (req, res) => {
  try {
    const { nombre, tipo, precio, cantidad, VENDEDORES_id_vendedor } = req.body
    const [result] = await db.query(
      'INSERT INTO PRODUCTOS (nombre, tipo, precio, cantidad, VENDEDORES_id_vendedor) VALUES (?, ?, ?, ?, ?)',
      [nombre, tipo, precio, cantidad, VENDEDORES_id_vendedor]
    )
    res.status(201).json({ id_producto: result.insertId, nombre, tipo, precio, cantidad, VENDEDORES_id_vendedor })
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
}

const update = async (req, res) => {
  try {
    const { nombre, tipo, precio, cantidad } = req.body
    await db.query(
      'UPDATE PRODUCTOS SET nombre = ?, tipo = ?, precio = ?, cantidad = ? WHERE id_producto = ?',
      [nombre, tipo, precio, cantidad, req.params.id]
    )
    res.json({ message: 'Producto actualizado' })
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
}

const remove = async (req, res) => {
  try {
    await db.query('DELETE FROM PRODUCTOS WHERE id_producto = ?', [req.params.id])
    res.json({ message: 'Producto eliminado' })
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
}

module.exports = { getAll, getById, getByVendedor, create, update, remove }