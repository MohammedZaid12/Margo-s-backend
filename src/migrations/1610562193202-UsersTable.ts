import {MigrationInterface, QueryRunner,Table} from "typeorm";

export class UsersTable1610562193202 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(
            new Table({
              name: 'user',
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
                  name: 'email',
                  type: 'varchar',
                  isUnique:true,
                  isNullable: false,
                },
                {
                    name: 'password',
                    type: 'varchar',
                    isNullable: false,
                  },
                  {
                    name: 'phoneNumber',
                    type: 'varchar',
                    isNullable: false,
                  },
                  {
                    name: 'userType',
                    type: 'varchar',
                    isNullable: false,
                  },
                  {
                    name: 'status',
                    type: 'int4',
                    default:0
                  },
              ],
            }),
            false,
          );
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
    }

}
