import { Entity, PrimaryGeneratedColumn, Column, Timestamp } from "typeorm";

@Entity('autores')

export class Autor {
    @PrimaryGeneratedColumn()
    id! : number;

    @Column({ type: 'varchar', length: 150 })
    name!: string;

    @Column({ type: 'date' })
    birthdate!: Date;

    @Column({ type: 'text' })
    biography!: string;

    @Column({ type: 'varchar', length: 150 })
    nationality!: string;

    @Column({ type: 'boolean' })
    active!: boolean;

    @Column({ type:'timestamp' })
    created_at!: Timestamp;

    @Column({ type:'timestamp' })
    updated_at!: Timestamp;
}