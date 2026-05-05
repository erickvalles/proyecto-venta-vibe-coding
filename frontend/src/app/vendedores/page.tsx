'use client'
import { useEffect, useState } from 'react'
import { api } from '@/lib/api'

interface Vendedor {
  id_vendedor: number
  negocio: string
  zona: string
  telefono: string
  usuario_nombre: string
  correo: string
}

export default function VendedoresPage() {
  const [vendedores, setVendedores] = useState<Vendedor[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    loadVendedores()
  }, [])

  const loadVendedores = async () => {
    try {
      const data = await api.get('/vendedores')
      setVendedores(data)
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
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Vendedores</h1>
        </div>

        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {vendedores.map((vendedor) => (
            <div key={vendedor.id_vendedor} className="bg-white rounded-lg shadow-lg overflow-hidden border border-gray-100">
              <div className="bg-primary p-4">
                <h2 className="text-xl font-bold text-white">{vendedor.negocio}</h2>
              </div>
              <div className="p-6">
                <div className="space-y-3">
                  <p className="flex items-center text-gray-600">
                    <span className="font-semibold mr-2">📍 Zona:</span> {vendedor.zona}
                  </p>
                  <p className="flex items-center text-gray-600">
                    <span className="font-semibold mr-2">📞 Tel:</span> {vendedor.telefono}
                  </p>
                  <p className="flex items-center text-gray-600">
                    <span className="font-semibold mr-2">👤 Vendedor:</span> {vendedor.usuario_nombre}
                  </p>
                  <p className="flex items-center text-gray-600">
                    <span className="font-semibold mr-2">✉️ Email:</span> {vendedor.correo}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {vendedores.length === 0 && (
          <p className="text-center text-gray-500 py-10">No hay vendedores registrados</p>
        )}
      </div>
    </div>
  )
}