const TLD = "http://localhost:8080/";

export function buildUrl(url) {
  return TLD + url;
}

export async function getReq(url, snackbarMethod) {
  fetch(url)
    .then((response) => response.json)
    .then((data) => data)
    .catch((error) => {
      snackbarMethod(error);
    });
}
