import { Expose } from "class-transformer";
import { Entity, PrimaryColumn, Column, CreateDateColumn } from "typeorm";
import { v4 as uuiV4 } from "uuid";

@Entity("users")
class User {
  @PrimaryColumn()
  id: string;

  @Column()
  name: string;

  @Column()
  email: string;

  @Column()
  password: string;

  @Column()
  driver_license: string;

  @Column()
  isadmin: boolean;

  @Column()
  avatar: string;

  @CreateDateColumn()
  created_at: Date;

  @Expose({ name: "avatar_url" })
  avatar_url(): string {
    switch (process.env.DISK) {
      case "local":
        return `${process.env.API_URL}/avatar/${this.avatar}`;
      case "S3":
        return `${process.env.AWS_BUCKET_URL}/avatar/${this.avatar}`;
      default:
        return null;
    }
  }

  constructor() {
    if (!this.id) {
      this.id = uuiV4();
    }
  }
}

export { User };
