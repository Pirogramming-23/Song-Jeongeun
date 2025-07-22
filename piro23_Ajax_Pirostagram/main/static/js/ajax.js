async function toggleLike(postId) {
    const response = await fetch('/toggle_like/', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'X-CSRFToken': getCookie('csrftoken')
        },
        body: JSON.stringify({ post_id: postId })
    });

    const data = await response.json();
    const countSpan = document.getElementById(`like-count-${postId}`);
    countSpan.textContent = data.like_count;
}

// CSRF 토큰 가져오는 함수
function getCookie(name) {
    let cookieValue = null;
    if (document.cookie && document.cookie !== '') {
        const cookies = document.cookie.split(';');
        for (let cookie of cookies) {
            cookie = cookie.trim();
            if (cookie.startsWith(name + '=')) {
                cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
                break;
            }
        }
    }
    return cookieValue;
}

async function submitComment(postId) {
    const input = document.getElementById(`comment-input-${postId}`);
    const content = input.value.trim();

    if (content === "") return;

    const response = await fetch('/add_comment/', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'X-CSRFToken': getCookie('csrftoken')
        },
        body: JSON.stringify({
            post_id: postId,
            content: content
        })
    });

    const data = await response.json();
    
    const commentList = document.getElementById(`comment-list-${postId}`);
    const newComment = document.createElement('li');
    newComment.innerText = `${data.author}: ${data.content}`;
    commentList.appendChild(newComment);

    input.value = "";  // 입력창 초기화
}

async function deleteComment(commentId) {
    const response = await fetch('/delete_comment/', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'X-CSRFToken': getCookie('csrftoken')
        },
        body: JSON.stringify({
            comment_id: commentId
        })
    });

    if (response.ok) {
        // 댓글 DOM에서 제거
        const commentElement = document.getElementById(`comment-${commentId}`);
        commentElement.remove();
    } else {
        alert("댓글 삭제에 실패했습니다.");
    }
}
function toggleComments(postId) {
  const commentList = document.getElementById(`comment-list-${postId}`);
  if (commentList.style.display === "none") {
    commentList.style.display = "block";
  } else {
    commentList.style.display = "none";
  }
}

async function searchPosts() {
    const keyword = document.getElementById('search-input').value;
    const response = await fetch(`/search/?q=${encodeURIComponent(keyword)}`);
    const html = await response.text();
    document.getElementById('post-list').innerHTML = html;
}


function searchPosts() {
    const query = document.getElementById("search-input").value;

    fetch(`/search/?q=${encodeURIComponent(query)}`)
        .then(response => response.json())
        .then(data => {
            const postList = document.getElementById("post-list");
            postList.innerHTML = data.html;
        });
}
