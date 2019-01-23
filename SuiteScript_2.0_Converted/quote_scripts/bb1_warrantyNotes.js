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

    return function warrantyNotes()
    {
        var printNotes = '<div class="printlogo"><h2 class="row acc_trigger breakhere"><a href="#13" onclick="ga(\'send\', \'event\', \'quote\', \'Click\', \'notes\');"><div class="P-Header">Notes</div></a></h2>\n' +
        '<div class="acc_container">\n' +
        '<div class="block col-sm">\n' +
        '<table width="789" border="0" cellpadding="8" cellspacing="0">\n' +
          '<tr>\n' +
            '<td width="352" valign="top"><p class="NotesSub"><strong>Design</strong></p><p>\n' +
             'On confirming your order, Nu-Heat will complete a detailed design process resulting in detailed CAD layouts, \n' +
              'manifold locations and wiring diagrams. An example of our award-winning manuals can be found on our website \n' +
              'at www.nu-heat.co.uk.</p>\n' +
              '<p class="NotesSub">\n' +
                '<strong>Heat Source</strong></p><p>Underfloor heating can be used in conjunction with a \n' +
                'number of different heat sources: gas or oil boilers, LPG or heat pump technology. Nu-Heat supplies high quality \n' +
                'heat pumps from NIBE and is happy to work with alternative suppliers.</p>\n' +
              '<p class="NotesSub">\n' +
                '<strong>Components excluded</strong></p><p>It is Nu-Heat&#39;s policy to only supply complete, fully \n' +
                'designed systems with all components selected and matched in an overall design to ensure compatibility. You \n' +
                'need only supply pipework to the Optiflo manifolds, plus electrical wiring components. Please see the floor \n' +
                'construction sections of this quotation for floor insulation requirements, and the items included within this quotation.\n' +
                'The components supplied meet all relevant UK and European standards.</p></td>\n' +
            '<td width="40" valign="top">&nbsp;</td>\n' +
            '<td width="349" valign="top"><p class="NotesSub"><strong>Room thermostats</strong></p><p>\n' +
                'Nu-Heat provides room thermostat options to meet your customer requirements. \n' +
                'These are detailed in the Options Brochure included with this quotation or available online. \n' +
                'Separate control is provided in every main room of the building.</p>\n' +
              '<p class="NotesSub"><strong>\n' +
                'Floor constructions</strong></p><p>Fastflo&reg; floor heating tube in renowned for its flexibility,  \n' +
                'the benefits of which include saving on installation time and improved comfort due to closer spacing.  \n' +
                'Closer spacing provides an even spread of warmth across the floor and rapid response times because the  \n' +
                'warm water has less distance to travel through the shorter tube lengths. Nu-Heat has over sixty floor construction options,  \n' +
                'therefore should the one specified not meet your project requirements please contact your Nu-Heat Account Manager to discuss alternatives. \n' +
                'Note: Please inform us at design stage if a hardwood floor finish has been specified, as a floor-temperature  \n' +
                'sensing thermostat may be required to prevent overheating - this is a no-cost option.</p>\n' +
              '<p class="NotesSub">\n' +
                '<strong>Insurances/Warranties</strong></p><p>\n' +
                'Professional Indemnity, Products Liability,<br>\n' +
                'Public Liability - &pound;5m<br>\n' +
                'Fastflo&reg; floor heating tube - 10 years<br>\n' +
                'EnergyPro&reg; cylinders - 25 years<br>\n' +
                'EnergyMaster&reg; cylinders - 25 years</p></td>\n' +
          '</tr>\n' +
          '<tr>\n' +
            '<td>&nbsp;</td>\n' +
            '<td>&nbsp;</td>\n' +
            '<td>&nbsp;</td>\n' +
          '</tr>\n' +
        '</table>\n' +
        '</div></div></div>\n' ;
        
        return printNotes;
    }
    
});