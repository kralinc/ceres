const TLD = "http://localhost:8080/";

// = Parameters =
// url: Everything after the top level domain that you want to request
// e.g. If you want to access http://localhost:8080/recipe, the value of url will be "recipe"
// ==
// returns: string
//
// this method returns a URL using the top level domain defined above
export function buildUrl(url) {
  return TLD + url;
}

// = Parameters =
// url: The url that you're making a get request from
// snackbarMethod: the component method which will be used to display the snackbar message at the bottom of the page.
// This is itself a wrapper method for a pinia action (setSnackbar) which can be found in src/stores/MainStore.js
// ==
// returns: json
//
// This method is a wrapper for the fetch API for basic get requests.
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
