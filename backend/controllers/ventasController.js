const db = require('../config/db')

const getAll = async (req, res) => {
  try {
    const [rows] = await db.query(`
      SELECT v.*, u.nombre as cliente_nombre, ve.negocio as vendedor_nombre
      FROM VENTAS v
      JOIN USUARIOS u ON v.USUARIOS_id_usuario = u.id_usuario
      JOIN VENDEDORES ve ON v.VENDEDORES_id_vendedor = ve.id_vendedor
    `)
    res.json(rows)
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
}

const getById = async (req, res) => {
  try {
    const [rows] = await db.query('SELECT * FROM VENTAS WHERE id_venta = ?', [req.params.id])
    if (rows.length === 0) return res.status(404).json({ error: 'Venta no encontrada' })
    res.json(rows[0])
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
}

const create = async (req, res) => {
  try {
    const { fecha, total, metodo_pago, USUARIOS_id_usuario, VENDEDORES_id_vendedor } = req.body
    const [result] = await db.query(
      'INSERT INTO VENTAS (fecha, total, metodo_pago, USUARIOS_id_usuario, VENDEDORES_id_vendedor) VALUES (?, ?, ?, ?, ?)',
      [fecha, total, metodo_pago, USUARIOS_id_usuario, VENDEDORES_id_vendedor]
    )
    res.status(201).json({ id_venta: result.insertId, fecha, total, metodo_pago, USUARIOS_id_usuario, VENDEDORES_id_vendedor })
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
}

const update = async (req, res) => {
  try {
    const { fecha, total, metodo_pago } = req.body
    await db.query(
      'UPDATE VENTAS SET fecha = ?, total = ?, metodo_pago = ? WHERE id_venta = ?',
      [fecha, total, metodo_pago, req.params.id]
    )
    res.json({ message: 'Venta actualizada' })
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
}

const remove = async (req, res) => {
  try {
    await db.query('DELETE FROM VENTAS WHERE id_venta = ?', [req.params.id])
    res.json({ message: 'Venta eliminada' })
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
}

module.exports = { getAll, getById, create, update, remove }