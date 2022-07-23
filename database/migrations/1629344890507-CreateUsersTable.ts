import {MigrationInterface, QueryRunner, Table} from 'typeorm';

export class CreateUsersTable1629344890507 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    const table = new Table({
      name: 'users',
      columns: [
        {
          name: 'id',
          type: 'integer',
          isPrimary: true,
          isGenerated: true,
          generationStrategy: 'increment',
        },
        {
          name: 'name',
          type: 'text',
        },
        {
          name: 'avatar',
          type: 'text',
        },
        {
          name: 'wxId',
          type: 'text',
        },
        {
          name: 'userType',
          type: 'text',
          isNullable: false,
          enum: ['Person', 'PublicAccount'],
        },
        {
          name: 'realname',
          type: 'text',
          default: '',
        },
      ],
    });
    await queryRunner.createTable(table, true);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('users');
  }
}
