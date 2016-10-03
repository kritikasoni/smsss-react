import { BackendUrl } from 'Config'
const socketIOClient = require('socket.io-client')
const sailsIOClient = require('sails.io.js')
const io = sailsIOClient(socketIOClient)
io.sails.url = BackendUrl

const store = require('store');

function create(){
  if(!io.sails.headers){
    io.sails.headers = {
      Authorization: `Bearer ${store.get('token') || ''}`
    }
  }
  return io.socket;
}

module.exports = create;
