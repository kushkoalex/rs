(function (rs) {
    var tmpls = rs.tmpls;
    tmpls.datePicker = function (options) {
        options.type='datePicker';
        return tmpls.input(options);
    }
}(RS));


(function (gt) {
    gt.datePicker = function($object){
        $($object).datepicker({
            showOn: "button",
            buttonText:'',
            buttonImage:'../images/calendar.png',
            buttonImageOnly: false,
            changeMonth: true,
            changeYear: true
        });
    }
})(GT);
