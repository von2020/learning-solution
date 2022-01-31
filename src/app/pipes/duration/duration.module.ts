import { NgModule } from '@angular/core';
import { DurationFormatPipe } from '../duration-format.pipe';
import { DurationPipe } from '../duration.pipe';



@NgModule({
  declarations: [DurationFormatPipe],
  exports: [
    DurationFormatPipe
  ]
})
export class DurationModule { }
