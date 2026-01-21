import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import { Target, Eye, Heart, Users, Award, Zap } from 'lucide-react'

const About = () => {
  const [ref1, inView1] = useInView({ triggerOnce: true, threshold: 0.1 })
  const [ref2, inView2] = useInView({ triggerOnce: true, threshold: 0.1 })
  const [ref3, inView3] = useInView({ triggerOnce: true, threshold: 0.1 })

  const values = [
    {
      icon: Heart,
      title: 'Pasión por Educar',
      description: 'Cada día trabajamos con dedicación para formar mejores personas',
      color: 'from-red-500 to-pink-500'
    },
    {
      icon: Target,
      title: 'Excelencia',
      description: 'Buscamos la máxima calidad en todos nuestros procesos educativos',
      color: 'from-blue-500 to-cyan-500'
    },
    {
      icon: Users,
      title: 'Trabajo en Equipo',
      description: 'Creemos en la colaboración y el apoyo mutuo',
      color: 'from-purple-500 to-pink-500'
    },
    {
      icon: Zap,
      title: 'Innovación',
      description: 'Adoptamos nuevas tecnologías y metodologías de enseñanza',
      color: 'from-yellow-500 to-orange-500'
    }
  ]

  const timeline = [
    { year: '1990', title: 'Fundación', description: 'Inicio de nuestro colegio con 50 estudiantes' },
    { year: '2000', title: 'Expansión', description: 'Ampliación de instalaciones y nuevos programas' },
    { year: '2010', title: 'Acreditación', description: 'Reconocimiento internacional de calidad' },
    { year: '2020', title: 'Era Digital', description: 'Transformación digital completa' },
    { year: '2024', title: 'Liderazgo', description: 'Referente en educación de excelencia' }
  ]

  const team = [
    { name: 'Dr. Juan Pérez', role: 'Director General', image: 'https://randomuser.me/api/portraits/men/1.jpg' },
    { name: 'Dra. María García', role: 'Directora Académica', image: 'https://randomuser.me/api/portraits/women/2.jpg' },
    { name: 'Lic. Carlos López', role: 'Coordinador de Tecnología', image: 'https://randomuser.me/api/portraits/men/3.jpg' },
    { name: 'Dra. Ana Martínez', role: 'Coordinadora de Bienestar', image: 'https://randomuser.me/api/portraits/women/4.jpg' }
  ]

  return (
    <div className="pt-16">
      {/* Hero Section */}
      <section className="relative py-32 overflow-hidden" style={{background: 'linear-gradient(to right, #1E5A7A, #163d52)'}}>
        <div className="absolute inset-0 bg-black/20"></div>
        <div className="container mx-auto px-4 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center text-white max-w-4xl mx-auto"
          >
            <h1 className="text-6xl font-bold mb-6">Nuestra Historia</h1>
            <p className="text-2xl leading-relaxed">
              Más de 43 años transformando vidas a través de la educación de calidad
            </p>
          </motion.div>
        </div>
      </section>

      {/* Mission & Vision */}
      <section ref={ref1} className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-12">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={inView1 ? { opacity: 1, x: 0 } : {}}
              className="bg-linear-to-br from-blue-50 to-purple-50 p-12 rounded-3xl"
            >
            <div className="w-16 h-16 bg-linear-to-r from-blue-500 to-blue-600 rounded-2xl flex items-center justify-center mb-6">
                <Target className="w-8 h-8 text-white" />
              </div>
              <h2 className="text-4xl font-bold mb-6 text-gray-800">MISIÓN</h2>
              <p className="text-lg text-gray-700 leading-relaxed">
                Somos una Institución que brinda una educación dirigida a la niñez y a la adolescencia con valores éticos, cristianos y científicos para formar ciudadanos con espíritu misionero, pensamiento crítico reflexivo e investigativo, guiados e inspirados en la pedagogía de Jesús; apoyados en una preparación académica integral, de calidad y calidez, que está en constante actualización formando líderes que contribuyan al conocimiento, al amor a la naturaleza y que transforme su realidad socio cultural
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 30 }}
              animate={inView1 ? { opacity: 1, x: 0 } : {}}
              transition={{ delay: 0.2 }}
              className="bg-linear-to-br from-purple-50 to-pink-50 p-12 rounded-3xl"
            >
              <div className="w-16 h-16 bg-linear-to-r from-purple-500 to-pink-500 rounded-2xl flex items-center justify-center mb-6">
                <Eye className="w-8 h-8 text-white" />
              </div>
              <h2 className="text-4xl font-bold mb-6 text-gray-800">VISIÓN</h2>
              <p className="text-lg text-gray-700 leading-relaxed">
                La Institución Particular "Monseñor Roberto María Del Pozo" se proyecta a ser una institución facilitadora de los aprendizajes significativos, formando estudiantes para una sociedad justa, solidaria, inclusiva, defensora de los derechos humanos y la naturaleza, fundamentada en nuestro modelo pedagógico crítico constructivista con tendencia holística y ecológica, basados en los postulados de la religión católica
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Values */}
      <section ref={ref2} className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={inView2 ? { opacity: 1, y: 0 } : {}}
            className="text-center mb-16"
          >
            <h2 className="text-5xl font-bold mb-4 bg-linear-to-r from-blue-600 to-blue-700 bg-clip-text text-transparent">
              Nuestros Valores
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Los principios que guían cada decisión y acción en nuestra institución
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {values.map((value, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                animate={inView2 ? { opacity: 1, y: 0 } : {}}
                transition={{ delay: index * 0.1 }}
                whileHover={{ y: -10 }}
                className="bg-white p-8 rounded-2xl shadow-lg hover:shadow-2xl transition-all text-center group"
              >
                <div className={`w-20 h-20 bg-linear-to-r ${value.color} rounded-2xl flex items-center justify-center mb-6 mx-auto group-hover:scale-110 transition-transform`}>
                  <value.icon className="w-10 h-10 text-white" />
                </div>
                <h3 className="text-2xl font-bold mb-4 text-gray-800">{value.title}</h3>
                <p className="text-gray-600">{value.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Timeline */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            className="text-center mb-16"
          >
            <h2 className="text-5xl font-bold mb-4 bg-linear-to-r from-blue-600 to-blue-700 bg-clip-text text-transparent">
              Nuestra Trayectoria
            </h2>
          </motion.div>

          <div className="max-w-4xl mx-auto">
            {timeline.map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: index % 2 === 0 ? -30 : 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.1 }}
                className="flex items-center mb-12 relative"
              >
                <div className={`flex-1 ${index % 2 === 0 ? 'text-right pr-8' : 'text-left pl-8 order-2'}`}>
                  <div className="bg-linear-to-br from-blue-50 to-purple-50 p-6 rounded-2xl inline-block">
                    <h3 className="text-3xl font-bold text-blue-600 mb-2">{item.year}</h3>
                    <h4 className="text-xl font-bold text-gray-800 mb-2">{item.title}</h4>
                    <p className="text-gray-600">{item.description}</p>
                  </div>
                </div>
                <div className="w-4 h-4 bg-linear-to-r from-blue-500 to-purple-500 rounded-full z-10"></div>
                <div className={`flex-1 ${index % 2 === 0 ? 'order-2' : ''}`}></div>
                {index < timeline.length - 1 && (
                  <div className="absolute left-1/2 top-8 w-0.5 h-full bg-linear-to-b from-blue-200 to-purple-200 -z-10"></div>
                )}
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Team */}
      <section ref={ref3} className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={inView3 ? { opacity: 1, y: 0 } : {}}
            className="text-center mb-16"
          >
            <h2 className="text-5xl font-bold mb-4 bg-linear-to-r from-blue-600 to-blue-700 bg-clip-text text-transparent">
              Nuestro Equipo
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Profesionales comprometidos con la excelencia educativa
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {team.map((member, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={inView3 ? { opacity: 1, scale: 1 } : {}}
                transition={{ delay: index * 0.1 }}
                whileHover={{ y: -10 }}
                className="bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all group"
              >
                <div className="relative overflow-hidden">
                  <img
                    src={member.image}
                    alt={member.name}
                    className="w-full h-64 object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-linear-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
                </div>
                <div className="p-6 text-center">
                  <h3 className="text-xl font-bold text-gray-800 mb-2">{member.name}</h3>
                  <p className="text-gray-600">{member.role}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </div>
  )
}

export default About