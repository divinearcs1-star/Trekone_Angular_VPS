import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EventsComponent } from './events/events.component';
import { SpecialEventsComponent } from './special-events/special-events.component';
import { PremiumDetailsComponent } from './premium-details/premium-details.component';
import { TrekDetailsComponent } from './trek-details/trek-details.component';
import { SearchTreksComponent } from './search-treks/search-treks.component';
import { authGuard } from '../auth.guard';

const routes: Routes = [
   { path: '', component: EventsComponent },
  { path: 'special', canActivate: [authGuard], component: SpecialEventsComponent },
  { path: 'trek-details/:id', component: TrekDetailsComponent },
  { path: 'premium-details/:id', component: PremiumDetailsComponent },
  { path: 'search-treks', component: SearchTreksComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class EventRoutingModule { }
