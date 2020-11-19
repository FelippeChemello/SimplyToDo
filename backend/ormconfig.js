const path = require('path')

module.exports = {
    type: 'sqlite',
    database: './src/database/database.sqlite',
    migrations: [path.join(__dirname, 'src', 'database', 'migrations', '*.ts')],
    entities: [path.join(__dirname, 'src', 'models', '*.ts')],
    cli: {
        migrationsDir: path.join(__dirname, 'src', 'database', 'migrations'),
    },
    logging: true,
}
