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

// This method is a wrapper for the fetch API for basic get requests.
export async function getReq(url, customText = {}) {
  const token = localStorage.getItem("token");
  const requestBody = {
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
  };

  return await fetchWrapper(url, requestBody, customText);
}

// Example POST method implementation:
export async function postReq(url = "", data = {}, customText = {}) {
  const token = localStorage.getItem("token");
  const requestBody = {
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
  };
  return await fetchWrapper(url, requestBody, customText);
}

async function fetchWrapper(url, requestBody, customText) {
  const mainStore = useMainStore();

  return await fetch(buildUrl(url), requestBody)
    .then((response) => {
      if (response.ok) {
        if (customText[response.status]) {
          mainStore.setSnackbar(customText[response.status], "green");
        }
        const contentType = response.headers.get("content-type");

        return contentType && contentType.indexOf("application/json") !== -1
          ? response.json()
          : response.text();
      } else {
        let errorText =
          response.status === 403
            ? "You're not authorized to perform this action"
            : "Something went wrong!";
        if (customText[response.status]) {
          errorText = customText[response.status];
        } else if (customText["err"]) {
          errorText = customText["err"];
        }
        mainStore.setSnackbar(errorText);
        throw new Error(errorText);
      }
    })
    .catch((error) => {
      console.error(error);
    });
}

export function eraseCachedPantryRecipes() {
  const mainStore = useMainStore();
  mainStore.erasePantrySearchValues();
}
