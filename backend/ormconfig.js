const path = require('path')

module.exports = {
    type: 'sqlite',
    database: './src/database/database.sqlite',
    migrations: [
        process.env.NODE_ENV === 'development'
            ? path.join(__dirname, 'src', 'database', 'migrations', '*.ts')
            : path.join(__dirname, 'dist', 'database', 'migrations', '*.js'),
    ],
    entities: [
        process.env.NODE_ENV === 'development' ? path.join(__dirname, 'src', 'models', '*.ts') : path.join(__dirname, 'dist', 'models', '*.js'),
    ],
    cli: {
        migrationsDir: path.join(__dirname, 'src', 'database', 'migrations'),
    },
    logging: true,
}
