package model

import (
	"gorm.io/gorm"
)

type (
	JSON = map[string]interface{}
)

// Base Migration Function. Call model specific migration here
func Migration(db *gorm.DB) *gorm.DB {
	db = MigrateUser(db)
	db = MigrateTopology(db)
	db = MigrateVirtualMachine(db)
	db = MigrateNetwork(db)

	return db
}