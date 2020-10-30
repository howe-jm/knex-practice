require('dotenv').config();
const { expect } = require('chai');
const supertest = require('supertest');
const ItemsService = require('../src/items-service.js');
const knex = require('knex');

describe(`Items service object`, function () {
  let db;
  let testItems = [
    {
      id: 1,
      name: 'Fish sticks',
      price: '10.99',
      date_added: new Date('2029-01-22T16:28:32.615Z'),
      checked: true,
      category: 'Main',
    },
    {
      id: 2,
      name: 'Meat sticks',
      price: '12.99',
      date_added: new Date('2028-05-15T12:44:32.321Z'),
      checked: true,
      category: 'Lunch',
    },
    {
      id: 3,
      name: 'Chicken sticks',
      price: '15.99',
      date_added: new Date('2029-02-11T14:22:55.125Z'),
      checked: true,
      category: 'Breakfast',
    },
  ];
  before(() => {
    db = knex({
      client: 'pg',
      connection: process.env.TEST_DB_URL,
    });
  });

  before(() => db('shopping_list').truncate());
  afterEach(() => db('shopping_list').truncate());

  after(() => db.destroy());

  context(`Given 'shopping_list' has data`, () => {
    beforeEach(() => {
      return db.into('shopping_list').insert(testItems);
    });

    it(`getAllItems() resolves all Items from 'shopping_list' table`, () => {
      return ItemsService.getAllItems(db).then((actual) => {
        expect(actual).to.eql(testItems);
      });
    });
    it(`getById() resolves an Item by id from 'shopping_list' table`, () => {
      const thirdId = 3;
      const thirdTestItem = testItems[thirdId - 1];
      return ItemsService.getById(db, thirdId).then(
        (actual) => {
          expect(actual).to.eql({
            id: thirdId,
            name: thirdTestItem.name,
            price: thirdTestItem.price,
            date_added: thirdTestItem.date_added,
            checked: thirdTestItem.checked,
            category: thirdTestItem.category,
          });
        }
      );
    });
    it(`deleteItem() removes an Item by id from 'shopping_list' table`, () => {
      const ItemId = 3;
      return ItemsService.deleteItem(db, ItemId)
        .then(() => ItemsService.getAllItems(db))
        .then((allItems) => {
          // copy the test Items array without the "deleted" Item
          const expected = testItems.filter(
            (Item) => Item.id !== ItemId
          );
          expect(allItems).to.eql(expected);
        });
    });
    it(`updateItem() updates an Item from the 'shopping_list' table`, () => {
      const idOfItemToUpdate = 3;
      const newItemData = {
        name: 'updated name',
        price: '41.41',
        date_added: new Date(),
        checked: true,
        category: 'Main',
      };
      return ItemsService.updateItem(
        db,
        idOfItemToUpdate,
        newItemData
      )
        .then(() =>
          ItemsService.getById(db, idOfItemToUpdate)
        )
        .then((Item) => {
          expect(Item).to.eql({
            id: idOfItemToUpdate,
            ...newItemData,
          });
        });
    });
  });
  context(`Given 'shopping_list has no data`, () => {
    it(`GetAllItems() resolves an empty array`, () => {
      return ItemsService.getAllItems(db).then((actual) =>
        expect(actual).to.eql([])
      );
    });
  });

  it(`insertItem() inserts a new Item and resolves the new Item with an 'id'`, () => {
    const newItem = {
      name: 'Test New Item',
      price: '9.99',
      date_added: new Date('2020-01-01T00:00:00.000Z'),
      checked: false,
      category: 'Breakfast',
    };
    return ItemsService.insertItem(db, newItem).then(
      (actual) => {
        expect(actual).to.eql({
          id: 1,
          name: newItem.name,
          price: newItem.price,
          date_added: newItem.date_added,
          checked: newItem.checked,
          category: newItem.category,
        });
      }
    );
  });
});
