import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

import { StateManagementLabComponent } from './pages/state-management-lab/state-management-lab/state-management-lab.component';


@NgModule({
  declarations: [
    StateManagementLabComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    RouterModule.forChild([
      {
        path: '',
        component: StateManagementLabComponent
      }
    ])
  ]
})
export class StateManagementLabModule { }

