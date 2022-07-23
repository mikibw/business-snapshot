import {MigrationInterface, QueryRunner, Table} from 'typeorm';

export class CreateWalletDetailTable1630225081999 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    const table = new Table({
      name: 'wallet_detail',
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
          isUnique: true,
        },
        {
          name: 'value',
          type: 'text',
        },
      ],
    });
    await queryRunner.createTable(table, true);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('wallet_detail');
  }
}
