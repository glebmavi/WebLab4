import { bootstrapApplication } from '@angular/platform-browser';
import { appConfig } from './app/app.config';
import { AppComponent } from './app/app.component';


// TODO: перевернуть таблицу
// TODO: footer
// TODO: logout
// TODO: alert if not logged in, in main page
bootstrapApplication(AppComponent, appConfig)
  .catch((err) => console.error(err));
