import { Component } from '@angular/core';
import { EventService } from '../../event.service';

@Component({
  selector: 'app-events',
  templateUrl: './events.component.html',
  styleUrl: './events.component.css'
})
export class EventsComponent {
  events: any = []
  allevents: any = []
  loading = true;

  constructor(private eventservice: EventService) {
  }
  ngOnInit() {
    console.log("events comp loaded")
    this.eventservice.getFilterByDateEvents().subscribe(
      res => {
        this.events = res
        this.allevents = this.events
        this.loading = false;
      },
      err => (console.log(err))
    );
  }

}
