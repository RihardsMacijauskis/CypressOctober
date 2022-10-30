import { ProductsPage } from "../../pageObjects/productsPage";
import { LoginPage } from "../../pageObjects/loginPage";
import { BasePage } from "../../pageObjects/basePage";

describe("Login test cases", () => {
  before(() => {
    cy.log(
      "Starting all the test cases and doing something before all of them"
    );
  });

  after(() => {
    cy.log("Doing something after the testcases have been run");
  });

  beforeEach(() => {
    cy.visit("https://www.saucedemo.com");
  });

  afterEach(() => {
    cy.log("Running this after each of the testcase");
  });

  it("Logging in with a valid user", () => {
    LoginPage.inputLoginDataAndLogin("standard_user", "secret_sauce");
    ProductsPage.checkIfContainerVisible();
  });

  it("Logging in with an invalid user", () => {
    LoginPage.inputLoginDataAndLogin("standard_user", "secret----sauce");
    LoginPage.verifyErrorMessage(
      "Epic sadface: Username and password do not match any user in this service"
    );
    cy.get("[data-test=error]").should(
      "have.text",
      "Epic sadface: Username and password do not match any user in this service"
    );
  });

  it("Logging in with a locked out user", () => {
    LoginPage.inputLoginDataAndLogin("locked_out_user", "secret_sauce");
    LoginPage.verifyErrorMessage(
      "Epic sadface: Sorry, this user has been locked out."
    );
    ProductsPage.verifyContainerNotExisting();
  });

  it("Closing error message when no password is entered", () => {
    LoginPage.inputUsername("standard_user");
    LoginPage.clickLoginButton();
    LoginPage.verifyErrorMessage("Epic sadface: Password is required");
    LoginPage.closeAndVerifyErrorMessage();
  });

  it("Logging in without using the UI and just using the cookies", () => {
    //Example of Cypress commands
    BasePage.loginStandardUserWithoutUI(
      "https://www.saucedemo.com/inventory.html"
    );
    ProductsPage.checkIfContainerVisible();
  });
});
