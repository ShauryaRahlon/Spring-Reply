console.log("Gmail AI Reply Extension Loaded");

function injectButton() {
    // Gmail's reply button container selector (this is brittle and might change)
    // We look for the "Send" button row usually
    const toolbar = document.querySelector('tr.btC');
    
    if (toolbar && !document.querySelector('.ai-reply-btn')) {
        const button = document.createElement('button');
        button.innerText = "Reply with AI";
        button.className = "ai-reply-btn";
        button.type = "button"; // Prevent form submission
        
        button.addEventListener('click', async () => {
            button.innerText = "Generating...";
            button.disabled = true;
            
            try {
                // Try to get the email body. This is also brittle.
                // Looking for the last open email body.
                const emailBodyElement = document.querySelector('.a3s.aiL'); 
                const emailContent = emailBodyElement ? emailBodyElement.innerText : "";

                // Send message to background script to handle the fetch
                chrome.runtime.sendMessage(
                    { action: "generateReply", content: emailContent },
                    (response) => {
                        if (response && response.success) {
                            // Insert into compose box
                            const composeBox = document.querySelector('div[role="textbox"][contenteditable="true"]');
                            if (composeBox) {
                                composeBox.innerText = response.data.reply;
                            } else {
                                alert("Could not find compose box to insert reply.");
                            }
                        } else {
                            console.error("Error generating reply:", response ? response.error : "Unknown error");
                            alert("Failed to generate reply. Ensure backend is running.");
                        }
                        
                        button.innerText = "Reply with AI";
                        button.disabled = false;
                    }
                );
                
            } catch (error) {
                console.error("Error in click handler:", error);
                button.innerText = "Reply with AI";
                button.disabled = false;
            }
        });

        // Insert before the send button or at the beginning of the toolbar
        const sendButton = toolbar.querySelector('div[role="button"]');
        if (sendButton) {
            sendButton.parentElement.insertBefore(button, sendButton);
        } else {
            toolbar.appendChild(button);
        }
    }
}

// Run periodically to handle dynamic loading of Gmail
setInterval(injectButton, 2000);
