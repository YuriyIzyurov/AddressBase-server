import { Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response } from 'express';

@Injectable()
export class BanMiddleware implements NestMiddleware {
    private readonly bannedIPs: Set<string> = new Set();

    use(req: Request, res: Response, next: () => void) {
        const ipAddress = req.ip; // Получаем IP-адрес из запроса

        if (this.bannedIPs.has(ipAddress)) {
            return res.status(403).json({ message: 'Доступ запрещен' });
        }

        next();
    }

    banIP(ipAddress: string, duration: number) {
        this.bannedIPs.add(ipAddress);

        setTimeout(() => {
            this.unbanIP(ipAddress);
        }, duration);
    }

    unbanIP(ipAddress: string) {
        this.bannedIPs.delete(ipAddress);
    }
}
