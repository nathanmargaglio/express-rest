import {Model, Column, Table, PrimaryKey, AutoIncrement, CreatedAt, UpdatedAt} from "sequelize-typescript";

@Table({
    tableName: 'test'
})
export class Test extends Model<Test> {
    @PrimaryKey
    @AutoIncrement
    @Column
    id: number;
    
    @Column
    value: string;

    @CreatedAt
    @Column({field: 'created_at'})
    createdAt: Date;

    @UpdatedAt
    @Column({field: 'updated_at'})
    updatedAt: Date;
}
