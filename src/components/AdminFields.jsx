import React from 'react'

const AdminFields = ({ formData, handleInputChange, errors }) => {
  if (formData.userType !== 'admin') return null

  return (
    <div className="space-y-6 border-t border-gray-600 pt-6">
      <h3 className="text-xl font-semibold text-purple-300 border-b border-purple-400/30 pb-2">
        👑 Configuración de Administrador
      </h3>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label className="block text-sm font-medium text-gray-300 mb-2">
            Departamento *
          </label>
          <select
            name="departamento"
            value={formData.departamento}
            onChange={handleInputChange}
            className={`w-full px-4 py-3 bg-white/10 border backdrop-blur-sm rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-400 transition-all duration-300 text-white hover:border-gray-500 ${
              errors.departamento ? 'border-red-400 focus:ring-red-400' : 'border-gray-600'
            }`}
          >
            <option value="" className="bg-gray-800 text-gray-300">Selecciona departamento</option>
            <option value="ti" className="bg-gray-800 text-white">Tecnología (TI)</option>
            <option value="rrhh" className="bg-gray-800 text-white">Recursos Humanos</option>
            <option value="finanzas" className="bg-gray-800 text-white">Finanzas</option>
            <option value="marketing" className="bg-gray-800 text-white">Marketing</option>
            <option value="ventas" className="bg-gray-800 text-white">Ventas</option>
            <option value="operaciones" className="bg-gray-800 text-white">Operaciones</option>
          </select>
          {errors.departamento && (
            <p className="text-red-400 text-sm mt-2">{errors.departamento}</p>
          )}
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-300 mb-2">
            Nivel de acceso *
          </label>
          <select
            name="nivel_acceso"
            value={formData.nivel_acceso}
            onChange={handleInputChange}
            className={`w-full px-4 py-3 bg-white/10 border backdrop-blur-sm rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-400 transition-all duration-300 text-white hover:border-gray-500 ${
              errors.nivel_acceso ? 'border-red-400 focus:ring-red-400' : 'border-gray-600'
            }`}
          >
            <option value="" className="bg-gray-800 text-gray-300">Selecciona nivel</option>
            <option value="supervisor" className="bg-gray-800 text-white">Supervisor</option>
            <option value="manager" className="bg-gray-800 text-white">Manager</option>
            <option value="director" className="bg-gray-800 text-white">Director</option>
            <option value="super_admin" className="bg-gray-800 text-white">Super Admin</option>
          </select>
          {errors.nivel_acceso && (
            <p className="text-red-400 text-sm mt-2">{errors.nivel_acceso}</p>
          )}
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-300 mb-2">
          Certificaciones y capacitaciones
        </label>
        <textarea
          name="certificaciones"
          value={formData.certificaciones}
          onChange={handleInputChange}
          rows="3"
          className="w-full px-4 py-3 bg-white/10 border border-gray-600 backdrop-blur-sm rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-400 transition-all duration-300 text-white placeholder-gray-400 hover:border-gray-500"
          placeholder="Ej: PMP, ITIL, Scrum Master..."
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-300 mb-2">
          Experiencia en gestión *
        </label>
        <select
          name="experiencia_gestion"
          value={formData.experiencia_gestion}
          onChange={handleInputChange}
          className={`w-full px-4 py-3 bg-white/10 border backdrop-blur-sm rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-400 transition-all duration-300 text-white hover:border-gray-500 ${
            errors.experiencia_gestion ? 'border-red-400 focus:ring-red-400' : 'border-gray-600'
          }`}
        >
          <option value="" className="bg-gray-800 text-gray-300">Selecciona experiencia</option>
          <option value="menos_1" className="bg-gray-800 text-white">Menos de 1 año</option>
          <option value="1_3" className="bg-gray-800 text-white">1-3 años</option>
          <option value="3_5" className="bg-gray-800 text-white">3-5 años</option>
          <option value="5_10" className="bg-gray-800 text-white">5-10 años</option>
          <option value="mas_10" className="bg-gray-800 text-white">Más de 10 años</option>
        </select>
        {errors.experiencia_gestion && (
          <p className="text-red-400 text-sm mt-2">{errors.experiencia_gestion}</p>
        )}
      </div>
    </div>
  )
}

export default AdminFields
