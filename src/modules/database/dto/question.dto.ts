import { v4 as uuidv4 } from 'uuid';
import { ApiProperty } from '@nestjs/swagger';
import { GenderEnum } from '../../../shared/enums/gender.enum';

export class QuestionDto {
    @ApiProperty({ description: 'question id', example: uuidv4() })
    id?: string;

    @ApiProperty({ description: 'title text', example: 'title for question' })
    titleText: string;

    @ApiProperty({ description: 'description text', example: 'description for question' })
    descriptionText: string;

    @ApiProperty({ description: 'main text', example: 'main text in question' })
    text: string;

    @ApiProperty({ description: 'path to the question image', example: 'C:\\temp\\image.jpg' })
    imgSrc: string;

    @ApiProperty({ description: 'category by question', example: 'the category which this question belongs' })
    category: string;

    @ApiProperty({ description: 'gender by question', example: GenderEnum })
    gender: GenderEnum;

    @ApiProperty({ description: 'author id', example: uuidv4() })
    authorId: string;

    @ApiProperty({ description: 'answer id', example: uuidv4() })
    answerId: string;

  // @Column()
  // youtubeVideos: YoutubeVideos;
}
