import React from 'react'

const SubmitButton = ({ isSubmitting, userType }) => {
  return (
    <div className="pt-6">
      <button
        type="submit"
        disabled={isSubmitting || !userType}
        className={`w-full px-6 py-4 rounded-xl font-medium text-lg transition-all duration-300 ${
          isSubmitting || !userType
            ? 'bg-gray-600 cursor-not-allowed text-gray-400'
            : userType === 'user'
            ? 'bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white shadow-lg shadow-blue-500/25 hover:shadow-blue-500/40 hover:scale-105'
            : 'bg-gradient-to-r from-purple-500 to-purple-600 hover:from-purple-600 hover:to-purple-700 text-white shadow-lg shadow-purple-500/25 hover:shadow-purple-500/40 hover:scale-105'
        }`}
      >
        {isSubmitting ? (
          <span className="flex items-center justify-center">
            <svg className="animate-spin -ml-1 mr-3 h-6 w-6 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
            </svg>
            Enviando...
          </span>
        ) : (
          `Registrar ${userType === 'user' ? 'Usuario' : 'Administrador'}`
        )}
      </button>
    </div>
  )
}

export default SubmitButton
