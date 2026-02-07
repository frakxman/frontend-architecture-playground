import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { StateManagementLabComponent } from './pages/state-management-lab/state-management-lab/state-management-lab.component';


@NgModule({
  declarations: [
    StateManagementLabComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild([
      {
        path: '',
        component: StateManagementLabComponent
      }
    ])
  ]
})
export class StateManagementLabModule { }
