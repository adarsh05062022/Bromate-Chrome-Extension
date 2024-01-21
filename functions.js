function capitalizeText(inputText) {
  // Capitalize the first letter of the entire text
  let result = inputText.charAt(0).toUpperCase() + inputText.slice(1);

  // Capitalize the first letter of each sentence after a full stop
  result = result.replace(/\. *([a-zA-Z])/g, function (match) {
    return match.toUpperCase();
  });

  return result;
}

function copyToClipboard(text) {
  navigator.clipboard
    .writeText(text)
    .then(() => {
      console.log("Text copied to clipboard");
    })
    .catch((err) => {
      console.error("Unable to copy text to clipboard", err);
    });
}
