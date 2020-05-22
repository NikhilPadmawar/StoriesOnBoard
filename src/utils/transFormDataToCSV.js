const transFormData = (goals) => {
  const transFormList = goals.reduce((accGoal, goal) => {
    const reducedActivity =
      goal.children.length !== 0
        ? goal.children.reduce((accActivity, activity) => {
            const reducedTasks =
              activity.children.length !== 0
                ? activity.children.reduce((accTask, task) => {
                    accTask.push({
                      Goal: goal.title,
                      Activity: activity.title,
                      Task: task.title,
                      Estimation: task.estimation,
                    });
                    return accTask;
                  }, [])
                : [
                    {
                      Goal: goal.title,
                      Activity: activity.title,
                      Task: "",
                      Estimation: null,
                    },
                  ];
            accActivity = [...accActivity, ...reducedTasks];
            return accActivity;
          }, [])
        : [
            {
              Goal: goal.title,
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
