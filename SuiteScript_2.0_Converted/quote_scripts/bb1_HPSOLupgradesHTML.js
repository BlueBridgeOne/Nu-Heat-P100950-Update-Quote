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

    return function HPSOLupgradesHTML(theCurrentRecord, tranID, type)
    {
        var upgradesList = '';
        if (type = 'Heat Pump' || type == 'Solar')
        {
            var exFilters = new Array();
            exFilters[0] = search.createFilter({name: 'custrecord_ex_quote_number', join: null, operator: 'is', formula: tranID }); //Deepak Dec2018 filter
            exFilters[1] = search.createFilter({name: 'custrecord_upgrade_item_type', join: null, operator: 'is', formula: 'Extra' }); //Deepak Dec2018 filter
            exFilters[2] = search.createFilter({name: 'custrecord_upgrade_option_type', join: null, operator: 'is', formula: 'Extra' }); //Deepak Dec2018 filter
            var exColumns = new Array();
            exColumns[0] = search.createColumn({name: 'custrecord_ex_item_name'}) //Deepak Dec2018 column
            exColumns[1] = search.createColumn({name: 'custrecord_ex_item_descr'}) //Deepak Dec2018 column
            exColumns[2] = search.createColumn({name: 'custrecord_ex_discount_price'}) //Deepak Dec2018 column
            exColumns[3] = search.createColumn({name: 'custrecord_ex_discount_price', sort: search.Sort.DESC}) //Deepak Dec2018 column
            var exSearchresults = search.create({type: 'customrecord_upgrades_and_extras', id: null, filters: exFilters, columns: exColumns});
            if (exSearchresults != null)
            {
                var salesEmail = theCurrentRecord.getValue({fieldId: 'custbody_sales_rep_email'});
                var salesPhone = theCurrentRecord.getValue({fieldId: 'custbody_sales_rep_phone'});
                upgradesList =  '<h2 class="row acc_trigger breakhere">Upgrade Options</h2>\n' +
                '<div class="acc_container">\n' +
                '<div class="block col-sm">\n'+  
                '<p>It\'s quick and easy to upgrade to any of the options shown below. Please contact me on <a href ="mailto:'+salesEmail+'">'+salesEmail+'</a> or '+salesPhone+' and I will update your quote immediately. </p>\n'+
                '<h3>Options</h3>\n' +
                '<table width="539" border="0">\n' +
                    '<tr style="color:#FFF;">\n' +
                      '<td valign="top" width="70" bgcolor="#666666"><strong>Code</strong></td>\n' +
                      '<td valign="top" bgcolor="#666666"><strong>Item Description</strong></td>\n' +
                      '<td valign="top" width="60" bgcolor="#666666"><strong>Price</strong></td>\n' +
                    '</tr>\n';		
                for ( var l = 0; exSearchresults != null && l < exSearchresults.length; l++ )
                {
                    var exSearchresult = exSearchresults[ l ];		
                    var upgradeName = exSearchresult.getValue('custrecord_ex_item_name');
                    var itemDescription = exSearchresult.getValue('custrecord_ex_item_descr');
                    var upgradePrice = fixedTwoDP(exSearchresult.getValue('custrecord_ex_discount_price'));
                    var rowbgColour = "";
                    if (isEven(l) == true)
                    {
                        rowbgColour = 'bgcolor="#FFFFFF"';
                    }
                    upgradesList +=
                            '<tr style="border-top:#F0F0F0;">\n' +
                                '<td align="left" valign="top" '+rowbgColour+'>'+ upgradeName +'</td>\n' +
                                '<td align="left" valign="top" '+rowbgColour+'>'+ itemDescription +'</td>\n' +
                                '<td align="left" valign="top" '+rowbgColour+'>&pound;'+ upgradePrice +'</td>\n' +
                            '</tr>\n';
                    
                }
                upgradesList +='</table>\n' ;
                upgradesList +='<p><strong>Please note:</strong> Upgrade Option prices valid until point of delivery.</p>\n' + 
                '</div></div>\n';
            }
            else
            {
                upgradesList = '';
            }
        }	
        
        return upgradesList;
        
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
    
});