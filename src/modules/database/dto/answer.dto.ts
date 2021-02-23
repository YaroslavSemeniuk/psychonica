import { v4 as uuidv4 } from 'uuid';
import { ApiProperty } from '@nestjs/swagger';
import { QuestionDto } from './question.dto';

export class AnswerDto {
    @ApiProperty({ description: 'answer id', example: uuidv4() })
    id?:string;

    @ApiProperty({ description: 'title text', example: 'Love and relationships' })
    title: string;

    @ApiProperty({ description: 'description text', example: 'Ways to improve relationships' })
    description: string;

    @ApiProperty({
      description: 'main text',
      example: 'One of the best ways to improve your relationship is to play sports together',
    })
    text: string;

    @ApiProperty({ description: 'counter dislikes by users', example: 10 })
    countUseful: number;

    @ApiProperty({ description: 'counter dislikes by users', example: 6 })
    countUseless: number;

  @ApiProperty({ description: 'the question to which we give the answer', type: () => QuestionDto })
  question?: QuestionDto;
}
