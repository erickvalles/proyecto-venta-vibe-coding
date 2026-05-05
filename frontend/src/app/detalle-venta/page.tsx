'use client'
import { useEffect, useState } from 'react'
import { api } from '@/lib/api'

interface Detalle {
  id_detalle: number
  cantidad: number
  precio_unitario: number
  subtotal: number
  producto_nombre: string
  VENTAS_id_venta: number
}

export default function DetalleVentaPage() {
  const [detalles, setDetalles] = useState<Detalle[]>([])
  const [loading, setLoading] = useState(true)
  const [showForm, setShowForm] = useState(false)
  const [formData, setFormData] = useState({
    cantidad: '',
    precio_unitario: '',
    subtotal: '',
    VENTAS_id_venta: '',
    PRODUCTOS_id_producto: ''
  })

  useEffect(() => {
    loadDetalles()
  }, [])

  const loadDetalles = async () => {
    try {
      const data = await api.get('/detalle-venta')
      setDetalles(data)
    } catch (error) {
      console.error('Error:', error)
    } finally {
      setLoading(false)
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    try {
      await api.post('/detalle-venta', {
        ...formData,
        cantidad: parseInt(formData.cantidad),
        precio_unitario: parseFloat(formData.precio_unitario),
        subtotal: parseFloat(formData.subtotal),
        VENTAS_id_venta: parseInt(formData.VENTAS_id_venta),
        PRODUCTOS_id_producto: parseInt(formData.PRODUCTOS_id_producto)
      })
      setShowForm(false)
      setFormData({ cantidad: '', precio_unitario: '', subtotal: '', VENTAS_id_venta: '', PRODUCTOS_id_producto: '' })
      loadDetalles()
    } catch (error) {
      console.error('Error:', error)
    }
  }

  const handleDelete = async (id: number) => {
    if (confirm('¿Estás seguro de eliminar este detalle?')) {
      try {
        await api.delete(`/detalle-venta/${id}`)
        loadDetalles()
      } catch (error) {
        console.error('Error:', error)
      }
    }
  }

  if (loading) return <div className="text-center py-20">Cargando...</div>

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Detalle de Ventas</h1>
          <button
            onClick={() => setShowForm(!showForm)}
            className="bg-primary text-white px-4 py-2 rounded-md hover:bg-primary-dark"
          >
            {showForm ? 'Cancelar' : 'Nuevo Detalle'}
          </button>
        </div>

        {showForm && (
          <div className="bg-white p-6 rounded-lg shadow-lg mb-8">
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                <input
                  type="number"
                  required
                  value={formData.cantidad}
                  onChange={(e) => setFormData({...formData, cantidad: e.target.value})}
                  className="px-3 py-2 border border-gray-300 rounded-md"
                  placeholder="Cantidad"
                />
                <input
                  type="number"
                  step="0.01"
                  required
                  value={formData.precio_unitario}
                  onChange={(e) => setFormData({...formData, precio_unitario: e.target.value})}
                  className="px-3 py-2 border border-gray-300 rounded-md"
                  placeholder="Precio Unitario"
                />
                <input
                  type="number"
                  step="0.01"
                  required
                  value={formData.subtotal}
                  onChange={(e) => setFormData({...formData, subtotal: e.target.value})}
                  className="px-3 py-2 border border-gray-300 rounded-md"
                  placeholder="Subtotal"
                />
                <input
                  type="number"
                  required
                  value={formData.VENTAS_id_venta}
                  onChange={(e) => setFormData({...formData, VENTAS_id_venta: e.target.value})}
                  className="px-3 py-2 border border-gray-300 rounded-md"
                  placeholder="ID Venta"
                />
                <input
                  type="number"
                  required
                  value={formData.PRODUCTOS_id_producto}
                  onChange={(e) => setFormData({...formData, PRODUCTOS_id_producto: e.target.value})}
                  className="px-3 py-2 border border-gray-300 rounded-md"
                  placeholder="ID Producto"
                />
              </div>
              <button type="submit" className="bg-primary text-white px-4 py-2 rounded-md hover:bg-primary-dark">
                Guardar
              </button>
            </form>
          </div>
        )}

        <div className="bg-white shadow-lg rounded-lg overflow-hidden">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-primary">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-white uppercase">ID</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-white uppercase">Producto</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-white uppercase">Cantidad</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-white uppercase">Precio Unit.</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-white uppercase">Subtotal</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-white uppercase">Venta ID</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-white uppercase">Acciones</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {detalles.map((detalle) => (
                <tr key={detalle.id_detalle} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{detalle.id_detalle}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">{detalle.producto_nombre}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">{detalle.cantidad}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">${detalle.precio_unitario}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">${detalle.subtotal}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">{detalle.VENTAS_id_venta}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm">
                    <button
                      onClick={() => handleDelete(detalle.id_detalle)}
                      className="text-red-600 hover:text-red-900"
                    >
                      Eliminar
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          {detalles.length === 0 && (
            <p className="text-center text-gray-500 py-10">No hay detalles registrados</p>
          )}
        </div>
      </div>
    </div>
  )
}