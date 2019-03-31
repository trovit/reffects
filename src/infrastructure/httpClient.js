export function get({url, successFn}) {
  fetch(url)
      .then(res => res.json())
      .then(response => successFn(response));
}
