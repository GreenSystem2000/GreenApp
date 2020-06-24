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
  },
  {
    path: 'tabs/produtos/comprar/finalizarcarrinho',
    loadChildren: () => import('./produtos/finalizarcarrinho/finalizarcarrinho.module').then( m => m.FinalizarcarrinhoPageModule)
  },
  {
    path: 'minhas-compras',
    loadChildren: () => import('./autenticar/minhas-compras/minhas-compras.module').then( m => m.MinhasComprasPageModule)
  },
  {
    path: 'tabs/produtos/comprar/finalizarcarrinho/concluido',
    loadChildren: () => import('./produtos/concluido/concluido.module').then( m => m.ConcluidoPageModule)
  },
  {
    path: 'cancela-pedido',
    loadChildren: () => import('./autenticar/cancela-pedido/cancela-pedido.module').then( m => m.CancelaPedidoPageModule)
  },
  {
    path: 'envia-feedback',
    loadChildren: () => import('./autenticar/envia-feedback/envia-feedback.module').then( m => m.EnviaFeedbackPageModule)
  }
];
@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
