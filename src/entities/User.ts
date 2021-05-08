import {
  BaseEntity,
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  OneToMany,
  ManyToMany,
  ManyToOne,
  RelationId,
} from 'typeorm';

import { RoleType } from 'constants/role';
import { Comment, Issue, Project } from '.';
import { Length, IsNotEmpty } from "class-validator";
import * as bcrypt from "bcryptjs";

@Entity()
class User extends BaseEntity {

    @PrimaryGeneratedColumn()
    id: number;

    @Column('varchar')
    @Length(4, 20)
    username: string;

    @Column('varchar')
    @Length(4, 100)
    password: string;

    @Column('varchar')
    name: string;

    @Column('varchar')
    email: string;

    @Column('varchar')
    @IsNotEmpty()
    role: RoleType;

    @Column('varchar', { length: 2000 })
    avatarUrl: string;

    @CreateDateColumn({type: "datetime", default: () => "CURRENT_TIMESTAMP"})
    createdAt: Date;

    @UpdateDateColumn({type: "datetime", default: () => "CURRENT_TIMESTAMP"})
    updatedAt: Date;

    @OneToMany(
      () => Comment,
      comment => comment.user,
    )
    comments: Comment[];   

    @ManyToMany(
      () => Issue,
      issue => issue.users,
    )
    issues: Issue[];

    @ManyToOne(
      () => Project,
      project => project.users,
    )
    project: Project;

    @RelationId((user: User) => user.project)
    projectId: number;


  hashPassword() {
    this.password = bcrypt.hashSync(this.password, 8);
  }

  checkIfUnencryptedPasswordIsValid(unencryptedPassword: string) {
    return bcrypt.compareSync(unencryptedPassword, this.password);
  }

}

export default User;