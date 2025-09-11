import React from 'react'

const UserFields = ({ formData, handleInputChange, handleInteresesChange, errors }) => {
  if (formData.userType !== 'user') return null

  const interesesOptions = [
    { value: 'tecnologia', label: 'Tecnología', icon: '💻' },
    { value: 'diseño', label: 'Diseño', icon: '🎨' },
    { value: 'marketing', label: 'Marketing', icon: '📈' },
    { value: 'desarrollo', label: 'Desarrollo', icon: '⚡' },
    { value: 'datos', label: 'Datos', icon: '📊' },
    { value: 'ia', label: 'IA', icon: '🤖' }
  ]

  return (
    <div className="space-y-6 border-t border-gray-600 pt-6">
      <h3 className="text-xl font-semibold text-blue-300 border-b border-blue-400/30 pb-2">
        👤 Configuración de Usuario
      </h3>
      
      <div>
        <label className="block text-sm font-medium text-gray-300 mb-2">
          Fecha de nacimiento
        </label>
        <input
          type="date"
          name="fecha_nacimiento"
          value={formData.fecha_nacimiento}
          onChange={handleInputChange}
          className="w-full px-4 py-3 bg-white/10 border border-gray-600 backdrop-blur-sm rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 transition-all duration-300 text-white hover:border-gray-500"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-300 mb-3">
          Intereses *
        </label>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
          {interesesOptions.map((interes) => (
            <label key={interes.value} className={`flex items-center p-3 border backdrop-blur-sm rounded-lg cursor-pointer transition-all duration-300 ${
              formData.intereses.includes(interes.value)
                ? 'border-blue-400 bg-blue-500/20' 
                : 'border-gray-600 bg-white/5 hover:border-gray-500'
            }`}>
              <input
                type="checkbox"
                checked={formData.intereses.includes(interes.value)}
                onChange={() => handleInteresesChange(interes.value)}
                className="sr-only"
              />
              <span className="text-xl mr-2">{interes.icon}</span>
              <span className={`text-sm font-medium ${
                formData.intereses.includes(interes.value) ? 'text-blue-300' : 'text-gray-300'
              }`}>
                {interes.label}
              </span>
            </label>
          ))}
        </div>
        {errors.intereses && (
          <p className="text-red-400 text-sm mt-2">{errors.intereses}</p>
        )}
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-300 mb-2">
          Nivel de experiencia *
        </label>
        <select
          name="nivel_experiencia"
          value={formData.nivel_experiencia}
          onChange={handleInputChange}
          className={`w-full px-4 py-3 bg-white/10 border backdrop-blur-sm rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 transition-all duration-300 text-white hover:border-gray-500 ${
            errors.nivel_experiencia ? 'border-red-400 focus:ring-red-400' : 'border-gray-600'
          }`}
        >
          <option value="" className="bg-gray-800 text-gray-300">Selecciona tu nivel</option>
          <option value="principiante" className="bg-gray-800 text-white">Principiante (0-1 años)</option>
          <option value="intermedio" className="bg-gray-800 text-white">Intermedio (2-5 años)</option>
          <option value="avanzado" className="bg-gray-800 text-white">Avanzado (5+ años)</option>
          <option value="experto" className="bg-gray-800 text-white">Experto (10+ años)</option>
        </select>
        {errors.nivel_experiencia && (
          <p className="text-red-400 text-sm mt-2">{errors.nivel_experiencia}</p>
        )}
      </div>

      {/* Tipo de Suscripción */}
      <div>
        <label className="block text-sm font-medium text-gray-300 mb-2">
          Tipo de Suscripción *
        </label>
        <select
          name="tipo_suscripcion"
          value={formData.tipo_suscripcion}
          onChange={handleInputChange}
          className={`w-full px-4 py-3 bg-white/10 border backdrop-blur-sm rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 transition-all duration-300 text-white hover:border-gray-500 ${
            errors.tipo_suscripcion ? 'border-red-400 focus:ring-red-400' : 'border-gray-600'
          }`}
        >
          <option value="" className="bg-gray-800 text-gray-300">Selecciona el tipo de suscripción</option>
          <option value="gratuita" className="bg-gray-800 text-white">🆓 Gratuita - Funciones básicas</option>
          <option value="basica" className="bg-gray-800 text-white">⭐ Básica - $9.99/mes</option>
          <option value="premium" className="bg-gray-800 text-white">👑 Premium - $19.99/mes</option>
          <option value="enterprise" className="bg-gray-800 text-white">🏢 Enterprise - $49.99/mes</option>
        </select>
        {errors.tipo_suscripcion && (
          <p className="text-red-400 text-sm mt-2">{errors.tipo_suscripcion}</p>
        )}
      </div>

      {/* Campos condicionales basados en tipo de suscripción */}
      {formData.tipo_suscripcion === 'premium' && (
        <div className="space-y-4 bg-gradient-to-r from-yellow-500/10 to-yellow-600/10 border border-yellow-400/20 rounded-lg p-6">
          <h4 className="text-yellow-300 font-semibold flex items-center">
            <span className="mr-2">👑</span>
            Configuración Premium
          </h4>
          
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">
              Método de Pago *
            </label>
            <select
              name="metodo_pago"
              value={formData.metodo_pago}
              onChange={handleInputChange}
              className={`w-full px-4 py-3 bg-white/10 border backdrop-blur-sm rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-400 transition-all duration-300 text-white hover:border-gray-500 ${
                errors.metodo_pago ? 'border-red-400 focus:ring-red-400' : 'border-gray-600'
              }`}
            >
              <option value="" className="bg-gray-800 text-gray-300">Selecciona método de pago</option>
              <option value="tarjeta_credito" className="bg-gray-800 text-white">💳 Tarjeta de Crédito</option>
              <option value="tarjeta_debito" className="bg-gray-800 text-white">💳 Tarjeta de Débito</option>
              <option value="paypal" className="bg-gray-800 text-white">🔵 PayPal</option>
              <option value="transferencia" className="bg-gray-800 text-white">🏦 Transferencia Bancaria</option>
            </select>
            {errors.metodo_pago && (
              <p className="text-red-400 text-sm mt-2">{errors.metodo_pago}</p>
            )}
          </div>
        </div>
      )}

      {formData.tipo_suscripcion && formData.tipo_suscripcion !== 'gratuita' && (
        <div>
          <label className="block text-sm font-medium text-gray-300 mb-2">
            Frecuencia de Uso Esperada
          </label>
          <select
            name="frecuencia_uso"
            value={formData.frecuencia_uso}
            onChange={handleInputChange}
            className="w-full px-4 py-3 bg-white/10 border border-gray-600 backdrop-blur-sm rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 transition-all duration-300 text-white hover:border-gray-500"
          >
            <option value="" className="bg-gray-800 text-gray-300">¿Con qué frecuencia usarás la plataforma?</option>
            <option value="diario" className="bg-gray-800 text-white">📅 Diario</option>
            <option value="semanal" className="bg-gray-800 text-white">📊 Varias veces por semana</option>
            <option value="mensual" className="bg-gray-800 text-white">📆 Mensual</option>
            <option value="ocasional" className="bg-gray-800 text-white">⏰ Ocasionalmente</option>
          </select>
        </div>
      )}

      {/* Idioma preferido */}
      <div>
        <label className="block text-sm font-medium text-gray-300 mb-2">
          Idioma Preferido
        </label>
        <select
          name="idioma_preferido"
          value={formData.idioma_preferido}
          onChange={handleInputChange}
          className="w-full px-4 py-3 bg-white/10 border border-gray-600 backdrop-blur-sm rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 transition-all duration-300 text-white hover:border-gray-500"
        >
          <option value="" className="bg-gray-800 text-gray-300">Selecciona tu idioma preferido</option>
          <option value="es" className="bg-gray-800 text-white">🇪🇸 Español</option>
          <option value="en" className="bg-gray-800 text-white">🇺🇸 English</option>
          <option value="fr" className="bg-gray-800 text-white">🇫🇷 Français</option>
          <option value="de" className="bg-gray-800 text-white">🇩🇪 Deutsch</option>
          <option value="pt" className="bg-gray-800 text-white">🇧🇷 Português</option>
        </select>
      </div>
    </div>
  )
}

export default UserFields
