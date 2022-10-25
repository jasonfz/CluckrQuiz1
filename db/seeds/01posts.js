/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> } 
 */
 const faker = require('faker');
exports.seed =  function(knex) {
  return knex("posts")
  .del()
  .then(function() {
    const posts = Array.from({length: 100}).map(() => {
      return {
       username: faker.name.firstName(),
       
       image_url: faker.image.imageUrl(),

        content: faker.lorem.paragraph(),

        created_at: faker.date.past(),

        updated_at: faker.date.past()
      }
    })
    return knex('posts').insert(posts)
  })
};