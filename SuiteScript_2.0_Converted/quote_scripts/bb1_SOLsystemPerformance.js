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

    return function SOLsystemPerformance(theCurrentRecord, transactionID)
    {
        
        var orientation = theCurrentRecord.getText({fieldId: 'custbody_sol_orientation'});
        var overshading = theCurrentRecord.getText({fieldId: 'custbody_sol_overshading'});
        var roofTilt = theCurrentRecord.getText({fieldId: 'custbody_sol_roof_tilt'});
        var dhwUsage = theCurrentRecord.getValue({fieldId: 'custbody_dhw_usage_litres'});
        var occupants = theCurrentRecord.getValue({fieldId: 'custbody_pqc_occupancy'});
        var solarInput = theCurrentRecord.getValue({fieldId: 'custbody_sol_input'});
        var solarProportion = theCurrentRecord.getValue({fieldId: 'custbody_sol_proportion'});
        var schematicImage = '';
        var solarSchematic = theCurrentRecord.getValue({fieldId: 'custbody_schematic'});
        if (solarSchematic != '' && solarSchematic != null)
        {
            schematicImage = lookupArrays.lu_sol_schematic_image[solarSchematic];
        }

        var quoteDetails = '<h2 class="row acc_trigger breakhere"><a onclick="ga(\'send\', \'event\', \'quote\', \'Click\', \'system-performance\');"><div class="P-Header">System Performance</div></a></h2>\n' +
                '<div class="acc_container">\n' +
                '<div class="block col-sm">\n'+  
                            
                    '<table width="560" border="0" cellspacing="5" cellpadding="5">\n' +
                        schematicImage +
                        '<tr>\n' +
                            '<td colspan="2" align="left" valign="top"><p>The figures below provide an indication of the potential energy '+
                            'savings achievable based on your approximate daily hot water demand. The solar fraction figure is the proportion '+
                            'of domestic hot water that can potentially be heated by solar panels alone. It is a yearly average so in summer '+
                            'months, the proportion will be significantly higher. The \'yearly free energy harvested\' figure is based on SAP '+
                            'appendix H and may be required for any RHI funding (subject to confirmation of the scheme).'+
                            '<ul><li>Assumed roof direction for panel installation is '+orientation+'.</li>'+
                            '<li>There is '+overshading+' overshading in front of the panels.</li>'+
                            '<li>A '+roofTilt+' roof pitch has been assumed for calculation purposes.</li>'+
                            '</ul></p></td>\n' +
                        '</tr>\n' +
                        '<tr>\n' +
                            '<td width="130" align="left" valign="top"><span style="color:#337BBD; font-weight:bold;">Hot water demand:</span></td>\n' +
                            '<td align="left" valign="top" >'+dhwUsage+' litres daily, based on an occupancy of '+occupants+' people*</td>\n' +
                        '</tr>\n' +
                        '<tr>\n' +
                            '<td align="left" valign="top"><span style="color:#337BBD; font-weight:bold;">Solar input:</span></td>\n' +
                            '<td align="left" valign="top" >'+solarInput+'kWh of free solar energy harvested yearly**</td>\n' +
                        '</tr>\n' +
                        '<tr>\n' +
                            '<td align="left" valign="top"><span style="color:#337BBD; font-weight:bold;">Solar proportion:</span></td>\n' +
                            '<td align="left" valign="top" >'+solarProportion+'\% of hot water supplied yearly by solar***</td>\n' +
                        '</tr>\n' +
                        '<tr>\n' +
                            '<td colspan="3" align="left" valign="top" style="FONT-SIZE: 9px">* according to SAP table 1 at 50&#176;C draw-off\n' +
                            '<br />** based on SAP appendix H\n' +
                            '<br />*** based on calculations from TSol Expert</td>\n' +
                        '</tr>\n' +		
                    '</table>\n' +				
                '</div>\n' +
                '</div>\n';

                return quoteDetails;
    }
    
});