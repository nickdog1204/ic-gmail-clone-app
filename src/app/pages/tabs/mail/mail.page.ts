import {AfterViewInit, ChangeDetectionStrategy, Component, OnInit} from '@angular/core';
import {IMailPageViewModel, MailPageStore} from "./mail.page-store";
import {Observable, of} from "rxjs";
import {IMail} from "../../../common/models/mail";
import {tap} from "rxjs/operators";

@Component({
  selector: 'app-mail',
  templateUrl: './mail.page.html',
  styleUrls: ['./mail.page.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [MailPageStore]
})
export class MailPage implements OnInit, AfterViewInit {
  vm$: Observable<IMailPageViewModel>;

  constructor(
    private mailPageStore: MailPageStore
  ) {
    console.log('mail page constructor');
  }

  ngAfterViewInit(): void {
    console.log('mail page afterViewInit');
  }

  ngOnInit() {
    console.log('mail page OnInit');
    this.vm$ = this.mailPageStore.getViewModelObservable().pipe(
      tap(it => console.log('the view model: ', it))
    );
    // this.mailPageStore.waitAndGetFromGlobalStoreListOfMailsAndInitializeStore();
    console.log('mail page OnInit2222');
  }

}
