import { expect, type Locator, type Page } from "@playwright/test";

export class InventoryPage {
    // Variables
    readonly page:Page;
    readonly cartButton:Locator;
    readonly cartBadge:Locator;
    //readonly showProductDescriptionButton:Locator;

    // Constructor
    constructor (page:Page) {
        this.page = page;
        this.cartButton = page.locator(`[data-test="shopping-cart-link"]`);
        this.cartBadge = page.locator(`[data-test="shopping-cart-badge"]`);
        //this.showProductDescriptionButton = page.locator('[]');
    
    }

    // Methods
    async clickAddButton(productKey:string){
        const dataTest = `[data-test="add-to-cart-sauce-labs-${productKey}"]`;
        const addToCartButton = this.page.locator(dataTest);
        
        await addToCartButton.click();
    }

    async clickRemoveButton(productKey:string){
        const dataTest = `[data-test="remove-sauce-labs-${productKey}"]`;
        const removeFromCartButton = this.page.locator(dataTest);
        
        await removeFromCartButton.click();
    }

    async badgeVisible(){
        await expect(this.cartBadge).toBeVisible();
    }

    async badgeNotVisible(){
        await expect(this.cartBadge).toBeHidden();
    }

    async verifyCartQuantity(cant:string){
        await expect(this.page.locator(`[data-test="shopping-cart-badge"]`)).toHaveText(cant);
    }

}

export default InventoryPage;