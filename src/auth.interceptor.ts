import {
  Injectable,
  NestInterceptor,
  ExecutionContext,
  CallHandler,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { UserService } from './user/services/UserService';
import { Request } from 'express';

@Injectable()
export class AuthInterceptor implements NestInterceptor {
  constructor(private readonly userService: UserService) {}
  async intercept(
    context: ExecutionContext,
    next: CallHandler,
  ): Promise<Observable<any>> {
    const session = context.switchToHttp().getRequest().session;
    const logged = session !== undefined;
    const request = context.switchToHttp().getRequest<Request>();
    if (!logged) {
      request.body = { ...request.body, logged: false };
      return next.handle().pipe(
        map((value) => {
          return { ...value, logged: false };
        }),
      );
    }
    console.log(session.getUserId());
    let user;
    try {
      user = await this.userService.getUserIdBySupertokensId(
        session.getUserId(),
      );
    } catch (any) {
      // session.revokeSession();
      return next.handle().pipe(
        map((event) => {
          return { ...event, logged: false };
        }),
      );
    }
    request.body = { ...request.body, logged: true, user: user };
    return next.handle().pipe(
      map((event) => {
        return { ...event, logged: true, loggedUser: user };
      }),
    );
  }
}
