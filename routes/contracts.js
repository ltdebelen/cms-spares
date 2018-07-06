var express = require('express');
var router = express.Router();
var connection = require('../common/mysqlconfig');

// LOAD All Contracts
router.get('/', function (req, res) {
	if (!req.session.user) {
		res.render('error', {
			layout: false,
			message: '<i class="fa fa-times-circle"></i> Error 401',
			status: 'Unauthorized Access',
			stack: 'Access Denied'
		})
	}

	connection.query("SELECT c.id as contract_id, \
	gi.customer_name, gi.sales_order_number, \
	date_format(cd.contract_start_date, '%M %d, %Y') as contract_start_date, \
	date_format(cd.contract_end_date, '%M %d, %Y') as contract_end_date, \
	cd.status, \
	cd.system \
	FROM cms.contracts as c \
	LEFT JOIN gen_info as gi ON gi.id = c.gen_info_id \
	LEFT JOIN contract_details as cd ON cd.id = c.contract_details_id", function (err, contractList) {
			res.render('contracts', {
				title_bar: 'CMS | Contracts',
				contractList: contractList
			});
		});
});

// CREATE A Contract
router.get('/create', function (req, res) {
	if (!req.session.user) {
		res.render('error', {
			layout: false,
			message: '<i class="fa fa-times-circle"></i> Error 401',
			status: 'Unauthorized Access',
			stack: 'Access Denied'
		})
	}

	connection.query("SELECT * FROM customers", function (err, customerList) {
		connection.query("SELECT am.id, am.first_name, am.last_name, bg.group_name \
		FROM account_managers as am \
		LEFT JOIN business_groups as bg ON am.business_group_id = bg.id", function (err, amList) {
				connection.query("SELECT * FROM account_types", function (err, acctList) {
					connection.query("SELECT * FROM document_types", function (err, docList) {
						connection.query("SELECT * FROM contract_status", function (err, contStatList) {
							connection.query("SELECT * FROM service_types", function (err, serviceTypesList) {
								connection.query("SELECT tg.id as tech_group_id, tg.tech_group_name, \
											tgp.id as tech_group_people_id, tgp.email  \
											FROM cms.tech_group_people as tgp \
											LEFT JOIN tech_groups tg on tg.id = tgp.tech_group_id;", function (err, techGroupList) {
										connection.query("SELECT * FROM pm_frequencies", function (err, pmFreqList) {
											connection.query("SELECT * FROM health_check_frequencies", function (err, hcFreqList) {
												connection.query("SELECT * FROM renewal_updates", function (err, rnewList) {
													connection.query("SELECT * FROM am_updates", function (err, amupList) {
														res.render('create_contract', {
															title_bar: 'CMS | Contracts',
															customerList: customerList,
															amList: amList,
															acctList: acctList,
															docList: docList,
															contStatList: contStatList,
															serviceTypesList: serviceTypesList,
															techGroupList: techGroupList,
															pmFreqList: pmFreqList,
															hcFreqList: hcFreqList,
															rnewList: rnewList,
															amupList: amupList
														});
													});
												});
											});
										});
									});
							});
						});
					});
				});
			});
	});
});

