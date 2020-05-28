import React from "react";
import ContentWrapper from "./ContentWrapper";
import { render } from "@testing-library/react";

describe("<ContentWrapper/>", () => {
  const cardList = [];
  it("Should render add button when cardList is empty", () => {
    function updatedListHandler() {
      expect(cardList.length).toBe(0);
    }
    const { container } = render(
      <ContentWrapper cardsData={[]} getUpdatedList={updatedListHandler} />
    );
    expect(container.getElementsByClassName("addCardButton")[0].innerHTML).toBe(
      "Let's add"
    );
  });
});
