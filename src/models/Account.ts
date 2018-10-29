import {Model, Column, Table, PrimaryKey, AutoIncrement, CreatedAt, UpdatedAt} from "sequelize-typescript";

@Table({
    tableName: 'account'
})
export class Account extends Model<Account> {
    @PrimaryKey
    @AutoIncrement
    @Column
    id: number;
    
    @Column
    value: string;

    @Column
    change: string;

    @CreatedAt
    @Column({field: 'created_at'})
    createdAt: Date;

    @UpdatedAt
    @Column({field: 'updated_at'})
    updatedAt: Date;
}
