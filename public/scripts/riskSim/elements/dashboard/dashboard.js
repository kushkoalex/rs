RS.dashboard = function ($parent) {
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
        $customBtn,
        $loadingBtn,
        u;


    build = tp('dashboard', $parent);

    $evIds = build.evIds;
    $customBtn = build.customBtn;
    $loadingBtn = build.loadingBtn;

    gt.multipleInput($evIds);

    var onBtnClick = function (e) {

        console.log(e.target);

        btn2.loading();

        setTimeout(function () {
            btn2.enable();
        }, 1000);
    };


    var btn1 = gt.customButton($customBtn, {submitCallBack: onBtnClick});
    var btn2 = gt.customButton($loadingBtn, {submitCallBack: onBtnClick});


};