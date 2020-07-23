import { User } from "./user.entity";
import { Repository, EntityRepository } from "typeorm";
import * as bcrypt from 'bcrypt';

import { ConflictException, InternalServerErrorException } from "@nestjs/common";
import { AuthDTO } from "./middleware/auth-dto";

@EntityRepository(User)
export class UserRepository extends Repository<User> {
    async signUp(authDTO: AuthDTO): Promise<string> {
        const { username, password } = authDTO;
        const user = new User();
        user.username = username;
        user.salt = await bcrypt.genSalt();
        user.password = await this.hashPassword(password, user.salt);

        console.log('User:',user);
        try {
            await user.save();
            return 'Signup Successfully';
        }
        catch (err) {
            console.log("Error",err);
            if (err.code === '23505') {
                throw new ConflictException('Username already exits');
            }
            else {
                throw new InternalServerErrorException();
            }
        }
    }

    private async hashPassword(password: string, salt: string): Promise<string> {
        return await bcrypt.hash(password, salt);
    }

    async validatePassword(authDTO: AuthDTO): Promise<string> {
        const { username, password } = authDTO;
        const user = await this.findOne({ username });

        if(user && await user.validatePassword(password)){
            return user.username;
        }
        else{
            return null;
        }
    }
}