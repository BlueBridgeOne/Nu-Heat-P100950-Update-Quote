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

    return function cylinderProductFiche(theCurrentRecord, transactionID)
    {
        var itemCount = theCurrentRecord.getLineCount({sublistId: 'item'});
        var cylinderFiche = '';
        var modelIdentifier = '';
        var energyEffClass = '';
        var standingLoss = '';
        var storageVolume = '';
        var ficheDetail = '';
        var energyLabel = '';
        for (var i=0; i <  itemCount; i++)
        {
            energyEffClass = theCurrentRecord.getSublistValue({sublistId: 'item',fieldId: 'custcol_erp_energy_efficiency_class',line: i});
            if (energyEffClass)
            {
                modelIdentifier = theCurrentRecord.getSublistText({sublistId: 'item', fieldId: 'item', line: i})
                standingLoss = theCurrentRecord.getSublistValue({sublistId: 'item',fieldId: 'custcol_erp_standing_loss',line: i});
                storageVolume = theCurrentRecord.getSublistValue({sublistId: 'item',fieldId: 'custcol_erp_standing_volume',line: i});
                productLabelLink = theCurrentRecord.getSublistValue({sublistId: 'item',fieldId: 'custcol_erp_product_label',line: i});
                
                ficheDetail += '<h3>Product Fiche</h3>\n'+
                '<table width="100%" border="0" cellspacing="3" cellpadding="0"><tbody>\n' +
                '<tr>\n' +
                '<td class="erptd" colspan="2" height="1" bgcolor="#4f5251"></td>\n' +
                '</tr>\n' +
                '<tr>\n' +
                '<td class="erptd" width="250"><p><strong><span class="erpfiche">SUPPLIER</span></strong></p></td>\n' +
                '<td class="erptd"><strong>Nu-Heat UK Ltd</strong></td>\n' +
                '</tr>\n' +
                '<tr>\n' +
                '<td class="erptd" colspan="2" height="1" bgcolor="#4f5251"></td>\n' +
                '</tr>\n' +
                '<tr>\n' +
                '<td class="erptd"><p><strong><span class="erpfiche">MODEL IDENTIFIER</span></strong></p></td>\n' +
                '<td class="erptd"><strong>'+modelIdentifier+'</strong></td>\n' +
                '</tr>\n' +
                '<tr>\n' +
                '<td class="erptd" colspan="2" height="1" bgcolor="#4f5251"></td>\n' +
                '</tr>\n' +
                '<tr>\n' +
                '<td class="erptd"><p><strong><span class="erpfiche">ENERGY EFFICIENCY CLASS</span></strong></p></td>\n' +
                '<td class="erptd"><strong>'+energyEffClass+'</strong></td>\n' +
                '</tr>\n' +
                '<tr>\n' +
                '<td class="erptd" colspan="2" height="1" bgcolor="#4f5251"></td>\n' +
                '</tr>\n' +
                '<tr>\n' +
                '<td class="erptd"><p><strong><span class="erpfiche">STANDING LOSS</span></strong></p></td>\n' +
                '<td class="erptd"><strong>'+standingLoss+' W</strong></td>\n' +
                '</tr>\n' +
                '<tr>\n' +
                '<td class="erptd" colspan="2" height="1" bgcolor="#4f5251"></td>\n' +
                '</tr>\n' +
                '<tr>\n' +
                '<td class="erptd"><p><strong><span class="erpfiche">STORAGE VOLUME</span></strong></p></td>\n' +
                '<td class="erptd"><strong>'+storageVolume+' l</strong></td>\n' +
                '</tr>\n' +
                '<tr>\n' +
                '<td class="erptd" colspan="2" height="1" bgcolor="#4f5251"></td>\n' +
                '</tr>\n' +
                '</tbody></table><br>\n';
                
                energyLabel += '<tr>\n' +
                '<td class="erptd" width="250"><p><strong><span class="erpfiche"><!--model identifier-->'+modelIdentifier+'</span></strong></p></td>\n' +
                '<td class="erptd"><a href="'+productLabelLink+'" target="_blank">Click to view label [PDF]</a></td>\n' +
                '</tr>\n' +
                '<tr>\n' +
                '<td class="erptd" colspan="2" height="1" bgcolor="#4f5251"></td>\n' +
                '</tr>\n';
            }
            
            if (ficheDetail)
            {
                cylinderFiche = '<p>The product fiche below shows technical information related to the product\'s efficiency, as required by EU legislation for energy related products.</p>\n'+
                '<br>\n' +ficheDetail+
                '<h3>Energy Labels</h3>\n' +
                '<table width="100%" border="0" cellspacing="3" cellpadding="0">\n' +
                '<tbody>\n' +
                '<tr>\n' +
                '<td class="erptd" colspan="2" height="1" bgcolor="#4f5251"></td>\n' +
                '</tr>\n' +energyLabel+'</tbody>\n' +
                '</table>\n';
            }
            
        }
        return cylinderFiche;
    }
    
});