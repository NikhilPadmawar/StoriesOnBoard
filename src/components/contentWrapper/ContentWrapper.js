import React, { useState, Fragment, useEffect } from "react";
import classNames from "classnames";
import "./ContentWrapper.scss";
import CardForm from "../cardForm/CardForm";
import dummyData from "../../../src/dummy.json";

const ContentWrapper = () => {
  const [cardList, setCardList] = useState(dummyData);

  const addUpdateCardHandler = (text, card, editFlag) => {
    if (card.field === "task") {
      let upDatedCards = cardList.map((goal) => {
        let activities = goal.children || [];

        activities.map((activity) => {
          if (activity.id === card.parent.id) {
            if (editFlag) {
              activity.children.map((task) => {
                if (task.id === card.id) {
                  task.text = text;
                }
              });
            } else {
              activity.children.push({
                key: "0-1",
                id: Math.floor(Math.random() * 100),
                parent: { id: card.parent.id },
                text: text,
                field: card.field,
                color: card.color,
                children: [],
              });
            }
          }
          return activity;
        });
        return goal;
      });
      setCardList(upDatedCards);
    } else if (card.field === "activity") {
      let upDatedCards = cardList.map((goal) => {
        if (goal.id === card.parent.id) {
          if (editFlag) {
            goal.children.map((activity) => {
              if (activity.id === card.id) {
                activity.text = text;
              }
            });
          } else {
            goal.children.push({
              key: "0-1",
              id: Math.floor(Math.random() * 100),
              parent: { id: card.parent.id },
              text: text,
              field: card.field,
              color: card.color,
              children: [],
            });
          }
        }
        return goal;
      });
      setCardList(upDatedCards);
    } else {
      if (editFlag) {
        let upDatedCards = cardList.map((goal) => {
          if (goal.id === card.id) {
            goal.text = text;
          }
          return goal;
        });
        setCardList(upDatedCards);
      } else {
        setCardList([
          ...cardList,
          {
            key: "0-1",
            id: Math.floor(Math.random() * 100),
            text: text,
            field: card.field,
            color: card.color,
          },
        ]);
      }
    }
  };

  const removeCardHandler = (card) => {
    if (card.field === "task") {
      let upDatedCards = cardList.map((goal) => {
        goal.children.map((activity) => {
          let tasks = activity.children.filter((task) => task.id !== card.id);
          activity.children = tasks;
          return activity;
        });
        return goal;
      });
      setCardList(upDatedCards);
    } else if (card.field === "activity") {
      let upDatedCards = cardList.map((goal) => {
        goal.children = goal.children.filter(
          (activity) => activity.id !== card.id
        );
        return goal;
      });
      setCardList(upDatedCards);
    } else {
      let upDatedCards = cardList.filter((goal) => goal.id !== card.id);
      setCardList(upDatedCards);
    }
  };

  const recursion = (cards) => {
    return (
      <div
        className={classNames("recursiveWrapper")}
        style={{
          flexDirection:
            cards.length && cards[0].field === "task" ? "column" : "row",
        }}
      >
        {cards.map((card) => {
          return (
            <div key={card.id}>
              <CardForm
                addUpdateCard={addUpdateCardHandler}
                removeCard={removeCardHandler}
                card={card}
                cardList={dummyData}
              ></CardForm>

              <div> {card.children && recursion(card.children)} </div>
            </div>
          );
        })}
      </div>
    );
  };

  return (
    <div className={classNames("contentWrapper")}>{recursion(cardList)}</div>
  );
};

export default ContentWrapper;
