import {
  BaseEntity,
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  RelationId,
} from 'typeorm';

import { User } from '.';

@Entity()
class Client extends BaseEntity {

    @PrimaryGeneratedColumn()
    id: number;

    @Column('varchar')
    name: string;

    @Column('varchar')
    email: string;

    @Column('varchar')
    contact: string;

    @Column('text')
    description: string;

}

export default Client;