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
                path: '',
               
                loadChildren: '../produtos/lista-produtos/lista-produtos.module#ListaProdutosPageModule'
              },

              {
                path: 'produto-detalhes/:produtoId',
               
                loadChildren: '../produtos/produto-detalhes/produto-detalhes.module#ProdutoDetalhesPageModule'
                  
              },


            ]
          },


          
      {
        path    : 'minhaconta',
        children: [
          {
            path        : '',
            loadChildren: '../autenticar/minha-conta/minha-conta.module#MinhaContaPageModule'
              
          },
        ]
      },



      {
        path    : 'produtos/comprar',
        children: [
          {
            path        : '',
            loadChildren: '../produtos/comprar/comprar.module#ComprarPageModule'
              
          },
        ]
      },

      {
        path    : 'about',
        children: [
          {
            path        : '',
            loadChildren: '../about/about/about.module#AboutPageModule'
            
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
