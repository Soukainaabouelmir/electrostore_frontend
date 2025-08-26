import React, { useState } from "react";
import LoginForm from "./LoginForm";
import { useNavigate } from "react-router-dom";

const LoginPage = () => {
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (credentials) => {
    try {
      setError(""); // Reset error state
      
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
        setError("Réponse serveur invalide");
        return;
      }

      if (!response.ok) {
        console.log("Erreur de réponse:", data);
        
        // Gestion des différentes erreurs backend
        if (response.status === 422 && data?.errors) {
          const messages = Object.values(data.errors).flat();
          setError(messages.join(" | "));
        } else if (response.status === 401) {
          setError(data?.message || "Email ou mot de passe incorrect");
        } else if (response.status === 500) {
          setError("Erreur serveur interne");
        } else {
          setError(data?.message || `Erreur ${response.status}`);
        }
        return;
      }

      // ✅ Succès - Stocker le token
      console.log("Connexion réussie:", data);
      
      if (data.access_token) {
        localStorage.setItem("token", data.access_token);
        localStorage.setItem("role", data.user.role);

        // ✅ Redirection
        if (data.user.role === "admin") {
          navigate("/admin/dashboard");
        } else {
          navigate("/pc/gamer");
        }
      } else {
        setError("Token d'accès non reçu");
      }

    } catch (error) {
      console.error("Erreur réseau complète:", error);
      setError("Erreur réseau ou serveur non disponible");
    }
  };

  return (
    <div>
      {/* Affichage d'un message d'erreur si besoin */}
      {error && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4 text-center">
          {error}
        </div>
      )}

      <LoginForm onSubmit={handleLogin} />
    </div>
  );
};

export default LoginPage;