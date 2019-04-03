// what new changes we need to make
exports.up = function(knex, Promise) {
    return knex.schema.createTable('students', (table) => {
		table.increments();

		table.string('name', 128).notNullable();

		table
			.integer('cohort_id')
			.unsigned()
			.references('id')
			.inTable('cohort')
			.onDelete('CASCADE')
			.onUpdate('CASCADE');

		table.timestamps(true, true);
	});
};

// how to undo the changes made in the up function 
exports.down = function(knex, Promise) {
	return knex.schema.dropTableIfExists('students');
};