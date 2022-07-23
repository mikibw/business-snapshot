import {MigrationInterface, QueryRunner, Table, TableForeignKey} from 'typeorm';

export class CreateCredentialsTable1630075899372 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    const table = new Table({
      name: 'credentials',
      columns: [
        {
          name: 'id',
          type: 'integer',
          isPrimary: true,
          isGenerated: true,
          generationStrategy: 'increment',
        },
        {
          name: 'type',
          type: 'text',
          isNullable: false,
          enum: ['Payment', 'InnerAppPayment', 'Refund'],
        },
        {
          name: 'userId',
          type: 'integer',
        },
        {
          name: 'payWay',
          type: 'text',
          default: '',
        },
        {
          name: 'payAmount',
          type: 'text',
          default: '',
        },
        {
          name: 'productDetail',
          type: 'text',
          default: '',
        },
        {
          name: 'refundReason',
          type: 'text',
          default: '',
        },
        {
          name: 'refundDate',
          type: 'date',
          isNullable: true,
        },
        {
          name: 'createdAt',
          type: 'date',
        },
        {
          name: 'updatedAt',
          type: 'date',
        },
      ],
    });
    await queryRunner.createTable(table, true);
    await queryRunner.createForeignKey(
      'credentials',
      new TableForeignKey({
        columnNames: ['userId'],
        referencedColumnNames: ['id'],
        referencedTableName: 'users',
        onUpdate: 'CASCADE',
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    const table = await queryRunner.getTable('credentials');
    if (!table) return;
    const foreignKey = table.foreignKeys.find(fk => fk.columnNames.indexOf('userId') !== -1);
    if (foreignKey) {
      await queryRunner.dropForeignKey('credentials', foreignKey);
    }
    await queryRunner.dropTable('credentials');
  }
}
