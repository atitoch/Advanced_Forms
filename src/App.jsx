import React from 'react'
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

function App() {
  const {
    formData,
    errors,
    isSubmitting,
    handleInputChange,
    handleInteresesChange,
    handleSubmit
  } = useFormLogic()

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-slate-900 py-8 px-4 relative overflow-hidden">
      {/* Background Effects */}
      <BackgroundEffects />
      
      <div className="max-w-2xl mx-auto relative z-10">
        {/* Header */}
        <Header />

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
                      onChange={handleInputChange}
                    />

                    {/* Campos específicos del tipo de usuario */}
                    {formData.userType === 'user' && (
                      <UserFields 
                        formData={formData}
                        errors={errors}
                        onChange={handleInputChange}
                        onInteresesChange={handleInteresesChange}
                      />
                    )}

                    {formData.userType === 'admin' && (
                      <AdminFields 
                        formData={formData}
                        errors={errors}
                        onChange={handleInputChange}
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
                  </>
                )}
              </form>
            </div>
          </div>
        </div>

        {/* Info Cards */}
        <InfoCards userType={formData.userType} />
      </div>
    </div>
  )
}

export default App
