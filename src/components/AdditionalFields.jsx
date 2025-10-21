import React from 'react'

const AdditionalFields = ({ formData, onChange, errors }) => {
  if (!formData.userType) return null

  return (
    <div className="space-y-6 border-t border-gray-600 pt-6">
      <h3 className="text-xl font-semibold text-white border-b border-gray-600 pb-2">
        Información Adicional
      </h3>
      
      <div>
        <label className="block text-sm font-medium text-gray-300 mb-2">
          Comentarios adicionales
        </label>
        <textarea
          name="comentarios"
          value={formData.comentarios}
          onChange={onChange}
          rows="4"
          className="w-full px-4 py-3 bg-white/10 border border-gray-600 backdrop-blur-sm rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 transition-all duration-300 text-white placeholder-gray-400 hover:border-gray-500"
          placeholder="Cuéntanos algo más sobre ti o tus expectativas..."
        />
      </div>

      <div className="space-y-4">
        <div className="flex items-center">
          <input
            type="checkbox"
            name="notificaciones"
            checked={formData.notificaciones}
            onChange={onChange}
            className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded bg-white/10"
          />
          <label className="ml-3 text-sm text-gray-300">
            Deseo recibir notificaciones por email sobre actualizaciones
          </label>
        </div>

        <div className="flex items-center">
          <input
            type="checkbox"
            name="terminos"
            checked={formData.terminos}
            onChange={onChange}
            className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded bg-white/10"
          />
          <label className="ml-3 text-sm text-gray-300">
            Acepto los términos y condiciones *
          </label>
        </div>
        {errors.terminos && (
          <p className="text-red-400 text-sm">{errors.terminos}</p>
        )}
      </div>
    </div>
  )
}

export default AdditionalFields
