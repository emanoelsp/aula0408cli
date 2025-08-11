import axios from 'axios';
import { useEffect, useState } from 'react';

function UsuariosList({ atualizar }) {
    const [usuarios, setUsuarios] = useState([])
    const [editandoID, setEditandoID] = useState(null)
    const [nomeEditado, setNomeEditado] = useState("")

    const fetchUsuarios = async () => {
        const res = await axios.get('http://localhost:3000/usuarios');
        setUsuarios(res.data);
    }

    useEffect(() => {
        fetchUsuarios();
    }, [atualizar]);

    const deletaUsuario = async (id) => {
        await axios.delete(`http://localhost:3000/usuarios/${id}`)
        setUsuarios(usuarios.filter(usuario => usuario.id !== id))
    }

    const editaUsuario = (usuario) => {
        setEditandoID(usuario.id)
        setNomeEditado(usuario.nome)
    }

    const cancelaEdicao = () => {
        setEditandoID(null)
        setNomeEditado("")
    }

    const salvaEdicao = async (id) => {
        if (!nomeEditado.trim()) return;

        const res = await axios.put(`http://localhost:3000/usuarios/${id}`, {
            nome: nomeEditado
        })

        const usuarioAtualizado = res.data

        const novaLista = usuarios.map(usuario => 
            usuario.id === id ? usuarioAtualizado : usuario
        )
        setUsuarios(novaLista)
        setEditandoID(null)
        setNomeEditado("")
    }

    return (
        <div>
            <h3>Usuários cadastrados:</h3>
            {usuarios.length > 0 ? (
                <ul>
                    {usuarios.map((usuario) => (
                        <li key={usuario.id}>
                            {editandoID === usuario.id ? (
                                <>
                                    <input
                                        type="text"
                                        value={nomeEditado}
                                        onChange={e => setNomeEditado(e.target.value)}
                                    />
                                    <button onClick={() => salvaEdicao(usuario.id)}>
                                        Salvar edição
                                    </button>
                                    <button onClick={cancelaEdicao}>
                                        Cancelar edição
                                    </button>
                                </>
                            ) : (
                                <>
                                    ID: {usuario.id} - Nome: {usuario.nome}
                                    <button onClick={() => editaUsuario(usuario)}>
                                        Editar
                                    </button>
                                    <button onClick={() => deletaUsuario(usuario.id)}>
                                        Excluir
                                    </button>
                                </>
                            )}
                        </li>
                    ))}
                </ul>
            ) : (
                <p>Não há dados</p>
            )}
        </div>
    );
}

export default UsuariosList;