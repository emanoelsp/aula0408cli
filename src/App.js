import UsuariosList from "./components/UsuariosList";
import UsuariosForm from "./components/UsuariosForm";
import { useState } from "react";

function App() {
  const [usuarioAtualizados, setUsuariosAtualizados] = useState(false);

  const handleAtualizaLista = () => {
    setUsuariosAtualizados((prev) => !prev)
  }

  return (
    <div>
      <h1>GERENCIAMENTO DE USUÁRIOS</h1>
      <UsuariosForm onUsuarioAdicionado={handleAtualizaLista}/>
      <UsuariosList atualizar={usuarioAtualizados}/>
    </div>
  );
}

export default App;