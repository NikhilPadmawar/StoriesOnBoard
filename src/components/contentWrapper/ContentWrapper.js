import React, { useState, useEffect } from "react";
import classNames from "classnames";
import "./ContentWrapper.scss";
import CardForm from "../cardForm/CardForm";

const ContentWrapper = ({ cardsData, getUpdatedList }) => {
  const [cardList, setCardList] = useState(cardsData);

  useEffect(() => {
    getUpdatedList(cardList);
    updatedEstimation(cardList);
  }, [cardList, getUpdatedList]);

  console.log(cardList);

  const updatedEstimation = (goals) => {
    goals.reduce((accGoal, goal) => {
      const sumAct = goal.children.reduce((accActivity, activity) => {
        const sumTask = activity.children.reduce((accTasks, task) => {
          accTasks = accTasks + task.estimation;
          return accTasks;
        }, 0);
        activity.ATasksEstimation = sumTask;
        accActivity = accActivity + activity.ATasksEstimation;
        return accActivity;
      }, 0);
      goal.AActivityEstimation = sumAct;
      return accGoal;
    }, 0);
    setCardList(goals);
  };

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
                id: Math.floor(Math.random() * 100),
                parent: { id: card.parent.id },
                text: text,
                field: card.field,
                estimation: 5,
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
              id: Math.floor(Math.random() * 100),
              parent: { id: card.parent.id },
              text: text,
              field: card.field,
              color: card.color,
              ATasksEstimation: 8,
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
            id: Math.floor(Math.random() * 100),
            text: text,
            field: card.field,
            color: card.color,
            AActivityEstimation: 9,
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
          let tasks = activity.children.filter((task) => {
            return task.id !== card.id;
          });
          activity.children = tasks;
          return activity;
        });
        return goal;
      });
      setCardList(updatedCards);
    } else if (card.field === "activity") {
      let updatedCards = cardList.map((goal) => {
        goal.children = goal.children.filter((activity) => {
          return activity.id !== card.id;
        });
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
            id: Math.floor(Math.random() * 100),
            parent: { id: card.id },
            text: "",
            field: "activity",
            color: "#fff790",
            ATasksEstimation: 3,
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
              id: Math.floor(Math.random() * 100),
              parent: { id: card.id },
              text: "",
              field: "task",
              estimation: 4,
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

  const addCardHandler = () => {
    setCardList([
      ...cardList,
      {
        id: Math.floor(Math.random() * 100),
        text: "",
        field: "goal",
        color: "#b3d7eb",
        AActivityEstimation: 2,
        children: [],
      },
    ]);
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
                cardList={cardList}
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
    <div className={classNames("contentWrapper")}>
      {cardList.length !== 0 ? (
        recursion(cardList)
      ) : (
        <div className={classNames("addCardContainer")}>
          <button
            className={classNames("addCardButton")}
            onClick={addCardHandler}
          >
            Let's add
          </button>
          <p className={classNames("addTitleContainer")}>
            {" "}
            your first card to this board.{" "}
          </p>
        </div>
      )}
    </div>
  );
};

export default ContentWrapper;
