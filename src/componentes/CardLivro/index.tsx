import React from "react";
import { ILivro } from "../../interfaces/ILivro";
import { formatadorReal } from "../../utils/formatadorReal";
import { AbBotao } from "ds-alurabooks";
import { Link } from "react-router-dom";

import './CardLivro.css'

interface CardLivroProps {
  livro: ILivro;
}

const obterValorMinimo = ( livro: ILivro) => {
  return Math.min(...livro.opcoesCompra.map(op => op.preco));
}
const CardLivro = ({ livro }: CardLivroProps) => {


// Minha solução
  // return (
  //   <div className="cardContainer" key={livro.id}>
  //     <figure>
  //       <img
  //         src={livro.imagemCapa}
  //         alt={`Capa do livro ${livro.titulo} escrito por ${livro.autor}`}
  //       />
  //     </figure>
  //     <h2>{livro.titulo}</h2>
  //     <div className="preco">
  //       <em>A partir de:</em>
  //       <strong>{formatadorReal.format(obterValorMinimo(livro))}</strong>
  //     </div>
  //     <Link to={`/livro/${livro.slug}`}>
  //       <AbBotao texto="Comprar" />
  //     </Link>
  //   </div>
  // );

return (<div className="livro" key={livro.id}>
        <img src={livro.imagemCapa} alt={livro.descricao} />
        <ul>
            <li>
                <strong>{livro.titulo}</strong>
            </li>
            <li>
                A partir de: <strong>{formatadorReal.format(obterValorMinimo(livro))}</strong>
            </li>
            <li className="link-container">
                <Link to={`/livro/${livro.slug}`}>
                    <AbBotao texto="Comprar" />
                </Link>
            </li>
        </ul>
    </div>)
}

export default CardLivro;
