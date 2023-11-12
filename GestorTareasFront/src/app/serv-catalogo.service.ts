import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Observable, of } from 'rxjs';
//import { map, catchError, tap } from 'rxjs/operators';


const httpOptions =
{
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};


@Injectable({
  providedIn: 'root'
})

export class ServCatalogoService {

  private Url: string = 'http://localhost:3000';

  constructor(private http: HttpClient) { }

  private extractData(res: Response) 
  {
    //console.log("22");
 
     let body = JSON.parse('' + res);
     //console.log("23 A " + body);
     return body || {};
   }
 
 
 
   private handleError<T>(operation = 'operation', result?: T) 
   {
     //console.log("25 ");
     return (error: any): Observable<T> => 
     {
 
       console.log(`${operation} failed: ${error.message}`);
       return of(result as T)
 
     };
   }
 
  //+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
  // SERVICIO  CATALOGO UNIVERSAL
  //+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++ 


  getCatalogoTotal(): Observable<any> 
  {
    return this.http.get(this.Url + "/catalogo", httpOptions);
    
  }

   //-------------------------------------------------------------

   getlListCatologoEsp(tipcat: any): Observable<any> 
   {
      return this.http.get(this.Url + "/catalogo"+ tipcat, httpOptions);

   }

  //-------------------------------------------------------------
/*
  getExportCataUniv(tipcat: any): Observable<any> 
  {
    return this.http.get(this.Url + "/catalogoU"+tipcat, httpOptions);

  }
*/
   //-------------------------------------------------------------

   getlCatEspSelec(IdCat: any): Observable<any> 
   {
      return this.http.get(this.Url + "/catalogo"+IdCat, httpOptions);

   }
   // Método para insertar un nuevo Catalogo

  async CrearCatalogoU(Dato:any): Promise<any> 
  {

    return new Promise((resolve, reject) => {
    this.http.post(this.Url +  "/catalogo",Dato, httpOptions).toPromise()
    });
  }
//-------------------------------------------------------------
    // Método para modificar un Catalogo

    async ActualizarCatalogoU(Dato:any): Promise<any> 
    {
  
      return new Promise((resolve, reject) => {
      this.http.put(this.Url +  "/catalogo",Dato, httpOptions).toPromise()
      });
    }
    getlCatEdit(Id: any): Observable<any>
    {
    
       return this.http.get(this.Url + "/catalogo/A/"+ Id , httpOptions);
  
    }

   //MOSTRAR UNA PERSONA
   getPersona(id:any): Observable <any>{
    return this.http.get(this.Url+"/persona"+id, httpOptions);
}
//INSERTAR UNA PERSONA
async insertPersona(EquipoD:any): Promise<any>{
    return new Promise((resolve, reject)=>{
        this.http.post(this.Url + "/persona",EquipoD,httpOptions).toPromise()
    });
}
//MODIFICAR UNA PERSONA    
async updatePersona(cadena:any):Promise<any>{
    return new Promise((resolve, reject)=>{
        this.http.put(this.Url+"/persona",cadena,httpOptions).toPromise()
    });
}

}
