import { ChangeDetectionStrategy, Component, inject, input } from '@angular/core';
import { SportCoverageItem } from '../../../../core/models/sport.models';
import { NAV_SPORTS } from '../../../../core/data/mock-sports-data';
import { Router } from '@angular/router';
import { ThemeService } from '../../../../core/services/theme.service';

@Component({
  selector: 'app-sport-coverage-card',
  standalone: false,
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './sport-coverage-card.html',
})
export class SportCoverageCard {
  readonly sport = input.required<SportCoverageItem>();
  private readonly router = inject(Router)
  private themeService = inject(ThemeService)

  navigate(sportId:string){
    const sport = NAV_SPORTS.find((sport)=>sport.id === sportId)
    if(!sport) return 
    this.router.navigate([sport.route])
    switch(sport.route){
      case '/f1':this.onSportClick('f1');break;
      default:this.onSportClick('football')
    }
  }

  onSportClick(sport:'football' | 'f1' | 'tennis' | 'nba'):void{
    this.themeService.setTheme(sport)
  }
}
