import { test, expect, type Page } from '@playwright/test';
import { LoginPage } from '../pages/login-page';

test.describe('Login', () => {
    let loginPage: LoginPage;

    test.beforeEach(async ({page}) => {
        loginPage = new LoginPage(page);
        await loginPage.goto();
    })
    
    test('Login with wrong credentials', async ({page}) => {
        //Arrange
        const user = "wrong_user";
        const password = "wrong_pass";

        //Act
        await loginPage.fillLoginForm(user,password);
        await loginPage.clickLoginButton();

        //Assert
        const errorText = 'Epic sadface: Username and password do not match any user in this service';
        await loginPage.expectErrorText(errorText);
    })

    test('Login with correct credentials', async ({page}) =>{
        //Arrange
        const user = 'standard_user';
        const password = 'secret_sauce';

        //Act
        await loginPage.fillLoginForm(user,password);
        await loginPage.clickLoginButton();

        //Assert
        await expect(page).toHaveURL('https://www.saucedemo.com/inventory.html');
    })
    
    test('Login with locked user', async ({page}) => {
        //Arrange
        const user = 'locked_out_user';
        const password = 'secret_sauce';

        //Act
        await loginPage.fillLoginForm(user,password);
        await loginPage.clickLoginButton();

        //Assert
        const errorText = 'Epic sadface: Sorry, this user has been locked out.';
        await loginPage.expectErrorText(errorText);
    })


    test('Login with empty credentials', async ({page}) => {
        //Arrange
        const user = '';
        const password = '';

        //Act
        await loginPage.fillLoginForm(user,password);
        await loginPage.clickLoginButton();

        //Assert
        const errorText = 'Epic sadface: Username is required';
        await loginPage.expectErrorText(errorText);
    });

    test('Login with empty password credential', async ({page}) => {
        //Arrange
        const user = 'standard_user';
        const password = '';
        
        //Act
        await loginPage.fillLoginForm(user,password);
        await loginPage.clickLoginButton();

        //Assert
        const errorText = 'Epic sadface: Password is required';
        await loginPage.expectErrorText(errorText);
    });

    test('Login with empty user credential', async ({page}) => {
        //Arrange
        const user = '';
        const password = 'secret_sauce';

        //Act
        await loginPage.fillLoginForm(user,password);
        await loginPage.clickLoginButton();

        //Assert
        const errorText = 'Epic sadface: Username is required';
        await loginPage.expectErrorText(errorText);
    })
})