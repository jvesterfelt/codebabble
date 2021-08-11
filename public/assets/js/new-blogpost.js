$(".modal").on("hidden.bs.modal", function() {
    $("#post-title-input").val("");
    $("#post-text-input").val("");
});

async function addBlogpostHandler(event) {
    event.preventDefault();

    const title = $('#post-title-input').val().trim();
    const post = $('#post-text-input').val().trim();
    const user_id = $("#new-post-form").attr("user-id");

    console.log({
        title,
        post,
        user_id
    })

    if (title && post && user_id) {
        const response = await fetch('/api/blogposts', {
            method: 'POST',
            body: JSON.stringify({
                title,
                post,
                user_id
            }),
            headers: { 'Content-Type': 'application/json' }
        });

        if (response.ok) {
            console.log('Blogpost created successfully');
            response.json().then(postData => {
                console.log(postData)
                location.href = `/post/${postData.id}`
            })
        } else {
            location.href = `/post/${postData.id}`
            alert(response.statusText);
        }
    }
}

async function deleteBlogpostHandler(blogpost_id) {
    const response = await fetch('/api/blogposts/' + blogpost_id, {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' }
    });

    if (response.ok) {
        console.log('Blogpost deleted');
    }
}

$("#new-post-form").on("submit", addBlogpostHandler);