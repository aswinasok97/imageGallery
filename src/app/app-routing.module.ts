import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ImageListComponent } from './images/image-list/image-list.component';
import { ImageComponent } from './images/image/image.component';

const routes: Routes = [
  {
    path:'',redirectTo:'image/upload',pathMatch:'full'
  },
  {
    path:'image',component:ImageComponent,children:[{path:'upload',component:ImageComponent},
  {
    path:'list',component:ImageListComponent
  }]
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
