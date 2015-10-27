(function (rs) {
    var tmpls = rs.tmpls,
        gt = rs.global.GT,
        u;

    tmpls.securityIndicLoading = function () {
        return {c: 'security-indic-empty'}
    };

    tmpls.securityIndic = function (data) {
        var widgetColor = 'color1',
            selectItems = rs.settings.dataModels.accountingMethod,
            items = [],
            i;
        gt.cloneArray(selectItems, items);

        for (i = 0; i < items.length; i++) {
            if (items[i].value === data.AccountingMethod) {
                items[i].selected = true;
            }
        }

        items.unshift({text: '', value: ''});

        return [
            {
                c: 'input-group inline', C: [
                {
                    c: 'form-control',
                    C: tmpls.select({n: 'accMethod', items: items, title: 'Accounting Method:'})
                },
                {
                    c: 'form-control',
                    C: tmpls.loadingButton({text: 'Update', n: 'btnSubmit'})
                }
            ]
            },
            {
                c: 'panels-container', C: [

                tmpls.displayInfoWidget({color: widgetColor, title: 'Basic Information', items: data.BasicInfo}),
                tmpls.displayInfoWidget({
                    color: widgetColor,
                    type: 'list',
                    showHeader: true,
                    columns: ['Name', 'Value'],
                    title: 'Security Identifiers',
                    items: data.Identifiers
                })
            ]
            },
            {
                c: 'panels-container',
                C: tmpls.displayInfoWidget({color: widgetColor, title: 'Issue Information', items: data.IssueInfo})
            },
            {
                c: 'panels-container', C: [
                tmpls.displayInfoWidget({color: widgetColor, title: 'Coupon', items: data.CouponInfo}),
                tmpls.displayInfoWidget({color: widgetColor, title: 'Floating Coupon', items: data.FloatingInfo})
            ]
            },
            {
                c: 'panels-container', C: {
                e: 'table', C: [
                    {
                        e: 'tr', C: [
                        {
                            e: 'td', C: tmpls.displayInfoWidget({
                            color: widgetColor,
                            type: 'list',
                            showHeader: false,
                            columns: ['Date', 'Value'],
                            title: 'Put Schedule', items: data.PutSchedule
                        })
                        },
                        {
                            e: 'td', C: tmpls.displayInfoWidget({
                            color: widgetColor,
                            type: 'list',
                            showHeader: false,
                            columns: ['Date', 'Value'],
                            title: 'Call Schedule',
                            items: data.CallSchedule
                        })
                        }
                    ]
                    },
                    {
                        e: 'tr', C: {
                        e: 'td', a: {colspan: '2'}, C: tmpls.displayInfoWidget({
                            color: widgetColor,
                            type: 'list',
                            showHeader: true,
                            columns: ['ScheduleDate', 'DueDate', 'Price', 'Amount', 'ScheduleType'],
                            title: 'Amortization Schedules',
                            items: data.AmortizationSchedule
                        })
                    }
                    },
                    {
                        e: 'tr', C: [
                        {
                            e: 'td', C: tmpls.displayInfoWidget({
                            color: widgetColor,
                            type: 'list',
                            showHeader: true,
                            columns: ['Date', 'Value'],
                            title: 'Margin Schedules',
                            items: data.MarginSchedule
                        })
                        },
                        {
                            e: 'td', C: tmpls.displayInfoWidget({
                            color: widgetColor,
                            type: 'list',
                            showHeader: true,
                            columns: ['Date', 'Value'],
                            title: 'Increm. Coupon Schedules',
                            items: data.IncrementalCouponSchedule
                        })
                        }
                    ]
                    },
                    {
                        e: 'tr', C: {
                        e: 'td', a: {colspan: '2'}, C: tmpls.displayInfoWidget({
                            color: widgetColor,
                            type: 'list',
                            showHeader: true,
                            columns: ['EffectiveDate', 'Coupon', 'EndDate', 'RateOptionCode'],
                            title: 'Coupon Adjustment Schedules',
                            items: data.CouponAdjustmentSchedule
                        })
                    }
                    },
                    {
                        e: 'tr', C: {
                        e: 'td', a: {colspan: '2'}, C: tmpls.displayInfoWidget({
                            color: widgetColor, type: 'list',
                            showHeader: true,
                            columns: ['StartDate', 'EndDate', 'Premium'],
                            title: 'PIK Info', items: data.PikInfo
                        })
                    }
                    },
                    {
                        e: 'tr', C: [
                        {
                            e: 'td', C: tmpls.displayInfoWidget({
                            color: widgetColor,
                            type: 'list',
                            showHeader: true,
                            columns: ['Date', 'Value'],
                            title: 'Factor Schedules',
                            items: data.FactorCouponSchedule
                        })
                        },
                        {
                            e: 'td', C: tmpls.displayInfoWidget({
                            color: widgetColor,
                            type: 'list',
                            showHeader: true,
                            columns: ['Date', 'Value'],
                            title: 'Finance Adjustment',
                            items: data.FinanceAdjustment
                        })
                        }
                    ]
                    },
                    {
                        e: 'tr', C: {
                        e: 'td', a: {colspan: '2'}, C: tmpls.displayInfoWidget({
                            color: widgetColor,
                            type: 'list',
                            showHeader: true,
                            columns: ['ElectionDate', 'Frequency', 'FixingIndex', 'Tenor', 'OddEndDate', 'CouponDayType'],
                            title: 'Rate Election',
                            items: data.RateElection
                        })
                    }
                    },
                    {
                        e: 'tr', C: [
                        {
                            e: 'td', C: tmpls.displayInfoWidget({
                            color: widgetColor,
                            type: 'list',
                            showHeader: true,
                            columns: ['Date', 'Value'],
                            title: 'Redemption Schedules',
                            items: data.RedemptionSchedule
                        })
                        },
                        {
                            e: 'td', C: tmpls.displayInfoWidget({
                            color: widgetColor,
                            type: 'list',
                            showHeader: true,
                            columns: ['Date', 'Election'],
                            title: 'Rate Option Election',
                            items: data.RateOptionElection
                        })
                        }
                    ]
                    }
                ]
            }
            }

        ];
    };

}(RS));