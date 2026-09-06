import { NgModule } from '@angular/core';
import { SharedModule } from '../../shared/shared.module';
import { WinProbability } from './win-probability';

@NgModule({
  declarations: [WinProbability],
  imports: [SharedModule],
  exports: [WinProbability],
})
export class WinProbabilityModule {}
