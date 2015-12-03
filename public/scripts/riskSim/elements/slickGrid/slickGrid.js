(function (gt, rs) {
    rs.slickGrid = function(elId,columns,data, exclusion){
        var options = {
                enableCellNavigation: true,
                showHeaderRow: true,
                headerRowHeight: 28,
                explicitInitialization: true
            },
            columnFilters = {},
            u;

        function filter(item) {
            for (var columnId in columnFilters) {
                if (columnId !== undefined && columnFilters[columnId] !== "") {
                    var c = grid.getColumns()[grid.getColumnIndex(columnId)];
                    if (!gt.startWith((item[c.field].toString()).toUpperCase(),columnFilters[columnId].toUpperCase())) {
                        return false;
                    }
                }
            }
            return true;
        }
        var dataView = new Slick.Data.DataView();
        var grid = new Slick.Grid(elId, dataView, columns, options);
        dataView.onRowCountChanged.subscribe(function (e, args) {
            grid.updateRowCount();
            grid.render();
        });
        dataView.onRowsChanged.subscribe(function (e, args) {
            grid.invalidateRows(args.rows);
            grid.render();
        });

        $(grid.getHeaderRow()).delegate(":input", "change keyup", function (e) {
            var columnId = $(this).data("columnId");
            if (columnId != null) {
                columnFilters[columnId] = $.trim($(this).val());
                dataView.refresh();
            }
        });

        grid.onHeaderRowCellRendered.subscribe(function (e, args) {
            $(args.node).empty();
            if(args.column.field !== exclusion) {
                $("<input type='text'>")
                    .data("columnId", args.column.id)
                    .val(columnFilters[args.column.id])
                    .appendTo(args.node);
            }
        });
        if (data !== u) {

            for (var i = 0; i < data.length; i++) {
                data[i]["id"] = i;
            }

            grid.init();
            dataView.beginUpdate();
            dataView.setItems(data);
            dataView.setFilter(filter);
            dataView.endUpdate();
        }
    }
})(GT, RS);
