import { useState } from 'react'
import apiService from '../services/apiService'

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
  const [submitStatus, setSubmitStatus] = useState(null) // 'success', 'error', null
  const [submitMessage, setSubmitMessage] = useState('')
  const [showSuccessModal, setShowSuccessModal] = useState(false)

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

  const handleSubmit = async (e) => {
    e.preventDefault()
    
    if (!validateForm()) {
      return
    }

    setIsSubmitting(true)
    setSubmitStatus(null)
    setSubmitMessage('')
    
    try {
      // Preparar datos para envío
      const dataToSubmit = {
        ...formData,
        timestamp: new Date().toISOString(),
        userAgent: navigator.userAgent,
      }

      // Enviar datos a la base de datos
      const response = await apiService.submitForm(dataToSubmit)
      
      // Éxito - mostrar modal por 2 segundos
      setSubmitStatus('success')
      const successMessage = response.message || `¡Formulario de ${formData.userType === 'user' ? 'Usuario' : 'Administrador'} enviado exitosamente!`
      setSubmitMessage(successMessage)
      
      // Mostrar modal
      setShowSuccessModal(true)
      
      // Después de 2 segundos: cerrar modal, limpiar formulario y navegar al inicio
      setTimeout(() => {
        setShowSuccessModal(false)
        setSubmitStatus(null)
        setSubmitMessage('')
        resetForm() // Reset completo que incluye limpiar todos los estados
      }, 2000)
      
    } catch (error) {
      // Error
      console.error('❌ Error en envío:', error)
      setSubmitStatus('error')
      setSubmitMessage(error.message || 'Error al enviar el formulario. Por favor, inténtalo de nuevo.')
      
      // Agregar error general al objeto de errores
      setErrors(prev => ({
        ...prev,
        general: error.message || 'Error al enviar el formulario'
      }))
      
      // TEMPORAL: Mostrar modal de éxito incluso con error para testing
      // TODO: Remover esto una vez que funcione Supabase
      console.log('🧪 MODO TEST - Mostrando modal de éxito de todas formas')
      setTimeout(() => {
        setSubmitStatus('success')
        setSubmitMessage('🧪 TEST: Modal funcionando correctamente')
        setShowSuccessModal(true)
      }, 1000)
    } finally {
      setIsSubmitting(false)
    }
  }

  // Función para limpiar solo los datos del formulario (sin mensajes)
  const resetFormData = () => {
    setFormData({
      userType: '',
      nombre: '',
      email: '',
      telefono: '',
      fecha_nacimiento: '',
      intereses: [],
      nivel_experiencia: '',
      tipo_suscripcion: '',
      metodo_pago: '',
      frecuencia_uso: '',
      idioma_preferido: '',
      departamento: '',
      nivel_acceso: '',
      certificaciones: '',
      experiencia_gestion: '',
      area_especializacion: '',
      tipo_gestion: '',
      herramientas_admin: [],
      horario_trabajo: '',
      comentarios: '',
      notificaciones: false,
      terminos: false
    })
    setErrors({})
  }

  // Función para limpiar completamente el formulario (incluyendo mensajes)
  const resetForm = () => {
    resetFormData()
    setSubmitStatus(null)
    setSubmitMessage('')
    setShowSuccessModal(false)
  }

  // Funciones para manejar el modal de éxito
  const closeSuccessModal = () => {
    setShowSuccessModal(false)
    setSubmitStatus(null)
    setSubmitMessage('')
  }

  const handleNewForm = () => {
    closeSuccessModal()
    resetFormData()
  }

  // Función de prueba para mostrar el modal
  const testModal = () => {
    console.log('🧪 Probando modal...')
    setSubmitStatus('success')
    setSubmitMessage('Mensaje de prueba - Modal funcionando')
    setShowSuccessModal(true)
    console.log('🧪 Modal debe mostrarse ahora')
  }

  return {
    formData,
    errors,
    isSubmitting,
    submitStatus,
    submitMessage,
    showSuccessModal,
    handleInputChange,
    handleInteresesChange,
    handleHerramientasChange,
    handleSubmit,
    resetForm,
    resetFormData,
    closeSuccessModal,
    handleNewForm,
    testModal
  }
}
