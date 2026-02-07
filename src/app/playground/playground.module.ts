import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { PlaygroundRoutingModule } from './playground-routing.module';

import { PlaygroundLayoutComponent } from './layout/containers/playground-layout/playground-layout.component';
import { PlaygroundSidebarComponent } from './layout/components/sidebar/sidebar.component';

@NgModule({
  declarations: [
    PlaygroundLayoutComponent,
    PlaygroundSidebarComponent
  ],
  imports: [
    CommonModule,
    RouterModule,  
    PlaygroundRoutingModule
  ]
})
export class PlaygroundModule { }
