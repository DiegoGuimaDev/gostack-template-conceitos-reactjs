import React, {useState, useEffect} from "react";
import faker from 'faker';
import {criarRepositorio, listarRepositorios, removerRepositorio} from "./services/repositorios";

import "./styles.css";

function App() {

    const [repositorios, setRepositorios] = useState([]);

    useEffect(() => {
        listarRepositorios().then(setRepositorios);
    },[]);

    async function handleAddRepository() {
        try {
            const novoRepositorio = await criarRepositorio(`${faker.name.title()}`);
            setRepositorios([...repositorios, novoRepositorio]);
        } catch (err) {
            alert('Ooops, Não foi possível criar o repositorio');
        }
    }

    async function handleRemoveRepository(id) {
        try {
            await removerRepositorio(id);
            const repositoriosSemElementoRemovido = repositorios
                .filter(repositorio => repositorio.id !== id)

            setRepositorios(repositoriosSemElementoRemovido);
        } catch (err) {
            alert('Oooops, Não foi possível remover o repositorio');
        }
    }

    return (
        <div>
            <ul data-testid="repository-list">
                {repositorios.map(repositorio => (
                    <li key={repositorio.id}>
                        {repositorio.title}

                        <button onClick={() => handleRemoveRepository(repositorio.id)}>
                            Remover
                        </button>
                    </li>
                ))}
            </ul>

            <button onClick={handleAddRepository}>Adicionar</button>
        </div>
    );
}

export default App;
