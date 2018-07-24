import { Patch, Get, Post, Delete, Controller, Param, Body } from '@nestjs/common';
import { publish, pubActions } from 'utils/publish';
import { getCurrentUTC } from 'utils/time';
import { IMessage, IMessageBody, IMessageCreateAPI, IMessageUpdateAPI, IMessageDelete } from 'models/Message';
import { DAOs } from 'daos';

const DAO = DAOs.Chat;

@Controller('chat/:channel')
export class Chat {
  @Post('create')
  async createMessage(@Param() params, @Body() body: Readonly<IMessageBody>) {
    let message: IMessageCreateAPI = {
      text: body.text,
      user: body.user,
      created_at: getCurrentUTC(),
      updated_at: getCurrentUTC(),
    };

    try {
      let response = await DAO.create(message);
      await publish(params.channel, {
        action: pubActions.Chat.createMessage,
        data: response[0],
      });
      return response;
    } catch (err) {
      console.log(err);
      return err;
    }
  }

  @Get('read')
  async readMessages() {
    try {
      return await DAO.read();
    } catch (err) {
      console.log(err);
      return err;
    }
  }

  @Get('read/:id')
  async readMessage(@Param() params) {
    try {
      return await DAO.read(params.id);
    } catch (err) {
      console.log(err);
      return err;
    }
  }

  @Patch('update')
  async updateMessage(@Param() params, @Body() body: IMessageUpdateAPI) {
    let message: Partial<IMessage> = {
      id: body.id,
      text: body.text,
      updated_at: getCurrentUTC(),
    };

    try {
      let response = await DAO.update(message);
      await publish(params.channel, {
        action: pubActions.Chat.updateMessage,
        data: response[0],
      });
      return response;
    } catch (err) {
      console.log(err);
      return err;
    }
  }

  @Delete('delete')
  async deleteMessage(@Param() params, @Body() body: IMessageDelete) {
    try {
      let response = await DAO.delete(body.id);
      await publish(params.channel, {
        action: pubActions.Chat.deleteMessage,
        data: body.id,
      });
      return response;
    } catch (err) {
      console.log(err);
      return err;
    }
  }
}
