"use strict";

var _tsyringe = require("tsyringe");

var _LocalStorageProvider = require("./implementations/LocalStorageProvider");

var _S3StoregeProvider = require("./implementations/S3StoregeProvider");

const diskStorage = {
  local: _LocalStorageProvider.LocalStorageProvider,
  S3: _S3StoregeProvider.S3StorageProvider
};

_tsyringe.container.registerSingleton("StorageProvider", diskStorage[process.env.DISK] // LocalStorageProvider
// S3StorageProvider
);