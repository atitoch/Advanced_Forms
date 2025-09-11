import { useState } from 'react'

export const useFormLogic = () => {
  const [formData, setFormData] = useState({
    // Tipo de usuario
    userType: '',
    
    // Campos comunes
    nombre: '',
    email: '',
    telefono: '',
    
    // Campos específicos de User
    fecha_nacimiento: '',
    intereses: [],
    nivel_experiencia: '',
    tipo_suscripcion: '',
    metodo_pago: '',
    frecuencia_uso: '',
    idioma_preferido: '',
    
    // Campos específicos de Admin
    departamento: '',
    nivel_acceso: '',
    certificaciones: '',
    experiencia_gestion: '',
    area_especializacion: '',
    tipo_gestion: '',
    herramientas_admin: [],
    horario_trabajo: '',
    
    // Campos adicionales
    comentarios: '',
    notificaciones: false,
    terminos: false
  })

  const [errors, setErrors] = useState({})
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }))
    
    // Limpiar error cuando el usuario empiece a escribir
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }))
    }
  }

  const handleInteresesChange = (interes) => {
    setFormData(prev => ({
      ...prev,
      intereses: prev.intereses.includes(interes)
        ? prev.intereses.filter(i => i !== interes)
        : [...prev.intereses, interes]
    }))
  }

  const handleHerramientasChange = (herramienta) => {
    setFormData(prev => ({
      ...prev,
      herramientas_admin: prev.herramientas_admin.includes(herramienta)
        ? prev.herramientas_admin.filter(h => h !== herramienta)
        : [...prev.herramientas_admin, herramienta]
    }))
  }

  const validateForm = () => {
    const newErrors = {}
    
    // Validaciones comunes
    if (!formData.userType) newErrors.userType = 'Selecciona el tipo de usuario'
    if (!formData.nombre.trim()) newErrors.nombre = 'El nombre es requerido'
    if (!formData.email.trim()) newErrors.email = 'El email es requerido'
    else if (!/\S+@\S+\.\S+/.test(formData.email)) newErrors.email = 'Email inválido'
    if (!formData.telefono.trim()) newErrors.telefono = 'El teléfono es requerido'
    
    // Validaciones específicas de User
    if (formData.userType === 'user') {
      if (!formData.nivel_experiencia) newErrors.nivel_experiencia = 'Selecciona tu nivel de experiencia'
      if (formData.intereses.length === 0) newErrors.intereses = 'Selecciona al menos un interés'
      if (!formData.tipo_suscripcion) newErrors.tipo_suscripcion = 'Selecciona el tipo de suscripción'
      if (formData.tipo_suscripcion === 'premium' && !formData.metodo_pago) {
        newErrors.metodo_pago = 'Selecciona un método de pago para la suscripción premium'
      }
    }
    
    // Validaciones específicas de Admin
    if (formData.userType === 'admin') {
      if (!formData.departamento) newErrors.departamento = 'Selecciona tu departamento'
      if (!formData.nivel_acceso) newErrors.nivel_acceso = 'Selecciona el nivel de acceso'
      if (!formData.experiencia_gestion) newErrors.experiencia_gestion = 'Selecciona tu experiencia en gestión'
      if (!formData.area_especializacion) newErrors.area_especializacion = 'Selecciona tu área de especialización'
      if (formData.area_especializacion === 'tecnologia' && formData.herramientas_admin.length === 0) {
        newErrors.herramientas_admin = 'Selecciona al menos una herramienta tecnológica'
      }
    }
    
    if (!formData.terminos) newErrors.terminos = 'Debes aceptar los términos y condiciones'
    
    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    if (validateForm()) {
      setIsSubmitting(true)
      // Simular envío
      setTimeout(() => {
        setIsSubmitting(false)
        alert(`¡Formulario de ${formData.userType === 'user' ? 'Usuario' : 'Administrador'} enviado exitosamente! (Solo demostración)`)
      }, 2000)
    }
  }

  return {
    formData,
    errors,
    isSubmitting,
    handleInputChange,
    handleInteresesChange,
    handleHerramientasChange,
    handleSubmit
  }
}
