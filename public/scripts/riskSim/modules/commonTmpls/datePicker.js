(function (rs) {
    var tmpls = rs.tmpls;
    tmpls.datePicker = function (options) {
        options.type='datePicker';
        return tmpls.input(options);
    }
}(RS));


(function (gt, rs) {
    gt.datePicker = function($object){
        $($object).datepicker({
            showOn: "button",
            buttonText:'',
            buttonImage: rs.settings.controlsDescriptors.siteSettings.datePickerCalendarImageUrl,
            buttonImageOnly: false,
            changeMonth: true,
            changeYear: true
        });
    }
})(GT, RS);
