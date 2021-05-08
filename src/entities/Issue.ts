import striptags from 'striptags';
import {
  BaseEntity,
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
  OneToMany,
  ManyToMany,
  JoinTable,
  RelationId,
  BeforeUpdate,
  BeforeInsert,
} from 'typeorm';

import { IssueType, IssueStatus, IssuePriority } from 'constants/issues';
import { Comment, Project, User } from '.';


@Entity()
class Issue extends BaseEntity {

    @PrimaryGeneratedColumn()
    id: number;

    @Column('varchar')
    type: IssueType;

    @Column('varchar')
    status: IssueStatus;

    @Column('varchar')
    priority: IssuePriority;   

    @Column('double precision')
    listPosition: number;

    @Column('text', { nullable: true })
    description: string | null;

    @Column('text', { nullable: true })
    descriptionText: string | null;

    @Column('integer', { nullable: true })
    estimate: number | null;

    @Column('integer', { nullable: true })
    timeSpent: number | null;

    @Column('integer', { nullable: true })
    timeRemaining: number | null;

    @CreateDateColumn({type: "datetime", default: () => "CURRENT_TIMESTAMP"})
    createdAt: Date;

    @UpdateDateColumn({type: "datetime", default: () => "CURRENT_TIMESTAMP"})
    updatedAt: Date;   

    @Column('integer')
    reporterId: number;

    @ManyToOne(
        () => Project,
        project => project.issues,
    )
    project: Project;

    @Column('integer')
    projectId: number;

    @OneToMany(
        () => Comment,
        comment => comment.issue,
    )
    comments: Comment[];

    @ManyToMany(
        () => User,
        user => user.issues,
    )
    @JoinTable()
    users: User[];

    @RelationId((issue: Issue) => issue.users )
    userIds: number[];

    @BeforeInsert()
    @BeforeUpdate()
    setDescriptionText = (): void => {
        if(this.description){
            this.descriptionText = striptags(this.description);
        }
    };

}

export default Issue;