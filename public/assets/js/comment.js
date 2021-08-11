async function newCommentHandler(event) {
    event.preventDefault();

    const comment_text = $('#comment-text-input').val.trim();
    const user_id = req.session.user_id;
    const post_id = window.location.toString().split('/')[
        window.location.toString().split('/').length - 1
    ];

    const response = await fetch('/api/comments', {
        method: 'POST',
        body: JSON.stringify({
            comment_text,
            user_id,
            post_id
        }),
        headers: {
            'Content-Type': 'application/json'
        }
    });

    if (response.ok) {
        document.location.replace('/dashboard');
    } else {
        alert(response.statusText);
    }
}


async function deleteCommentHandler(event) {
    event.preventDefault();

    const id = window.location.toString().split('/')[
        window.location.toString().split('/').length - 1
    ];
    const response = await fetch(`/api/comments/${id}`, {
        method: 'DELETE'
    });

    if (response.ok) {
        document.location.replace('/dashboard');
    } else {
        alert(response.statusText);
    }
}

async function editCommentHandler(event) {
    event.preventDefault();

    const comment_text = $('#comment-text-input').val.trim();
    const post_id = window.location.toString().split('/')[
        window.location.toString().split('/').length - 1
    ];
    const response = await fetch(`/api/comments/${id}`, {
        method: 'PUT',
        body: JSON.stringify({
            text
        }),
        headers: {
            'Content-Type': 'application/json'
        }
    });

    if (response.ok) {
        document.location.replace('/dashboard');
    } else {
        alert(response.statusText);
    }
}

$('#edit-comment-form').on('submit', editCommentHandler);
$('#delete-comment-btn').on('click', deleteCommentHandler);
$('#new-comment-form').on('submit', newCommentHandler);