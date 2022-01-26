import {Injectable} from '@angular/core';
import {environment} from "../../environments/environment";
import {HttpClient, HttpParams} from "@angular/common/http";
import {catchError, map, share} from "rxjs/operators";
import {BehaviorSubject, Observable} from "rxjs";
import {HttpUtils} from "./http-utils";
import {UserAccountDTO} from "../model/UserAccountDTO";
import {Amount} from "../model/Amount";


@Injectable({
  providedIn: 'root'
})
export class BankaccountService {

  private readonly apiUrl = `${environment.baseHref}`;

  userAccountShared = new BehaviorSubject<UserAccountDTO>( {});


  constructor(private http: HttpClient) {

  }
// http://localhost:8080/account/userid/1
  searchAccount(id: number): Observable<UserAccountDTO> {

    const url = this.apiUrl + `/account/userid/${id}`;
    const requestOptions = {
      headers: HttpUtils.apiDefaultHeaders,
      params: new HttpParams()

    };
    return this.http.get(url, requestOptions)
      .pipe(
        map((response: UserAccountDTO) => response),
        share(),
        catchError(error => HttpUtils.toApiErrorObservable(error))
      );
  }

  searchAccountByReference(ref: string): Observable<UserAccountDTO> {

    const url = this.apiUrl + `/account/reference/${ref}`;
    const requestOptions = {
      headers: HttpUtils.apiDefaultHeaders,
      params: new HttpParams()

    };
    return this.http.get(url, requestOptions)
      .pipe(
        map((response: UserAccountDTO) => response),
        share(),
        catchError(error => HttpUtils.toApiErrorObservable(error))
      );
  }

  debitAccount(reference: string, amount: Amount): Observable<UserAccountDTO> {

    const url = this.apiUrl + `/account/debit/reference/${reference}`;
    const requestOptions = {
      headers: HttpUtils.apiDefaultHeaders,
      params: new HttpParams()

    };
    return this.http.post(url, amount, requestOptions)
      .pipe(
        map((response: UserAccountDTO) => response),
        share(),
        catchError(error => HttpUtils.toApiErrorObservable(error))
      );
  }
  creditAccount(reference: string, amount: Amount): Observable<UserAccountDTO> {
    const url = this.apiUrl + `/account/credit/reference/${reference}`;
    const requestOptions = {
      headers: HttpUtils.apiDefaultHeaders,
      params: new HttpParams()

    };
    return this.http.post(url, amount, requestOptions)
      .pipe(
        map((response: UserAccountDTO) => response),
        share(),
        catchError(error => HttpUtils.toApiErrorObservable(error))
      );
  }


  create(userAccount: UserAccountDTO): Observable<UserAccountDTO> {
    const url = this.apiUrl + `/account/useraccount`;
    const requestOptions = {
      headers: HttpUtils.apiDefaultHeaders,
      params: new HttpParams()

    };
    return this.http.post(url, userAccount, requestOptions)
      .pipe(
        map((response: UserAccountDTO) => response),
        share(),
        catchError(error => HttpUtils.toApiErrorObservable(error))
      );
  }

}

