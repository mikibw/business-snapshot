import {MigrationInterface, QueryRunner, Table, TableForeignKey} from 'typeorm';

export class CreateUserRequestsTable1629370886412 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    const table = new Table({
      name: 'user_requests',
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
          name: 'message',
          type: 'text',
        },
      ],
    });
    await queryRunner.createTable(table, true);
    await queryRunner.createForeignKey(
      'user_requests',
      new TableForeignKey({
        columnNames: ['userId'],
        referencedColumnNames: ['id'],
        referencedTableName: 'users',
        onUpdate: 'CASCADE',
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    const table = await queryRunner.getTable('user_requests');
    if (!table) return;
    const foreignKey = table.foreignKeys.find(fk => fk.columnNames.indexOf('userId') !== -1);
    if (foreignKey) {
      await queryRunner.dropForeignKey('user_requests', foreignKey);
    }
    await queryRunner.dropTable('user_requests');
  }
}
