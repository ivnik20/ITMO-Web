async function signUpClicked() {
  try {
    let email = document.getElementById('s_username').value.trim();
    let password = document.getElementById('s_password').value.trim();
    console.log('OK');
    let response = await supertokensEmailPassword.signUp({
      formFields: [
        {
          id: 'email',
          value: email,
        },
        {
          id: 'password',
          value: password,
        },
      ],
    });

    if (response.status === 'FIELD_ERROR') {
      response.formFields.forEach((formField) => {
        if (formField.id === 'email') {
          window.alert(formField.error);
        } else if (formField.id === 'password') {
          window.alert(formField.error);
        } else {
          window.alert(formField.error);
        }
      });
    } else {
      alert('You signed up successfully!');
      window.location.href = '/';
    }
  } catch (err) {
    if (err.isSuperTokensGeneralError === true) {
      // this may be a custom error message sent from the API by you.
      window.alert(err.message);
    } else {
      window.alert('Oops! Something went wrong.');
    }
  }
}
