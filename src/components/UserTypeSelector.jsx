import React from 'react'

const UserTypeSelector = ({ userType, onChange, error }) => {
  return (
    <div>
      <label className="block text-sm font-medium text-gray-300 mb-3">
        Tipo de Usuario *
      </label>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <label className={`flex items-center p-6 border backdrop-blur-sm rounded-xl cursor-pointer transition-all duration-300 hover:scale-105 ${
          userType === 'user' 
            ? 'border-blue-400 bg-blue-500/20 shadow-lg shadow-blue-500/25' 
            : 'border-gray-600 bg-white/5 hover:border-gray-500 hover:bg-white/10'
        }`}>
          <input
            type="radio"
            name="userType"
            value="user"
            checked={userType === 'user'}
            onChange={onChange}
            className="sr-only"
          />
          <div className={`flex items-center w-full ${
            userType === 'user' ? 'text-blue-300' : 'text-gray-300'
          }`}>
            <span className="text-4xl mr-4">👤</span>
            <div>
              <span className="font-medium text-xl block">Usuario Final</span>
              <span className="text-sm opacity-75">Acceso estándar a la plataforma</span>
            </div>
            {userType === 'user' && (
              <span className="ml-auto text-blue-400 text-xl">✓</span>
            )}
          </div>
        </label>

        <label className={`flex items-center p-6 border backdrop-blur-sm rounded-xl cursor-pointer transition-all duration-300 hover:scale-105 ${
          userType === 'admin' 
            ? 'border-purple-400 bg-purple-500/20 shadow-lg shadow-purple-500/25' 
            : 'border-gray-600 bg-white/5 hover:border-gray-500 hover:bg-white/10'
        }`}>
          <input
            type="radio"
            name="userType"
            value="admin"
            checked={userType === 'admin'}
            onChange={onChange}
            className="sr-only"
          />
          <div className={`flex items-center w-full ${
            userType === 'admin' ? 'text-purple-300' : 'text-gray-300'
          }`}>
            <span className="text-4xl mr-4">👑</span>
            <div>
              <span className="font-medium text-xl block">Administrador</span>
              <span className="text-sm opacity-75">Acceso completo y gestión</span>
            </div>
            {userType === 'admin' && (
              <span className="ml-auto text-purple-400 text-xl">✓</span>
            )}
          </div>
        </label>
      </div>
      {error && (
        <p className="text-red-400 text-sm mt-2 flex items-center">
          <span className="mr-1">⚠️</span>
          {error}
        </p>
      )}
    </div>
  )
}

export default UserTypeSelector
