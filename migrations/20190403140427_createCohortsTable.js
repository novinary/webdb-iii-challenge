
// what new changes we need to make
exports.up = function(knex) {
    return knex.schema.createTable('cohort', (table) => {
		table.increments();

		table.string('name', 50).notNullable();

		table.timestamps(true, true);
	});
};

// how to undo the changes made in the up function 
exports.down = function(knex) {
	return knex.schema.dropTableIfExists('cohort');
};
