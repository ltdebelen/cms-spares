$(document).ready(function () {
    $('#tblEquipmentList').DataTable();

    // ADD EQUIPMENT

    $('#tc_dr_date').datepicker({
        format: 'yyyy-mm-dd'
    });

    $('#tc_begin_date').datepicker({
        format: 'yyyy-mm-dd'
    });

    $('#tc_end_date').datepicker({
        format: 'yyyy-mm-dd'
    });

    $('#pc_begin_date').datepicker({
        format: 'yyyy-mm-dd'
    });

    $('#pc_end_date').datepicker({
        format: 'yyyy-mm-dd'
    });

    $('#addEquipmentForm').on('submit', function (e) {
        e.preventDefault();

        var form_data = $(this).serialize();

        $.ajax({
            url: '/add_equipment',
            method: 'POST',
            data: form_data,
            success: function (response) {

                if (response.message == "Success") {
                    location.reload();
                }
            }
        });
    });

    // VIEW EQUIPMENT
    $('.btnViewEquipment').click(function (event) {
        var equipment_id = $(this).data('id');

        $.ajax({
            url: '/get_equipment',
            method: 'POST',
            data: { equipment_id: equipment_id },
            success: function (response) {

                $('#viewEquipmentModal').modal('show');

                // EQUIPMENT DETAILS 
                $('#tdProductId').html('<b>' + response[0].product_id + '</b>');
                $('#tdDescription').html('<b>' + response[0].description + '</b>');
                $('#tdQuantity').html('<b>' + response[0].quantity + '</b>');
                $('#tdSerialNumber').html('<b>' + response[0].serial_number + '</b>');
                $('#tdSiteLocation').html('<b>' + response[0].site_location + '</b>');

                // TRENDS COVERAGE
                $('#tdDrNumber').html('<b>' + response[0].tr_number + '</b>');
                $('#tdDrDate').html('<b>' + response[0].str_tr_date + '</b>');
                $('#tdEIBeginDate').html('<b>' + response[0].str_tc_begin_date + '</b>');
                $('#tdEIEndDate').html('<b>' + response[0].str_tc_end_date + '</b>');

                // PRINCIPAL COVERAGE
                $('#tdPrincipal').html('<b>' + response[0].principal + '</b>');
                $('#tdDistributor').html('<b>' + response[0].distributor + '</b>');
                $('#tdTrendsPO').html('<b>' + response[0].trends_po + '</b>');
                $('#tdTrendsMPO').html('<b>' + response[0].trends_mpo + '</b>');
                $('#tdPCBeginDate').html('<b>' + response[0].str_pc_begin_date + '</b>');
                $('#tdPCEndDate').html('<b>' + response[0].str_pc_end_date + '</span></b>');
                $('#tdContractNumber').html('<b>' + response[0].contract_number + '</b>');
                $('#tdTypeOfService').html('<b>' + response[0].type_of_service + '</b>');
                $('#tdSLA').html('<b>' + response[0].replacement_sla + '</b>');
            }
        });
    });

    // UPDATE EQUIPMENT

    $('#update_tc_dr_date').datepicker({
        format: 'yyyy-mm-dd'
    });

    $('#update_tc_begin_date').datepicker({
        format: 'yyyy-mm-dd'
    });

    $('#update_tc_end_date').datepicker({
        format: 'yyyy-mm-dd'
    });

    $('#update_pc_begin_date').datepicker({
        format: 'yyyy-mm-dd'
    });

    $('#update_pc_end_date').datepicker({
        format: 'yyyy-mm-dd'
    });

    $('.btnUpdateEquipment').click(function (event) {
        var equipment_id = $(this).data('id');
        $('#hidden_equipment_id').val(equipment_id);

        $.ajax({
            url: '/get_equipment',
            method: 'POST',
            data: { equipment_id: equipment_id },
            success: function (response) {

                $('#updateEquipmentModal').modal('show');

                // EQUIPMENT DETAILS 
                $('#update_ed_product_id').val(response[0].product_id);
                $('#update_ed_description').val(response[0].description);
                $('#update_ed_quantity').val(response[0].quantity);
                $('#update_ed_serial_number').val(response[0].serial_number);
                $('#update_ed_site_loc').val(response[0].site_location);

                // TRENDS COVERAGE
                $('#update_tc_dr_number').val(response[0].tr_number);
                $('#update_tc_dr_date').val(response[0].sql_tr_date);
                $('#update_tc_begin_date').val(response[0].sql_tc_begin_date);
                $('#update_tc_end_date').val(response[0].sql_tc_end_date);

                // PRINCIPAL COVERAGE
                $('#update_pc_principal').val(response[0].principal);
                $('#update_pc_distributor').val(response[0].distributor);
                $('#update_pc_trends_po').val(response[0].trends_po);
                $('#update_pc_trends_mpo').val(response[0].trends_mpo);
                $('#update_pc_contract_number').val(response[0].contract_number);
                $('#update_pc_begin_date').val(response[0].sql_pc_begin_date);
                $('#update_pc_end_date').val(response[0].sql_pc_end_date);
                $('#update_pc_type_of_service').val(response[0].type_of_service);
                $('#update_pc_replacement_sla').val(response[0].replacement_sla);
            }
        });
    });

    $('#updateEquipmentForm').on('submit', function (event) {
        event.preventDefault();

        var form_data = $(this).serialize();

        $.ajax({
            url: '/update_equipment',
            method: 'POST',
            data: form_data,
            success: function (response) {
                if (response.message == "Updated") {
                    location.reload();
                }
            }
        });
    });

    // REPLACE SERIAL
    $('.btnReplaceSerial').click(function (event) {
        var equipment_id = $(this).data('id');
        $('#hidden_modal_equipment_id').val(equipment_id);

        $('.trSerialHistory').remove();

        $.ajax({
            url: '/load_serial_history',
            method: 'POST',
            data: { equipment_id: equipment_id },
            success: function (response) {
                var response = response;
                var tableData = '';
                $.each(response, function (index, row) {
                    tableData += '<tr class="trSerialHistory">';
                    tableData += '<td><span class="label label-success">' + row.serial_number + '</span></td>';
                    tableData += '<td>' + row.date_added + '</td>';
                    tableData += '</tr>';
                });

                $('#tblReplaceSerials').append(tableData);

                $('#replaceSerialModal').modal('show');
            }
        });
    });

    $('#replaceSerialForm').on('submit', function (event) {
        event.preventDefault();

        var form_data = $(this).serialize();

        $.ajax({
            url: '/replace_serial',
            method: 'POST',
            data: form_data,
            success: function (response) {
                if (response.message == "Replaced") {
                    location.reload();
                }
            }
        });
    });

    // IMPORT CSV
    $("#input-b9").fileinput({
        showPreview: false,
        showUpload: false,
        elErrorContainer: '#kartik-file-errors',
        allowedFileExtensions: ["csv"]
    });

    $('#uploadCSVForm').on('submit', function (event) {
        event.preventDefault();

        $.ajax({
            url: '/el_upload',
            method: "POST",
            data: new FormData(this),
            contentType: false,
            processData: false,
            success: function (response) {
                if (response.message == 'success') {
                    location.reload();
                }
            }
        });

    });
});