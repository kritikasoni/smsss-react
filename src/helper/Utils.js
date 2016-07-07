export const dateToString = (date) => {
  console.log(date.getDay());
  var day= ('0' + date.getDay()).slice(-2);
  var month= ('0' +( date.getMonth() + 1 )).slice(-2);
  return  date.getFullYear() +  '/' + month + '/' + day;
}
