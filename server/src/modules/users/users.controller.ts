import {
  Body,
  ClassSerializerInterceptor,
  Controller,
  Delete,
  ForbiddenException,
  Get,
  NotFoundException,
  Param,
  Patch,
  Query,
  Req,
  UseInterceptors,
} from '@nestjs/common';
import {
  ApiBadRequestResponse,
  ApiBearerAuth,
  ApiForbiddenResponse,
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiOperation,
  ApiParam,
  ApiTags,
  ApiUnauthorizedResponse,
} from '@nestjs/swagger';
import { Request } from 'express';

import { AUTH_TOKENS } from '../auth/constants/auth-tokens';
import { Roles } from '../auth/decorators/roles.decorator';
import { FindAllUsersDto } from './dto/find-all-users.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { UpdateUserRoleDto } from './dto/update-user-role.dto';
import { UserDto } from './dto/user.dto';
import { UsersService } from './users.service';

@ApiTags('users')
@ApiBearerAuth(AUTH_TOKENS.accessToken)
@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @UseInterceptors(ClassSerializerInterceptor)
  @Get()
  @ApiOperation({ summary: 'Returns all users' })
  @ApiOkResponse({ type: [UserDto] })
  @ApiBadRequestResponse()
  @ApiUnauthorizedResponse()
  async findAll(@Query() findAllUsersDto: FindAllUsersDto) {
    return await this.usersService.findAll(findAllUsersDto);
  }

  @UseInterceptors(ClassSerializerInterceptor)
  @Get(':id')
  @ApiOperation({ summary: 'Returns an user' })
  @ApiParam({ description: 'User ID', name: 'id' })
  @ApiOkResponse({ type: UserDto })
  @ApiBadRequestResponse()
  @ApiNotFoundResponse()
  @ApiUnauthorizedResponse()
  async findOne(@Param('id') id: string) {
    const user = await this.usersService.findOneById(id);
    if (!user) throw new NotFoundException();

    return user;
  }

  @UseInterceptors(ClassSerializerInterceptor)
  @Patch(':id')
  @ApiOperation({ summary: 'Updates an user' })
  @ApiParam({ description: 'User ID', name: 'id' })
  @ApiOkResponse({ type: UserDto })
  @ApiBadRequestResponse()
  @ApiNotFoundResponse()
  @ApiUnauthorizedResponse()
  @ApiForbiddenResponse()
  async update(
    @Req() req: Request,
    @Param('id') id: string,
    @Body() updateUserDto: UpdateUserDto,
  ) {
    const userId = req.user.sub;

    if (userId !== id) throw new ForbiddenException();

    const user = await this.usersService.update(id, updateUserDto);
    if (!user) throw new NotFoundException();

    return user;
  }

  @Roles(['admin'])
  @UseInterceptors(ClassSerializerInterceptor)
  @Delete(':id')
  @ApiOperation({ summary: 'Removes an user' })
  @ApiParam({ description: 'User ID', name: 'id' })
  @ApiOkResponse({ type: UserDto })
  @ApiBadRequestResponse()
  @ApiNotFoundResponse()
  @ApiUnauthorizedResponse()
  @ApiForbiddenResponse()
  async remove(@Param('id') id: string) {
    const user = await this.usersService.remove(id);
    if (!user) throw new NotFoundException();

    return user;
  }

  @Roles(['admin'])
  @UseInterceptors(ClassSerializerInterceptor)
  @Patch(':id/role')
  @ApiOperation({ summary: "Updates an user's role" })
  @ApiParam({ description: 'User ID', name: 'id' })
  @ApiBadRequestResponse()
  @ApiNotFoundResponse()
  @ApiOkResponse({ type: UserDto })
  @ApiUnauthorizedResponse()
  @ApiForbiddenResponse()
  async updateRole(
    @Param('id') id: string,
    @Body() updateUserRoleDto: UpdateUserRoleDto,
  ) {
    const user = await this.usersService.updateRole(id, updateUserRoleDto);
    if (!user) throw new NotFoundException();

    return user;
  }
}
