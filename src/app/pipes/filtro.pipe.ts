import { Pipe, PipeTransform } from '@angular/core';
import { Produto } from '../produtos/compartilhado/produto';

@Pipe({
  name: 'filtro'
})
export class FiltroPipe implements PipeTransform {

  transform(produtos: Produto[], texto:string):Produto[]{
    if (texto.length === 0 ){return produtos;}

    texto = texto.toLocaleLowerCase();

    return produtos.filter(produto => {
      return produto.descricao.toLocaleLowerCase().includes(texto);
    });
  
  }
  }


