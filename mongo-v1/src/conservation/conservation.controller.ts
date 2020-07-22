import { Controller, Post, Body, ValidationPipe } from '@nestjs/common';
import { ConservationService } from './conservation.service';
import { CreateConversationDTO } from './middleware/create-conversation-dto';
import { Conservation } from './conservation.entity';

@Controller('conservation')
export class ConservationController {
  constructor(private conservationService: ConservationService) {}

  @Post()
  async createConservation(
    @Body(ValidationPipe) conversationDTO: CreateConversationDTO,
  ): Promise<Conservation> {
    return this.conservationService.createConversation(conversationDTO);
  }
}
