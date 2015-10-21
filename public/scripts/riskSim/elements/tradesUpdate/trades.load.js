RS.loadIntoRiskSim = function ($parent) {
    var rs = this,
        global = rs.global,
        gt = global.GT,
        settings = rs.settings,
        notifications = rs.notifications,
        securitiesErrorMessageTimeout = rs.settings.controlsDescriptors.securities.errorMessageTimeout || 3000,
        $popupMessagesWrapper=$parent.messagesWrapper,
        eventOnPointerEnd = gt.deviceInfo.eventOnPointerEnd,
        $evIds = $parent.evIds,
        $btnSubmit = $parent.btnSubmit,
        $btnClear = $parent.btnClear,
        u;


    var showErrorMessage = function (error) {
        var errorOptions = {
            text: error.text || 'error',
            $wrapper: $popupMessagesWrapper,
            hideTimeout: error.hideTimeout || securitiesErrorMessageTimeout
        };
        notifications.showError(errorOptions);
    };

    var showAnnouncementMessage = function (announcement) {
        var announcementOptions = {
            text: announcement.text,
            $wrapper: $popupMessagesWrapper,
            hideTimeout: securitiesErrorMessageTimeout
        };
        notifications.showAnnouncement(announcementOptions);
    };



    var disableSbmBtn = function (ctx) {
        gt.addClass(ctx.parentNode, 'disabled');
        gt.addClass(ctx.parentNode, 'loading');
        gt.removeEvent($btnSubmit, eventOnPointerEnd, sbmBtnClick);
    };

    var enableSbmBtn = function () {
        gt.removeClass($btnSubmit.parentNode, 'disabled');
        gt.removeClass($btnSubmit.parentNode, 'loading');
        gt.addEvent($btnSubmit, eventOnPointerEnd, sbmBtnClick);
    };

    var loadOnSuccess = function (response) {
        if (response.errorCode == 0) {
            showAnnouncementMessage({ text: 'Completed' });
        } else {
            showErrorMessage({ text: 'Error excluding trades ' + response.errorText });
        }
        enableSbmBtn();
    };

    var loadOnError = function () {
        showErrorMessage({text:'Error loading into RiskSim'});
        enableSbmBtn();
    };

    var sbmBtnClick = function () {
        if (!validateFields()) {
            return;
        }
        disableSbmBtn(this);
        //gt.request(
        //    {
        //        method: 'POST',
        //        contentType:'application/json',
        //        postData: {evIds: JSON.stringify(evIds.getValues())},
        //        url: settings.controlsDescriptors.securities.updateTrades_loadIntoRiskSimUrl,
        //        onSuccess: loadOnSuccess,
        //        onError: loadOnError
        //    });

        $.ajax({
            url: settings.controlsDescriptors.securities.updateTrades_loadIntoRiskSimUrl,
            type: 'POST',
            data: JSON.stringify({evIds:evIds.getValues()}),
            contentType: 'application/json',
            success: loadOnSuccess,
            error: loadOnError
        });
    };

    var clearBtnClick = function(){
        evIds.clear();
    };

    var validateFields = function () {
        var isValid = true;

        if (evIds.getValues().length===0) {
            console.log($evIds);
            gt.addClass($evIds, 'error');
            isValid = false
        }

        if(!isValid){
            showErrorMessage({text: 'Please fill required fields:', hideTimeout: 1000});
        }
        return isValid;
    };

    var evIds = gt.multipleInput($evIds);
    gt.addEvent($btnSubmit, eventOnPointerEnd, sbmBtnClick);
    gt.addEvent($btnClear, eventOnPointerEnd, clearBtnClick);


};