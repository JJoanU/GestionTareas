import { Component } from '@angular/core';

import { FormGroup, FormBuilder, FormControl, Validators, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';

import { ServCatalogoService } from '../serv-catalogo.service';
@Component({
  selector: 'app-persona',
  templateUrl: './persona.component.html',
  styleUrls: ['./persona.component.css']
})
export class PersonaComponent {
  Personas: any=[];
  tituloPersonas="";
  TablaPersonas: any=[];
 
  Persona: any=[];
  TituloPersona="";
  TabBusPersona: any=[];
  comboListarPersona: any=[];
 
  TituloPersonaEdit= "";
  MiPersonaE: any=[];
  comboEditarPersona: any=[];
 
  title= "MANEJO DE PERSONAS";
  controlLista=1;
  BuscarEvalor=1;
 
  Equipo: any=[];
  TituloEquipo="";
  TabBusEquipo: any=[];
  comboListarEquipo: any=[];
 
  TipDoc: any=[];
  TituloTipDoc="";
  TabBusTipDoc: any=[];
  comboListarTipDoc: any=[];

  ListaPersonas= new FormGroup(
    {
 
    }
  );


  FiltrarPersonas=new FormGroup(
    {
      combofiltro: new FormControl()
    }
  );

  InsertarGPersonas = new FormGroup(
    {
      textTipoDocumento: new FormControl(),
      textNumDocumento: new FormControl(),
      textNombre1: new FormControl(),
      textNombre2: new FormControl(),
      textNombre3: new FormControl(),
      textApellido1: new FormControl(),
      textApellido2: new FormControl(),
      textTipoUsuario: new FormControl(),
      textEps: new FormControl()
    }
  );

  ActualizarAPersona= new FormGroup(
    {
      BuscarIdPersona: new FormControl(),
      textnuevoTipoDocumento: new FormControl(),
      textTipoDocumento: new FormControl(),
      textNumDocumento: new FormControl(),
      textNombre1: new FormControl(),
      textNombre2: new FormControl(),
      textNombre3: new FormControl(),
      textApellido1: new FormControl(),
      textApellido2: new FormControl(),
      textTipoUsuario: new FormControl(),
      textEps: new FormControl()
    }
  );
  constructor(
    private formBuilder: FormBuilder,
    private servi: ServCatalogoService,
    Router: Router
  ){}
  public LimpiarLista()
  {
    this.controlLista=0;
  }

  public buscarPersona(){
    var filtovalor= this.FiltrarPersonas.getRawValue()['combofiltro'];
    this.servi.getPersona('/'+filtovalor).subscribe((data:{})=>{
     this.Persona=data;
     this.TituloPersona= "PERSONA SELECCIONADA";
     this.TabBusPersona[0]="Identificador";
     this.TabBusPersona[2]="Numero de Documento";
     this.TabBusPersona[3]="Primer nombre";
     this.TabBusPersona[4]="Segundo nombre";
     this.TabBusPersona[5]="Tercer nombre";
     this.TabBusPersona[6]="Primer apellido";
     this.TabBusPersona[7]="Segundo apellido";
     this.TabBusPersona[8]="Genero";

  },
  error=>{console.log(error)});
  }

  public ActualizarPersona(){

  }
  public consultaPersona(){

  }
  public consultaDocumento(){

  }
  

  
}

