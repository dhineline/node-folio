const dbTest = require('./db-test');
const fixtures = require('./../../model/item/test/fixtures');

dbTest.fixtures(fixtures, ()=>{
  console.log('done');
});

dbTest.drop(()=>{
   console.log('done dropping');
});
