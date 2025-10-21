import React, { useState, useEffect } from 'react'
import apiService from '../services/apiService'

const DataViewer = ({ onBack }) => {
  const [submissions, setSubmissions] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    fetchData()
  }, [])

  const fetchData = async () => {
    try {
      setLoading(true)
      const response = await apiService.getFormSubmissions()
      if (response.success) {
        setSubmissions(response.data)
      } else {
        setError('Error al cargar los datos')
      }
    } catch (err) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleString('es-ES', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    })
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-slate-900 py-8 px-4 relative overflow-hidden">
        <div className="max-w-6xl mx-auto relative z-10">
          <div className="flex items-center justify-center h-64">
            <div className="text-white text-xl">Cargando datos...</div>
          </div>
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-slate-900 py-8 px-4 relative overflow-hidden">
        <div className="max-w-6xl mx-auto relative z-10">
          <div className="bg-red-500/10 border border-red-500/30 rounded-lg p-6 text-red-300">
            <h2 className="text-xl font-semibold mb-4">Error</h2>
            <p>{error}</p>
            <button
              onClick={fetchData}
              className="mt-4 px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded-lg transition-colors"
            >
              Reintentar
            </button>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-slate-900 py-8 px-4 relative overflow-hidden">
      <div className="max-w-6xl mx-auto relative z-10">
        {/* Header */}
        <div className="mb-8">
          <button
            onClick={onBack}
            className="mb-4 px-4 py-2 bg-gray-600 hover:bg-gray-700 text-white rounded-lg transition-colors"
          >
            ← Volver al formulario
          </button>
          <h1 className="text-3xl font-bold text-white mb-2">
            Registros de Formularios
          </h1>
          <p className="text-gray-300">
            Total de registros: {submissions.length}
          </p>
        </div>

        {/* Grid de tarjetas */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {submissions.map((submission) => (
            <div
              key={submission.id}
              className={`bg-gradient-to-br from-gray-800/80 via-gray-900/80 to-black/80 backdrop-blur-xl rounded-2xl shadow-xl p-6 ${
                submission.user_type === 'admin' 
                  ? 'border border-purple-500/30 shadow-purple-500/10' 
                  : 'border border-gray-700/50'
              }`}
            >
              {/* Header de la tarjeta */}
              <div className="flex items-center justify-between mb-4">
                <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                  submission.user_type === 'admin' 
                    ? 'bg-purple-500/20 text-purple-300' 
                    : 'bg-green-500/20 text-green-300'
                }`}>
                  {submission.user_type === 'admin' ? 'Admin' : 'Usuario'}
                </span>
                <span className="text-xs text-gray-400">
                  {formatDate(submission.created_at)}
                </span>
              </div>

              {/* Información básica */}
              <div className="space-y-3">
                <div>
                  <h3 className="font-semibold text-white">{submission.nombre}</h3>
                  <p className="text-sm text-gray-400">{submission.email}</p>
                  <p className="text-sm text-gray-400">{submission.telefono}</p>
                </div>

                {/* Campos específicos según el tipo */}
                {submission.user_type === 'user' && (
                  <div className="space-y-2">
                    {submission.nivel_experiencia && (
                      <div>
                        <span className="text-xs text-gray-500">Experiencia:</span>
                        <p className="text-sm text-gray-300">{submission.nivel_experiencia}</p>
                      </div>
                    )}
                    {submission.intereses && submission.intereses.length > 0 && (
                      <div>
                        <span className="text-xs text-gray-500">Intereses:</span>
                        <div className="flex flex-wrap gap-1 mt-1">
                          {submission.intereses.map((interes, index) => (
                            <span key={index} className="px-2 py-1 bg-blue-500/20 text-blue-300 text-xs rounded">
                              {interes}
                            </span>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                )}

                {submission.user_type === 'admin' && (
                  <div className="space-y-2">
                    {submission.departamento && (
                      <div>
                        <span className="text-xs text-gray-500">Departamento:</span>
                        <p className="text-sm text-gray-300">{submission.departamento}</p>
                      </div>
                    )}
                    {submission.nivel_acceso && (
                      <div>
                        <span className="text-xs text-gray-500">Nivel de acceso:</span>
                        <p className="text-sm text-gray-300">{submission.nivel_acceso}</p>
                      </div>
                    )}
                  </div>
                )}

                {/* Comentarios */}
                {submission.comentarios && (
                  <div>
                    <span className="text-xs text-gray-500">Comentarios:</span>
                    <p className="text-sm text-gray-300 mt-1 line-clamp-3">
                      {submission.comentarios}
                    </p>
                  </div>
                )}
              </div>

              {/* Footer */}
              <div className="mt-4 pt-4 border-t border-gray-700/50 flex items-center justify-between">
                <span className={`text-xs px-2 py-1 rounded ${
                  submission.status === 'pending' 
                    ? 'bg-yellow-500/20 text-yellow-300' 
                    : 'bg-green-500/20 text-green-300'
                }`}>
                  {submission.status}
                </span>
                <span className="text-xs text-gray-500">
                  ID: {submission.id}
                </span>
              </div>
            </div>
          ))}
        </div>

        {/* Mensaje si no hay datos */}
        {submissions.length === 0 && (
          <div className="text-center py-16">
            <div className="text-gray-400 text-lg mb-4">No se encontraron registros</div>
            <button
              onClick={fetchData}
              className="px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors"
            >
              Actualizar
            </button>
          </div>
        )}
      </div>
    </div>
  )
}

export default DataViewer
