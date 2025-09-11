import React from 'react'

const Header = () => {
  return (
    <div className="text-center mb-8">
      <h1 className="text-4xl font-bold bg-gradient-to-r from-white via-gray-200 to-gray-400 bg-clip-text text-transparent mb-3">
        Formulario Dinámico de Registro
      </h1>
      <p className="text-gray-300 text-lg">
        Campos dinámicos basados en el tipo de usuario seleccionado
      </p>
    </div>
  )
}

export default Header
