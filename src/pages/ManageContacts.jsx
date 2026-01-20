import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { useAuth } from '../context/AuthContext'
import contactService from '../services/contactService'
import { useNavigate } from 'react-router-dom'

const ManageContacts = () => {
  const { isAdmin } = useAuth()
  const navigate = useNavigate()
  const [contacts, setContacts] = useState([])
  const [loading, setLoading] = useState(true)
  const [filter, setFilter] = useState('all')

  useEffect(() => {
    if (!isAdmin) {
      navigate('/dashboard')
    }
    fetchContacts()
  }, [isAdmin, navigate, filter])

  const fetchContacts = async () => {
    try {
      const statusFilter = filter !== 'all' ? filter : null
      const data = await contactService.getAllContacts(statusFilter)
      setContacts(data.data)
    } catch (error) {
      console.error('Error fetching contacts:', error)
    } finally {
      setLoading(false)
    }
  }

  const updateStatus = async (id, status) => {
    try {
      await contactService.updateContact(id, { status })
      alert('✅ Estado actualizado')
      fetchContacts()
    } catch (error) {
      alert('❌ Error al actualizar')
    }
  }

  const getStatusColor = (status) => {
    switch(status) {
      case 'pending': return 'bg-yellow-100 text-yellow-800'
      case 'in-progress': return 'bg-blue-100 text-blue-800'
      case 'resolved': return 'bg-green-100 text-green-800'
      default: return 'bg-gray-100 text-gray-800'
    }
  }

  const getSubjectLabel = (subject) => {
    const labels = {
      admissions: 'Admisiones',
      courses: 'Cursos',
      financial: 'Financiero',
      other: 'Otro'
    }
    return labels[subject] || subject
  }

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-purple-600"></div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-gray-900">Mensajes de Contacto</h1>
          <p className="text-gray-600 mt-2">Gestiona todas las solicitudes de contacto</p>
        </div>

        {/* Filters */}
        <div className="mb-6 flex gap-4">
          <button
            onClick={() => setFilter('all')}
            className={`px-4 py-2 rounded-lg font-semibold ${
              filter === 'all' ? 'bg-blue-600 text-white' : 'bg-white text-gray-700'
            }`}
          >
            Todos ({contacts.length})
          </button>
          <button
            onClick={() => setFilter('pending')}
            className={`px-4 py-2 rounded-lg font-semibold ${
              filter === 'pending' ? 'bg-yellow-600 text-white' : 'bg-white text-gray-700'
            }`}
          >
            Pendientes
          </button>
          <button
            onClick={() => setFilter('in-progress')}
            className={`px-4 py-2 rounded-lg font-semibold ${
              filter === 'in-progress' ? 'bg-blue-600 text-white' : 'bg-white text-gray-700'
            }`}
          >
            En Progreso
          </button>
          <button
            onClick={() => setFilter('resolved')}
            className={`px-4 py-2 rounded-lg font-semibold ${
              filter === 'resolved' ? 'bg-green-600 text-white' : 'bg-white text-gray-700'
            }`}
          >
            Resueltos
          </button>
        </div>

        {/* Contacts List */}
        <div className="space-y-4">
          {contacts.length === 0 ? (
            <div className="bg-white rounded-2xl shadow-xl p-12 text-center">
              <p className="text-gray-500 text-lg">No hay mensajes</p>
            </div>
          ) : (
            contacts.map((contact) => (
              <motion.div
                key={contact._id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-white rounded-2xl shadow-xl p-6"
              >
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <h3 className="text-xl font-bold text-gray-900">{contact.name}</h3>
                    <p className="text-gray-600">{contact.email} • {contact.phone}</p>
                    <p className="text-sm text-gray-500 mt-1">
                      {new Date(contact.createdAt).toLocaleDateString('es-ES', {
                        year: 'numeric',
                        month: 'long',
                        day: 'numeric',
                        hour: '2-digit',
                        minute: '2-digit'
                      })}
                    </p>
                  </div>
                  <div className="flex gap-2 items-center">
                    <span className={`px-3 py-1 rounded-full text-sm font-semibold ${getStatusColor(contact.status)}`}>
                      {contact.status}
                    </span>
                    <span className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm font-semibold">
                      {getSubjectLabel(contact.subject)}
                    </span>
                  </div>
                </div>

                <div className="mb-4">
                  <p className="text-gray-700 whitespace-pre-wrap">{contact.message}</p>
                </div>

                <div className="flex gap-2">
                  {contact.status !== 'pending' && (
                    <button
                      onClick={() => updateStatus(contact._id, 'pending')}
                      className="px-4 py-2 bg-yellow-100 text-yellow-700 rounded-lg hover:bg-yellow-200 transition text-sm font-semibold"
                    >
                      Marcar como Pendiente
                    </button>
                  )}
                  {contact.status !== 'in-progress' && (
                    <button
                      onClick={() => updateStatus(contact._id, 'in-progress')}
                      className="px-4 py-2 bg-blue-100 text-blue-700 rounded-lg hover:bg-blue-200 transition text-sm font-semibold"
                    >
                      Marcar En Progreso
                    </button>
                  )}
                  {contact.status !== 'resolved' && (
                    <button
                      onClick={() => updateStatus(contact._id, 'resolved')}
                      className="px-4 py-2 bg-green-100 text-green-700 rounded-lg hover:bg-green-200 transition text-sm font-semibold"
                    >
                      Marcar como Resuelto
                    </button>
                  )}
                </div>
              </motion.div>
            ))
          )}
        </div>
      </div>
    </div>
  )
}

export default ManageContacts