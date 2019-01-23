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

define(['N/record', 'N/search', 'N/log', 'N/url', 'N/https', 'N/file', 'N/render'],
function(record, search, log, url, https, file, render) {

    return function loProCalc(theCurrentRecord, type,name)
    {
        if (name == 'custbody_lpxps10_area'){
            var upgradeCount = theCurrentRecord.getLineCount({sublistId: 'recmachcustrecord_ex_quote_number'});

            for (var i=0; i <  upgradeCount; i++)
            {
                var upgradeName = theCurrentRecord.getSublistValue({sublistId: 'recmachcustrecord_ex_quote_number',fieldId: 'custrecord_ex_item_name',line: i});
                if (upgradeName == 'LPXPS10-C'){
                    var unitPrice = theCurrentRecord.getSublistValue({sublistId: 'recmachcustrecord_ex_quote_number',fieldId: 'custrecord_ex_discount_price',line: i});
                    var itemDesc = theCurrentRecord.getSublistValue({sublistId: 'recmachcustrecord_ex_quote_number',fieldId: 'custrecord_ex_item_descr',line: i});
                    var itemArea = theCurrentRecord.getValue({fieldId: 'custbody_lpxps10_area'});
                    var itemPrice = Math.ceil(itemArea/0.72)*unitPrice;
                    //alert('LPXPS10-C area = '+itemArea+', price per unit = '+unitPrice+', number of units = '+Math.ceil(itemArea/0.72)+', upgrade price ='+itemPrice);
                    theCurrentRecord.setValue({fieldId: 'custbodylpxps10_price',value: itemPrice});
                    theCurrentRecord.setValue({fieldId: 'custbody_lpxps10_desc',value: itemDesc});
                }
            }
        }	
        if (name == 'custbody_lppe515_area'){
            var upgradeCount = theCurrentRecord.getLineCount({sublistId: 'recmachcustrecord_ex_quote_number'});
            for (var i=0; i <  upgradeCount; i++)
            {
                var upgradeName = theCurrentRecord.getSublistValue({sublistId: 'recmachcustrecord_ex_quote_number',fieldId: 'custrecord_ex_item_name',line: i});
                if (upgradeName == 'LPPE5/15-C'){
                    var unitPrice = theCurrentRecord.getSublistValue({sublistId: 'recmachcustrecord_ex_quote_number',fieldId: 'custrecord_ex_discount_price',line: i});
                    var itemDesc = theCurrentRecord.getSublistValue({sublistId: 'recmachcustrecord_ex_quote_number',fieldId: 'custrecord_ex_item_descr',line: i});
                    var itemArea = theCurrentRecord.getValue({fieldId: 'custbody_lppe515_area'});
                    var itemPrice = Math.ceil(itemArea/15)*unitPrice;
                    //alert('LPPE5/15-C area = '+itemArea+', price per unit = '+unitPrice+', number of units = '+Math.ceil(itemArea/15)+', upgrade price ='+itemPrice);
                    theCurrentRecord.setValue({fieldId: 'custbody_lppe515_price',value: itemPrice});
                    theCurrentRecord.setValue({fieldId: 'custbody_lppe515_desc',value: itemDesc});
                }
            }
        }
        if (name == 'custbody_lppg5_area'){
            var upgradeCount = theCurrentRecord.getLineCount({sublistId: 'recmachcustrecord_ex_quote_number'});
            for (var i=0; i <  upgradeCount; i++)
            {
                var upgradeName = theCurrentRecord.getSublistValue({sublistId: 'recmachcustrecord_ex_quote_number',fieldId: 'custrecord_ex_item_name',line: i});
                if (upgradeName == 'LPPG/5-C'){
                    var unitPrice = theCurrentRecord.getSublistValue({sublistId: 'recmachcustrecord_ex_quote_number',fieldId: 'custrecord_ex_discount_price',line: i});
                    var itemDesc = theCurrentRecord.getSublistValue({sublistId: 'recmachcustrecord_ex_quote_number',fieldId: 'custrecord_ex_item_descr',line: i});
                    var itemArea = theCurrentRecord.getValue({fieldId: 'custbody_lppg5_area'});
                    var itemPrice = Math.ceil(itemArea/20)*unitPrice;
                    //alert('LPPG/5-C area = '+itemArea+', price per unit = '+unitPrice+', number of units = '+Math.ceil(itemArea/20)+', upgrade price ='+itemPrice);
                    theCurrentRecord.setValue({fieldId: 'custbody_lppg5_price',value: itemPrice});
                    theCurrentRecord.setValue({fieldId: 'custbody_lppg5_desc',value: itemDesc});
                }
            }
        }
        if (name == 'custbody_lpcb9_area'){
            var upgradeCount = theCurrentRecord.getLineCount({sublistId: 'recmachcustrecord_ex_quote_number'});
            for (var i=0; i <  upgradeCount; i++)
            {
                var upgradeName = theCurrentRecord.getSublistValue({sublistId: 'recmachcustrecord_ex_quote_number',fieldId: 'custrecord_ex_item_name',line: i});
                if (upgradeName == 'LPCB/9-C'){
                    var unitPrice = theCurrentRecord.getSublistValue({sublistId: 'recmachcustrecord_ex_quote_number',fieldId: 'custrecord_ex_discount_price',line: i});
                    var itemDesc = theCurrentRecord.getSublistValue({sublistId: 'recmachcustrecord_ex_quote_number',fieldId: 'custrecord_ex_item_descr',line: i});
                    var itemArea = theCurrentRecord.getValue({fieldId: 'custbody_lpcb9_area'});
                    var itemPrice = Math.ceil(itemArea/0.5)*unitPrice;
                    //alert('LPCB/9-C area = '+itemArea+', price per unit = '+unitPrice+', number of units = '+Math.ceil(itemArea/0.5)+', upgrade price ='+itemPrice);
                    theCurrentRecord.setValue({fieldId: 'custbody_lpcb9_price',value: itemPrice});
                    theCurrentRecord.setValue({fieldId: 'custbody_lpcb9_desc',value: itemDesc});
                }
            }
        }	
    }
    
});