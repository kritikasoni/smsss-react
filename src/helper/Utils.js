export const dateToString = (date) => {
  console.log(date.getDay());
  var day= ('0' + date.getDay()).slice(-2);
  var month= ('0' +( date.getMonth() + 1 )).slice(-2);
  return  date.getFullYear() +  '/' + month + '/' + day;
}

export const todayDateInputValue = () => {
  Date.prototype.toDateInputValue = (function() {
    let local = new Date(this);
    local.setMinutes(this.getMinutes() - this.getTimezoneOffset());
    return local.toJSON().slice(0,10);
  });
  return new Date().toDateInputValue();
}
