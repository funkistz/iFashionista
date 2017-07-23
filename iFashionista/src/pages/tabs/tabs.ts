import { Component } from '@angular/core';

import { ShopPage } from '../shop/shop';
import { Outfit } from '../outfit/outfit';
import { HomePage } from '../home/home';
import { EventPage } from '../event/event';
import { EventCardPage } from '../event-card/event-card';

@Component({
  templateUrl: 'tabs.html'
})
export class TabsPage {

  tab2Root = ShopPage;
  tab3Root = Outfit;
  tab4Root = EventCardPage;

  constructor() {

  }
}
