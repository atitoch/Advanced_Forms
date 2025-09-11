import React from 'react'

const UserTypeIndicator = ({ userType }) => {
  if (!userType) return null

  return (
    <div className="mb-8 text-center">
      <div className={`inline-flex items-center px-6 py-3 rounded-full text-sm font-medium ${
        userType === 'user' 
          ? 'bg-blue-500/20 text-blue-300 border border-blue-400/30' 
          : 'bg-purple-500/20 text-purple-300 border border-purple-400/30'
      }`}>
        <span className="mr-2">
          {userType === 'user' ? '👤' : '👑'}
        </span>
        Modo: {userType === 'user' ? 'Usuario Final' : 'Administrador'}
      </div>
    </div>
  )
}

export default UserTypeIndicator
