import React from 'react'

const SuccessModal = ({ isOpen, message, onClose }) => {
  if (!isOpen) {
    return null
  }

  return (
    <div className="fixed inset-0 z-[9999] flex items-center justify-center">
      {/* Backdrop con blur */}
      <div 
        className="absolute inset-0 bg-black/60 backdrop-blur-md"
        onClick={onClose}
      ></div>
      
      {/* Modal */}
      <div className="relative bg-gradient-to-br from-gray-800 via-gray-900 to-black rounded-2xl border border-gray-700/50 shadow-2xl shadow-black/50 p-8 max-w-md mx-4 transform transition-all duration-300">
        {/* Inner glow effect */}
        <div className="absolute inset-0 bg-gradient-to-br from-green-500/10 via-transparent to-blue-500/10 rounded-2xl"></div>
        
        <div className="relative z-10 text-center">
          {/* Icono de éxito */}
          <div className="mx-auto w-16 h-16 bg-green-500 rounded-full flex items-center justify-center mb-6 animate-pulse">
            <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
          </div>
          
          {/* Título */}
          <h3 className="text-2xl font-bold text-white mb-4">
            ¡Éxito!
          </h3>
          
          {/* Mensaje */}
          <p className="text-gray-300 mb-6 leading-relaxed">
            {message || 'Formulario enviado exitosamente'}
          </p>

          {/* Indicador de cierre automático */}
          <div className="flex items-center justify-center mb-6">
            <div className="flex space-x-1">
              <div className="w-2 h-2 bg-green-400 rounded-full animate-bounce"></div>
              <div className="w-2 h-2 bg-green-400 rounded-full animate-bounce" style={{animationDelay: '0.1s'}}></div>
              <div className="w-2 h-2 bg-green-400 rounded-full animate-bounce" style={{animationDelay: '0.2s'}}></div>
            </div>
            <p className="text-xs text-gray-400 ml-3">
              Cerrando automáticamente...
            </p>
          </div>
          
          {/* Botón de cierre manual */}
          <button
            onClick={onClose}
            className="px-6 py-2 bg-gray-600/50 hover:bg-gray-600/70 text-gray-300 font-medium rounded-lg transition-all duration-200 border border-gray-500/30 text-sm"
          >
            Cerrar ahora
          </button>
        </div>
      </div>
    </div>
  )
}

export default SuccessModal
