'use client'
import Link from 'next/link'
import { useState } from 'react'

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  return (
    <nav className="bg-primary shadow-lg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <Link href="/" className="text-white font-bold text-xl">
            CookValles
          </Link>
          
          <div className="hidden md:block">
            <div className="ml-10 flex items-baseline space-x-4">
              <Link href="/" className="text-white hover:bg-primary-dark px-3 py-2 rounded-md">
                Inicio
              </Link>
              <Link href="/vendedores" className="text-white hover:bg-primary-dark px-3 py-2 rounded-md">
                Vendedores
              </Link>
              <Link href="/productos" className="text-white hover:bg-primary-dark px-3 py-2 rounded-md">
                Productos
              </Link>
              <Link href="/login" className="bg-white text-primary hover:bg-gray-100 px-4 py-2 rounded-md">
                Login
              </Link>
            </div>
          </div>
          
          <div className="md:hidden">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="text-white hover:bg-primary-dark p-2 rounded-md"
            >
              <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </button>
          </div>
        </div>
      </div>
      
      {isMenuOpen && (
        <div className="md:hidden">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            <Link href="/" className="text-white hover:bg-primary-dark block px-3 py-2 rounded-md">
              Inicio
            </Link>
            <Link href="/vendedores" className="text-white hover:bg-primary-dark block px-3 py-2 rounded-md">
              Vendedores
            </Link>
            <Link href="/productos" className="text-white hover:bg-primary-dark block px-3 py-2 rounded-md">
              Productos
            </Link>
            <Link href="/login" className="text-white hover:bg-primary-dark block px-3 py-2 rounded-md">
              Login
            </Link>
          </div>
        </div>
      )}
    </nav>
  )
}