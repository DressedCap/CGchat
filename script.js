document.getElementById("sendBtn").addEventListener("click", sendMessage);

function sendMessage() {
    const userInput = document.getElementById("userInput").value;
    if (userInput === "") return;

    displayMessage("User", userInput);
    document.getElementById("userInput").value = ""; // Clear input

    // Show loading message
    document.getElementById("loading").style.display = "block";

    // API call to backend AI server
    fetch('https://api.openai.com/v1/completions', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer YOUR_OPENAI_API_KEY'  // Replace with your API Key
        },
        body: JSON.stringify({
            model: "text-davinci-003",
            prompt: userInput,
            max_tokens: 100
        })
    })
    .then(response => response.json())
    .then(data => {
        const aiResponse = data.choices[0].text.trim();
        displayMessage("ChatCG", aiResponse);
    })
    .catch(error => {
        console.error("Error:", error);
        displayMessage("ChatCG", "Sorry, I encountered an error. Please try again.");
    })
    .finally(() => {
        document.getElementById("loading").style.display = "none"; // Hide loading message
    });
}

function displayMessage(sender, message) {
    const messageContainer = document.getElementById("messages");
    const newMessage = document.createElement("div");
    newMessage.classList.add("message");

    if (sender === "User") {
        newMessage.classList.add("user-message");
    } else {
        newMessage.classList.add("ai-message");
    }

    newMessage.textContent = `${sender}: ${message}`;
    messageContainer.appendChild(newMessage);
    messageContainer.scrollTop = messageContainer.scrollHeight;
}
