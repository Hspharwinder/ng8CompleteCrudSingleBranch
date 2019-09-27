import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { AppComponent } from './app.component';
import { UpdateComponent } from './update/update.component';
import { InsertComponent } from './insert/insert.component';

const routes: Routes = [
  { path: '',  redirectTo: '/home',  pathMatch: 'full' },  
  { path: 'home',  component: HomeComponent }, 
  { path: 'app',  component: AppComponent }, 
  { path: 'update/:id',  component: UpdateComponent },
  { path: 'insert',  component: InsertComponent },
  // { path: '**', component: PageNotFoundComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})

export class AppRoutingModule { }
export const nav = [HomeComponent,AppComponent,UpdateComponent, InsertComponent];
