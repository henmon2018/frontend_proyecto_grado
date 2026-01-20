import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import { BookOpen, Users, Award, Calendar, TrendingUp, Shield } from 'lucide-react'
import { useEffect, useState } from 'react'

const Home = () => {
  const [ref1, inView1] = useInView({ triggerOnce: true, threshold: 0.1 })
  const [ref2, inView2] = useInView({ triggerOnce: true, threshold: 0.1 })
  const [ref3, inView3] = useInView({ triggerOnce: true, threshold: 0.1 })
  const [stats, setStats] = useState({ students: 0, teachers: 0, courses: 0 })

  useEffect(() => {
    // Simular carga de estadísticas del backend
    const interval = setInterval(() => {
      setStats(prev => ({
        students: prev.students < 1200 ? prev.students + 20 : 1200,
        teachers: prev.teachers < 85 ? prev.teachers + 1 : 85,
        courses: prev.courses < 45 ? prev.courses + 1 : 45
      }))
    }, 30)
    return () => clearInterval(interval)
  }, [])

  const features = [
    {
      icon: BookOpen,
      title: 'Educación Personalizada',
      description: 'Programas adaptados a cada estudiante',
      color: 'from-blue-500 to-cyan-500'
    },
    {
      icon: Users,
      title: 'Comunidad Activa',
      description: 'Red de estudiantes y profesores conectados',
      color: 'from-purple-500 to-pink-500'
    },
    {
      icon: Award,
      title: 'Certificaciones',
      description: 'Títulos reconocidos internacionalmente',
      color: 'from-orange-500 to-red-500'
    },
    {
      icon: Calendar,
      title: 'Flexibilidad Horaria',
      description: 'Estudia a tu propio ritmo',
      color: 'from-green-500 to-emerald-500'
    },
    {
      icon: TrendingUp,
      title: 'Crecimiento Continuo',
      description: 'Desarrollo académico y personal',
      color: 'from-indigo-500 to-blue-500'
    },
    {
      icon: Shield,
      title: 'Ambiente Seguro',
      description: 'Instalaciones modernas y protegidas',
      color: 'from-yellow-500 to-orange-500'
    }
  ]

  return (
    <div className="pt-16">
      {/* Hero Section con Parallax */}
      <section className="relative h-screen flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0" style={{background: 'linear-gradient(to bottom right, var(--color-primary), var(--color-primary-dark), var(--color-primary-darker))'}}>
          <div className="absolute inset-0 bg-black/10"></div>
        </div>
        
        {/* Círculos animados de fondo */}
        <div className="absolute inset-0 overflow-hidden">
          <motion.div
            animate={{
              scale: [1, 1.2, 1],
              rotate: [0, 180, 360],
            }}
            transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
            className="absolute -top-20 -left-20 w-96 h-96 rounded-full blur-3xl"
            style={{backgroundColor: 'rgba(253, 185, 19, 0.3)'}}
          />
          <motion.div
            animate={{
              scale: [1.2, 1, 1.2],
              rotate: [360, 180, 0],
            }}
            transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
            className="absolute -bottom-20 -right-20 w-96 h-96 rounded-full blur-3xl"
            style={{backgroundColor: 'rgba(253, 185, 19, 0.2)'}}
          />
        </div>

        <div className="container mx-auto px-4 text-center relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h1 className="text-6xl md:text-7xl font-bold text-white mb-6 leading-tight drop-shadow-lg">
              Educación para el
              <span className="block bg-clip-text text-transparent" style={{backgroundImage: 'linear-gradient(to right, #FDB913, #FFC933)'}}>
                Futuro Digital
              </span>
            </h1>
            <p className="text-xl md:text-2xl text-white/90 mb-8 max-w-3xl mx-auto">
              Transformamos vidas a través de la educación de excelencia con tecnología de vanguardia
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="text-white px-8 py-4 rounded-full font-bold text-lg transition shadow-2xl"
                style={{backgroundColor: '#FDB913'}}
                onMouseEnter={(e) => e.target.style.backgroundColor = '#FCA311'}
                onMouseLeave={(e) => e.target.style.backgroundColor = '#FDB913'}
              >
                Comenzar Ahora
              </motion.button>
              <motion.a
                href="https://www.facebook.com/share/v/17ZsNEbeuD/"
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="bg-white/20 backdrop-blur-md text-white px-8 py-4 rounded-full font-bold text-lg hover:bg-white/30 transition border-2 border-white/50 inline-block"
              >
                Ver Video
              </motion.a>
            </div>
          </motion.div>
        </div>

        {/* Scroll indicator */}
        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
          className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
        >
          <div className="w-6 h-10 border-2 border-white/50 rounded-full flex justify-center">
            <div className="w-1 h-3 bg-white rounded-full mt-2"></div>
          </div>
        </motion.div>
      </section>

      {/* Stats Section */}
      <section className="py-20 bg-linear-to-r from-gray-900 to-gray-800 text-white">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-3 gap-8 text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
            >
              <div className="text-6xl font-bold bg-linear-to-r from-yellow-400 to-orange-400 bg-clip-text text-transparent">
                {stats.students}+
              </div>
              <div className="text-xl text-gray-300 mt-2">Estudiantes Activos</div>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
            >
              <div className="text-6xl font-bold bg-linear-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent">
                {stats.teachers}+
              </div>
              <div className="text-xl text-gray-300 mt-2">Profesores Expertos</div>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
            >
              <div className="text-6xl font-bold bg-linear-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
                {stats.courses}+
              </div>
              <div className="text-xl text-gray-300 mt-2">Cursos Disponibles</div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Features Grid */}
      <section ref={ref1} className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={inView1 ? { opacity: 1, y: 0 } : {}}
            className="text-center mb-16"
          >
            <h2 className="text-5xl font-bold mb-4 bg-linear-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              ¿Por qué elegirnos?
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Ofrecemos una experiencia educativa única que combina tradición e innovación
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                animate={inView1 ? { opacity: 1, y: 0 } : {}}
                transition={{ delay: index * 0.1 }}
                whileHover={{ y: -10, transition: { duration: 0.3 } }}
                className="bg-white p-8 rounded-2xl shadow-lg hover:shadow-2xl transition-all group"
              >
                <div className={`w-16 h-16 bg-linear-to-r ${feature.color} rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform`}>
                  <feature.icon className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-2xl font-bold mb-3 text-gray-800">{feature.title}</h3>
                <p className="text-gray-600 leading-relaxed">{feature.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section ref={ref2} className="py-20 bg-linear-to-r from-blue-600 to-purple-600 text-white relative overflow-hidden">
        <div className="absolute inset-0 bg-black/10"></div>
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={inView2 ? { opacity: 1, scale: 1 } : {}}
          className="container mx-auto px-4 text-center relative z-10"
        >
          <h2 className="text-5xl font-bold mb-6">¿Listo para comenzar?</h2>
          <p className="text-xl mb-8 max-w-2xl mx-auto">
            Únete a nuestra comunidad educativa y transforma tu futuro hoy mismo
          </p>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="bg-yellow-400 text-gray-800 px-12 py-4 rounded-full font-bold text-lg hover:bg-yellow-300 transition shadow-2xl"
          >
            Inscríbete Ahora
          </motion.button>
        </motion.div>
      </section>
    </div>
  )
}

export default Home