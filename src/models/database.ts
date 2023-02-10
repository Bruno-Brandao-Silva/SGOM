import script from './SQLiteScript';
import fs from 'fs';
import sqlite, { RunResult } from 'better-sqlite3';

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

export default (arg: { method: 'all' | 'run' | 'get', query: string, params?: any[] }): RunResult => {
    // console.log(arg)
    const db = getDatabase();
    try {
        const stmt = db.prepare(arg.query);
        const result = stmt[arg.method](arg.params);
        return result;
    } catch (e) {
        throw e
    } finally {
        db.close();
    }
}
