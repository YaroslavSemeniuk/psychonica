import {
  Column, Entity, ManyToOne, PrimaryGeneratedColumn,
} from 'typeorm';
import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsOptional, IsString } from 'class-validator';
import { User } from './user.entity';

@Entity()
export class SocialNetwork {
    @PrimaryGeneratedColumn('uuid')
    readonly id: string;

    @Column({ type: 'varchar', length: 300 })
    @ApiPropertyOptional({ description: 'social network name', example: 'Instagram' })
    @IsOptional()
    @IsString()
    name: string;

    @Column({ type: 'varchar', length: 300 })
    @ApiPropertyOptional({
      description: 'link to user account',
      example: 'https://www.instagram.com/userProfile/',
    })
    @IsOptional()
    @IsString()
    link: string;

    @ManyToOne(() => User, (user) => user.answers)
    user: User;
}
