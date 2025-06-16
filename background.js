chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (request.action === "clearCookies") {
    const domain = request.domain;

    chrome.cookies.getAll({ domain }, (cookies) => {
      if (cookies.length === 0) {
        sendResponse({ message: "No cookies found for this site." });
          console.log("No cookies ):")
        return;
      }

      cookies.forEach(cookie => {
        const protocol = cookie.secure ? "https:" : "http:";
        const cookieUrl = `${protocol}//${cookie.domain.replace(/^\./, '')}${cookie.path}`;

        chrome.cookies.remove({
          url: cookieUrl,
          name: cookie.name
        });
      });

      sendResponse({ message: `Cleared ${cookies.length} cookie(s).` });
        console.log("Sorry Grandma, no more cookies.")
    });

    // Return true to indicate we’ll respond asynchronously
    return true;
  }
});
