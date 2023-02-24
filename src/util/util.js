const TLD = "http://localhost:8080/";

export function buildUrl(url) {
  return TLD + url;
}

export async function getReq(url, snackbarMethod) {
  fetch(url)
    .then((response) => {
      if (response.ok) {
        return response.json();
      } else {
        throw new Error("Something went wrong");
      }
    })
    .then((data) => data)
    .catch((error) => {
      console.error(error);
      snackbarMethod();
    });
}
