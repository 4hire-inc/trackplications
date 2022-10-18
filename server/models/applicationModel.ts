
import { Pool, QueryResult } from 'pg'; 


const PG_URI =
  'postgres://srozohkl:tocq_6qeK-D9ifzKQoxwpkyiVEuJDAw5@peanut.db.elephantsql.com/srozohkl';

const pool = new Pool({
  connectionString: PG_URI,
});


interface Callbacks {
  (err?: null | Error, res?: QueryResult<any>): void | Error | QueryResult
}

const applicationModel = { 
  query: (text: string, params: any, callback: Callbacks) => {

    console.log('executed query', text);
    return pool.query(text, params, callback);
  },
};

export default applicationModel; 
