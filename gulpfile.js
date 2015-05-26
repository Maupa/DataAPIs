var gulp            = require('gulp')
  , jsoncombine     = require('gulp-jsoncombine');

var _type = function(obj){
    return {}.toString.call(obj).replace(/\[|\]/g, '').split(' ')[1];
}

gulp.task('default', function() {
    gulp.src('./data/*.json')
        .pipe(jsoncombine('db.json', function(data){

            var name = Object.keys(data)[0];
            var temp = {};
            temp[name] = []
            console.log(_type(data[name]));
            if( _type(data[name]) === 'Object' ){
                var keys = Object.keys(data[name]);
                for( var i = 0, item; item = data[name][keys[i]]; i++ ){
                    item['id'] = i;
                    temp[name].push( item );
                }
            }else{
                for( var i = 0, item; item = data[name][i]; i++ ){
                    item['id'] = i;
                    temp[name].push( item );
                }
            }
            
            return new Buffer(JSON.stringify(temp));
        }))
        .pipe(gulp.dest('./'));
});

