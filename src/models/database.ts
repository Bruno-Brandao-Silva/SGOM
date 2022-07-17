import script from './SQLiteScript';
import * as fs from 'fs';
import sqlite from 'better-sqlite3-with-prebuilds';

const file = './database.db';

//Cria ou sobre-escreve o banco de dados
function createDatabase() {
    const db = new sqlite(file)
    db.exec(script)
    db.close();
}

function getDatabase() {
    if (!fs.existsSync(file)) {
        console.log('Banco de dados não encontrado... Criando banco de dados...');
        createDatabase();
    }
    return new sqlite(file);
}

export default getDatabase;