import { expect, type Locator, type Page } from "@playwright/test";

export class LoginPage {
    // Variables
    readonly page:Page;
    readonly loginButton:Locator;
    readonly URL = 'https://www.saucedemo.com/';


    // Constructor
    constructor (page:Page) {
        this.page = page;
        this.loginButton = page.getByRole('button', {name: 'Login'});
    }

    // Methods
    async goto(){
        await this.page.goto(this.URL);
    }
    
    async clickLoginButton(){
        await this.loginButton.click();
    }

    async fillLoginForm(user:string, pass:string){
        await this.page.fill('#user-name', user);
        await this.page.fill('#password', pass);
    }

    async expectErrorText(errorText: string) {
        await expect(this.page.locator('[data-test="error"]')).toContainText(errorText);
    }

}

export default LoginPage;