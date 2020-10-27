require('dotenv').config();
const knex = require('knex');

const knexInstance = knex({
  client: 'pg',
  connection: process.env.DB_URL,
});

console.log('Knex properly initialized.');

function grocerySearch(search) {
  knexInstance
    .select('*')
    .from('shopping_list')
    .where('name', 'ILIKE', `%${search}%`)
    .then((result) => {
      console.log(result);
    });
}

// grocerySearch('turnip');

function paginatedItems(pages) {
  const productsPerPage = 6;
  const offset = productsPerPage * (pages - 1);
  knexInstance
    .select('*')
    .from('shopping_list')
    .limit(productsPerPage)
    .offset(offset)
    .then((result) => console.log(result));
}

// paginatedItems(2);

function addedAfter(days) {
  knexInstance
    .select('*')
    .from('shopping_list')
    .where(
      'date_added',
      '>',
      knexInstance.raw(`now() - '?? days'::INTERVAL`, days)
    )
    .then((result) => console.log(result));
}

// addedAfter(12);

function totalCost() {
  knexInstance
    .select(
      knexInstance.raw('category, SUM(price) as sum_price')
    )
    .from('shopping_list')
    .groupBy('category')
    .then((result) => console.log(result));
}

totalCost();
