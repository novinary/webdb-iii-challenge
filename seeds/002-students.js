
exports.seed = function (knex, Promise) {
  // Deletes ALL existing entries
  return knex('students').truncate()
    .then(function () {
      return knex('students').insert([
        { name: 'Antonio', cohort_id: 1 },
        { name: 'Novina', cohort_id: 2 },
        { name: 'Samar', cohort_id: 3 }
      ]);
    });
};