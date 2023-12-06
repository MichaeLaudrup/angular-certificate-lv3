import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { RouterModule} from "@angular/router";
import { routing} from "./app.routing";
import { HttpClientModule} from "@angular/common/http";
import { ServiceWorkerModule } from '@angular/service-worker';
import { environment } from '../environments/environment';
import { GlobalHeaderComponent } from './shared/components/global-header/globalHeader.component';
import { GlobalFooterComponent } from './shared/components/global-footer/global-footer.component';
import { NotificationModalComponent } from './shared/components/notification-modal/notification-modal.component';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,
    RouterModule,
    GlobalHeaderComponent,
    GlobalFooterComponent,
    NotificationModalComponent,
    routing,
    ServiceWorkerModule.register('/ngsw-worker.js', { enabled: environment.production })
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
