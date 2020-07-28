import { Dentist } from "./dentist.entity";
import { Repository, EntityRepository } from "typeorm";

@EntityRepository(Dentist)
export class DentistRepository extends Repository<Dentist> {
    
}