RS.userSettings = function ($parent) {
    var rs = this,
        global = rs.global,
        gt = global.GT,
        tp = global.cnCt.tp,
        settings = rs.settings,
        eventOnPointerEnd = gt.deviceInfo.eventOnPointerEnd,
        notifications = rs.notifications,
        securitiesErrorMessageTimeout = settings.controlsDescriptors.securities.errorMessageTimeout || 3000,
        build = tp('userSettings', $parent),
        $userSettingsContentWrapper = build.r,
        dataModel = settings.dataModels.userSettings,
        gridBuild,
        columnBuild,
        $gridContent,
        $fragmentGrid,
        u;


    var $fragment = global.document.createDocumentFragment();


    gt.each(dataModel.grids, function (grid) {

        gridBuild = tp('gridSettingsWidget', $fragment);
        gridBuild.title.innerText = grid.gridName;
        $gridContent =  gridBuild.content;

        $fragmentGrid = global.document.createDocumentFragment();

        gt.each(grid.gridColumns, function(gridColumn){

            columnBuild = tp('gridSettingsWidgetColumn', gridColumn, $fragmentGrid);

            columnBuild.columnName.innerText = gridColumn.columnName;

        });

        $gridContent.appendChild($fragmentGrid);


    });

    $userSettingsContentWrapper.appendChild($fragment);
};