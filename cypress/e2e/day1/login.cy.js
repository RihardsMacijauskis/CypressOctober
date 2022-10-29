import {ProductsPage} from "../../pageObjects/productsPage";
import {loginPage} from "../../pageObjects/loginPage";
import {BasePage} from "../../pageObjects/basePage";

describe("Login test cases", () => {

    before(() => {
        cy.log("Starting all the test cases and doing something before all of them")
    })

    after(() => {
        cy.log("Doing something after the testcases have been run")
    })

    beforeEach(() => {
        cy.visit("https://www.saucedemo.com")
    })

    afterEach(() => {
        cy.log("Running this after each of the testcase")
    })

    it("Logging in with a valid user", () => {
        loginPage.inputLoginDataAndLogin("standard_user", "secret_sauce")
        ProductsPage.checkIfContainerVisible()
    })

    it("Logging in with an invalid user", () => {
        loginPage.inputLoginDataAndLogin("standard_user", "secret----sauce")
        loginPage.verifyErrorMessage("Epic sadface: Username and password do not match any user in this service")
        cy.get("[data-test=error]").should("have.text", "Epic sadface: Username and password do not match any user in this service")
    })

    it("Logging in with a locked out user", () => {
        loginPage.inputLoginDataAndLogin("locked_out_user", "secret_sauce")
        loginPage.verifyErrorMessage("Epic sadface: Sorry, this user has been locked out.")
        ProductsPage.verifyContainerNotExisting()
    })

    it("Closing error message when no password is entered", () => {
        loginPage.inputUsername("standard_user")
        loginPage.clickLoginButton()
        loginPage.verifyErrorMessage("Epic sadface: Password is required")
        loginPage.closeAndVerifyErrorMessage()
    })

    it("Logging in without using the UI and just using the cookies", () =>{
        //Example of Cypress commands
        BasePage.loginStandardUserWithoutUI()
        ProductsPage.checkIfContainerVisible()
    })
})