// SUBMIT Contract
router.post('/contract_form_submit', function (req, res) {

	var gen_info_data = {
		customer_name: req.body.gi_customer_name,
		customer_address: req.body.gi_customer_address,
		end_user_name: req.body.gi_end_user_name,
		site_address: req.body.gi_site_address,
		contact_person: req.body.gi_contact_person,
		contact_number: req.body.gi_contact_number,
		email_address: req.body.gi_contact_email_address,
		date_booked: req.body.gi_date_booked || null,
		contract_reference: req.body.gi_contract_reference,
		sales_order_number: req.body.gi_sales_order_number,
		account_manager: req.body.gi_account_manager,
		business_group: req.body.gi_business_group
	}

	var cont_detail_data = {
		acct_type_id: req.body.cd_acct_type_id,
		doc_type_id: req.body.cd_doc_type_id,
		contract_start_date: req.body.cd_start_date || null,
		contract_end_date: req.body.cd_end_date || null,
		system: req.body.cd_system,
		status: req.body.cd_status,
		cd_ps_urgent: req.body.cd_ps_urgent,
		cd_ps_high: req.body.cd_ps_high,
		cd_ps_medium: req.body.cd_ps_medium,
		cd_ps_low: req.body.cd_ps_low,
		cd_ps_af: req.body.cd_ps_af,
		cd_within_mm_urgent: req.body.cd_within_mm_urgent,
		cd_within_mm_high: req.body.cd_within_mm_high,
		cd_within_mm_medium: req.body.cd_within_mm_medium,
		cd_within_mm_low: req.body.cd_within_mm_low,
		cd_within_mm_af: req.body.cd_within_mm_af,
		cd_outside_mm_urgent: req.body.cd_outside_mm_urgent,
		cd_outside_mm_high: req.body.cd_outside_mm_high,
		cd_outside_mm_medium: req.body.cd_outside_mm_medium,
		cd_outside_mm_low: req.body.cd_outside_mm_low,
		cd_outside_mm_af: req.body.cd_outside_mm_af
	}

	var sow_data = {
		service_type_id: req.body.sow_service_type_id,
		pm_frequency_id: req.body.sow_pm_frequency_id || null,
		health_check_id: req.body.sow_health_check_id || null,
		sow_remarks: req.body.sow_remarks
	}

	var rnew_data = {
		renewal_update_id: req.body.rs_renewal_update_id,
		am_update_id: req.body.rs_am_update_id,
		ma_quote_reference: req.body.rs_ma_quote_reference
	}

	var pm_sched_start_arr = req.body.pm_schedule_start || [];
	var pm_sched_end_arr = req.body.pm_schedule_end || [];

	var hc_sched_start_arr = req.body.hc_schedule_start || [];
	var hc_sched_end_arr = req.body.hc_schedule_end || [];

	var tech_group_email_arr = req.body.sow_tech_group_email || [];

	connection.query("INSERT INTO gen_info SET ?", [gen_info_data], function (err, result) {
		if (err) {
			console.log(err);
		} else {
			console.log('[GEN INFO] - Inserted');
			var gen_info_id = result.insertId;

			connection.query('INSERT INTO contract_details SET ?', [cont_detail_data], function (err, result) {
				if (err) {
					console.log(err);
				} else {
					console.log('[CONT DETAIL] - Inserted');
					var contract_detail_id = result.insertId;

					connection.query("INSERT INTO scope_of_work SET ?", [sow_data], function (err, result) {
						if (err) {
							console.log(err)
						} else {
							console.log('[SOW] - Inserted');
							var sow_id = result.insertId;

							for (var count = 0; count < pm_sched_start_arr.length; count++) {

								var pm_sched_data = {
									sow_id: sow_id,
									pm_schedule_start: pm_sched_start_arr[count] || null,
									pm_schedule_end: pm_sched_end_arr[count] || null
								}

								connection.query("INSERT INTO pm_schedules SET ?", pm_sched_data, (err, results) => {
									if (err) {
										console.log(err);
									} else {
										console.log('PM_SCHEDULE INSERTED');
									}
								});
							}

							for (var count = 0; count < hc_sched_start_arr.length; count++) {

								var hc_sched_data = {
									sow_id: sow_id,
									health_check_start: hc_sched_start_arr[count] || null,
									health_check_end: hc_sched_end_arr[count] || null
								}

								connection.query("INSERT INTO health_check_schedules SET ?", hc_sched_data, (err, results) => {
									if (err) {
										console.log(err);
									} else {
										console.log('HC_SCHEDULE INSERTED');
									}
								});
							}

							for (var count = 0; count < tech_group_email_arr.length; count++) {

								var tech_email_data = {
									sow_id: sow_id,
									tech_group_people_id: tech_group_email_arr[count] || null
								}

								connection.query("INSERT INTO tech_group_email SET ?", tech_email_data, (err, results) => {
									if (err) {
										console.log(err);
									} else {
										console.log('Group Email INSERTED');
									}
								});
							}

							connection.query("INSERT INTO contracts_renewal SET ?", [rnew_data], function (err, result) {
								if (err) {
									console.log(err);
								} else {
									console.log('[CONT RENEWAL] - Inserted');
									var contract_renewal_id = result.insertId;

									var ids = {
										gen_info_id: gen_info_id,
										contract_details_id: contract_detail_id,
										scope_of_work_id: sow_id,
										contract_renewal_id: contract_renewal_id,
										remarks: req.body.gc_remarks
									}

									connection.query("INSERT INTO contracts SET ?", [ids], function (err, result) {
										if (err) {
											console.log(err);
										} else {
											console.log('[CONTRACT SAVED]');

											var log_data = {
												email: req.session.user.email,
												level: 'INFO',
												message: 'Contract Created! Contract ID: TTI-000' + result.insertId
											}

											connection.query("INSERT INTO logs SET ?", [log_data], function (err, result) {
												if (err) {
													console.log(err);
												} else {
													res.json({
														status: 'contract_saved'
													});
												}
											});
										}
									});
								}
							});
						}
					});
				}
			});
		}
	});
});

