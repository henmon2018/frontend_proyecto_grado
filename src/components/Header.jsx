import { useState } from 'react'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { useAuth } from '../context/AuthContext'

const Header = () => {
  const [isOpen, setIsOpen] = useState(false)
  const { user, logout, isAuthenticated } = useAuth()

  return (
    <>
      <nav className="bg-white shadow-2xl sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
          <div className="flex items-center gap-3">
            <Link to="/" className="flex items-center gap-3">
              <img 
                src="https://scontent.fgye1-1.fna.fbcdn.net/v/t39.30808-6/343421420_198382112973960_4132014736359434467_n.jpg?_nc_cat=107&ccb=1-7&_nc_sid=6ee11a&_nc_ohc=lhzJFRyncdEQ7kNvwFwQRJU&_nc_oc=AdlHkPOfETozOCpq_6cExq0QC-1FWHvqmkoLXVhj894IGVb7MKcFG7R_CTZHNcKc6qjTraEEtIMQEZ7ITT-krYy4&_nc_zt=23&_nc_ht=scontent.fgye1-1.fna&_nc_gid=AoTieVxCgXiGnhw-QHSbgQ&oh=00_Afok2lvY7BdwNOKPx2gAjCPB7XP0bPXmbEziY0EHSSJKdg&oe=6974D30D"
                alt="Logo Colegio Premium" 
                className="h-14 w-auto"
              />
              <span className="text-xl font-bold hidden sm:inline" style={{color: '#1E5A7A', fontWeight: 'bold'}}>
                UEPMRMP
              </span>
            </Link>
          </div>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center space-x-8">
            <Link to="/" className="text-gray-700 hover:text-blue-600 transition font-medium">
              Inicio
            </Link>
            <Link to="/about" className="text-gray-700 hover:text-blue-600 transition font-medium">
              Nosotros
            </Link>
            <Link to="/courses" className="text-gray-700 hover:text-blue-600 transition font-medium">
              Cursos
            </Link>
            <Link to="/contact" className="text-gray-700 hover:text-blue-600 transition font-medium">
              Contacto
            </Link>

            {isAuthenticated ? (
              <>
                <Link to="/dashboard" className="text-gray-700 hover:text-blue-600 transition font-medium">
                  Dashboard
                </Link>
                <div className="flex items-center space-x-4">
                  <span className="text-sm text-gray-600">
                    Hola, {user?.name}
                  </span>
                  <button
                    onClick={logout}
                    className="bg-blue-600 text-white px-4 py-2 rounded-full hover:bg-blue-700 transition font-medium"
                  >
                    Cerrar Sesión
                  </button>
                </div>
              </>
            ) : (
              <>
                <Link
                  to="/login"
                  className="text-gray-700 hover:text-blue-600 transition font-medium"
                >
                  Iniciar Sesión
                </Link>
                <Link
                  to="/register"
                  className="bg-blue-600 text-white px-6 py-2 rounded-full hover:bg-blue-700 transition font-medium shadow-lg"
                >
                  Registrarse
                </Link>
              </>
            )}
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden flex items-center">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="text-gray-700 hover:text-blue-600 focus:outline-none"
            >
              <svg
                className="h-6 w-6"
                fill="none"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                {isOpen ? (
                  <path d="M6 18L18 6M6 6l12 12" />
                ) : (
                  <path d="M4 6h16M4 12h16M4 18h16" />
                )}
              </svg>
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="md:hidden bg-white border-t-4 border-yellow-400"
        >
          <div className="px-2 pt-2 pb-3 space-y-1">
            <Link
              to="/"
              className="block px-3 py-2 text-gray-700 hover:bg-blue-50 rounded-md font-medium"
              onClick={() => setIsOpen(false)}
            >
              Inicio
            </Link>
            <Link
              to="/about"
              className="block px-3 py-2 text-gray-700 hover:bg-blue-50 rounded-md font-medium"
              onClick={() => setIsOpen(false)}
            >
              Nosotros
            </Link>
            <Link
              to="/courses"
              className="block px-3 py-2 text-gray-700 hover:bg-blue-50 rounded-md font-medium"
              onClick={() => setIsOpen(false)}
            >
              Cursos
            </Link>
            <Link
              to="/contact"
              className="block px-3 py-2 text-gray-700 hover:bg-blue-50 rounded-md font-medium"
              onClick={() => setIsOpen(false)}
            >
              Contacto
            </Link>

            {isAuthenticated ? (
              <>
                <Link
                  to="/dashboard"
                  className="block px-3 py-2 text-gray-700 hover:bg-blue-50 rounded-md font-medium"
                  onClick={() => setIsOpen(false)}
                >
                  Dashboard
                </Link>
                <div className="px-3 py-2">
                  <span className="text-sm text-gray-600">Hola, {user?.name}</span>
                </div>
                <button
                  onClick={() => {
                    logout()
                    setIsOpen(false)
                  }}
                  className="block w-full text-left px-3 py-2 text-blue-600 hover:bg-blue-50 rounded-md font-medium"
                >
                  Cerrar Sesión
                </button>
              </>
            ) : (
              <>
                <Link
                  to="/login"
                  className="block px-3 py-2 text-gray-700 hover:bg-blue-50 rounded-md font-medium"
                  onClick={() => setIsOpen(false)}
                >
                  Iniciar Sesión
                </Link>
                <Link
                  to="/register"
                  className="block px-3 py-2 bg-blue-600 text-white hover:bg-blue-700 rounded-md text-center font-medium"
                  onClick={() => setIsOpen(false)}
                >
                  Registrarse
                </Link>
              </>
            )}
          </div>
        </motion.div>
      )}
    </nav>
      
      {/* Logo Banner */}
      <div className="flex justify-center items-center py-3" style={{backgroundColor: '#FDB913'}}>
        <img 
          src="https://scontent.fgye1-1.fna.fbcdn.net/v/t39.30808-6/343421420_198382112973960_4132014736359434467_n.jpg?_nc_cat=107&ccb=1-7&_nc_sid=6ee11a&_nc_ohc=lhzJFRyncdEQ7kNvwFwQRJU&_nc_oc=AdlHkPOfETozOCpq_6cExq0QC-1FWHvqmkoLXVhj894IGVb7MKcFG7R_CTZHNcKc6qjTraEEtIMQEZ7ITT-krYy4&_nc_zt=23&_nc_ht=scontent.fgye1-1.fna&_nc_gid=AoTieVxCgXiGnhw-QHSbgQ&oh=00_Afok2lvY7BdwNOKPx2gAjCPB7XP0bPXmbEziY0EHSSJKdg&oe=6974D30D"
          alt="Logo Colegio Premium" 
          className="h-12 w-auto"
        />
      </div>
    </>
  )
}

export default Header