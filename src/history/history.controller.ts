import {
  Body,
  Controller,
  Get,
  HttpStatus,
  Param,
  Query,
  Post,
  Res,
  Put,
} from '@nestjs/common';
import { History } from './history.entity';
import { HistoryService } from './history.service';

@Controller('history')
export class HistoryController {
  constructor(private readonly historyService: HistoryService) {}

  @Post()
  async createHistory(@Res() response, @Body() newHistory: History) {
    const createHistory = await this.historyService.create(newHistory);

    return response.status(HttpStatus.CREATED).json({
      message: createHistory,
    });
  }

  @Get('/:userId')
  async listHitoryByUserID(@Res() response, @Param('userId') userId: any) {
    const listHistory = await this.historyService.listByUserId(Number(userId));
    return response.status(HttpStatus.OK).json({
      message: listHistory,
    });
  }

  @Put()
  async update(@Res() response, @Body() body) {
    const update = await this.historyService.update(body);
    if (update.affected === 0) {
      return response.status(HttpStatus.BAD_REQUEST).json({
        message: update,
      });
    }
    return response.status(HttpStatus.OK).json({
      message: update,
    });
  }
}
