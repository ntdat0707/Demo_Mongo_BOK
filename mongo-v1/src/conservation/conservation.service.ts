import { Injectable } from '@nestjs/common';

import { CreateConversationDTO } from './middleware/create-conversation-dto';
import { Conservation } from './conservation.entity';
import { ConservationRepository } from './conservation.repository';

@Injectable()
export class ConservationService {
  constructor(private conservationRepository: ConservationRepository) {}

  async createConversation(
    conversationDTO: CreateConversationDTO,
  ): Promise<Conservation> {
   return this.conservationRepository.createConservation(conversationDTO);
  }
}
