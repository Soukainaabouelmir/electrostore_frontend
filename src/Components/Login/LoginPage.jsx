import React, { useState } from "react";
import LoginForm from "./LoginForm";
import { useNavigate } from "react-router-dom";
import { AlertCircle, CheckCircle, X } from "lucide-react";

const LoginPage = () => {
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (credentials) => {
    try {
      setError(""); // Reset error state
      setSuccess(""); // Reset success state
      
      console.log("Tentative de connexion avec:", credentials);
      
      const response = await fetch("http://localhost:8000/api/login", {
        method: "POST",
        headers: { 
          "Content-Type": "application/json",
          "Accept": "application/json", // Important pour Laravel
        },
        body: JSON.stringify(credentials),
        mode: "cors",
      });

      console.log("Statut de la réponse:", response.status);
      console.log("Headers de la réponse:", response.headers);

      // Toujours essayer de parser le JSON
      let data = null;
      try {
        const responseText = await response.text();
        console.log("Réponse brute:", responseText);
        
        if (responseText) {
          data = JSON.parse(responseText);
        }
      } catch (parseError) {
        console.error("Erreur de parsing JSON:", parseError);
        setError("Réponse serveur invalide. Veuillez réessayer.");
        return;
      }

      if (!response.ok) {
        console.log("Erreur de réponse:", data);
        
        // Gestion des différentes erreurs backend avec messages personnalisés
        if (response.status === 422 && data?.errors) {
          const messages = Object.values(data.errors).flat();
          setError(`Erreur de validation : ${messages.join(" | ")}`);
        } else if (response.status === 401) {
          setError("Email ou mot de passe incorrect. Veuillez vérifier vos identifiants.");
        } else if (response.status === 429) {
          setError("Trop de tentatives de connexion. Veuillez patienter quelques minutes.");
        } else if (response.status === 500) {
          setError("Erreur serveur interne. Nos équipes techniques ont été notifiées.");
        } else if (response.status === 503) {
          setError("Service temporairement indisponible. Veuillez réessayer plus tard.");
        } else {
          setError(data?.message || `Erreur de connexion (${response.status}). Veuillez réessayer.`);
        }
        return;
      }

      // ✅ Succès - Stocker le token et les informations utilisateur
      console.log("Connexion réussie:", data);
      
      if (data.access_token && data.user) {
        // Afficher un message de succès temporaire
        setSuccess(`Bienvenue ${data.user.name} ! Redirection en cours...`);
        
        localStorage.setItem("token", data.access_token);
        localStorage.setItem("role", data.user.role);
        localStorage.setItem("userName", data.user.name);
        localStorage.setItem("userEmail", data.user.email || credentials.email);

        // ✅ Redirection avec délai pour montrer le message de succès
        setTimeout(() => {
          if (data.user.role === "admin") {
            navigate("/admin/dashboard");
          } else {
            // Redirection vers la page d'accueil pour les clients
            navigate("/");
          }
        }, 1500);
      } else {
        setError("Données de connexion incomplètes. Veuillez réessayer.");
      }

    } catch (error) {
      console.error("Erreur réseau complète:", error);
      if (error.name === 'TypeError' && error.message.includes('fetch')) {
        setError("Impossible de se connecter au serveur. Vérifiez votre connexion internet.");
      } else {
        setError("Une erreur inattendue s'est produite. Veuillez réessayer.");
      }
    }
  };

  const closeError = () => {
    setError("");
  };

  const closeSuccess = () => {
    setSuccess("");
  };

  return (
    <div className="relative">
      {/* Message d'erreur */}
      {error && (
        <div className="fixed top-4 left-1/2 transform -translate-x-1/2 z-50 w-full max-w-md">
          <div className="bg-red-50 dark:bg-red-900/50 border border-red-200 dark:border-red-800 rounded-lg p-4 shadow-lg animate-slide-down">
            <div className="flex items-start">
              <AlertCircle className="w-5 h-5 text-red-500 dark:text-red-400 mt-0.5 mr-3 flex-shrink-0" />
              <div className="flex-1">
                <h3 className="text-sm font-semibold text-red-800 dark:text-red-200 mb-1">
                  Erreur de connexion
                </h3>
                <p className="text-sm text-red-700 dark:text-red-300">
                  {error}
                </p>
              </div>
              <button
                onClick={closeError}
                className="ml-3 text-red-400 hover:text-red-600 dark:hover:text-red-300 transition-colors"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Message de succès */}
      {success && (
        <div className="fixed top-4 left-1/2 transform -translate-x-1/2 z-50 w-full max-w-md">
          <div className="bg-green-50 dark:bg-green-900/50 border border-green-200 dark:border-green-800 rounded-lg p-4 shadow-lg animate-slide-down">
            <div className="flex items-start">
              <CheckCircle className="w-5 h-5 text-green-500 dark:text-green-400 mt-0.5 mr-3 flex-shrink-0" />
              <div className="flex-1">
                <h3 className="text-sm font-semibold text-green-800 dark:text-green-200 mb-1">
                  Connexion réussie
                </h3>
                <p className="text-sm text-green-700 dark:text-green-300">
                  {success}
                </p>
              </div>
              <button
                onClick={closeSuccess}
                className="ml-3 text-green-400 hover:text-green-600 dark:hover:text-green-300 transition-colors"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      )}

      <LoginForm onSubmit={handleLogin} />

      {/* Styles pour l'animation */}
      <style jsx>{`
        @keyframes slide-down {
          from {
            opacity: 0;
            transform: translateX(-50%) translateY(-100%);
          }
          to {
            opacity: 1;
            transform: translateX(-50%) translateY(0);
          }
        }
        
        .animate-slide-down {
          animation: slide-down 0.3s ease-out;
        }
      `}</style>
    </div>
  );
};

export default LoginPage;