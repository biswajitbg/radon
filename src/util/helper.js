const date2= function(){
    const d = new Date();
    console.log(d);


}
const month2=function(){
   const date = new Date(2022,6,2 );
   const month = date.toLocaleString('default',{month: 'long'});
   console.log(month);


}

module.exports.date2 = date2
module.exports.month2 = month2