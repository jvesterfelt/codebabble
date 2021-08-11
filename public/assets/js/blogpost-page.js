const objDiff = (obj1, obj2) => {
    let keysArr = [];
    Object.keys(obj1).forEach(key => {
        if (obj1[key] !== obj2[key]) {
            keysArr.push(key)
        }
    });
    return keysArr;
};

const ogPost = {
    title: $('#post-title-edit').val(),
    post: $('#post-text-edit').val(),
    user_id: $("#edit-post-form").attr("user-id")
}


function getCommentObj(event) {
    event.preventDefault();

    const commentObj = {
        comment_text: $("#comment-text-input").val(),
        user_id: $("#edit-post-form").attr("user-id"),
        post_id: $("#post-title").attr("data-post-id")
    }
    createCommentHandler(commentObj)
}


async function editBlogpostHandler(event) {
    event.preventDefault();


    const editPost = {
        title: $('#post-title-edit').val(),
        post: $('#post-text-edit').val(),
        user_id: $("#edit-post-form").attr("user-id")
    }
    const id = window.location.toString().split('/')[
        window.location.toString().split('/').length - 1
    ];

    if (objDiff(ogPost, editPost).length > 0) {
        if (editPost.title || editPost.post || editGoal.user_id) {
            const response = await fetch(`/api/blogposts/${id}`, {
                method: 'PUT',
                body: JSON.stringify(editPost),
                headers: {
                    'Content-Type': 'application/json'
                }
            });

            if (response.ok) {
                location.reload();
            } else {
                alert(response.statusText);
            }
        }
    } else {
        $("#req-update").remove()
        $("#edit-modal-header").append(
            `<div class="alert alert-danger" id="req-update" role="alert">
                At least one field needs to be changed in order to update the blogpost.
            </div>`
        )
    }
}


async function deleteBlogpostHandler(event) {
    event.preventDefault();

    const id = window.location.toString().split('/')[
        window.location.toString().split('/').length - 1
    ];

    const response = await fetch(`/api/blogposts/${id}`, {
        method: 'DELETE'
    });

    if (response.ok) {
        document.location.replace('/dashboard');
    } else {
        alert(response.statusText);
    }
}


async function createCommentHandler(commentObj) {
    const response = await fetch(`/api/comments`, {
        method: 'POST',
        body: JSON.stringify(commentObj),
        headers: {
            'Content-Type': 'application/json'
        }
    });

    if (response.ok) {

        location.reload();
    } else {
        alert(response.statusText);
    }
}


function openEditBlogpostModal(event) {
    event.preventDefault();
    console.log("clicked");

    $("#edit-post-modal").modal("toggle");
    $("#post-title-edit").focus();
}

function openDeleteBlogpostModal(event) {
    event.preventDefault();
    console.log("clicked");
    $("#delete-post-modal").modal("toggle");
    enableDeleteBtn()
}

function enableDeleteBtn() {
    let timeLeft = 2
    $("#delete-timer").text("3");

    const disableTimer = setInterval(function() {
        $("#delete-timer").text(timeLeft.toString());
        timeLeft--
    }, 1000)

    setTimeout(function() {
        clearInterval(disableTimer)
        $("#delete-timer").text("");
        $("#delete-post-confirm").removeClass("disabled");
    }, 0)

    disableTimer
}

$(".modal").on("hidden.bs.modal", function() {
    $("#delete-post-confirm").addClass("disabled");
});

$('#new-comment-form').on('submit', getCommentObj);
$('#edit-post-form').on('submit', editBlogpostHandler);
$("#edit-post-btn").on('click', openEditBlogpostModal);
$("#delete-post-modal-btn").on("click", openDeleteBlogpostModal);
$("#delete-post-confirm").on("click", deleteBlogpostHandler);