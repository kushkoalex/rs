RS.updateTrades = function ($parent) {
    var rs = this,
        global = rs.global,
        gt = global.GT,
        settings = rs.settings,
        notifications = rs.notifications,
        securitiesErrorMessageTimeout = rs.settings.controlsDescriptors.securities.errorMessageTimeout || 3000,
        $popupMessagesWrapper = $parent.messagesWrapper,
        eventOnPointerEnd = gt.deviceInfo.eventOnPointerEnd,
        $evIds = $parent.evIds,
        $btnSubmit = $parent.btnSubmit,
        $nominalSettleDate = $parent.nominalSettleDate,
        $strategy = $parent.strategy,
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
            showAnnouncementMessage({text: 'Completed'});
        } else {
            showErrorMessage({text: 'Error excluding trades ' + response.errorText});
        }
        btnSubmit.enable();
    };

    var loadOnError = function () {
        showErrorMessage({text: 'Error updating trades'});
        btnSubmit.enable();
    };

    var sbmBtnClick = function () {
        if (!validateFields()) {
            return;
        }

        btnSubmit.loading();

        var data = {
            evIds: evIds.getValues(),
            strategyId: $strategy.value,
            nominalSettlementDate: $nominalSettleDate.value
        };

        $.ajax({
            url: settings.controlsDescriptors.securities.updateTrades_TradesUpdateUrl,
            type: 'POST',
            data: JSON.stringify(data),
            contentType: 'application/json',
            success: loadOnSuccess,
            error: loadOnError
        });

    };
    var clearBtnClick = function () {
        evIds.clear();
        $strategy.selectedIndex = 0;
        $nominalSettleDate.value = '';
    };

    var validateFields = function () {
        var isValid = true;

        if (evIds.getValues().length === 0) {
            console.log($evIds);
            gt.addClass($evIds, 'error');
            isValid = false
        }

        if (!isValid) {
            showErrorMessage({text: 'Please fill required fields:', hideTimeout: 1000});
        }
        return isValid;
    };

    var evIds = gt.multipleInput($evIds);
    gt.datePicker($nominalSettleDate);

    var btnSubmit = gt.customButton($btnSubmit,{submitCallBack: sbmBtnClick});
    gt.customButton($btnClear,{submitCallBack:clearBtnClick});
    //gt.addEvent($btnSubmit, eventOnPointerEnd, sbmBtnClick);
    //gt.addEvent($btnClear, eventOnPointerEnd, clearBtnClick);
};