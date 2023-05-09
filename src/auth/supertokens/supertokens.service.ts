import supertokens from 'supertokens-node';
import { forwardRef, Inject, Injectable } from '@nestjs/common';
import Session from 'supertokens-node/recipe/session';
import EmailPassword from 'supertokens-node/recipe/emailpassword';
import Dashboard from 'supertokens-node/recipe/dashboard';
import { ConfigInjectionToken, AuthModuleConfig } from '../config.interface';
import { UserDTO } from '../../user/UserDTO';
import { UserService } from '../../user/services/UserService';

@Injectable()
export class SupertokensService {
  constructor(
    @Inject(ConfigInjectionToken) private config: AuthModuleConfig,
    @Inject(forwardRef(() => UserService))
    private readonly userService: UserService,
  ) {
    supertokens.init({
      appInfo: config.appInfo,
      supertokens: {
        connectionURI: config.connectionURI,
        apiKey: config.apiKey,
      },
      recipeList: [
        Session.init({
          errorHandlers: {
            onUnauthorised: async (message, request, response) => {
              response.setStatusCode(401);
              throw 401;
            },
          },
        }),
        EmailPassword.init({
          signUpFeature: {
            formFields: [
              {
                id: 'email',
              },
              { id: 'password' },
            ],
          },
          override: {
            apis: (originalImplementation) => {
              return {
                ...originalImplementation,
                signUpPOST: async function (input) {
                  if (originalImplementation.signUpPOST === undefined) {
                    throw Error('Should never come here');
                  }

                  // First we call the original implementation of signUpPOST.
                  const response = await originalImplementation.signUpPOST(
                    input,
                  );

                  // Post sign up response, we check if it was successful
                  if (response.status === 'OK') {
                    // // These are the input form fields values that the user used while signing up
                    const formFields = input.formFields;
                    const email: string = formFields.find(
                      (formField) => formField.id === 'email',
                    ).value;

                    const newUser: UserDTO = await userService.createUser({
                      email: email,
                      name: email,
                      supertoken: response.session.getUserId(input.userContext),
                    });

                    // console.log(response.session.getUserId(input.userContext));
                    // TODO: post sign up logic
                  }
                  return response;
                },
                signInPOST: async function (input) {
                  if (originalImplementation.signInPOST === undefined) {
                    throw Error('Should never come here');
                  }

                  // First we call the original implementation of signInPOST.
                  const response = await originalImplementation.signInPOST(
                    input,
                  );

                  // Post sign up response, we check if it was successful
                  if (response.status === 'OK') {
                    const { id, email } = response.user;
                    // These are the input form fields values that the user used while signing in
                    const formFields = input.formFields;
                    // console.log('SignIn');
                    // console.log(formFields);
                    // console.log('ctx');
                    // console.log(input.userContext);
                    // TODO: post sign in logic
                  }
                  return response;
                },
              };
            },
          },
        }),
        Dashboard.init(),
      ],
    });
  }
}
