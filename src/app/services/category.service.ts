import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Category } from '../interface/category';
import { url } from 'node:inspector';
import { Product } from '../interface/product';
import { Artist } from '../interface/artists';
import { AccountService } from './account.service';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {
  private myAppUrl: string = environment.endpoint;
  private myApiUrl: string = 'api/Category/';
  private myApiUrlP: string = 'api/Product/';
  private myApiUrlA: string = 'api/Artist/';


  constructor(private _http:HttpClient, private _account:AccountService) { }

  //Category
  getCategories(): Observable<Category[]>{
    const jwt = this._account.getJWT();
    let headers = new HttpHeaders();
    headers = headers.set('Authorization', 'Bearer ' + jwt);

    return this._http.get<Category[]>(`${this.myAppUrl}${this.myApiUrl}`, {headers});
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

  //Product

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
    let path = `${this.myAppUrl}${this.myApiUrlP}createUpdate1/`;
    if (id != undefined) {
      path += `${id}`;
    }
    return this._http.post(path, formdata);
  }

  deleteProduct(id: number): Observable<any> {
    return this._http.delete(`${this.myAppUrl}${this.myApiUrlP}${id}`);
  }

  //Artist

  getArtists(): Observable<Artist[]> {
    return this._http.get<Artist[]>(`${this.myAppUrl}${this.myApiUrlA}`);
  }

  getCreUpdA(id?: number): Observable<any> {
    let path = `${this.myAppUrl}${this.myApiUrlA}createUpdate/`;
    if (id != undefined && id != 0) {
      path += `${id}`
    }
    return this._http.get(path);
  }

  crePostA(id?: number, formData?: FormData) : Observable<any> {
    let path = `${this.myAppUrl}${this.myApiUrlA}createUpdate/`;
    if (id != undefined && id != 0) {
      path += `${id}`
    }
    return this._http.post(path, formData);
  }

  delArtist(id: number): Observable<any> {
    return this._http.delete(`${this.myAppUrl}${this.myApiUrlA}${id}`);
  }

  //FOR HOME
  homeCategories() :Observable<any>{
    return this._http.get(`${this.myAppUrl}${this.myApiUrl}forHome`);
  }

}
