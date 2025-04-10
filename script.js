const chatLog = document.getElementById('chat-log');
const userInput = document.getElementById('user-input');
const sendButton = document.getElementById('send-button');

sendButton.addEventListener('click', sendMessage);
userInput.addEventListener('keydown', (e) => {
  if (e.key === 'Enter') sendMessage();
});

async function sendMessage() {
  const message = userInput.value.trim();
  if (message === '') return;

  appendMessage('user', message);
  userInput.value = '';

  const loadingText = 'Typing';
  let dotCount = 0;
  const typingInterval = setInterval(() => {
    replaceLastBotMessage(`${loadingText}${'.'.repeat(dotCount % 4)}`);
    dotCount++;
  }, 500);

  appendMessage('bot', 'Typing');

  try {
    const response = await fetch('http://localhost:3000/gemini', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ message }),
    });

    const data = await response.json();
    clearInterval(typingInterval);
    replaceLastBotMessage(data.reply || 'No reply received.');
  } catch (err) {
    clearInterval(typingInterval);
    replaceLastBotMessage('⚠️ Error fetching response.');
  }
}

function appendMessage(sender, text) {
  const div = document.createElement('div');
  div.className = `${sender}-message`;
  div.textContent = text;
  chatLog.appendChild(div);
  chatLog.scrollTop = chatLog.scrollHeight;
}

function replaceLastBotMessage(text) {
    const botMessages = document.querySelectorAll('.bot-message');
    if (botMessages.length > 0) {
      botMessages[botMessages.length - 1].textContent = text;
    }
  }
  
