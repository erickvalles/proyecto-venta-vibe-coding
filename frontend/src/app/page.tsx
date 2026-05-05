import Navbar from '@/components/Navbar'

export default function Home() {
  return (
    <div className="min-h-screen bg-white">
      <Navbar />
      
      <main>
        <div className="relative bg-primary">
          <div className="max-w-7xl mx-auto py-24 px-4 sm:py-32 sm:px-6 lg:px-8">
            <h1 className="text-4xl font-extrabold tracking-tight text-white sm:text-5xl lg:text-6xl">
              CookValles
            </h1>
            <p className="mt-6 text-xl text-white max-w-3xl">
              Descubre los mejores lugares de venta de comida en tu zona. 
              Catálogo completo de vendedores y productos locales.
            </p>
            <div className="mt-10">
              <a
                href="/vendedores"
                className="inline-block bg-white text-primary font-bold py-3 px-8 rounded-lg hover:bg-gray-100 transition-colors"
              >
                Ver Vendedores
              </a>
            </div>
          </div>
        </div>

        <div className="max-w-7xl mx-auto py-16 px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h2 className="text-3xl font-extrabold text-gray-900 sm:text-4xl">
              ¿Qué ofrecemos?
            </h2>
            <p className="mt-4 text-lg text-gray-600">
              Encuentra todo lo que necesitas en un solo lugar
            </p>
          </div>

          <div className="mt-16 grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
            <div className="bg-white p-6 rounded-lg shadow-lg border border-gray-100">
              <div className="text-primary text-4xl mb-4">🍽️</div>
              <h3 className="text-xl font-bold text-gray-900">Vendedores</h3>
              <p className="mt-2 text-gray-600">
                Catálogo de todos los vendedores locales con su información de contacto y ubicación.
              </p>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-lg border border-gray-100">
              <div className="text-primary text-4xl mb-4">🍕</div>
              <h3 className="text-xl font-bold text-gray-900">Productos</h3>
              <p className="mt-2 text-gray-600">
                Amplia variedad de productos alimenticios con precios y disponibilidad actualizada.
              </p>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-lg border border-gray-100">
              <div className="text-primary text-4xl mb-4">📍</div>
              <h3 className="text-xl font-bold text-gray-900">Ubicaciones</h3>
              <p className="mt-2 text-gray-600">
                Encuentra vendedores por zona y descubre nuevos lugares cerca de ti.
              </p>
            </div>
          </div>
        </div>
      </main>

      <footer className="bg-primary mt-16">
        <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
          <p className="text-center text-white">
            © 2026 CookValles. Todos los derechos reservados.
          </p>
        </div>
      </footer>
    </div>
  )
}