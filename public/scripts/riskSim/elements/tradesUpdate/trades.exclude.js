RS.excludeTrades = function ($parent) {
    var rs = this,
        global = rs.global,
        gt = global.GT,
        settings = rs.settings,
        notifications = rs.notifications,
        securitiesErrorMessageTimeout = rs.settings.controlsDescriptors.securities.errorMessageTimeout || 3000,
        $popupMessagesWrapper = $parent.messagesWrapper,
        $evIds = $parent.evIds,
        $btnSubmit = $parent.btnSubmit,
        $process = $parent.process,
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

    var loadOnError = function (e) {
        showErrorMessage({text: 'Error excluding trades '});
        btnSubmit.enable();
    };

    var sbmBtnClick = function () {
        if (!validateFields()) {
            return;
        }

        btnSubmit.loading();

        $.ajax({
            url: settings.controlsDescriptors.securities.updateTrades_TradesExcludeUrl,
            type: 'POST',
            data: JSON.stringify({
                evIds: evIds.getValues(),
                exclusionType: $process.value
            }),
            contentType: 'application/json',
            success: loadOnSuccess,
            error: loadOnError
        });

    };

    var validateFields = function () {
        var isValid = true;

        if ($process.value.trim() == '') {
            gt.addClass($process, 'error');
            isValid = false
        }

        if (evIds.getValues().length===0) {
            gt.addClass($evIds, 'error');
            isValid = false
        }

        if(!isValid){
            showErrorMessage({text: 'Please fill required fields:', hideTimeout: 1000});
        }
        return isValid;
    };

    var clearBtnClick = function () {
        evIds.clear();
        $process.selectedIndex = 0;
    };


    var evIds = gt.multipleInput($evIds);
    var btnSubmit = gt.button($btnSubmit,{submitCallBack: sbmBtnClick});
    gt.button($btnClear,{submitCallBack: clearBtnClick});

};