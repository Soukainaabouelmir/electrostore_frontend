import React, { useState, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "./AuthContext"; 
import LoginForm from "./LoginForm";
import AlertMessage from "./AlertMessage";
const API_BASE_URL = 'http://localhost:8000/api';

const ERROR_MESSAGES = {
  422: "Données invalides. Vérifiez vos informations.",
  401: "Email ou mot de passe incorrect.",
  429: "Trop de tentatives. Patientez quelques minutes.",
  500: "Erreur serveur. Nos équipes ont été notifiées.",
  503: "Service indisponible. Réessayez plus tard.",
  network: "Problème de connexion. Vérifiez votre internet.",
  parse: "Réponse serveur invalide. Réessayez.",
  incomplete: "Données de connexion incomplètes.",
  default: "Erreur inattendue. Réessayez."
};

const LoginPage = () => {
  const [alert, setAlert] = useState({ show: false, type: '', title: '', message: '' });
  const navigate = useNavigate();
  const { login } = useAuth(); 

  const showAlert = useCallback((type, title, message) => {
    setAlert({ show: true, type, title, message });
  }, []);

  const hideAlert = useCallback(() => {
    setAlert(prev => ({ ...prev, show: false }));
  }, []);

  const handleApiResponse = useCallback(async (response) => {
    let data = null;
    try {
      const responseText = await response.text();
      if (responseText) {
        data = JSON.parse(responseText);
      }
    } catch (parseError) {
     
      throw new Error('parse');
    }

    if (!response.ok) {
      const errorKey = ERROR_MESSAGES[response.status] ? response.status : 'default';
      throw new Error(ERROR_MESSAGES[errorKey]);
    }

    return data;
  }, []);

  const handleLogin = useCallback(async (credentials) => {
    try {
      hideAlert();
      
      const response = await fetch(`${API_BASE_URL}/login`, {
        method: "POST",
        headers: { 
          "Content-Type": "application/json",
          "Accept": "application/json"
        },
        body: JSON.stringify({
          email: credentials.email,
          password: credentials.password
        }),
        mode: "cors"
      });

      const data = await handleApiResponse(response);
      
      if (!data?.access_token || !data?.user) {
        throw new Error('incomplete');
      }

      login(data);

      showAlert('success', 'Connexion réussie', 
        `Bienvenue ${data.user.name} ! Redirection en cours...`);

      setTimeout(() => {
        const redirectPath = data.user.role === "admin" ? "/admin/dashboard" : "/";
        navigate(redirectPath, { replace: true });
      }, 1500);

    } catch (error) {
      
      let errorMessage = ERROR_MESSAGES.default;
      if (error.message === 'network' || error.name === 'TypeError') {
        errorMessage = ERROR_MESSAGES.network;
      } else if (ERROR_MESSAGES[error.message]) {
        errorMessage = ERROR_MESSAGES[error.message];
      }
      
      showAlert('error', 'Erreur de connexion', errorMessage);
    }
  }, [handleApiResponse, hideAlert, showAlert, navigate, login]);

  return (
    <>
      {alert.show && (
        <AlertMessage
          type={alert.type}
          title={alert.title}
          message={alert.message}
          onClose={hideAlert}
        />
      )}
     
      <LoginForm onSubmit={handleLogin} />
      <style jsx>{`
        @keyframes slideDown {
          from {
            opacity: 0;
            transform: translateX(-50%) translateY(-20px);
          }
          to {
            opacity: 1;
            transform: translateX(-50%) translateY(0);
          }
        }
        .animate-slideDown {
          animation: slideDown 0.3s ease-out forwards;
        }
      `}</style>
    </>
  );
};

export default LoginPage;