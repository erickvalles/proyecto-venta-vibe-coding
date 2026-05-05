'use client'
import { useEffect, useState } from 'react'
import { api } from '@/lib/api'

interface Producto {
  id_producto: number
  nombre: string
  tipo: string
  precio: number
  cantidad: number
  vendedor_nombre: string
}

export default function ProductosPage() {
  const [productos, setProductos] = useState<Producto[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    loadProductos()
  }, [])

  const loadProductos = async () => {
    try {
      const data = await api.get('/productos')
      setProductos(data)
    } catch (error) {
      console.error('Error:', error)
    } finally {
      setLoading(false)
    }
  }

  if (loading) return <div className="text-center py-20">Cargando...</div>

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-8">Catálogo de Productos</h1>

        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {productos.map((producto) => (
            <div key={producto.id_producto} className="bg-white rounded-lg shadow-lg overflow-hidden border border-gray-100 hover:shadow-xl transition-shadow">
              <div className="bg-primary p-4">
                <div className="text-4xl text-center text-white">🍽️</div>
              </div>
              <div className="p-6">
                <h3 className="text-lg font-bold text-gray-900 mb-2">{producto.nombre}</h3>
                <p className="text-sm text-gray-600 mb-2">Tipo: {producto.tipo}</p>
                <p className="text-sm text-gray-600 mb-2">Vendedor: {producto.vendedor_nombre}</p>
                <div className="flex justify-between items-center mt-4">
                  <span className="text-2xl font-bold text-primary">${producto.precio}</span>
                  <span className={`px-3 py-1 rounded-full text-sm ${producto.cantidad > 0 ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
                    {producto.cantidad > 0 ? `Stock: ${producto.cantidad}` : 'Agotado'}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>

        {productos.length === 0 && (
          <p className="text-center text-gray-500 py-10">No hay productos registrados</p>
        )}
      </div>
    </div>
  )
}