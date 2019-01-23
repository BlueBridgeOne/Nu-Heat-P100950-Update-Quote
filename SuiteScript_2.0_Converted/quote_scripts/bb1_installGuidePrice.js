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

    return function installGuidePrice(theCurrentRecord, transactionID)
    {   
        var guidePrice = fixedTwoDP(theCurrentRecord.getValue({fieldId: 'custbody_inst_estimate'}));
        var screedingHours = fixedTwoDP(theCurrentRecord.getValue({fieldId: 'custbody_screeding_hours'}));
        var installGuide;
        var operationList = '';
        var loPro = 'F';
        var loProMax = 'F';
        var otherFloorCon = 'F';
        var floorCons = ''; 
        var roomCount = theCurrentRecord.getLineCount({sublistId: 'recmachcustrecord_cad_rooms_quote'});
        for (var i=0; i <  roomCount; i++)
        {
            var floorConst = theCurrentRecord.getSublistText({sublistId: 'recmachcustrecord_cad_rooms_quote', fieldId: 'custrecord_cad_floor_construction', line: i});
            if (lookupArrays.lu_floor_cons_type[floorConst] == 'LoPro Floors')
            {
                loPro = 'T';
            }
            else if (lookupArrays.lu_floor_cons_type[floorConst] == 'LoProMax Floors')
            {
                loProMax = 'T';
            }
            else
            {
                otherFloorCon = 'T';
            }	
        }   
        
        if (loProMax == 'T')
        {
            floorCons = 'LoPro&reg;Max'; 
            operationList = '<tr style="background-color: #fff;">\n' +
                    '<td align="left" valign="top" style="font-size:12px; padding:4px;">Prepare/repair floors where necessary prior to installing the LoPro&reg;Max UFH system. Floors outside Nu-Heat\'s tolerance levels will require levelling prior to the UFH system being installed.</td>\n' + //Operation
                    '<td align="center" style="font-size:20px; background-color: #ededed;"></td>\n' + //RI
                    '<td align="center" style="font-size:20px;">&#10003;</td>\n' + //Builder
                    '<td align="center" style="font-size:20px;"></td>\n' + //Heating Contractor
                    '<td align="center" style="font-size:20px;"></td>\n' + //Electrical Contractor
                    '<td align="center" style="font-size:20px;">&#10003;</td>\n' + //RI Optional
            '</tr>\n'+
            '<tr style="background-color: #ccc;" height="1">\n'+
            '<td colspan="6" style="padding-top: 0px; padding-bottom: 0px; padding-left: 0px; padding-right: 0px;"></td>\n'+
            '</tr>\n'+
            '<tr style="background-color: #fff;">\n' +
                    '<td align="left" valign="top" style="font-size:12px; padding:4px;">Where specified, lay 10mm acoustic wood fibreboard for 1st floors & attic rooms</td>\n' + //Operation
                    '<td align="center" style="font-size:20px; background-color: #ededed;">&#10003;</td>\n' + //RI
                    '<td align="center" style="font-size:20px;"></td>\n' + //Builder
                    '<td align="center" style="font-size:20px;"></td>\n' + //Heating Contractor
                    '<td align="center" style="font-size:20px;"></td>\n' + //Electrical Contractor
                    '<td align="center" style="font-size:20px;"></td>\n' + //RI Optional
            '</tr>\n'+
            '<tr style="background-color: #ccc;" height="1">\n'+
            '<td colspan="6" style="padding-top: 0px; padding-bottom: 0px; padding-left: 0px; padding-right: 0px;"></td>\n'+
            '</tr>\n'+
            '<tr style="background-color: #fff;">\n' +
                    '<td align="left" valign="top" style="font-size:12px; padding:4px;">Install room thermostats, wiring centre and all associated electrical wiring (1<sup>st</sup> & 2<sup>nd</sup> fix)</td>\n' + //Operation
                    '<td align="center" style="font-size:20px; background-color: #ededed;"></td>\n' + //RI
                    '<td align="center" style="font-size:20px;"></td>\n' + //Builder
                    '<td align="center" style="font-size:20px;"></td>\n' + //Heating Contractor
                    '<td align="center" style="font-size:20px;">&#10003;</td>\n' + //Electrical Contractor
                    '<td align="center" style="font-size:20px;"></td>\n' + //RI Optional
            '</tr>\n'+
            '<tr style="background-color: #ccc;" height="1">\n'+
            '<td colspan="6" style="padding-top: 0px; padding-bottom: 0px; padding-left: 0px; padding-right: 0px;"></td>\n'+
            '</tr>\n'+
            '<tr style="background-color: #fff;">\n' +
                    '<td align="left" valign="top" style="font-size:12px; padding:4px;">Install cylinder and the flow & return pipework between cylinder or boiler and Optiflo manifold(s) 1<sup>st</sup> & 2<sup>nd</sup> fix</td>\n' + //Operation
                    '<td align="center" style="font-size:20px; background-color: #ededed;"></td>\n' + //RI
                    '<td align="center" style="font-size:20px;"></td>\n' + //Builder
                    '<td align="center" style="font-size:20px;">&#10003;</td>\n' + //Heating Contractor
                    '<td align="center" style="font-size:20px;"></td>\n' + //Electrical Contractor
                    '<td align="center" style="font-size:20px;">&#10003;</td>\n' + //RI Optional
            '</tr>\n'+
            '<tr style="background-color: #ccc;" height="1">\n'+
            '<td colspan="6" style="padding-top: 0px; padding-bottom: 0px; padding-left: 0px; padding-right: 0px;"></td>\n'+
            '</tr>\n'+
            '<tr style="background-color: #fff;">\n' +
                    '<td align="left" valign="top" style="font-size:12px; padding:4px;">Install Nu-Heat Optiflo manifold with remote or direct pump module</td>\n' + //Operation
                    '<td align="center" style="font-size:20px; background-color: #ededed;">&#10003;</td>\n' + //RI
                    '<td align="center" style="font-size:20px;"></td>\n' + //Builder
                    '<td align="center" style="font-size:20px;"></td>\n' + //Heating Contractor
                    '<td align="center" style="font-size:20px;"></td>\n' + //Electrical Contractor
                    '<td align="center" style="font-size:20px;"></td>\n' + //RI Optional
            '</tr>\n'+
            '<tr style="background-color: #ccc;" height="1">\n'+
            '<td colspan="6" style="padding-top: 0px; padding-bottom: 0px; padding-left: 0px; padding-right: 0px;"></td>\n'+
            '</tr>\n'+
            '<tr style="background-color: #fff;">\n' +
                    '<td align="left" valign="top" style="font-size:12px; padding:4px;">Install LoPro&reg;Max edge expansion strip and castellated panel </td>\n' + //Operation
                    '<td align="center" style="font-size:20px; background-color: #ededed;">&#10003;</td>\n' + //RI
                    '<td align="center" style="font-size:20px;"></td>\n' + //Builder
                    '<td align="center" style="font-size:20px;"></td>\n' + //Heating Contractor
                    '<td align="center" style="font-size:20px;"></td>\n' + //Electrical Contractor
                    '<td align="center" style="font-size:20px;"></td>\n' + //RI Optional
            '</tr>\n'+
            '<tr style="background-color: #ccc;" height="1">\n'+
            '<td colspan="6" style="padding-top: 0px; padding-bottom: 0px; padding-left: 0px; padding-right: 0px;"></td>\n'+
            '</tr>\n'+
            '<tr style="background-color: #fff;">\n' +
                    '<td align="left" valign="top" style="font-size:12px; padding:4px;">Install  floor temp sensors & 10mm Fastflo&reg; UFH tube then fill, flush and pressure test (Note: this can be done on a room-by-room basis)</td>\n' + //Operation
                    '<td align="center" style="font-size:20px; background-color: #ededed;">&#10003;</td>\n' + //RI
                    '<td align="center" style="font-size:20px;"></td>\n' + //Builder
                    '<td align="center" style="font-size:20px;"></td>\n' + //Heating Contractor
                    '<td align="center" style="font-size:20px;"></td>\n' + //Electrical Contractor
                    '<td align="center" style="font-size:20px;"></td>\n' + //RI Optional
            '</tr>\n'+
            '<tr style="background-color: #ccc;" height="1">\n'+
            '<td colspan="6" style="padding-top: 0px; padding-bottom: 0px; padding-left: 0px; padding-right: 0px;"></td>\n'+
            '</tr>\n'+
            '<tr style="background-color: #fff;">\n' +
                    '<td align="left" valign="top" style="font-size:12px; padding:4px;">Installation of LoPro&reg;QuickSet self-levelling compound *see below</td>\n' + //Operation
                    '<td align="center" style="font-size:20px; background-color: #ededed;"></td>\n' + //RI
                    '<td align="center" style="font-size:20px;">&#10003;</td>\n' + //Builder
                    '<td align="center" style="font-size:20px;"></td>\n' + //Heating Contractor
                    '<td align="center" style="font-size:20px;"></td>\n' + //Electrical Contractor
                    '<td align="center" style="font-size:20px;">&#10003;</td>\n' + //RI Optional
            '</tr>\n'+
            '<tr style="background-color: #ccc;" height="1">\n'+
            '<td colspan="6" style="padding-top: 0px; padding-bottom: 0px; padding-left: 0px; padding-right: 0px;"></td>\n'+
            '</tr>\n'+
            '<tr style="background-color: #fff;">\n' +
                    '<td align="left" valign="top" style="font-size:12px; padding:4px;">Install and commission boiler/heat source</td>\n' + //Operation
                    '<td align="center" style="font-size:20px; background-color: #ededed;"></td>\n' + //RI
                    '<td align="center" style="font-size:20px;"></td>\n' + //Builder
                    '<td align="center" style="font-size:20px;">&#10003;</td>\n' + //Heating Contractor
                    '<td align="center" style="font-size:20px;"></td>\n' + //Electrical Contractor
                    '<td align="center" style="font-size:20px;">&#10003;</td>\n' + //RI Optional
            '</tr>\n'+
            '<tr style="background-color: #ccc;" height="1">\n'+
            '<td colspan="6" style="padding-top: 0px; padding-bottom: 0px; padding-left: 0px; padding-right: 0px;"></td>\n'+
            '</tr>\n'+
            '<tr style="background-color: #fff;">\n' +
                    '<td align="left" valign="top" style="font-size:12px; padding:4px;">Install domestic services 1st &amp; 2nd fix</td>\n' + //Operation
                    '<td align="center" style="font-size:20px; background-color: #ededed;"></td>\n' + //RI
                    '<td align="center" style="font-size:20px;"></td>\n' + //Builder
                    '<td align="center" style="font-size:20px;">&#10003;</td>\n' + //Heating Contractor
                    '<td align="center" style="font-size:20px;"></td>\n' + //Electrical Contractor
                    '<td align="center" style="font-size:20px;">&#10003;</td>\n' + //RI Optional
            '</tr>\n'+
            '<tr style="background-color: #ccc;" height="1">\n'+
            '<td colspan="6" style="padding-top: 0px; padding-bottom: 0px; padding-left: 0px; padding-right: 0px;"></td>\n'+
            '</tr>\n'+
            '<tr style="background-color: #fff;">\n' +
                    '<td align="left" valign="top" style="font-size:12px; padding:4px;">Commission floor heating &amp; provide customer handover of operational instructions, User Guide, etc.</td>\n' + //Operation
                    '<td align="center" style="font-size:20px; background-color: #ededed;">&#10003;</td>\n' + //RI
                    '<td align="center" style="font-size:20px;"></td>\n' + //Builder
                    '<td align="center" style="font-size:20px;"></td>\n' + //Heating Contractor
                    '<td align="center" style="font-size:20px;"></td>\n' + //Electrical Contractor
                    '<td align="center" style="font-size:20px;"></td>\n' + //RI Optional
            '</tr>\n'+
            '<tr style="background-color: #ccc;" height="1">\n'+
            '<td colspan="6" style="padding-top: 0px; padding-bottom: 0px; padding-left: 0px; padding-right: 0px;"></td>\n'+
            '</tr>\n'+
           '</tbody></table>\n' +
        '<p><br><span style="font-size:20px;"><strong>Installation Estimate (excl. VAT): &pound;'+guidePrice+'</strong></span></p>\n' +
        '<p><br><strong>Note:</strong><br>This guide price shown above is based on completion of activities indicated in the shaded column. These aspects of installation can be carried out either by a Nu-Heat Registered Installer or by another chosen heating engineer. Variations in regional labour rates and travelling times are not included. The price does not take into account laying QuickSet self-levelling compound.  Please note this is not a quotation for installation by Nu-Heat.</p>\n' +
        '<h5><br>Guide time to lay LoPro&reg;Max QuickSet self-levelling compound</h5>\n' +
        '<p><strong>Screeding Total Hours</strong> '+screedingHours+'</p>\n' +
        '<p>The guideline time is based on the LoPro&reg;Max QuickSet self-levelling compound being mixed by hand with either an electric paddle drill or forced action mixer then poured and laid to each room.</p>\n' +
        //CJM Screed tab removed'<p>Please note for large floor areas typically over 60m<sup>2</sup> it may be more economical to obtain a estimate from one of Nu-Heat\'s national screeding contractors who will provide you with a fixed price for laying the LoPro&reg;Max QuickSet self levelling compound. Please view the Screeding Contractors Information tab on this quote for more information.</p>\n';
        '<p>Please note for large floor areas typically over 60m<sup>2</sup> it may be more economical to obtain a estimate from one of Nu-Heat\'s national screeding contractors who will provide you with a fixed price for laying the LoPro&reg;Max QuickSet self levelling compound. For details please contact your Account Manager.</p>\n';
        
        }
        
        else if (loPro == 'T')
        {
            floorCons = 'LoPro&reg;10';
            operationList = '<tr style="border-top:#F0F0F0;">\n' +
                '<td align="left" valign="top" style="font-size:12px; padding:4px;">Prepare floor and level using appropriate primer and self-levelling compound as necessary</td>\n' + //Operation
                '<td align="center" valign="top" style="font-size:12px;"></td>\n' + //RI
                '<td align="center" valign="top" style="font-size:12px;">&#10003;</td>\n' + //Builder
                '<td align="center" valign="top" style="font-size:12px;"></td>\n' + //Heating Contractor
                '<td align="center" valign="top" style="font-size:12px;"></td>\n' + //Electrical Contractor
                '<td align="center" valign="top" style="font-size:12px;"></td>\n' + //RI Optional
            '</tr>\n'+
            '<tr style="border-top:#F0F0F0;">\n' +
                '<td align="left" valign="top" style="font-size:12px; padding:4px;" bgcolor="#FFFFFF">Where specified, lay LoPro acoustic wood fibre board/ LoPro AcousticPE foam underlay</td>\n' + //Operation
                '<td align="center" valign="top" style="font-size:12px;" bgcolor="#FFFFFF"></td>\n' + //RI
                '<td align="center" valign="top" style="font-size:12px;" bgcolor="#FFFFFF">&#10003;</td>\n' + //Builder
                '<td align="center" valign="top" style="font-size:12px;" bgcolor="#FFFFFF"></td>\n' + //Heating Contractor
                '<td align="center" valign="top" style="font-size:12px;" bgcolor="#FFFFFF"></td>\n' + //Electrical Contractor
                '<td align="center" valign="top" style="font-size:12px;" bgcolor="#FFFFFF">&#10003;</td>\n' + //RI Optional
            '</tr>\n'+
            '<tr style="border-top:#F0F0F0;">\n' +
                '<td align="left" valign="top" style="font-size:12px; padding:4px;">Install room thermostats and wiring centre for UFH manifolds, 1st and 2nd fix wiring</td>\n' + //Operation
                '<td align="center" valign="top" style="font-size:12px;"></td>\n' + //RI
                '<td align="center" valign="top" style="font-size:12px;"></td>\n' + //Builder
                '<td align="center" valign="top" style="font-size:12px;"></td>\n' + //Heating Contractor
                '<td align="center" valign="top" style="font-size:12px;">&#10003;</td>\n' + //Electrical Contractor
                '<td align="center" valign="top" style="font-size:12px;"></td>\n' + //RI Optional
            '</tr>\n'+
            '<tr style="border-top:#F0F0F0;">\n' +
                '<td align="left" valign="top" style="font-size:12px; padding:4px;" bgcolor="#FFFFFF">Install 1st fix flow and return heating pipework to UFH manifold positions and fix UFH manifold</td>\n' + //Operation
                '<td align="center" valign="top" style="font-size:12px;" bgcolor="#FFFFFF"></td>\n' + //RI
                '<td align="center" valign="top" style="font-size:12px;" bgcolor="#FFFFFF"></td>\n' + //Builder
                '<td align="center" valign="top" style="font-size:12px;" bgcolor="#FFFFFF">&#10003;</td>\n' + //Heating Contractor
                '<td align="center" valign="top" style="font-size:12px;" bgcolor="#FFFFFF"></td>\n' + //Electrical Contractor
                '<td align="center" valign="top" style="font-size:12px;" bgcolor="#FFFFFF">&#10003;</td>\n' + //RI Optional
            '</tr>\n'+
            '<tr style="border-top:#F0F0F0;">\n' +
                '<td align="left" valign="top" style="font-size:12px; padding:4px;">Install LoPro10&reg; panel and castellated pipe tray to all areas specified on CAD drawings</td>\n' + //Operation
                '<td align="center" valign="top" style="font-size:12px;">&#10003;</td>\n' + //RI
                '<td align="center" valign="top" style="font-size:12px;"></td>\n' + //Builder
                '<td align="center" valign="top" style="font-size:12px;"></td>\n' + //Heating Contractor
                '<td align="center" valign="top" style="font-size:12px;"></td>\n' + //Electrical Contractor
                '<td align="center" valign="top" style="font-size:12px;"></td>\n' + //RI Optional
            '</tr>\n'+
            '<tr style="border-top:#F0F0F0;">\n' +
                '<td align="left" valign="top" style="font-size:12px; padding:4px;" bgcolor="#FFFFFF">Install Fastflo&reg; UFH pipe to all rooms and pressure test</td>\n' + //Operation
                '<td align="center" valign="top" style="font-size:12px;" bgcolor="#FFFFFF">&#10003;</td>\n' + //RI
                '<td align="center" valign="top" style="font-size:12px;" bgcolor="#FFFFFF"></td>\n' + //Builder
                '<td align="center" valign="top" style="font-size:12px;" bgcolor="#FFFFFF"></td>\n' + //Heating Contractor
                '<td align="center" valign="top" style="font-size:12px;" bgcolor="#FFFFFF"></td>\n' + //Electrical Contractor
                '<td align="center" valign="top" style="font-size:12px;" bgcolor="#FFFFFF"></td>\n' + //RI Optional
            '</tr>\n'+
             '<tr style="border-top:#F0F0F0;">\n' +
                '<td align="left" valign="top" style="font-size:12px; padding:4px;">Lay LoPro QuickSet self-levelling compound in all areas where castellated pipe tray is present</td>\n' + //Operation
                '<td align="center" valign="top" style="font-size:12px;">&#10003;</td>\n' + //RI
                '<td align="center" valign="top" style="font-size:12px;"></td>\n' + //Builder
                '<td align="center" valign="top" style="font-size:12px;"></td>\n' + //Heating Contractor
                '<td align="center" valign="top" style="font-size:12px;"></td>\n' + //Electrical Contractor
                '<td align="center" valign="top" style="font-size:12px;"></td>\n' + //RI Optional
            '</tr>\n'+
            '<tr style="border-top:#F0F0F0;">\n' +
                '<td align="left" valign="top" style="font-size:12px; padding:4px;" bgcolor="#FFFFFF">2nd fix heating controls and 2-port zone valves for standard S-Plan layout where applicable</td>\n' + //Operation
                '<td align="center" valign="top" style="font-size:12px;" bgcolor="#FFFFFF"></td>\n' + //RI
                '<td align="center" valign="top" style="font-size:12px;" bgcolor="#FFFFFF"></td>\n' + //Builder
                '<td align="center" valign="top" style="font-size:12px;" bgcolor="#FFFFFF">&#10003;</td>\n' + //Heating Contractor
                '<td align="center" valign="top" style="font-size:12px;" bgcolor="#FFFFFF"></td>\n' + //Electrical Contractor
                '<td align="center" valign="top" style="font-size:12px;" bgcolor="#FFFFFF">&#10003;</td>\n' + //RI Optional
            '</tr>\n'+
             '<tr style="border-top:#F0F0F0;">\n' +
                '<td align="left" valign="top" style="font-size:12px; padding:4px;">Where specified, install new boiler and domestic hot water cylinder control valves, etc.</td>\n' + //Operation
                '<td align="center" valign="top" style="font-size:12px;"></td>\n' + //RI
                '<td align="center" valign="top" style="font-size:12px;"></td>\n' + //Builder
                '<td align="center" valign="top" style="font-size:12px;">&#10003;</td>\n' + //Heating Contractor
                '<td align="center" valign="top" style="font-size:12px;"></td>\n' + //Electrical Contractor
                '<td align="center" valign="top" style="font-size:12px;">&#10003;</td>\n' + //RI Optional
            '</tr>\n'+
            '<tr style="border-top:#F0F0F0;">\n' +
                '<td align="left" valign="top" style="font-size:12px; padding:4px;" bgcolor="#FFFFFF">Commission boiler, cylinder and UFH</td>\n' + //Operation
                '<td align="center" valign="top" style="font-size:12px;" bgcolor="#FFFFFF"></td>\n' + //RI
                '<td align="center" valign="top" style="font-size:12px;" bgcolor="#FFFFFF"></td>\n' + //Builder
                '<td align="center" valign="top" style="font-size:12px;" bgcolor="#FFFFFF">&#10003;</td>\n' + //Heating Contractor
                '<td align="center" valign="top" style="font-size:12px;" bgcolor="#FFFFFF"></td>\n' + //Electrical Contractor
                '<td align="center" valign="top" style="font-size:12px;" bgcolor="#FFFFFF">&#10003;</td>\n' + //RI Optional
            '</tr>\n'+
            '<tr style="border-top:#F0F0F0;">\n' +
                '<td align="left" valign="top" style="font-size:12px; padding:4px;">Provide customer handover of operational instructions, User Guide, etc.</td>\n' + //Operation
                '<td align="center" valign="top" style="font-size:12px;">&#10003;</td>\n' + //RI
                '<td align="center" valign="top" style="font-size:12px;"></td>\n' + //Builder
                '<td align="center" valign="top" style="font-size:12px;">&#10003;</td>\n' + //Heating Contractor
                '<td align="center" valign="top" style="font-size:12px;"></td>\n' + //Electrical Contractor
                '<td align="center" valign="top" style="font-size:12px;"></td>\n' + //RI Optional
            '</tr>\n'+
            
            '<tr>\n' +
               '<td colspan="6" style="padding:4px; font-size:12px;" ><br><strong>Note:</strong> Guide Prices are provided for information only. This is not a quotation for installation by Nu-Heat. Variations in regional labour rates and travelling times are not included. If required we can provide details of a Nu-Heat Registered Installer in your area who will provide a firm installation quotation.<br><br>\n' +
                'The Guide Price for installing the LoPro10&reg; underfloor heating components listed in your quotation are highlighted in the shaded column above. These aspects of the installation can be carried out either by a Nu-Heat Registered Installer, entirely by your own nominated heating engineer or by a combination of both, depending on preference.<br><br>\n' +
                'General building works are not included, as they would be carried out by a builder/carpenter as part of the overall contract.<br><br>\n' +
                'Electrical work must be carried out by a qualified electrical contractor. This can be quoted separately but usually forms part of the heating engineer&rsquo;s overall quotation/contract.<br><br>\n' +
            '</tr>\n' +
            '<tr>\n' +
            '<td colspan="6" align="right" valign="top" ><br><span style="font-size:22px; color:#000; font-weight:bold;">Installation Estimate (excl. VAT): &pound;'+guidePrice+'</span></td>\n' +
        '</tr>\n' +
    '</tbody></table>\n';
        }
        
        else
        {
            operationList = '<tr style="border-top:#F0F0F0;">\n' +
                '<td align="left" valign="top" style="font-size:12px; padding:4px;">Prepare floor surface for registered installer</td>\n' + //Operation
                '<td align="center" valign="top" style="font-size:12px;"></td>\n' + //RI
                '<td align="center" valign="top" style="font-size:12px;">&#10003;</td>\n' + //Builder
                '<td align="center" valign="top" style="font-size:12px;"></td>\n' + //Heating Contractor
                '<td align="center" valign="top" style="font-size:12px;"></td>\n' + //Electrical Contractor
                '<td align="center" valign="top" style="font-size:12px;"></td>\n' + //RI Optional
            '</tr>\n'+
            '<tr style="border-top:#F0F0F0;">\n' +
                '<td align="left" valign="top" style="font-size:12px; padding:4px;" bgcolor="#FFFFFF">Install locally sourced insulation complying with current building regulations</td>\n' + //Operation
                '<td align="center" valign="top" style="font-size:12px;" bgcolor="#FFFFFF"></td>\n' + //RI
                '<td align="center" valign="top" style="font-size:12px;" bgcolor="#FFFFFF">&#10003;</td>\n' + //Builder
                '<td align="center" valign="top" style="font-size:12px;" bgcolor="#FFFFFF"></td>\n' + //Heating Contractor
                '<td align="center" valign="top" style="font-size:12px;" bgcolor="#FFFFFF"></td>\n' + //Electrical Contractor
                '<td align="center" valign="top" style="font-size:12px;" bgcolor="#FFFFFF"></td>\n' + //RI Optional
            '</tr>\n'+
            '</tr>\n'+
            '<tr style="border-top:#F0F0F0;">\n' +
                '<td align="left" valign="top" style="font-size:12px; padding:4px;">Install Nu-Heat tracked polystyrene insulation for floating floors and heat transfer plates where present</td>\n' + //Operation
                '<td align="center" valign="top" style="font-size:12px;">&#10003;</td>\n' + //RI
                '<td align="center" valign="top" style="font-size:12px;"></td>\n' + //Builder
                '<td align="center" valign="top" style="font-size:12px;"></td>\n' + //Heating Contractor
                '<td align="center" valign="top" style="font-size:12px;"></td>\n' + //Electrical Contractor
                '<td align="center" valign="top" style="font-size:12px;"></td>\n' + //RI Optional
            '</tr>\n'+
            '<tr style="border-top:#F0F0F0;">\n' +
                '<td align="left" valign="top" style="font-size:12px; padding:4px;" bgcolor="#FFFFFF">Notch joists in suspended timber floors in accordance with current Building Regulations where applicable</td>\n' + //Operation
                '<td align="center" valign="top" style="font-size:12px;" bgcolor="#FFFFFF"></td>\n' + //RI
                '<td align="center" valign="top" style="font-size:12px;" bgcolor="#FFFFFF">&#10003;</td>\n' + //Builder
                '<td align="center" valign="top" style="font-size:12px;" bgcolor="#FFFFFF"></td>\n' + //Heating Contractor
                '<td align="center" valign="top" style="font-size:12px;" bgcolor="#FFFFFF"></td>\n' + //Electrical Contractor
                '<td align="center" valign="top" style="font-size:12px;" bgcolor="#FFFFFF">&#10003;</td>\n' + //RI Optional
            '</tr>\n'+
            '<tr style="border-top:#F0F0F0;">\n' +
                '<td align="left" valign="top" style="font-size:12px; padding:4px;">Install timber battens associated with the floor construction specified (eg DPJ14) for UFH installed between floor joists</td>\n' + //Operation
                '<td align="center" valign="top" style="font-size:12px;"></td>\n' + //RI
                '<td align="center" valign="top" style="font-size:12px;">&#10003;</td>\n' + //Builder
                '<td align="center" valign="top" style="font-size:12px;"></td>\n' + //Heating Contractor
                '<td align="center" valign="top" style="font-size:12px;"></td>\n' + //Electrical Contractor
                '<td align="center" valign="top" style="font-size:12px;"></td>\n' + //RI Optional
            '</tr>\n'+
            '<tr style="border-top:#F0F0F0;">\n' +
                '<td align="left" valign="top" style="font-size:12px; padding:4px;" bgcolor="#FFFFFF">Install Nu-HeatOptiflo manifold(s)</td>\n' + //Operation
                '<td align="center" valign="top" style="font-size:12px;" bgcolor="#FFFFFF">&#10003;</td>\n' + //RI
                '<td align="center" valign="top" style="font-size:12px;" bgcolor="#FFFFFF"></td>\n' + //Builder
                '<td align="center" valign="top" style="font-size:12px;" bgcolor="#FFFFFF"></td>\n' + //Heating Contractor
                '<td align="center" valign="top" style="font-size:12px;" bgcolor="#FFFFFF"></td>\n' + //Electrical Contractor
                '<td align="center" valign="top" style="font-size:12px;" bgcolor="#FFFFFF">&#10003;</td>\n' + //RI Optional
            '</tr>\n'+
             '<tr style="border-top:#F0F0F0;">\n' +
                '<td align="left" valign="top" style="font-size:12px; padding:4px;">Install remote or direct pump module(s)</td>\n' + //Operation
                '<td align="center" valign="top" style="font-size:12px;"></td>\n' + //RI
                '<td align="center" valign="top" style="font-size:12px;"></td>\n' + //Builder
                '<td align="center" valign="top" style="font-size:12px;">&#10003;</td>\n' + //Heating Contractor
                '<td align="center" valign="top" style="font-size:12px;"></td>\n' + //Electrical Contractor
                '<td align="center" valign="top" style="font-size:12px;">&#10003;</td>\n' + //RI Optional
            '</tr>\n'+
             '<tr style="border-top:#F0F0F0;">\n' +
                '<td align="left" valign="top" style="font-size:12px; padding:4px;">Install floor heating tube (and cliptrack for screed systems)</td>\n' + //Operation
                '<td align="center" valign="top" style="font-size:12px;">&#10003;</td>\n' + //RI
                '<td align="center" valign="top" style="font-size:12px;"></td>\n' + //Builder
                '<td align="center" valign="top" style="font-size:12px;"></td>\n' + //Heating Contractor
                '<td align="center" valign="top" style="font-size:12px;"></td>\n' + //Electrical Contractor
                '<td align="center" valign="top" style="font-size:12px;"></td>\n' + //RI Optional
            '</tr>\n'+
            '<tr style="border-top:#F0F0F0;">\n' +
                '<td align="left" valign="top" style="font-size:12px; padding:4px;" bgcolor="#FFFFFF">Fill, flush & pressure test floor heating system</td>\n' + //Operation
                '<td align="center" valign="top" style="font-size:12px;" bgcolor="#FFFFFF">&#10003;</td>\n' + //RI
                '<td align="center" valign="top" style="font-size:12px;" bgcolor="#FFFFFF"></td>\n' + //Builder
                '<td align="center" valign="top" style="font-size:12px;" bgcolor="#FFFFFF"></td>\n' + //Heating Contractor
                '<td align="center" valign="top" style="font-size:12px;" bgcolor="#FFFFFF"></td>\n' + //Electrical Contractor
                '<td align="center" valign="top" style="font-size:12px;" bgcolor="#FFFFFF"></td>\n' + //RI Optional
            '</tr>\n'+
            '<tr style="border-top:#F0F0F0;">\n' +
                '<td align="left" valign="top" style="font-size:12px; padding:4px;">Lay floor screed/timber floor</td>\n' + //Operation
                '<td align="center" valign="top" style="font-size:12px;"></td>\n' + //RI
                '<td align="center" valign="top" style="font-size:12px;">&#10003;</td>\n' + //Builder
                '<td align="center" valign="top" style="font-size:12px;"></td>\n' + //Heating Contractor
                '<td align="center" valign="top" style="font-size:12px;"></td>\n' + //Electrical Contractor
                '<td align="center" valign="top" style="font-size:12px;"></td>\n' + //RI Optional
            '</tr>\n'+
            '<tr style="border-top:#F0F0F0;">\n' +
                '<td align="left" valign="top" style="font-size:12px; padding:4px;" bgcolor="#FFFFFF">Install room stats, control boards, and all electrical wiring (1<sup>st</sup> and 2<sup>nd</sup> fix)</td>\n' + //Operation
                '<td align="center" valign="top" style="font-size:12px;" bgcolor="#FFFFFF"></td>\n' + //RI
                '<td align="center" valign="top" style="font-size:12px;" bgcolor="#FFFFFF"></td>\n' + //Builder
                '<td align="center" valign="top" style="font-size:12px;" bgcolor="#FFFFFF"></td>\n' + //Heating Contractor
                '<td align="center" valign="top" style="font-size:12px;" bgcolor="#FFFFFF">&#10003;</td>\n' + //Electrical Contractor
                '<td align="center" valign="top" style="font-size:12px;" bgcolor="#FFFFFF"></td>\n' + //RI Optional
            '</tr>\n'+
             '<tr style="border-top:#F0F0F0;">\n' +
                '<td align="left" valign="top" style="font-size:12px; padding:4px;">Install cylinder (if present)</td>\n' + //Operation
                '<td align="center" valign="top" style="font-size:12px;"></td>\n' + //RI
                '<td align="center" valign="top" style="font-size:12px;"></td>\n' + //Builder
                '<td align="center" valign="top" style="font-size:12px;">&#10003;</td>\n' + //Heating Contractor
                '<td align="center" valign="top" style="font-size:12px;"></td>\n' + //Electrical Contractor
                '<td align="center" valign="top" style="font-size:12px;">&#10003;</td>\n' + //RI Optional
            '</tr>\n'+
            '<tr style="border-top:#F0F0F0;">\n' +
                '<td align="left" valign="top" style="font-size:12px; padding:4px;" bgcolor="#FFFFFF">Install pipework between cylinder or boiler and Optiflo manifold(s) (1<sup>st</sup> and 2<sup>nd</sup> fix)</td>\n' + //Operation
                '<td align="center" valign="top" style="font-size:12px;" bgcolor="#FFFFFF"></td>\n' + //RI
                '<td align="center" valign="top" style="font-size:12px;" bgcolor="#FFFFFF"></td>\n' + //Builder
                '<td align="center" valign="top" style="font-size:12px;" bgcolor="#FFFFFF">&#10003;</td>\n' + //Heating Contractor
                '<td align="center" valign="top" style="font-size:12px;" bgcolor="#FFFFFF"></td>\n' + //Electrical Contractor
                '<td align="center" valign="top" style="font-size:12px;" bgcolor="#FFFFFF">&#10003;</td>\n' + //RI Optional
            '</tr>\n'+
             '<tr style="border-top:#F0F0F0;">\n' +
                '<td align="left" valign="top" style="font-size:12px; padding:4px;">Install domestic services (1<sup>st</sup> and 2<sup>nd</sup> fix)</td>\n' + //Operation
                '<td align="center" valign="top" style="font-size:12px;"></td>\n' + //RI
                '<td align="center" valign="top" style="font-size:12px;"></td>\n' + //Builder
                '<td align="center" valign="top" style="font-size:12px;">&#10003;</td>\n' + //Heating Contractor
                '<td align="center" valign="top" style="font-size:12px;"></td>\n' + //Electrical Contractor
                '<td align="center" valign="top" style="font-size:12px;">&#10003;</td>\n' + //RI Optional
            '</tr>\n'+
            '<tr style="border-top:#F0F0F0;">\n' +
                '<td align="left" valign="top" style="font-size:12px; padding:4px;" bgcolor="#FFFFFF">Install and commission boiler/heat source</td>\n' + //Operation
                '<td align="center" valign="top" style="font-size:12px;" bgcolor="#FFFFFF"></td>\n' + //RI
                '<td align="center" valign="top" style="font-size:12px;" bgcolor="#FFFFFF"></td>\n' + //Builder
                '<td align="center" valign="top" style="font-size:12px;" bgcolor="#FFFFFF">&#10003;</td>\n' + //Heating Contractor
                '<td align="center" valign="top" style="font-size:12px;" bgcolor="#FFFFFF"></td>\n' + //Electrical Contractor
                '<td align="center" valign="top" style="font-size:12px;" bgcolor="#FFFFFF">&#10003;</td>\n' + //RI Optional
            '</tr>\n'+
            '<tr style="border-top:#F0F0F0;">\n' +
                '<td align="left" valign="top" style="font-size:12px; padding:4px;">Connect boiler/heat source to cylinder (if present)</td>\n' + //Operation
                '<td align="center" valign="top" style="font-size:12px;"></td>\n' + //RI
                '<td align="center" valign="top" style="font-size:12px;"></td>\n' + //Builder
                '<td align="center" valign="top" style="font-size:12px;">&#10003;</td>\n' + //Heating Contractor
                '<td align="center" valign="top" style="font-size:12px;"></td>\n' + //Electrical Contractor
                '<td align="center" valign="top" style="font-size:12px;">&#10003;</td>\n' + //RI Optional
            '</tr>\n'+
            '<tr style="border-top:#F0F0F0;">\n' +
                '<td align="left" valign="top" style="font-size:12px; padding:4px;" bgcolor="#FFFFFF">Commission floor heating and provide operational instruction</td>\n' + //Operation
                '<td align="center" valign="top" style="font-size:12px;" bgcolor="#FFFFFF">&#10003;</td>\n' + //RI
                '<td align="center" valign="top" style="font-size:12px;" bgcolor="#FFFFFF"></td>\n' + //Builder
                '<td align="center" valign="top" style="font-size:12px;" bgcolor="#FFFFFF"></td>\n' + //Heating Contractor
                '<td align="center" valign="top" style="font-size:12px;" bgcolor="#FFFFFF"></td>\n' + //Electrical Contractor
                '<td align="center" valign="top" style="font-size:12px;" bgcolor="#FFFFFF"></td>\n' + //RI Optional
            '</tr>\n'+
            '<tr>\n' +
                '<td colspan="6" valign="top" style="font-size:12px; padding:4px;"><p><strong>Note:</strong> Guide prices are provided for information only. This is not a quotation for installation by Nu-Heat.\n' +
                'Variations in regional labour rates and travelling times are not included. We can provide contact details of a registered installer in your area, who will provide a firm installation quotation.</p></td>\n' +
            '</tr>\n'+
            '<tr>\n' +
            '<td colspan="6" align="right" valign="top" ><br><span style="font-size:22px; color:#000; font-weight:bold;">Installation Estimate (excl. VAT): &pound;'+guidePrice+'</span></td>\n' +
        '</tr>\n' +
    '</tbody></table>\n';
        }
        
        
        if (guidePrice != null && guidePrice != '' && guidePrice > 0)
        {
            installGuide = '<h2 class="row acc_trigger breakhere">Installation Guide Price</h2>\n' +
            '<div class="acc_container">\n' +
                '<div class="block col-sm">\n' +
                '<h5>Installation Sequence and Guide Price for '+floorCons+' underfloor heating components</h5>\n' +
                    '<table width="100%">\n' +
                        '<tbody><tr style="color:#FFF;">\n' +
                          '<td valign="top" width="250">&nbsp;</td>\n' +
                          '<td valign="center" bgcolor="#666666" align="center" style="font-size:12px;"><strong>Included</strong></td>\n' +
                          '<td valign="center" colspan="4" bgcolor="#666666" align="center" style="font-size:12px;"><strong>Not Included in Guide Price</strong></td>\n' +
                        '</tr>\n'+
                        '<tr style="color:#FFF;">\n' +
                          '<td valign="center" bgcolor="#666666" align="left" style="font-size:12px;"><p><strong>Operation</strong></td>\n' +
                          '<td valign="center" bgcolor="#666666" align="center" style="font-size:12px;"><strong>Registered Installer</strong></td>\n' +
                          '<td valign="center" bgcolor="#666666" align="center" style="font-size:12px;"><strong>Builder</strong></td>\n' +
                          '<td valign="center" bgcolor="#666666" align="center" style="font-size:12px;"><strong>Heating Contractor</strong></td>\n' +
                          '<td valign="center" bgcolor="#666666" align="center" style="font-size:12px;"><strong>Electrical Contractor</strong></td>\n' +
                          '<td valign="center" bgcolor="#666666" align="center" style="font-size:12px;"><strong>Registered Installer (optional)</strong></td>\n' +
                        '</tr>\n'+
                        operationList+			
            '</div></div>\n' ;
        }
        else {installGuide = '';}
        
        return installGuide;
    }

    function fixedTwoDP(number)
    {
        return parseFloat(number).toFixed(2);
    }
    
});