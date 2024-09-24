/* eslint-disable no-undef */
/**
 * - Login spec
 *   - should display login page correctly
 *   - should display alert when email is empty
 *   - should display alert when password is empty
 *   - should display alert when email and password are wrong
 *   - should display homepage when email and password are correct
 */

import { beforeEach, describe, expect, it } from "vitest";

describe("Login spec", () => {
  beforeEach(() => {
    cy.visit("http://localhost:5173/");
  });

  it("should display login page correctly", () => {
    cy.get('input[placeholder="Email"]').should("be.visible");
    cy.get('input[placeholder="Password"]').should("be.visible");
    cy.get("button")
      .contains(/^Login$/)
      .should("be.visible");
  });

  it("should display alert when password is empty", () => {
    cy.get('input[placeholder="Email"]').type("testuser@example.com");

    cy.get("button")
      .contains(/^Login$/)
      .click();

    cy.on("window:alert", (str) => {
      expect(str).to.equal('"password" is not allowed to be empty');
    });
  });

  it("should display alert when email is empty", () => {
    cy.get('input[placeholder="Password"]').type("testpassword");

    cy.get("button")
      .contains(/^Login$/)
      .click();

    cy.on("window:alert", (str) => {
      expect(str).to.equal('"email" is not allowed to be empty');
    });
  });

  it("should display alert when email and password are wrong", () => {
    cy.get('input[placeholder="Email"]').type("testuser@example.com");

    cy.get('input[placeholder="Password"]').type("wrong_password");

    cy.get("button")
      .contains(/^Login$/)
      .click();

    cy.on("window:alert", (str) => {
      expect(str).to.equal("User ID or password is wrong");
    });
  });

  it("should display homepage when email and password are correct", () => {
    cy.get('input[placeholder="Email"]').type("alfi123@gmail.com");

    cy.get('input[placeholder="Password"]').type("123123");

    cy.get("button")
      .contains(/^Login$/)
      .click();

    cy.get("nav")
      .contains(/^Home$/)
      .should("be.visible");
    cy.get("button").contains("Sign out").should("be.visible");
  });
});
