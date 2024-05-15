import React from 'react'
import { ICategoria } from '../../interfaces/ICategoria'
import { useQuery } from '@tanstack/react-query'
import { obterLivroPorCategoria } from '../../http'
import CardLivro from '../CardLivro'
import './ListaLivros.css'

interface ListaLivrosProps {
    categoria: ICategoria
}

const ListaLivros = ({ categoria }  : ListaLivrosProps) => {

const { data: livros } = useQuery(['buscaLivroPorCategora', categoria], () => {
      return obterLivroPorCategoria(categoria)
    })
  return (<section className='listaLivros'>
    {livros?.map(livro => <CardLivro livro={livro} key={livro.id} />) }
  </section>
  )
}

export default ListaLivros