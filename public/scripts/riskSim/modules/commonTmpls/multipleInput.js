(function (rs) {
    var tmpls = rs.tmpls;

    tmpls.multipleInput = function (options) {
        var inputWrapper = {c: 'multiple-input-wrapper input-wrapper', n: options.n, C: []};
        if (options.title && options.title != '') {
            inputWrapper.c += ' hasTitle';
            inputWrapper.C.push({c: 'title', t: options.title})
        }

        var el = {
            e: 'input',
            a: {
                type: 'text',
                id: options.name,
                name: options.name || '',
                value: options.value || '',
                placeholder: options.placeholder || ''
            }
        };

        inputWrapper.C.push(el);
        inputWrapper.C.push({c: 'items-container'});
        return inputWrapper;
    };

    tmpls.multipleInputItem = function (value) {
        return {c: 'item', t: value, C: {c: 'delete', n: 'delete'}}
    };

}(RS));


(function (gt, rs) {
    var
        eventOnPointerEnd = gt.deviceInfo.eventOnPointerEnd,
        global = rs.global;

    gt.multipleInput = function ($parent, options) {
        var $input = gt.$tn('input', $parent)[0];
        var $itemsContainer = gt.$c('items-container', $parent)[0];
        var delimiter = ' ';
        var _ids = [];
        var tp = global.cnCt.tp;
        var setValues = function (val, updateSource) {
            var
                re = /\s?[, ]\s?/,
                x = val.split(re),
                i;

            _ids = [];

            for (i = 0; i < x.length; i++) {
                if (x[i] !== '') {
                    if (_ids.indexOf(x[i]) == -1) {
                        _ids.push(x[i]);
                    }
                }
            }

            displayItems();
            if (updateSource) {
                $input.value = _ids.join(delimiter);
            }


        };


        var displayItems = function () {
            var $fragment = global.document.createDocumentFragment(),
                i,
                build;
            $itemsContainer.innerHTML = '';

            for (i = 0; i < _ids.length; i++) {
                build = tp('multipleInputItem', _ids[i], $fragment).delete;
                gt.addEvent(build, eventOnPointerEnd, function () {
                    var currentNode = this.parentNode;
                    var index = _ids.indexOf(currentNode.innerText);
                    _ids.splice(index, 1);
                    gt.removeElement(currentNode);
                    $input.value = _ids.join(delimiter);
                    if(options.setValuesCallback){
                        options.setValuesCallback(_ids);
                    }
                });
            }

            $itemsContainer.appendChild($fragment);

            if(options.setValuesCallback){
                options.setValuesCallback(_ids);
            }
        };

        var onPaste = function (e) {
            var
                data = [],
                cb = window.clipboardData;
            if (cb) {
                data = cb.getData('Text') || '';
                data = data.replace(/\t|(\r\n)/g, ';'); // replace tabs and new-line to semicolons
                //data = data.replace(/[^0-9;]/g, ''); // remove invalid symbols
                data = data.replace(/^[;|\s]{1,}/g, ''); // remove semicolon at the start
                data = data.replace(/[;]{2,}/g, ';'); // remove semicolon duplicates
                data = data.replace(/[;|\s]{1,}$/g, ''); // remove semicolon at the start
                data = data.split(';');
                data = data.join(delimiter);
                setTimeout(function () {
                    setValues(data, true);
                }, 100);
                e.stopPropagation();
                return false;
            }
        };

        gt.addEvent($input, 'keyup', function (e) {
            setValues(e.target.value);
        });

        if (gt.deviceInfo.isIE) {
            gt.addEvent($input, 'paste', onPaste);
        }

        return {
            getValues: function () {
                return _ids;
            },
            clear: function () {
                _ids = [];
                $input.value = '';
                displayItems();
            }
        }
    }

})(GT, RS);
