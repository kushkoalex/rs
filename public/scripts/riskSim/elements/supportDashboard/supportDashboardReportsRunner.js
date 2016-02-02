RS.supportDashboardReportsRunner = function ($parent) {
    var rs = this,
        global = rs.global,
        gt = global.GT,
        tp = global.cnCt.tp,
        settings = rs.settings,
        errorMessageTimeout = rs.settings.controlsDescriptors.errorMessageTimeout || 3000,
        notifications = rs.notifications,
        build = tp('supportDashboardReportsRunner', $parent),
        $runDate = build.runDate,
        $portfolios = build.portfolios,
        $securityIds = build.securityIds,
        $popupMessagesWrapper = build.messagesWrapper,
        $btnSubmit = build.btnSubmit,
        refreshIntervalId,
        statusChecked = false,
        u;

    var showErrorMessage = function (error) {
        var errorOptions = {
            text: error.text || error.description || 'error',
            $wrapper: $popupMessagesWrapper,
            hideTimeout: error.hideTimeout || errorMessageTimeout
        };
        notifications.showError(errorOptions);
    };

    var showAnnouncementMessage = function (announcement) {
        var announcementOptions = {
            text: announcement.text,
            $wrapper: $popupMessagesWrapper,
            hideTimeout: announcement.hideTimeout || errorMessageTimeout
        };
        notifications.showAnnouncement(announcementOptions);
    };

    var getStatus = function () {
        var statusMessage;
        $.ajax({
            url: rs.settings.controlsDescriptors.supportDashboard.runReportsStatusUrl,
            type: 'GET',
            contentType: 'application/json',
            success: function (response) {

                var status = JSON.parse(response);


                console.log(status);

                if (status.resultItems.length === 0 || status.completed === 1) {
                    if (refreshIntervalId) {
                        clearInterval(refreshIntervalId);
                        btnSubmit.enable();
                        showAnnouncementMessage({ text: "There are no running processes" });
                    }
                }
                else {
                    btnSubmit.loading();
                }

                if (status.completed===1 && !statusChecked) {
                    showAnnouncementMessage({text: 'There are no running processes'});
                } else {
                    statusMessage = '';
                    for (var i = 0; i < status.resultItems.length; i++) {
                        statusMessage += status.resultItems[i].process + ' | ' + status.resultItems[i].details + ' | ' + status.resultItems[i].progress + '<br>';
                    }
                    if (status.resultItems.length === 0) {
                        showAnnouncementMessage({ text: "There are no running processes" });
                    } else {
                        showAnnouncementMessage({ text: statusMessage });
                    }

                }
                statusChecked = true;
            },
            error: function (error) {
                console.log(error);
                clearInterval(refreshIntervalId);
                btnSubmit.enable();
                showErrorMessage({text: error || 'error'});
            }
        });
    };

    var rgRunOnSuccess = function (response) {
        if (response.errorCode !== 0) {
            showErrorMessage({text: response.errorText, hideTimeout: 3000});
            btnSubmit.enable();
        } else {
            showAnnouncementMessage({text: response.message});
            refreshIntervalId = setInterval(getStatus, 2000);
        }
    };

    var rgRunOnError = function () {
        showErrorMessage({text: 'error'});
        btnSubmit.enable();
    };

    var validateFields = function () {
        var isValid = true;

        if (portfolios.getValues().length === 0) {
            gt.addClass($portfolios, 'error');
            isValid = false
        }
        if (securityIds.getValues().length === 0) {
            gt.addClass($securityIds, 'error');
            isValid = false
        }

        if ($runDate.value === '') {
            gt.addClass($runDate, 'error');
            isValid = false
        }

        if (!isValid) {
            showErrorMessage({text: 'Please fill required fields:', hideTimeout: 1000});
        }
        return isValid;
    };

    var sbmBtnClick = function () {
        if (!validateFields()) {
            return;
        }
        btnSubmit.loading();
        var data = {
            portfolios: portfolios.getValues(),
            securityIds: securityIds.getValues(),
            runDate: $runDate.value
        };
        $.ajax({
            url: settings.controlsDescriptors.supportDashboard.runReportsUrl,
            type: 'POST',
            data: JSON.stringify(data),
            contentType: 'application/json',
            success: rgRunOnSuccess,
            error: rgRunOnError
        });
    };


    gt.datePicker($runDate);
    var portfolios = gt.multipleInput($portfolios);
    var securityIds = gt.multipleInput($securityIds);
    var btnSubmit = gt.button($btnSubmit, {submitCallBack: sbmBtnClick, isDisabled: true});
    getStatus();
    refreshIntervalId = setInterval(getStatus, 3000);
};