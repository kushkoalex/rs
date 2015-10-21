(function (rs, gt) {
    var tmpls = rs.tmpls;

    tmpls.displayInfoWidget = function (options) {

        var items,
            data = options.items,
            columns = options.columns,
            showHeader = options.showHeader,
            rows = [],
            row,
            i,
            j;


        if (options.type === 'list') {
            if (showHeader === true && data.length > 0) {
                var headRow = [];
                for (i = 0; i < columns.length; i++) {
                    headRow.push({e: 'td', C: {t: columns[i]}})
                }
                rows.push({e: 'tr', c: 'table-head', C: headRow});
            }
            for (i = 0; i < data.length; i++) {
                row = [];
                for (j = 0; j < columns.length; j++) {
                    //row.push({e: 'td', C: {t:data[i][columns[j]]}});
                    row.push(tmpls.displayInfoWidgetContentItemValue(data[i][columns[j]]));
                }
                rows.push({e: 'tr', C: row});
            }
            items = {e: 'table', C: rows}
        }
        else {
            rows = [];
            for (var obj in data) {
                row = [];
                if (data.hasOwnProperty(obj)) {
                    row.push(tmpls.displayInfoWidgetContentItemValue(obj, 'key'));
                    row.push(tmpls.displayInfoWidgetContentItemValue(data[obj]));
                    rows.push({e: 'tr', C: row})
                }
            }
            items = {e: 'table', C: rows}
        }

        return {
            c: 'widget ' + options.color,
            C: [
                {
                    c: 'header', C: {c: 'title', t: options.title}
                },
                {
                    c: 'content', C: items
                }
            ]
        }
    };

    tmpls.displayInfoWidgetContentItemValue = function (value, className) {
        var result, u;
        if (value === true) {
            result = '<input type="checkbox" checked="checked" disabled="true">'
        }
        else if (value === false) {
            result = '<input type="checkbox" disabled="true">';
        }
        else {
            result = value;
        }
        return {e: 'td', c: className !== u ? className : '', H: result}
    };

    tmpls.displayInfoWidgetContentItem = function (item) {

        var value;
        if (item.value === true) {
            value = '<input type="checkbox" checked="checked" disabled="true">'
        }
        else if (item.value === false) {
            value = '<input type="checkbox" disabled="true">';
        }
        else {
            value = item.value;
        }

        return {c: 'item', C: [{c: 'key', t: item.key}, {c: 'value', H: value}]}
    }


}(RS, GT));
