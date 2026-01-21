import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-performance-lab',
  templateUrl: './performance-lab.component.html',
  styleUrls: ['./performance-lab.component.css']
})
export class PerformanceLabComponent implements OnInit {
  constructor() {
    console.log('🎯 PerformanceLabComponent constructor called!');
  }
  ngOnInit() {
    console.log('PerformanceLabComponent loaded!');
  }
}
