import request from 'superagent';

let host = 'localhost:9000';

if (typeof(window) !== 'undefined') {
  const url = window.location.hostname;

  // in production
  if (url !== 'localhost') {
    host = window.location.hostname;
  }
}

export default function (callback) {
  const getUrl = `http://${host}/rooms`;
  return request.get(getUrl).end(callback);
}
