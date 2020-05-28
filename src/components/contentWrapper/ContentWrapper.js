import React, { useState, useEffect } from "react";
import classNames from "classnames";
import "./ContentWrapper.scss";
import CardForm from "../cardForm/CardForm";

const ContentWrapper = ({ cardsData, getUpdatedList }) => {
  const [cardList, setCardList] = useState(cardsData);

  useEffect(() => {
    getUpdatedList(cardList);
    updatedEstimations(cardList);
  }, [cardList, getUpdatedList]);

  const updatedEstimations = (goals) => {
    goals.reduce((accGoal, goal) => {
      const sumActivity = goal.children.reduce((accActivity, activity) => {
        const sumTask = activity.children.reduce((accTasks, task) => {
          accTasks = accTasks + task.estimation;
          return accTasks;
        }, 0);
        activity.estimation = sumTask;
        accActivity = accActivity + activity.estimation;
        return accActivity;
      }, 0);
      goal.estimation = sumActivity;
      return accGoal;
    }, 0);
    setCardList(goals);
  };

  const updateCardHandler = (title, card) => {
    if (card.type === "task") {
      let updatedCards = cardList.map((goal) => {
        let activities = goal.children || [];
        activities.map((activity) => {
          if (activity.id === card.parent.id) {
            activity.children.map((task) => {
              if (task.id === card.id) {
                task.title = title;
              }
              return task;
            });
          }
          return activity;
        });
        return goal;
      });
      setCardList(updatedCards);
    } else if (card.type === "activity") {
      let updatedCards = cardList.map((goal) => {
        if (goal.id === card.parent.id) {
          goal.children.map((activity) => {
            if (activity.id === card.id) {
              activity.title = title;
            }
            return activity;
          });
        }
        return goal;
      });
      setCardList(updatedCards);
    } else {
      let updatedCards = cardList.map((goal) => {
        if (goal.id === card.id) {
          goal.title = title;
        }
        return goal;
      });
      setCardList(updatedCards);
    }
  };

  const addNewCardHandler = (card) => {
    if (card.type === "task") {
      let updatedCards = cardList.map((goal) => {
        let activities = goal.children || [];

        activities.map((activity) => {
          if (activity.id === card.parent.id) {
            activity.children.push({
              id: Math.floor(Math.random() * 100),
              parent: { id: card.parent.id },
              title: "",
              type: card.type,
              estimation: 5,
            });
          }

          return activity;
        });
        return goal;
      });
      setCardList(updatedCards);
    } else if (card.type === "activity") {
      let updatedCards = cardList.map((goal) => {
        if (goal.id === card.parent.id) {
          goal.children.push({
            id: Math.floor(Math.random() * 100),
            parent: { id: card.parent.id },
            title: "",
            type: card.type,
            estimation: 8,
            children: [],
          });
        }
        return goal;
      });
      setCardList(updatedCards);
    } else {
      setCardList([
        ...cardList,
        {
          id: Math.floor(Math.random() * 100),
          title: "",
          type: card.type,
          estimation: 9,
          children: [],
        },
      ]);
    }
  };

  const removeCardHandler = (card) => {
    if (card.type === "task") {
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
    } else if (card.type === "activity") {
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
    if (card.type === "goal") {
      let updatedCards = cardList.map((goal) => {
        if (goal.id === card.id) {
          goal.children.push({
            id: Math.floor(Math.random() * 100),
            parent: { id: card.id },
            title: "",
            type: "activity",
            estimation: 3,
            children: [],
          });
        }
        return goal;
      });
      setCardList(updatedCards);
    } else if (card.type === "activity") {
      let updatedCards = cardList.map((goal) => {
        let activities = goal.children || [];
        activities.map((activity) => {
          if (activity.id === card.id) {
            activity.children.push({
              id: Math.floor(Math.random() * 100),
              parent: { id: card.id },
              title: "",
              type: "task",
              estimation: 4,
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
        title: "",
        type: "goal",
        estimation: 2,
        children: [],
      },
    ]);
  };

  const cardContainer = (cardList) => {
    return (
      <div
        className={classNames("recursiveWrapper")}
        style={{
          flexDirection:
            cardList.length && cardList[0].type === "task" ? "column" : "row",
        }}
      >
        {cardList.map((card) => {
          return (
            <div key={card.id}>
              <CardForm
                addCard={addNewCardHandler}
                updateCard={updateCardHandler}
                removeCard={removeCardHandler}
                card={card}
              ></CardForm>
              {card.type !== "task" && card.children.length === 0 ? (
                <i
                  onClick={() => addChildCardHandler(card)}
                  className={classNames("fa fa-chevron-down", "downArrow")}
                  aria-hidden="true"
                ></i>
              ) : (
                ""
              )}
              <div>{card.children && cardContainer(card.children)}</div>
            </div>
          );
        })}
      </div>
    );
  };

  return (
    <div className={classNames("contentWrapper")}>
      {cardList.length !== 0 ? (
        cardContainer(cardList)
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
