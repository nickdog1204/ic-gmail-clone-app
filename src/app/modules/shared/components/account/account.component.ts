import { Component, OnInit } from '@angular/core';
import {PopoverController} from "@ionic/angular";

@Component({
  selector: 'app-account',
  templateUrl: './account.component.html',
  styleUrls: ['./account.component.scss'],
})
export class AccountComponent implements OnInit {

  constructor(private popoverController: PopoverController) { }

  ngOnInit() {}

  closeThisPopover() {
    this.popoverController.dismiss();
  }

}
