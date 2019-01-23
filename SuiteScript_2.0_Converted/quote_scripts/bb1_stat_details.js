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

    return function statDetails(upgradeName,upgradePrice)
    {
        statTable='<tr style="margin-bottom: 22px;">  \n' +
        '<td width="210" style="padding:0" valign="top">'+lookupArrays.lu_upgrades_image[upgradeName]+'</td> \n' + 					 
        '<td valign="top" style="padding-top:0px;"><h5 style="color: #6EC62E; margin-top: 0px; margin-bottom:0px; font-size: 14px;">'+lookupArrays.lu_upgrades_name[upgradeName]+'</h5> \n' +
        '<p><span class="stattext">'+[upgradeName]+'<br> \n' +
        '<strong>'+lookupArrays.lu_upgrades_link[upgradeName]+'</strong><br> \n' +lookupArrays.lu_upgrades_fiche[upgradeName]+
        '<br><br></span></p></td>  \n' +
        '<td align="right" width="110" style="padding:0; background:url(/core/media/media.nl?id=14231217&c=472052&h=5cda6590ef3aef986dbe) no-repeat center top;" valign="top"><center><p style="padding-left:13px; padding-right: 20px; padding-top: 15px;">\n' +
        //'<span style="font-size: 14px; color: #fff;">Upgrade price</span><br><span style="font-size: 16px;"><strong>&pound;'+upgradePrice+'</strong></span></p></center></td> \n' +
        '<span style="font-size: 14px; color: #fff;">Total upgrade price</span><br><span style="font-size: 16px;"><strong>&pound;'+upgradePrice+'</strong></span></p></center></td> \n' +	//CJM June2017
        '</tr>\n' ;
        
        if (lookupArrays.lu_upgrades_image[upgradeName] == undefined)
            {statTable = '';}
        
        return statTable;
    }
    
});