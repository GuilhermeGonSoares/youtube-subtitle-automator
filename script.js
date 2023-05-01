const form = document.querySelector('form');

const saveLocalStorage = (selectedOption) => {
  alert(`Legenda selecionada: ${selectedOption}`);
  localStorage.setItem('selectedOption', selectedOption);
  window.close();
};

form.addEventListener('submit', async (event) => {
  event.preventDefault();

  let [tab] = await chrome.tabs.query({ active: true, currentWindow: true });

  let selectedOption = document.getElementById('subtitles').value;
  console.log(selectedOption);

  chrome.scripting.executeScript({
    target: { tabId: tab.id },
    function: saveLocalStorage,
    args: [selectedOption],
  });
});
