import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { MailPageRoutingModule } from './mail-routing.module';

import { MailPage } from './mail.page';
import {SharedModule} from "../../../modules/shared/shared.module";

@NgModule({
  imports: [
    SharedModule,
    MailPageRoutingModule
  ],
  declarations: [MailPage]
})
export class MailPageModule {}
