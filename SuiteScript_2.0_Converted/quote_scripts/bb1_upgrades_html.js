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

define(['N/record', 'N/search', 'N/log', 'N/url', 'N/https', 'N/file', 'N/render', './bb1_lookup_arrays.js', './bb1_neo_details.js', './bb1_stat_details.js', './bb1_html_parser.js'],
function(record, search, log, url, https, file, render, lookupArrays, neoDetails, statDetails, htmlParser) {

    return function upgradesHTML(theCurrentRecord, tranID)
    {
            var ufhSchematic = theCurrentRecord.getValue({fieldId: 'custbody_schematic'});
            var newUpgrade = '';
            var salesEmail = theCurrentRecord.getValue({fieldId: 'custbody_sales_rep_email'});
            var salesPhone = theCurrentRecord.getValue({fieldId: 'custbody_sales_rep_phone'});




            var upgradesList = '<h2 class="row acc_trigger breakhere"><a href="#4" onclick="ga(\'send\', \'event\', \'quote\', \'Click\', \'ufh-upgrades\');"><div class="P-Header">Upgrades and Extras</div></a></h2>\n' +

            '<div class="acc_container" style="display: block; overflow: hidden;">\n' +
            '<div class="block col-sm">\n' +
            '<h3>Included in your quote</h3>\n' +
            '<div style="border:#4F5251 solid 1px; width:100%; padding-left: 8px; padding-right:8px;">\n' +
            '<br>\n' +
            '<table width="100%" border="0" style="padding-top: 0px;">\n' + 
            '<tbody>\n' +
            '<tr style="margin-bottom: 22px;">\n' + 
            '<td width="210" style="padding:0" valign="top"><img style="border:none; padding:0; margin:0;" src="/core/media/media.nl?id=14227101&amp;c=472052&amp;h=edc895c640b84f786954" alt="Standard Dial Stat" width="210" height="143"></td>\n' + 	 
            // '<td valign="top" style="padding-top:0px;"><h5 style="color: #6EC62E; margin-top: 0px; margin-bottom:0px; font-size: 14px;">Standard dial thermostat</h5>' + 
            
            // '<p>' + 
            // '<span class="stattext">A dial thermostat with 4-channel timeclock and setback facility is supplied as standard. It offers a stylish yet simple and straightforward method of controlling an underfloor heating system.' + 
            // '<br><a href="/core/media/media.nl?id=7512975&amp;c=472052&amp;h=fd0fbf341fdde385ef99" rel="lightbox[fiche]">View product fiche</a><br>' + 
            // '</span>' + 
            // '</p>' + 

            // '</td>\n' +
            '<td width="110" style="padding:0" valign="top">&nbsp;</td>\n' + 
            '</tr>\n' +

            '</tbody>\n' +
            '</table>\n' +
            '</div>\n' +
            '<br> \n';
    
            var smartHKList = '';

            var upFilters = new Array();
            upFilters[0] = search.createFilter({name: 'custrecord_ex_quote_number', join: null, operator: 'is', formula: tranID }); //Deepak Dec2018 filter
            upFilters[1] = search.createFilter({name: 'custrecord_upgrade_item_type', join: null, operator: 'is', formula: 'Upgrade' }); //Deepak Dec2018 filter
            upFilters[2] = search.createFilter({name: 'custrecord_upgrade_option_type', join: null, operator: 'is', formula: 'Upgrade' }); //Deepak Dec2018 filter
            var upColumns = new Array();
            upColumns[0] = search.createColumn({name: 'custrecord_ex_item_name'}) //Deepak Dec2018 column
            upColumns[1] = search.createColumn({name: 'custrecord_ex_item_descr'}) //Deepak Dec2018 column
            upColumns[2] = search.createColumn({name: 'custrecord_ex_discount_price'}) //Deepak Dec2018 column
            upColumns[3]= search.createColumn({name: 'custrecord_ex_discount_price', sort: search.Sort.DESC}) //Deepak Dec2018 column   

            var upSearchresults = search.create({type: 'customrecord_upgrades_and_extras', id: null, filters: upFilters, columns: upColumns});
            if (upSearchresults != null)
            {
                newUpgrade= '<h3>Thermostat Upgrades</h3><p>All prices quoted are excluding VAT.</p><div style="border:#CCCCCC thick solid; background-color:#FFFFFF;width:100%; padding-left: 8px; padding-right:8px;">\n' +
                '<table width="100%" border="0" style="padding-top: 0px;"> \n';
                
                for ( var j = 0; upSearchresults != null && j < upSearchresults.length; j++ )
                {
                    var upSearchresult = upSearchresults[ j ];		
                    var upgradeName = upSearchresult.getValue('custrecord_ex_item_name');
                    var itemDescription = upSearchresult.getValue('custrecord_ex_item_descr');
                    var upgradePrice = fixedTwoDP(upSearchresult.getValue('custrecord_ex_discount_price'));
                    var rowbgColour = "";
                    if (isEven(j) == true)
                    {
                        rowbgColour = 'bgcolor="#FFFFFF"';
                    }
                    
                    newUpgrade += '<tr> \n' +
                                   '<td width="24%" style="padding:0"><img style="border:none; padding:0" src="/core/media/media.nl?id=2487696&amp;c=472052&amp;h=aeda6485e074ccb33450" alt="Standard Dial Stat" width="110" height="110" /></td> \n' +
                                    '<td width="3%" style="padding:0">&nbsp;</td> \n' +
                                    '<td width="47%" align="center" valign="middle" style="padding:0"><img style="background:none; border:none;" src="/core/media/media.nl?id=2487699&amp;c=472052&amp;h=c39a3cb96c332d6ee642" alt="upgrade your thermostat" width="274" height="73" /></td> \n' +
                                    '<td width="2%" style="padding:0">&nbsp;</td> \n' +
                                    '<td width="24%" style="padding:0">'+lookupArrays.lu_upgrades_image[upgradeName]+'</td> \n' +
                                  '</tr> \n' +
                                  '<tr> \n' +
                                    '<td style="padding:0">Standard Dial</td> \n' +
                                    '<td style="padding:0">&nbsp;</td> \n' +
                                    '<td style="text-align: center; padding:0" valign="bottom"><span style="font-size:18px; color:#337BBD;">Total Upgrade Price: &pound;'+ upgradePrice +'</span></td> \n' +
                                    '<td style="padding:0">&nbsp;</td> \n' +
                                    '<td style="padding:0">'+lookupArrays.lu_upgrades_name[upgradeName]+'</td> \n' +
                                  '</tr> \n' +
                                  '<tr> \n' +
                                    '<td style="padding:0">&nbsp;</td> \n' +
                                    '<td style="padding:0">&nbsp;</td> \n' +
                                    '<td align="center" valign="bottom" style="padding:0">&nbsp;</td> \n' +
                                    '<td style="padding:0">&nbsp;</td> \n' +
                                    '<td style="padding:0">&nbsp;</td> \n' +
                                  '</tr>';
                }
                
                newUpgrade +='</table>\n' ;
            }
            
            var mcv;
            var ncm;
                
            var upExFilters = new Array();
            upExFilters[0] = search.createFilter({name: 'custrecord_ex_quote_number', join: null, operator: 'is', formula: tranID }); //Deepak Dec2018 filter
            upExFilters[1] = search.createFilter({name: 'custrecord_upgrade_item_type', join: null, operator: 'is', formula: 'Upgrade' }); //Deepak Dec2018 filter
            upExFilters[2] = search.createFilter({name: 'custrecord_upgrade_option_type', join: null, operator: 'is', formula: 'Extra' }); //Deepak Dec2018 filter
            var upExColumns = new Array();
            upExColumns[0] = search.createColumn({name: 'custrecord_ex_item_name'}) //Deepak Dec2018 column
            upExColumns[1] = search.createColumn({name: 'custrecord_ex_item_descr'}) //Deepak Dec2018 column
            upExColumns[2] = search.createColumn({name: 'custrecord_ex_discount_price'}) //Deepak Dec2018 column
            upExColumns[3]= search.createColumn({name: 'custrecord_ex_discount_price', sort: search.Sort.DESC}) //Deepak Dec2018 column
            var upExSearchresults = search.create({type: 'customrecord_upgrades_and_extras', id: null, filters: upExFilters, columns: upExColumns});
            if (upExSearchresults != null)
            {			
                
                
                for ( var k = 0; upExSearchresults != null && k < upExSearchresults.length; k++ )
                {
                    var upExSearchresult = upExSearchresults[ k ];		
                    var upgradeName = upExSearchresult.getValue('custrecord_ex_item_name');
                    var itemDescription = upExSearchresult.getValue('custrecord_ex_item_descr');
                    var upgradePrice = fixedTwoDP(upExSearchresult.getValue('custrecord_ex_discount_price'));
                    var rowbgColour = "";
                    if (isEven(k) == true)
                    {
                        rowbgColour = 'bgcolor="#FFFFFF"';
                    }
    
                    if (upgradeName == 'MCV3-C')
                        mcv = '<table width="100%"><tr> \n' +
                            '<td colspan="4" valign="top" style="padding:0"><span style="font-size:18px;"><strong>Central network control unit with touchscreen</strong></span></td> \n' +
                        '</tr> \n' +
                        '<tr> \n' +
                            '<td valign="top" style="padding:0"><p><img src="/core/media/media.nl?id=2487592&amp;c=472052&amp;h=8c7b1b4cbd27cdcbde25" alt="Central network control unit with touchscreen"width="110" height="110" align="right" style="border:none; float:right; background:none;padding-left:10px; padding-bottom: 10px;" />A central controller that allows editing of thermostats from one   location, including being able to copy and repeat global changes. The   console also incorporates a history function to monitor how the system   performs under different conditions.Can be used with low-voltage <a href="http://www.nu-heat.co.uk/s.nl/it.I/id.888/.f?sc=7&amp;category=40" target="_blank">pushbutton thermostat (PbL)</a> and <a href="http://www.nu-heat.co.uk/s.nl/it.I/id.892/.f?sc=7&amp;category=40" target="_blank">low-voltage touchscreen version (TsL)</a>.</p></td> \n' +
                        '</tr> \n' +
                        '<tr> \n' +
                            '<td align="right" style="padding:0"><span style="font-size:22px; color:#337BBD;">&pound;'+ upgradePrice +'</span></td> \n' +
                        '</tr></table>';
                    else if (upgradeName == 'NCMApp-C')
                        ncm = '<table width="100%"><tr> \n' +
                            '<td valign="top" style="padding:0"><span style="font-size:18px;"><strong>Internet and SMS heating control unit, App. ready</strong></span></td> \n' +
                        '</tr> \n' +
                        '<tr> \n' +
                            '<td colspan="4" valign="top" style="padding:0"><p><img src="/core/media/media.nl?id=2487694&amp;c=472052&amp;h=cbd4c4e75d438c3bbdfc" alt="Internet and SMS heating control unit - Netmonitor+"width="110" height="110" align="right" style="border:none; float:right;  background:none;padding-left:10px; padding-bottom: 10px;" />Allows the heating system to be controlled remotely via the http://www.nu-heat.co.uk/s.nl/it.I/id.883/.f?sc=7&amp;category=40" target="_blank">Nu-Heat\'s FREE Smartphone App</a>. Can be used with low-voltage <a href="http://www.nu-heat.co.uk/s.nl/it.I/id.888/.f?sc=7&amp;category=40" target="_blank">pushbutton thermostat (PbL)</a> and <a href="http://www.nu-heat.co.uk/s.nl/it.I/id.892/.f?sc=7&amp;category=40">low-voltage touchscreen version (TsL)</a>.</p>'+
                            '<p><strong>For further information on Netmonitor+ watch a <a href="http://www.nu-heat.co.uk/s.nl/it.I/id.883/.f?sc=7&amp;category=40" target="_blank">3D walk through</a>.</strong></p></td> \n' +
                        '</tr> \n' +
                        '<tr> \n' +
                            '<td align="right" style="padding:0"><span style="font-size:22px; color:#337BBD;">&pound;'+ upgradePrice +'</span></td> \n' +
                        '</tr></table>';
                }
                
                newUpgrade +='<br>\n' +
                '<table width="100%" border="0">\n' +
                    '<tr>\n' +
                        '<td colspan="3" valign="top"><span style="font-size:15px; color:#337BBD;"><strong>Please note:</strong> the options below are for use only with the low voltage upgrades (PBL &amp; TSL)</span><br />\n' +
                        '</td>\n' +
                    '</tr>\n';
                
                if (ncm && mcv)
                {
                    newUpgrade += '<tr>\n' +
                              '<td width="49%" valign="top">'+mcv+'</td>\n' +
                              '<td width="49%" valign="top">'+ncm+'</td>\n' +
                              '</tr></table></div>\n';
                }
                
            
            }
            
            if (newUpgrade && (!ncm || !mcv))
            {
                newUpgrade += '</table></div>\n';
            }
            
            
    //		{
                var SDUpgrade = '';
                var WLUpgrade = '';
                var LVUpgrade = '';
                var neoUpgrade = '';
                
                var smartUpgrade = '';
                var neoOptions = '';
                var pushButton = '';
                var lowVoltage = '';
                
                var neoStat = '';
                var smartControl = '';
                var neoStatTC = '';
                var hubPackPrice = 0;
                var hubAirPackPrice = 0;
                var neoHub = 'F';
                
                var neoAir = '';			//CJM May2016
                var neoAirHub = 'F';		//CJM May2016 Represents neoHub/neoPlug combination
                var smartControlAir = '';	//CJM May2016
                var RFSwitch = '';			//CJM May2016
                
                var neoUltra = '';				//CJM Jan2017
                var neoUltraHub = 'F';			//CJM Jan2017
                var neoUltraSmart = '';			//CJM Jan2017
                var smartControlUltra = '';	//CJM Jan2017
                var smartControlUltraAir = '';	//CJM Jan2017
                var hubUltraPackPrice = 0;	//CJM Jan2017
                var hubAirUltraPackPrice = 0;	//CJM Jan2017
                
                var smartControlPlus = '';	//CJM Jan2017
                var smartControlPlusAir = '';	//CJM Jan2017
                var neoStatPlusHub = 'F';		//CJM Jan2017
                var neoAirPlusHub = 'F';		//CJM Jan2017
                var hubStatplusPackPrice = 0;	//CJM Jan2017
    
    
                
                var PBS = ''; //Push button thermostat
                var PBR = ''; //Push button wireless thermostat
    //			var LVstats = '';//Low Voltage thermostats
                var TSL = '';
                var PBL = ''; //Push button low voltage thermostat
                var MCV3 = ''; //Touchscreen central control unit for low voltage thermostats
                
                var SDupFilters = new Array();
                SDupFilters[0] = search.createFilter({name: 'custrecord_ex_quote_number', join: null, operator: 'is', formula: tranID }); //Deepak Dec2018 filter
                SDupFilters[1] = search.createFilter({name: 'custrecord_upgrade_item_type', join: null, operator: 'is', formula: 'SDUpgrade' }); //Deepak Dec2018 filter
                var SDupColumns = new Array();
                SDupColumns[0] = search.createColumn({name: 'custrecord_ex_item_name'}) //Deepak Dec2018 column
                SDupColumns[1] = search.createColumn({name: 'custrecord_ex_item_descr'}) //Deepak Dec2018 column
                SDupColumns[2] = search.createColumn({name: 'custrecord_ex_discount_price'}) //Deepak Dec2018 column

                SDupColumns[3]= search.createColumn({name: 'custrecord_ex_discount_price', sort: search.Sort.DESC}) //Deepak Dec2018 column

                var SDupSearchresults = search.create({type: 'customrecord_upgrades_and_extras', id: null, filters: SDupFilters, columns: SDupColumns});
                if (SDupSearchresults != null)
                {	
                    SDUpgrade= '<div style="border:#4F5251 solid 1px; width:100%; padding-left: 8px; padding-right:8px;">\n' +
                        '<br><h4 style="color: #4F5251;">Mains Voltage</h4><br>\n' +
                        '<table width="100%" border="0" style="padding-top: 0px;"> \n' +
                        '<tbody>\n';
                    
                    for ( var p = 0; SDupSearchresults != null && p < SDupSearchresults.length; p++ )
                    {
                        var SDupSearchresult = SDupSearchresults[ p ];		
                        var upgradeName = SDupSearchresult.getValue('custrecord_ex_item_name');
                        var upgradePrice = fixedTwoDP(SDupSearchresult.getValue('custrecord_ex_discount_price'));
                        
                        if (upgradeName == 'NWSR-A' && neoStat == '')
                        {
                            neoStat = statDetails(upgradeName,upgradePrice);
                            hubPackPrice += parseFloat(upgradePrice);
                        }
                        if (upgradeName == 'NBSR-A' && neoStat == '')
                        {
                            neoStat = statDetails(upgradeName,upgradePrice);
                            hubPackPrice += parseFloat(upgradePrice);
                        }
                        if (upgradeName == 'neoHub-C')
                        {
                            neoHub = 'T';
                            hubPackPrice += parseFloat(upgradePrice);
                        }
                        if (upgradeName == 'neoStatW/TC-A' && neoStatTC == '')
                        {
                            neoStatTC = statDetails(upgradeName,upgradePrice);						
                        }
                        if (upgradeName == 'neoStatB/TC-A' && neoStatTC == '')
                        {
                            neoStatTC = statDetails(upgradeName,upgradePrice);						
                        }
                        if (upgradeName == 'PBS-A')
                        {
                            PBS = statDetails(upgradeName,upgradePrice);
                        }
                                            
                    }
                    if (neoHub == 'T')
                    {
                        smartControl = statDetails('neoHub-C',fixedTwoDP(hubPackPrice));
                    }
                    SDUpgrade += neoStat + smartControl + neoStatTC + PBS + '</tbody></table><br></div>\n' ;
                }
                
                
                //NEOSTAT OPTIONS
    
                var smartHKLogo =
                    '<table style="background-color:#3C3D41; padding-top:0px;" colspan="3" cellspacing="0" width="564" height="164" >\n' +
                    '<td width="215" height="30" valign="middle" style="background-color:#3C3D41;  font-size:9px; color:#FFFFFF; padding-left:30px; FONT-FAMILY: corbel, Arial, Helvetica, sans-serif;">\n' +
                    '<div><img colspan="2" align="left" valign="middle" width="90%" style="background:#3C3D41; border:#3C3D41; padding:0px;" src="/core/media/media.nl?id=14227136&amp;c=472052&amp;h=2dc28a457558a771f240&amp;_xt=.svg" /></div> \n' +
                    
                    '<td><div style="line-height:1.4;">' + 

                    '<span class="stattext" width="30%" height="50%" style="padding-left:0px; padding-bottom:0px; color:#FFFFFF; font-size:12px;">' + 
                    'Apple HomeKit technology provides an easy, secure way to control your home&rsquo;s lights, doors, thermostats, and more from your iPhone, iPad, or iPod touch. The Nu-Heat neoHub+ responds to Siri, letting you request the current temperature, set a new temperature or temperature hold and turn on/turn off standby directly from your iPhone, iPad, or iPod touch.' + 
                    '</td>\n' +

                    '</span>' + 
                    '</div></td>' + 
                    '</table><br>\n' ;
                
    
                var smartHKUpgrade = '';
                var smartHKCompatibility = '';
        
    
    
                var neoUpgFilters = new Array();
                neoUpgFilters[0] = search.createFilter({name: 'custrecord_ex_quote_number', join: null, operator: 'is', formula: tranID }); //Deepak Dec2018 filter
                neoUpgFilters[1] = search.createFilter({name: 'custrecord_upgrade_item_type', join: null, operator: 'is', formula: 'neoUpgrade' }); //Deepak Dec2018 filter
                var neoUpgColumns = new Array();
                neoUpgColumns[0] = search.createColumn({name: 'custrecord_ex_item_name'}) //Deepak Dec2018 column
                neoUpgColumns[1] = search.createColumn({name: 'custrecord_ex_item_descr'}) //Deepak Dec2018 column
                neoUpgColumns[2] = search.createColumn({name: 'custrecord_ex_discount_price'}) //Deepak Dec2018 column
                neoUpgColumns[3]= search.createColumn({name: 'custrecord_ex_discount_price', sort: search.Sort.DESC}) //Deepak Dec2018 column
                
                //CJM May2016
                log.debug('DEBUG', 'Search filters:' +neoUpgFilters+ ', Columns:' +neoUpgColumns );
                
                var neoUpgSearchresults = search.create({type: 'customrecord_upgrades_and_extras', id: null, filters: neoUpgFilters, columns: neoUpgColumns});
                if (neoUpgSearchresults != null)
                {	
                    neoUpgrade= '<div style="border:#4F5251 solid 1px; width:100%; padding-left: 8px; padding-right:8px;"> \n' +
                    '<br> \n' +
                    '<table width="100%" border="0" style="padding-top: 0px;"> \n' +
                    '<tbody>\n';
                    
                    
                    // Starts.....
                    // CJM 2017 Apple Homekit
                    
                    smartHKUpgrade= 
                    
                    '<div style="border:#4F5251 solid 1px; width:100%; padding-top: 30px; padding-left: 8px; padding-right:8px;">\n' + smartHKLogo +
                    '<div><table width="564" border="0" style="padding-top: 10px;"> \n' +
                    '<tbody>\n';
    
                    log.debug('DEBUG', 'SearchResults=' +neoUpgSearchresults.length+ ' records' );	//CJM May2016
                    
                    for ( var p = 0; neoUpgSearchresults != null && p < neoUpgSearchresults.length; p++ )
                    {
                        var neoUpgSearchresult = neoUpgSearchresults[ p ];		
                        var upgradeName = neoUpgSearchresult.getValue('custrecord_ex_item_name');
                        var upgradePrice = fixedTwoDP(neoUpgSearchresult.getValue('custrecord_ex_discount_price'));
                        
                        //Programmable neoStats
                        
                        if (upgradeName == 'NWSR-A' && neoStat == '')
                        {
                            neoStat = neoDetails(upgradeName,upgradePrice);
                            hubPackPrice += parseFloat(upgradePrice);
                        }
                        if (upgradeName == 'NBSR-A' && neoStat == '')
                        {
                            neoStat = neoDetails(upgradeName,upgradePrice);
                            hubPackPrice += parseFloat(upgradePrice);
                        }
                        if (upgradeName == 'NSSR-A' && neoStat == '')
                        {
                            neoStat = neoDetails(upgradeName,upgradePrice);
                            hubPackPrice += parseFloat(upgradePrice);
                        }
                        
                        //CJM May2016 starts..............
                        
                        //Wireless neoStats - neoAir
                        
                        log.debug('DEBUG', 'CJM May2016 - neoAir rowNumber='+p+ ', upgradeName='+upgradeName+', upgradePrice='+upgradePrice);
                        
                        if (upgradeName == 'NBBR-A' && neoAir == '')
                        {
                            neoAir = neoDetails(upgradeName,upgradePrice);
                            hubAirPackPrice += parseFloat(upgradePrice);
                        }
                        if (upgradeName == 'NWBR-A' && neoAir == '')
                        {
                            neoAir = neoDetails(upgradeName,upgradePrice);
                            hubAirPackPrice += parseFloat(upgradePrice);
                        }
                        if (upgradeName == 'NSBR-A' && neoAir == '')
                        {
                            neoAir = neoDetails(upgradeName,upgradePrice);
                            hubAirPackPrice += parseFloat(upgradePrice);
                        }
                        //CJM May2016 ends................
                    
                        if (upgradeName == 'neoHub+-C')	//(upgradeName == 'neoHub-C') CJM June2017
                        {
                            var neoStatSmart = upgradeName;	//CJM June 2017
                            neoHub = 'T';
                            hubPackPrice += parseFloat(upgradePrice);
                        }
                        
                        //neoStat - hotwater timer extra
                        
                        if (upgradeName == 'neoStatW/TC-A' && neoStatTC == '')
                        {
                            neoStatTC = neoDetails(upgradeName,upgradePrice);						
                        }
                        if (upgradeName == 'neoStatB/TC-A' && neoStatTC == '')
                        {
                            neoStatTC = neoDetails(upgradeName,upgradePrice);						
                        }
                        if (upgradeName == 'neoStatS/TC-A' && neoStatTC == '')
                        {
                            neoStatTC = neoDetails(upgradeName,upgradePrice);						
                        }
                        
                        if (upgradeName == 'neoHub+/1neoPlug-A' || upgradeName == 'neoHub+/2neoPlug-A' || upgradeName == 'neoHub+/3neoPlug-A' || upgradeName == 'neoHub+/4neoPlug-A')	// CJM June2017
                        {
                            var neoAirSmart = upgradeName;
                            neoAirHub = 'T';
                            hubAirPackPrice += parseFloat(upgradePrice);
                        }
                        
                        //RFSwitch
                        
                        if (upgradeName == 'RFSWITCH-C')
                        {
                            RFSwitch = neoDetails(upgradeName,upgradePrice);						
                        }
                        
                        // CJM Jan2017 neoUltra
                        if (upgradeName == 'neoUltraB-C' || upgradeName == 'neoUltraW-C')
                        {
                            neoUltra = 'T';
                            var ultraPrice = parseFloat(upgradePrice);
                            neoUltraSmart = upgradeName;
                        }
                    }
                    
    
                    log.debug('DEBUG', 'CJM Jan2017 - neoHub='+neoHub+ ', neoAirHub='+neoAirHub+', neoUltra='+neoUltra);
                    
                    
                    //neoStat Smart Package
                    
                    if (neoHub == 'T')
                    {
                        smartControl = neoDetails(neoStatSmart,fixedTwoDP(hubPackPrice));		// neoDetails('neoHub-C',fixedTwoDP(hubPackPrice)); //CJM June2017
                        //CJM Jan2017 adding neoUltra Smart Package
                        if (neoUltra = 'T')
                        {	
                            hubUltraPackPrice = parseFloat(hubPackPrice) + parseFloat(ultraPrice);
                            smartControlUltra = neoDetails('neoUltra+Stat',fixedTwoDP(hubUltraPackPrice));	//CJM June2017
                        }
                        log.debug('DEBUG', 'CJM Jan2017 - neoUltra='+neoUltra+ ', hubPackPrice='+hubPackPrice+', hubUltraPackPrice='+hubUltraPackPrice);
                    }
                    
                    //CJM May2016 starts.....
                    
                    if (neoAirHub == 'T')
                    {
                        smartControlAir = neoDetails(neoAirSmart,fixedTwoDP(hubAirPackPrice));
                        //CJM Jan2017 adding neoUltra Air Smart Package
                        if (neoUltra == 'T')
                        {	hubAirUltraPackPrice = parseFloat(hubAirPackPrice) + parseFloat(ultraPrice);
                            smartControlUltraAir = neoDetails('neoUltra+Air',fixedTwoDP(hubAirUltraPackPrice));	//CJM June2017
                        }
                        log.debug('DEBUG', 'CJM Jan2017 - neoUltra='+neoUltra+ ', hubPackPrice='+hubPackPrice+', hubAirUltraPackPrice='+hubAirUltraPackPrice);
                    }
                    
                    // Starts.....CJM 2017
                    neoUpgrade += neoStat + neoAir + RFSwitch + neoStatTC + '</tbody></table><br></div>\n' ;	//CJM Jan2017
                    smartHKUpgrade += smartControl + smartControlUltra + smartControlAir + smartControlUltraAir +'</tbody></table></div>\n' ;	//CJM June2017
                    
                    //Ends.......CJM Jan2017
    
                }
                
                if (smartControl)
                {
                    smartUpgrade = '<div style="border:#4F5251 solid 1px; width:100%; padding-top: 8px; padding-left: 8px; padding-right:8px;">  \n' +
                    '<br> <h4 style="color: #4F5251;">Smart control</h4>  \n' +
                    '<br> <table width="100%" border="0" style="padding-top: 0px;">   \n' +
                    '<tbody> \n' + smartControl +
                    '</tbody></table><br></div>';
                }
                
                if (neoStat || neoStatTC)
                {
                    neoOptions = '<p>&nbsp;</p> \n' +
                    '<div style="border:#4F5251 solid 1px; width:100%; padding-left: 8px; padding-right:8px;"> \n' +
                    '<br><h4 style="color: #4F5251;">neo options</h4> \n' +
                    '<br><table width="100%" border="0" style="padding-top: 0px;">  \n' +
                    '<tbody> \n' + neoStat + neoStatTC + 
                    '</tbody></table><br></div>';
                }
                
                if (PBR || PBS)
                {
                    pushButton = '<p>&nbsp;</p> \n' +
                    '<div style="border:#4F5251 solid 1px; width:100%; padding-left: 8px; padding-right:8px;"> \n' +
                    '<br><h4 style="color: #4F5251;">Push button</h4> \n' +
                    '<br><table width="100%" border="0" style="padding-top: 0px;">  \n' +
                    '<tbody> \n' + PBR + PBS + 
                    '</tbody></table><br></div>';
                }
                
                if(PBL || TSL || MCV3)
                {
                    lowVoltage = '<p>&nbsp;</p> \n' +
                    '<div style="border:#4F5251 solid 1px; width:100%; padding-left: 8px; padding-right:8px;"> \n' +
                    '<br><h4 style="color: #4F5251;">Low voltage (compatible with building management systems)</h4> \n' +
                    '<br><table width="100%" border="0" style="padding-top: 0px;">  \n' +
                    '<tbody> \n' + PBL + TSL + MCV3 +  
                    '</tbody></table><br></div>';
                }
                
                //CJM March 2016 starts...............
                
                if (neoUpgrade)
                {
                    neoUpgrade+=
                    '</table>\n'+
                    '<br>\n';
    
                }
                
                //Starts.......CJM June2017
                if (smartHKUpgrade)
                {
                    smartHKUpgrade+= '</table>\n';
                }
                //Ends..........

                var customer = theCurrentRecord.getValue({fieldId: 'entity'});
                var customerCategory = search.lookupFields({type: 'customer', id: customer, columns: 'category'});
                
                if (neoUpgSearchresults)
                {
                    smartHKList += '<h3>Smart Package Upgrades</h3><p>All prices quoted are excluding VAT and indicate the total price for upgrading all of the thermostats in your quote and adding the additional components of the smart package option chosen.</p> ' + smartHKUpgrade;	// CJM June2017
                    
                    smartHKCompatibility +=
                         '<table colspan="3" cellspacing="0" width="564">\n' +
                         '<td height="120" valign="middle" style="color:#3C3D41; FONT-FAMILY: corbel, Arial, Helvetica, sans-serif;">\n' +
                         '<div style="font-size:10px; color:#6EC62E;"><strong>Apple HomeKit Compatibility</strong></div>\n' +
                         '<span width="100%" style="padding-left:0px; font-size:8px;"><div> \n' +
                         '<p style="padding-left:0px; margin-top:0px; margin-bottom:0px; padding-bottom:0em; font-size:8px;">The neoHub+ enables the neoStat, neoAir, neoPlug &amp; neoUltra to work with HomeKit technology. See www.nu-heat.co.uk&frasl;homekit for more details.</p> \n' +
                         '<p style="padding-left:0px; margin-top:0px; margin-bottom:0px; padding-bottom:0em; font-size:8px;">To control this HomeKit-enabled accessory, iOS 9.3.2 or later is recommended.</p> \n' +
                         '<p style="padding-left:0px; margin-top:0px; margin-bottom:0px; padding-bottom:0em; font-size:8px;">Communication between the Nu-Heat neoHub+ and neoStat, neoAir, neoPlug &amp; neoUltra is secured by utilising frame-protection mechanism based on Advanced Encryption Standard (AES) with 128-bit randomly generated keys.</p>\n' +
                         '<p style="padding-left:0px; margin-top:0px; margin-bottom:0px; padding-bottom:0em; font-size:8px;">Use of the Works with Apple HomeKit logo means that an electronic accessory has been designed to connect specifically to iPod touch, iPhone, or iPad, respectively, and has been certified by the developer to meet Apple performance standards. Apple is not responsible for the operation of this device or its compliance with safety and regulatory standards. \n' +
                         'Apple, iPad, iPad Air, iPhone, and iPod touch are trademarks of Apple Inc., registered in the U.S. and other countries. HomeKit is a trademark of Apple Inc. Apple and the Apple logo are trademarks of Apple Inc., registered in the U.S. and other countries. App Store is a service mark of Apple Inc., registered in the U.S. and other countries. \n' +
                         '</p></div></span></td></table>\n' ;
                    
                                    
                    smartHKList += smartHKCompatibility + '<p><strong>Please note:</strong> Upgrade Option prices valid until point of delivery.</p></td>\n' + 
                    '</div>\n';	// CJM June2017                    
                    
                    upgradesList += 
                                    newUpgrade + 
                                    '<h3>Thermostat Upgrades</h3><p>All prices quoted are excluding VAT and indicate the total price for upgrading all of the thermostats in your quote.</p> ' + 
                                    neoUpgrade +
                                    '';
                                    
                    if (ufhSchematic != 'DHPC' && ufhSchematic != 'DHPS' && neoUltra == 'T')	//UFH for Heat Pump systems - Smart packages are not compatible
                        {
                            upgradesList += smartHKList;
                        }
                        //CJM Jun2017
                }
                else
                {
                    if (customerCategory == 'Self-builder')
                    {
                        upgradesList += newUpgrade + '<h3>Thermostat Upgrades</h3>' + smartUpgrade + neoOptions + pushButton + lowVoltage;
                    }
                    else
                    {
                        upgradesList += newUpgrade + '<h3>Thermostat Upgrades</h3>' + SDUpgrade + WLUpgrade + LVUpgrade;
                    }
                }
                        
                var cylFilters = new Array();
                cylFilters[0] = search.createFilter({name: 'custrecord_ex_quote_number', join: null, operator: 'is', formula: tranID }); //Deepak Dec2018 filter
                cylFilters[1] = search.createFilter({name: 'custrecord_upgrade_item_type', join: null, operator: 'is', formula: 'Extra' }); //Deepak Dec2018 filter
                cylFilters[2] = search.createFilter({name: 'custrecord_upgrade_option_type', join: null, operator: 'is', formula: 'CYLExtra' }); //Deepak Dec2018 filter
                var cylColumns = new Array();
                cylColumns[0] = search.createColumn({name: 'custrecord_ex_item_name'}) //Deepak Dec2018 column
                cylColumns[1] = search.createColumn({name: 'custrecord_ex_item_descr'}) //Deepak Dec2018 column
                cylColumns[2] = search.createColumn({name: 'custrecord_ex_discount_price'}) //Deepak Dec2018 column
                cylColumns[3] = search.createColumn({name: 'custrecord_ex_itemid'}) //Deepak Dec2018 column
                cylColumns[4] = search.createColumn({name: 'custrecord_ex_discount_price', sort: search.Sort.DESC}) //Deepak Dec2018 column
                var cylSearchresults = search.create({type: 'customrecord_upgrades_and_extras', id: null, filters: cylFilters, columns: cylColumns});
                if (cylSearchresults != null)
                
                {
                    var ficheText = 'The product fiche below shows technical information related to the product\'s efficiency, as required by EU legislation for energy related products.';
                    if(cylSearchresults.length > 1)
                    {
                        ficheText = 'The product fiches below show technical information related to the product\'s efficiency, as required by EU legislation for energy related products.'; 
                    }
                    
                    //Case: SUP353174
                    //starts: CJM DEC 2017 
                    var newCylinderBulletList = 
                    '<li>Lightweight duplex stainless steel construction</li>\n' +
                    '<li>High flow rates (up to 50 litre/min) with minimum pressure drops</li>\n' +
                    '<li>Pressure tested to 10bar</li>\n' +
                    '<li>Insulated in excess of the requirements of Part L, using CFC- and HCFC-free fire-retardant foam with a Global Warming Potential of 2.8, and Ozone Depletion Potential of Zero</li>\n' +
                    '<li>Smooth-walled coils for good heat transfer and low pressure drop</li>\n' +
                    '<li>Supplied complete with connection fittings, and G3 equipment comprising inlet group, tundish, temperature and pressure relief valve (factory fitted) and wholesome water expansion vessel</li>\n' +
                    '<li>Optimum connection positions at the front of the unit for ease of installation, easy access and minimal space requirements</li>\n' +
                    '<li>Connection for optional EnergyPro&reg; Hot Water Loop</li>\n' +
                    '<li>Powder-coated case</li>\n';
                    
                    upgradesList +='<br><br><h3>Mains pressure domestic hot water cylinder</h3><div style="border:#4F5251 solid 1px; width:100%; padding-left: 8px; padding-right:8px;">\n' +
                    '<table width="100%" border="0">\n' +
                    '<tbody><tr>\n' +
                    '<td colspan="3" valign="top"><img src="/core/media/media.nl?id=2969902&amp;c=472052&amp;h=b83a89a8651ebbcafd7f" alt="EnergyPro Cylinder" width="150" height="248" style="border:none; background:none; float:right; padding-left:8px; padding-bottom:8px;" />\n' +
                    '<p>Cylinders in Nu-Heat\'s EnergyPro&reg; range meet all relevant UK and European standards and are covered by a 25-year warranty:<br>\n' +
                    '<br>\n' +
                    '</p><ul>\n'+newCylinderBulletList+

                    '</ul>' + 
                    '</td>\n' +
                    '</tr>\n' +


                    '<tr>\n' +
                        '<td colspan="3" valign="top" style="padding-top:12px;">' + 
                            'For technical information and dimensions view the ' + 
                                '<a href="/core/media/media.nl?id=2974363&amp;c=472052&amp;h=5efd7bc75b6c1d1dca57&amp;_xt=.pdf&amp;ck=sk52woq-AdwU980g&amp;vid=sk52wl--Adq9B40v&amp;cktime=114313&amp;addrcountry=GB">' + 
                                    'PDF datasheet' + 
                                '</a>.\n'+
                                '<br /><br />'+ficheText+
                        '</td>\n' +
                    '</tr>\n';


                    //ends: CJM DEC 2017 
    
                    
                    for ( var l = 0; cylSearchresults != null && l < cylSearchresults.length; l++ )
                    {
                        var cylSearchresult = cylSearchresults[ l ];		
                        var upgradeName = cylSearchresult.getValue('custrecord_ex_item_name');
                        var itemDescription = cylSearchresult.getValue('custrecord_ex_item_descr');
                        var upgradePrice = fixedTwoDP(cylSearchresult.getValue('custrecord_ex_discount_price'));

                        var itemID = cylSearchresult.getValue('custrecord_ex_itemid');
                        
                        //DEEPAK2019
                        var erpClass = search.lookupFields({type: 'item', id: itemID, columns: 'custitem_erp_energy_efficiency_class'});
                        var erpStLoss = search.lookupFields({type: 'item', id: itemID, columns: 'custitem_erp_standing_loss'});
                        var erpStVolume = search.lookupFields({type: 'item', id: itemID, columns: 'custitem_erp_standing_volume'});
                        
                        upgradesList += '<tr>\n' +
                        '<td colspan="2"><h5 style="color: #6EC62E; margin-top: 0px; margin-bottom:0px; font-size: 16px;">'+ itemDescription +'</h5></td>\n' +
                        '<td width="110" rowspan="4" style="padding:0; background:url(/core/media/media.nl?id=14231217&amp;c=472052&amp;h=5cda6590ef3aef986dbe) no-repeat center top;" valign="top">' + 
                        '<center><p style="padding-left:13px; padding-right: 20px; padding-top: 15px;"><span style="font-size: 14px; color: #fff;">Upgrade price</span><br><span style="font-size: 16px;">' + 
                        '<strong>&pound;'+upgradePrice+'</strong></span></p></center></td>\n' +
                        '</tr>\n' +
                           '<tr>\n' +
                              '<td class="erpinfobox" width="200">Energy efficiency class</td>\n' +
                              '<td class="erpinfobox"><strong>'+erpClass+'</strong></td>\n' +
                            '</tr>\n' +
                            '<tr>\n' +
                              '<td class="erpinfobox">Standing loss</td>\n' +
                              '<td class="erpinfobox"><strong>'+erpStLoss+' W</strong></td>\n' +
                            '</tr>\n' +
                            '<tr>\n' +
                              '<td class="erpinfobox">Standing volume</td>\n' +
                              '<td class="erpinfobox"><strong>'+erpStVolume+' l</strong></td>\n' +
                            '</tr>\n' +
                            '<tr>\n' +
                        '<td colspan="3">&nbsp;</td>\n' +
                        '</tr>\n';
                        
                    }
                    upgradesList +=
                    '</tbody></table><br></div>\n';
                }
            
            var exFilters = new Array();
            exFilters[0] = search.createFilter({name: 'custrecord_ex_quote_number', join: null, operator: 'is', formula: tranID }); //Deepak Dec2018 filter
            exFilters[1] = search.createFilter({name: 'custrecord_upgrade_item_type', join: null, operator: 'is', formula: 'Extra' }); //Deepak Dec2018 filter
            exFilters[2] = search.createFilter({name: 'custrecord_upgrade_option_type', join: null, operator: 'is', formula: 'Extra' }); //Deepak Dec2018 filter
            var exColumns = new Array();
            exColumns[0] = search.createColumn({name: 'custrecord_ex_item_name'}) //Deepak Dec2018 column
            exColumns[1] = search.createColumn({name: 'custrecord_ex_item_descr'}) //Deepak Dec2018 column
            exColumns[2] = search.createColumn({name: 'custrecord_ex_discount_price'}) //Deepak Dec2018 column
            exColumns[3]= search.createColumn({name: 'custrecord_ex_discount_price', sort: search.Sort.DESC}) //Deepak Dec2018 column
            var exSearchresults = search.create({type: 'customrecord_upgrades_and_extras', id: null, filters: exFilters, columns: exColumns});
            if (exSearchresults != null)
            {
                upgradesList +='<br><br><h3>Customers also bought</h3>\n' +
                '<table border="0">\n' +
                    '<tr style="color:#FFF;">\n' +
                      '<td valign="top" width="70" bgcolor="#666666"><strong>Code</strong></td>\n' +
                      '<td valign="top" bgcolor="#666666"><strong>Item Description</strong></td>\n' +
                      '<td valign="top" width="65" bgcolor="#666666"><strong>Price</strong></td>\n' +
                    '</tr>\n';		
                for ( var l = 0; exSearchresults != null && l < exSearchresults.length; l++ )
                {
                    
                    var exSearchresult = exSearchresults[ l ];

                    //DEEPAK2019
                    var upgradeName = exSearchresult.getValue('custrecord_ex_item_name');
                    var itemDescription = exSearchresult.getValue('custrecord_ex_item_descr');
                    var upgradePrice = fixedTwoDP(exSearchresult.getValue('custrecord_ex_discount_price'));

                    var rowbgColour = "";
                    if (isEven(l) == true)
                    {
                        rowbgColour = 'bgcolor="#FFFFFF"';
                    }
                    if (upgradeName.search('HWL') != -1)
                    {
                        itemDescription += ' - <a href="/core/media/media.nl?id=8861578&amp;c=472052&amp;h=f7ba8bc223149b552913&amp;_xt=.pdf" target="_blank">view details</a>';
                    }
                    upgradesList +=
                            '<tr style="border-top:#F0F0F0;">\n' +
                                '<td align="left" valign="top" '+rowbgColour+'><strong>'+ upgradeName +'</strong></td>\n' +
                                '<td align="left" valign="top" '+rowbgColour+'>'+ itemDescription +'</td>\n' +
                                '<td align="left" valign="top" '+rowbgColour+'>&pound;'+ upgradePrice +'</td>\n' +
                            '</tr>\n';
                    
                }
                upgradesList +=
                '</table>\n' ;
            }
            
            var FCexFilters = new Array();
            FCexFilters[0] = search.createFilter({name: 'custrecord_ex_quote_number', join: null, operator: 'is', formula: tranID }); //Deepak Dec2018 filter
            FCexFilters[1] = search.createFilter({name: 'custrecord_upgrade_item_type', join: null, operator: 'is', formula: 'Extra' }); //Deepak Dec2018 filter
            FCexFilters[2] = search.createFilter({name: 'custrecord_upgrade_option_type', join: null, operator: 'startswith', formula: 'FCE' }); //Deepak Dec2018 filter
            var FCexColumns = new Array();
            FCexColumns[0] = search.createColumn({name: 'custrecord_ex_item_name'}) //Deepak Dec2018 column
            FCexColumns[1] = search.createColumn({name: 'custrecord_ex_item_descr'}) //Deepak Dec2018 column
            FCexColumns[2] = search.createColumn({name: 'custrecord_ex_item_price'}) //Deepak Dec2018 column
            FCexColumns[3] = search.createColumn({name: 'custrecord_ex_quantity'}) //Deepak Dec2018 column
            FCexColumns[4] = search.createColumn({name: 'custrecord_ex_item_price', sort: search.Sort.DESC}) //Deepak Dec2018 column
            var FCexSearchresults = search.create({type: 'customrecord_upgrades_and_extras', id: null, filters: FCexFilters, columns: FCexColumns});
            if (FCexSearchresults != null)
            {
                upgradesList +='<br><br><h3>Suggested for use with LoPro&reg;</h3>\n' +
                '<table border="0">\n' +
                    '<tr style="color:#FFF;">\n' +
                      '<td valign="top" width="70" bgcolor="#666666"><strong>Code</strong></td>\n' +
                      '<td valign="top" bgcolor="#666666"><strong>Item Description</strong></td>\n' +
                      '<td valign="top" width="65" bgcolor="#666666"><strong>Price <br>(per unit)</strong></td>\n' +
                    '</tr>\n';		
                for ( var m = 0; FCexSearchresults != null && m < FCexSearchresults.length; m++ )
                {
                    var FCexSearchresult = FCexSearchresults[ m ];
                    
                    //DEEPAK2019
                    var upgradeName = FCexSearchresult.getValue('custrecord_ex_item_name');
                    var itemDescription = FCexSearchresult.getValue('custrecord_ex_item_descr');
                    var upgradePrice = fixedTwoDP(FCexSearchresult.getValue('custrecord_ex_item_price'));

                    var rowbgColour = "";
                    if (isEven(m) == true)
                    {
                        rowbgColour = 'bgcolor="#FFFFFF"';
                    }
                    upgradesList +=
                            '<tr style="border-top:#F0F0F0;">\n' +
                                '<td align="left" valign="top" '+rowbgColour+'><strong>'+ upgradeName +'</strong></td>\n' +
                                '<td align="left" valign="top" '+rowbgColour+'>'+ itemDescription + handleUndefined(lookupArrays.lu_fc_upgrades_link[upgradeName])+'</td>\n' +
                                '<td align="left" valign="top" '+rowbgColour+'>&pound;'+ upgradePrice +'</td>\n' +
                            '</tr>\n';				
                }
                upgradesList +='</table>\n' ;
            }
            
            //CJM Aug2017 Start
            
            var FCAMexFilters = new Array();
            FCAMexFilters[0] = search.createFilter({name: 'custrecord_ex_quote_number', join: null, operator: 'is', formula: tranID }); //Deepak Dec2018 filter
            FCAMexFilters[1] = search.createFilter({name: 'custrecord_upgrade_item_type', join: null, operator: 'is', formula: 'Extra' }); //Deepak Dec2018 filter
            FCAMexFilters[2] = search.createFilter({name: 'custrecord_upgrade_option_type', join: null, operator: 'startswith', formula: 'FCAME' }); //Deepak Dec2018 filter
            var FCAMexColumns = new Array();
            FCAMexColumns[0] = search.createColumn({name: 'custrecord_ex_item_name'}) //Deepak Dec2018 column
            FCAMexColumns[1] = search.createColumn({name: 'custrecord_ex_item_descr'}) //Deepak Dec2018 column
            FCAMexColumns[2] = search.createColumn({name: 'custrecord_ex_item_price'}) //Deepak Dec2018 column
            FCAMexColumns[3] = search.createColumn({name: 'custrecord_ex_quantity'}) //Deepak Dec2018 column
            FCAMexColumns[4] = search.createColumn({name: 'custrecord_ex_item_price', sort: search.Sort.DESC}) //Deepak Dec2018 column
            var FCAMexSearchresults = search.create({type: 'customrecord_upgrades_and_extras', id: null, filters: FCAMexFilters, columns: FCAMexColumns});
            if (FCAMexSearchresults != null)
            {
                upgradesList +='<br><br><h3>Suggested for use with AcoustiMax&#174;</h3>\n' +
                '<table border="0">\n' +
                    '<tr style="color:#FFF;">\n' +
                      '<td valign="top" width="70" bgcolor="#666666"><strong>Code</strong></td>\n' +
                      '<td valign="top" bgcolor="#666666"><strong>Item Description</strong></td>\n' +
                      '<td valign="top" width="65" bgcolor="#666666"><strong>Price <br>(per unit)</strong></td>\n' +
                    '</tr>\n';		
                for ( var m = 0; FCAMexSearchresults != null && m < FCAMexSearchresults.length; m++ )
                {
                    var FCAMexSearchresult = FCAMexSearchresults[ m ];	

                    var upgradeName = FCAMexSearchresult.getValue('custrecord_ex_item_name');
                    var itemDescription =  FCAMexSearchresult.getValue('custrecord_ex_item_descr');
                    itemDescription =  itemDescription.replace ('Max�', '"Max"+"&#174;"');		//CJM Aug2017 replacing '�' with ASCII code for trademark
                    var upgradePrice =  fixedTwoDP(FCAMexSearchresult.getValue('custrecord_ex_item_price'));

                    var rowbgColour = "";
                    if (isEven(m) == true)
                    {
                        rowbgColour = 'bgcolor="#FFFFFF"';
                    }
                    upgradesList +=
                            '<tr style="border-top:#F0F0F0;">\n' +
                                '<td align="left" valign="top" '+rowbgColour+'><strong>'+ upgradeName +'</strong></td>\n' +
                                '<td align="left" valign="top" '+rowbgColour+'>'+ itemDescription + handleUndefined(lookupArrays.lu_fc_upgrades_link[upgradeName])+'</td>\n' +
                                '<td align="left" valign="top" '+rowbgColour+'>&pound;'+ upgradePrice +'</td>\n' +
                            '</tr>\n';				
                }
                upgradesList +='</table>\n' ; 
            }
    
            //CJM Aug2017 End
            
            upgradesList +='<p><strong>Please note:</strong> Upgrade Option prices valid until point of delivery.</p>\n' + 
            '</div></div>\n';
    
        if (!neoUpgSearchresults && !upSearchresults && !upExSearchresults && !exSearchresults && !FCexSearchresults && !newUpgrade && !SDUpgrade && !WLUpgrade && !LVUpgrade)
        {
            upgradesList = '';
            smartHKList = '';	//CJM June 2017
        }
        
        /* Ends...... */


        // var test = '';
        // try{
        //     test = htmlParser.HTMLtoXML(upgradesList);
        //     log.debug({title: 'TRY HTML PARSER', details: upgradesList});
        // }catch(ex){
        //     log.debug({title: 'CATCH HTML PARSER', details: ex});
        // }

        return upgradesList; //Deepak 2019
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

    function fixedTwoDP(number)
    {
        return parseFloat(number).toFixed(2);
    }
    

});