


var reverse = function(expr) {
    switch(expr.tag){
        case 'note': return expr;
        case 'seq':
            return {
                tag: 'seq',
                left: reverse(expr.right),
                right: reverse(expr.left)
            };
    }
};

var endTime = function (time, expr) {
        switch(expr.tag){
            case 'note': 
                return time + expr.dur;
            case 'seq':
                return time + endTime(time, expr.left) + endTime(time, expr.right);  
        }
};

//part4

var getnote = function (time, expr) {
    if(expr.tag==='note'){
        return {
            tag: 'note',
            pitch: expr.pitch,
            start: endTime(time,expr) - expr.dur,
            dur: expr.dur 
        };
    }
};

var compileT = function (time,expr){
    switch(expr.tag){
        case 'note': 
            return getnote(time,expr);
        case 'seq': 
            console.log(compileT(time,expr.left), compileT(endTime(time,expr.left),expr.right));
            return compileT(time,expr.left) + compileT(endTime(time,expr.left),expr.right);         
    }
};
    
    

var compile = function (musexpr) {
    // your code here
    //console.log(compileT(0,musexpr));
    return [ compileT(0,musexpr) ];     
};







