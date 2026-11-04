const m=require('./mysteries.js');
for(const x of m){
 let t=x.narration.split(' || ').join(' ... ');
 t=t.replace('Five. Four. Three. Two. One.','Five. ... Four. ... Three. ... Two. ... One.');
 console.log('=== '+x.id+' ('+t.split(/\s+/).length+')\n'+t+'\n');
}
