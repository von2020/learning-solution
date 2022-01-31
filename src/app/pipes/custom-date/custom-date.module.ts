import { NgModule } from '@angular/core';
import { CustomDatePipe } from '../custom-date.pipe';



@NgModule({
  declarations: [CustomDatePipe],
  exports: [
    CustomDatePipe
  ]
})
export class CustomDateModule { }
