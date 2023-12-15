export const watchdog = (
  getConditionFn: () => boolean,
  falseConditionFn: () => void,
  interval: number
) => {
  let started = false;
  const start = () =>
    setInterval(() => {
      if (!getConditionFn()) {
        falseConditionFn();
      }
    }, interval * 1000);

  if (!started) {
    started = true;
    start();
  }
};
