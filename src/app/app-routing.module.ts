import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path        : '',
    loadChildren: () => import('./tabs/tabs.module').then(m => m.TabsPageModule)
  },
  {
    path        : 'criar-conta',
    loadChildren: () => import('./autenticar/criar-conta/criar-conta.module').then( m => m.CriarContaPageModule)
  },
  {
    path        : 'login',
    loadChildren: () => import('./autenticar/login/login.module').then( m => m.LoginPageModule)
  },
  {
    path        : 'lista-produtos',
    loadChildren: () => import('./produtos/lista-produtos/lista-produtos.module').then( m => m.ListaProdutosPageModule)
  },
  
  
  {
    path        : 'about',
    loadChildren: () => import('./about/about/about.module').then( m => m.AboutPageModule)
  },
  {
    path        : 'produto-detalhes',
    loadChildren: () => import('./produtos/produto-detalhes/produto-detalhes.module').then( m => m.ProdutoDetalhesPageModule)
  },
  {
    path        : 'minha-conta',
    loadChildren: () => import('./autenticar/minha-conta/minha-conta.module').then( m => m.MinhaContaPageModule)
  },
  {
    path        : 'tabs/produtos/comprar',
    loadChildren: () => import('./produtos/comprar/comprar.module').then( m => m.ComprarPageModule)
  }
];
@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
