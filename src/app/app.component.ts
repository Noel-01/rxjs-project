import { Component } from '@angular/core';
import { HeaderComponent } from "./header/header.component";
import { ServerComponent } from "./server/server.component";
import { TrafficComponent } from "./traffic/traffic.component";
import { SupportComponent } from "./support/support.component";
import { DashboardItemComponent } from "./dashboard-item/dashboard-item.component";

@Component({
  selector: 'app-root',
  standalone: true,
  templateUrl: './app.component.html',
  imports: [HeaderComponent, ServerComponent, TrafficComponent, SupportComponent, DashboardItemComponent],
})
export class AppComponent {
  
}
