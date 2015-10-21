RS.modulesForInit.push(function(rs){
    var global = rs.global,
        gt = global.GT,
        eventOnPointerEnd = gt.deviceInfo.eventOnPointerEnd,
        tp = global.cnCt.tp,
        $notificationsWrapper = null,
        removeNotificationTimeoutId = -1,
        isNotificationShowed = false,

        $action = null,
        actionCallback,

        $errorField = null,
        $errorFieldWrapper = null,
        errorFieldCSSClass = 'isErrorField',

        $notification;

    function showAnnouncement(options){
        $notification = buildNotification(options, 'notificationAnnouncement');
        showNotification(options);
    }
    function showError(options){
        $notification = buildNotification(options, 'notificationError');
        initErrorField(options);
        showNotification(options);
    }
    function buildNotification(options, template){
        removeActiveNotification();
        return tp(template, options.text).notification;
    }
    function initAction(options){
        if (('action' in options) && ('actionCallback' in options)){
            $action = tp('notificationAction', options.action, $notification).r;
            actionCallback = options.actionCallback;
            gt.addEvent($action, eventOnPointerEnd, actionCallback);
        }
    }
    function initErrorField(options){
        if ('$field' in options){
            $errorField = options.$field;
            $errorFieldWrapper = options.$fieldWrapper || $errorField;
            gt.addClass($errorFieldWrapper, errorFieldCSSClass);
            gt.addEvent($errorField, 'focus', removeFieldErrorStyle);
        }
    }
    function removeFieldErrorStyle(){
        gt.removeClass($errorFieldWrapper, errorFieldCSSClass);
    }

    function showNotification(options){
        initAction(options);
        $notificationsWrapper = options.$wrapper;
        $notificationsWrapper.appendChild($notification);
        isNotificationShowed = true;
        if(options.hideTimeout && options.hideTimeout!==0) {
            removeNotificationTimeoutId = global.setTimeout(removeActiveNotification, options.hideTimeout);
        }
    }

    function removeActiveNotification(){
        if (isNotificationShowed){
            isNotificationShowed = false;
            if ($action !== null){
                gt.removeEvent($action, eventOnPointerEnd, actionCallback);
                $action = null;
            }
            if ($errorField !== null){
                removeFieldErrorStyle();
                gt.removeEvent($errorField, 'focus', removeFieldErrorStyle);
                $errorField = null;
                $errorFieldWrapper = null;
            }
            if (removeNotificationTimeoutId !== -1){
                global.clearTimeout(removeNotificationTimeoutId);
                removeNotificationTimeoutId = -1;
            }
            $notificationsWrapper.removeChild($notification);
        }
    }

    rs.notifications = {
        showAnnouncement: showAnnouncement,
        showError: showError,
        removeActiveNotification: removeActiveNotification
    }
});