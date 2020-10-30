require('dotenv').config();

const knex = require('knex');
const ItemsService = require('./items-service');

const knexInstance = knex({
  client: 'pg',
  connection: process.env.DB_URL,
});

// use all the ItemsService methods!!
ItemsService.getAllItems(knexInstance)
  .then((items) => console.log(items))
  .then(() =>
    ItemsService.insertItem(knexInstance, {
      name: 'New name',
      price: '45.45',
      date_added: new Date(),
      checked: true,
      category: 'Breakfast',
    })
  )
  .then((newItem) => {
    console.log(newItem);
    return ItemsService.updateItem(
      knexInstance,
      newItem.id,
      { name: 'Updated name' }
    ).then(() =>
      ItemsService.getById(knexInstance, newItem.id)
    );
  })
  .then((article) => {
    console.log(article);
    return ItemsService.deleteItem(
      knexInstance,
      article.id
    );
  });
