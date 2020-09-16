
const AdminBro = require('admin-bro')
const AdminBroExpress = require('@admin-bro/express')
const AdminBroSequelize = require('@admin-bro/sequelize')

const User = require('../models/user'); 
const Rol = require('../models/rol'); 
const Picture = require('../models/picture');
const New = require('../models/new');
const Product = require('../models/product');
const Contact = require('../models/contact');

AdminBro.registerAdapter(AdminBroSequelize)
 
const adminBro = new AdminBro({
	resources: [User, Rol, Picture, New, Product, Contact],
	rootPath: '/admin',
  })

const router = AdminBroExpress.buildRouter(adminBro)

module.exports = router;
