import React, { useState } from "react";
import SignUpForm from "./SignUpForm";
import { useNavigate } from "react-router-dom";

const SignUpPage = () => {
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const navigate = useNavigate();

  const handleSignUp = async (credentials) => {
    try {
      setError("");
      setSuccess("");
      console.log("Tentative d'inscription avec:", credentials);
      const response = await fetch("http://localhost:8000/api/sign-up", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Accept": "application/json",
        },
        body: JSON.stringify({
          name: credentials.name,
          email: credentials.email,
          password: credentials.password,
          password_confirmation: credentials.confirmPassword,
          phone: credentials.phone
        }),
        mode: "cors",
      });

      console.log("Statut de la réponse:", response.status);

  
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
        
        if (response.status === 422 && data?.errors) {
          const messages = Object.values(data.errors).flat();
          setError(messages.join(" | "));
        } else if (response.status === 409) {
          setError(data?.message || "Un compte avec cet email existe déjà");
        } else if (response.status === 500) {
          setError("Erreur serveur interne");
        } else {
          setError(data?.message || `Erreur ${response.status}`);
        }
        return;
      }

      console.log("Inscription réussie:", data);
      
      if (data?.access_token) {

        localStorage.setItem("token", data.access_token);
        localStorage.setItem("role", data.user.role);
        
        setSuccess("Compte créé avec succès ! Redirection...");
        setTimeout(() => {
          if (data.user.role === "admin") {
            navigate("/admin/dashboard");
          } else {
            navigate("/pc/gamer");
          }
        }, 2000);
      } else {
        setSuccess("Compte créé avec succès ! Vous pouvez maintenant vous connecter.");
        setTimeout(() => {
          navigate("/login");
        }, 2000);
      }

    } catch (error) {
      console.error("Erreur réseau complète:", error);
      setError("Erreur réseau ou serveur non disponible");
    }
  };

  return (
    <div>
     
      {error && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4 text-center">
          {error}
        </div>
      )}
      
      {success && (
        <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded mb-4 text-center">
          {success}
        </div>
      )}
      
      <SignUpForm onSubmit={handleSignUp} />
    </div>
  );
};

export default SignUpPage;