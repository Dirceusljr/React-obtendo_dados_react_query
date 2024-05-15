import { useQuery } from '@tanstack/react-query'
import { AbBotao, AbGrupoOpcao, AbGrupoOpcoes, AbInputQuantidade } from 'ds-alurabooks'
import { useState } from 'react'
import { useParams } from 'react-router-dom'
import { ILivro } from '../../interfaces/ILivro'
import { obterLivro } from '../../http'
import Loader from '../../componentes/Loader'
import { formatadorReal } from '../../utils/formatadorReal'
import TituloPrincipal from '../../componentes/TituloPrincipal'
import SobreAutor from '../../componentes/SobreAutor'
import BlocoSobre from '../../componentes/BlocoSobre'
import './Livro.css'

const Livro = () => {

  const params = useParams()

  const [opcao, setOpcao] = useState<AbGrupoOpcao>()

  const { data: livro, isLoading} = useQuery<ILivro | null>(['livro', params.slug], () => obterLivro(params.slug || ''))

  if(isLoading || !livro) {
    return <Loader />
  }

  const opcoes: AbGrupoOpcao[] = livro.opcoesCompra ? livro.opcoesCompra.map(opcao => ({
    id: opcao.id,
    corpo: formatadorReal.format(opcao.preco),
    titulo: opcao.titulo,
    rodape: opcao.formatos ? opcao.formatos.join(',') : ''
  }))
    : []

  return (
    <section className="livroDetalhe">
      <TituloPrincipal 
        texto='Detalhes do Livro'
      />
      <div >
        <div className="container">
          <figure>
            <img src={livro.imagemCapa} alt={livro.descricao} />
          </figure>
          <div className="detalhes">
            <h2>{livro.titulo}</h2>
            <p>{livro.descricao}</p>
            <h3>Selecione o formato do seu livro:</h3>
            <div className="opcoes">
              <AbGrupoOpcoes 
                opcoes={opcoes}
                onChange={setOpcao}
                valorPadrao={opcao}
              />
            </div>
            <p><strong>*Você terá acesso às futuras atualizações do livro.</strong></p>
            <footer>
              <div className="qtdContainer">
                <AbInputQuantidade />
              </div>
              <div>
                <AbBotao 
                  texto='Comprar'
                />
              </div>
            </footer>
          </div>
        </div>
        <div>
          <SobreAutor 
            autorId={livro.autor}
          />
          <BlocoSobre 
            titulo='Sobre o livro'
            corpo={livro.sobre}
          />
        </div>
      </div>
    </section>
  )
}

export default Livro