import React, { useState } from "react";
import { Mail, Lock, ShoppingBag } from "lucide-react";

const LoginForm = ({ onSubmit = (data) => console.log(data) }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    
    setTimeout(() => {
      onSubmit({ email, password });
      setIsLoading(false);
    }, 1000);
  };

  return (
    <div className="min-h-screen  dark:bg-[#141414] flex items-center justify-center p-4">
      <div className="w-full max-w-xl lg:max-w-2xl md:max-w-md">
      
        <div className=" dark:bg-[#141414]  p-8">
      
          <div className="text-center mb-8">
            <div className="inline-flex items-center justify-center w-12 h-12 bg-blue-600 rounded-lg mb-4">
              <ShoppingBag className="w-6 h-6 text-white" />
            </div>
            <h1 className="text-2xl font-bold text-gray-900 dark:text-blue-500 mb-2">TechStore</h1>
            <p className="text-gray-600 dark:text-gray-400 text-sm">Connectez-vous à votre compte</p>
          </div>

          <div className="space-y-4">
            {/* Champ Email */}
            <div>
              <label className="block dark:text-gray-400 text-sm font-medium text-gray-700 mb-1">
                Email
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Mail className="w-5 h-5 text-gray-400" />
                </div>
                <input
                  type="email"
                  placeholder="votre@email.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className="w-full pl-10 pr-3 py-3 border border-gray-300 dark:bg-[#141414] rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                />
              </div>
            </div>

            {/* Champ Mot de passe */}
            <div>
              <label className="block dark:text-gray-400 text-sm font-medium text-gray-700 mb-1">
                Mot de passe
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Lock className="w-5 h-5 text-gray-400" />
                </div>
                <input
                  type="password"
                  placeholder="Votre mot de passe"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  className="w-full pl-10 pr-3 py-3 border dark:bg-[#141414] border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                />
              </div>
            </div>

            {/* Options */}
            <div className="flex items-center justify-between text-sm">
              <label className="flex items-center">
                <input
                  type="checkbox"
                  className="h-4 w-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                />
                <span className="ml-2 text-gray-600 dark:text-gray-400">Se souvenir de moi</span>
              </label>
              <a href="#" className="text-blue-600 hover:text-blue-500 font-medium">
                Mot de passe oublié ?
              </a>
            </div>

            {/* Bouton de connexion */}
            <button
              onClick={handleSubmit}
              disabled={isLoading}
              className="w-full py-3 px-4 bg-blue-600 hover:bg-blue-700 disabled:bg-blue-400 text-white font-medium rounded-lg transition-colors duration-200 flex items-center justify-center"
            >
              {isLoading ? (
                <>
                  <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                  Connexion...
                </>
              ) : (
                "Se connecter"
              )}
            </button>
          </div>

          <p className="text-center dark:text-gray-400 text-gray-600 text-sm mt-6">
            Pas encore de compte ?{" "}
            <a href="#" className="text-blue-600 hover:text-blue-500 font-medium">
              Créer un compte
            </a>
          </p>
        </div>
      </div>
    </div>
  );
};

export default LoginForm;