import React, { useState, useCallback, useMemo } from "react";
import { Mail, Lock, ShoppingBag } from "lucide-react";
import { Link } from 'react-router-dom';

const LoginForm = ({ onSubmit }) => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    rememberMe: false
  });
  const [isLoading, setIsLoading] = useState(false);

  const handleInputChange = useCallback((field) => (e) => {
    const value = field === 'rememberMe' ? e.target.checked : e.target.value;
    setFormData(prev => ({ ...prev, [field]: value }));
  }, []);

  const handleSubmit = useCallback(async (e) => {
    e.preventDefault();
    if (!formData.email || !formData.password) return;
    
    setIsLoading(true);
    try {
      await onSubmit(formData);
    } finally {
      setIsLoading(false);
    }
  }, [formData, onSubmit]);

  const isFormValid = useMemo(() => 
    formData.email.trim() && formData.password.trim()
  , [formData.email, formData.password]);

  return (
    <div className="min-h-screen dark:bg-[#141414] flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <div className="dark:bg-[#141414] p-8">
          
          {/* Header */}
          <div className="text-center mb-8">
            <div className="inline-flex items-center justify-center w-12 h-12 bg-blue-600 rounded-lg mb-4">
              <ShoppingBag className="w-6 h-6 text-white" />
            </div>
            <h1 className="text-2xl font-bold text-gray-900 dark:text-blue-500 mb-2">
              TechStore
            </h1>
            <p className="text-gray-600 dark:text-gray-400 text-sm">
              Connectez-vous à votre compte
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Email */}
            <div>
              <label className="block dark:text-gray-400 text-sm font-medium text-gray-700 mb-1">
                Email
              </label>
              <div className="relative">
                <Mail className="absolute left-3 top-3.5 w-5 h-5 text-gray-400 pointer-events-none" />
                <input
                id="email"
                  type="email"
                  placeholder="votre@email.com"
                  value={formData.email}
                  onChange={handleInputChange('email')}
                  required
                  className="w-full pl-10 pr-3 py-3 border border-gray-300 dark:bg-[#141414] dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                />
              </div>
            </div>

            {/* Password */}
            <div>
              <label className="block dark:text-gray-400 text-sm font-medium text-gray-700 mb-1">
                Mot de passe
              </label>
              <div className="relative">
                <Lock className="absolute left-3 top-3.5 w-5 h-5 text-gray-400 pointer-events-none" />
                <input
                id="password"
                  type="password"
                  placeholder="Votre mot de passe"
                  value={formData.password}
                  onChange={handleInputChange('password')}
                  required
                  className="w-full pl-10 pr-3 py-3 border border-gray-300 dark:bg-[#141414] dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                />
              </div>
            </div>

            {/* Options */}
            <div className="flex items-center justify-between text-sm">
              <label className="flex items-center cursor-pointer">
                <input
                  type="checkbox"
                  checked={formData.rememberMe}
                  onChange={handleInputChange('rememberMe')}
                  className="h-4 w-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                />
                <span className="ml-2 text-gray-600 dark:text-gray-400">
                  Se souvenir de moi
                </span>
              </label>
              <Link 
                to="/forgot-password" 
                className="text-blue-600 hover:text-blue-500 font-medium transition-colors"
              >
                Mot de passe oublié ?
              </Link>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={isLoading || !isFormValid}
              className="w-full py-3 px-4 bg-blue-600 hover:bg-blue-700 disabled:bg-gray-400 disabled:cursor-not-allowed text-white font-medium rounded-lg transition-colors duration-200 flex items-center justify-center"
            >
              {isLoading ? (
                <>
                  <div className="animate-spin rounded-full h-4 w-4 border-2 border-white border-t-transparent mr-2" />
                  Connexion...
                </>
              ) : (
                "Se connecter"
              )}
            </button>
          </form>

          <p className="text-center dark:text-gray-400 text-gray-600 text-sm mt-6">
            Pas encore de compte ?{" "}
            <Link 
              to="/signup" 
              className="text-blue-600 hover:text-blue-500 font-medium transition-colors"
            >
              Créer un compte
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default LoginForm;