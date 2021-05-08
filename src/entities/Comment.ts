import {
  BaseEntity,
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
} from 'typeorm';

import { Issue, User } from '.';


@Entity()
class Comment extends BaseEntity {

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