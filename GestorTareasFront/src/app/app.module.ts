import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';

// Librería para poder consumir el servicio
import { HttpModule, } from '@angular/http';
import { HttpClientModule, } from '@angular/common/http';
import { RouterModule, Routes} from '@angular/router';
import { FormsModule, ReactiveFormsModule  } from '@angular/forms';


import{ServCatalogoService} from './serv-catalogo.service';

import { AppComponent } from './app.component';
import { CatalogoUniversalComponent } from './catalogo-universal/catalogo-universal.component';
import { PersonaComponent } from './persona/persona.component';


const appRoutes: Routes = 
[
  {
    path: '',
    pathMatch: 'prefix',
    redirectTo: 'Inicio'
  },
  {
    path: 'Inicio',
    component:CatalogoUniversalComponent,
  },
  
  {
    path: 'Persona',
    component:PersonaComponent
  }
  
  
];
  
//--------------------------------------------------------------

@NgModule
({
  declarations: 
  [
    AppComponent,
    CatalogoUniversalComponent,
    PersonaComponent
  ],
  imports: 
  [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpModule,
    RouterModule.forRoot(appRoutes), // se agregan estos 
    HttpClientModule  // <- Agregar la clase    
  ],
  providers: [ServCatalogoService],
  bootstrap: [AppComponent]
})


export class AppModule { }