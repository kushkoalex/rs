RS.loadIntoRiskSim = function ($parent) {
    var rs = this,
        global = rs.global,
        gt = global.GT,
        settings = rs.settings,
        notifications = rs.notifications,
        securitiesErrorMessageTimeout = rs.settings.controlsDescriptors.securities.errorMessageTimeout || 3000,
        $popupMessagesWrapper=$parent.messagesWrapper,
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

    var loadOnSuccess = function (response) {
        if (response.errorCode == 0) {
            showAnnouncementMessage({ text: 'Completed' });
        } else {
            showErrorMessage({ text: 'Error excluding trades ' + response.errorText });
        }
        btnSubmit.enable();
    };

    var loadOnError = function () {
        showErrorMessage({text:'Error loading into RiskSim'});
        btnSubmit.enable();
    };

    var sbmBtnClick = function () {
        if (!validateFields()) {
            return;
        }

        btnSubmit.loading();

        $.ajax({
            url: settings.controlsDescriptors.securities.updateTrades_loadIntoRiskSimUrl,
            type: 'POST',
            data: JSON.stringify({evIds:evIds.getValues()}),
            contentType: 'application/json',
            success: loadOnSuccess,
            error: loadOnError
        });
    };

    var validateFields = function () {
        var isValid = true;

        if (evIds.getValues().length===0) {
            gt.addClass($evIds, 'error');
            isValid = false
        }

        if(!isValid){
            showErrorMessage({text: 'Please fill required fields:', hideTimeout: 1000});
        }
        return isValid;
    };

    var evIds = gt.multipleInput($evIds);
    var btnSubmit = gt.customButton($btnSubmit,{submitCallBack: sbmBtnClick});
    gt.customButton($btnClear,{submitCallBack: function(){evIds.clear();}});

};