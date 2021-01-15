import { MigrationInterface, QueryRunner, Table } from "typeorm";

export class MenuTable1610572398090 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(
            new Table({
                name: 'menu',
                columns: [
                    {
                        name: 'Id',
                        type: 'int4',
                        isPrimary: true,
                        isGenerated: true,
                        generationStrategy: 'increment',
                    },
                    {
                        name: 'name',
                        type: 'varchar',
                        isNullable: false,
                    },
                    {
                        name: 'code',
                        type: 'varchar',
                        isUnique: true,
                        isNullable: false,
                    },
                    {
                        name: 'price',
                        type: 'int',
                        isNullable: true,
                    },
                    {
                        name: 'description',
                        type: 'varchar',
                        isNullable: true,
                    },
                    {
                        name: 'parentCode',
                        type: 'varchar',
                        isNullable: true,
                    },
                    {
                        name: 'isParent',
                        type: 'int4',
                        default: 0
                    },
                    {
                        name: 'status',
                        type: 'int4',
                        default: 1
                    },
                ],
            }),
            false,
        );
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
    }

}
