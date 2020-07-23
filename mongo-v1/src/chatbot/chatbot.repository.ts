import { Chatbot } from "./chatbot.entity";
import { Repository, EntityRepository } from "typeorm";
import { CreateChatbotDTO } from "./middleware/create-chatbot-dto";
import { InternalServerErrorException } from "@nestjs/common";
import { GetChatbotFilterDTO } from "./middleware/get-chatbot-filter-dto";

@EntityRepository(Chatbot)
export class ChatbotRepository extends Repository<Chatbot> {
  //async getMessage() {}

    async createMessage(createChatbot:CreateChatbotDTO):Promise<Chatbot> {
        const {channel_id,message,type} = createChatbot;
        const chatbot = new Chatbot();
        chatbot.channel_id = channel_id;
        chatbot.message = message;
        chatbot.type = type;
        try {
            await chatbot.save();
            return chatbot;
        }catch(error){
            console.log(`Error: ${error.message}, error code: ${error.code}`);
            throw new InternalServerErrorException()
        }
    }

    // async getMessageByLanguage(
    //     getChatbotFilterDTO: GetChatbotFilterDTO,
    //     chatbot: Chatbot): Promise<Chatbot[]> {
    //     const {language } = getChatbotFilterDTO;
    //     const query = this.createQueryBuilder('task'); //table name

    //     query.andWhere('task.userId = :userId', { userId: user.id });

    //     if (status) {
    //         query.andWhere('task.status = :status', { status });
    //     }

    //     if (search) {
    //         query.andWhere('task.title LIKE :search OR task.description LIKE :search',
    //             { search: `%${search}%` });
    //     }
    //     try{
    //     const tasks = await query.getMany();
    //     return tasks;
    //     }catch(err){
    //         this.logger.error(`Failed to get task by User "${user}", error.stack`);
    //         throw new InternalServerErrorException();
    //     }
    // }

}