import React from "react";
import { render } from "@testing-library/react";
import CardForm from "./CardForm";

describe("<CardForm/>", () => {
  it("Should render title when edit flag is false", () => {
    const card = {
      id: 21,
      parent: { id: 2 },
      title: "My First Card",
      type: "goal",
      estimation: 8,
      children: [],
    };

    const { getByText, container } = render(<CardForm card={card} />);
    let title = getByText("My First Card");
    expect(title).toBeTruthy();

    expect(
      container.getElementsByClassName("alignTotal")[0].innerHTML
    ).toContain(card.estimation);
  });
});
