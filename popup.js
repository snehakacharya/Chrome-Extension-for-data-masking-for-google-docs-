document.addEventListener('DOMContentLoaded', () => {
  document.getElementById('replaceInfo').addEventListener('click', () => {
    chrome.runtime.sendMessage({ action: 'replaceSensitiveInfo' }, (response) => {
      console.log(response.message);
    });
  });
});
