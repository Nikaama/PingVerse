// (Frontend JavaScript)
document.addEventListener('DOMContentLoaded', function() {
    const discussionForm = document.getElementById('discussionForm');
    
    discussionForm.addEventListener('submit', async function(e) {
        e.preventDefault();
        
        const title = document.getElementById('title').value;
        const content = document.getElementById('content').value;
        
        try {
            const response = await fetch('/api/discussions', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ title, content })
            });
            
            if (response.ok) {
                window.location.reload();
            } else {
                alert('Error creating discussion');
            }
        } catch (error) {
            console.error('Error:', error);
            alert('Error creating discussion');
        }
    });

    // Handle reply buttons
    document.querySelectorAll('.reply-btn').forEach(button => {
        button.addEventListener('click', function() {
            const discussionId = this.dataset.discussionId;
            const replyContent = prompt('Enter your reply:');
            
            if (replyContent) {
                submitReply(discussionId, replyContent);
            }
        });
    });

    async function submitReply(discussionId, content) {
        try {
            const response = await fetch(`/api/discussions/${discussionId}/replies`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ content })
            });
            
            if (response.ok) {
                window.location.reload();
            } else {
                alert('Error posting reply');
            }
        } catch (error) {
            console.error('Error:', error);
            alert('Error posting reply');
        }
    }
});