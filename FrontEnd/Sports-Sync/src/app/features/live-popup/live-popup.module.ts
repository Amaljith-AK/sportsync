import { NgModule } from '@angular/core';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { MatDialogModule } from '@angular/material/dialog';
import { SharedModule } from '../../shared/shared.module';
import { LivePopup } from './live-popup';

@NgModule({
  declarations: [LivePopup],
  imports: [MatDialogModule, DragDropModule, SharedModule],
})
export class LivePopupModule {}
