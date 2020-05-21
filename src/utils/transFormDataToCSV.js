import React from "react";

const transFormData = (goals) => {
  const transFormList = goals.reduce((accGoal, goal) => {
    const reducedActivity =
      goal.children.length !== 0
        ? goal.children.reduce((accActivity, activity) => {
            const reducedTasks =
              activity.children.length !== 0
                ? activity.children.reduce((accTask, task) => {
                    accTask.push({
                      Goal: goal.text,
                      Activity: activity.text,
                      Task: task.text,
                      Estimation: task.estimation,
                    });
                    return accTask;
                  }, [])
                : [
                    {
                      Goal: goal.text,
                      Activity: activity.text,
                      Task: "",
                      Estimation: null,
                    },
                  ];
            accActivity = [...accActivity, ...reducedTasks];
            return accActivity;
          }, [])
        : [
            {
              Goal: goal.text,
              Activity: "",
              Task: "",
              Estimation: null,
            },
          ];
    accGoal = [...accGoal, ...reducedActivity];
    return accGoal;
  }, []);
  return transFormList;
};

export default transFormData;
