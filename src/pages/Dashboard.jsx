import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { useAuth } from '../context/AuthContext'
import enrollmentService from '../services/enrollmentService'

const Dashboard = () => {
  const { user, logout, isAdmin, isTeacher } = useAuth()
  const [enrollments, setEnrollments] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchEnrollments = async () => {
      try {
        const data = await enrollmentService.getMyEnrollments()
        setEnrollments(data.data)
      } catch (error) {
        console.error('Error fetching enrollments:', error)
      } finally {
        setLoading(false)
      }
    }

    if (user) {
      fetchEnrollments()
    }
  }, [user])

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white rounded-2xl shadow-xl p-8 mb-8"
        >
          <div className="flex justify-between items-center">
            <div>
              <h1 className="text-4xl font-bold text-gray-900">
                ¡Bienvenido, {user?.name}! 👋
              </h1>
              <p className="mt-2 text-gray-600">Email: {user?.email}</p>
              <p className="text-gray-600">
                Rol: <span className="font-semibold capitalize">{user?.role}</span>
              </p>
            </div>
            <button
              onClick={logout}
              className="px-6 py-3 text-white rounded-lg hover:opacity-90"
              style={{backgroundColor: '#FDB913', color: '#1E5A7A'}}
            >
              Cerrar Sesión
            </button>
          </div>
        </motion.div>

        {/* Admin/Teacher Actions */}
        {(isAdmin || isTeacher) && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="grid md:grid-cols-2 gap-6 mb-8"
          >
            <Link
              to="/manage-courses"
              className="text-white rounded-2xl shadow-xl p-8 hover:shadow-2xl transition"
              style={{background: 'linear-gradient(to right, #1E5A7A, #163d52)'}}
            >
              <div className="text-4xl mb-4">📚</div>
              <h3 className="text-2xl font-bold mb-2">Gestionar Cursos</h3>
              <p className="opacity-90">Crear, editar y eliminar cursos</p>
            </Link>

            {isAdmin && (
              <Link
                to="/manage-contacts"
                className="bg-linear-to-r from-blue-600 to-cyan-600 text-white rounded-2xl shadow-xl p-8 hover:shadow-2xl transition"
              >
                <div className="text-4xl mb-4">✉️</div>
                <h3 className="text-2xl font-bold mb-2">Ver Mensajes</h3>
                <p className="opacity-90">Gestionar solicitudes de contacto</p>
              </Link>
            )}
          </motion.div>
        )}

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="bg-white rounded-2xl shadow-xl p-8"
        >
          <h2 className="text-2xl font-bold text-gray-900 mb-6">
            Mis Cursos ({enrollments.length})
          </h2>

          {loading ? (
            <div className="text-center py-12">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-600 mx-auto"></div>
            </div>
          ) : enrollments.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-gray-500 text-lg">Aún no estás inscrito en ningún curso</p>
              <Link to="/courses" className="mt-4 inline-block font-semibold hover:opacity-70" style={{color: '#1E5A7A'}}>
                Ver cursos disponibles →
              </Link>
            </div>
          ) : (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {enrollments.map((enrollment) => (
                <div key={enrollment._id} className="border rounded-lg p-6 hover:shadow-lg transition">
                  <h3 className="text-xl font-semibold mb-2">{enrollment.course?.title}</h3>
                  <p className="text-gray-600 mb-4">{enrollment.course?.description}</p>
                  <div className="flex justify-between items-center">
                    <span className={`px-3 py-1 rounded-full text-sm ${
                      enrollment.status === 'active' ? 'bg-green-100 text-green-800' :
                      enrollment.status === 'completed' ? 'bg-blue-100 text-blue-800' :
                      'bg-yellow-100 text-yellow-800'
                    }`}>
                      {enrollment.status}
                    </span>
                    <span className="text-gray-500">{enrollment.progress}%</span>
                  </div>
                </div>
              ))}
            </div>
          )}
        </motion.div>
      </div>
    </div>
  )
}

export default Dashboard