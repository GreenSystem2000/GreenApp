import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TabsPage } from './tabs.page';

const routes: Routes = [
  {
    path     : 'tabs',
    component: TabsPage,
    children : [
      {
        path    : 'produtos',
        children: [
          {
            path        : '',
            loadChildren: () => import ('./../produtos/lista-produtos/lista-produtos.module').then(m => m.ListaProdutosPageModule)
          },
          {
            path        : 'produto-detalhes/:produtoId',
            loadChildren: () => import ('./../produtos/produto-detalhes/produto-detalhes.module').then(m => m.ProdutoDetalhesPageModule)  
          },
        ]
      },
      {
        path    : 'minhaconta',
        children: [
          {
            path        : '',
            loadChildren: () => import ('../autenticar/minha-conta/minha-conta.module').then(m => m.MinhaContaPageModule)  
          }
        ]
      },
      {
        path    : 'produtos/comprar',
        children: [
          {
            path        : '',
            loadChildren: () => import ('../produtos/comprar/comprar.module').then(m => m.ComprarPageModule)   
          }
        ]
      },
      {
        path    : 'about',
        children: [
          {
            path        : '',
            loadChildren: () => import ('../about/about/about.module').then(m => m.AboutPageModule)    
          }
        ]
      },
      {
        path      : '',
        redirectTo: '/tabs/produtos',
        pathMatch : 'full'
      }
    ]
  },
  {
    path      : '',
    redirectTo: '/tabs/produtos',
    pathMatch : 'full'
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TabsPageRoutingModule {}
