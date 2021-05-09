import {
  BaseEntity,
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
} from 'typeorm';

import is from 'utils/validation';
import { Issue, User } from '.';


@Entity()
class Comment extends BaseEntity {

  static validations = {
    body: [is.required(), is.maxLength(50000)],
  };


    @PrimaryGeneratedColumn()
    id: number;

    @Column('text')
    body: string;

    @CreateDateColumn({type: "datetime", default: () => "CURRENT_TIMESTAMP"})
    createdAt: Date;

    @UpdateDateColumn({type: "datetime", default: () => "CURRENT_TIMESTAMP"})
    updatedAt: Date;

    @ManyToOne(
        () => User,
        user => user.comments,
    )
    user: User;

    @Column('integer')
    userId: number;

    @ManyToOne(
        () => Issue,
        issue => issue.comments,
        { onDelete: 'CASCADE' },
    )
    issue: Issue;

    @Column('integer')
    issueId: number;

}

export default Comment;