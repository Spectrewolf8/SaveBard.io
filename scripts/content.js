// (async () => {
//   const [tab] = await chrome.tabs.query({ active: true, currentWindow: true });
//   let result;
//   try {
//     [{ result }] = await chrome.scripting.executeScript({
//       target: { tabId: tab.id },
//       func: () => document.documentElement.outerHTML,
//     });
//   } catch (e) {
//     document.body.textContent = "Cannot access page";
//     return;
//   }
//   // process the result
//   //document.body.outerHTML = result;
//   console.log(result);
// })();

// (async () => {
//   const [tab] = await chrome.tabs.query({ active: true, currentWindow: true });
//   let result;
//   try {
//     [{ result }] = await chrome.scripting.executeScript({
//       target: { tabId: tab.id },
//       func: () => document.documentElement.outerHTML,
//     });
//   } catch (e) {
//     document.body.textContent = "Cannot access page";
//     return;
//   }

//   // Create a new document from the result HTML
//   const parser = new DOMParser();
//   const doc = parser.parseFromString(result, "text/html");

//   // Remove any script elements from the new document
//   const scripts = doc.getElementsByTagName("script");
//   for (let i = scripts.length - 1; i >= 0; i--) {
//     scripts[i].parentNode.removeChild(scripts[i]);
//   }

//   // Serialize the new document back into an HTML string
//   const sanitizedResult = new XMLSerializer().serializeToString(doc);

//   // Update the body with the sanitized result HTML
//   document.body.outerHTML = sanitizedResult;

//   console.log(sanitizedResult);
// })();

// (async () => {
//   const [tab] = await chrome.tabs.query({ active: true, currentWindow: true });
//   let result;
//   try {
//     [{ result }] = await chrome.scripting.executeScript({
//       target: { tabId: tab.id },
//       func: () => document.documentElement.outerHTML,
//     });
//   } catch (e) {
//     document.body.textContent = "Cannot access page";
//     return;
//   }
//   // process the result
//   const divs = Array.from(
//     new DOMParser()
//       .parseFromString(result, "text/html")
//       .querySelectorAll("div[class*='chat-history-scroll-container']"),
//   );
//   console.log(divs);
// })();

// (async () => {
//   const [tab] = await chrome.tabs.query({ active: true, currentWindow: true });
//   let chatHistoryDivs;
//   try {
//     [{ result }] = await chrome.scripting.executeScript({
//       target: { tabId: tab.id },
//       func: () =>
//         Array.from(
//           document.querySelectorAll(
//             "div[class*='chat-history-scroll-container']",
//           ),
//         ),
//     });
//     chatHistoryDivs = result;
//   } catch (e) {
//     console.error(e);
//     return;
//   }

//   const conversationContainers = chatHistoryDivs.flatMap((div) =>
//     Array.from(div.querySelectorAll("div[class*='conversation-container']")),
//   );

//   console.log(conversationContainers);
// })();

// (async () => {
//   const [tab] = await chrome.tabs.query({ active: true, currentWindow: true });
//   let result;
//   try {
//     [{ result }] = await chrome.scripting.executeScript({
//       target: { tabId: tab.id },
//       func: () => document.documentElement.outerHTML,
//     });
//   } catch (e) {
//     document.body.textContent = "Cannot access page";
//     return;
//   }
//   const parser = new DOMParser();
//   const doc = parser.parseFromString(result, "text/html");
//   const divs = doc.querySelectorAll("[class*=chat-history-scroll-container]");
//   const conversationContainers = Array.from(divs).flatMap((div) =>
//     Array.from(div.querySelectorAll("[class*=conversation-container]")),
//   );
//   document.body.outerHTML = conversationContainers;
//   console.log(conversationContainers);
// })();

(async () => {
  const [tab] = await chrome.tabs.query({ active: true, currentWindow: true });
  let result;
  try {
    [{ result }] = await chrome.scripting.executeScript({
      target: { tabId: tab.id },
      func: () => document.documentElement.outerHTML,
    });
  } catch (e) {
    console.error("Cannot access page:", e);
    return;
  }
  const parser = new DOMParser();
  const doc = parser.parseFromString(result, "text/html");
  const divs = doc.querySelectorAll("[class*=chat-history-scroll-container]");
  const conversationContainers = Array.from(divs).flatMap((div) =>
    Array.from(div.querySelectorAll("[class*=conversation-container]")),
  );
  conversationContainers.forEach((container) => {
    console.log("Outer HTML:", container.outerHTML);
    //console.log("Inner HTML:", container.innerHTML);
  });
})();
