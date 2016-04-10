export default function (num) {
  switch (num) {
    case 1:
      return ['M', 'Monday'];
    case 2:
      return ['T', 'Tuesday'];
    case 3:
      return ['W', 'Wednesday'];
    case 4:
      return ['H', 'Thursday'];
    case 5:
      return ['F', 'Friday'];
    case 6:
      return [null, 'Saturday'];
    default:
      return [null, 'Sunday'];
  }
}
