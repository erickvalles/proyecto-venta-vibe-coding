'use client'
import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'

interface User {
  id: number
  nombre: string
  correo: string
  role: string
}

export default function DashboardPage() {
  const [user, setUser] = useState<User | null>(null)
  const router = useRouter()

  useEffect(() => {
    const userStr = localStorage.getItem('user')
    if (!userStr) {
      router.push('/login')
      return
    }
    setUser(JSON.parse(userStr))
  }, [router])

  if (!user) return <div className="text-center py-20">Cargando...</div>

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
        <div className="bg-white shadow-lg rounded-lg p-8 mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Bienvenido, {user.nombre}</h1>
          <p className="text-gray-600">Rol: <span className="font-semibold text-primary">{user.role}</span></p>
        </div>

        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {user.role === 'vendedor' && (
            <>
              <a href="/vendedores" className="bg-white p-6 rounded-lg shadow-lg hover:shadow-xl transition-shadow border border-gray-100">
                <div className="text-primary text-4xl mb-4">🏪</div>
                <h3 className="text-xl font-bold text-gray-900">Mis Vendedores</h3>
                <p className="mt-2 text-gray-600">Gestiona tu información de vendedor</p>
              </a>

              <a href="/productos" className="bg-white p-6 rounded-lg shadow-lg hover:shadow-xl transition-shadow border border-gray-100">
                <div className="text-primary text-4xl mb-4">🍽️</div>
                <h3 className="text-xl font-bold text-gray-900">Mis Productos</h3>
                <p className="mt-2 text-gray-600">Administra tu catálogo de productos</p>
              </a>
            </>
          )}

          <a href="/ventas" className="bg-white p-6 rounded-lg shadow-lg hover:shadow-xl transition-shadow border border-gray-100">
            <div className="text-primary text-4xl mb-4">📊</div>
            <h3 className="text-xl font-bold text-gray-900">Ventas</h3>
            <p className="mt-2 text-gray-600">Consulta el historial de ventas</p>
          </a>

          <a href="/productos" className="bg-white p-6 rounded-lg shadow-lg hover:shadow-xl transition-shadow border border-gray-100">
            <div className="text-primary text-4xl mb-4">🛒</div>
            <h3 className="text-xl font-bold text-gray-900">Catálogo</h3>
            <p className="mt-2 text-gray-600">Explora todos los productos disponibles</p>
          </a>
        </div>
      </div>
    </div>
  )
}