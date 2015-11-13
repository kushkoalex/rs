RS.opsDashboard = function ($parent) {
    var rs = this,
        global = rs.global,
        gt = global.GT,
        tp = global.cnCt.tp,
        settings = rs.settings,
        build = tp('opsDashboard', $parent),
        notifications = rs.notifications,
        securitiesErrorMessageTimeout = rs.settings.controlsDescriptors.securities.errorMessageTimeout || 3000,
        $popupMessagesWrapper = build.messagesWrapper,
        $btnSubmit = build.btnSubmit,
        u;


    var showErrorMessage = function (error) {
        var errorOptions = {
            text: error.text || error.description || 'error',
            $wrapper: $popupMessagesWrapper,
            hideTimeout: error.hideTimeout || securitiesErrorMessageTimeout
        };
        notifications.showError(errorOptions);
    };

    var showAnnouncementMessage = function (announcement) {
        var announcementOptions = {
            text: announcement.text,
            $wrapper: $popupMessagesWrapper,
            hideTimeout: announcement.hideTimeout || securitiesErrorMessageTimeout
        };
        notifications.showAnnouncement(announcementOptions);
    };


    var sendEmailOnSuccess = function (response) {
        if (response.errorCode === 1) {
            showErrorMessage({text: response.errorText});
        } else {
            showAnnouncementMessage({text: response.message});
        }
        btnSubmit.enable();
    };

    var sendEmailOnError = function () {
        showErrorMessage({text: 'an error occurred while sending request'});
        btnSubmit.enable();
    };

    var sbmBtnClick = function () {

        btnSubmit.loading();
        //var data = {
        //    portfolios: portfolios.getValues(),
        //    securityIds: securityIds.getValues(),
        //    runDate: $runDate.value
        //};

        $.ajax({
            url: settings.controlsDescriptors.securities.opsDashboardSendEmainUrl,
            type: 'POST',
            //data: JSON.stringify(data),
            contentType: 'application/json',
            success: sendEmailOnSuccess,
            error: sendEmailOnError
        });
    };

    var btnSubmit = gt.button($btnSubmit, {submitCallBack: sbmBtnClick});

};