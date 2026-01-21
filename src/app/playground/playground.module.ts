import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PlaygroundRoutingModule } from './playground-routing.module';
import { RouterModule } from '@angular/router';
import { PlaygroundLayoutComponent } from './layouts/playground-layout/playground-layout.component';


@NgModule({
  declarations: [
    PlaygroundLayoutComponent
  ],
  imports: [
    CommonModule,
    RouterModule,
    PlaygroundRoutingModule
  ]
})
export class PlaygroundModule { }
