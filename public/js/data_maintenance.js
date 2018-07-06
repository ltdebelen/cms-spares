$(document).ready(function () {
    $('#tblCustomers').DataTable({
        responsive: true
    });

    // ADD CUSTOMER
    $('#customerForm').on('submit', function (event) {
        event.preventDefault();

        var form_data = $(this).serialize();

        $.ajax({
            url: '/data_maintenance/add_customer',
            method: 'POST',
            data: form_data,
            success: function (response) {
                if (response.status == 'customer_added' || 'customer_updated') {
                    location.reload();
                }
            }
        })
    });

    // DELETE CUSTOMER
    $('#deleteCustomerForm').on('submit', function (event) {
        event.preventDefault();

        var customer_id = $('#del_customer_id').val();

        $.ajax({
            url: '/data_maintenance/delete_customer',
            method: 'POST',
            data: { customer_id: customer_id },
            success: function (response) {
                if (response.status == 'customer_deleted') {
                    location.reload();
                }
            }
        })
    });

    // ADD AM
    $('#amForm').on('submit', function (event) {
        event.preventDefault();

        var form_data = $(this).serialize();

        $.ajax({
            url: '/data_maintenance/add_am',
            method: 'POST',
            data: form_data,
            success: function (response) {
                if (response.status == 'customer_added' || 'customer_updated') {
                    location.reload();
                }
            }
        })
    });

    // DELETE AM
    $('#deleteAMForm').on('submit', function (event) {
        event.preventDefault();

        var am_id = $('#hiddenAMId').val();

        $.ajax({
            url: '/data_maintenance/delete_am',
            method: 'POST',
            data: { am_id: am_id },
            success: function (response) {
                if (response.status == 'customer_deleted') {
                    location.reload();
                }
            }
        })
    });


});

function addCustomer() {
    $('#customerModal').modal('show');
}

function updateCustomer(customer_id) {
    $.ajax({
        url: '/data_maintenance/search_customer',
        method: 'POST',
        data: { customer_id: customer_id },
        success: function (response) {
            $('#customer_id').val(response.customer[0].id);
            $('#customer_name').val(response.customer[0].name);
            $('#customer_address').val(response.customer[0].address);
            $('#customerModal').modal('show');
        }
    })
}

function deleteCustomer(customer_id) {
    $('#del_customer_id').val(customer_id);
    $('#deleteCustomerModal').modal('show');
}

function addAM() {
    $('#amModal').modal('show');
}

function updateAM(am_id) {
    $.ajax({
        url: '/data_maintenance/search_am',
        method: 'POST',
        data: { am_id: am_id },
        success: function (response) {
            $('#am_id').val(response.am[0].id);
            $('#first_name').val(response.am[0].first_name);
            $('#last_name').val(response.am[0].last_name);
            $('#am_email').val(response.am[0].email);
            $('#business_group').val(response.am[0].business_group_id);
            $('#amModal').modal('show');
        }
    })
}

function deleteAM(am_id) {
    $('#hiddenAMId').val(am_id);
    $('#deleteAMModal').modal('show');
}