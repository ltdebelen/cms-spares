$(document).ready(function () {
    $('#tblContracts').DataTable({
        responsive: true
    });

    $('#rootwizard').bootstrapWizard({
        onTabShow: function (tab, navigation, index) {
            var $total = navigation.find('li').length;
            var $current = index + 1;
            var $percent = ($current / $total) * 100;
            $('#rootwizard .progress-bar').css({ width: $percent + '%' });
        }
    });

    //#region
    // General Information Functions

    $('.customerNameList').select2();
    $('.customerNameList').change(function () {
        var selected = $(this).find(':selected').data('address')
        $("#txtAddress").val(selected);
    });

    $('.endUserNameList').select2();
    $('.endUserNameList').change(function () {
        var selected = $(this).find(':selected').data('address')
        $("#txtSiteAddress").val(selected);
    });

    $('.amList').select2();
    $('.amList').change(function () {
        var selected = $(this).find(':selected').data('group')
        $('#txtBusinessGroup').val(selected);
    });

    $('.dateBooked').datepicker({
        format: 'yyyy-mm-dd'
    });

    //#endregion

    //#region
    // Contract Details Functions

    $('#cdStartDate').datepicker({
        format: 'yyyy-mm-dd'
    });

    $('#cdEndDate').datepicker({
        format: 'yyyy-mm-dd'
    });

    $('.acctTypeList').change(function () {
        var selected = $(this).val();

        if (selected == '1') {
            // Key Account

            // Phone Support
            $('#cd_ps_urgent').val('Within 10 minutes from receipt of Service Call');
            $('#cd_ps_high').val('Within 20 minutes from receipt of Service Call');
            $('#cd_ps_medium').val('Within 30 minutes from receipt of Service Call');
            $('#cd_ps_low').val('Within 30 minutes from receipt of Service Call');
            $('#cd_ps_af').val('Within 30 minutes from receipt of Service Call');

            // Within Metro Manila
            $('#cd_within_mm_urgent').val('Within One(1) hour from receipt of Service Call');
            $('#cd_within_mm_high').val('Within Two(2) hours from receipt of Service Call');
            $('#cd_within_mm_medium').val('Within Four(4) hours from receipt of Service Call');
            $('#cd_within_mm_low').val('Within Six(6) hours from receipt of Service Call');
            $('#cd_within_mm_af').val('Based on Agreed Schedule');

            // Outside Metro Manila
            $('#cd_outside_mm_urgent').val('Next Business Day, or; Based on agreed schedule, or; Based on earliest available land/air travel.');
            $('#cd_outside_mm_high').val('Next Business Day, or; Based on agreed schedule, or; Based on earliest available land/air travel.');
            $('#cd_outside_mm_medium').val('Next Business Day, or; Based on agreed schedule, or; Based on earliest available land/air travel.');
            $('#cd_outside_mm_low').val('Next Business Day, or; Based on agreed schedule, or; Based on earliest available land/air travel.');
            $('#cd_outside_mm_af').val('Based on Agreed Schedule');

        } else if (selected == '2') {
            // General Account

            // Phone Support
            $('#cd_ps_urgent').val('Within 30 minutes from receipt of Service Call');
            $('#cd_ps_high').val('Within 30 minutes from receipt of Service Call');
            $('#cd_ps_medium').val('Within 30 minutes from receipt of Service Call');
            $('#cd_ps_low').val('Within 30 minutes from receipt of Service Call');
            $('#cd_ps_af').val('Within 30 minutes from receipt of Service Call');

            // Within Metro Manila
            $('#cd_within_mm_urgent').val('Within Two(2) hour from receipt of Service Call');
            $('#cd_within_mm_high').val('Within Four(4) hours from receipt of Service Call');
            $('#cd_within_mm_medium').val('Within Six(6) hours from receipt of Service Call');
            $('#cd_within_mm_low').val('Within Eight(8) hours from receipt of Service Call');
            $('#cd_within_mm_af').val('Based on Agreed Schedule');

            // Outside Metro Manila
            $('#cd_outside_mm_urgent').val('Next Business Day, or; Based on agreed schedule, or; Based on earliest available land/air travel.');
            $('#cd_outside_mm_high').val('Next Business Day, or; Based on agreed schedule, or; Based on earliest available land/air travel.');
            $('#cd_outside_mm_medium').val('Next Business Day, or; Based on agreed schedule, or; Based on earliest available land/air travel.');
            $('#cd_outside_mm_low').val('Next Business Day, or; Based on agreed schedule, or; Based on earliest available land/air travel.');
            $('#cd_outside_mm_af').val('Based on Agreed Schedule');

        } else if (selected == '3') {
            // Other Account

            // Phone Support
            $('#cd_ps_urgent').val('');
            $('#cd_ps_high').val('');
            $('#cd_ps_medium').val('');
            $('#cd_ps_low').val('');
            $('#cd_ps_af').val('');

            // Within Metro Manila
            $('#cd_within_mm_urgent').val('');
            $('#cd_within_mm_high').val('');
            $('#cd_within_mm_medium').val('');
            $('#cd_within_mm_low').val('');
            $('#cd_within_mm_af').val('');

            // Outside Metro Manila
            $('#cd_outside_mm_urgent').val('');
            $('#cd_outside_mm_high').val('');
            $('#cd_outside_mm_medium').val('');
            $('#cd_outside_mm_low').val('');
            $('#cd_outside_mm_af').val('');
        }
    });

    //#endregion

    //#region
    // Scope of Work Functions

    $('#tech_group_email').select2({
        width: '100%'
    });

    $('#pmFreqList').change(function () {
        var selected = $('#pmFreqList').val();

        var tableHeader = '';
        tableHeader += '<div class="table-responsive">';
        tableHeader += '<table class="table table-bordered" id="pm_sched">';
        tableHeader += '<tr>';
        tableHeader += '<th>Start Date</th>'
        tableHeader += '<th>End Date</th>';
        tableHeader += '</tr>';

        var trItem = '';
        trItem += '<tr>';
        trItem += '<td>';
        trItem += '<div class="input-group date" id="pmStartDiv">';
        trItem += '<input type="text" class="form-control pmStartDate" name="pm_schedule_start[]">';
        trItem += '<span class="input-group-addon">';
        trItem += '<span class="glyphicon glyphicon-calendar"></span>';
        trItem += '</span>';
        trItem += '</div>';
        trItem += '</td>';
        trItem += '<td>';
        trItem += '<div class="input-group date" id="pmEndDiv">';
        trItem += '<input type="text" class="form-control pmEndDate" name="pm_schedule_end[]">';
        trItem += '<span class="input-group-addon">';
        trItem += '<span class="glyphicon glyphicon-calendar"></span>';
        trItem += '</span>';
        trItem += '</div>';
        trItem += '</td>';
        trItem += '</tr>';

        var tableClose = '';
        tableClose += '</table>';
        tableClose += '</div>';

        if (selected == 1) {
            var monthlyVal = 12;

            var html = '';
            html += tableHeader;

            for (var i = 0; i < monthlyVal; i++) {
                html += trItem;
            }

            html += tableClose;

            $('#pmSchedDiv').html(html);
        } else if (selected == 2) {
            var annualVal = 1;

            var html = '';
            html += tableHeader;

            for (var i = 0; i < annualVal; i++) {
                html += trItem;
            }

            html += tableClose;

            $('#pmSchedDiv').html(html);
        } else if (selected == 3) {
            var quarterlyVal = 4;

            var html = '';
            html += tableHeader;

            for (var i = 0; i < quarterlyVal; i++) {
                html += trItem;
            }

            html += tableClose;

            $('#pmSchedDiv').html(html);
        } else if (selected == 4) {
            var semiAnnualVal = 2;

            var html = '';
            html += tableHeader;

            for (var i = 0; i < semiAnnualVal; i++) {
                html += trItem;
            }

            html += tableClose;

            $('#pmSchedDiv').html(html);
        }

        $('.pmStartDate').each(function () {
            $(this).datepicker({
                format: 'yyyy-mm-dd'
            });
        });
        $('.pmEndDate').each(function () {
            $(this).datepicker({
                format: 'yyyy-mm-dd'
            });
        });
    });

    $('#hcFreqList').change(function () {
        var selected = $('#hcFreqList').val();

        var tableHeader = '';
        tableHeader += '<div class="table-responsive">';
        tableHeader += '<table class="table table-bordered" id="hc_sched">';
        tableHeader += '<tr>';
        tableHeader += '<th>Start Date</th>'
        tableHeader += '<th>End Date</th>';
        tableHeader += '</tr>';

        var trItem = '';
        trItem += '<tr>';
        trItem += '<td>';
        trItem += '<div class="input-group date" id="hcStartDiv">';
        trItem += '<input type="text" class="form-control hcStartDate" name="hc_schedule_start[]">';
        trItem += '<span class="input-group-addon">';
        trItem += '<span class="glyphicon glyphicon-calendar"></span>';
        trItem += '</span>';
        trItem += '</div>';
        trItem += '</td>';
        trItem += '<td>';
        trItem += '<div class="input-group date" id="hcEndDiv">';
        trItem += '<input type="text" class="form-control hcEndDate" name="hc_schedule_end[]">';
        trItem += '<span class="input-group-addon">';
        trItem += '<span class="glyphicon glyphicon-calendar"></span>';
        trItem += '</span>';
        trItem += '</div>';
        trItem += '</td>';
        trItem += '</tr>';

        var tableClose = '';
        tableClose += '</table>';
        tableClose += '</div>';

        if (selected == 1) {
            var monthlyVal = 12;

            var html = '';
            html += tableHeader;

            for (var i = 0; i < monthlyVal; i++) {
                html += trItem;
            }

            html += tableClose;

            $('#hcSchedDiv').html(html);
        } else if (selected == 2) {
            var annualVal = 1;

            var html = '';
            html += tableHeader;

            for (var i = 0; i < annualVal; i++) {
                html += trItem;
            }

            html += tableClose;

            $('#hcSchedDiv').html(html);
        } else if (selected == 3) {
            var quarterlyVal = 4;

            var html = '';
            html += tableHeader;

            for (var i = 0; i < quarterlyVal; i++) {
                html += trItem;
            }

            html += tableClose;

            $('#hcSchedDiv').html(html);
        } else if (selected == 4) {
            var semiAnnualVal = 2;

            var html = '';
            html += tableHeader;

            for (var i = 0; i < semiAnnualVal; i++) {
                html += trItem;
            }

            html += tableClose;

            $('#hcSchedDiv').html(html);
        }

        $('.hcStartDate').each(function () {
            $(this).datepicker({
                format: 'yyyy-mm-dd'
            });
        });
        $('.hcEndDate').each(function () {
            $(this).datepicker({
                format: 'yyyy-mm-dd'
            });
        });
    });

    //#endregion

});

$('#create_contract_form').on('submit', function (event) {

    event.preventDefault();

    var form_data = $(this).serialize();

    $.ajax({
        url: '/contracts/contract_form_submit',
        method: 'POST',
        data: form_data,
        success: function (response) {
            if (response.status == 'contract_saved') {
                window.location.href = "http://localhost:8085/contracts";
            }
        }
    })
});


