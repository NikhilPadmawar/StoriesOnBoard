import React from "react";
import Header from "./Header";
import { render } from "@testing-library/react";

describe("<Header/>", () => {
  it("Should have logo name as TW Story Board", () => {
    const { getByText, container } = render(<Header />);
    let logo = getByText("TW Story Board");
    expect(logo).toBeTruthy();
  });
});
