(function (rs) {
    var tmpls = rs.tmpls,
        u;

    tmpls.checkbox = function(options){

        var attributes = {
            type: 'checkbox'
        };

        if(options.checked){
            attributes.checked='checked';
        }

        var el = {
            e: 'input',
            a: attributes
        };

        if (options.n) {
            el.n = options.n;
        }

        return el;
    }

}(RS));
