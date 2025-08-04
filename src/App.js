import React from "react"
import UsuariosList from "./components/UsuariosList"
import UsuariosForm from "./components/UsuariosForm"

function App() {

  return (
    <div>
      <h1> GERENCIAMENTO DE USUÁRIOS - UniSENAI </h1>
      <UsuariosForm />
      <UsuariosList />  
    </div>

  );
}

export default App;
