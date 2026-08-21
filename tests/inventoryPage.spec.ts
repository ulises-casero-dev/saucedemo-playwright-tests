import { test, expect, type Page } from '@playwright/test';
import { LoginPage } from '../pages/login-page';
import { InventoryPage } from '../pages/inventory-page';
import { SidebarMenuPage } from '../pages/top-menu-page';



test.describe('Verify propduct selection', () => {
    let loginPage: LoginPage;
    let inventoryPage: InventoryPage;
    let sidebarMenuPage: SidebarMenuPage;

    test.beforeEach(async ({page}) =>{
        loginPage = new LoginPage(page);
        await loginPage.goto();

        inventoryPage = new InventoryPage(page);
        sidebarMenuPage = new SidebarMenuPage(page);
    });

    test('login with hidden cart', async ({page}) =>{
        //Arrage
        const user = 'standard_user';
        const password = 'secret_sauce';

        //Act
        await loginPage.fillLoginForm(user,password);
        await loginPage.clickLoginButton(); // podria colocar el fill form y el login em la misma funcion?

        //Assert
        await inventoryPage.badgeNotVisible();
    });


    test('Add product to cart', async ({page}) => {
        // Arrage
        const user = 'standard_user';
        const password = 'secret_sauce';
        const product = 'backpack';

        // Act
        await loginPage.fillLoginForm(user,password);
        await loginPage.clickLoginButton();
        await inventoryPage.clickAddButton(product);

        //Assert
        await inventoryPage.badgeVisible();
    });


    test('Cart badge quantity test', async ({page}) => {
        // Arrange
        const user = 'standard_user';
        const password = 'secret_sauce';
        const backpack = 'backpack';
        const onesie =  'onesie';
        const qunatity = '2';

        //Act
        await loginPage.fillLoginForm(user,password);
        await loginPage.clickLoginButton();
        await inventoryPage.clickAddButton(backpack);
        await inventoryPage.clickAddButton(onesie);

        //Assert
        await inventoryPage.verifyCartQuantity(qunatity);

    });

    test('Add and quit prducts form cart', async ({page}) => {
        //Arrange
        const user = 'standard_user';
        const password = 'secret_sauce';
        const backpack = 'backpack';
        const onesie = 'onesie';

        //Act
        await loginPage.fillLoginForm(user,password);
        await loginPage.clickLoginButton();
        await inventoryPage.clickAddButton(backpack);
        await inventoryPage.clickAddButton(onesie);
        await inventoryPage.clickRemoveButton(backpack);
        await inventoryPage.clickRemoveButton(onesie);

        //Assert
        await inventoryPage.badgeNotVisible();
    });

    test('About button redirection' , async ({page}) => {
        //Arrage
        const user = 'standard_user';
        const password = 'secret_sauce';
        const URL = 'https://saucelabs.com/';

        // Act
        await loginPage.fillLoginForm(user,password);
        await loginPage.clickLoginButton();
        await sidebarMenuPage.openMenu();
        await sidebarMenuPage.selectMenuOption('about');

        // Assert
        await expect(page).toHaveURL(URL);
    });

    test('Logout', async ({page}) => {
        // Arrage
        const user = 'standard_user';
        const password = 'secret_sauce';
        const URL = 'https://www.saucedemo.com/'

        //Act
        await loginPage.fillLoginForm(user,password);
        await loginPage.clickLoginButton();
        await sidebarMenuPage.openMenu();
        await sidebarMenuPage.selectMenuOption('logout');

        //Assert
        await expect(page).toHaveURL(URL);
    });
})