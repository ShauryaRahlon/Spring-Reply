chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
    if (request.action === "generateReply") {
        fetch('http://localhost:8080/api/reply', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ content: request.content, type: request.type || "EMAIL" })
        })
        .then(response => response.json())
        .then(data => sendResponse({ success: true, data: data }))
        .catch(error => sendResponse({ success: false, error: error.message }));
        
        return true; // Will respond asynchronously
    }
});
