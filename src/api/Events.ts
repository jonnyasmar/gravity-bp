import { Req, Get, Controller, Param } from '@nestjs/common';

@Controller('events/:channel')
export class Events {
  @Get('subscribe')
  subscribe(@Param() params, @Req() req) {
    let padding = new Array(2048);
    let body = ':' + padding.join(' ') + '\n';
    req.res.set({
      'Content-Type': 'text/event-stream',
      'Cache-Control': 'no-cache',
      'Grip-Hold': 'stream',
      'Grip-Channel': params.channel,
      'Grip-Keep-Alive': ':\\n\\n; format=cstring; timeout=20',
    });
    return { body };
  }
}
