
import { PipeTransform, BadRequestException } from '@nestjs/common';
import { Language } from '../chatbot.entity';

export class LanguageValidationPipes implements PipeTransform {
    readonly allowedLanguages = [
        Language.en,
        Language.vn
    ];

    transform(value: any) {
        value = value.toUpperCase();

        if (!this.isStatusValid(value)) {
            throw new BadRequestException(`"${value}" is an invalid language`);
        }
        return value;
    }

    private isStatusValid(status: any) {
        const index = this.allowedLanguages.indexOf(status);
        return index !== -1;
    }
}