import { Pool } from 'pg'; 

const PG_URI =
  'postgres://srozohkl:tocq_6qeK-D9ifzKQoxwpkyiVEuJDAw5@peanut.db.elephantsql.com/srozohkl';

const pool = new Pool({
  connectionString: PG_URI,
});

const applicationModel = {
  query: (text: string, params: any, callback: () => void) => {
    console.log('executed query', text);
    return pool.query(text, params, callback);
  },
};

export default applicationModel; 
