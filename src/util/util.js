import { useMainStore } from "@/stores/MainStore";

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
export async function getReq(url, customText = {}) {
  const mainStore = useMainStore();
  const token = localStorage.getItem("token");
  return await fetch(buildUrl(url), {
    method: "GET", // *GET, POST, PUT, DELETE, etc.
    mode: "cors", // no-cors, *cors, same-origin
    cache: "no-cache", // *default, no-cache, reload, force-cache, only-if-cached
    credentials: "same-origin", // include, *same-origin, omit
    headers: {
      "Content-Type": "application/json",
      Authorization: token,
      // 'Content-Type': 'application/x-www-form-urlencoded',
    },
    redirect: "follow", // manual, *follow, error
    referrerPolicy: "no-referrer", // no-referrer, *no-referrer-when-downgrade, origin, origin-when-cross-origin, same-origin, strict-origin, strict-origin-when-cross-origin, unsafe-url
  })
    .then((response) => {
      if (response.ok) {
        if (customText[response.status]) {
          mainStore.setSnackbar(customText[response.status], "green");
        }
        return response.json();
      } else {
        let errorText =
          response.status === 403
            ? "You're not authorized to perform this action"
            : "Something went wrong!";
        if (customText[response.status] || customText["err"]) {
          errorText = customText[response.status];
        }
        mainStore.setSnackbar(errorText);
        throw new Error(errorText);
      }
    })
    .catch((error) => {
      console.error(error);
    });
}

// Example POST method implementation:
export async function postReq(url = "", data = {}, customText = {}) {
  const mainStore = useMainStore();
  const token = localStorage.getItem("token");
  // Default options are marked with *
  const response = await fetch(buildUrl(url), {
    method: "POST", // *GET, POST, PUT, DELETE, etc.
    mode: "cors", // no-cors, *cors, same-origin
    cache: "no-cache", // *default, no-cache, reload, force-cache, only-if-cached
    credentials: "same-origin", // include, *same-origin, omit
    headers: {
      "Content-Type": "application/json",
      Authorization: token,
      // 'Content-Type': 'application/x-www-form-urlencoded',
    },
    redirect: "follow", // manual, *follow, error
    referrerPolicy: "no-referrer", // no-referrer, *no-referrer-when-downgrade, origin, origin-when-cross-origin, same-origin, strict-origin, strict-origin-when-cross-origin, unsafe-url
    body: JSON.stringify(data), // body data type must match "Content-Type" header
  })
    .then((response) => {
      if (response.ok) {
        if (customText[response.status]) {
          mainStore.setSnackbar(customText[response.status], "green");
        }
        return response.json();
      } else {
        let errorText =
          response.status === 403
            ? "You're not authorized to perform this action"
            : "Something went wrong!";
        if (customText[response.status] || customText["err"]) {
          errorText = customText[response.status];
        }
        mainStore.setSnackbar(errorText);
        throw new Error(errorText);
      }
    })
    .catch((error) => {
      console.error(error);
    });
  return response; // parses JSON response into native JavaScript objects
}
