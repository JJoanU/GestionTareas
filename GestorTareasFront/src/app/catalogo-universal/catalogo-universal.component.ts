import { Component, OnInit } from '@angular/core';

import { FormGroup, FormBuilder, FormControl, Validators, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';

import { ServCatalogoService } from '../serv-catalogo.service';

@Component({
  selector: 'app-catalogo-universal',
  templateUrl: './catalogo-universal.component.html',
  styleUrls: ['./catalogo-universal.component.css']
})

export class CatalogoUniversalComponent {
  //LAS VARIABLES 
  title = "CATALOGO UNIVERSAL";    //Titulo dela página
  tituloCataUniLista = "";             //Titulo Lista de todos los catalogos
  titloCataUniBuscado = "";                //Titulo de Color Buscado
  titloCataUniEditar = "";          //Titulo de Color a Editar



  CataUniT: any = [];               //Lista de todos los catalogos
  CataUniCatalogo: any = [];        //Lista catalogo Catalogo
  CataUniColor: any = [];           //Lista catalogo Color
  CataUniTipVehi: any = [];         //Lista catalogo TiposVehiculos
  CataUniMarca: any = [];           //Lista catalogo Marca
  CataUniTipDoc: any = [];          //Lista catalogo Tipos de Documntos
  CataUniEps: any = [];             //Lista catalogo Eps
  CataUniPrefSexual: any = [];      //Lista catalogo Preferencias Sexuales

  CataUniCatalogoSel: any = [];        //Lista catalogo Catalogo selecionado
  CataUniColorSel: any = [];           //Lista el color selecionado
  CataUniTipVehiSel: any = [];         //Lista catalogo TiposVehiculos selecionado
  CataUniMarcaSel: any = [];           //Lista catalogo Marca selecionado
  CataUniTipDocSel: any = [];          //Lista catalogo Tipos de Documntos selecionado
  CataUniEpsSel: any = [];             //Lista catalogo Eps selecionado
  CataUniPrefSexualSel: any = [];      //Lista catalogo Preferencias Sexuales selecionado

  tablacatalogosstotales: any = [];          //Encabezados tabla catalogos totales
  /*
   MiCataUni: any = [];             //Un valor de un catalogo Buscado
   CataUniMod: any = [];            //Valor Catalogo a Editar 
   combListaColores: any =[];      //Combo Buscar Color
   combEditarColores: any =[];     //Combo Editar Color
  
  
   tabbuscarColor:any = [];        //Encabezados tabla Color Buscado
  */


  //*****************************************************************************
  //Form group  //Grupo para la lista de Colores
  ListarCatTotales = new FormGroup
    (
      {

      }
    );

  //Grupo para formulariomostrar catalogo de Catalogos
  CBCatalogoCatalogo = new FormGroup
    (
      {
        CatCatalogofiltro: new FormControl(),
        textCatalogo: new FormControl()
      }
    );

  //Grupo para formulariomostrar catalogo colores
  CBCatalogoColor = new FormGroup
    (
      {
        CatColorfiltro: new FormControl(),
        textColor: new FormControl()
      }
    );

  //Grupo para formulariomostrar catalogo Tipos de Vehículos
  CBCatalogoTipVehi = new FormGroup
    (
      {
        CatTipVehifiltro: new FormControl(),
        textTivVehi: new FormControl()
      }
    );

  //Grupo para formulariomostrar catalogo Marca
  CBCatalogoMarca = new FormGroup
    (
      {
        CatMarcafiltro: new FormControl(),
        textMarca: new FormControl()
      }
    );

  //Grupo para formulariomostrar catalogo Tipos de Documentos
  CBCatalogoTipDoc = new FormGroup
    (
      {
        CatTipDocfiltro: new FormControl(),
        textTivDoc: new FormControl()
      }
    );

  //Grupo para formulariomostrar catalogo EPS
  CBCatalogoEps = new FormGroup
    (
      {
        CatEpsfiltro: new FormControl(),
        textEps: new FormControl()
      }
    );

  //Grupo para formulariomostrar catalogo PrefSexual
  CBCatalogoPrefSexual = new FormGroup
    (
      {
        CatPrefSexualfiltro: new FormControl(),
        textPrefSexual: new FormControl()
      },
    );

  CrearCatalogoU = new FormGroup
    (
      {
        textNueDenominacion: new FormControl(),
        textNueTipoCat: new FormControl(),
        CBTipoCatalogo: new FormControl()
      }
    );
  
       ActCatalogoU = new FormGroup
       (
        {
          CBCatalogoEdi: new FormControl(),
          textNueDenominacionEdi: new FormControl(),
          textNueTipoCatEdi: new FormControl(),
          CBTipoCatalogoEdi: new FormControl()
        }
       );
       CataUniCataEdi = new FormGroup
       (
        {
          CBCatalogoEdi: new FormControl(),
          textNueDenominacionEdi: new FormControl(),
          textNueTipoCatEdi: new FormControl(),
          CBTipoCatalogoEdi: new FormControl()
        }
       );
  


  //*****************************************************************************
  //ListarCatTotales: FormGroup;       
  //filtrarColor: FormGroup;        //Grupo para formulario de buscar un Color
  //InsertarGColor: FormGroup;      //Grupo para crear un Color
  //ActualizarAColor: FormGroup;    //Grupo para editar un Color

  BuscarEvalor = 1;               //Control para carga del valor a buscar
  controlLista = 1;               //Control para limpiar la lista

  //------------------------------------------------------

  constructor
    (
      private formBuilder: FormBuilder,
      private servi: ServCatalogoService,
      Router: Router
    ) { }


  //=============================================================
  //LOS CRUD
  //=============================================================
  //Lista de todos los catalogos

  public consultaCatalogosTotales() {
    if (this.controlLista == 1) {
      this.servi.getCatalogoTotal().subscribe((data: { catalogouiversal: [] }) => {

        this.CataUniT = data;  //JSON.parse(data);
        this.tituloCataUniLista = "LISTA DE TODOS LOS CATALOGOS";
        this.tablacatalogosstotales[0] = "Id";
        this.tablacatalogosstotales[1] = "Denominación";
        this.tablacatalogosstotales[2] = "Catalogo";
        this.tablacatalogosstotales[3] = "LLaveForanea";
      },
        error => { console.error(error + " ") });
    }
    else {
      this.CataUniT = null;
      this.tituloCataUniLista = "";
      this.tablacatalogosstotales[0] = "";
      this.tablacatalogosstotales[1] = "";
      this.tablacatalogosstotales[2] = "";
      this.tablacatalogosstotales[3] = "";
      this.controlLista = 1;
    }

  }

  //--------------------------------------------------------------------------------------------->
  //para Limpiar la lista

  public LimpiarLista() {
    this.controlLista = 0;
  }

  // -----------------------------------------------------------------------------------------
  // Listar un solo tipo de Catalogo
  //--------------------------------------------------------------
  //Consulta un color por medio de su id.

  public ListarCatalogoE(catip: any) {

    //var catipo = catip;
    //var filtoCatalogo = this.CBCatalogoColor.getRawValue()['CatColorfiltro'];

    this.servi.getlListCatologoEsp('/' + catip).subscribe((data: {}) => {
      if (catip == 1) {
        this.CataUniCatalogo = data;
      }
      else if (catip == 2) {
        this.CataUniColor = data;
      }
      else if (catip == 3) {
        this.CataUniTipVehi = data;
      }
      else if (catip == 4) {
        this.CataUniMarca = data;
      }
      else if (catip == 5) {
        this.CataUniTipDoc = data;
      }
      else if (catip == 6) {
        this.CataUniEps = data;
      }
      else //if(catip == 7)
      {
        this.CataUniPrefSexual = data;
      }

    },
      error => { console.log(error) });

  }


  //--------------------------------------------------------------
  //Consulta un color por medio de su id.

  public SelecCatalogoE(catip: any, catselec: any) {

    if (this.BuscarEvalor != 0) {
      if (catip == 1) {
        this.BuscarEvalor = this.CBCatalogoCatalogo.getRawValue()['CatCatalogofiltro'];
      }
      else if (catip == 2) {
        this.BuscarEvalor = this.CBCatalogoColor.getRawValue()['CatColorfiltro'];
      }
      else if (catip == 3) {
        this.BuscarEvalor = this.CBCatalogoTipVehi.getRawValue()['CatTipVehifiltro'];
      }
      else if (catip == 4) {
        this.BuscarEvalor = this.CBCatalogoMarca.getRawValue()['CatMarcafiltro'];
      }
      else if (catip == 5) {
        this.BuscarEvalor = this.CBCatalogoTipDoc.getRawValue()['CatTipDocfiltro'];
      }
      else if (catip == 6) {
        this.BuscarEvalor = this.CBCatalogoEps.getRawValue()['CatEpsfiltro'];
      }
      else //if(catip ==7)
      {
        this.BuscarEvalor = this.CBCatalogoPrefSexual.getRawValue()['CatPrefSexualfiltro'];
      }

    }
    catselec = this.BuscarEvalor;


    this.servi.getlListCatologoEsp('/' + catip + '/' + catselec).subscribe((data: {}) => {

      if (catip == 1) {
        this.CataUniCatalogoSel = data;
      }
      else if (catip == 2) {
        this.CataUniColorSel = data;
      }
      else if (catip == 3) {
        this.CataUniTipVehiSel = data;
      }
      else if (catip == 4) {
        this.CataUniMarcaSel = data;
      }
      else if (catip == 5) {
        this.CataUniTipDocSel = data;
      }
      else if (catip == 6) {
        this.CataUniEpsSel = data;
      }
      else //if(catip == 7)
      {
        this.CataUniPrefSexualSel = data;
      }


    },
      error => { console.log(error) });

  }


  //Para insertar una nuevo catalogo

  InsertarNuevoCatalogo() {
    //variables para armar el JSON que se va a enviar al Back-End
    var datosvalo1 = this.CrearCatalogoU.getRawValue()['textNueDenominacion'];
    var datosvalo2 = this.CrearCatalogoU.getRawValue()['textNueTipoCat'];
    var datosvalo3 = this.CrearCatalogoU.getRawValue()['CBTipoCatalogo'];

    //JSON armado
    var cadena = {
      "Denominacion": datosvalo1,
      "CatalogoUniversal": datosvalo2,
      "LlaveForanea": datosvalo3,
    };


    //se consume el servicio
    this.servi.CrearCatalogoU(cadena).then(res => {
      console.log(res)
    }).catch(err => {
      console.log(err)
    })
    //this.LimpiarFormulario();
    this.CrearCatalogoU.reset();
  }
  
  //-------------------------------------------------------------------------
  //Consulta un catalogo por Id.
  public SelCataEditar() {
    this.BuscarEvalor  = this.CataUniCataEdi.getRawValue()['CBTipoCatalogoEdi'];
  
    this.servi.getlCatEdit(this.BuscarEvalor).subscribe((data: any) => {
        this.CataUniCataEdi = data;
        this.titloCataUniEditar = "CATALOGO A EDITAR";
      },
      (error) => {
        console.error(error);
      }
    );
  }
  
  // método para actualizar un catalogo .
  
  public ActualizarCatalogo() 
  {
  
      //variables para armar el JSON que se va a enviar al Back-End
      var datosvalo1 =  this.ActCatalogoU.getRawValue()['CBCatalogoEdi'];
      var datosvalo2 =  this.ActCatalogoU.getRawValue()['textNueDenominacionEdi']; 
      var datosvalo3 =  this.ActCatalogoU.getRawValue()['textNueTipoCatEdi'];
      var datosvalo4 =  this.ActCatalogoU.getRawValue()['CBTipoCatalogoEdi'];
  
      //JSON armado
      var cadena = {"ID_Universal":datosvalo1,
                    "Denominacion":datosvalo2,
                    "CatalogoUniversal":datosvalo3,
                    "LlaveForanea":datosvalo4
                   };
  
      //se consume el servicio
      this.servi.ActualizarCatalogoU(cadena).then(res =>
      {
        console.log(res)
      }).catch(err =>{
        console.log(err)
      })
  
      this.CrearCatalogoU.reset();
  }
  
  //=============================================================
  //LAS FUNCIONES PARA LLAMARLAS DESDE EL HTML
  //=============================================================  

  ngOnInit(): void {

    this.ListarCatTotales = this.formBuilder.group(
      {

      });

    this.CBCatalogoCatalogo = this.formBuilder.group(
      {
        CatCatalogofiltro: [],
        textCatalogo: []
      });

    this.CBCatalogoColor = this.formBuilder.group(
      {
        CatColorfiltro: [],
        textColor: []
      });

    this.CBCatalogoTipVehi = this.formBuilder.group(
      {
        CatTipVehifiltro: [],
        textTivVehi: []
      });

    this.CBCatalogoMarca = this.formBuilder.group(
      {
        CatMarcafiltro: [],
        textMarca: []
      });

    this.CBCatalogoTipDoc = this.formBuilder.group(
      {
        CatTipDocfiltro: [],
        textTivDoc: []
      });

    this.CBCatalogoEps = this.formBuilder.group(
      {
        CatEpsfiltro: [],
        textEps: []
      });

    this.CBCatalogoPrefSexual = this.formBuilder.group(
      {
        CatPrefSexualfiltro: [],
        textPrefSexual: []
      });
    this.CrearCatalogoU = this.formBuilder.group(
      {
        textNueDenominacion: [],
        textNueTipoCat: [],
        CBTipoCatalogo: []
      }

    );
    
    this.ActCatalogoU = this.formBuilder.group(
     {
       CBCatalogoEdi: [],
       textNueDenominacionEdi: [],
       textNueTipoCatEdi: [],
       CBTipoCatalogoEdi: []
     }
    );
    

  }
}

