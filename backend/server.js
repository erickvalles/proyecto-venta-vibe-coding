require('dotenv').config()
const express = require('express')
const cors = require('cors')
const app = express()

app.use(cors())
app.use(express.json())

app.use('/api/auth', require('./routes/auth'))
app.use('/api/vendedores', require('./routes/vendedores'))
app.use('/api/productos', require('./routes/productos'))
app.use('/api/ventas', require('./routes/ventas'))
app.use('/api/detalle-venta', require('./routes/detalleVenta'))

const PORT = process.env.PORT || 3001
app.listen(PORT, () => {
  console.log(`Servidor corriendo en puerto ${PORT}`)
})