import matchDay from './matchDay';
const assignTime = time => time - 10 < 0 ? `0${time}` : time;

export default function () {
  const date = new Date();

  const day = matchDay(date.getDay());
  const hours = assignTime(date.getHours());
  const minutes = assignTime(date.getMinutes());
  const seconds = assignTime(date.getSeconds());
  const totalTime = hours * 60 + minutes;

  return {
    day,
    hours,
    minutes,
    seconds,
    totalTime,
  };
}
