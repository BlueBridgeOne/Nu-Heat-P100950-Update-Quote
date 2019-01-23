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

define(['N/record', 'N/search', 'N/log', 'N/url', 'N/https', 'N/file', 'N/render', './bb1_cylinderProductFiche.js'],
function(record, search, log, url, https, file, render, cylinderProductFiche) {

    return function SOLsystemFiche(theCurrentRecord, transactionID, quoteNumber)
    {
        var collectorArea = theCurrentRecord.getValue({fieldId: 'custbody_erp_sol_col_area'});			//Total collector aperture area, m�
        var collectorEfficiency = theCurrentRecord.getValue({fieldId: 'custbody_erp_sol_col_eff'});	    //Collector efficiency, %
        var firstOrder = theCurrentRecord.getValue({fieldId: 'custbody_erp_sol_first_order'});			//1st order coefficient, W/(m2 K)
        var secondOrder = theCurrentRecord.getValue({fieldId: 'custbody_erp_sol_second_order'});		//2nd order coefficient, W/(m2 K)
        var incidenceAngle = theCurrentRecord.getValue({fieldId: 'custbody_erp_sol_inc_angle_mod'});	//Incidence angle modifier
        
        var efficiencyClass = handleNull(theCurrentRecord.getValue({fieldId: 'custbody_erp_sol_eff_class'}));		//Energy efficiency class of solar hot water cylinder
        var standingLoss = handleNull(theCurrentRecord.getValue({fieldId: 'custbody_erp_sol_standing_loss'}));		//Standing loss solar hot water cylinder, W
        var storageVolume = removeZero(twoDP(theCurrentRecord.getValue({fieldId: 'custbody_erp_sol_storage_volume'})));	//Storage volume of solar hot water cylinder, litres
        var storageVolumeM = removeZero(twoDP(theCurrentRecord.getValue({fieldId: 'custbody_erp_sol_storage_volume_m3'})));//removeZero(twoDP(parseFloat(storageVolume)/1000));								//Storage volume of solar hot water cylinder, m�
        
        var mElectricity = removeZero(Math.round(theCurrentRecord.getValue({fieldId: 'custbody_erp_sol_melec'})));				//M	Electricity (kWh of primary energy)
        var lElectricity= removeZero(Math.round(theCurrentRecord.getValue({fieldId: 'custbody_erp_sol_lelec'})));				//L	Electricity (kWh of primary energy)
        var xlElectricity = removeZero(Math.round(theCurrentRecord.getValue({fieldId: 'custbody_erp_sol_xlelec'})));			//XL Electricity (kWh of primary energy)
        var xxlElectricity = removeZero(Math.round(theCurrentRecord.getValue({fieldId: 'custbody_erp_sol_xxlelec'})));			//XXL Electricity (kWh of primary energy)
        
        var mFossilFuels = handleNull(theCurrentRecord.getValue({fieldId: 'custbody_erp_sol_mfossil'}));			//M Fossil fuels (kWh of�GCV)
        var lFossilFuels = handleNull(theCurrentRecord.getValue({fieldId: 'custbody_erp_sol_lfossil'}));			//L	Fossil fuels (kWh of�GCV)
        var xlFossilFuels = handleNull(theCurrentRecord.getValue({fieldId: 'custbody_erp_sol_xlfossil'}));			//XL Fossil fuels (kWh of�GCV)
        var xxlFossilFuels = handleNull(theCurrentRecord.getValue({fieldId: 'custbody_erp_sol_xxlfossil'}));		//XXL Fossil fuels (kWh of�GCV)
        
        var pumpPower = theCurrentRecord.getValue({fieldId: 'custbody_erp_sol_pump_power'});			//Pump power consumption, W
        var standbyPower = theCurrentRecord.getValue({fieldId: 'custbody_erp_sol_standby_power'});		//Standby power consumption, W
        
        var auxElectricity = Math.round(theCurrentRecord.getValue({fieldId: 'custbody_erp_sol_aux_elec'}));		//Annual auxiliary electricity consumption, kWh of final energy
        
        var ficheHPNotes = handleNull(theCurrentRecord.getValue({fieldId: 'custbody_erp_hp_comments'}));
        var ficheSolNotes = handleNull(theCurrentRecord.getValue({fieldId: 'custbody_erp_sol_comments'}));
        
        var ficheNotes = '';

        if (ficheHPNotes || ficheSolNotes)
        {
            ficheNotes = '<tr>\n' +
            '<td class="erptd" colspan="2" ><p><strong><span class="erpfiche">NOTES</span></strong></p><p><strong>'+ficheHPNotes+'<br />'+ficheSolNotes+'</strong></p></td>\n' +
            '</tr>\n' +
            '<tr>\n' +
            '<td class="erptd" colspan="2" height="1" bgcolor="#4f5251"></td>\n' +
            '</tr>\n';
        }
        
        var solFicheTop = '<h2 class="row acc_trigger breakhere"><a href="#2" onclick="ga(\'send\', \'event\', \'quote\', \'Click\', \'erp-fiche\');"><div class="P-Header">System Fiche</div></a></h2>\n' +
        '<div class="acc_container" style="display: block; overflow: hidden;"> <div class="block col-sm">\n'+
        '<p>The package fiche below shows calculations of efficiency for the system as a whole, as required by EU legislation for energy related products.</p><br />\n' +
        '<h3 class="erp">Solar system fiche</h3> \n' +  
        '<table width="100%" border="0" cellspacing="3" cellpadding="0"> <tbody> \n' +
        '<tr> \n' +
        '<td class="erptd"><p><strong><span class="erpfiche">SUPPLIER</span></strong></p></td> \n' +
        '<td class="erptd" width="190" colspan="2"><strong>Nu-Heat UK Ltd</strong></td> \n' +
        '</tr>\n' +
        '<tr>\n' +
        '<td class="erptd" colspan="3" height="1" bgcolor="#4f5251"></td>\n' +
        '</tr>\n' +
        '<tr>\n' +
        '<td class="erptd"><p><strong><span class="erpfiche">SOLAR QUOTE NUMBER</span></strong></p></td>\n' +
        '<td class="erptd" colspan="2"><strong>'+quoteNumber+'</strong></td>\n' +
        '</tr>\n' +
        '<tr>\n' +
        '<td class="erptd" colspan="3" height="1" bgcolor="#4f5251"></td>\n' +
        '</tr>\n' +
        '<tr>\n' +
        '<td class="erptd"><p><strong><span class="erpfiche">TOTAL COLLECTOR APERTURE AREA</span></strong></p></td>\n' +
        '<td class="erptd" colspan="2"><strong>'+collectorArea+' m<sup>2</sup></strong></td>\n' +
        '</tr>\n' +
        '<tr>\n' +
        '<td class="erptd" colspan="3" height="1" bgcolor="#4f5251"></td>\n' +
        '</tr>\n' +
        '<tr>\n' +
        '<td class="erptd"><p><strong><span class="erpfiche">ZERO-LOSS EFFICIENCY</span></strong></p></td>\n' +
        '<td class="erptd" colspan="2"><strong>'+collectorEfficiency+' %</strong></td>\n' +
        '</tr>\n' +
        '<tr>\n' +
        '<td class="erptd" colspan="3" height="1" bgcolor="#4f5251"></td>\n' +
        '</tr>\n' +
        '<tr>\n' +
        '<td class="erptd"><p><strong><span class="erpfiche">FIRST-ORDER COEFFICIENT</span></strong></p></td>\n' +
        '<td class="erptd" colspan="2"><strong>'+firstOrder+' W/(m<sup>2</sup> K)</strong></td>\n' +
        '</tr>\n' +
        '<tr>\n' +
        '<td class="erptd" colspan="3" height="1" bgcolor="#4f5251"></td>\n' +
        '</tr>\n' +
        '<tr>\n' +
        '<td class="erptd"><p><strong><span class="erpfiche">SECOND-ORDER COEFFICIENT</span></strong></p></td>\n' +
        '<td class="erptd" colspan="2"><strong>'+secondOrder+' W/(m<sup>2</sup> K<sup>2</sup>)</strong></td>\n' +
        '</tr>\n' +
        '<tr>\n' +
        '<td class="erptd" colspan="3" height="1" bgcolor="#4f5251"></td>\n' +
        '</tr>\n' +
        '<tr>\n' +
        '<td class="erptd"><p><strong><span class="erpfiche">INCIDENCE ANGLE MODIFIER</span></strong></p></td>\n' +
        '<td class="erptd" colspan="2"><strong>'+incidenceAngle+'</strong></td>\n' +
        '</tr>\n' +
        '<tr>\n' +
        '<td class="erptd" colspan="3" height="1" bgcolor="#4f5251"></td>\n' +
        '</tr>\n' +
        '<tr>\n' +
        '<td class="erptd"><p><strong><span class="erpfiche">ENERGY EFFICIENCY CLASS OF SOLAR HOT WATER CYLINDER</span></strong></p></td>\n' +
        '<td class="erptd" colspan="2"><strong>'+efficiencyClass+'</strong></td>\n' +
        '</tr>\n' +
        '<tr>\n' +
        '<td class="erptd" colspan="3" height="1" bgcolor="#4f5251"></td>\n' +
        '</tr>\n' +
        '<tr>\n' +
        '<td class="erptd"><p><strong><span class="erpfiche">STANDING LOSS OF SOLAR HOT WATER CYLINDER</span></strong></p></td>\n' +
        '<td class="erptd" colspan="2"><strong>'+standingLoss+' W</strong></td>\n' +
        '</tr>\n' +
        '<tr>\n' +
        '<td class="erptd" colspan="3" height="1" bgcolor="#4f5251"></td>\n' +
        '</tr>\n' +
        '<tr>\n' +
        '<td class="erptd"><p><strong><span class="erpfiche">STORAGE VOLUME OF SOLAR HOT WATER CYLINDER</span></strong></p></td>\n' +
        '<td class="erptd"><strong>'+storageVolumeM+' m<sup>3</sup></strong></td>\n' +
        '<td class="erptd"><strong>'+storageVolume+' l</strong></td>\n' +
        '</tr>\n' +
        '<tr>\n' +
        '<td class="erptd" colspan="3" height="1" bgcolor="#4f5251"></td>\n' +
        '</tr> \n' +
        '</tbody></table>\n' +
        '<table width="100%" border="0" cellspacing="3" cellpadding="0"><tbody>  \n' +
        '<tr>\n' +
        '<td class="erptd" colspan="3"><p><strong><span class="erpfiche">ANNUAL NON-SOLAR HEAT CONTRIBUTION UNDER AVERAGE CLIMATE CONDITIONS</span></strong></p></td>\n' +
        '</tr>\n' +
        '<tr>\n';

        var solFicheBottom = '<td width="45%" bgcolor="#DFDFDF"><strong>Electricity (kWh of primary energy)</strong></td>\n' +
        '<td width="45%" bgcolor="#DFDFDF"><strong>Fossil fuels (kWh of GCV)</strong></td>\n' +
        '</tr>\n' +
        '<tr>\n' +
        '<td class="erptd" colspan="3" height="1" bgcolor="#6ec62e"></td>\n' +
        '</tr>\n' +
        '<tr>\n' + 
        '<td bgcolor="#DFDFDF" align="right"><strong><span style="color: #6ec62e;">M</span></strong></td>\n' +
        '<td bgcolor="#DFDFDF"><strong>'+mElectricity+'</strong></td>\n' + 
        '<td bgcolor="#DFDFDF"><strong>'+mFossilFuels+'</strong></td>\n' +
        '</tr>\n' +
        '<tr>\n' +
        '<td class="erptd" colspan="3" height="1" bgcolor="#6ec62e"></td>\n' +
        '</tr>\n' +
        '<tr>\n' + 
        '<td bgcolor="#DFDFDF" align="right"><strong><span style="color: #6ec62e;">L</span></strong></td>\n' +
        '<td bgcolor="#DFDFDF"><strong>'+lElectricity+'</strong></td>\n' +
        '<td bgcolor="#DFDFDF"><strong>'+lFossilFuels+'</strong></td>\n' +
        '</tr>\n' +
        '<tr>\n' +
        '<td class="erptd" colspan="3" height="1" bgcolor="#6ec62e"></td>\n' +
        '</tr>\n' +
        '<tr>\n' + 
        '<td bgcolor="#DFDFDF" align="right"><strong><span style="color: #6ec62e;">XL</span></strong></td>\n' +
        '<td bgcolor="#DFDFDF"><strong>'+xlElectricity+'</strong></td>\n' +
        '<td bgcolor="#DFDFDF"><strong>'+xlFossilFuels+'</strong></td>\n' +
        '</tr>\n' +
        '<tr>\n' +
        '<td class="erptd" colspan="3" height="1" bgcolor="#6ec62e"></td>\n' +
        '</tr>\n' +
        '<tr>\n' + 
        '<td bgcolor="#DFDFDF" align="right"><strong><span style="color: #6ec62e;">XXL</span></strong></td>\n' +
        '<td bgcolor="#DFDFDF"><strong>'+xxlElectricity+'</strong></td>\n' +
        '<td bgcolor="#DFDFDF"><strong>'+xxlFossilFuels+'</strong></td>\n' +
        '</tr>\n' +
        '<tr>\n' +
        '<td class="erptd" colspan="3" height="1" bgcolor="#4f5251"></td>\n' +
        '</tr>\n' +
        '</tbody>\n' +
        '</table>\n' +	
        
        '<table width="100%" border="0" cellspacing="3" cellpadding="0"><tbody>\n' +
        '<tr>\n' +
        '<td class="erptd"><p><strong><span class="erpfiche">PUMP POWER CONSUMPTION</span></strong></p></td>\n' +
        '<td class="erptd" width="190"><strong>'+pumpPower+' W</strong></td>\n' +
        '</tr>\n' +
        '<tr>\n' +
        '<td class="erptd" colspan="2" height="1" bgcolor="#4f5251"></td>\n' +
        '</tr>\n' +
        '<tr>\n' +
        '<td class="erptd"><p><strong><span class="erpfiche">STANDBY POWER CONSUMPTION</span></strong></p></td>\n' +
        '<td class="erptd"><strong>'+standbyPower+' W</strong></td>\n' +
        '</tr>\n' +
        '<tr>\n' +
        '<td class="erptd" colspan="2" height="1" bgcolor="#4f5251"></td>\n' +
        '</tr>\n' +
        '<tr>\n' +
        '<td class="erptd"><p><strong><span class="erpfiche">ANNUAL AUXILIARY ELECTRICITY CONSUMPTION</span></strong></p></td>\n' +
        '<td class="erptd"><strong>'+auxElectricity+' kWh of final energy</strong></td>\n' +
        '</tr>\n' +
        '<tr>\n' +
        '<td class="erptd" colspan="2" height="1" bgcolor="#4f5251"></td>\n' +
        '</tr>\n' + ficheNotes +
        '</tbody></table>\n' +
        '<br />'+cylinderProductFiche(theCurrentRecord, transactionID) + '</div></div> \n';

        //Deepak 2019
        solFicheTop = solFicheTop.replace(/&/gi, '&amp;');
        solFicheBottom = solFicheBottom.replace(/&/gi, '&amp;');
        
        return solFicheTop + '<td>&nbsp;</td>\n' + solFicheBottom;
    }

    function removeZero(value)
    {
        if(value == '0'){
            return '';
        }
        else return value;
    }

    function twoDP(number)
    {
        return Math.round(number*100)/100;
    }

    function handleNull(value)
    {
        if(!value){
            return '';
        }else{
            return value;
        }
    }
    
});