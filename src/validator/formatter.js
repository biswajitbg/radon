const Lower = function(){
    const r1 = " My NAME IS bISWAJIT Ghosh"
    const r2 = console.log(r1.toLocaleLowerCase());
}

const upper =function(){
    const u1 =" I am a Function Up folk and this is very Good cohort"
     const u2 = console.log(u1.toLocaleUpperCase());

}

const trim2 = function(){

    const greet = '   Biswajit    ';
    console.log(greet.trim());
}

module.exports.Lower = Lower
module.exports.upper = upper
module.exports.trim2 = trim2

