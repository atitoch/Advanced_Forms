import React from 'react'

const CommonFields = ({ formData, handleInputChange, errors }) => {
  if (!formData.userType) return null

  return (
    <div className="space-y-6">
      <h3 className="text-xl font-semibold text-white border-b border-gray-600 pb-2">
        Información Personal
      </h3>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label className="block text-sm font-medium text-gray-300 mb-2">
            Nombre completo *
          </label>
          <input
            type="text"
            name="nombre"
            value={formData.nombre}
            onChange={handleInputChange}
            className={`w-full px-4 py-3 bg-white/10 border backdrop-blur-sm rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 transition-all duration-300 text-white placeholder-gray-400 ${
              errors.nombre ? 'border-red-400 focus:ring-red-400' : 'border-gray-600 hover:border-gray-500'
            }`}
            placeholder="Ingresa tu nombre completo"
          />
          {errors.nombre && (
            <p className="text-red-400 text-sm mt-2">{errors.nombre}</p>
          )}
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-300 mb-2">
            Email *
          </label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleInputChange}
            className={`w-full px-4 py-3 bg-white/10 border backdrop-blur-sm rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 transition-all duration-300 text-white placeholder-gray-400 ${
              errors.email ? 'border-red-400 focus:ring-red-400' : 'border-gray-600 hover:border-gray-500'
            }`}
            placeholder="tu@email.com"
          />
          {errors.email && (
            <p className="text-red-400 text-sm mt-2">{errors.email}</p>
          )}
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-300 mb-2">
            Teléfono *
          </label>
          <input
            type="tel"
            name="telefono"
            value={formData.telefono}
            onChange={handleInputChange}
            className={`w-full px-4 py-3 bg-white/10 border backdrop-blur-sm rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 transition-all duration-300 text-white placeholder-gray-400 ${
              errors.telefono ? 'border-red-400 focus:ring-red-400' : 'border-gray-600 hover:border-gray-500'
            }`}
            placeholder="+1 234 567 8900"
          />
          {errors.telefono && (
            <p className="text-red-400 text-sm mt-2">{errors.telefono}</p>
          )}
        </div>
      </div>
    </div>
  )
}

export default CommonFields
