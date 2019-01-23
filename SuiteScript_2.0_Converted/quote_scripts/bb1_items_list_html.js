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

define(['N/record', 'N/search', 'N/log', 'N/url', 'N/https', 'N/file', 'N/render', './bb1_lookup_arrays.js',  './bb1_nextStepInlineLPM.js'],
function(record, search, log, url, https, file, render, lookupArrays, nextStepInlineLPM) {

    return function itemsListHTML(theCurrentRecord, tranID, type, system, forms)
    {
        var systemPrice = theCurrentRecord.getValue({fieldId: 'custbody_subtotal'});
        var department = theCurrentRecord.getValue({fieldId: 'department'});
        var plusVAT = ' + VAT';
        var itemsTable = '';
        var itemsList = '';
        var loProMax = 'F';
        var loProMaxTable = '';
        var loProMax14 = 'F';		//CJM Apr2018
        var loProMax14Table = '';	//CJM Apr2018
        var itemCodeLink = '';
        var neoStatSelected = 'F';	//CJM Dec2016
        var gshp1145 = 'F';			//CJM May2018
        var FastDeck = 'F';			//CJM May2018
        var FastDeckTable = '';		//CJM May2018
        var LoProLite = 'F';		//CJM June2018
        var LoProLiteTable = '';	//CJM June2018

        var entityAnd = '&amp;'; //Deepak 2019
        var entityReg = '&reg;'; //Deepak 2019
    
            
        if (type == 'Underfloor Heating')
        {
            itemsTable = itemsTable + '<h2 class="row acc_trigger breakhere">\n'+
            'What\'s Included</h2>\n' +
            
            '<div class="acc_container">\n' +
            '<div class="block col-sm">\n';
        }
        else
        {
            itemsTable = itemsTable + '<br>';
        }
            
        var itemCount = theCurrentRecord.getLineCount({sublistId: 'item'});

        for (var i=0; i < itemCount; i++)
        {
            var itemCode = theCurrentRecord.getSublistText({sublistId: 'item', fieldId: 'item', line: i});

            if (itemCode.substring(0,6) == "Hidden" || itemCode.substring(0,5) == "SPACE")
            {
                itemCode = "";
            }
            else 
            {
                itemCodeLink = handleUndefined(lookupArrays.lu_items_popup_pics2[itemCode]);	
            }
            
            if (itemCode == 'LPM10')
            {
                loProMax = 'T';
            }
            
            //CJM Dec2016 starts....
            if (itemCode == 'dial')
            {
                neoStatSelected = 'T';
            }
            //CJM Dec2016 ends...
            
            
            //CJM May2018 Replacement HPs
            if (itemCode.substring(3,4) == "1145")
                {
                    gshp1145 = 'T';
                }
            
            //CJM May2018 FastDeck
            if (itemCode == "FD14")
                {
                    FastDeck = 'T';
                }
    
            //CJM June2018 LoProLite
            if (itemCode == "LPL10")
                {
                    LoProLite = 'T';
                }
    
            var quantity = handleNullNumber(theCurrentRecord.getSublistValue({sublistId: 'item',fieldId: 'quantity',line: i})); 

            //var itemType = handleNull(theCurrentRecord.getSublistValue({sublistId: 'item',fieldId: 'custitem_prod_type',line: i}));


            var itemDesc = handleNull(theCurrentRecord.getSublistValue({sublistId: 'item',fieldId: 'custitem_quote_description',line: i}));                    


            if (itemDesc == '')	// Quote description not found
                {	
                    itemDesc = handleNull(theCurrentRecord.getSublistValue({sublistId: 'item',fieldId: 'description',line: i}));
                                    
                    if (itemDesc == '')	// Non-inventory items do not have a description field
                        {
                            itemDesc = handleNull(theCurrentRecord.getSublistValue({sublistId: 'item',fieldId: 'salesdescription',line: i}));
                        }


                    itemDesc = itemDesc.replace (/m\u00B2/g, 'mSqrd');
                    
                    itemDesc = itemDesc.replace (/AcoustiMax/g, 'AcoustiMax' + entityReg);
                    itemDesc = itemDesc.replace (/EnergyPro/g, 'EnergyPro' + entityReg);
                    itemDesc = itemDesc.replace (/LoPro/g, 'LoPro' + entityReg);
                    itemDesc = itemDesc.replace (/Fastflo/g, 'Fastflo' + entityReg);
                    itemDesc = itemDesc.replace (/FastDeck/g, 'FastDeck' + entityReg);       
                    itemDesc = itemDesc.replace(/[^\u0000-\u007E]/g, "");	// Remove unwanted invisible characters
                    itemDesc = itemDesc.replace (/mSqrd/g, 'm&sup2;');
                }
            else
                {
                    itemDesc = itemDesc.replace (/AcoustiMax/g, 'AcoustiMax' + entityReg);
                    itemDesc = itemDesc.replace (/EnergyPro/g, 'EnergyPro' + entityReg);
                    itemDesc = itemDesc.replace (/LoPro/g, 'LoPro' + entityReg);
                    itemDesc = itemDesc.replace (/Fastflo/g, 'Fastflo' + entityReg);
                    itemDesc = itemDesc.replace (/FastDeck/g, 'FastDeck' + entityReg);
                    itemDesc = itemDesc.replace(/[^\u0000-\u007E]/g, "");	// Remove unwanted invisible characters
                    itemDesc = itemDesc.replace (/mSqrd/g, 'm&sup2;');
                }
            
            var rowbgColour = "";

            if (isEven(i) == true)
                rowbgColour = 'bgcolor="#FFFFFF"';

            itemsList += '<tr style="border-top:#F0F0F0; font-family : MuseoSans-300, Arial, Helvetica;">\n' +
            '<td align="left" valign="top" '+rowbgColour+'>'+quantity+'</td>\n' +
            '<td colspan="3" valign="top" '+rowbgColour+'>'+itemDesc+' '+itemCodeLink+ '</td>\n' +
            '</tr>\n';
        }
        
        var quoteType = theCurrentRecord.getValue({fieldId: 'custbody_quote_type'});
        var renewBenefits = '';
        if (department != '31')
        {
            if (quoteType == '8')//GSHP
            {
                // CJM May2018 starts...
                if (gshp1145)
                    {//FOR THE OLD 1145 GSHP MODELS
                    renewBenefits = '<h5 style="color: #D71920;">Why choose a NIBE Ground Source Heat Pump</h5> \n'+
                    '<p><img src="/core/media/media.nl?id=14227128' + entityAnd + 'c=472052' + entityAnd + 'h=5ffc6af3947232b48006" alt="NIBE ground source heat pumps" width="250" style="float: right; margin-left: 8px; margin-top: 0px;" /> \n'+
                    '<ul><li>Highly efficient</li> \n'+
                    '<li>MCS approved for the Renewable Heat Incentive</li> \n'+
                    '<li>Easy to read, intuitive display</li> \n'+
                    '<li>Quiet, low sound level</li> \n'+
                    '<li>Supplied with a full set of mechanical and electrical docking drawings</li> \n'+
                    '<li>7 year warranty when supplied and commissioned by Nu-Heat</li> \n'+
                    '<li>Wireless control available through <a href="http://www.nu-heat.co.uk/products/heat-pumps/controls.html?utm_source=quote' + entityAnd + 'utm_medium=email' + entityAnd + 'utm_campaign=uplink" target="_blank"> NIBE Uplink</a></li> \n'+
                    '</ul></p><p><a href="http://www.nu-heat.co.uk/products/heat-pumps/"> Find out more</a> about our range of NIBE heat pumps.<br><br></p> \n';
                    }
                else
                    {//FOR THE NEW 1155 AND 1255 GSHP MODELS
                    renewBenefits = '<h5 style="color: #D71920;">Why choose a NIBE Ground Source Heat Pump</h5> \n'+
                    '<p><img src="/core/media/media.nl?id=14227128' + entityAnd + 'c=472052' + entityAnd + 'h=5ffc6af3947232b48006" alt="NIBE ground source heat pumps" width="250" style="float: right; margin-left: 8px; margin-top: 0px;" /> \n'+
                    '<ul><li>Highly efficient, modulating heat pump</li> \n'+
                    '<li>Adjusts output based on the heat needed, drawing less electricity</li> \n'+
                    '<li>MCS approved for the Renewable Heat Incentive</li> \n'+
                    '<li>Easy to read, intuitive display</li> \n'+
                    '<li>Quiet, low sound level</li> \n'+
                    '<li>Supplied with a full set of mechanical and electrical docking drawings</li> \n'+
                    '<li>7 year warranty when supplied and commissioned by Nu-Heat</li> \n'+
                    '<li>Wireless control available through <a href="http://www.nu-heat.co.uk/products/heat-pumps/controls.html?utm_source=quote' + entityAnd + 'utm_medium=email' + entityAnd + 'utm_campaign=uplink" target="_blank"> NIBE Uplink</a></li> \n'+
                    '</ul></p><p><a href="http://www.nu-heat.co.uk/products/heat-pumps/"> Find out more</a> about our range of NIBE heat pumps.<br><br></p> \n';
                    }
                // CJM May2018 ends...........
            }
        
            else if (quoteType == '9')//ASHP
            {
                var schematic = theCurrentRecord.getValue({fieldId: 'custbody_schematic'});
                if (schematic.charAt(0) != 'H')
                {
                    renewBenefits = '<h5 style="color: #D71920;">Why choose a NIBE Air Source Heat Pump</h5> \n'+
                    '<p><img src="/core/media/media.nl?id=14227130' + entityAnd + 'c=472052' + entityAnd + 'h=8c2a583692d4c5d6abad" width="250" style="float: right; margin-left: 8px; margin-top: 0px;" alt="NIBE air source heat pumps" />\n'+ 
                    '<ul><li>Quiet operation</li> \n'+
                    '<li>Improved energy efficiency</li> \n'+
                    '<li>MCS approved offering access to the RHI</li> \n'+
                    '<li>Supplied with a full set of mechanical and electrical docking drawings</li> \n'+
                    '<li>Remote monitoring and adjustment of the system with NIBE Uplink - <a href="http://www.nu-heat.co.uk/products/heat-pumps/controls.html?utm_source=quote' + entityAnd + 'utm_medium=email' + entityAnd + 'utm_campaign=uplink" target="_blank">read more</a></li> \n'+
                    '<li>Easy installation thanks to simple wiring, adjustable feet and long hoses</li> \n'+
                    '<li>7 year warranty when supplied and commissioned by Nu-Heat</li></ul></p> \n'+
                    '<p><a href="http://www.nu-heat.co.uk/products/heat-pumps/">Find out more</a> about our high performance heat pumps.<br><br></p> \n';
                }
            }
            else if (quoteType == '16')//Solar
            {
                renewBenefits = '<h5 style="color: #FBB034;">Why choose solar thermal</h5>\n'+
                '<p><img src="/core/media/media.nl?id=14227123' + entityAnd + 'c=472052' + entityAnd + 'h=c6fdc77aef2bc8ea8b30" alt="Solar thermal" width="250" style="float: right; margin-left: 8px;" />\n'+
                '<ul><li>Produces up to 60% of annual hot water - as much as 100% in summer</li>\n'+
                '<li>Suitable for all types of homes - retrofit or new build</li>\n'+
                '<li>Both roof surface-mounted (on roof) and integral roof-mounted (in roof) flat panel models available</li>\n'+
                '<li>Quick and easy to install - no major building works involved</li>\n'+
                '<li>Eligible for government grants and incentives</li>\n'+
                '<li>Can be integrated with a heat pump to increase overall energy efficiency</li><br><br></ul></p>\n';
            }
        }
    
        itemsTable +=
        renewBenefits + 
        '<h3>Your system price - What\'s included?</h3>\n' + loProMaxTable + loProMax14Table + FastDeckTable + LoProLiteTable +
        '<table width="544" border="0" cellspacing="1" cellpadding="5">\n' +
        '<tr style="color:#FFF;">\n' +
        '<td align="center" valign="top" bgcolor="#666666" width="35px"><strong>Qty</strong></td>\n' +
        '<td colspan="3" valign="top" bgcolor="#666666"><strong>Item Description</strong></td>\n' +
        '</tr> \n';



    
        var hpDisclaimer = '';
        if (type != 'Underfloor Heating')
        {		
            var salesEmail = theCurrentRecord.getValue({fieldId: 'custbody_sales_rep_email'});
            var salesPhone = theCurrentRecord.getValue({fieldId: 'custbody_sales_rep_phone'});
            
            if (type == 'Heat Pump')
            {
                hpDisclaimer = '<tr>\n' +
                '<td colspan="3" valign="top"><p><h3>Important</h3></p>\n' +
                '<p>This quotation may be subject to revision at design stage when a more in-depth heat loss calculation and energy simulation will be performed. \n'+
                'This can occasionally require that a different sized heat pump or ground loop array is required (if applicable) or a different heat pump (larger or smaller) is required. \n'+
                'A change of this nature may require the system to be re-priced.</p></td></tr>\n';
            
                plusVAT = '</span></td></tr>\n' +
                '<tr>\n' +
                '<td valign="bottom" colspan="3" align="right"><span style="font-size:18px; color:#000; font-weight:bold;">(Excludes support option and VAT)';
            }
            var systemPrice = theCurrentRecord.getValue({fieldId: 'custbody_subtotal'});
            var discountAmount = theCurrentRecord.getValue({fieldId: 'discounttotal'});
            var systemSubTotal = theCurrentRecord.getValue({fieldId: 'subtotal'});
            
            
            itemsTable +=  //''; //DEEPAK 2019
            '<tr>\n' +
            '<td valign="top">&nbsp;</td>\n' +
            '<td align="left" valign="top" >&nbsp;</td>\n' +
            '<td colspan="1" valign="top" >&nbsp;</td>\n' +
            '</tr>\n'  + 
            '</table>\n';


            var rhiPic = '';
    //		var cashbackTitle = '';
            var rhiDetail = '';
            var VATdetail = '';
            var erpDetail = '';
            var erpRatings = '';
            var vatCharge = '';
            if (department != '31')//Commercial Division
            {
                var contactMe = 'For further information on the RHI scheme either contact me on '+salesPhone+', email <a href="mailto:'+salesEmail+'">'+salesEmail+'</a> or refer to our <a href="http://www.nu-heat.co.uk/s.nl/it.I/id.645/.f">RHI factsheet</a>.<br />';

                var vatCharge = '<p><strong>VAT Charges</strong></p> \n'+ 
                '<p valign="top">VAT on renewables systems commissioned by Nu-Heat will be charged at 0% for new build projects and 5% for renovation projects.</p> \n'+ 
                '<p valign="top">VAT on renewables systems not commissioned by Nu-Heat will be charged at 20%. </p>';
    
                vatCharge = '<tr><td class="newtable" colspan="3"> \n'+
                    '<h4>VAT charges</h4> \n'+
                    '<p>VAT on renewables systems commissioned by Nu-Heat will be charged at 0% for new build projects and 5% for renovation projects.</p> \n'+
                    '<p>VAT on renewables systems not commissioned by Nu-Heat will be charged at 20%.</p> \n'+
                    '</td></tr> \n';
                
                if (quoteType == '8')//GSHP
                {// CJM May2018 starts..........
                    cashbackTitle = 'Renewable Heat Incentive Payments'; 
    
                    rhiPic = '<img src="/core/media/media.nl?id=14716195' + entityAnd + 'c=472052' + entityAnd + 'h=342757b9ddfeb2e28caf" alt="Potential RHI payment" style="background: none; border: 0px; margin: 0; padding: 0;" />';

                    rhiDetail = '<p>The Renewable Heat Incentive (RHI) is a tariff based* scheme offering regular payments to qualifying homeowners. It helps offset the cost of installing a renewable technology.</p> \n'+
                    '<p><strong>The potential payment shown here is for illustrative purposes only, based on the assumptions below:</strong></p>\n'+
                    '<ul><li>Tariff of 20.46p/kWh* </li> \n'+
                    '<li>Annual Heat Load of 15,000kWh </li> \n'+
                    '<li>Seasonal Performance Factor (SPF) of 3.4</li></ul>';
                }
    
                else if (quoteType == '9')//ASHP
                {// CJM May2018 starts..........
                    cashbackTitle = 'Renewable Heat Incentive Payments'; 
    
                    rhiPic = '<img src="/core/media/media.nl?id=14716194' + entityAnd + 'c=472052' + entityAnd + 'h=5a2d7097b3790d31382a" alt="Potential RHI payment" style="background: none; border: 0px; margin: 0; padding: 0;" />';

                    rhiDetail = '<p>The Renewable Heat Incentive (RHI) is a tariff based* scheme offering regular payments to qualifying homeowners. It helps offset the cost of installing a renewable technology.</p> \n'+
                    '<p><strong>The potential payment shown here is for illustrative purposes only, based on the assumptions below:</strong></p>\n'+
                    '<ul><li>Tariff of 10.49p/kWh* </li> \n'+
                    '<li>Annual Heat Load of 15,000kWh </li> \n'+
                    '<li>Seasonal Performance Factor (SPF) of 2.7</li></ul>';
                    
                }
                else if (quoteType == '16')//Solar
                {// CJM May2018 starts..........
                    cashbackTitle = 'Renewable Heat Incentive Payments'; 
    
                    rhiPic = '<img src="/core/media/media.nl?id=14716296' + entityAnd + 'c=472052' + entityAnd + 'h=e0fb4828ce7b4f0fddc9" alt="Potential RHI payment" style="background: none; border: 0px; margin: 0; padding: 0;" />';

                    rhiDetail = '<p>The Renewable Heat Incentive (RHI) is a tariff based* scheme offering regular payments to qualifying homeowners. It helps offset the cost of installing a renewable technology.</p> \n'+
                    '<p><strong>The potential payment shown here is for illustrative purposes only, based on the assumptions below:</strong></p>\n' +
                    '<ul><li>Tariff of 10.66p/kWh* </li> \n'+
                    '<li>A standard dwelling with four occupants </li> \n'+
                    '<li>A modest overshading of 4m� of panels on a 30� south facing roof generating 1278kWh of heat</li></ul>';
                }
    
            }
    
            if (discountAmount != '0.00' && discountAmount != '' && discountAmount != null){
                
                priceTable=	'<table width="100%" border="0" cellspacing="0" cellpadding="0"> \n'+
                  '<tbody> \n'+
                   '<tr> \n'+
                      '<td class="newtable" valign="middle"><span class="discountprice">Subtotal:</span></td> \n'+
                      '<td class="newtable" valign="middle"><span class="discountprice">&pound;'+systemSubTotal+'</span></td> \n'+
                    '</tr> \n'+
                    '<tr> \n'+
                      '<td class="newtable" valign="middle"><span class="discountprice">Discount:</span></td> \n'+
                      '<td class="newtable" valign="middle"><span class="discountprice"> -&pound;'+fixedTwoDP(Math.abs(discountAmount))+'</span></td> \n'+
                    '</tr> \n'+
                    '<tr> \n'+
                      '<td class="newtable" width="100" valign="middle"><span class="hpquoteprice">Total:</span></td> \n'+
                      '<td class="newtable" valign="middle"><span class="hpquoteprice">&pound;'+systemPrice+' + VAT</span></td> \n'+
                    '</tr> \n'+
                  '</tbody> \n'+
                '</table> \n';
                
                
            }
            else
            {
                priceTable=	'<table width="100%" border="0" cellspacing="0" cellpadding="0"> \n'+
                  '<tbody> \n'+
                    '<tr> \n'+
                      '<td class="newtable" width="100" valign="middle"><span class="hpquoteprice">Total:</span></td> \n'+
                      '<td class="newtable" valign="middle"><span class="hpquoteprice">&pound;'+systemPrice+' + VAT</span></td> \n'+
                    '</tr> \n'+
                  '</tbody> \n'+
                '</table> \n';
            }
    
            var systemHeatingRating = theCurrentRecord.getValue({fieldId: 'custbody_erp_system_heating_rating'});
            var hwHeatingRating = theCurrentRecord.getValue({fieldId: 'custbody_erp_system_hot_water_rating'});
    //		var energyPDF = theCurrentRecord.getValue({fieldId: 'custbody_bb1_energy_pdf'});
            var entity = theCurrentRecord.getValue({fieldId: 'entity'});
            
            if (systemHeatingRating)
            {
                if (hwHeatingRating)
                {
                    erpDetail = '<td class="newtable" width="24" height="150"><img src="/core/media/media.nl?id=14227091' + entityAnd + 'c=472052' + entityAnd + 'h=635c6598cf389c12d1a6/img/15-spaceheat.png" alt="Space heating rating" style="float: none; background: none; border: 0px; margin: 0; padding: 0;" /><!--ONLY ADD THIS BIT IF THERE IS A WATER RATING --><br><img src="/core/media/media.nl?id=14227111' + entityAnd + 'c=472052' + entityAnd + 'h=841fedf29255d9176f50" alt="Water heating rating" style="float: none; background: none; border: 0px; margin: 0; padding: 0;" /><!--END OF IF--></td> \n'+
                    '<td class="newtable" width="70"><!--LINK TO LABEL --><a href="'+ forms +'/app/site/hosting/scriptlet.nl?script=645' + entityAnd + 'deploy=1' + entityAnd + 'compid=472052' + entityAnd + 'h=db9338be5551924b1da3' + entityAnd + 'trxid='+tranID+'' + entityAnd + 'entityid='+entity+'" target="_blank" onclick="ga(\'send\', \'event\', \'quote\', \'Click\', \'erp-label\');">'+handleUndefined(lookupArrays.lu_srp_rating[systemHeatingRating])+'</a><!--ONLY ADD THIS BIT IF THERE IS A WATER RATING --><br><a href="'+ forms +'/app/site/hosting/scriptlet.nl?script=645' + entityAnd + 'deploy=1' + entityAnd + 'compid=472052' + entityAnd + 'h=db9338be5551924b1da3' + entityAnd + 'trxid='+tranID+'' + entityAnd + 'entityid='+entity+'" target="_blank">'+handleUndefined(lookupArrays.lu_srp_rating[hwHeatingRating])+'</a><!-- END OF IF --></td> \n'+
                    '<td class="newtable" valign="middle"><span class="hpquoteprice">'+priceTable+'</span></td> \n';
                }
                else
                {
                    erpDetail = '<td class="newtable" width="24" height="150"><img src="/core/media/media.nl?id=14227091' + entityAnd + 'c=472052' + entityAnd + 'h=635c6598cf389c12d1a6" alt="Space heating rating" style="float: none; background: none; border: 0px; margin: 0; padding: 0;" /></td> \n'+
                    '<td class="newtable" width="70"><!--LINK TO LABEL --><a href="'+ forms +'/app/site/hosting/scriptlet.nl?script=645' + entityAnd + 'deploy=1' + entityAnd + 'compid=472052' + entityAnd + 'h=db9338be5551924b1da3' + entityAnd + 'trxid='+tranID+'' + entityAnd + 'entityid='+entity+'" target="_blank" onclick="ga(\'send\', \'event\', \'quote\', \'Click\', \'erp-label\');">'+handleUndefined(lookupArrays.lu_srp_rating[systemHeatingRating])+'</a></td> \n'+
                    '<td class="newtable" valign="middle"><span class="hpquoteprice">'+priceTable+'</span></td> \n';
                }
                
                erpRatings = '<tr> \n'+
                '<td colspan="3" class="newtable"> \n'+
                '<h4>Energy efficiency ratings</h4> \n'+
                '<p>As part of the Energy Related Products Directive, or ErP, all new heating system packages must come with an energy rating and label.</p>\n'+
                '<p>The flame icon represents the energy efficiency rating for the heating element of the system from A++ - G.\n'+
                'A tap icon represents the energy efficiency rating for the hot water element of the system from A++ - G, where applicable.</p>\n'+
                '<p>The system fiche shows how the energy rating(s) for the system have been calculated.</p> \n'+
                '<p><a href="'+ forms +'/app/site/hosting/scriptlet.nl?script=645' + entityAnd + 'deploy=1' + entityAnd + 'compid=472052' + entityAnd + 'h=db9338be5551924b1da3' + entityAnd + 'trxid='+tranID+'' + entityAnd + 'entityid='+entity+'" onclick="ga(\'send\', \'event\', \'quote\', \'Click\', \'erp-label-text\');">View your system package energy efficiency label</a><br><a href="#sfiche" id="toggle-fiche" onclick="ga(\'send\', \'event\', \'quote\', \'Click\', \'erp-fiche-text\');">View the system fiche</a></p></td> \n'+
                '</tr> \n';
    
            }
            else
            {
                erpDetail = '<td class="newtable" valign="middle"><span class="hpquoteprice">'+priceTable+'</span></td> \n';
            }
            
            
            itemsTable +=
            
            //renewBenefits + 	

            '<table width="100%" border="0" style="padding-top: 0px;"><tbody> \n'+
            '<tr><td colspan="2" class="newtable" style="color:#6EC62E;"><h3>Renewable Heat Incentive Payments</h3></td></tr> \n'+	// CJM May2018
            '<tr> \n'+
            '<td class="newtable">'+

            //rhiDetail+

            '</td> \n'+
            '<td width="130" class="newtable">'+

            //rhiPic+

            '</td> \n'+
            '</tr> \n'+
            '<tr><td colspan="2" class="newtable"><p>An estimated annual heat load specific to this project can be found under the System Performance section.</p></td></tr> \n'+	// CJM May2018
            '<tr> \n'+
            '<td colspan="2" class="newtable"><p>For further information on the RHI scheme read our <a href="/core/media/media.nl?id=180172' + entityAnd + 'c=472052' + entityAnd + 'h=4b885fb3cbc90ae9401b' + entityAnd + '_xt=.pdf">RHI factsheet</a>.</p></td> \n'+	// CJM May2018
            '</tr> \n'+
            '</tbody></table> \n'+


            '<p style="font-size: 12px;"><i>*Tariffs are subject to change</i></p> \n'+
            '<br> \n'+

            '<div style="border:#4F5251 solid 1px; width:100%; padding-left: 8px; padding-right:8px; background-color: #fff;"> \n'+
            '<table width="100%" border="0" style="padding-top: 0px;"><tbody> \n'+

            '<tr><td colspan="3" class="newtable"><br><h3 style="font-size: 20px;">Your quote price</h3></td></tr> \n'+
            '<tr> \n'+

            //erpDetail+

            '</tr> \n'+
            '<tr> \n'+
            '<td colspan="3" class="newtable"> \n'+
            '<p style="border-bottom: 1px dashed #ccc; font-size: 2px;">&nbsp;</p></td> \n'+
            '</tr> \n'+

            //erpRatings +
            //vatCharge+

            '</tbody> \n'+


            '</table> \n'+
            '</div><br /><br /> \n';
            
            
            
            
            
            if (type == 'Heat Pump' || type == 'Solar')
            {
                var CPexFilters = new Array();
                CPexFilters[0] = search.createFilter({name: 'custrecord_ex_quote_number', join: null, operator: 'is', formula: tranID }); //Deepak Dec2018 filter
                CPexFilters[1] = search.createFilter({name: 'custrecord_upgrade_item_type', join: null, operator: 'is', formula: 'Extra' }); //Deepak Dec2018 filter
                CPexFilters[2] = search.createFilter({name: 'custrecord_upgrade_option_type', join: null, operator: 'startswith', formula: 'CP' }); //Deepak Dec2018 filter
                var CPexColumns = new Array();
                CPexColumns[0] = search.createColumn({name: 'custrecord_ex_item_name'}) //Deepak Dec2018 column
                CPexColumns[1] = search.createColumn({name: 'custrecord_ex_item_descr'}) //Deepak Dec2018 column
                CPexColumns[2] = search.createColumn({name: 'custrecord_ex_discount_price'}) //Deepak Dec2018 column
                CPexColumns[3] = search.createColumn({name: 'custrecord_ex_quantity'}) //Deepak Dec2018 column

                CPexColumns[4]= search.createColumn({name: 'custrecord_ex_item_name', sort: search.Sort.DESC}) //Deepak Dec2018 column



                
                var CPexSearchresults = search.create({type: 'customrecord_upgrades_and_extras', id: null, filters: CPexFilters, columns: CPexColumns});
                if (CPexSearchresults != null)
                {
                    if (department == '31')
                    {
                        itemsTable +=  //''; //DEEPAK 2019
                        '<h3>Support Options</h3>\n'+
                        '<table width="539" border="0">\n';	
                    }
                    else
                    {	
                        var salesEmail = theCurrentRecord.getValue({fieldId: 'custbody_sales_rep_email'});
                        var salesPhone = theCurrentRecord.getValue({fieldId: 'custbody_sales_rep_phone'});
                        
                        itemsTable +=  //''; //DEEPAK 2019
                        '<h3>Support Package Option(s)</h3>\n'+
                        '<p><span style="font-size:16px;">The following support package option(s) are available with this quote.</span> </p> \n'; //You can contact me via <a href="mailto:'+salesEmail+'">'+salesEmail+'</a> or '+salesPhone+' to confirm your selection.</p> \n';
    
                        itemsTable +=  //''; //DEEPAK 2019
                        '<table width="539" border="0">\n' + 

                        '<tr style="color:#FFF;">\n' +
                            '<td valign="top" bgcolor="#666666"><strong>Support Option</strong></td>\n' +
                            '<td valign="top" width="60" bgcolor="#666666"><strong>Price</strong></td>\n' +
                        '</tr>\n';					
                    }
                    for ( var m = 0; CPexSearchresults != null && m < CPexSearchresults.length; m++ )
                    {
                        var CPexSearchresult = CPexSearchresults[ m ];		
                        var upgradeName = CPexSearchresult.getValue('custrecord_ex_item_name');
                        var itemDescription = CPexSearchresult.getValue('custrecord_ex_item_descr');
                        var upgradePrice = fixedTwoDP(CPexSearchresult.getValue('custrecord_ex_discount_price'));
                        var rowbgColour = "";
                        if (isEven(m) == true)
                        {
                            rowbgColour = 'bgcolor="#FFFFFF"';
                        }
                        if (department == '31')
                        {
                            itemsTable +=  //''; //DEEPAK 2019
                            '<tr>\n' +
                            '<td align="left" valign="top" style="padding-left:0px;">'+ itemDescription +'</td>\n' +
                            '<td width="60" align="left" valign="top">&pound;'+ upgradePrice +'</td>\n' +
                            '</tr>\n';
                        }
                        else
                        {	
                            itemsTable +=  //''; //DEEPAK 2019
                            '<tr style="border-top:#F0F0F0;">\n' +
                                '<td align="left" valign="top" '+rowbgColour+'><b>'+ upgradeName +'</b><br>'+ itemDescription +'</td>\n' +
                                '<td align="left" valign="top" '+rowbgColour+'>&pound;'+ upgradePrice +'</td>\n' +
                                '</tr>\n';
                        }
                    }
                    itemsTable +=  //''; //DEEPAK 2019
                    '</table>\n' ;
                }
            }	





            itemsTable +=
            hpDisclaimer + 
            '<br />' + 
            '<div class="hidefoot">'+ nextStepInlineLPM(theCurrentRecord, tranID) +'</div> ' + 
            '<table><tr><td><p>This quotation is subject to our <a href="/core/media/media.nl?id=102664' + entityAnd + 'c=472052' + entityAnd + 'h=82644df2d5439927e946' + entityAnd + '_xt=.pdf">terms and conditions</a>.</p></td></tr></table>';

        }
        else 
        {
            itemsTable += 
            hpDisclaimer + '</table>\n </div>\n' ;
        }

        //Deepak 2019
        log.debug({title: 'ITEMS TABLE', details: itemsTable.substr(itemsTable.length - 50)});
        log.debug({title: 'ITEMS TABLE', details: itemsTable});
        
        

        //Deepak 2019
        // if (!endsWith(itemsTable, '</div>\n') || !endsWith(itemsTable, '</div>')){
        //     log.debug({title: 'ENDS WITH',details: 'DOESNT HAVE AN ENDING DIV TAG SO WILL BE ADDED'});
        //     itemsTable += '</div>\n</div>\n';
        // }

        return itemsTable;
    }

    function handleUndefined(value)
    {
        if(value == undefined){
            return '';
        }
        else return value;
    }

    function handleNull(value)
    {
        if(!value){
            return '';
        }
        else return value;
    }

    function handleNullNumber(value)
    {
        if(!value || isNaN(value)){
            return '';
        }
        else return Math.round(value);
    }

    function isEven(value){
        if (value%2 == 0)
            return true;
        else
            return false;
    }

    function fixedTwoDP(number)
    {
        return parseFloat(number).toFixed(2);
    }

    //Deepak 2019
    function endsWith(str, suffix) {
        return str.indexOf(suffix, str.length - suffix.length) !== -1;
    }
    

});