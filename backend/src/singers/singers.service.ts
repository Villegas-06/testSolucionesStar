import { Injectable, NotFoundException } from '@nestjs/common';
import { Singers } from './singers.interface';
import { SingerDto } from './dto/singer.dto';

@Injectable()
export class SingersService {
  private singers: Singers[] = [];
  private nextId = 1;

  async findAll(): Promise<Singers[]> {
    return this.singers;
  }

  async findOne(id: number): Promise<Singers> {
    const foundSingers = this.singers.filter(singer => singer.id == id);

    if (foundSingers) {
      return foundSingers[0];
    }
    throw new NotFoundException('Cantante no encontrado');
  }

  async create(singerDto: SingerDto): Promise<Singers> {
    
    const newSinger: Singers = {
      ...singerDto,
      id: this.nextId++,
    };
    this.singers.push(newSinger);
    return newSinger;
  }

  async update(id: number, updatedSinger: Singers): Promise<Singers> {
    const foundSingers = this.singers.filter(singer => singer.id == id);
    if (foundSingers.length > 0) {
      const singerIndex = this.singers.findIndex(singer => singer.id == id);
      this.singers[singerIndex] = { ...updatedSinger, id };
      return this.singers[singerIndex];
    }
    throw new NotFoundException('Cantante no encontrado');
  }

  async remove(id: number): Promise<void> {
    const singerIndex = this.singers.findIndex(singer => singer.id == id);
    if (singerIndex !== -1) {
      this.singers.splice(singerIndex, 1);
    } else {
      throw new NotFoundException('Cantante no encontrado');
    }
  }
}
