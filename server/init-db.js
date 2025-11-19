const fs = require('fs');
const db = require('./db');

const initSql = fs.readFileSync('server/init.sql').toString();

db.serialize(() => {
  db.exec(initSql, (err) => {
    if (err) {
      console.error('Error initializing database', err);
    } else {
      console.log('Database initialized successfully');
    }
    db.close();
  });
});
