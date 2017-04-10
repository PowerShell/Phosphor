import { bootstrap }        from '@angular/platform-browser-dynamic';
import { ROUTER_PROVIDERS } from '@angular/router-deprecated';
import { HTTP_PROVIDERS } from '@angular/http';

import { AppComponent }     from './app.component';

import { NounService }  from './services/noun.service';
import { VerbService }  from './services/verb.service';
import { SessionService } from './services/session.service';
import { CollectionService} from './services/collection.service';

import 'rxjs/Rx';

bootstrap(AppComponent, [
  ROUTER_PROVIDERS, NounService, VerbService, SessionService, CollectionService, HTTP_PROVIDERS
]);
