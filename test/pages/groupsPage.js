import { Selector } from 'testcafe';

export default class GroupsPage {
  constructor() {
    this.buttons = {
      addGroup: Selector('main').find('a').withText('Add group'),
      submitForm: Selector('button').withText('Submit'),
      editGroup: Selector('td').find('a').withText('Edit')
    }
    this.inputs = {
      name: Selector('#name'),
      summary: Selector('#summary'),
      description: Selector('#description')
    }
  }
}
