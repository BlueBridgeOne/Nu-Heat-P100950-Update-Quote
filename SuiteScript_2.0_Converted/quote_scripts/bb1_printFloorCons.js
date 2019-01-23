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

    return function printFloorCons(theCurrentRecord, tranID)
    {
        var floorConstPrint = "";
        var floorConstructions = new Array();
        var floorArea = new Array();
        var roomCount = theCurrentRecord.getLineCount({sublistId: 'recmachcustrecord_cad_rooms_quote'});
        for (var i=0; i <  roomCount; i++)
        {
            var floorConst = theCurrentRecord.getSublistText({sublistId: 'recmachcustrecord_cad_rooms_quote', fieldId: 'custrecord_cad_floor_construction', line: i});
            var floorSQM = theCurrentRecord.getSublistValue({sublistId: 'recmachcustrecord_cad_rooms_quote',fieldId: 'custrecord_cad_room_area',line: i});
            if (floorSQM != null && floorSQM != '')
            {
                var a = floorConstructions.indexOf(floorConst);
                if (a == -1)
                {
                    floorConstructions.push(floorConst);
                    floorArea.push(floorSQM);
                }
                else
                {
                    var floorSQMa = floorArea.slice(a,a+1);
                    var newFloorSQM = Number(floorSQMa) + Number(floorSQM);
                    floorArea.splice(a, 1, newFloorSQM);
                }
            }
        }   
        for (var j=0; j < 10; j++)
        {
            var floorConstruct = floorConstructions.slice(j-1,j);
            var floorMeters = oneDP(floorArea.slice(j-1,j));
            if (floorMeters == 0)
                floorMeters = "";
            var floorConstructDesc = lookupArrays.lu_floor_cons_desc[floorConstruct];
            if (floorConstructDesc == undefined)
                floorConstructDesc = "";
            
            floorConstPrint +=
            '<input name="floorcode'+j+'" type="hidden" id="floorcode'+j+'" value="'+floorConstruct+'"  /> \n' +
            '<input name="floorarea'+j+'" type="hidden" id="floorarea'+j+'" value="'+floorMeters+'"  /> \n' +
            '<input name="floordesc'+j+'" type="hidden" id="floordesc'+j+'" value="'+floorConstructDesc.replace("&reg;","%99")+'"  /> \n';
        }
        return floorConstPrint;
    }

    function oneDP(number)
    {
        return Math.round(number*10)/10;
    }
    
});