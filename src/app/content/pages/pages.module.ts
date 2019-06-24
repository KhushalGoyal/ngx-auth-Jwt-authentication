import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PagesRoutingModule } from './pages-routing.module';
import { PagesComponent } from './pages.component';
import { CoreModule } from 'src/app/core/core.module';

@NgModule({
  declarations: [
    PagesComponent
  ],
  imports: [
    CoreModule,
    CommonModule,
    PagesRoutingModule
  ]
})
export class PagesModule { }
