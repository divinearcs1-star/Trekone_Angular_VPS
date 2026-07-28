import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EventRoutingModule } from './event-routing.module';
import { EventsComponent } from './events/events.component';
import { SpecialEventsComponent } from './special-events/special-events.component';
import { TrekDetailsComponent } from './trek-details/trek-details.component';
import { PremiumDetailsComponent } from './premium-details/premium-details.component';
import { SearchTreksComponent } from './search-treks/search-treks.component';
import { SharedModule } from '../shared/shared.module';

@NgModule({
  declarations: [
    PremiumDetailsComponent,
    EventsComponent,
    SpecialEventsComponent,
    TrekDetailsComponent,
    SearchTreksComponent
  ],
  imports: [
    CommonModule,
    EventRoutingModule,
    SharedModule
  ]
})
export class EventModule { }
