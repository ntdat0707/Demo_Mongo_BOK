import { MinLength, MaxLength, Matches, IsString, IsNotEmpty, IsOptional } from 'class-validator'
import { ApiProperty } from '@nestjs/swagger';
export class AuthDTO {
    @IsOptional()
    @ApiProperty({type:String})
    id:number;

    @IsString()
    @MinLength(2)
    @MaxLength(20)
    @ApiProperty({type:String})
    username: string;

    @IsString()
    @MinLength(3)
    @MaxLength(20)
    @ApiProperty({type:String})
    // @Matches(
    //     /((?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/,
    //     { message: 'password too weak' },
    // )
    password: string;

}