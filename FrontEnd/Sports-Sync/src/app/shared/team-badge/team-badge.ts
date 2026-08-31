import { ChangeDetectionStrategy, Component, input } from '@angular/core';

@Component({
  selector: 'app-team-badge',
  standalone: false,
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <span
      class="inline-flex shrink-0 items-center justify-center rounded font-mono font-bold leading-none text-white"
      [class]="badgeClass() + ' ' + sizeClass()"
    >
      {{ code() }}
    </span>
  `,
})
export class TeamBadge {
  readonly code = input.required<string>();
  readonly badgeClass = input<string>('bg-slate-700');
  readonly size = input<'sm' | 'md'>('sm');

  protected sizeClass(): string {
    return this.size() === 'md' ? 'h-9 w-9 text-xs' : 'h-6 w-6 text-[10px]';
  }
}
