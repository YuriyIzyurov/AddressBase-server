
import {Controller, Post, Body, Ip} from '@nestjs/common';
import { BanMiddleware } from './ban.middleware';

@Controller('banme')
export class BanController {
    constructor(private readonly banMiddleware: BanMiddleware) {}

    @Post()
    banIP(@Ip() ipAddress: string) {
        const duration = 30 * 60 * 1000; // 30 минут в миллисекундах

        this.banMiddleware.banIP(ipAddress, duration);

        return { message: `IP-адрес ${ipAddress} забанен на 30 минут` };
    }
}
