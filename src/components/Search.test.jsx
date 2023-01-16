import { render, screen, fireEvent, cleanup } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import { describe, it } from "vitest";
import Header from "./Header";

afterEach(cleanup);
describe("Header renders correctly", async () => {
  it("Should render header without search bar", () => {
    render(
      <BrowserRouter>
        <Header />
      </BrowserRouter>
    );

    expect(screen.getByRole("contentinfo")).toBeVisible();
    expect(screen.queryByRole("search")).toBe(null);

    fireEvent.click(screen.getByRole("button"));

    expect(screen.queryByRole("search")).toBeVisible();
    expect(screen.queryByTestId("searchResult")).toBe(null);
    expect(screen.queryByTitle(/clear search/i)).not.toBeInTheDocument();
    expect(screen.queryByRole("list")).not.toBeInTheDocument();
    expect(screen.getByRole("searchbox")).toHaveValue("");

    fireEvent.change(screen.getByRole("searchbox"), {
      target: { value: "test" },
    });

    expect(screen.getByRole("searchbox")).toHaveValue("test");
    expect(screen.queryByTitle(/clear search/i)).toBeVisible();
    expect(screen.queryByRole("list")).toBeVisible();

    fireEvent.click(screen.queryByTitle(/clear search/i));

    expect(screen.getByRole("searchbox")).toHaveValue("");
    expect(screen.queryByTitle(/clear search/i)).not.toBeInTheDocument();
    expect(screen.queryByRole("list")).not.toBeInTheDocument();
  });
});
