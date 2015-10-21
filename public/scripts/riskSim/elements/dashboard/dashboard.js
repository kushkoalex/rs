RS.dashboard = function($parent){
    var gb = this,
        global = gb.global,
        gt = global.GT,
        tp = global.cnCt.tp,
        settings = gb.settings,
        doc = global.document,
        data = settings.dataModels.displayInfoWidgetData,
        eventOnPointerEnd = gt.deviceInfo.eventOnPointerEnd,
        build,
        $evIds,
        u;




    build = tp('dashboard', $parent);

    $evIds = build.evIds;

    gt.multipleInput($evIds);


};