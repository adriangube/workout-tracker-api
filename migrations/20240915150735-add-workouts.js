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
  db.createTable('workouts', {
    id: { type: "string", primaryKey: true },
    name: { type: "string", notNull: true },
    user_id: {
      type: "string",
      notNull: true,
      foreignKey: {
        name: "workout_user_id_fk",
        table: "users",
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

exports.down = function(db, callback) {
  db.dropTable('workouts', callback)
};

exports._meta = {
  "version": 1
};
