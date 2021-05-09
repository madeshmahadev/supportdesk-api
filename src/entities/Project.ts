import {
  BaseEntity,
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  OneToMany,
} from 'typeorm';

import is from 'utils/validation';
import { ProjectCategory } from 'constants/projects';
import { Issue, User } from '.';

@Entity()
class Project extends BaseEntity {

  static validations = {
    name: [is.required(), is.maxLength(100)],
    url: is.url(),
    category: [is.required(), is.oneOf(Object.values(ProjectCategory))],
  };
  
    @PrimaryGeneratedColumn()
    id: number;

    @Column('varchar')
    name: string;

    @Column('text', { nullable: true })
    description: string | null;

    @Column('varchar', { nullable: true })
    url: string | null;

    @Column('varchar')
    category: ProjectCategory;

    @CreateDateColumn({type: "datetime", default: () => "CURRENT_TIMESTAMP"})
    createdAt: Date;

    @UpdateDateColumn({type: "datetime", default: () => "CURRENT_TIMESTAMP"})
    updatedAt: Date;

    @Column({ type: 'date', nullable: true })
    endedAt: string | null;

    @OneToMany(
        () => Issue,
        issue => issue.project,
    )
    issues: Issue[];  

    @OneToMany(
        () => User,
        user => user.project,
    )
    users: User[];
}

export default Project;
