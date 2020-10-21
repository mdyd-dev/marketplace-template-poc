import { Selector } from 'testcafe';

export default class AdminPanel {
  constructor() {
    this.menu = {
      users: Selector('a').withText('Users'),
      home: Selector('a').withText('Home'),
      activities: Selector('a').withText('Activities'),
      categories: Selector('a').withText('Categories'),
      orders: Selector('a').withText('Orders'),
      items: Selector('li').find('a').withText('Items'),
      setup: Selector('a').withText('Setup'),
      supportTickets: Selector('a').withText('Support tickets')
    }
    this.tableRows = {
      users: Selector('tbody').find('tr'),
      orders: Selector('tbody').find('tr'),
      items: Selector('tbody').find('tr'),
      categories: Selector('tbody').find('tr')
    }

    /*
    this.users = Selector('a').withText('Users')
    this.home = Selector('a').withText('Home')
    this.activities = Selector('a').withText('Activities')
    this.categories = Selector('a').withText('Categories')
    this.orders = Selector('a').withText('Orders')
    this.items = Selector('li').find('a').withText('Items')
    this.setup = Selector('a').withText('Setup')
    */

  }
}