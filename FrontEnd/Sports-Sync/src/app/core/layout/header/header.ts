import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { NavigationEnd, Router } from '@angular/router';
import { filter, map } from 'rxjs';
import { SportsDataService } from '../../services/sports-data.service';

@Component({
  selector: 'app-header',
  standalone: false,
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './header.html',
})
export class Header {
  private readonly data = inject(SportsDataService);
  private readonly router = inject(Router);

  protected readonly navSports = this.data.navSports;

  private readonly activeUrl = toSignal(
    this.router.events.pipe(
      filter((event): event is NavigationEnd => event instanceof NavigationEnd),
      map((event) => event.urlAfterRedirects),
    ),
    { initialValue: this.router.url },
  );

  protected isActive(route: string | null): boolean {
    if (!route) return false;
    const url = this.activeUrl();
    return route === '/' ? url === '/' || url.startsWith('/leagues') : url === route;
  }

  protected goTo(route: string | null): void {
    if (!route) return;
    void this.router.navigate([route]);
  }
}
