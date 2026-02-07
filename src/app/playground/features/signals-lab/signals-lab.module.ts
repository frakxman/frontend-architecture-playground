import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { SignalsLabComponent } from './pages/signals-lab/signals-lab.component';

@NgModule({
  declarations: [
    SignalsLabComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild([
      {
        path: '',
        component: SignalsLabComponent
      }
    ])
  ]
})
export class SignalsLabModule { }
