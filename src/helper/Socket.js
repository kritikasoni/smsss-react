import { BackendUrl } from 'Config'
const socketIOClient = require('socket.io-client')
const sailsIOClient = require('sails.io.js')
const io = sailsIOClient(socketIOClient)

io.sails.url = BackendUrl
module.exports = io.socket;
