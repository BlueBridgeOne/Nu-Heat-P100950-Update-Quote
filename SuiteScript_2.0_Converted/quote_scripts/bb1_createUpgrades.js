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

    return function createUpgrades(theCurrentRecord, quotationID,type)
    {
        log.debug('DEBUG', 'custbody_upgrades_itemid: ' + theCurrentRecord.getValue({fieldId: 'custbody_upgrades_itemid'}) );
        var itemID = theCurrentRecord.getValue({fieldId: 'custbody_upgrades_itemid'});
        log.debug('DEBUG', 'itemID: ' + itemID);
        
        if (itemID != null && itemID != '')
        {
            log.debug('DEBUG', 'Create Upgrades Start');
            
            var itemIDArray = itemID.split('*');  
            var itemNameArray = theCurrentRecord.getValue({fieldId: 'custbody_upgrades_itemname'}).split('*');
            var itemDescArray = theCurrentRecord.getValue({fieldId: 'custbody_upgrades_itemdesc'}).split('*');
            var itemQtyArray = theCurrentRecord.getValue({fieldId: 'custbody_upgrades_itemqty'}).split('*');
            var discPriceArray = theCurrentRecord.getValue({fieldId: 'custbody_upgrades_discountedprice'}).split('*');
            var itemTypeArray = theCurrentRecord.getValue({fieldId: 'custbody_upgrades_itemtype'}).split('*');
            var optionTypeArray = theCurrentRecord.getValue({fieldId: 'custbody_upgrades_optiontype'}).split('*');					
            if (type == 'Underfloor Heating')
            {	
                var itemPriceArray = theCurrentRecord.getValue({fieldId: 'custbody_upgrades_itemprice'}).split('*');
                var itemCostArray = theCurrentRecord.getValue({fieldId: 'custbody_upgrades_itemcost'}).split('*');
                var ancAreaArray = theCurrentRecord.getValue({fieldId: 'custbody_upgrades_ancillaryarea'}).split('*');	
            }
            var numberOfUpgrades = itemIDArray.length;
            for (var i=0; i <  numberOfUpgrades; i++)
            {
                var itemID = RTrim(itemIDArray.slice(i-1,i));
                var itemName = itemNameArray.slice(i-1,i);
                var itemDesc = tildeTrim(RTrim(itemDescArray.slice(i-1,i)));
                var itemQty = RTrim(itemQtyArray.slice(i-1,i));
                var discPrice = RTrim(discPriceArray.slice(i-1,i));
                var itemType = itemTypeArray.slice(i-1,i);
                var optionType = optionTypeArray.slice(i-1,i);
            
                if (type == 'Underfloor Heating')
                {
                    var itemPrice = RTrim(itemPriceArray.slice(i-1,i));
                    var itemCost = RTrim(itemCostArray.slice(i-1,i));
                    var ancArea = RTrim(ancAreaArray.slice(i-1,i));
                }
                            
                var upgradesRecord = theCurrentRecord.create({type: 'customrecord_upgrades_and_extras'});
                upgradesRecord.setValue('custrecord_ex_itemid', itemID);
                upgradesRecord.setValue('custrecord_ex_item_name', itemName);
                upgradesRecord.setValue('custrecord_ex_quote_number', quotationID);
                upgradesRecord.setValue('custrecord_ex_item_descr', itemDesc);
                upgradesRecord.setValue('custrecord_ex_quantity', itemQty);
                upgradesRecord.setValue('custrecord_ex_discount_price', discPrice);
                upgradesRecord.setValue('custrecord_upgrade_item_type', itemType);
                upgradesRecord.setValue('custrecord_upgrade_option_type', optionType);
                
                if (type == 'Underfloor Heating')
                {
                    upgradesRecord.setValue('custrecord_ex_item_price', itemPrice);
                    upgradesRecord.setValue('custrecord_ex_item_cost', itemCost);
                    if(ancArea!= '0'){
                        upgradesRecord.setValue('custrecord_ancillary_area', ancArea);
                    }
                }
                upgradesRecord.save({enableSourcing: true, ignoreMandatoryFields: true});
            }
        }
    }

    function RTrim(str)
    { 
        var whitespace = new String(" \t\n\r");
        var s = new String(str);
        if (whitespace.indexOf(s.charAt(s.length-1)) != -1) // We have a string with trailing blank(s)...
        { 
            var i = s.length - 1; // Get length of string 
            while (i >= 0 && whitespace.indexOf(s.charAt(i)) != -1)// Iterate from the far right of string until we don't have any more whitespace...
            i--; 
            s = s.substring(0, i+1);// Get the substring from the front of the string to where the last non-whitespace character is...
        }
        return s;
    }

    function tildeTrim(str)
    { 
        var tilde = new String("~");
        var s = new String(str);
        if (tilde.indexOf(s.charAt(s.length-1)) != -1) 
        { 
            var i = s.length - 1; 
            while (i >= 0 && tilde.indexOf(s.charAt(i)) != -1)
            i--; 
            s = s.substring(0, i+1);
        }
        return s;
    }
    
});