async function signInClicked() {
  try {
    let email = document.getElementById('l_username').value.trim();
    let password = document.getElementById('l_password').value.trim();
    let response = await supertokensEmailPassword.signIn({
      formFields: [
        {
          id: 'email',
          value: email.toString(),
        },
        {
          id: 'password',
          value: password.toString(),
        },
      ],
    });
    if (response.status === 'FIELD_ERROR') {
      response.formFields.forEach((formField) => {
        if (formField.id === 'email') {
          // Email validation failed (for example incorrect email syntax).
          window.alert(formField.error);
        }
      });
    } else if (response.status === 'WRONG_CREDENTIALS_ERROR') {
      window.alert('Email password combination is incorrect.');
    } else {
      // sign in successful. The session tokens are automatically handled by
      // the frontend SDK.
    }
  } catch (err) {
    if (err.isSuperTokensGeneralError === true) {
      // this may be a custom error message sent from the API by you.
      window.alert(err.message);
    } else {
      window.alert('Oops! Something went wrong.');
    }
  }
  getToken();
  console.log('OK');
  return { loggedIn: true, user: 'Nikita' };
}

async function getToken() {
  const accessToken = await supertokensSession.getAccessToken();
  console.log(accessToken);
}
