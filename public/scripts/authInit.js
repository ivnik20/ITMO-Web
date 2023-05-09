supertokens.init({
  appInfo: {
    apiDomain: 'https://ivnik20-web.onrender.com/',
    apiBasePath: '/api/auth',
    appName: 'Nabokovian',
  },
  recipeList: [
    supertokensSession.init(),
    supertokensEmailPassword.init(),
    //Dashboard.init(),
  ],
});
