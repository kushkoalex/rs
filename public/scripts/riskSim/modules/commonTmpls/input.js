(function (rs) {
    var tmpls = rs.tmpls,
        u;

    tmpls.input = function (options) {
        var inputWrapper = {c: 'input-wrapper', C: []};


        if (options.title && options.title != '') {
            inputWrapper.c += ' hasTitle';
            inputWrapper.C.push({c: 'title', t: options.title})
        }

        if (options.type === 'datePicker') {
            inputWrapper.c += ' hasCalendar';
        }

        var attributes = {
            type: 'text',
            id: options.name || '',
            name: options.name || '',
            value: options.value !== u ? options.value : '',
            placeholder: options.placeholder !== u ? options.placeholder : ''
        };

        if(options.disabled===true){
            attributes.disabled='disabled';
        }

        var el = {
            e: 'input',
            a: attributes
        };

        if (options.n) {
            el.n = options.n;
        }

        inputWrapper.C.push(el);

        return inputWrapper;
    }

}(RS));
