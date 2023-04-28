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
} from '@nestjs/common';
import { UserService } from '../services/UserService';
import { UserDTO as UserModel } from '../UserDTO';
import { ApiOperation, ApiParam, ApiResponse, ApiTags } from '@nestjs/swagger';

@ApiTags('User')
@Controller('/users')
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
  @Patch('/name_role/:username')
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
  @Patch('/id_role/:id')
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
  @Patch('/name/:username')
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
  @Patch('/id/:id')
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
  @Delete('/name/:username')
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
  @Delete('/id/:id')
  async deleteUserById(@Param('id', ParseIntPipe) id: number) {
    return this.userService.deleteUserById(id);
  }
}
