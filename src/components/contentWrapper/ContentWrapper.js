import React, { useState } from "react";
import classNames from "classnames";
import "./ContentWrapper.scss";
import CardForm from "../cardForm/CardForm";
import dummyData from "../../../src/dummy.json";

const ContentWrapper = () => {
  const [cardList, setCardList] = useState(dummyData);

  const addUpdateCardHandler = (text, card, editFlag) => {
    if (card.field === "task") {
      let updatedCards = cardList.map((goal) => {
        let activities = goal.children || [];

        activities.map((activity) => {
          if (activity.id === card.parent.id) {
            if (editFlag) {
              activity.children.map((task) => {
                if (task.id === card.id) {
                  task.text = text;
                }
                return task;
              });
            } else {
              activity.children.push({
                key: "0-1",
                id: Math.floor(Math.random() * 100),
                parent: { id: card.parent.id },
                text: text,
                field: card.field,
                color: card.color,
              });
            }
          }
          return activity;
        });
        return goal;
      });
      setCardList(updatedCards);
    } else if (card.field === "activity") {
      let updatedCards = cardList.map((goal) => {
        if (goal.id === card.parent.id) {
          if (editFlag) {
            goal.children.map((activity) => {
              if (activity.id === card.id) {
                activity.text = text;
              }
              return activity;
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
      setCardList(updatedCards);
    } else {
      if (editFlag) {
        let updatedCards = cardList.map((goal) => {
          if (goal.id === card.id) {
            goal.text = text;
          }
          return goal;
        });
        setCardList(updatedCards);
      } else {
        setCardList([
          ...cardList,
          {
            key: "0-1",
            id: Math.floor(Math.random() * 100),
            text: text,
            field: card.field,
            color: card.color,
            children: [],
          },
        ]);
      }
    }
  };

  const removeCardHandler = (card) => {
    if (card.field === "task") {
      let updatedCards = cardList.map((goal) => {
        goal.children.map((activity) => {
          let tasks = activity.children.filter((task) => task.id !== card.id);
          activity.children = tasks;
          return activity;
        });
        return goal;
      });
      setCardList(updatedCards);
    } else if (card.field === "activity") {
      let updatedCards = cardList.map((goal) => {
        goal.children = goal.children.filter(
          (activity) => activity.id !== card.id
        );
        return goal;
      });
      setCardList(updatedCards);
    } else {
      let updatedCards = cardList.filter((goal) => goal.id !== card.id);
      setCardList(updatedCards);
    }
  };

  const addChildCardHandler = (card) => {
    if (card.field === "goal") {
      let updatedCards = cardList.map((goal) => {
        if (goal.id === card.id) {
          goal.children.push({
            key: "0-1",
            id: Math.floor(Math.random() * 100),
            parent: { id: card.id },
            text: "",
            field: "activity",
            color: "#fff790",
            children: [],
          });
        }
        return goal;
      });
      setCardList(updatedCards);
    } else if (card.field === "activity") {
      let updatedCards = cardList.map((goal) => {
        let activities = goal.children || [];
        activities.map((activity) => {
          if (activity.id === card.id) {
            activity.children.push({
              key: "0-1",
              id: Math.floor(Math.random() * 100),
              parent: { id: card.id },
              text: "",
              field: "task",
              color: "#fff",
            });
          }
          return activity;
        });
        return goal;
      });
      setCardList(updatedCards);
    }
  };

  const recursion = (cardList) => {
    return (
      <div
        className={classNames("recursiveWrapper")}
        style={{
          flexDirection:
            cardList.length && cardList[0].field === "task" ? "column" : "row",
        }}
      >
        {cardList.map((card) => {
          return (
            <div key={card.id}>
              <CardForm
                addUpdateCard={addUpdateCardHandler}
                removeCard={removeCardHandler}
                card={card}
                cardList={dummyData}
              ></CardForm>
              {card.field !== "task" && card.children.length === 0 ? (
                <i
                  onClick={() => addChildCardHandler(card)}
                  className={classNames("fa fa-chevron-down", "downArrow")}
                  aria-hidden="true"
                ></i>
              ) : (
                ""
              )}
              <div>{card.children && recursion(card.children)}</div>
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
