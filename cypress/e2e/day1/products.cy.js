import { LoginPage } from "../../pageObjects/loginPage";
import { ProductsPage } from "../../pageObjects/productsPage";

describe("Adding and Removing items from the products screen", () => {
  it("Adding first item visible to the cart", () => {
    LoginPage.loginStandardUserWithoutUI(
      "https://www.saucedemo.com/inventory.html"
    );
    ProductsPage.addFirstItemToCart();
    ProductsPage.verifyAddedItemAmount(1);
    ProductsPage.openCart();
    ProductsPage.verifyLastAddedItemData();
  });

  it("Removing items from the cart", () => {
    ProductsPage.setupCartForTests();
    LoginPage.loginStandardUserWithoutUI("https://www.saucedemo.com/cart.html");
    ProductsPage.removeItemsFromCart();
    ProductsPage.verifyCartIsEmpty();
  });
});
