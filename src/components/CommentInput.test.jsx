import { describe, it, expect, afterEach, vi } from "vitest";
import { render, screen, cleanup } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import CommentInput from "./CommentInput";

describe("CommentInput component", () => {
  afterEach(cleanup);

  it("should handle content typing correctly", async () => {
    // Arrange
    const onAddCommentMock = vi.fn();
    render(<CommentInput onAddComment={onAddCommentMock} />);

    const textarea = screen.getByPlaceholderText("Add a comment...");

    // Act
    await userEvent.type(textarea, "Hello, this is a comment!");

    // Assert
    expect(textarea.value).toBe("Hello, this is a comment!");
  });

  it("should call onAddComment when form is submitted", async () => {
    // Arrange
    const onAddCommentMock = vi.fn();
    render(<CommentInput onAddComment={onAddCommentMock} />);

    const textarea = screen.getByPlaceholderText("Add a comment...");
    const button = screen.getByRole("button", { name: /submit/i });

    await userEvent.type(textarea, "This is a test comment.");
    await userEvent.click(button);

    // Assert
    expect(onAddCommentMock).toHaveBeenCalledWith("This is a test comment.");
  });

  it("should clear the textarea after submitting the comment", async () => {
    // Arrange
    const onAddCommentMock = vi.fn().mockResolvedValueOnce();
    render(<CommentInput onAddComment={onAddCommentMock} />);

    const textarea = screen.getByPlaceholderText("Add a comment...");
    const button = screen.getByRole("button", { name: /submit/i });

    await userEvent.type(textarea, "Another test comment.");
    await userEvent.click(button);

    // Assert
    expect(textarea.value).toBe("");
  });
});
