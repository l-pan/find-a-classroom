// if an element is in the array
export function notInArray(element, arr) {
  if (!element) {
    return false;
  }

  for (let i = 0; i < arr.length; i++) {
    if (element === arr[i]) {
      return false;
    }
  }
  return true;
}

export function findRoom(name, arr) {
  for (let i = 0; i < arr.length; i++) {
    if (arr[i].name === name) {
      return i;
    }
  }
  return -1;
}

// convert string time to minute. eg. toMinute('10:00') => 600
export function toMinute(string) {
  const arr = string.split(':');
  return arr[0] * 60 + arr[1] * 1;
}

export function toTime(minute) {
  const hours = minute / 60 === 24 ? '0' : Math.floor(minute / 60);
  const mins = minute % 60 ? minute % 60 : '00';

  return `${hours}:${mins}`;
}
