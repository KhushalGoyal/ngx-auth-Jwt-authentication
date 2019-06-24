import { NgModule } from "@angular/core";
import { AuthenticationModule } from './auth/authentication.module';
import { HttpClientModule } from '@angular/common/http';
import { Utils } from './auth/utils';
import { CommonService } from './services/common.service';

@NgModule({
    imports:[
        AuthenticationModule,
        HttpClientModule
    ],
    declarations:[],
    providers:[
        Utils,
        CommonService
    ]
})

export class CoreModule{}