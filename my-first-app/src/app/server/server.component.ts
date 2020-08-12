import { Component } from '@angular/core';

@Component({
  selector: 'app-server',
  templateUrl: './server.component.html',
  styleUrls: []
})
export class ServerComponent {
  title = 'Server Component';
  serverId = 10;
  serverStatus = 'offline';

  getServerStatus(): string {
    return this.serverStatus;
  }
}
