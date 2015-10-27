(function (rs, gt) {
    var tmpls = rs.tmpls;

    tmpls.select = function (options) {
        var i,
            items = [];

        var inputWrapper = {c: 'input-wrapper', C: []};



        if (options.title && options.title != '') {
            inputWrapper.c += ' hasTitle';
            inputWrapper.C.push({c: 'title', t: options.title})
        }

        if (options.items) {
            for (i = 0; i < options.items.length; i++) {

                var attr = {value: options.items[i].value};
                if (options.items[i].selected === true) {
                    attr.selected = true;
                }

                items.push({e: 'option', a: attr, H: options.items[i].text});
            }
        }


        inputWrapper.C.push({
            e: 'select',
            n: options.n,
            a: {name: options.name || ''},
            C: items
        });
        return inputWrapper;
    }
}(RS, GT));

