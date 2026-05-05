const express = require('express')
const router = express.Router()
const { getAll, getByVenta, create, update, remove } = require('../controllers/detalleVentaController')

router.get('/', getAll)
router.get('/venta/:id', getByVenta)
router.post('/', create)
router.put('/:id', update)
router.delete('/:id', remove)

module.exports = router