var express = require('express');
var router = express.Router();

var Models = require('../models');

exports.apiv1 = require('./apiv1')(Models, router);