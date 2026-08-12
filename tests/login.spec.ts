import { test, expect, type Page } from '@playwright/test';

test.describe('Login', () => {
    test.beforeEach(async ({page}) => {
        await page.goto("https://www.saucedemo.com/");
    })
    
    test('Login with wrong credentials', async ({page}) => {
        //Arrange
        const user = "wrong_user";
        const passwprd = "wrong_pass";

        //Act
        await page.fill("#user-name", user);
        await page.fill("#password", passwprd);
        await page.getByRole('button', {name: 'Login'}).click();

        //Assert
        //await expect(page.locator('[data-test="error"]')).toBeVisible();
        const text = 'Epic sadface: Username and password do not match any user in this service';
        await expect(page.locator('[data-test="error"]')).toContainText(text);
    })

    test('Login with correct credentials', async ({page}) =>{
        const user = 'standard_user';
        const password = 'secret_sauce';

        await page.fill('#user-name', user);
        await page.fill('#password', password);
        await page.getByRole('button', {name: 'Login'}).click();

        await expect(page).toHaveURL('https://www.saucedemo.com/inventory.html');
    })
    
    test('Login with locked user', async ({page}) => {
        const user = 'locked_out_user';
        const password = 'secret_sauce';

        await page.fill('#user-name', user);
        await page.fill('#password', password);
        await page.getByRole('button', {name: 'Login'}).click();

        const lockedUserText = 'Epic sadface: Sorry, this user has been locked out.';
        await expect(page.locator('[data-test="error"]')).toContainText(lockedUserText);
    })

})