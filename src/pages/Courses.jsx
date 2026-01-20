import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import courseService from '../services/courseService'
import { useAuth } from '../context/AuthContext'
import enrollmentService from '../services/enrollmentService'

const Courses = () => {
  const { isAuthenticated } = useAuth()
  const [courses, setCourses] = useState([])
  const [loading, setLoading] = useState(true)
  const [selectedCategory, setSelectedCategory] = useState('all')
  const [searchTerm, setSearchTerm] = useState('')

  const categories = [
    { id: 'all', name: 'Todos', icon: '📚' },
    { id: 'tech', name: 'Tecnología', icon: '💻' },
    { id: 'art', name: 'Arte', icon: '🎨' },
    { id: 'science', name: 'Ciencias', icon: '🔬' },
    { id: 'languages', name: 'Idiomas', icon: '🌍' },
    { id: 'business', name: 'Negocios', icon: '💼' }
  ]

  useEffect(() => {
    fetchCourses()
  }, [selectedCategory, searchTerm])

  const fetchCourses = async () => {
    try {
      setLoading(true)
      const filters = {}
      if (selectedCategory !== 'all') filters.category = selectedCategory
      if (searchTerm) filters.search = searchTerm

      const data = await courseService.getAllCourses(filters)
      setCourses(data.data)
    } catch (error) {
      console.error('Error fetching courses:', error)
    } finally {
      setLoading(false)
    }
  }

  const handleEnroll = async (courseId) => {
    if (!isAuthenticated) {
      alert('Debes iniciar sesión para inscribirte')
      window.location.href = '/login'
      return
    }

    try {
      await enrollmentService.enrollInCourse(courseId)
      alert('¡Inscripción exitosa!')
    } catch (error) {
      alert(error.response?.data?.message || 'Error al inscribirse')
    }
  }

  return (
    <div className="min-h-screen bg-linear-to-b from-purple-50 to-white">
      {/* Hero Section */}
      <section className="bg-linear-to-r from-blue-600 to-blue-700 text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center"
          >
            <h1 className="text-5xl md:text-6xl font-bold mb-6">
              Nuestros Cursos
            </h1>
            <p className="text-xl md:text-2xl mb-8">
              Descubre programas diseñados para tu éxito
            </p>
          </motion.div>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Search Bar */}
        <div className="mb-8">
          <input
            type="text"
            placeholder="🔍 Buscar cursos..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full px-6 py-4 rounded-full border-2 border-purple-200 focus:border-purple-600 focus:outline-none text-lg"
          />
        </div>

        {/* Categories */}
        <div className="flex flex-wrap gap-4 mb-12">
          {categories.map((category) => (
            <button
              key={category.id}
              onClick={() => setSelectedCategory(category.id)}
              className={`px-6 py-3 rounded-full font-semibold transition ${
                selectedCategory === category.id
                  ? 'bg-blue-600 text-white'
                  : 'bg-white text-gray-700 hover:bg-blue-100'
              }`}
            >
              {category.icon} {category.name}
            </button>
          ))}
        </div>

        {/* Courses Grid */}
        {loading ? (
          <div className="text-center py-20">
            <div className="animate-spin rounded-full h-16 w-16 border-b-4 border-blue-600 mx-auto"></div>
            <p className="mt-4 text-gray-600">Cargando cursos...</p>
          </div>
        ) : courses.length === 0 ? (
          <div className="text-center py-20">
            <p className="text-2xl text-gray-600">No se encontraron cursos</p>
          </div>
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {courses.map((course, index) => (
              <motion.div
                key={course._id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="bg-white rounded-2xl shadow-xl overflow-hidden hover:shadow-2xl transition"
              >
                <img
                  src={course.image}
                  alt={course.title}
                  className="w-full h-48 object-cover"
                />
                <div className="p-6">
                  <div className="flex justify-between items-start mb-4">
                    <span className="px-3 py-1 bg-blue-100 text-blue-600 rounded-full text-sm font-semibold">
                      {course.level}
                    </span>
                    <span className="text-2xl font-bold text-blue-600">
                      ${course.price}
                    </span>
                  </div>
                  <h3 className="text-2xl font-bold mb-2">{course.title}</h3>
                  <p className="text-gray-600 mb-4">{course.description}</p>
                  <div className="flex items-center justify-between mb-4">
                    <span className="text-sm text-gray-500">
                      ⏱️ {course.duration}
                    </span>
                    <span className="text-sm text-gray-500">
                      👥 {course.studentsCount} estudiantes
                    </span>
                  </div>
                  <div className="flex items-center mb-4">
                    <span className="text-yellow-500">⭐</span>
                    <span className="ml-1 font-semibold">{course.rating}</span>
                  </div>
                  <button
                    onClick={() => handleEnroll(course._id)}
                    className="w-full bg-blue-600 text-white py-3 rounded-full font-semibold hover:bg-blue-700 transition"
                  >
                    Inscribirse Ahora
                  </button>
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}

export default Courses