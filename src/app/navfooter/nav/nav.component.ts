import { Component, Inject, PLATFORM_ID } from '@angular/core';
import { MediaMatcher } from '@angular/cdk/layout';
import { NAVITEMS } from '../../models/nav-item.model';
import { environment } from 'src/environments/environment';
import { isPlatformBrowser } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.scss'],
})
export class NavComponent {
  // Set as property so it can be used in html file
  navItems = NAVITEMS;
  // Import global vars
  appName = environment.appName;

  // Navigation JS stuff
  useNavigationInOverMode = false;

  constructor(media: MediaMatcher, @Inject(PLATFORM_ID) platformId: string) {
    if (isPlatformBrowser(platformId)) {
      media.matchMedia('(max-width: 600px)').addEventListener('change', (mobileQueryEvent) => {
        this.useNavigationInOverMode = mobileQueryEvent.matches;
      });
    }
  }
}
