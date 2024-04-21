import { Controller, Get, Post, Body, Put, Param, Delete, ValidationPipe } from '@nestjs/common';
import { SingerDto } from './dto/singer.dto';
import { SingersService } from './singers.service';
import { Singers } from './singers.interface';
import { ApiTags, ApiResponse } from '@nestjs/swagger';

@Controller('singers')
@ApiTags('singers')
export class SingersController {
  constructor(private readonly singersService: SingersService) {}

  @Get()
  @ApiResponse({ status: 200, description: 'Lista de todos los cantantes.' })
  async findAll(): Promise<Singers[]> {
    return this.singersService.findAll();
  }

  @Get(':id')
  @ApiResponse({ status: 200, description: 'Cantante encontrado.' })
  @ApiResponse({ status: 404, description: 'Cantante no encontrado.' })
  async findOne(@Param('id') id: number): Promise<Singers> {
    return this.singersService.findOne(id);
  }

  @Post()
  @ApiResponse({ status: 201, description: 'Cantante creado exitosamente.' })
  @ApiResponse({ status: 400, description: 'Petición inválida.' })
  async create(@Body(new ValidationPipe()) singerDto: SingerDto) {
    const newSinger = await this.singersService.create(singerDto);
    return { 
      message: 'Cantante creado exitosamente.', 
      singer: newSinger
    };
  }

  @Put(':id')
  @ApiResponse({ status: 200, description: 'Cantante actualizado exitosamente.' })
  @ApiResponse({ status: 400, description: 'Petición inválida.' })
  @ApiResponse({ status: 404, description: 'Cantante no encontrado.' })
  async update(@Param('id') id: number, @Body(new ValidationPipe()) singerDto: SingerDto) {
    const updatedSinger: Singers = { ...singerDto, id }; // Crear objeto Singers con ID
    const updatedData = await this.singersService.update(id, updatedSinger);
    return { data: updatedData, message: 'Cantante actualizado exitosamente.' };
  }

  @Delete(':id')
  @ApiResponse({ status: 200, description: 'Cantante eliminado exitosamente.' })
  @ApiResponse({ status: 404, description: 'Cantante no encontrado.' })
  async remove(@Param('id') id: number): Promise<{ message: string }> {
    await this.singersService.remove(id);
    return { message: 'Cantante eliminado exitosamente.' };
  }
}
