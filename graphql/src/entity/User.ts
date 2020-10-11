import { Entity, PrimaryGeneratedColumn, Column, BaseEntity } from "typeorm";
import { ObjectType, Field, ID } from "type-graphql";

@ObjectType()
@Entity("users")
export class User extends BaseEntity {
  @Field(() => ID)
  @PrimaryGeneratedColumn()
  id: number;

  @Field()
  @Column("text", { unique: true })
  email: string;

  @Column("text")
  password: string;

  @Field()
  @Column("bool", { default: false })
  confirmed: boolean;

  @Field()
  @Column("text", { nullable: true })
  token: string;

  @Field()
  @Column("text", { nullable: true })
  tokenExpiration: string;

  @Column("text", { nullable: true })
  stripeId: string;

  @Column("text", { default: "free-trial" })
  type: string;
}
