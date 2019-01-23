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

    return function floorConCheck(theCurrentRecord, transaction, test)
    {
        var floorConstructions = new Array();
        var floorConstructType = new Array();
        var floorConsType;
        var roomCount = theCurrentRecord.getLineCount({sublistId: 'recmachcustrecord_cad_rooms_quote'});
        for (var i=0; i < roomCount; i++)
        {
            var floorConst = theCurrentRecord.getSublistText({sublistId: 'recmachcustrecord_cad_rooms_quote', fieldId: 'custrecord_cad_floor_construction', line: i});
            var a = floorConstructions.indexOf(floorConst);
            if (a == -1)
            {
                floorConstructions.push(floorConst);
                    floorConsType = lookupArrays.lu_floor_cons_type[floorConst];
                var b = floorConstructType.indexOf(floorConsType);
                if (b == -1 && floorConsType != '')
                {
                    floorConstructType.push(floorConsType);
                }
            }
        } 	
        return floorConstructType.indexOf(test);
    }
    
});