// View a SINGLE contract via ID
router.get('/view/:id', function (req, res) {

	if (!req.session.user) {
		res.render('error', {
			layout: false,
			message: '<i class="fa fa-times-circle"></i> Error 401',
			status: 'Unauthorized Access',
			stack: 'Access Denied'
		})
	}

	var contract_id = req.params.id;

	connection.query('SELECT c.id as contract_id, gi.*, \
					date_format(gi.date_booked, "%M %d, %Y") as str_date_booked \
					FROM cms.contracts as c \
					LEFT JOIN gen_info as gi on gi.id = c.gen_info_id \
					WHERE c.id = ? AND c.gen_info_id = gi.id;', [contract_id], function (err, genInfoVal) {
			connection.query("SELECT c.id as contract_id, \
							cd.*, \
							date_format(cd.contract_start_date, '%M %d, %Y') as str_contract_start, \
							date_format(cd.contract_end_date, '%M %d, %Y') as str_contract_end, \
							acct_type.account_type, \
							doc_type.document_type \
				 			FROM cms.contracts as c \
				 			LEFT JOIN contract_details as cd ON cd.id = c.contract_details_id \
				 			LEFT JOIN account_types as acct_type ON acct_type.id = cd.acct_type_id \
				 			LEFT JOIN document_types as doc_type ON doc_type.id = cd.doc_type_id \
				 			WHERE c.id = ?", [contract_id], function (err, contDetailVal) {
					connection.query("SELECT contracts.id as contract_id, contracts.scope_of_work_id as cont_sow_id, \
								 sow.id as scope_of_work_id, sow.sow_remarks, \
								 service_types.service_type, \
								 pm_frequencies.pm_frequency, \
								 health_check_frequencies.health_check_frequency, \
								 GROUP_CONCAT(tech_group_email.tech_group_people_id SEPARATOR ', ') as tech_group_ids, \
								 GROUP_CONCAT(tech_group_people.email SEPARATOR ', ') as tech_group_emails, \
								 GROUP_CONCAT(tech_groups.tech_group_name SEPARATOR ', ') as tech_groups \
								 FROM cms.scope_of_work as sow \
								 LEFT JOIN service_types ON service_types.id = sow.service_type_id \
								 LEFT JOIN pm_frequencies ON pm_frequencies.id = sow.pm_frequency_id \
								 LEFT JOIN health_check_frequencies ON health_check_frequencies.id = sow.health_check_id \
								 LEFT JOIN tech_group_email ON tech_group_email.sow_id = sow.id \
								 LEFT JOIN tech_group_people ON tech_group_people.id = tech_group_email.tech_group_people_id \
								 LEFT JOIN tech_groups ON tech_groups.id = tech_group_people.tech_group_id \
								 LEFT JOIN contracts ON contracts.scope_of_work_id = sow.id \
								 WHERE contracts.id = ? AND contracts.scope_of_work_id = sow.id;", [contract_id], function (err, sowVal) {
							connection.query("SELECT contracts.id as contract_id, contracts.scope_of_work_id as contract_sow_id, \
									 		pm_schedules.sow_id as pm_schedule_sow_id, date_format(pm_schedules.pm_schedule_start, '%M %d, %Y') as str_pm_sched_start, \
									 		date_format(pm_schedules.pm_schedule_end, '%M %d, %Y') as str_pm_sched_end \
									 		FROM pm_schedules \
									 		LEFT JOIN scope_of_work on scope_of_work.id = pm_schedules.sow_id \
									 		LEFT JOIN contracts on contracts.scope_of_work_id = scope_of_work.id \
									 		WHERE contracts.id = ? AND contracts.scope_of_work_id = scope_of_work.id", [contract_id], function (err, pmSchedVal) {
									connection.query("SELECT contracts.id as contract_id, contracts.scope_of_work_id as contract_sow_id, \
													health_check_schedules.sow_id as health_check_schedule_sow_id, date_format(health_check_start, '%M %d, %Y') as str_hc_start, \
													date_format(health_check_end, '%M %d, %Y') as str_hc_end \
													FROM health_check_schedules \
													LEFT JOIN scope_of_work ON scope_of_work.id = health_check_schedules.sow_id \
													LEFT JOIN contracts on contracts.scope_of_work_id = scope_of_work.id \
													WHERE contracts.id = ? AND contracts.scope_of_work_id = scope_of_work.id; ", [contract_id], function (err, hcSchedVal) {
											connection.query("SELECT contracts.id as contract_id, contracts.contract_renewal_id as contract_cont_rnew_id, \
															contracts_renewal.id as cont_rnew_id, contracts_renewal.ma_quote_reference, \
															renewal_update_type, \
															am_update_type \
															FROM contracts_renewal \
															LEFT JOIN renewal_updates ON renewal_updates.id = contracts_renewal.renewal_update_id \
															LEFT JOIN am_updates ON am_updates.id = contracts_renewal.am_update_id \
															LEFT JOIN contracts ON contracts.contract_renewal_id = contracts_renewal.id \
															WHERE contracts.id = ? AND contracts.contract_renewal_id = contracts_renewal.id;", [contract_id], function (err, contRnewVal) {
													connection.query("SELECT id, remarks \
																FROM contracts \
																WHERE id = ?", [contract_id], function (err, remarksVal) {
															connection.query("SELECT eli.contract_id, \
															eli.id, \
															eli.product_id, \
															els.serial_number, \
															date_format(date_added, '%M %d, %Y %h:%i:%s %p') as date_added \
															FROM cms.equipment_list_item as eli \
															LEFT JOIN equipment_list_serial as els ON els.equipment_list_item_id = eli.id \
															WHERE els.id = (SELECT id FROM equipment_list_serial \
															WHERE equipment_list_item_id = eli.id ORDER BY date_added DESC LIMIT 1) && eli.contract_id = ? \
															GROUP BY eli.id \
															ORDER BY els.id DESC;", [contract_id], function (err, eqListItemVal) {
																	if (err) {
																		console.log(err);
																	} else {
																		res.render('view_contract', {
																			title_bar: 'CMS | Contracts',
																			contract_id: contract_id,
																			genInfoVal: genInfoVal,
																			contDetailVal: contDetailVal,
																			sowVal: sowVal,
																			pmSchedVal: pmSchedVal,
																			hcSchedVal: hcSchedVal,
																			contRnewVal: contRnewVal,
																			remarksVal: remarksVal,
																			eqListItemVal: eqListItemVal
																		});
																	}
																});
														});
												});
										});
								});
						});
				});
		});
});

