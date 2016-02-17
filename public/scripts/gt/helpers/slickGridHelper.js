(function(gt){
    gt.getSlickGridColumns = function(columns,columnFirstDataRow, columnsSettings, excludeField){
        var compare = function (a, b) {
            if (a.displayOrder < b.displayOrder)
                return -1;
            if (a.displayOrder > b.displayOrder)
                return 1;
            return 0;
        };

        var getCurrentColumn = function (columns, value) {
            for (var i = 0; i < columns.length; i++) {
                if (columns[i].ColumnName === value) {
                    return columns[i];
                }
            }
        };

        function isNumber(obj) { return !isNaN(parseFloat(obj)) }

        function isDate(s) {
            // format D(D)/M(M)/(YY)YY
            var dateFormat = /^\d{1,4}[\.|\/|-]\d{1,2}[\.|\/|-]\d{1,4}$/;
            if (dateFormat.test(s)) {
                // remove any leading zeros from date values
                s = s.replace(/0*(\d*)/gi, "$1");
                var dateArray = s.split(/[\.|\/|-]/);
                // correct month value
                dateArray[0] = dateArray[0] - 1;
                // correct year value
                if (dateArray[2].length < 4) {
                    // correct year value
                    dateArray[2] = (parseInt(dateArray[2]) < 50) ? 2000 + parseInt(dateArray[2]) : 1900 + parseInt(dateArray[2]);
                }
                var testDate = new Date(dateArray[2], dateArray[0], dateArray[1]);
                if (testDate.getDate() != dateArray[1] || testDate.getMonth() != dateArray[0] || testDate.getFullYear() != dateArray[2]) {
                    return false;
                } else {
                    return true;
                }
            } else {
                return false;
            }
        }

        var i = 0,
            result = [],
            item,
            field;

        for (var column in columns) {
            if (column != excludeField) {

                var columnDataType = 'string';

                if (isDate(columns[column]) )
                    columnDataType = 'date'
                else if (isNumber(columns[column]))
                    columnDataType = 'float'
                else
                    columnDataType = 'string'

                item = {
                    id: i,
                    name: column,
                    field: column,
                    sortable: true,
                    datatype: columnDataType
                };

                field = getCurrentColumn(columnsSettings, column);

                if (field) {
                    item.width = field.MinWidth;
                    item.displayOrder = field.DisplayOrder;
                }
                else {
                    item.displayOrder = 0;
                }

                result.push(item);
                i++;
            }
        }

        result.sort(compare);

        return result;
    };

}(GT));


