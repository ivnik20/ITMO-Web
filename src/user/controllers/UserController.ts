import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  Req,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { UserService } from '../services/UserService';
import { UserDTO as UserModel } from '../UserDTO';
import {
  ApiCookieAuth,
  ApiOperation,
  ApiParam,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { AuthInterceptor } from '../../auth.interceptor';
import { AuthGuard } from '../../auth/auth.guard';

@ApiTags('User')
@Controller('/users')
@UseInterceptors(AuthInterceptor)
export class UserController {
  constructor(private readonly userService: UserService) {}

  @ApiOperation({
    summary: 'Create user',
  })
  @ApiResponse({
    status: 201,
    description: 'The user has been successfully created.',
    type: UserModel,
  })
  @ApiResponse({
    status: 403,
    description: 'Forbidden.',
  })
  @ApiResponse({
    status: 400,
    description: 'Bad Request.',
  })
  @ApiResponse({
    status: 404,
    description: 'Not Found.',
  })
  @Post('')
  @UseGuards(new AuthGuard({ sessionRequired: true }))
  async create(@Body() body: UserModel): Promise<UserModel> {
    return this.userService.createUser(body);
  }

  @ApiOperation({
    summary: 'Get user by username',
  })
  @ApiParam({ name: 'username', type: 'string' })
  @ApiResponse({
    status: 200,
    description: 'The user was successfully provided',
    type: UserModel,
  })
  @ApiResponse({
    status: 403,
    description: 'Forbidden.',
  })
  @ApiResponse({
    status: 400,
    description: 'Bad Request.',
  })
  @ApiResponse({
    status: 404,
    description: 'Not Found.',
  })
  @Get('/name/:username')
  @UseGuards(new AuthGuard({ sessionRequired: true }))
  async getUserByUsername(
    @Param('username') username: string,
  ): Promise<UserModel> {
    return this.userService.findUserUsername(username);
  }

  @ApiOperation({
    summary: 'Get user by id',
  })
  @ApiParam({ name: 'id', type: 'number' })
  @ApiResponse({
    status: 200,
    description: 'The user was successfully provided',
    type: UserModel,
  })
  @ApiResponse({
    status: 403,
    description: 'Forbidden.',
  })
  @ApiResponse({
    status: 400,
    description: 'Bad Request.',
  })
  @ApiResponse({
    status: 404,
    description: 'Not Found.',
  })
  @Get('/id/:id')
  @UseGuards(new AuthGuard({ sessionRequired: true }))
  async getUserById(@Param('id', ParseIntPipe) id: number): Promise<UserModel> {
    return this.userService.findUserId(id);
  }

  @ApiOperation({
    summary: 'Set admin role to user with provided username',
  })
  @ApiParam({ name: 'username', type: 'string' })
  @ApiResponse({
    status: 200,
    description: 'The role was successfully assigned',
  })
  @ApiResponse({
    status: 403,
    description: 'Forbidden.',
  })
  @ApiResponse({
    status: 400,
    description: 'Bad Request.',
  })
  @ApiResponse({
    status: 404,
    description: 'Not Found.',
  })
  @ApiCookieAuth('JWT')
  @Patch('/name_role/:username')
  @UseGuards(new AuthGuard({ sessionRequired: true }))
  async setUserRoleAdminUsername(@Param('username') username: string) {
    return this.userService.setAdminRoleUsername(username);
  }

  @ApiOperation({
    summary: 'Assign admin role to user with provided id',
  })
  @ApiParam({ name: 'id', type: 'number' })
  @ApiResponse({
    status: 200,
    description: 'The role was successfully assigned',
  })
  @ApiResponse({
    status: 403,
    description: 'Forbidden.',
  })
  @ApiResponse({
    status: 400,
    description: 'Bad Request.',
  })
  @ApiResponse({
    status: 404,
    description: 'Not Found.',
  })
  @ApiCookieAuth('JWT')
  @Patch('/id_role/:id')
  @UseGuards(new AuthGuard({ sessionRequired: true }))
  async setUserRoleAdminId(@Param('id', ParseIntPipe) id: number) {
    return this.userService.setAdminRoleId(id);
  }

  @ApiOperation({
    summary: 'Assign client role to user with provided username',
  })
  @ApiParam({ name: 'username', type: 'string' })
  @ApiResponse({
    status: 200,
    description: 'The role was successfully assigned',
  })
  @ApiResponse({
    status: 403,
    description: 'Forbidden.',
  })
  @ApiResponse({
    status: 400,
    description: 'Bad Request.',
  })
  @ApiResponse({
    status: 404,
    description: 'Not Found.',
  })
  @ApiCookieAuth('JWT')
  @Patch('/name/:username')
  @UseGuards(new AuthGuard({ sessionRequired: true }))
  async setUserRoleClientUsername(@Param('username') username: string) {
    return this.userService.setClientRoleUsername(username);
  }

  @ApiOperation({
    summary: 'Assign client role to user with provided id',
  })
  @ApiParam({ name: 'id', type: 'number' })
  @ApiResponse({
    status: 200,
    description: 'The role was successfully assigned',
  })
  @ApiResponse({
    status: 403,
    description: 'Forbidden.',
  })
  @ApiResponse({
    status: 400,
    description: 'Bad Request.',
  })
  @ApiResponse({
    status: 404,
    description: 'Not Found.',
  })
  @ApiCookieAuth('JWT')
  @Patch('/id/:id')
  @UseGuards(new AuthGuard({ sessionRequired: true }))
  async setUserRoleClientId(@Param('id', ParseIntPipe) id: number) {
    return this.userService.setClientRoleId(id);
  }

  @ApiOperation({
    summary: 'Delete user with provided username',
  })
  @ApiParam({ name: 'username', type: 'string' })
  @ApiResponse({
    status: 200,
    description: 'The user was successfully deleted',
  })
  @ApiResponse({
    status: 403,
    description: 'Forbidden.',
  })
  @ApiResponse({
    status: 400,
    description: 'Bad Request.',
  })
  @ApiResponse({
    status: 404,
    description: 'Not Found.',
  })
  @ApiCookieAuth('JWT')
  @Delete('/name/:username')
  @UseGuards(new AuthGuard({ sessionRequired: true }))
  async deleteUserByUsername(@Param('username') username: string) {
    return this.userService.deleteUserByUsername(username);
  }

  @ApiOperation({
    summary: 'Delete the user with provided id',
  })
  @ApiParam({ name: 'id', type: 'number' })
  @ApiResponse({
    status: 200,
    description: 'The user was successfully deleted',
  })
  @ApiResponse({
    status: 403,
    description: 'Forbidden.',
  })
  @ApiResponse({
    status: 400,
    description: 'Bad Request.',
  })
  @ApiResponse({
    status: 404,
    description: 'Not Found.',
  })
  @ApiCookieAuth('JWT')
  @Delete('/id/:id')
  @UseGuards(new AuthGuard({ sessionRequired: true }))
  async deleteUserById(@Param('id', ParseIntPipe) id: number) {
    return this.userService.deleteUserById(id);
  }
}
