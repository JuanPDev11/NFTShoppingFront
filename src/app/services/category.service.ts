import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Category } from '../interface/category';
import { url } from 'node:inspector';
import { Product } from '../interface/product';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {
  private myAppUrl: string = environment.endpoint;
  private myApiUrl: string = 'api/Category/';
  private myApiUrlP: string = 'api/Product/';


  constructor(private _http:HttpClient) { }

  getCategories(): Observable<Category[]>{
    return this._http.get<Category[]>(`${this.myAppUrl}${this.myApiUrl}`);
  }

  createUpdate(id?: number): Observable<Category> {
    let path:string = `${this.myAppUrl}${this.myApiUrl}createUpdate/`;
    if (id != undefined) {
      path += `${id}`;
    }
    return this._http.get<Category>(path)
  }

  createPost(id?: number, body?:FormData) : Observable<any> {
    let path: string = `${this.myAppUrl}${this.myApiUrl}createUpdate/`;
    if (id != undefined) {
      path += `${id}`;
    }
    return this._http.post(path, body);
  }

  deleteCategory(id:number): Observable<any>
  {
    return this._http.delete(`${this.myAppUrl}${this.myApiUrl}${id}`);
  }

  getProduct(): Observable<Product[]> {
    return this._http.get<Product[]>(`${this.myAppUrl}${this.myApiUrlP}`);
  }

  getCreUpd(id?:number): Observable<any> {
    let path = `${this.myAppUrl}${this.myApiUrlP}createUpdate/`;
    if (id != 0 && id != undefined) {
      path += `${id}`;
    }
    return this._http.get(path);
  }

  postProduct(id?: number, formdata?: FormData): Observable<any> {
    let path = `${this.myAppUrl}${this.myApiUrlP}`;
    if (id != undefined) {
      path += `${id}`;
    }
    return this._http.post(path, formdata);
  }
  
}
