$(document).ready(function () {
    //#region
    // General Information Functions
    var customer_name = $('#customerListVal').val();
    $(".customerNameList").val(customer_name).trigger('change');

    var end_user_name = $('#endUserListVal').val();
    $('.endUserNameList').val(end_user_name).trigger('change');

    var am = $('#amListVal').val();
    $('.amList').val(am).trigger('change');
    //#endregion

    //#region
    // Contract Details Function
    var acct_type = $('#acctTypeVal').val();
    $('.acctTypeList').val(acct_type);

    var doc_type = $('#docTypeVal').val();
    $('.docTypeList').val(doc_type);

    var cont_status = $('#contStatusVal').val();
    $('.contStatusList').val(cont_status);
    //#endregion

    //#region
    // Scope of Work Functions
    var service_type = $('#serviceTypeVal').val();
    $(".serviceTypeList").val(service_type).trigger('change');

    var pm_frequency = $('#pmFreqVal').val();
    $(".pmFreqList").val(pm_frequency).trigger('change');

    var hc_frequency = $('#hcFreqVal').val();
    $(".hcFreqList").val(hc_frequency).trigger('change');

    var tech_groups = $('#techGroupVal').val();
    var techgGroupSplit;
    if (tech_groups != null) {
        techgGroupSplit = tech_groups.split(',');
    }
    $('#tech_group_email').val(techgGroupSplit).trigger('change');

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
    //#endregion

    //#region
    // Renewal Status Functions

    var renewal_update = $('#rnewUpdateVal').val();
    $(".rnewUpdateList").val(renewal_update).trigger('change');

    var am_update = $('#amUpdateVal').val();
    $(".amUpdateList").val(am_update).trigger('change');

    //#endregion

    //#region
    // General Contract Functions

    $('#update_contract_form').on('submit', function (event) {

        event.preventDefault();

        var form_data = $(this).serialize();

        $.ajax({
            url: '/contracts/contract_form_update',
            method: 'POST',
            data: form_data,
            success: function (response) {
                if (response.status == 'contract_updated') {
                    window.location.href = "http://localhost:8085/contracts";
                }
            }
        })

    });

    //#endregion
});