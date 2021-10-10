import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable, throwError} from "rxjs";
import {map} from "rxjs/operators";
import {IMailResponse} from "../models/mail";

@Injectable({
  providedIn: 'root'
})
export class MailService {

  constructor(private httpClient: HttpClient) {
  }

  getListOfMailsObservable(): Observable<IMailResponse[]> {
    // return throwError('GGGGGGGGGGGGGGG')
    // throw new Error('有錯了有錯了');
    return this.httpClient.get('https://devdactic.fra1.digitaloceanspaces.com/gmail/data.json')
      .pipe(
        map((res: any) => res)
      );
  }
}
