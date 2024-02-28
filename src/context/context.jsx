import React, { createContext, useState } from 'react';

// Crie um contexto
const AuthContext = createContext();

// Crie um provedor para o contexto
const AuthContextProvedor = ({ children }) => {
  const [token, setToken] = useState('');

  return (
    <AuthContext.Provider value={{ token, setToken }}>
      {children}
    </AuthContext.Provider>
  );
};

export { AuthContext, AuthContextProvedor };