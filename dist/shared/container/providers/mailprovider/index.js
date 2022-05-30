"use strict";

var _tsyringe = require("tsyringe");

var _EtherealMailProvider = require("./implementations/EtherealMailProvider");

var _SESMailProvaider = require("./implementations/SESMailProvaider");

const mailProvider = {
  ethereal: _tsyringe.container.resolve(_EtherealMailProvider.EtherealMailProvider),
  SES: _tsyringe.container.resolve(_SESMailProvaider.SESMailProvider)
};

_tsyringe.container.registerInstance("MailProvider", mailProvider[process.env.MAIL_PROVIDER]);