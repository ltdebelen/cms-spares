var express = require('express');
var router = express.Router();
var csv = require('fast-csv');
var fs = require('fs');
var upload = require('../common/fileupload');
var connection = require('../common/mysqlconfig');

// Add a Single Equipment
router.post('/add_equipment', function (req, res) {

    var equipment_data = {
        contract_id: req.body.hidden_contract_id,
        product_id: req.body.ed_product_id,
        description: req.body.ed_description,
        quantity: req.body.ed_quantity || null,
        site_location: req.body.ed_site_loc,
        tr_number: req.body.tc_dr_number,
        tr_date: req.body.tc_dr_date || null,
        tc_begin_date: req.body.tc_begin_date || null,
        tc_end_date: req.body.tc_end_date || null,
        principal: req.body.pc_principal,
        distributor: req.body.pc_distributor,
        trends_po: req.body.pc_trends_po,
        trends_mpo: req.body.pc_trends_mpo,
        contract_number: req.body.pc_contract_number,
        pc_begin_date: req.body.pc_begin_date || null,
        pc_end_date: req.body.pc_end_date || null,
        type_of_service: req.body.pc_type_of_service,
        replacement_sla: req.body.pc_replacement_sla
    }

    connection.query("INSERT INTO equipment_list_item SET ?", [equipment_data], function (err, results) {
        if (err) {
            console.log(err);
        } else {

            var eq_item_serial = {
                equipment_list_item_id: results.insertId,
                serial_number: req.body.ed_serial_number
            }

            connection.query("INSERT INTO equipment_list_serial SET ?", [eq_item_serial], function (err, result) {
                if (err) {
                    console.log(err);
                } else {
                    console.log('Serial inserted');
                    res.json({
                        message: 'Success'
                    });
                }
            });
        }
    });
});

// Get Equipment Details via equipment_id
router.post('/get_equipment', function (req, res) {

    var equipment_id = req.body.equipment_id;

    connection.query("SELECT eql_item.*, eql_item.id as equipment_id, eql_serial.serial_number,\
    date_format(tr_date, '%M %d, %Y') as str_tr_date, \
    date_format(tr_date, '%Y-%m-%d') as sql_tr_date, \
    date_format(tc_begin_date, '%M %d, %Y') as str_tc_begin_date, \
    date_format(tc_begin_date, '%Y-%m-%d') as sql_tc_begin_date, \
    date_format(tc_end_date, '%M %d, %Y') as str_tc_end_date, \
    date_format(tc_end_date, '%Y-%m-%d') as sql_tc_end_date, \
    date_format(pc_begin_date, '%M %d, %Y') as str_pc_begin_date, \
    date_format(pc_begin_date, '%Y-%m-%d') as sql_pc_begin_date, \
    date_format(pc_end_date, '%M %d, %Y') as str_pc_end_date, \
    date_format(pc_end_date, '%Y-%m-%d') as sql_pc_end_date  \
    FROM cms.equipment_list_item as eql_item \
    LEFT JOIN equipment_list_serial as eql_serial ON eql_serial.equipment_list_item_id = eql_item.id \
    WHERE eql_item.id = ?;", [equipment_id], function (err, eqListItems) {
            if (err) {
                console.log(err);
            } else {
                res.json(eqListItems);
            }
        });
});

// Update Equipment via equipment_id
router.post('/update_equipment', function (req, res) {

    var equipment_data = {
        contract_id: req.body.hidden_contract_id,
        product_id: req.body.ed_product_id,
        description: req.body.ed_description,
        quantity: req.body.ed_quantity || null,
        site_location: req.body.ed_site_loc,
        tr_number: req.body.tc_dr_number,
        tr_date: req.body.tc_dr_date || null,
        tc_begin_date: req.body.tc_begin_date || null,
        tc_end_date: req.body.tc_end_date || null,
        principal: req.body.pc_principal,
        distributor: req.body.pc_distributor,
        trends_po: req.body.pc_trends_po,
        trends_mpo: req.body.pc_trends_mpo,
        contract_number: req.body.pc_contract_number,
        pc_begin_date: req.body.pc_begin_date || null,
        pc_end_date: req.body.pc_end_date || null,
        type_of_service: req.body.pc_type_of_service,
        replacement_sla: req.body.pc_replacement_sla
    }

    var equipment_id = req.body.hidden_equipment_id;

    connection.query("UPDATE equipment_list_item SET ? WHERE id = ?", [equipment_data, equipment_id], function (err, results) {
        if (err) {
            console.log(err);
        } else {
            res.json({
                message: 'Updated'
            });
        }
    });
});

