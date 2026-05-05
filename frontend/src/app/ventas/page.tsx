'use client'
import { useEffect, useState } from 'react'
import { api } from '@/lib/api'

interface Venta {
  id_venta: number
  fecha: string
  total: number
  metodo_pago: string
  cliente_nombre: string
  vendedor_nombre: string
}

export default function VentasPage() {
  const [ventas, setVentas] = useState<Venta[]>([])
  const [loading, setLoading] = useState(true)
  const [showForm, setShowForm] = useState(false)
  const [formData, setFormData] = useState({
    fecha: '',
    total: '',
    metodo_pago: '',
    USUARIOS_id_usuario: '',
    VENDEDORES_id_vendedor: ''
  })

  useEffect(() => {
    loadVentas()
  }, [])

  const loadVentas = async () => {
    try {
      const data = await api.get('/ventas')
      setVentas(data)
    } catch (error) {
      console.error('Error:', error)
    } finally {
      setLoading(false)
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    try {
      await api.post('/ventas', {
        ...formData,
        total: parseFloat(formData.total),
        USUARIOS_id_usuario: parseInt(formData.USUARIOS_id_usuario),
        VENDEDORES_id_vendedor: parseInt(formData.VENDEDORES_id_vendedor)
      })
      setShowForm(false)
      setFormData({ fecha: '', total: '', metodo_pago: '', USUARIOS_id_usuario: '', VENDEDORES_id_vendedor: '' })
      loadVentas()
    } catch (error) {
      console.error('Error:', error)
    }
  }

  const handleDelete = async (id: number) => {
    if (confirm('¿Estás seguro de eliminar esta venta?')) {
      try {
        await api.delete(`/ventas/${id}`)
        loadVentas()
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
          <h1 className="text-3xl font-bold text-gray-900">Ventas</h1>
          <button
            onClick={() => setShowForm(!showForm)}
            className="bg-primary text-white px-4 py-2 rounded-md hover:bg-primary-dark"
          >
            {showForm ? 'Cancelar' : 'Nueva Venta'}
          </button>
        </div>

        {showForm && (
          <div className="bg-white p-6 rounded-lg shadow-lg mb-8">
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                <input
                  type="date"
                  required
                  value={formData.fecha}
                  onChange={(e) => setFormData({...formData, fecha: e.target.value})}
                  className="px-3 py-2 border border-gray-300 rounded-md"
                  placeholder="Fecha"
                />
                <input
                  type="number"
                  required
                  value={formData.total}
                  onChange={(e) => setFormData({...formData, total: e.target.value})}
                  className="px-3 py-2 border border-gray-300 rounded-md"
                  placeholder="Total"
                />
                <input
                  type="text"
                  required
                  value={formData.metodo_pago}
                  onChange={(e) => setFormData({...formData, metodo_pago: e.target.value})}
                  className="px-3 py-2 border border-gray-300 rounded-md"
                  placeholder="Método de pago"
                />
                <input
                  type="number"
                  required
                  value={formData.USUARIOS_id_usuario}
                  onChange={(e) => setFormData({...formData, USUARIOS_id_usuario: e.target.value})}
                  className="px-3 py-2 border border-gray-300 rounded-md"
                  placeholder="ID Usuario"
                />
                <input
                  type="number"
                  required
                  value={formData.VENDEDORES_id_vendedor}
                  onChange={(e) => setFormData({...formData, VENDEDORES_id_vendedor: e.target.value})}
                  className="px-3 py-2 border border-gray-300 rounded-md"
                  placeholder="ID Vendedor"
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
                <th className="px-6 py-3 text-left text-xs font-medium text-white uppercase">Fecha</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-white uppercase">Total</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-white uppercase">Método</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-white uppercase">Cliente</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-white uppercase">Vendedor</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-white uppercase">Acciones</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {ventas.map((venta) => (
                <tr key={venta.id_venta} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{venta.id_venta}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">{venta.fecha}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">${venta.total}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">{venta.metodo_pago}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">{venta.cliente_nombre}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">{venta.vendedor_nombre}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm">
                    <button
                      onClick={() => handleDelete(venta.id_venta)}
                      className="text-red-600 hover:text-red-900"
                    >
                      Eliminar
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          {ventas.length === 0 && (
            <p className="text-center text-gray-500 py-10">No hay ventas registradas</p>
          )}
        </div>
      </div>
    </div>
  )
}