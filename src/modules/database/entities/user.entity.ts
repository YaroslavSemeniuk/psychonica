import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';
import { v4 as uuidv4 } from 'uuid';
import { RoleEnum } from '../../../shared/enums/role.enum';
import { GenderEnum } from '../../../shared/enums/gender.enum';

@Entity()
export class User {
  @PrimaryGeneratedColumn('uuid')
  @ApiProperty({ description: 'user id', example: uuidv4() })
  readonly id: string;

  @Column({ type: 'varchar', length: 300, nullable: false })
  @ApiProperty({ description: 'user name', example: 'Sam' })
  username: string;

  @Column({
    type: 'varchar', length: 300, nullable: true, unique: true,
  })
  @ApiProperty({ description: 'user email', example: 'Sam@gmail.com' })
  email: string;

  @Column()
  @ApiProperty({ description: 'role user in application', example: RoleEnum.USER })
  role: RoleEnum;

  @Column()
  @ApiProperty({ description: 'gender user', example: GenderEnum.FEMALE })
  gender: GenderEnum;

  @Column('simple-array', { default: '' })
  @ApiProperty({
    description: 'social links',
    example: [
      { instagram: 'https://www.instagram.com/user' },
      { facebook: 'https://www.facebook.com/user' },
      { vk: 'https://www.vk.com/user' }],
  })
  socialLinks: string[];
}