// Replace Equipment Serial via equipment_id
router.post('/replace_serial', function (req, res) {

    var eq_item_serial = {
        equipment_list_item_id: req.body.equipment_id,
        serial_number: req.body.serial_number
    }

    connection.query("INSERT INTO equipment_list_serial SET ?", [eq_item_serial], function (err, result) {
        if (err) {
            console.log(err);
        } else {
            console.log('Serial inserted');
            res.json({
                message: 'Replaced'
            })
        }
    });
});

// Load Serial History via equipment id
router.post('/load_serial_history', function (req, res) {
    var equipment_id = req.body.equipment_id;

    connection.query("SELECT eli.id, \
    els.serial_number, \
    date_format(date_added, '%M %d, %Y %h:%i:%s %p') as date_added \
    FROM cms.equipment_list_item as eli \
    LEFT JOIN equipment_list_serial as els ON els.equipment_list_item_id = eli.id \
    WHERE eli.id = ? \
    ORDER BY date_added DESC;", [equipment_id], function (err, result) {
            res.json(result);
        });
});

// Equipment List Upload
router.post('/el_upload', function (req, res) {
    upload(req, res, function (err) {
        if (err) {
            console.log(err);
        } else {

            var log_data = {
                email: req.session.user.email,
                level: 'UPLOAD',
                message: 'Equipment List Upload: ' + ' ' + req.file.originalname
            }

            connection.query("INSERT INTO logs SET ?", [log_data], function (err, result) {
                if (err) {
                    console.log(err);
                }
            });

            var stream = fs.createReadStream(req.file.path);
            csv
                .fromStream(stream, { headers: true })
                .on("data", function (data) {

                    var equip_list_item = {
                        contract_id: req.body.hidden_contract_id,
                        product_id: data.PRODUCT_ID,
                        description: data.DESCRIPTION,
                        quantity: data.QTY,
                        site_location: data.SITE_LOCATION,
                        tr_number: data.DR_NUMBER,
                        tr_date: data.DR_DATE,
                        tc_begin_date: data.TC_BEGIN_DATE,
                        tc_end_date: data.TC_END_DATE,
                        principal: data.PRINCIPAL,
                        distributor: data.DISTRIBUTOR,
                        trends_po: data.TRENDS_PO,
                        trends_mpo: data.TRENDS_MPO,
                        contract_number: data.CONTRACT_NO,
                        pc_begin_date: data.PC_BEGIN_DATE,
                        pc_end_date: data.PC_END_DATE,
                        type_of_service: data.TYPE_OF_SERVICE,
                        replacement_sla: data.REPLACEMENT_SLA
                    }

                    connection.query("INSERT INTO equipment_list_item SET ?", [equip_list_item], function (err, results) {
                        if (err) {
                            console.log(err);
                        } else {
                            var eq_item_serial = {
                                equipment_list_item_id: results.insertId,
                                serial_number: data.SERIAL_NUMBER
                            }

                            connection.query("INSERT INTO equipment_list_serial SET ?", [eq_item_serial], function (err, result) {
                                if (err) {
                                    console.log(err);
                                } else {
                                    console.log('Serial inserted');
                                }
                            });
                        }
                    });
                })

                .on("end", function () {
                    console.log('Parsing Done');
                    res.json({
                        message: 'success'
                    });
                })

                .on("error", function (error) {
                    console.log('Invalid CSV File!');
                });
        }
    });
});

module.exports = router;