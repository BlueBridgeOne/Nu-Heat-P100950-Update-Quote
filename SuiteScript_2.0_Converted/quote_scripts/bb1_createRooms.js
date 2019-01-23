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

    return function createRooms(theCurrentRecord, quotationID)
    {
        log.debug('DEBUG', 'custbody rooms list: ' + theCurrentRecord.getValue({fieldId: 'custbody_rooms_list'}) );
        var roomNames = theCurrentRecord.getValue({fieldId: 'custbody_rooms_list'});
        log.debug('DEBUG', 'roomNames: ' + roomNames);
        
        if (roomNames != null && roomNames != '')
        { 
            log.debug('DEBUG', 'Create Rooms Start');
            
            var roomsArray = roomNames.split('*');  
            var roomStatsArray = theCurrentRecord.getValue({fieldId: 'custbody_thermostat_list'}).split('*');
            var roomLevelArray = theCurrentRecord.getValue({fieldId: 'custbody_level_list'}).split('*');
            var roomAreaArray = theCurrentRecord.getValue({fieldId: 'custbody_sq_metres_list'}).split('*');
            var roomFCArray = theCurrentRecord.getValue({fieldId: 'custbody_floor_cons_list'}).split('*');
            
            var manifoldNumberArray = theCurrentRecord.getValue({fieldId: 'custbody_manifold_number_list'}).split('*');
            var designTempArray = theCurrentRecord.getValue({fieldId: 'custbody_design_temp_list'}).split('*');
            var manifoldLocArray = theCurrentRecord.getValue({fieldId: 'custbody_manifold_loc_list'}).split('*');
            
            var numberOfRooms = roomsArray.length;
            for (var i=0; i <  numberOfRooms; i++)
            {
                var roomNumber = i;
                var roomName = tildeTrim(RTrim(roomsArray.slice(i-1,i)));
                var roomStat = RTrim(roomStatsArray.slice(i-1,i));
                var roomLevel = roomLevelArray.slice(i-1,i);
                var roomArea = roomAreaArray.slice(i-1,i);
                if (isNaN(roomArea) == true)
                    roomArea = '';
                var roomFC = RTrim(roomFCArray.slice(i-1,i));
                var manifoldNumber = RTrim(manifoldNumberArray.slice(i-1,i));
                if (isNaN(manifoldNumber) == true)
                    manifoldNumber = '';
                var designTemp = RTrim(designTempArray.slice(i-1,i));
                if (isNaN(designTemp) == true)
                    designTemp = '';
                var manifoldLoc = manifoldLocArray.slice(i-1,i);
                
                log.debug('DEBUG', 'Room '+roomNumber+', '+roomName+'.','Detail:'+roomStat+','+roomLevel+','+roomArea+','+roomFC+'.');
                
                var roomsRecord = theCurrentRecord.create({type: 'customrecord_cad_rooms_list'});
                roomsRecord.setValue('name', roomName);
                roomsRecord.setValue('custrecord_cad_rooms_quote', quotationID);
                roomsRecord.setValue('custrecord_cad_room_number', roomNumber);
                roomsRecord.setFieldText('custrecord_cad_rooms_stats', roomStat);
                roomsRecord.setValue('custrecord_cad_floor_level', roomLevel);
                roomsRecord.setValue('custrecord_cad_room_area', roomArea);
                roomsRecord.setFieldText('custrecord_cad_floor_construction', roomFC);
                roomsRecord.setValue('custrecord_cad_manifold_no', manifoldNumber);
                roomsRecord.setValue('custrecord_cad_design_temp', designTemp);
                roomsRecord.setValue('custrecord_cad_manifold_locations', manifoldLoc);
                roomsRecord.save({enableSourcing: true, ignoreMandatoryFields: true});
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