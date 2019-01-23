/**
 * Project : NuHeat SOW #146354 44
 * 
 * Description : NuHeat Quote to generate HTML and PDF files
 * 
 * @Author : {__Deepak Bhari__}
 * @Date : {__10/12/2018__}
 * 
 * Copyright (c) 2017 BlueBridge One Business Solutions, All Rights Reserved
 * support@bluebridgeone.com, +44 (0)1932 300007
 * 
 * @NApiVersion 2.x
 * @NScriptType customglplugin
 * @NModuleScope SameAccount
 */

define(['N/record', 'N/search', 'N/log', 'N/url', 'N/https', 'N/file', 'N/render', './bb1_lookup_arrays.js'],
function(record, search, log, url, https, file, render, lookupArrays) {

    return function HPsystemPerformance(theCurrentRecord, transactionID)
    {
        
        var combinedSCoP = theCurrentRecord.getValue({fieldId: 'custbody_hp_annheatingfact_tot'});
        var htgSCoP = theCurrentRecord.getValue({fieldId: 'custbody_heating_scop'});
        var hwtrSCoP = theCurrentRecord.getValue({fieldId: 'custbody_hot_water_scop'});
        var buildingHtReq = theCurrentRecord.getValue({fieldId: 'custbody_hp_building_energy_req'});
        var floorArea = theCurrentRecord.getValue({fieldId: 'custbody_pqc_totalfloor'});
        var heatOutput = theCurrentRecord.getValue({fieldId: 'custbody_hp_energy_delivered'});
        var elecReqd = theCurrentRecord.getValue({fieldId: 'custbody_hp_energy_supplied'});
        var backupElec = theCurrentRecord.getValue({fieldId: 'custbody_hp_supp_energy'});
        //var totalElecConsumed = theCurrentRecord.getValue({fieldId: 'custbody_hp_electricity_consumed'});
        var estPoolLoad = theCurrentRecord.getValue({fieldId: 'custbody_est_pool_load'});
        var freeEnergy = theCurrentRecord.getValue({fieldId: 'custbody_hp_free_energy'});
        var EH1 = theCurrentRecord.getValue({fieldId: 'custbody_eh1'});
        var BVT3 = theCurrentRecord.getValue({fieldId: 'custbody_bvt3'});
        var LD2 = theCurrentRecord.getValue({fieldId: 'custbody_ld2'});
        var hwcTypicalReheat = Math.round(theCurrentRecord.getValue({fieldId: 'custbody_hwc_typ_reheat_time'}));
        var hwcMaxReheat = Math.round(theCurrentRecord.getValue({fieldId: 'custbody_hwc_max_reheat_time'}));
        var hpMCScertNo = theCurrentRecord.getValue({fieldId: 'custbody_hp_mcs_cert_no'});
        var dualHP = theCurrentRecord.getValue({fieldId: 'custbody_dualhp'});
        if (dualHP == 'Y'){
            var combinedSCoP = theCurrentRecord.getValue({fieldId: 'custbody_dualhp_combined_scop'});
            var htgSCoP = theCurrentRecord.getValue({fieldId: 'custbody_dualhp_heating_scop'});
            var hwtrSCoP = theCurrentRecord.getValue({fieldId: 'custbody_dualhp_hot_water_scop'});
            var buildingHtReq = theCurrentRecord.getValue({fieldId: 'custbody_dualhp_building_energy_req'});
            var floorArea = theCurrentRecord.getValue({fieldId: 'custbody_dualhp_floor_area'});
            var heatOutput = theCurrentRecord.getValue({fieldId: 'custbody_dualhp_energy_delivered'});
            var elecReqd = theCurrentRecord.getValue({fieldId: 'custbody_dualhp_energy_supplied'});
            var backupElec = theCurrentRecord.getValue({fieldId: 'custbody_dualhp_supp_energy'});
            var freeEnergy = theCurrentRecord.getValue({fieldId: 'custbody_dualhp_free_energy'});
            var BVT3 = theCurrentRecord.getValue({fieldId: 'custbody_dualhp_bvt3'});
            var LD2 = theCurrentRecord.getValue({fieldId: 'custbody_dualhp_ld2'});
            var hwcTypicalReheat = Math.round(theCurrentRecord.getValue({fieldId: 'custbody_dualhp_typ_reheat_time'}));
            var hwcMaxReheat = Math.round(theCurrentRecord.getValue({fieldId: 'custbody_dualhp_max_reheat_time'}));
            var hpMCScertNo = theCurrentRecord.getValue({fieldId: 'custbody_dualhp_mcs_cert_no'});
            if (!hpMCScertNo){
                hpMCScertNo = '';}
        }
        
        var schematicImage = '';
        var hpSchematic = theCurrentRecord.getValue({fieldId: 'custbody_schematic'});
        if (hpSchematic != '' && hpSchematic != null)
        {
            if (dualHP == 'Y')
            {
                //hpSchematic = hpSchematic + 'DUAL';
                if (lookupArrays.lu_hp_schematic_image[hpSchematic + 'DUAL'] != undefined){
                    schematicImage = lookupArrays.lu_hp_schematic_image[hpSchematic + 'DUAL'];
                }
                else if (lookupArrays.lu_hp_schematic_image[hpSchematic] != undefined){
                    schematicImage = lookupArrays.lu_hp_schematic_image[hpSchematic];
                }
            }
            else if (lookupArrays.lu_hp_schematic_image[hpSchematic] != undefined){
                schematicImage = lookupArrays.lu_hp_schematic_image[hpSchematic];
            }
        }
        
        var quoteType = theCurrentRecord.getValue({fieldId: 'custbody_quote_type'});
        var planningText = '';
        if (quoteType == 9)
        {
            planningText = '<br><br>In order to achieve permitted development status in England and Wales the installation must comply with the MCS020 standard, which requires a noise limit below 42 dB(A). \n'+ 
            'It is the responsibility of the MCS Approved installer to confirm compliance with MCS020. Where this is Nu-Heat you will be contacted by one of our design engineers for information that will enable us to carry out the calculation. \n' +
            '<br><br>A copy of the calculation will be inserted into the Commissioning & Warranty Documents section of Nu-Heat&#39;s MCS Handover Pack as proof of compliance.\n';
        }
        
        
        var startparag;
        if (hpSchematic == 'A15' || hpSchematic == 'A16')
        {
            startparag = 
                '<tr>\n' +
                    '<td colspan="3" align="left" valign="top">Nu-Heat&#39;s heat pump sizing method follows the Microgeneration Certification Scheme&#39;s guideline, MIS3005. \n'+
                    'This requires that where the heat pump cannot cover 100&#37; of the building heat load for 99&#37; of the average year, then any difference must be made up by a conventional boiler.<br><br>\n'+
                    'We calculate that the chosen heat pump will be capable of providing '+EH1+' of the annual energy requirement for heating, supplementary energy covering the remainder. \n'+
                    'This is based on building fabric insulation details supplied to us.<br><br>\n'+
                    'This quotation may be subject to revision at design stage when a more in-depth heat loss calculation and energy simulation will be performed. \n'+
                    'This can occasionally require that a different sized heat pump or ground loop array is required. A change of this nature may require the system to be re-priced.'+ planningText +'</td>\n' +
                '</tr>\n' ;
        }
        else if (hpSchematic == 'A16-S')
        {
            startparag = 
                '<tr>\n' +
                    '<td colspan="3" align="left" valign="top">Nu-Heat&#39;s heat pump sizing method follows the Microgeneration Certification Scheme&#39;s guideline, MIS3005. \n'+
                    'This requires that where the heat pump cannot cover 100&#37; of the building heat load for 99&#37; of the average year, then any difference must be made up by a conventional boiler.<br><br>\n'+
                    'We calculate that the chosen heat pump will be capable of providing '+EH1+' of the annual energy requirement for heating and hot water production, supplementary energy covering the remainder. \n'+
                    'This is based on building fabric insulation details supplied to us.<br><br>\n'+
                    'This quotation may be subject to revision at design stage when a more in-depth heat loss calculation and energy simulation will be performed. \n'+
                    'This can occasionally require that a different sized heat pump or ground loop array is required. A change of this nature may require the system to be re-priced.'+ planningText +'</td>\n' +
                '</tr>\n' ;
        }
        else
        {
            startparag = 
                '<tr>\n' +
                    '<td colspan="3" align="left" valign="top">Nu-Heat&#39;s heat pump sizing method follows the Microgeneration Certification Scheme&#39;s guideline, MIS3005.  \n'+
                    'This is to ensure that the heat pump covers at least 100&#37; of the building heat load for 99&#37; of the average year. For this property, MIS 3005 determines a target outside air temperature of '+BVT3+'&deg;C, \n'+  
                    'where the heat pump must provide all of the space heating without any direct electrical backup. We calculate the building heat load at '+BVT3+'&deg;C outside, and 20&deg;C average inside to be '+LD2+'kW based on building fabric insulation details supplied to us. <br><br>\n'+
                    'This quotation may be subject to revision at design stage when a more in-depth heat loss calculation and energy simulation will be performed. This can occasionally require that a different heat pump (larger or smaller) is required.  \n'+
                    'A change of this nature may require the system to be re-priced.'+ planningText +'</td>\n' +
                '</tr>\n' ;
        }	
        
        
        var rhiPara = ''; 
        var rhi = theCurrentRecord.getValue({fieldId: 'custbody_hp_proposed_system'});
        if (rhi){
            rhiText = rhi.replace('new RHI scheme', '<a href="https://www.ofgem.gov.uk/environmental-programmes/domestic-renewable-heat-incentive-domestic-rhi" target = "_new" >new RHI scheme</a>').replace('<br> Government RHI Scheme<br>', '<br><br>');;
            rhiPara = '<tr>\n' +
            '<td colspan="3" align="left" valign="top"><!--<h3>Proposed System </h3>'+
            '<br>-->'+rhiText+'</td>\n' +
            '</tr>\n' ;}
    
        
        
        var quoteDetails ='<h2 class="row acc_trigger breakhere">\n' + 
                'System Performance\n'
                '</h2>\n' +
                '<div class="acc_container">\n' +
                '<div class="block col-sm">\n'+  
                            
                    '<table width="560" border="0" cellspacing="5" cellpadding="5">\n' + rhiPara + schematicImage + startparag+
                        '<tr>\n' +
                            '<td align="left" valign="top"><span style="color:#337BBD; font-weight:bold;">Heating SCoP: </span></td>\n' +
                            '<td align="center" valign="top" >'+htgSCoP+'</td>\n' +
                            '<td width="280" rowspan="1" align="left" valign="center" >Based on regional weather data in line with MIS 3005</td>\n' +	//CJM May 2016
                        '</tr>\n' +
                        '<tr>\n' +
                            '<td align="left" valign="top"><span style="color:#337BBD; font-weight:bold;">Hot water SCoP:</span></td>\n' +
                            '<td align="center" valign="top" >'+hwtrSCoP+'</td>\n' +
                        '</tr>\n' +
                        '<tr>\n' +
                            '<td align="left" valign="top"><span style="color:#337BBD; font-weight:bold;">Total building heat requirement:</span></td>\n' +
                            '<td align="center" valign="top" >'+buildingHtReq+'</td>\n' +
                            '<td align="left" valign="top" >kWh based on: '+floorArea+' m&sup2;</td>\n' +
                        '</tr>\n' +
                        '<tr>\n' +
                            '<td align="left" valign="top"><span style="color:#337BBD; font-weight:bold;">Heat output by heat pump:</span></td>\n' +
                            '<td align="center" valign="top" >'+heatOutput+'</td>\n' +
                            '<td align="left" valign="top" >kWh for heating and hot water</td>\n' +
                        '</tr>\n' +
                        '<tr>\n' +
                            '<td align="left" valign="top"><span style="color:#337BBD; font-weight:bold;">Electricity required to power heat pump:</span></td>\n' +
                            '<td align="center" valign="top" >'+elecReqd+'</td>\n' +
                            '<td align="left" valign="top" >kWh</td>\n' +
                        '</tr>\n' +
                        '<tr>\n' +
                            '<td align="left" valign="top"><span style="color:#337BBD; font-weight:bold;">Backup electricity:</span></td>\n' +
                            '<td align="center" valign="top">'+backupElec+'</td>\n' +
                            '<td align="left" valign="top" >kWh</td>\n' +
                        '</tr>\n' +
                        '<tr>\n' +
                            '<td align="left" valign="top"><span style="color:#337BBD; font-weight:bold;">Free energy from Heat Pump:</span></td>\n' +
                            '<td align="center" valign="top" >'+freeEnergy+'</td>\n' +
                            '<td align="left" valign="top" >kWh</td>\n' +
                        '</tr>\n';
                        
                    if (estPoolLoad != '' && estPoolLoad != null)	
                    {	quoteDetails +='<tr>\n' +
                            '<td align="left" valign="top"><span style="color:#337BBD; font-weight:bold;">Estimated swimming pool load:</span></td>\n' +
                            '<td align="center" valign="top">'+estPoolLoad+'</td>\n' +
                            '<td align="left" valign="top">kWh</td>\n' +
                        '</tr>\n' ;
                    }
                    quoteDetails +=
                    '<tr>\n' +
                        '<td align="left" valign="top"><span style="color:#337BBD; font-weight:bold;">Hot water cylinder re-heat time:</span></td>\n' +
                        '<td align="center" valign="top" >'+hwcTypicalReheat+'<br>'+hwcMaxReheat+'</td>\n' +
                        '<td align="left" valign="top" >minutes (typical)<br>minutes (max)</td>\n' +
                    '</tr>\n' +
                    '<tr>\n' +
                        '<td width="220" align="left" valign="top"><span style="color:#337BBD; font-weight:bold;">Heat Pump MCS Certificate No.</span></td>\n' +
                        '<td width="380" align="left" valign="top" colspan="2">'+hpMCScertNo+'</td>\n' +
                    '</tr>\n' +
                '</table>\n' +				
                '</div>\n' +
                '</div>\n';
                
        return quoteDetails;
    }
    
});