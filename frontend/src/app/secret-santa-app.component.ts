import { Component } from '@angular/core';
import { MatIconRegistry } from '@angular/material';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'secret-santa-app',
  templateUrl: './secret-santa-app.component.html',
  styleUrls: ['./secret-santa-app.component.css']
})
export class SecretSantaAppComponent {
  constructor(iconRegistry: MatIconRegistry, sanitizer: DomSanitizer) {
    iconRegistry.addSvgIcon(
        'github',
        sanitizer.bypassSecurityTrustResourceUrl('assets/img/github-logo.svg'));
  }
}
