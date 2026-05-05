const express = require('express')
const router = express.Router()
const { getAll, getById, getByVendedor, create, update, remove } = require('../controllers/productosController')

router.get('/', getAll)
router.get('/:id', getById)
router.get('/vendedor/:id', getByVendedor)
router.post('/', create)
router.put('/:id', update)
router.delete('/:id', remove)

module.exports = router