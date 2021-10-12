const mongoose = require('mongoose');
const customer = require('./models/customer');


mongoose.Promise = global.Promise;
const db = mongoose.connect('mongodb://localhost:27017/customercli')

// Import model 

const Customer = require('./models/customer');


// Add customer
const addCustomer = (customer) => {
    Customer.create(customer).then(customer => {
        console.info('New Customer Added')
        // db.close();
    }).catch(err => console.log(err))
}


// Find customer
const findCustomer = (name) => {
    // make case sensitive
    const search = new RegExp(name, 'i');
    Customer.find({$or: [{firstname: search}, {lastname: search}]})
    .then(customer => {
        console.info(customer);
        console.info(`${customer.length} matches`)
        // db.close()
    }).catch(err => console.log(err))

}

const updateCustomer = (_id, customer) => {
    Customer.updateOne({_id}, customer)
    .then(customer => {
        console.log('Customer Updated')
    })
}

const removeCustomer = (_id) => {
    Customer.deleteOne({_id})
    .then(customer => {
        console.log('Customer Removed')
    })
}

const listCustomers = () => {
    Customer.find()
        .then(customers => {
            console.info(customers)
            console.info(`${customers.length} customers`)
        })
}


module.exports = {
    addCustomer,
    findCustomer,
    updateCustomer,
    removeCustomer,
    listCustomers,
}