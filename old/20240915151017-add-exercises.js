'use strict';

var dbm;
var type;
var seed;

/**
  * We receive the dbmigrate dependency from dbmigrate initially.
  * This enables us to not have to rely on NODE_PATH.
  */
exports.setup = function(options, seedLink) {
  dbm = options.dbmigrate;
  type = dbm.dataType;
  seed = seedLink;
};

exports.up = function(db, callback) {
  db.createTable('exercises', {
    id: { type: "string", primaryKey: true },
    name: { type: "string", notNull: true },
    image: { type: "string" },
    workout_id: {
      type: "string",
      notNull: true,
      foreignKey: {
        name: "exercise_workout_id_fk",
        table: "workouts",
        rules: {
          onDelete: 'CASCADE',
          onUpdate: 'RESTRICT'
        },
        mapping: 'id'
      }
    },
    createdAt: { type: "datetime", default: Date.now() }
  }, callback);
};

exports.down = function(db) {
  db.dropTable('exercises', callback)

};

exports._meta = {
  "version": 1
};
