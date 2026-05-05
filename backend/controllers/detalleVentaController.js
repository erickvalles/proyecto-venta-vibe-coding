const db = require('../config/db')

const getAll = async (req, res) => {
  try {
    const [rows] = await db.query(`
      SELECT d.*, p.nombre as producto_nombre
      FROM DETALLE_VENTA d
      JOIN PRODUCTOS p ON d.PRODUCTOS_id_producto = p.id_producto
    `)
    res.json(rows)
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
}

const getByVenta = async (req, res) => {
  try {
    const [rows] = await db.query('SELECT * FROM DETALLE_VENTA WHERE VENTAS_id_venta = ?', [req.params.id])
    res.json(rows)
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
}

const create = async (req, res) => {
  try {
    const { cantidad, precio_unitario, subtotal, VENTAS_id_venta, PRODUCTOS_id_producto } = req.body
    const [result] = await db.query(
      'INSERT INTO DETALLE_VENTA (cantidad, precio_unitario, subtotal, VENTAS_id_venta, PRODUCTOS_id_producto) VALUES (?, ?, ?, ?, ?)',
      [cantidad, precio_unitario, subtotal, VENTAS_id_venta, PRODUCTOS_id_producto]
    )
    res.status(201).json({ id_detalle: result.insertId, cantidad, precio_unitario, subtotal, VENTAS_id_venta, PRODUCTOS_id_producto })
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
}

const update = async (req, res) => {
  try {
    const { cantidad, precio_unitario, subtotal } = req.body
    await db.query(
      'UPDATE DETALLE_VENTA SET cantidad = ?, precio_unitario = ?, subtotal = ? WHERE id_detalle = ?',
      [cantidad, precio_unitario, subtotal, req.params.id]
    )
    res.json({ message: 'Detalle actualizado' })
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
}

const remove = async (req, res) => {
  try {
    await db.query('DELETE FROM DETALLE_VENTA WHERE id_detalle = ?', [req.params.id])
    res.json({ message: 'Detalle eliminado' })
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
}

module.exports = { getAll, getByVenta, create, update, remove }