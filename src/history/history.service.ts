import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { History } from './history.entity';

@Injectable()
export class HistoryService {
  constructor(
    @InjectRepository(History) private historyRepository: Repository<History>,
  ) {}

  async create(newHistory: Omit<History, 'id'>) {
    console.log(newHistory);
    return this.historyRepository.save(newHistory);
  }

  async listByUserId(userId: number) {
    return this.historyRepository.find({
      where: {
        userId,
      },
    });
  }

  async update(
    newInfo: Pick<History, 'id' | 'interruptedDate' | 'finishedDate'>,
  ) {
    return this.historyRepository.update(newInfo.id, newInfo);
  }
}
