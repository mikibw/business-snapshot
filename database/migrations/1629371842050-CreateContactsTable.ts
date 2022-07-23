import {MigrationInterface, QueryRunner, Table, TableForeignKey} from 'typeorm';

export class CreateContactsTable1629371842050 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    const table = new Table({
      name: 'contacts',
      columns: [
        {
          name: 'id',
          type: 'integer',
          isPrimary: true,
          isGenerated: true,
          generationStrategy: 'increment',
        },
        {
          name: 'userId',
          type: 'integer',
        },
        {
          name: 'isStar',
          type: 'boolean',
          isNullable: false,
        },
      ],
    });
    await queryRunner.createTable(table, true);
    await queryRunner.createForeignKey(
      'contacts',
      new TableForeignKey({
        columnNames: ['userId'],
        referencedColumnNames: ['id'],
        referencedTableName: 'users',
        onUpdate: 'CASCADE',
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    const table = await queryRunner.getTable('contacts');
    if (!table) return;
    const foreignKey = table.foreignKeys.find(fk => fk.columnNames.indexOf('userId') !== -1);
    if (foreignKey) {
      await queryRunner.dropForeignKey('contacts', foreignKey);
    }
    await queryRunner.dropTable('contacts');
  }
}
