import React, { useState } from "react";
import Header from "../../components/header/Header";
import ContentWrapper from "../../components/contentWrapper/ContentWrapper";
import dummyData from "../../../src/dummy.json";

const StoryBoardContainer = () => {
  const [cardList, setCardList] = useState([]);
  const updatedListHandler = (data) => {
    setCardList(data);
  };

  return (
    <div>
      <Header cardsData={cardList}></Header>
      <ContentWrapper
        cardsData={dummyData}
        getUpdatedList={updatedListHandler}
      ></ContentWrapper>
    </div>
  );
};

export default StoryBoardContainer;
