(function (rs) {
    var tmpls = rs.tmpls;

    tmpls.input = function (options) {
        var inputWrapper = {c: 'input-wrapper', C: []};


        if (options.title && options.title != '') {
            inputWrapper.c += ' hasTitle';
            inputWrapper.C.push({c: 'title', t: options.title})
        }

        if(options.type === 'datePicker'){
            inputWrapper.c += ' hasCalendar';
        }

        var el = {
            e: 'input',
            a: {type:'text', id:options.name, name: options.name || '', value: options.value || '', placeholder: options.placeholder || ''}
        };

        if(options.n){
            el.n = options.n;
        }

        inputWrapper.C.push(el);

        return inputWrapper;
    }

}(RS));
