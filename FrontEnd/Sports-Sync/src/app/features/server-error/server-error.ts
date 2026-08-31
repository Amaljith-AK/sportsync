import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'app-server-error',
  standalone: false,
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './server-error.html',
})
export class ServerError {}
