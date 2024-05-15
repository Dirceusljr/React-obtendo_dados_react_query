import axios from "axios";
import { ICategoria } from "../interfaces/ICategoria";
import { ILivro } from "../interfaces/ILivro";
import { IAutor } from "../interfaces/IAutor";

const http = axios.create({
    baseURL: 'http://localhost:8000',
    headers: {
        Accept: 'application/json',
        Content: 'application/json'
    }
})

http.interceptors.request.use(function (config) {
    // Do something before request is sent
    const token = sessionStorage.getItem('token')
    if (token && config.headers) {
        config.headers.Authorization = `Bearer ${token}`
    }
    return config;
  }, function (error) {
    // Do something with request error
    console.log('Erro no interceptor do axios')
    return Promise.reject(error);
  });

export default http

export const obterCategoriaPorSlug = async ( slug: string) => {
  const resposta = await http.get<ICategoria[]>('categorias', {
    params: {
      slug
    }
  })

  return resposta.data[0]
}

export const obterLivrosDetaques = async (tipo: string) => {
  const resposta = await http.get<ILivro[]>(`public/${tipo}`)

  return resposta.data
}

export const obterLivroPorCategoria = async ( categoria: ICategoria) => {
  const resposta = await http.get<ILivro[]>('livros', {
    params: {
      categoria: categoria.id
    }
  })

  return resposta.data
}

export const obterLivro = async ( slug: string) => {
  const resposta = await http.get<ILivro[]>('livros', {
    params: {
      slug
    }
  })
  return resposta.data[0]
}

export const obterAutor = async ( autorId: number) => {
  const resposta = await http.get<IAutor>(`autores/${autorId}`)
  return resposta.data
  }