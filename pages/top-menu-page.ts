import { expect, type Locator, type Page } from "@playwright/test";

type menuOption= 'allItems'| 'about' | 'logout' | 'reset';

export class SidebarMenuPage{
    // Variables
    readonly page:Page;
    readonly menuButton: Locator;
    readonly menuNavbar: Locator;
    readonly allItems: Locator;
    readonly about: Locator;
    readonly logout: Locator;
    readonly resetAppState: Locator;

    // Constructor
    constructor (page:Page) {
        this.page = page
        this.menuButton = this.page.getByRole(`button`, {name: `Open Menu`});
        this.menuNavbar = this.page.locator(`[class="bm-menu-wrap"]`);
        this.allItems= this.page.locator(`[data-test="inventory-sidebar-link"]`);
        this.about= this.page.locator(`[data-test="about-sidebar-link"]`);
        this.logout= this.page.locator(`[data-test="logout-sidebar-link"]`);
        this.resetAppState= this.page.locator(`[data-test="reset-sidebar-link"]`);
    }

    // Methods
    async openMenu(){
        await this.menuButton.click();
    }

    async menuVisible(){
        await expect(this.menuNavbar).toBeVisible(); 
    }
    
    async menuNotVisible(){
        await expect(this.menuNavbar).toBeHidden();
    }

    async selectMenuOption(option:menuOption){
        switch (option) {
            case 'allItems':
                await this.allItems.click();
                break;
            case 'about':
                await this.about.click();
                break;
            case 'logout':
                await this.logout.click();
                break;
            case 'reset':
                await this.resetAppState.click();
                break;
        }
    }
}

export default SidebarMenuPage;