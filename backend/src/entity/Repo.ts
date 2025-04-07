import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity()
export class Repo {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  full_name: string;

  @Column()
  html_url: string;

  @Column()
  description: string;

  @Column()
  language: string;
}
