console.log("GitHub AI Review Extension Loaded");

function injectButton() {
    // Look for the PR review toolbar or comment box
    // This selector targets the review actions bar or the comment form
    const toolbar = document.querySelector('.js-reviews-container, .timeline-comment-wrapper');
    
    if (toolbar && !document.querySelector('.ai-review-btn')) {
        const button = document.createElement('button');
        button.innerText = "Review with AI";
        button.className = "ai-reply-btn ai-review-btn"; // Reuse styles
        button.type = "button";
        button.style.marginLeft = "10px";
        
        button.addEventListener('click', async () => {
            button.innerText = "Reviewing...";
            button.disabled = true;
            
            try {
                // Get PR diff or description. 
                // For simplicity, let's grab the PR title and description, and maybe some visible diffs if possible.
                // Getting the full diff is hard without API. Let's grab the PR description and title.
                const title = document.querySelector('.js-issue-title')?.innerText || "";
                const description = document.querySelector('.comment-body')?.innerText || "";
                
                // We can also try to grab the files changed tab content if active, but let's start with description.
                const content = `PR Title: ${title}\n\nDescription:\n${description}`;

                chrome.runtime.sendMessage(
                    { action: "generateReply", content: content, type: "PR_REVIEW" },
                    (response) => {
                        if (response && response.success) {
                            // Insert into new comment box
                            const commentBox = document.querySelector('textarea[name="comment[body]"]');
                            if (commentBox) {
                                commentBox.value = response.data.reply;
                                // Trigger input event to resize/activate buttons if needed
                                commentBox.dispatchEvent(new Event('input', { bubbles: true }));
                            } else {
                                alert("Could not find comment box to insert review.");
                            }
                        } else {
                            console.error("Error generating review:", response ? response.error : "Unknown error");
                            alert("Failed to generate review. Ensure backend is running.");
                        }
                        
                        button.innerText = "Review with AI";
                        button.disabled = false;
                    }
                );
                
            } catch (error) {
                console.error("Error in click handler:", error);
                button.innerText = "Review with AI";
                button.disabled = false;
            }
        });

        // Insert button. Finding the right place is tricky.
        // Let's try to append to the header of the comment box or near the "File changes" tab.
        // For now, let's just float it fixed or append to body for testing if toolbar is hard.
        // Actually, let's try to find the "Leave a comment" header or similar.
        const header = document.querySelector('#partial-new-comment-form-actions');
        if (header) {
             header.appendChild(button);
        } else {
            // Fallback: Fixed position bottom right
            button.style.position = "fixed";
            button.style.bottom = "20px";
            button.style.right = "20px";
            button.style.zIndex = "9999";
            document.body.appendChild(button);
        }
    }
}

// Run periodically
setInterval(injectButton, 2000);
