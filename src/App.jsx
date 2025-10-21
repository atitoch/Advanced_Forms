import React, { useState } from 'react'
import { useFormLogic } from './hooks/useFormLogic'
import Header from './components/Header'
import UserTypeIndicator from './components/UserTypeIndicator'
import UserTypeSelector from './components/UserTypeSelector'
import CommonFields from './components/CommonFields'
import UserFields from './components/UserFields'
import AdminFields from './components/AdminFields'
import AdditionalFields from './components/AdditionalFields'
import SubmitButton from './components/SubmitButton'
import InfoCards from './components/InfoCards'
import BackgroundEffects from './components/BackgroundEffects'
import SuccessModal from './components/SuccessModal'
import DataViewer from './components/DataViewer'

function App() {
  const [currentView, setCurrentView] = useState('form') // 'form' o 'data'
  
  const {
    formData,
    errors,
    isSubmitting,
    submitStatus,
    submitMessage,
    showSuccessModal,
    handleInputChange,
    handleInteresesChange,
    handleHerramientasChange,
    handleSubmit,
    closeSuccessModal
  } = useFormLogic()

  const handleViewData = () => {
    setCurrentView('data')
  }

  const handleBackToForm = () => {
    setCurrentView('form')
  }

  // Renderizar la vista de datos si está seleccionada
  if (currentView === 'data') {
    return <DataViewer onBack={handleBackToForm} />
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-slate-900 py-8 px-4 relative overflow-hidden">
      {/* Background Effects */}
      <BackgroundEffects />
      
      <div className="max-w-2xl mx-auto relative z-10">
        {/* Header */}
        <Header />

        {/* Botón para ver datos */}
        <div className="mb-4 text-center">
          <button
            type="button"
            onClick={handleViewData}
            className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg transition-all duration-200"
          >
            Ver registros
          </button>
        </div>

        {/* User Type Indicator */}
        <UserTypeIndicator userType={formData.userType} />

        {/* Form Card */}
        <div className="relative">
          {/* Glassmorphism Card */}
          <div className="absolute inset-0 bg-gradient-to-r from-white/10 via-white/5 to-white/10 rounded-2xl blur-sm"></div>
          <div className="relative bg-gradient-to-br from-gray-800/80 via-gray-900/80 to-black/80 backdrop-blur-xl rounded-2xl border border-gray-700/50 shadow-2xl shadow-black/50 p-8">
            {/* Inner glow effect */}
            <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 via-transparent to-purple-500/5 rounded-2xl"></div>
            
            <div className="relative z-10">
              <form onSubmit={handleSubmit} className="space-y-8">
                
                {/* Tipo de Usuario */}
                <UserTypeSelector 
                  userType={formData.userType}
                  onChange={handleInputChange}
                  error={errors.userType}
                />

                {/* Campos Comunes */}
                {formData.userType && (
                  <>
                    <CommonFields 
                      formData={formData}
                      errors={errors}
                      handleInputChange={handleInputChange}
                    />

                    {/* Campos específicos del tipo de usuario */}
                    {formData.userType === 'user' && (
                      <UserFields 
                        formData={formData}
                        errors={errors}
                        handleInputChange={handleInputChange}
                        handleInteresesChange={handleInteresesChange}
                      />
                    )}

                    {formData.userType === 'admin' && (
                      <AdminFields 
                        formData={formData}
                        errors={errors}
                        handleInputChange={handleInputChange}
                        onHerramientasChange={handleHerramientasChange}
                      />
                    )}

                    {/* Campos adicionales */}
                    <AdditionalFields 
                      formData={formData}
                      errors={errors}
                      onChange={handleInputChange}
                    />

                    {/* Submit Button */}
                    <SubmitButton 
                      isSubmitting={isSubmitting} 
                      userType={formData.userType}
                    />

                    {/* Status Messages - Solo errores */}
                    {submitStatus === 'error' && (
                      <div className="p-4 rounded-lg border bg-red-500/10 border-red-500/30 text-red-300">
                        <div className="flex items-center">
                          <div className="w-5 h-5 rounded-full mr-3 bg-red-500"></div>
                          <p className="text-sm font-medium">{submitMessage}</p>
                        </div>
                      </div>
                    )}

                    {/* Error General */}
                    {errors.general && (
                      <div className="p-4 rounded-lg border bg-red-500/10 border-red-500/30 text-red-300">
                        <p className="text-sm font-medium">{errors.general}</p>
                      </div>
                    )}
                  </>
                )}
              </form>
            </div>
          </div>
        </div>

        {/* Info Cards */}
        <InfoCards userType={formData.userType} />
      </div>

      {/* Success Modal */} 
      <SuccessModal
        isOpen={showSuccessModal}
        message={submitMessage}
        onClose={closeSuccessModal}
      />
    </div>
  )
}

export default App
