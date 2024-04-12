import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, Subject, map } from 'rxjs';
import { Category } from '../interface/category';
import { url } from 'node:inspector';
import { Product } from '../interface/product';
import { Artist } from '../interface/artists';
import { AccountService } from './account.service';
import { CartComponent } from '../components/cart/cart.component';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {
  private isAvailable = typeof localStorage !== undefined;

  private myAppUrl: string = environment.endpoint;
  private myApiUrl: string = 'api/Category/';
  private myApiUrlP: string = 'api/Product/';
  private myApiUrlA: string = 'api/Artist/';
  private myApiUrlC: string = 'api/Cart/';
  private myApiUrlO: string = 'api/Order/';
  private myApiUrlU: string = 'api/User/'

  public cartSubject = new Subject<any>();
  public cartObservable = this.cartSubject.asObservable();
  public isLoading = true;
  

  constructor(private _http: HttpClient, private _account: AccountService) {
    
  }

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

  //FOR CREATOR
  getCreator(id: number):Observable<any> {
    return this._http.get(`${this.myAppUrl}${this.myApiUrlA}creator/${id}`);
  }

  //FOR DETAILS
  getInfo(id:number): Observable<any> {
    return this._http.get(`${this.myAppUrl}${this.myApiUrlA}details/${id}`)
  }

  //CART

  addCart(data: FormData) {
    const jwt = this._account.getJWT();
    let headers = new HttpHeaders();
    headers = headers.set("Authorization", "Bearer " + jwt);
    return this._http.post(`${this.myAppUrl}${this.myApiUrlA}cart`, data, { headers }).subscribe({
      next: data => {
        this.getCart();
      }
    });
  }
  

  getCart()  {
    const jwt = this._account.getJWT();
    let headers = new HttpHeaders();
    headers = headers.set("Authorization", "Bearer " + jwt);
    return this._http.get(`${this.myAppUrl}${this.myApiUrlC}getCart`, { headers }).subscribe({
      next: (data: any) => {
        this.cartSubject.next(data.carts);
        
      }
    })
    
  }

  updateCart(newCart:any) {
    this.cartSubject.next(newCart)
  }

  increment(count: number, productId: number): Observable<any> {
    const jwt = this._account.getJWT();
    let headers = new HttpHeaders();
    headers = headers.set("Authorization", "Bearer " + jwt);

    return this._http.get(`${this.myAppUrl}${this.myApiUrlC}increment/${count}/${productId}`, {headers});
  }

  decrement(count: number, productId: number): Observable<any> {
    const jwt = this._account.getJWT();
    let headers = new HttpHeaders();
    headers = headers.set("Authorization", "Bearer " + jwt);

    return this._http.get(`${this.myAppUrl}${this.myApiUrlC}decrement/${count}/${productId}`, {headers});
  }


  deleteCart(id:number) :Observable<any>{
    const jwt = this._account.getJWT();
    let headers = new HttpHeaders();
    headers = headers.set("Authorization", "Bearer " + jwt);

    return this._http.delete(`${this.myAppUrl}${this.myApiUrlC}deleteCart/${id}`, {headers})
  }

  deleteRange(): Observable<any> {
    const jwt = this._account.getJWT();
    let headers = new HttpHeaders();
    headers = headers.set("Authorization", "Bearer " + jwt);

    return this._http.delete(`${this.myAppUrl}${this.myApiUrlC}deleteCarts`, {headers})

  }

  getTotal() {
    const jwt = this._account.getJWT();
    let headers = new HttpHeaders();
    headers = headers.set("Authorization", "Bearer " + jwt);

    return this._http.get(`${this.myAppUrl}${this.myApiUrlC}getOrderTotal`, { headers });
  }

  //SUMMARY
  getSummary(): Observable<any> {
    if (this.isAvailable) {
      const jwt = this._account.getJWT();
      let headers = new HttpHeaders();
      headers = headers.set("Authorization", "Bearer " + jwt);
      return this._http.get(`${this.myAppUrl}${this.myApiUrlC}summary`, { headers });
    } else {
      return this.getSummary();
    }
  }

  postSummary(data:FormData) :Observable<any>{
    const jwt = this._account.getJWT();
    let headers = new HttpHeaders();
    headers = headers.set("Authorization", "Bearer " + jwt);

    return this._http.post(`${this.myAppUrl}${this.myApiUrlC}summaryPost`, data, { headers })
  }

  paymentRes(id: number): Observable<any> {
    const jwt = this._account.getJWT();
    let headers = new HttpHeaders();
    headers = headers.set("Authorization", "Bearer " + jwt);

    return this._http.get(`${this.myAppUrl}${this.myApiUrlC}ordersuccess/${id}`, {headers});
  }

  //ORDERS

  getOrders(): Observable<any> {
    const jwt = this._account.getJWT();
    let headers = new HttpHeaders();
    headers = headers.set("Authorization", "Bearer " + jwt);

    return this._http.get(`${this.myAppUrl}${this.myApiUrlO}getOrders`);
  }

  getDetails(id: number): Observable<any>{
    const jwt = this._account.getJWT();
    let headers = new HttpHeaders();
    headers = headers.set("Authorization", "Bearer " + jwt);

    return this._http.get(`${this.myAppUrl}${this.myApiUrlO}orderDetails/${id}`);
  }

  updateOrder(form: FormData): Observable<any> {
    const jwt = this._account.getJWT();
    let headers = new HttpHeaders();
    headers = headers.set("Authorization", "Bearer " + jwt);

    return this._http.post(`${this.myAppUrl}${this.myApiUrlO}updateOrder`, form);
  }

  updateAddress(form: FormData): Observable<any> {
    const jwt = this._account.getJWT();
    let headers = new HttpHeaders();
    headers = headers.set("Authorization", "Bearer " + jwt);

    return this._http.post(`${this.myAppUrl}${this.myApiUrlO}updateAddress`, form);
  }

  //USERS
  getUsers(): Observable<any> {
    const jwt = this._account.getJWT();
    let headers = new HttpHeaders();
    headers = headers.set("Authorization", "Bearer " + jwt);

    return this._http.get(`${this.myAppUrl}${this.myApiUrlU}getUsers`, { headers });
  }
}
