const TLD = "http://localhost:8080/";

export function buildUrl(url) {
  return TLD + url;
}

export async function getReq(url, snackbarMethod) {
  return await fetch(buildUrl(url))
    .then((response) => {
      if (response.ok) {
        return response.json();
      } else if (response.status === 404) {
        throw new Error("404 Not Found");
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
