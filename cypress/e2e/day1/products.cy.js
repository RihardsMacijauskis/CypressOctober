import { LoginPage } from "../../pageObjects/loginPage";
import { ProductsPage } from "../../pageObjects/productsPage";

// after(() => {
//   cy.request("POST", "https://discord.com/api/webhooks/955086226547965952/WuaK1GMcRDVkOexPEz60OETIorJOvQeX4L1ftw7jDn_NuDM_g5J20FkMAcY_mMoUmXPr",
//       {
//         username: "Rihards Webhook",
//         content: "Products page test cases are finished",
//         tts: true
//       })
// })

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

  it("Sorting items visible in the products screen - Low To High", () => {
    LoginPage.loginStandardUserWithoutUI(
        "https://www.saucedemo.com/inventory.html"
    );
    ProductsPage.selectSortingOption("lohi")
    ProductsPage.verifyLowToHighPrices()
  })

  it("Sorting items visible in the products screen - High To Low", () => {
    LoginPage.loginStandardUserWithoutUI(
        "https://www.saucedemo.com/inventory.html"
    );
    ProductsPage.selectSortingOption("hilo")
    ProductsPage.verifyHighToLowPrices()
  })

  it("Checking out with some items added to the cart", () => {
    ProductsPage.setupCartForTests();
    LoginPage.loginStandardUserWithoutUI("https://www.saucedemo.com/cart.html");
    ProductsPage.clickOnCheckoutButton()
    ProductsPage.inputShippingDetails("bob")
    ProductsPage.clickonContinueButton()
    ProductsPage.clickOnFinishButton()
    ProductsPage.verifyThankYouScreen()
  })

  it("Postal code is required error during checkout", () => {
    ProductsPage.setupCartForTests();
    LoginPage.loginStandardUserWithoutUI("https://www.saucedemo.com/cart.html");
    ProductsPage.clickOnCheckoutButton()
    ProductsPage.inputShippingDetails("alice")
    ProductsPage.clickonContinueButton()
    ProductsPage.clickonContinueButton()
    LoginPage.verifyErrorMessage("Error: Postal Code is required")
  })
})

