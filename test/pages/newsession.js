import { Selector } from 'testcafe';

export default class NewSessionForm {
  constructor() {
    this.emailInput = Selector('label #email')
    this.passInput = Selector('label #password')
    this.logInBtn = Selector('button').withText('Log in')
    this.usernameInput = Selector('label #username')
    this.regBtn = Selector('a').withText('Register')
    this.signUpBtn = Selector('button').withText('Sign Up')
    this.resetBtn = Selector('a').withText('Reset') // reset password
    this.resetSubmitBtn = Selector('button').withText('Send email with authentication link')
  }
}