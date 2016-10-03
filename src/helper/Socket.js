import { BackendUrl } from 'Config'
const socketIOClient = require('socket.io-client')
const sailsIOClient = require('sails.io.js')
const store = require('store');

function create(){
  const io = sailsIOClient(socketIOClient)
  io.sails.url = BackendUrl
  io.sails.headers = {
    Authorization: `Bearer ${store.get('token') || ''}`
  }
  return io.socket;
}

module.exports = create;
