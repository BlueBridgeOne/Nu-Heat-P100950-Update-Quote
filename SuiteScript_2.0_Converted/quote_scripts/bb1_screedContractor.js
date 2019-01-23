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

    return function screedContractor(theCurrentRecord, transactionID)
    {
        var screedContract = '';
        var loPro = 'F';
        var loProMax = 'F';
        var otherFloorCon = 'F';
        var transRecord = record.load({type: 'estimate', id: transactionID});
    
        var floorConstructions = transRecord.getValue({fieldId: 'custbody_floor_cons_list'});
        if (floorConstructions != null && floorConstructions != '') {
            var floorConstructionsArray = floorConstructions.split('*'); 
            var numberOfFCs = floorConstructionsArray.length;
            for (var i=0; i <  numberOfFCs; i++){
                var floorCons = floorConstructionsArray.slice(i-1,i);
                if (lookupArrays.lu_floor_cons_type[floorCons] == 'LoProMax Floors'){
                    loProMax = 'T';
                    break;
                }
            }
        }
    
        
        if (loProMax == 'T')
        {
            screedContract = '<h2 class="row acc_trigger breakhere"><a href="#22" onclick="ga(\'send\', \'event\', \'quote\', \'Click\', \'screeding-contractors\');"><div class="P-Header">Screeding Contractors Information</div></a></h2>\n' +
            '<div class="acc_container">\n' +
                '<div class="block col-sm"><p style="PADDING-LEFT: 8px">For the names and details of the contractors who are able to provide a fixed price quotation for the installation of LoPro&reg;Max QuickSet self-levelling compound please contact your Account Manager.</p>\n' +
            '</div></div>\n' ;
        }
        return screedContract;
    }
    
});