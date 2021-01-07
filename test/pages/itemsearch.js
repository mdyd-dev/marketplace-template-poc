import { Selector } from 'testcafe';

export default class ItemSearch {
  constructor(item, editedItem) {
    this.links = {
      item: Selector('a').withText(item.name),
      commonItem: Selector('a').withText(item.commonName),
      editedItem: Selector('div').find('a').withText(editedItem.name)
    }
    this.search = {
      keyword: Selector('input[name="keyword"]'),
    }
    this.quickSearch = {
      keyword: Selector('input[name="qkeyword"]')
    }
    this.buttons = {
      sort: Selector('select[name="sort_by"]'),
      quickSearch: Selector('button').withText('Search'),
      search: Selector('button').withText('Search').nth(1),
      qsearch: Selector('button').withText('Search').nth(0)

    }
    this.options = {
      theMostRecent: Selector('option').withText('The Most Recent')
    }

    //this.keyword = Selector('#k')
    //this.searchBtn = Selector('button').withText('Search')

    //this.itemLink = Selector('a').withText(item.name)
    //this.editedItemLink = Selector('div').find('a').withText(editedItem.name)

    //this.sortButton = Selector('#sort')
  }
}


