import { createClient } from '@supabase/supabase-js'

// Servicio para manejar las conexiones con Supabase
class ApiService {
  constructor() {
    // Configuración de Supabase - acceso seguro a variables de entorno
    try {
      this.supabaseUrl = import.meta.env?.VITE_SUPABASE_URL
      this.supabaseKey = import.meta.env?.VITE_SUPABASE_ANON_KEY
      this.tableName = import.meta.env?.VITE_SUPABASE_TABLE || 'form_submissions'
      
      if (!this.supabaseUrl || !this.supabaseKey) {
        console.warn('⚠️ Variables de entorno de Supabase no disponibles')
        this.supabase = null
        this.isConfigured = false
        return
      }

      this.supabase = createClient(this.supabaseUrl, this.supabaseKey)
      this.isConfigured = true
    } catch (error) {
      console.error('Error inicializando ApiService:', error)
      this.supabase = null
      this.isConfigured = false
    }
  }

  // Verificar conexión con Supabase
  async checkConnection() {
    if (!this.isConfigured || !this.supabase) {
      throw new Error('Supabase no está configurado')
    }
    
    try {
      const { error } = await this.supabase
        .from(this.tableName)
        .select('count')
        .limit(1)
      
      if (error) throw error
      return true
    } catch (error) {
      console.error('Error conectando con Supabase:', error)
      throw error
    }
  }

  // Método para convertir camelCase a snake_case
  camelToSnake(str) {
    return str.replace(/[A-Z]/g, letter => `_${letter.toLowerCase()}`)
  }

  // Método para limpiar datos antes de enviar a Supabase
  cleanData(obj) {
    const cleaned = {}
    // Campos requeridos que siempre deben estar presentes
    const requiredFields = ['user_type', 'nombre', 'email', 'telefono', 'terminos']
    
    for (const [key, value] of Object.entries(obj)) {
      // Incluir campos requeridos aunque estén vacíos
      if (requiredFields.includes(key)) {
        cleaned[key] = value
      }
      // Para otros campos, solo incluir si no son undefined o null
      else if (value !== undefined && value !== null && value !== '') {
        cleaned[key] = value
      } else if (Array.isArray(value)) {
        cleaned[key] = value // Arrays pueden estar vacíos
      }
    }
    return cleaned
  }

  // Método para enviar datos del formulario a Supabase
  async submitForm(formData) {
    if (!this.isConfigured || !this.supabase) {
      throw new Error('Supabase no está configurado. Verifique las variables de entorno.')
    }
    
    try {
      // Mapear campos de camelCase a snake_case para Supabase
      const supabaseData = {
        user_type: formData.userType,
        nombre: formData.nombre,
        email: formData.email,
        telefono: formData.telefono,
        
        // Campos específicos de User
        fecha_nacimiento: formData.fecha_nacimiento,
        intereses: formData.intereses,
        nivel_experiencia: formData.nivel_experiencia,
        tipo_suscripcion: formData.tipo_suscripcion,
        metodo_pago: formData.metodo_pago,
        frecuencia_uso: formData.frecuencia_uso,
        idioma_preferido: formData.idioma_preferido,
        
        // Campos específicos de Admin
        departamento: formData.departamento,
        nivel_acceso: formData.nivel_acceso,
        certificaciones: formData.certificaciones,
        experiencia_gestion: formData.experiencia_gestion,
        area_especializacion: formData.area_especializacion,
        tipo_gestion: formData.tipo_gestion,
        herramientas_admin: formData.herramientas_admin,
        horario_trabajo: formData.horario_trabajo,
        
        // Campos adicionales
        comentarios: formData.comentarios,
        notificaciones: formData.notificaciones,
        terminos: formData.terminos,
        
        // Metadatos
        timestamp: formData.timestamp,
        user_agent: formData.userAgent,
        created_at: new Date().toISOString(),
        status: 'pending',
        updated_at: new Date().toISOString()
      }

      // Limpiar datos antes de enviar
      const cleanedData = this.cleanData(supabaseData)
      console.log('📤 Datos limpiados para Supabase:', cleanedData)

      const { data, error } = await this.supabase
        .from(this.tableName)
        .insert([cleanedData])
        .select()

      console.log('📥 Respuesta de Supabase - data:', data, 'error:', error)

      if (error) {
        console.error('Error detallado de Supabase:', error)
        throw new Error(`Error de Supabase: ${error.message} - Detalles: ${JSON.stringify(error)}`)
      }

      return {
        success: true,
        message: '¡Formulario enviado exitosamente! Los datos han sido guardados.',
        data: data[0]
      }
    } catch (error) {
      throw new Error(`Error al enviar el formulario a Supabase: ${error.message}`)
    }
  }

  // Método para obtener todos los formularios enviados (opcional)
  async getFormSubmissions() {
    if (!this.isConfigured || !this.supabase) {
      throw new Error('Supabase no está configurado. Verifique las variables de entorno.')
    }
    
    try {
      const { data, error } = await this.supabase
        .from(this.tableName)
        .select('*')
        .order('created_at', { ascending: false })

      if (error) {
        throw new Error(`Error de Supabase: ${error.message}`)
      }

      return {
        success: true,
        data: data
      }
    } catch (error) {
      throw new Error(`Error al obtener formularios: ${error.message}`)
    }
  }

  // Método para obtener formularios por tipo de usuario
  async getFormSubmissionsByType(userType) {
    if (!this.isConfigured || !this.supabase) {
      throw new Error('Supabase no está configurado. Verifique las variables de entorno.')
    }
    
    try {
      const { data, error } = await this.supabase
        .from(this.tableName)
        .select('*')
        .eq('user_type', userType)
        .order('created_at', { ascending: false })

      if (error) {
        throw new Error(`Error de Supabase: ${error.message}`)
      }

      return {
        success: true,
        data: data
      }
    } catch (error) {
      throw new Error(`Error al obtener formularios por tipo: ${error.message}`)
    }
  }

  // Método para validar email único (opcional)
  async validateEmailUnique(email) {
    if (!this.isConfigured || !this.supabase) {
      throw new Error('Supabase no está configurado. Verifique las variables de entorno.')
    }
    
    try {
      const { data, error } = await this.supabase
        .from(this.tableName)
        .select('email')
        .eq('email', email)
        .limit(1)

      if (error) {
        throw new Error(`Error de Supabase: ${error.message}`)
      }

      return {
        success: true,
        isUnique: data.length === 0,
        message: data.length === 0 ? 'Email disponible' : 'Email ya registrado'
      }
    } catch (error) {
      throw new Error(`Error al validar email: ${error.message}`)
    }
  }
}

// Crear una instancia única del servicio
const apiService = new ApiService()

export default apiService
