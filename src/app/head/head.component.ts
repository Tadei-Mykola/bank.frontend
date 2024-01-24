import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-head',
  templateUrl: './head.component.html',
  styleUrls: ['./head.component.scss']
})
export class HeadComponent {
  constructor(private router: Router) { }

  isLinkActive(url: string): boolean {
    return this.router.isActive(url, true);
  }
}
