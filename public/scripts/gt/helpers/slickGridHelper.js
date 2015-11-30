(function(gt){
    gt.getSlickGridColumns = function(columns, columnsSettings, excludeField){
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


        var i = 0,
            result = [],
            item,
            field;

        for (var column in columns) {
            if (column != excludeField) {
                item = {
                    id: i,
                    name: column,
                    field: column
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

