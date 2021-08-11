async function signupFormHandler(event) {
    event.preventDefault();
    const first_name = $("#first-name-input").val().trim();
    const last_name = $("#last-name-input").val().trim();
    const email = $('#email-input').val().trim();
    const password = $('#password-input').val().trim();
    const username = $('#username-input').val().trim();
    if (first_name && last_name && email && password && username) {
        const response = await fetch('/api/users', {
            method: 'post',
            body: JSON.stringify({
                first_name,
                last_name,
                email,
                username,
                password
            }),
            headers: { 'Content-Type': 'application/json' }
        });

        if (response.ok) {
            //alert('account created');
            document.location.replace('/dashboard');
        } else {
            response.json().then(function(data) {
                console.log(data);
                switch (data[0].path) {
                    case 'password':
                        $('#password-req').append('<p>Password does not meet password strength criteria</p>').addClass('mt-1 mb-0 text-danger');
                        //alert ('Password validation failed');
                        break;
                    case 'username':
                        $('#username-div').append('<p>Username too short</p>').addClass('mt-1 mb-0 text-danger');
                        //alert ('Username too short');
                        break;
                    case 'email':
                        $('#email-div').append('<p>Not a valid email address</p>').addClass('mt-1 mb-0 text-danger');
                        //alert ('Not a valid email address');
                        break;
                    case 'user.username':
                        $('#username-div').append('<p>Not a unique username</p>').addClass('mt-1 mb-0 text-danger');
                        break;
                    case 'user.email':
                        $('#email-div').append('<p>Email already in use</p>').addClass('mt-1 mb-0 text-danger');
                        break;
                }
            });
        }
    } else {

        $('#password-req').append('<p>Please fill out all text fields before continuing.</p>').addClass('mt-1 mb-0 text-danger');
        //alert('Please fill out all text fields before continuing.');

        return;
    }
}
var firstTry = true;
async function loginFormHandler(event) {
    event.preventDefault();

    const username = $('#username-input').val().trim();
    const password = $('#password-input').val().trim();
    if (username && password) {
        const response = await fetch('/api/users/login', {
            method: 'post',
            body: JSON.stringify({
                username,
                password
            }),
            headers: { 'Content-Type': 'application/json' }
        });

        if (response.ok) {
            document.location.replace('/dashboard');
        } else {
            if (response.status === 404 && firstTry === true) {
                $('#password-div').append('<p>Invalid password or username</p>').addClass('mt-1 mb-0 text-danger');
                firstTry = false;
            } else {
                $('p').remove(":contains('Invalid password or username')");
                $('#password-div').append('<p>Invalid password or username</p>').addClass('mt-1 mb-0 text-danger');
            }
        }
    }
}

async function passwordChecker() {
    let password = $('#password-input').val().trim();

    const response = await fetch('/api/users/password', {
        method: 'post',
        body: JSON.stringify({
            password
        }),
        headers: { 'Content-Type': 'application/json' }
    });

    if (response.ok) {
        response.json().then(function(data) {
            if (data.value === 'Invalid') {
                $('#password-strength').removeClass();
                $('#password-strength').html('Password Strength: Invalid').addClass('mt-1 mb-0 text-danger');
            } else if (data.value === 'Weak') {
                $('#password-strength').removeClass();
                $('#password-strength').html('Password Strength: Weak').addClass('mt-1 mb-0 text-warning');
            } else if (data.value === 'Good') {
                $('#password-strength').removeClass();
                $('#password-strength').html('Password Strength: Good').addClass('mt-1 mb-0 text-secondary');
            } else {
                $('#password-strength').removeClass();
                $('#password-strength').html('Password Strength: Strong ✓').addClass('mt-1 mb-0 text-success');
            }
        });
    } else {
        return;
    }
}

function removeErrors(event) {
    event.preventDefault();
    $('p').remove(":contains('Password does not meet password strength criteria')");
    $('p').remove(":contains('Not a valid email address')");
    $('p').remove(":contains('Username too short')");
    $('p').remove(":contains('Not a unique username')");
    $('p').remove(":contains('Email already in use')");
}

function removeFieldsError(event) {
    event.preventDefault();
    $('p').remove(":contains('Please fill out all text fields before continuing.')");
}
//, "#email-div", '#password-req'

$("#username-div, #email-div, #password-div").on("focusin", removeErrors);
$('#signup-form').on("focusin", removeFieldsError);
$('#login-form').on('submit', loginFormHandler);
$('#signup-form').on('submit', signupFormHandler);
$('#password-input').on('keyup', passwordChecker);