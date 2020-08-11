import { User } from "./user.entity";
import { Repository, EntityRepository } from "typeorm";
import * as bcrypt from 'bcrypt';
import { ConflictException, InternalServerErrorException } from "@nestjs/common";
import { AuthDTO } from "./middleware/auth-dto";

@EntityRepository(User)
export class UserRepository extends Repository<User> {
    async signUp(authDTO: AuthDTO): Promise<string> {
        const { id,username, password,email } = authDTO;
        const user = new User();
        user.id = id||this.getRandomInt(9999);
        user.username = username;
        user.salt = await bcrypt.genSalt();
        user.password = await this.hashPassword(password, user.salt);
        user.email = email;
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

    getRandomInt(max) {
        return Math.floor(Math.random() * Math.floor(max));
      }

    private async hashPassword(password: string, salt: string): Promise<string> {
        return await bcrypt.hash(password, salt);
    }

    async validatePassword(authDTO: AuthDTO): Promise<User> {
        const { username, password,email } = authDTO;
        const user = await this.findOne({ email });

        if(user && await user.validatePassword(password)){
            return user;
        }
        else{
            return null;
        }
    }

    async getUser(authDTO: AuthDTO):Promise<any>{
        const {username,email}=authDTO;
        const userByName = await this.find({ username });
        console.log("User get by Name",userByName);
        if(userByName.length>1){
            const userByMail = await this.findOne({email});
            console.log("User get by mail",userByMail);
            return userByMail;
        }
        else{
            return userByName;
        }
    }
}