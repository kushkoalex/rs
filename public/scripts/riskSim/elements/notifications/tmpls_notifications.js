(function(rs){
    var tmpls = rs.tmpls,
        gt = rs.global.GT,
        l10n = gt.l10n;

    tmpls.notificationAnnouncement = function(text){
        return {c: 'notification notification-announcement', n: 'notification', C: [
            {c: 'notification-text', H: text}
        ]};
    };

    tmpls.notificationError = function(text){
        return {c: 'notification notification-error', n: 'notification', C: [
            {c: 'notification-error-icon'},
            {c: 'notification-text', H: text}
        ]};
    };

    tmpls.notificationAction = function(type){
        return {c: 'notification-action notification-action_' + type, n: 'removeMessage', t: l10n('notificationAction_' + type, 'firstUpper')};
    };

}(RS));
