import { Conservation } from './conservation.entity';
import { CreateConversationDTO } from './middleware/create-conversation-dto';
import { EntityRepository, Repository } from 'typeorm';
import { InternalServerErrorException } from '@nestjs/common';

@EntityRepository(Conservation)
export class ConservationRepository extends Repository<Conservation> {
  async createConservation(
    conversationDTO: CreateConversationDTO,
  ): Promise<Conservation> {
    const { conservation_id, timestamp } = conversationDTO;
    const conservation = new Conservation();
    conservation.conversation_id = conservation_id;
    conservation.timestamp = timestamp;
    try {
      await conservation.save();
      return conservation;
    } catch (err) {
      throw new InternalServerErrorException();
    }
  }
}
