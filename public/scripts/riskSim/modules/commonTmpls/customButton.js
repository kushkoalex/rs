(function (rs) {
    var tmpls = rs.tmpls;
    tmpls.customButton = function (options) {
        var content = [];
        options = options || {};

        if (options.hasLoadingIndicator) {
            content.push({c: 'indic'});
        }

        content.push({c: 'btn noselect', t: options.text || 'button'});

        return {
            c: 'custom-button',
            n: options.n,
            C: content
        };
    };

    tmpls.loadingButton = function (options) {
        options = options || {};
        options.hasLoadingIndicator = true;
        return tmpls.customButton(options);
    }

}(RS));

(function (gt, rs) {

    gt.customButton = function ($object, options) {
        options = options || {};
        var loadingCssClass = 'loading',
            disabledCssClass = 'disabled',
            $button = gt.$c('btn', $object)[0],
            eventOnPointerEnd = gt.deviceInfo.eventOnPointerEnd,
            callback = options.submitCallBack,
            u;

        var disableButton = function () {
            gt.addClass($object, disabledCssClass);
            gt.removeEvent($button, eventOnPointerEnd, callback);
        };

        var enableButton = function(){
            gt.removeClass($object, disabledCssClass);
            gt.removeClass($object, loadingCssClass);
            gt.addEvent($button, eventOnPointerEnd, callback);
        };

        var showLoadingIndicator = function(){
            gt.addClass($object, loadingCssClass);
        };

        if (options.isLoading === true) {
            showLoadingIndicator();
            disableButton();
        }

        if (options.isDisabled === true) {
            gt.addClass($object, disabledCssClass)
        } else {
            gt.addEvent($button, eventOnPointerEnd, callback);
        }

        return {
            disable: function () {
                disableButton();
            },

            loading: function () {
                showLoadingIndicator();
                this.disable();
            },

            enable: function () {
                enableButton();
            }
        }
    }

})(GT, RS);


