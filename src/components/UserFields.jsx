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
    </div>
  )
}

export default UserFields