// Load UPDATE contract Values via ID
router.get('/update/:id', function (req, res) {

	if (!req.session.user) {
		res.render('error', {
			layout: false,
			message: '<i class="fa fa-times-circle"></i> Error 401',
			status: 'Unauthorized Access',
			stack: 'Access Denied'
		})
	}

	var contract_id = req.params.id;

	connection.query("SELECT * FROM customers", function (err, customerList) {
		connection.query("SELECT am.id, am.first_name, am.last_name, bg.group_name \
						FROM account_managers as am \
						LEFT JOIN business_groups as bg ON am.business_group_id = bg.id", function (err, amList) {
				connection.query("SELECT * FROM business_groups", function (err, bgList) {
					connection.query("SELECT * FROM account_types", function (err, acctList) {
						connection.query("SELECT * FROM document_types", function (err, docList) {
							connection.query("SELECT * FROM contract_status", function (err, contStatList) {
								connection.query("SELECT * FROM vendors", function (err, vendorList) {
									connection.query("SELECT * FROM service_types", function (err, serviceTypesList) {
										connection.query("SELECT * FROM pm_frequencies", function (err, pmFreqList) {
											connection.query("SELECT * FROM health_check_frequencies", function (err, hcFreqList) {
												connection.query("SELECT tg.id as tech_group_id, tg.tech_group_name, \
															tgp.id as tech_group_people_id, tgp.email  \
															FROM cms.tech_group_people as tgp \
															LEFT JOIN tech_groups tg on tg.id = tgp.tech_group_id;", function (err, techGroupList) {
														connection.query("SELECT * FROM renewal_updates", function (err, rnewList) {
															connection.query("SELECT * FROM am_updates", function (err, amupList) {
																connection.query("SELECT c.id as contract_id, c.gen_info_id as contract_gen_info_id, \
																			gi.id as gen_info_id, gi.customer_name, gi.customer_address, \
																			gi.end_user_name, gi.site_address, gi.contact_person, gi.contact_number, \
																			gi.email_address, date_format(gi.date_booked, '%Y-%m-%d') as date_booked, gi.contract_reference, gi.sales_order_number, \
																			gi.account_manager, gi.business_group \
												 							FROM contracts as c \
												 							LEFT JOIN gen_info as gi on gi.id = c.gen_info_id \
												 							WHERE c.id = ?;", [contract_id], function (err, genInfoData) {
																		connection.query("SELECT c.id as contract_id, c.contract_details_id as contract_c_detail_id, \
																	cd.acct_type_id, cd.doc_type_id,\
																	date_format(cd.contract_start_date, '%Y-%m-%d') as start_date,\
																	date_format(cd.contract_end_date, '%Y-%m-%d') as end_date, \
																	cd.* \
																	FROM contract_details as cd \
																	LEFT JOIN contracts as c on c.contract_details_id = cd.id \
																	LEFT JOIN account_types on account_types.id = cd.acct_type_id \
																	LEFT JOIN document_types on document_types.id = cd.doc_type_id \
																	WHERE c.id = ?", [contract_id], function (err, cdData) {
																				connection.query("SELECT c.id as contract_id, c.scope_of_work_id as c_sow_id, \
																			sow.id as sow_id, sow.service_type_id, sow.pm_frequency_id, \
																			sow.sow_remarks, sow.health_check_id \
																			FROM cms.scope_of_work as sow \
																			LEFT JOIN contracts as c on c.scope_of_work_id = sow.id \
																			WHERE c.id = ?", [contract_id], function (err, sowData) {
																						connection.query("SELECT GROUP_CONCAT(tech_group_people_id) as tech_group_people_id \
																					FROM cms.contracts as c \
																					LEFT JOIN scope_of_work as sow on sow.id = c.scope_of_work_id \
																					LEFT JOIN tech_group_email as tge on tge.sow_id = sow.id \
																					WHERE c.id = ?", [contract_id], function (err, techGroupData) {
																								connection.query("SELECT pm_sched.id,\
																							date_format(pm_schedule_start, '%Y-%m-%d') as pm_schedule_start, \
																							date_format(pm_schedule_end, '%Y-%m-%d') as pm_schedule_end \
																							FROM cms.contracts as c \
																							LEFT JOIN scope_of_work as sow ON sow.id = c.scope_of_work_id \
																							LEFT JOIN pm_schedules as pm_sched ON pm_sched.sow_id = sow.id \
																							WHERE c.id = ?;", [contract_id], function (err, pmSchedData) {
																										connection.query("SELECT hc_sched.id, \
																									date_format(health_check_start, '%Y-%m-%d') as hc_schedule_start, \
																									date_format(health_check_end, '%Y-%m-%d') as hc_schedule_end \
																									FROM cms.contracts as c \
																									LEFT JOIN scope_of_work as sow ON sow.id = c.scope_of_work_id \
																									LEFT JOIN health_check_schedules as hc_sched ON hc_sched.sow_id = sow.id \
																									WHERE c.id = ?;", [contract_id], function (err, hcSchedData) {
																												connection.query("SELECT cr.id as contract_renewal_id, \
																										cr.renewal_update_id, \
																										cr.am_update_id, \
																										cr.ma_quote_reference \
																										FROM cms.contracts as c \
																										LEFT JOIN contracts_renewal as cr ON cr.id = c.contract_renewal_id \
																										WHERE c.id = ?;", [contract_id], function (err, contRnewData) {
																														connection.query("SELECT * FROM cms.contracts as c \
																													WHERE c.id = ?;", [contract_id], function (err, contractData) {
																																res.render('update_contract', {
																																	title_bar: 'CMS | Contracts',
																																	contract_id: contract_id,
																																	customerList: customerList,
																																	amList: amList,
																																	bgList: bgList,
																																	acctList: acctList,
																																	docList: docList,
																																	contStatList: contStatList,
																																	vendorList: vendorList,
																																	serviceTypesList: serviceTypesList,
																																	pmFreqList: pmFreqList,
																																	hcFreqList: hcFreqList,
																																	techGroupList: techGroupList,
																																	rnewList: rnewList,
																																	amupList: amupList,
																																	genInfoData: genInfoData,
																																	cdData: cdData,
																																	sowData: sowData,
																																	techGroupData: techGroupData,
																																	pmSchedData: pmSchedData,
																																	hcSchedData: hcSchedData,
																																	contRnewData: contRnewData,
																																	contractData: contractData
																																});
																															});
																													});
																											});
																									});
																							});
																					});
																			});
																	});
															});
														});
													});
											});
										});
									});
								});
							});
						});
					});
				});
			});
	});
});

