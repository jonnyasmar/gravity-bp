import { Req, Get, Post, Controller, Param, Body } from '@nestjs/common';
import { publish } from 'utils/publish';
import { db } from 'utils/db';
import { getCurrentUTC } from 'utils/time';
import { IMessage } from 'reducers/Chat';

@Controller('chat/:channel')
export class Chat {
  @Post('send')
  async sendMessage(@Param() params, @Body() body, @Req() req) {
    const { CHAT } = db.tables;

    let message: IMessage = {
      text: body.text,
      user: body.user,
      created_at: getCurrentUTC(),
      updated_at: getCurrentUTC(),
    };

    try {
      await db
        .open()
        .table(CHAT.name)
        .insert(message);
      await publish(params.channel, message);
    } catch (err) {
      return err;
    }
  }
}
