import api from './api';

export function listarRepositorios() {
    return api.get('/repositories').then(response => response.data);
}

export function criarRepositorio(title) {
    return api.post('/repositories',{
        title: title
    }).then(response => response.data)
}

export function removerRepositorio(id) {
    return api.delete(`/repositories/${id}`);
}