// Submit UPDATED contract
router.post('/contract_form_update', function (req, res) {

	// GEN INFO
	var gen_info_id = req.body.gen_info_id;

	var gen_info_data = {
		customer_name: req.body.gi_customer_name,
		customer_address: req.body.gi_customer_address,
		end_user_name: req.body.gi_end_user_name,
		site_address: req.body.gi_site_address,
		contact_person: req.body.gi_contact_person,
		contact_number: req.body.gi_contact_number,
		email_address: req.body.gi_contact_email_address,
		date_booked: req.body.gi_date_booked || null,
		contract_reference: req.body.gi_contract_reference,
		sales_order_number: req.body.gi_sales_order_number,
		account_manager: req.body.gi_account_manager,
		business_group: req.body.gi_business_group
	}

	connection.query("UPDATE gen_info SET ? WHERE id = ?", [gen_info_data, gen_info_id], function (err, results) {
		if (err) {
			console.log(err);
		} else {
			console.log('GEN INFO Updated');
		}
	});

	// CONTRACT DETAILS
	var cont_detail_id = req.body.cont_detail_id;

	var cont_detail_data = {
		acct_type_id: req.body.cd_acct_type_id,
		doc_type_id: req.body.cd_doc_type_id,
		contract_start_date: req.body.cd_start_date || null,
		contract_end_date: req.body.cd_end_date || null,
		system: req.body.cd_system,
		status: req.body.cd_status,
		cd_ps_urgent: req.body.cd_ps_urgent,
		cd_ps_high: req.body.cd_ps_high,
		cd_ps_medium: req.body.cd_ps_medium,
		cd_ps_low: req.body.cd_ps_low,
		cd_ps_af: req.body.cd_ps_af,
		cd_within_mm_urgent: req.body.cd_within_mm_urgent,
		cd_within_mm_high: req.body.cd_within_mm_high,
		cd_within_mm_medium: req.body.cd_within_mm_medium,
		cd_within_mm_low: req.body.cd_within_mm_low,
		cd_within_mm_af: req.body.cd_within_mm_af,
		cd_outside_mm_urgent: req.body.cd_outside_mm_urgent,
		cd_outside_mm_high: req.body.cd_outside_mm_high,
		cd_outside_mm_medium: req.body.cd_outside_mm_medium,
		cd_outside_mm_low: req.body.cd_outside_mm_low,
		cd_outside_mm_af: req.body.cd_outside_mm_af
	}

	connection.query("UPDATE contract_details SET ?  WHERE id = ?", [cont_detail_data, cont_detail_id], function (err, results) {
		if (err) {
			console.log(err);
		} else {
			console.log('CONTRACT DETAILS Updated');
		}
	});

	// SCOPE OF WORK
	var sow_id = req.body.sow_id;

	var sow_data = {
		service_type_id: req.body.sow_service_type_id,
		pm_frequency_id: req.body.sow_pm_frequency_id || null,
		health_check_id: req.body.sow_health_check_id || null,
		sow_remarks: req.body.sow_remarks
	}

	connection.query("UPDATE scope_of_work SET ? WHERE id = ?", [sow_data, sow_id], function (err, results) {
		if (err) {
			console.log(err);
		} else {
			console.log('SOW UPDATED');
			var pm_sched_start_arr = req.body.pm_schedule_start || [];
			var pm_sched_end_arr = req.body.pm_schedule_end || [];
			var pm_row_ids_arr = req.body.pm_row_ids || [];


			for (var count = 0; count < pm_sched_start_arr.length; count++) {

				var pm_sched_data = {
					sow_id: sow_id,
					pm_schedule_start: pm_sched_start_arr[count] || null,
					pm_schedule_end: pm_sched_end_arr[count] || null
				}

				connection.query("UPDATE pm_schedules SET ? WHERE id = ?", [pm_sched_data, pm_row_ids_arr[count]], (err, results) => {
					if (err) {
						console.log(err);
					} else {
						console.log('PM_SCHEDULE Updated');
					}
				});
			}

			var hc_sched_start_arr = req.body.hc_schedule_start || [];
			var hc_sched_end_arr = req.body.hc_schedule_end || [];
			var hc_row_ids_arr = req.body.hc_row_ids || [];


			for (var count = 0; count < hc_sched_start_arr.length; count++) {

				var hc_sched_data = {
					sow_id: sow_id,
					health_check_start: hc_sched_start_arr[count] || null,
					health_check_end: hc_sched_end_arr[count] || null
				}

				connection.query("UPDATE health_check_schedules SET ? WHERE id = ?", [hc_sched_data, hc_row_ids_arr[count]], (err, results) => {
					if (err) {
						console.log(err);
					} else {
						console.log('HC_SCHEDULE Updated');
					}
				});
			}

			var tech_group_email_arr = req.body.sow_tech_group_email || [];

			connection.query("DELETE FROM tech_group_email WHERE sow_id = ?", [sow_id], function (err, results) {
				if (err) {
					console.log(err);
				} else {
					for (var count = 0; count < tech_group_email_arr.length; count++) {
						var tech_email_data = {
							sow_id: sow_id,
							tech_group_people_id: tech_group_email_arr[count] || null
						}
						connection.query("INSERT INTO tech_group_email SET ?", tech_email_data, (err, results) => {
							if (err) {
								console.log(err);
							} else {
								console.log('Group_Email INSERTED');
							}
						});
					}
				}
			});
		}
	});

	// CONTRACT RENEWAL
	var cont_rnew_id = req.body.rs_id;

	var rnew_data = {
		renewal_update_id: req.body.rs_renewal_update_id,
		am_update_id: req.body.rs_am_update_id,
		ma_quote_reference: req.body.rs_ma_quote_reference
	}

	connection.query("UPDATE contracts_renewal SET ? WHERE id=?", [rnew_data, cont_rnew_id], function (err, results) {
		if (err) {
			console.log(err);
		} else {
			console.log('CONT RNEWAL Updated');
		}
	});

	// CONTRACTS
	var contract_id = req.body.gc_contract_id

	var contract_data = {
		remarks: req.body.gc_remarks
	}

	connection.query("UPDATE contracts SET ? WHERE id = ?", [contract_data, contract_id], function (err, results) {
		if (err) {
			console.log(err);
		} else {
			console.log('Contract Updated!');

			var log_data = {
				email: req.session.user.email,
				level: 'UPDATED',
				message: 'Contract Updated! Contract ID: TTI-000' + contract_id
			}

			connection.query("INSERT INTO logs SET ?", [log_data], function (err, result) {
				if (err) {
					console.log(err);
				} else {
					res.json({
						status: 'contract_updated'
					});
				}
			});
		}
	});

});

module.exports = router;
