document.addEventListener('DOMContentLoaded', () => {
    const commentForm = document.querySelector('#comment-form');
    
    commentForm.addEventListener('submit', async (event) => {
      event.preventDefault();
  
      const postId = document.querySelector('#post-id').value;
      const content = document.querySelector('#comment-content').value;
  
      try {
        const response = await fetch('/api/comments', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ postId, content }),
        });
  
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
  
        const data = await response.json();
        console.log('Comment submitted:', data);
  
        // Handle success (e.g., update UI or show message)
      } catch (error) {
        console.error('Error:', error);
      }
    });
  });
  