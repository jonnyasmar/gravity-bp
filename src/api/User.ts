import { Req, Get, Controller } from '@nestjs/common';

@Controller('user')
export class User {
  @Get('ip')
  async getIp(@Req() req) {
    let ip = (req.headers['x-forwarded-for'] || 'GBP').split(',')[0];
    return `window.sessionStorage.setItem('ip', '${ip}')`;
  }
}
