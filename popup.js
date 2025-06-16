document.getElementById('clearCookies').addEventListener('click', async () => {
  const [tab] = await chrome.tabs.query({ active: true, currentWindow: true });
  const url = new URL(tab.url);
  const domain = url.hostname;

  chrome.runtime.sendMessage({ action: "clearCookies", domain: domain }, (response) => {
    document.getElementById("status").textContent = response.message;
  });
});
