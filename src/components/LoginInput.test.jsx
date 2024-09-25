/**
 * skenario testing
 *
 * - LoginInput component
 *   - should handle email typing correctly
 *   - should handle password typing correctly
 *   - should call login function when login button is clicked
 */

import { describe, it, expect, afterEach, vi } from "vitest";
import { render, screen, cleanup } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import LoginInput from "./LoginInput";

describe("LoginInput component", () => {
  afterEach(() => {
    cleanup(); 
  });

  it("should handle email typing correctly", async () => {
    // Arrange
    const loginMock = vi.fn();
    render(<LoginInput login={loginMock} />);

    // Act
    const emailInput = screen.getByPlaceholderText("Email");
    await userEvent.type(emailInput, "test@example.com");

    // Assert
    expect(emailInput.value).toBe("test@example.com");
  });

  it("should handle password typing correctly", async () => {
    // Arrange
    const loginMock = vi.fn();
    render(<LoginInput login={loginMock} />);

    // Act
    const passwordInput = screen.getByPlaceholderText("Password");
    await userEvent.type(passwordInput, "password123");

    // Assert
    expect(passwordInput.value).toBe("password123");
  });

  it("should call login function when login button is clicked", async () => {
    // Arrange
    const loginMock = vi.fn();
    render(<LoginInput login={loginMock} />);
    const emailInput = screen.getByPlaceholderText("Email");
    const passwordInput = screen.getByPlaceholderText("Password");
    const loginButton = screen.getByRole("button", { name: /login/i });

    // Act
    await userEvent.type(emailInput, "test@example.com");
    await userEvent.type(passwordInput, "password123");
    await userEvent.click(loginButton);

    // Assert
    expect(loginMock).toHaveBeenCalledWith({
      email: "test@example.com",
      password: "password123",
    });
    expect(loginMock).toHaveBeenCalledTimes(1); 
  });
});
