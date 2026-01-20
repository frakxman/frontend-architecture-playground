import { Component } from '@angular/core';
import { ContactCtaComponent } from '../../ui/contact-cta/contact-cta.component';

@Component({
  selector: 'app-contact',
  standalone: true,
  imports: [ContactCtaComponent],
  templateUrl: './contact.component.html',
  styleUrl: './contact.component.css'
})
export class ContactComponent {

}
