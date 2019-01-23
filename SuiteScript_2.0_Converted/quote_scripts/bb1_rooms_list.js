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
    
    return function roomsList(theCurrentRecord, tranID)
    {
        var transRecord = record.load({type: 'estimate', id: tranID}); //Deepak Dec2018

        log.debug('DEBUG', 'roomsList - transRecord : ' + transRecord); //Deepak Dec2018

        var manifoldRooms = transRecord.getValue({fieldId: 'custbody_manifold_rooms'});
        var manifoldPorts = transRecord.getValue({fieldId: 'custbody_manifold_ports'});	
        var portsExist = 'F';
        
        if (manifoldPorts != null && manifoldPorts != '')
            {
            portsExist = 'T';
            }
        
        var roomsList = '<h2 class="row acc_trigger breakhere"><a href="#2" onclick="ga(\'send\', \'event\', \'quote\', \'Click\', \'rooms\');"><div class="P-Header">Rooms </div></a></h2>\n' + //and Manifolds
                '<div class="acc_container">\n' +
                '<div class="block col-sm">\n'+  			
                '<h3>Manifolds</h3> \n' +
                '<table width="539" border="0" cellspacing="1" cellpadding="3" > \n' +
                    '<tr style="color:#FFF;"> \n' +
                        '<td valign="top" bgcolor="#666666"><strong>No.</strong></td> \n' +
                        '<td bgcolor="#666666" ><strong>Location</strong></td>\n';
                        if (portsExist == 'T')	//CJM Jan2017 Check whether Ports information exists
                            {
                            roomsList += '<td bgcolor="#666666" ><strong>Ports</strong></td> \n';	//cjmOct2016
                            }
                        roomsList += '</tr>'  ;
            //var row = 0;		
            /*
            if (manifoldRooms != null && manifoldRooms != '')
            {
                var manifoldRoomsArray = manifoldRooms.split(',');
                
                if (portsExist)	//CJM Jan2017 Check whether Ports information exists
                    {
                    var manifoldPortsArray = manifoldPorts.split(',');	//cjmOct2016
                    }
                
                //var manifoldPortsArray = "";	//cjmOct2016
                var numberOfManifolds = manifoldRoomsArray.length;
                for (var p=0; p < numberOfManifolds; p++)
                {
                    var roomName = manifoldRoomsArray.slice(p-1,p);
                    if (portsExist)
                    {
                        var numPorts = manifoldPortsArray.slice(p-1,p);	//cjmOct2016
                    }
                    
                    var manifoldNo = p;
                    
                    var rowbgColour = "";
                    if (isEven(p) == true)
                    {
                        rowbgColour = 'bgcolor="#FFFFFF"';
                    }
                    roomsList = roomsList +			
                    '<tr>' +
                        '<td valign="top" '+rowbgColour+'>'+manifoldNo+'</td>' +
                        '<td valign="top" '+rowbgColour+'>'+roomName+'</td>';
                        if (portsExist)	//CJM Jan2017 Check whether Ports information exists
                        {
                            roomsList += '<td valign="top" '+rowbgColour+'>'+numPorts+'</td>'; //cjmOct2016
                        }
                    roomsList += '</tr>' ;
                }
            }
            */
            
            var manifoldRooms = transRecord.getValue({fieldId: 'custbody_manifold_rooms'});
            var manifoldPorts = transRecord.getValue({fieldId: 'custbody_manifold_ports'});	
            
            
            //CJM Jan2017  starts.........
            //To deal with the Number of Ports missing from the quote
            
            var portsExist = 'F';
            
            if (manifoldRooms != null && manifoldRooms != '')
            {
                if (manifoldPorts != null && manifoldPorts != '')
                { 	
                    portsExist = 'T';
                }
                
                var manifoldRoomsArray = manifoldRooms.split(',');
                
                log.debug('DEBUG', 'CJM Jan2017 - portsExist='+portsExist); 
                
                if (portsExist == 'T')
                {
                    var manifoldPortsArray = manifoldPorts.split(',');	//cjmOct2016
                }
                
                var numberOfManifolds = manifoldRoomsArray.length;
                for (var p=0; p < numberOfManifolds; p++)
                {
                    var roomName = manifoldRoomsArray.slice(p-1,p);
                    var manifoldNo = p;
                    var rowbgColour = "";
                    
                    if (isEven(p) == true)
                    {
                        rowbgColour = 'bgcolor="#FFFFFF"';
                    }
                    if (portsExist == 'T')
                    {
                        var numPorts = manifoldPortsArray.slice(p-1,p);	//cjmOct2016
                        roomsList = roomsList +			
                        '<tr>' +
                            '<td valign="top" '+rowbgColour+'>'+manifoldNo+'</td>' +
                            '<td valign="top" '+rowbgColour+'>'+roomName+'</td>' +
                            '<td valign="top" '+rowbgColour+'>'+numPorts+'</td>' +	//cjmOct2016
                        '</tr>' ;
                    }
                    else
                    {
                        roomsList = roomsList +			
                        '<tr>' +
                            '<td valign="top" '+rowbgColour+'>'+manifoldNo+'</td>' +
                            '<td valign="top" '+rowbgColour+'>'+roomName+'</td>' +
                        '</tr>' ;
                    }
                }
            }
    
                        
                        //CJM Jan2017 ends........
                
                        
            roomsList = roomsList +
                        '<tr>\n' +
                        '<td valign="top">&nbsp;</td>\n' +
                        '<td align="left" valign="top" >&nbsp;</td>\n' +
                        '<td colspan="1" valign="top" >&nbsp;</td>\n' +
                    '</tr>\n' +
                '</table>\n' +
            '<h3>Rooms</h3>\n' +
                '<table width="539" border="0" cellspacing="1" cellpadding="4" >\n' +
                '<tr style="color:#FFF;">\n' +
                  '<td valign="top" bgcolor="#666666"><strong>Room</strong></td>\n' +
                  '<td valign="top" bgcolor="#666666"><strong>Floor Construction</strong></td>\n' +
                  '<td valign="top" bgcolor="#666666"><strong>Design Temp &deg;C</strong></td>\n' +
                  '<td valign="top" bgcolor="#666666" ><strong>Thermostat</strong></td>\n' +	//cjmOct2016
                  '<td valign="top" bgcolor="#666666" ><strong>Floor</strong></td>\n' +	//cjmOct2016
                  '<td valign="top" bgcolor="#666666" ><strong>Manifold</strong></td>\n' +	//cjmNov2017 Case:SUP351244
                  //'<td colspan="2" valign="top" bgcolor="#666666" ><strong>Thermostat</strong></td>\n' +
                '</tr>\n';
            
        var roomCount = transRecord.getLineCount('recmachcustrecord_cad_rooms_quote');
        for (var i=0; i < roomCount; i++)
        {


            var roomName = transRecord.getSublistValue({sublistId: 'recmachcustrecord_cad_rooms_quote',fieldId: 'name',line: i});
            var floorCons = transRecord.getSublistText({sublistId: 'recmachcustrecord_cad_rooms_quote', fieldId: 'custrecord_cad_floor_construction', line: i});
            var designTemp = transRecord.getSublistValue({sublistId: 'recmachcustrecord_cad_rooms_quote',fieldId: 'custrecord_cad_design_temp',line: i});
            var thermostat = transRecord.getSublistText({sublistId: 'recmachcustrecord_cad_rooms_quote', fieldId: 'custrecord_cad_rooms_stats', line: i});
            var floorLevel = transRecord.getSublistValue({sublistId: 'recmachcustrecord_cad_rooms_quote',fieldId: 'custrecord_cad_floor_level',line: i}); //deepak 2018
            var manifoldNum = transRecord.getSublistValue({sublistId: 'recmachcustrecord_cad_rooms_quote',fieldId: 'custrecord_cad_manifold_no',line: i}); //deepak 2018
    
            
            var rowbgColour = "";
            if (isEven(i) == true)
            {
                rowbgColour = 'bgcolor="#FFFFFF"';
            }
            roomsList = roomsList +
                    '<tr style="border-top:#F0F0F0;">\n' +
                        '<td align="left" valign="top" '+rowbgColour+'>'+roomName+'</td>\n' +
                        '<td align="left" valign="top" '+rowbgColour+'>'+handleUndefined(lookupArrays.lu_floor_cons_desc[floorCons])+'</td>\n' +
                        '<td align="center" valign="top" '+rowbgColour+'>'+designTemp+'</td>\n' +
                        '<td align="center" valign="top" '+rowbgColour+'>'+thermostat+'</td>\n' +
                        '<td align="center" valign="top" '+rowbgColour+'>'+floorLevel+'</td>\n' +	//cjmOct2016
                        '<td align="center" valign="top" '+rowbgColour+'>'+manifoldNum+'</td>\n' +	//cjmNov2017 Case:SUP351244
                    '</tr>\n';
        }	    
            roomsList = roomsList + '</table>\n' +
                    
                '</div>\n' +
                '</div>\n';
        return roomsList;
    }

    function handleUndefined(value)
    {
        if(value == undefined){
            return '';
        }
        else return value;
    }

    function isEven(value){
        if (value%2 == 0)
            return true;
        else
            return false;
    }
    

});