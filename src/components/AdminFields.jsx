import React from 'react'

const AdminFields = ({ formData, handleInputChange, onHerramientasChange, errors }) => {
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

      {/* Área de Especialización */}
      <div>
        <label className="block text-sm font-medium text-gray-300 mb-2">
          Área de Especialización *
        </label>
        <select
          name="area_especializacion"
          value={formData.area_especializacion}
          onChange={handleInputChange}
          className={`w-full px-4 py-3 bg-white/10 border backdrop-blur-sm rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-400 transition-all duration-300 text-white hover:border-gray-500 ${
            errors.area_especializacion ? 'border-red-400 focus:ring-red-400' : 'border-gray-600'
          }`}
        >
          <option value="" className="bg-gray-800 text-gray-300">Selecciona tu especialización</option>
          <option value="tecnologia" className="bg-gray-800 text-white">💻 Tecnología e Innovación</option>
          <option value="personas" className="bg-gray-800 text-white">👥 Gestión de Personas</option>
          <option value="proyectos" className="bg-gray-800 text-white">📋 Gestión de Proyectos</option>
          <option value="finanzas" className="bg-gray-800 text-white">💰 Finanzas y Presupuestos</option>
          <option value="operaciones" className="bg-gray-800 text-white">⚙️ Operaciones y Procesos</option>
          <option value="estrategia" className="bg-gray-800 text-white">🎯 Estrategia Empresarial</option>
        </select>
        {errors.area_especializacion && (
          <p className="text-red-400 text-sm mt-2">{errors.area_especializacion}</p>
        )}
      </div>

      {/* Campos condicionales basados en área de especialización */}
      {formData.area_especializacion === 'tecnologia' && (
        <div className="space-y-4 bg-gradient-to-r from-cyan-500/10 to-cyan-600/10 border border-cyan-400/20 rounded-lg p-6">
          <h4 className="text-cyan-300 font-semibold flex items-center">
            <span className="mr-2">💻</span>
            Herramientas Tecnológicas
          </h4>
          
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-3">
              Herramientas que manejas *
            </label>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
              {[
                { value: 'docker', label: 'Docker', icon: '🐳' },
                { value: 'kubernetes', label: 'Kubernetes', icon: '☸️' },
                { value: 'aws', label: 'AWS', icon: '☁️' },
                { value: 'azure', label: 'Azure', icon: '🔷' },
                { value: 'jenkins', label: 'Jenkins', icon: '🔄' },
                { value: 'terraform', label: 'Terraform', icon: '🏗️' }
              ].map((herramienta) => (
                <label key={herramienta.value} className={`flex items-center p-3 border backdrop-blur-sm rounded-lg cursor-pointer transition-all duration-300 ${
                  formData.herramientas_admin?.includes(herramienta.value)
                    ? 'border-cyan-400 bg-cyan-500/20' 
                    : 'border-gray-600 bg-white/5 hover:border-gray-500'
                }`}>
                  <input
                    type="checkbox"
                    checked={formData.herramientas_admin?.includes(herramienta.value) || false}
                    onChange={() => onHerramientasChange(herramienta.value)}
                    className="sr-only"
                  />
                  <span className="text-lg mr-2">{herramienta.icon}</span>
                  <span className={`text-sm font-medium ${
                    formData.herramientas_admin?.includes(herramienta.value) ? 'text-cyan-300' : 'text-gray-300'
                  }`}>
                    {herramienta.label}
                  </span>
                </label>
              ))}
            </div>
            {errors.herramientas_admin && (
              <p className="text-red-400 text-sm mt-2">{errors.herramientas_admin}</p>
            )}
          </div>
        </div>
      )}

      {formData.area_especializacion === 'personas' && (
        <div className="space-y-4 bg-gradient-to-r from-green-500/10 to-green-600/10 border border-green-400/20 rounded-lg p-6">
          <h4 className="text-green-300 font-semibold flex items-center">
            <span className="mr-2">👥</span>
            Gestión de Equipos
          </h4>
          
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">
              Tipo de Gestión
            </label>
            <select
              name="tipo_gestion"
              value={formData.tipo_gestion}
              onChange={handleInputChange}
              className="w-full px-4 py-3 bg-white/10 border border-gray-600 backdrop-blur-sm rounded-lg focus:outline-none focus:ring-2 focus:ring-green-400 transition-all duration-300 text-white hover:border-gray-500"
            >
              <option value="" className="bg-gray-800 text-gray-300">Tipo de gestión de personas</option>
              <option value="equipos_pequenos" className="bg-gray-800 text-white">👥 Equipos pequeños (2-5 personas)</option>
              <option value="equipos_medianos" className="bg-gray-800 text-white">👨‍👩‍👧‍👦 Equipos medianos (6-15 personas)</option>
              <option value="equipos_grandes" className="bg-gray-800 text-white">🏢 Equipos grandes (16+ personas)</option>
              <option value="multiples_equipos" className="bg-gray-800 text-white">🌐 Múltiples equipos</option>
            </select>
          </div>
        </div>
      )}

      {/* Horario de trabajo */}
      <div>
        <label className="block text-sm font-medium text-gray-300 mb-2">
          Horario de Trabajo Preferido
        </label>
        <select
          name="horario_trabajo"
          value={formData.horario_trabajo}
          onChange={handleInputChange}
          className="w-full px-4 py-3 bg-white/10 border border-gray-600 backdrop-blur-sm rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-400 transition-all duration-300 text-white hover:border-gray-500"
        >
          <option value="" className="bg-gray-800 text-gray-300">Selecciona tu horario preferido</option>
          <option value="matutino" className="bg-gray-800 text-white">🌅 Matutino (6:00 - 14:00)</option>
          <option value="diurno" className="bg-gray-800 text-white">☀️ Diurno (8:00 - 17:00)</option>
          <option value="vespertino" className="bg-gray-800 text-white">🌆 Vespertino (14:00 - 22:00)</option>
          <option value="nocturno" className="bg-gray-800 text-white">🌙 Nocturno (22:00 - 6:00)</option>
          <option value="flexible" className="bg-gray-800 text-white">🔄 Flexible</option>
        </select>
      </div>
    </div>
  )
}

export default AdminFields
