import React from 'react'

const InfoCards = () => {
  return (
    <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-6">
      <div className="bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-sm border border-gray-600/50 p-6 rounded-xl">
        <h3 className="font-medium text-white mb-3 flex items-center">
          <span className="mr-2">🔄</span>
          Formulario Dinámico
        </h3>
        <p className="text-sm text-gray-300">
          Campos que cambian automáticamente según el tipo de usuario seleccionado.
        </p>
      </div>
      <div className="bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-sm border border-gray-600/50 p-6 rounded-xl">
        <h3 className="font-medium text-white mb-3 flex items-center">
          <span className="mr-2">🎯</span>
          Validación Inteligente
        </h3>
        <p className="text-sm text-gray-300">
          Validación contextual basada en el rol seleccionado con feedback inmediato.
        </p>
      </div>
      <div className="bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-sm border border-gray-600/50 p-6 rounded-xl">
        <h3 className="font-medium text-white mb-3 flex items-center">
          <span className="mr-2">✨</span>
          Diseño Glassmorphism
        </h3>
        <p className="text-sm text-gray-300">
          Interfaz moderna con efectos de cristal, degradados y animaciones fluidas.
        </p>
      </div>
    </div>
  )
}

export default InfoCards
