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

    return function HPsystemFiche(theCurrentRecord, transactionID)
    {
        var packageClass = theCurrentRecord.getValue({fieldId: 'custbody_erp_system_heating_rating'});
        var hpFiche = '';
        
        if (packageClass)
        {
            var spaceHtgEfficiency = Math.round(theCurrentRecord.getValue({fieldId: 'custbody_erp_space_htg_efficiency_hp'}));
            var htgEfficiency = Math.round(theCurrentRecord.getValue({fieldId: 'custbody_erp_sys_htg_efficiency'}));
            var tempControl = theCurrentRecord.getValue({fieldId: 'custbody_erp_temp_control_bonus'});
            var suppEfficiency = showNA(theCurrentRecord.getValue({fieldId: 'custbody_erp_2nd_heat_src_efficiency'}));
            var suppBoiler = showZero(theCurrentRecord.getValue({fieldId: 'custbody_erp_supp_htg'}));
            var efficiencyCold = Math.round(theCurrentRecord.getValue({fieldId: 'custbody_erp_space_htg_efficiency_cold'}));
            var efficiencyWarm = Math.round(theCurrentRecord.getValue({fieldId: 'custbody_erp_space_htg_efficiency_warm'}));
            var weightingFactorII = theCurrentRecord.getValue({fieldId: 'custbody_erp_htg_weight_factorii'});
            var variationCold = theCurrentRecord.getValue({fieldId: 'custbody_erp_htg_variation_cold'});
            if (variationCold.charAt(0) != '-')
            {
                variationCold = '+ ' + variationCold;
            }
            else
            {
                variationCold = variationCold.replace('-','- ');
            }
            var variationWarm = theCurrentRecord.getValue({fieldId: 'custbody_erp_htg_variation_warm'});
            if (variationWarm.charAt(0) != '-')
            {
                variationWarm = '+ ' + variationWarm;
            }
            else
            {
                variationWarm = variationWarm.replace('-','- ');
            }
            var classaplus3 = '&#9744;';
            var classaplus2 = '&#9744;';
            var classaplus = '&#9744;';
            var classa = '&#9744;';
            var classb = '&#9744;';
            var classc = '&#9744;';
            var classd = '&#9744;';
            var classe = '&#9744;';
            var classf = '&#9744;';
            var classg = '&#9744;';
            if (packageClass == 'A+++')
            {
                classaplus3 = '&#9745;';
            }
            else if (packageClass == 'A++')
            {
                classaplus2 = '&#9745;';
            }
            else if (packageClass == 'A+')
            {
                classaplus = '&#9745;';
            }
            else if (packageClass == 'A')
            {
                classa = '&#9745;';
            }
            else if (packageClass == 'B')
            {
                classb = '&#9745;';
            }
            else if (packageClass == 'C')
            {
                classc = '&#9745;';
            }
            else if (packageClass == 'D')
            {
                classd = '&#9745;';
            }
            else if (packageClass == 'E')
            {
                classe = '&#9745;';
            }
            else if (packageClass == 'F')
            {
                classf = '&#9745;';
            }
            else if (packageClass == 'G')
            {
                classg = '&#9745;';
            }
            
            var figureThree= '<h3 class="erp">Figure 3</h3><p class="erp"><strong>For preferential heat pump space heaters and preferential heat pump combination heaters, element of the\n' +
            'fiche for a package of space heater, temperature control and solar device and a package of combination heater, temperature control and solar device, \n' +
            'respectively, indicating the seasonal space heating energy efficiency of the package offered</strong></p>      \n' +
                
              '<table width="100%" border="0" cellspacing="3" cellpadding="0">\n' +
              '<tbody>\n' +
                '<tr>\n' +
                  '<td class="erptd" colspan="4"><p><strong><span class="erpfiche">SEASONAL SPACE HEATING ENERGY EFFICIENCY OF HEAT PUMP</span></strong></p></td>\n' +
                  '<td class="erptdbox"><strong> <!-- IVa THE VALUE OF THE SEASONAL SPACE HEATING EFFICIENCY OF THE PREFERENTIAL SPACE HEATER EXPRESSED IN % --> '+spaceHtgEfficiency+' %</strong></td>\n' +
               ' </tr>\n' +
                '<tr>\n' +
                  '<td class="erptd" colspan="5" height="1" bgcolor="#4f5251"></td>\n' +
                '</tr>\n' +
                '<tr>\n' +
                  '<td class="erptd" colspan="3"><p><strong><span class="erpfiche">TEMPERATURE CONTROL</span></strong></p></td>\n' +
                  '<td class="erpsign">+</td>\n' +
                  '<td class="erptdbox"><strong> <!-- VIII From temperature control fiche --> '+tempControl+' %</strong></td>\n' +
                '</tr>\n' +
                '<tr>\n' +
                  '<td class="erptd" colspan="5" height="1" bgcolor="#4f5251"></td>\n' +
                '</tr>\n' +
                '<tr>\n' +
                  '<td class="erptd" colspan="5"><p><strong><span class="erpfiche">SUPPLEMENTARY BOILER</span></strong></p></td>\n' +
                 '</tr>\n' +
                  
                 '<tr> \n' +
                 ' <td class="erptd" colspan="3"><p>( <strong><!-- IX SEASONAL SPACE HEATING ENERGY EFFICIENCY OF THE SUPPLEMENTARY BOILER FROM THE BOILER FICHE, IN % --> '+suppEfficiency+
                 ' %</strong> - <strong><!-- IVa THE VALUE OF THE SEASONAL SPACE HEATING EFFICIENCY OF THE PREFERENTIAL SPACE HEATER EXPRESSED IN % --> '+spaceHtgEfficiency+' %</strong> ) x <strong><!-- XVII THE FACTOR FOR WEIGHTING THE HEAT OUTPUT - WEIGHTING FACTOR II PRATED FROM TABLE 6 --> '+weightingFactorII+'</strong> = </td>\n' +
                  '<td class="erpsign">-</td>\n' +
                  '<td class="erptdbox"><strong> <!-- X CALCULATED EFFECT OF SUPPLEMENTARY BOILER ON SYSTEM SPACE HEATING EFFICIENCY -->'+suppBoiler+' %</strong></td>\n' +
                '</tr>\n' +
                
                '<tr>\n' +
                  '<td class="erptd" colspan="5" height="1" bgcolor="#4f5251"></td>\n' +
                '</tr>\n' +
                
                 '<tr>\n' +
                  '<td class="erptd" colspan="5"><p><strong><span class="erpfiche">SOLAR CONTRIBUTION</span></strong></p></td>\n' +
                '</tr>\n' +
                
                  '<tr>\n' +
                  '<td class="erptd" colspan="3"><p>( <strong><!-- VALUE OF MATHEMATICAL EXPRESSION FROM TABLE 15 --> N/A %</strong> x <strong><!-- COLLECTOR SIZE IN M2 FROM SOLAR FICHE -->N/A </strong>m<sup>2</sup> + <strong><!-- VALUE OF MATHEMATICAL EXPRESSION ?? -->N/A</strong> x <strong><!-- TANK VOLUME IN M3 -->N/A </strong>m<sup>3</sup> ) x 0.45 x ( <strong><!--COLLECTOR EFFICIENCY IN %-->N/A %</strong>/100 ) x <strong><!-- TANK RATING-->N/A</strong> = </td>\n' +
                 // '<td class="erptd" colspan="3"></td>\n' +
                  '<td class="erpsign">+</td>\n' +
                  '<td class="erptdbox"><strong><!--CALCULATED EFFECT OF SOLAR CONTRIBUTION-->0 %</strong></td>\n' +
                  //'<td class="erptdbox"><strong></strong></td>\n' +
                  '</tr>\n' +
              '<tr>\n' +
                  '<td class="erptd" colspan="5" height="1" bgcolor="#4f5251"></td>\n' +
                '</tr>\n' +
                '<tr>\n' +
                  '<td class="erptd" colspan="4"><p><strong><span class="erpfiche">SEASONAL SPACE HEATING ENERGY EFFICIENCY OF PACKAGE UNDER AVERAGE CLIMATE</span></strong></p></td>\n' +
                  '<td class="erptdbox"><strong><!--VIa CALCULATED SPACE HEATING EFFIENCY OF THE PACKAGE-->'+htgEfficiency+' %</strong></td>\n' +
                '</tr>\n' +
                '<tr>\n' +
                  '<td class="erptd" colspan="5" height="1" bgcolor="#4f5251"></td>\n' +
                '</tr>\n' +
                '</tbody>\n' +
                '</table>\n' +
                '<br>\n' +
                '<table width="100%" style="border-bottom: 1px solid #4f5251;" cellspacing="2" cellpadding="0">\n' +
              '<tbody>\n' +
                '<tr>\n' +
                  '<td colspan="10" bgcolor="#6ec62e"><p><strong><span style="color: #fff;">SEASONAL SPACE HEATING ENERGY EFFICIENCY CLASS OF PACKAGE UNDER AVERAGE CLIMATE</span></strong></p></td>\n' +
                '</tr>\n' +
                '<tr>\n' +
                  '<td bgcolor="#DFDFDF"><center>'+classg+'<br>\n' +
                  '<img src="/core/media/media.nl?id=14227103&c=472052&h=c7e43498998c47f3750c" alt="G" style="padding: 0px; margin: 0px; background: none; border: 0px;"><br><span style="font-size: 12px;">&lt;30%</span></center></td>\n' +
                   '<td bgcolor="#DFDFDF"><center>'+classf+'<br>\n' +
                   '<img src="/core/media/media.nl?id=14227106&c=472052&h=777c6cb9201fd362e141" alt="F" style="padding: 0px; margin: 0px; background: none; border: 0px;"><br><span style="font-size: 12px;">&ge;30%</span></center></td>\n' +
                  '<td bgcolor="#DFDFDF"><center>'+classe+'<br>\n' +
                   '<img src="/core/media/media.nl?id=14227113&c=472052&h=69c08524ff0fe175cc2e" alt="E" style="padding: 0px; margin: 0px; background: none; border: 0px;"><br><span style="font-size: 12px;">&ge;34%</span></center></td>\n' + 
                  '<td bgcolor="#DFDFDF"><center>'+classd+'<br>\n' +
                   '<img src="/core/media/media.nl?id=14227120&c=472052&h=d374a7789898f385df7f" alt="D" style="padding: 0px; margin: 0px; background: none; border: 0px;"><br><span style="font-size: 12px;">&ge;36%</span></center></td>\n' + 
                  '<td bgcolor="#DFDFDF"><center>'+classc+'<br>\n' +
                   '<img src="/core/media/media.nl?id=14227121&c=472052&h=bfff469ea8e7191574c7" alt="C" style="padding: 0px; margin: 0px; background: none; border: 0px;"><br><span style="font-size: 12px;">&ge;75%</span></center></td>\n' +
                  '<td bgcolor="#DFDFDF"><center>'+classb+'<br>\n' +
                   '<img src="/core/media/media.nl?id=14227133&c=472052&h=b9ac637e5ea56117e11b" alt="B" style="padding: 0px; margin: 0px; background: none; border: 0px;"><br><span style="font-size: 12px;">&ge;82%</span></center></td>\n' +
                  '<td bgcolor="#DFDFDF"><center>'+classa+'<br>\n' +
                   '<img src="/core/media/media.nl?id=14227139&c=472052&h=d4db0b47b6fbaa1562c8" alt="A" style="padding: 0px; margin: 0px; background: none; border: 0px;"><br><span style="font-size: 12px;">&ge;90%</span></center></td>\n' +
                  '<td bgcolor="#DFDFDF"><center>'+classaplus+'<br>\n' +
                   '<img src="/core/media/media.nl?id=14227107&c=472052&h=75ca69cae0aa26784577" alt="A+" style="padding: 0px; margin: 0px; background: none; border: 0px;"><br><span style="font-size: 12px;">&ge;98%</span></center></td>\n' +
                  '<td bgcolor="#DFDFDF"><center>'+classaplus2+'<br>\n' +
                   '<img src="/core/media/media.nl?id=14227100&c=472052&h=140189d35f87ceb566ae" alt="A++" style="padding: 0px; margin: 0px; background: none; border: 0px;"><br><span style="font-size: 12px;">&ge;125%</span></center></td>\n' +
                  '<td bgcolor="#DFDFDF"><center>'+classaplus3+'<br>\n' +
                   '<img src="/core/media/media.nl?id=14227096&c=472052&h=363d5505cbee88fb2ed6" alt="A+++" style="padding: 0px; margin: 0px; background: none; border: 0px;"><br><span style="font-size: 12px;">&ge;150%</span></center></td>\n' +
                '</tr>\n' +
              '</tbody>\n' +
            '</table>\n' +
        
            '<br>\n' +
              '<table width="100%" border="0" cellspacing="3" cellpadding="0">\n' +
              '<tbody>\n' +
              '<tr>\n' +
                  '<td class="erptd" colspan="5" height="1" bgcolor="#4f5251"></td>\n' +
                '</tr>\n' +
                '<tr>\n' +
                  '<td class="erptd" colspan="5"><p><strong><span class="erpfiche">SEASONAL SPACE HEATING ENERGY EFFICIENCY UNDER COLDER &AMP; WARMER CLIMATE CONDITIONS</span></strong></p></td>\n' +
                '</tr>\n' +
               
                 '<tr> \n' +
                  '<td class="erptd"><p>Colder: <strong><!--VIa CALCULATED SPACE HEATING EFFICIENCY OF THE PACKAGE-->'+htgEfficiency+' %</strong> <strong><!--XVIII VALUE OF THE DIFFERENCE BETWEEN THE SEASONAL SPACE HEATING ENERGY EFFICIENCIES UNDER AVERAGE AND COLDER CLIMATE CONDITIONS, EXPRESSED IN %-->'+variationCold+'</strong> = </td>\n' +
                  '<td class="erptdbox"><strong><!--XI CALCULATED SEASONAL SPACE HEATING EFFICIENCY IN %, COLDER CLIMATE-->'+efficiencyCold+' %</strong></td>\n' +
                  '<td class="erptd" width="90">&nbsp;</td>\n' +
                  '<td class="erptd"><p>Warmer: <strong><!--VIa CALCULATED SPACE HEATING EFFIENCY OF THE PACKAGE-->'+htgEfficiency+' %</strong> <strong><!--XIX VALUE OF THE DIFFERENCE BETWEEN THE SEASONAL SPACE HEATING ENERGY EFFICIENCIES UNDER WARMER AND AVERAFE CLIMATE CONDITIONS, EXPRESSED IN %-->'+variationWarm+'</strong> = </td>\n' +
                  '<td class="erptdbox"><strong><!--XII CALCULATED SEASONAL SPACE HEATING EFFICIENCY IN %, COLDER CLIMATE-->'+efficiencyWarm+' %</strong></td>\n' +
                '</tr>\n' +
                '<tr>\n' +
                  '<td class="erptd" colspan="5" height="1" bgcolor="#4f5251"></td>\n' +
                '</tr>\n' +
                '</tbody>\n' +
                '</table>\n';
            
            var figureFive = '';
            var hwClass = theCurrentRecord.getValue({fieldId: 'custbody_erp_system_hot_water_rating'});
            if (hwClass)
            {
                var declaredLoadProf = theCurrentRecord.getValue({fieldId: 'custbody_erp_hot_water_load_profile'});
                var waterHtgEfficiency = twoDP(theCurrentRecord.getValue({fieldId: 'custbody_erp_water_htg_efficiency_hp'}));
                var dhwEfficiency = twoDP(theCurrentRecord.getValue({fieldId: 'custbody_erp_dhw_efficiency'}));
                var weightingFactorII = twoDP(theCurrentRecord.getValue({fieldId: 'custbody_erp_htg_weight_factorii'}));
                var solarBonus = Math.round(theCurrentRecord.getValue({fieldId: 'custbody_erp_solar_bonus'}));
                var waterHtgEfficiencyCold = Math.round(theCurrentRecord.getValue({fieldId: 'custbody_erp_water_htg_efficiency_cold'}));
                var waterHtgEfficiencyWarm = Math.round(theCurrentRecord.getValue({fieldId: 'custbody_erp_water_htg_efficiency_warm'}));
                var weightingFactorIII = twoDP(theCurrentRecord.getValue({fieldId: 'custbody_erp_htg_weight_factoriii'}));
            
                var loadProfM = '&#9744;';
                var loadProfL = '&#9744;';	
                var loadProfXL = '&#9744;';
                var loadProfXXL = '&#9744;';		
                if (declaredLoadProf == 'M')
                {
                    loadProfM = '&#9745;';
                }
                else if (declaredLoadProf == 'L')
                {
                    loadProfL = '&#9745;';
                }
                else if (declaredLoadProf == 'XL')
                {
                    loadProfXL = '&#9745;';
                }
                else if (declaredLoadProf == 'XXL')
                {
                    loadProfXXL = '&#9745;';
                }
                
                var HWclassaplus3 = '&#9744;';
                var HWclassaplus2 = '&#9744;';
                var HWclassaplus = '&#9744;';
                var HWclassa = '&#9744;';
                var HWclassb = '&#9744;';
                var HWclassc = '&#9744;';
                var HWclassd = '&#9744;';
                var HWclasse = '&#9744;';
                var HWclassf = '&#9744;';
                var HWclassg = '&#9744;';
                if (hwClass == 'A+++')
                {
                    HWclassaplus3 = '&#9745;';
                }
                else if (hwClass == 'A++')
                {
                    HWclassaplus2 = '&#9745;';
                }
                else if (hwClass == 'A+')
                {
                    HWclassaplus = '&#9745;';
                }
                else if (hwClass == 'A')
                {
                    HWclassa = '&#9745;';
                }
                else if (hwClass == 'B')
                {
                    HWclassb = '&#9745;';
                }
                else if (hwClass == 'C')
                {
                    HWclassc = '&#9745;';
                }
                else if (hwClass == 'D')
                {
                    HWclassd = '&#9745;';
                }
                else if (hwClass == 'E')
                {
                    HWclasse = '&#9745;';
                }
                else if (hwClass == 'F')
                {
                    HWclassf = '&#9745;';
                }
                else if (hwClass == 'G')
                {
                    HWclassg = '&#9745;';
                }
                figureFive = '<br /><br /><h3 class="erp">Figure 5</h3><p class="erp"><strong>For preferential boiler combination heaters and preferential heat pump combination heaters, element of the fiche for a package of combination heater, temperature control and solar device indicating the water heating energy efficiency of the package offered</strong></p>\n' +      
                    '<table width="100%" border="0" cellspacing="3" cellpadding="0">\n' +
                    '<tbody>\n' +
                    '<tr>\n' +
                    '<td class="erptd" colspan="4"><p><strong><span class="erpfiche">WATER HEATING ENERGY EFFICIENCY OF COMBINATION HEATER</span></strong></p></td>\n' +
                    '<td class="erptdbox"><strong> <!-- IVb THE VALUE OF THE WATER HEATING EFFICIENCY OF THE COMBINATION HEATER EXPRESSED IN % --> '+showZero(waterHtgEfficiency)+' %</strong></td>\n' +
                    '</tr>\n' +
                    '<tr>\n' +
                    '<td class="erptd" width="180">Declared load profile</td>\n' +
                    '<td class="erptdbox"><strong> <!-- III LOAD PROFILE FROM HEATER FICHE --> '+declaredLoadProf+'</strong></td>\n' +
                    '<td class="erptd" colspan="3">&nbsp;</td>\n' +
                    '</tr>\n' +
                    '<tr>\n' +
                    '<td class="erptd" colspan="5" height="1" bgcolor="#4f5251"></td>\n' +
                    '</tr>\n' +
                    '<tr>\n' +
                    '<td class="erptd" colspan="5"><p><strong><span class="erpfiche">SOLAR CONTRIBUTION</span></strong></p></td>\n' +
                    '</tr>\n' +
                    '<tr>\n' +
                    '<td class="erptd" colspan="3"><p>( 1.1 x <strong><!-- IVb THE VALUE OF THE WATER HEATING EFFICIENCY OF THE COMBINATION HEATER EXPRESSED IN % --> '+waterHtgEfficiency+' %</strong> - 10% ) x <strong><!-- XXI THE VALUE OF THE MATHEMATICAL EXPRESSION FROM TABLE 15 -->'+weightingFactorII+'</strong> - <strong><!-- XX ANOTHER VALUE OF THE MATHEMATICAL EXPRESSION FROM TABLE 15 -->'+weightingFactorIII+'</strong> -  <strong><!-- IVb THE VALUE OF THE WATER HEATING EFFICIENCY OF THE COMBINATION HEATER EXPRESSED IN % --> '+waterHtgEfficiency+' %</strong> = </td>\n' +
                    '<td class="erpsign">+</td>\n' +
                    '<td class="erptdbox"><strong><!-- XIV CALCULATED EFFECT OF SOLAR CONTRIBUTION-->'+showZero(solarBonus)+' %</strong></td>\n' +
                    '</tr>\n' +
                    '<tr>\n' +
                    '<td class="erptd" colspan="5" height="1" bgcolor="#4f5251"></td>\n' +
                    '</tr>\n' +
                    '<tr>\n' +
                    '<td class="erptd" colspan="4"><p><strong><span class="erpfiche">WATER HEATING ENERGY EFFICIENCY OF PACKAGE UNDER AVERAGE CLIMATE</span></strong></p></td>\n' +
                    '<td class="erptdbox"><strong><!--VIIa CALCULATED SPACE HEATING EFFIENCY OF THE PACKAGE--> '+showZero(dhwEfficiency)+' %</strong></td>\n' +
                    '</tr>\n' +
                    '<tr>\n' +
                    '<td class="erptd" colspan="5" height="1" bgcolor="#4f5251"></td>\n' +
                    '</tr>\n' +
                    '</tbody>\n' +
                    '</table>\n' +
                    '<br>\n' +
                    '<table width="100%" style="border-bottom: 1px solid #4f5251;" cellspacing="2" cellpadding="0">\n' +
                    '<tbody>\n' +
                    '<tr>\n' +
                    '<td colspan="11" bgcolor="#6ec62e"><p><strong><span style="color: #fff;">WATER HEATING ENERGY EFFICIENCY CLASS OF PACKAGE UNDER AVERAGE CLIMATE</span></strong></p></td>\n' +
                    '</tr>\n' +
                    '<tr>\n' +
                    '<td class="erptd" bgcolor="#DFDFDF"><center>&nbsp;</center></td>\n' +
                    '<td class="erptd" bgcolor="#DFDFDF"><center>'+HWclassg+'<br><img src="/core/media/media.nl?id=14227103&c=472052&h=c7e43498998c47f3750c" alt="G" style="float: none; padding: 0px; margin: 0px; background: none; border: 0px;"></center></td>\n' +
                    '<td class="erptd" bgcolor="#DFDFDF"><center>'+HWclassf+'<br><img src="/core/media/media.nl?id=14227106&c=472052&h=777c6cb9201fd362e141" alt="F" style="float: none; padding: 0px; margin: 0px; background: none; border: 0px;"></center></td>\n' +
                    '<td class="erptd" bgcolor="#DFDFDF"><center>'+HWclasse+'<br><img src="/core/media/media.nl?id=14227113&c=472052&h=69c08524ff0fe175cc2e" alt="E" style="float: none; padding: 0px; margin: 0px; background: none; border: 0px;"></center></td>\n' +
                    '<td class="erptd" bgcolor="#DFDFDF"><center>'+HWclassd+'<br><img src="/core/media/media.nl?id=14227120&c=472052&h=d374a7789898f385df7f" alt="D" style="float: none; padding: 0px; margin: 0px; background: none; border: 0px;"></center></td>\n' +
                    '<td class="erptd" bgcolor="#DFDFDF"><center>'+HWclassc+'<br><img src="/core/media/media.nl?id=14227121&c=472052&h=bfff469ea8e7191574c7" alt="C" style="float: none; padding: 0px; margin: 0px; background: none; border: 0px;"></center></td>\n' +
                    '<td class="erptd" bgcolor="#DFDFDF"><center>'+HWclassb+'<br><img src="/core/media/media.nl?id=14227133&c=472052&h=b9ac637e5ea56117e11b" alt="B" style="float: none; padding: 0px; margin: 0px; background: none; border: 0px;"></center></td>\n' +
                    '<td class="erptd" bgcolor="#DFDFDF"><center>'+HWclassa+'<br><img src="/core/media/media.nl?id=14227139&c=472052&h=d4db0b47b6fbaa1562c8" alt="A" style="float: none; padding: 0px; margin: 0px; background: none; border: 0px;"></center></td>\n' +
                    '<td class="erptd" bgcolor="#DFDFDF"><center>'+HWclassaplus+'<br><img src="/core/media/media.nl?id=14227107&c=472052&h=75ca69cae0aa26784577" alt="A+" style="float: none; padding: 0px; margin: 0px; background: none; border: 0px;"></center></td>\n' +
                    '<td class="erptd" bgcolor="#DFDFDF"><center>'+HWclassaplus2+'<br><img src="/core/media/media.nl?id=14227100&c=472052&h=140189d35f87ceb566ae" alt="A++" style="float: none; padding: 0px; margin: 0px; background: none; border: 0px;"></center></td>\n' +
                    '<td class="erptd" bgcolor="#DFDFDF"><center>'+HWclassaplus3+'<br><img src="/core/media/media.nl?id=14227096&c=472052&h=363d5505cbee88fb2ed6" alt="A+++" style="float: none; padding: 0px; margin: 0px; background: none; border: 0px;"></center></td>\n' +
                    '</tr>\n' +
                    '<tr>\n' +
                    '<td class="erptd" colspan="11" height="1" bgcolor="#6ec62e"></td>\n' +
                    '</tr>\n' +
                    '<tr>\n' +
                    '<td class="erptd" bgcolor="#DFDFDF" width="48">&nbsp;'+loadProfM+' <strong><span style="color: #6ec62e;">M</span></strong></td>\n' +
                    '<td class="erptd" bgcolor="#DFDFDF"><center><span style="font-size: 12px;">&lt;27%</span></center></td>\n' +
                    '<td class="erptd" bgcolor="#DFDFDF"><center><span style="font-size: 12px;">&ge;27%</span></center></td>\n' +
                    '<td class="erptd" bgcolor="#DFDFDF"><center><span style="font-size: 12px;">&ge;30%</span></center></td>\n' +
                    '<td class="erptd" bgcolor="#DFDFDF"><center><span style="font-size: 12px;">&ge;33%</span></center></td>\n' +
                    '<td class="erptd" bgcolor="#DFDFDF"><center><span style="font-size: 12px;">&ge;36%</span></center></td>\n' +
                    '<td class="erptd" bgcolor="#DFDFDF"><center><span style="font-size: 12px;">&ge;39%</span></center></td>\n' +
                    '<td class="erptd" bgcolor="#DFDFDF"><center><span style="font-size: 12px;">&ge;65%</span></center></td>\n' +
                    '<td class="erptd" bgcolor="#DFDFDF"><center><span style="font-size: 12px;">&ge;100%</span></center></td>\n' +
                    '<td class="erptd" bgcolor="#DFDFDF"><center><span style="font-size: 12px;">&ge;130%</span></center></td>\n' +
                    '<td class="erptd" bgcolor="#DFDFDF"><center><span style="font-size: 12px;">&ge;163%</span></center></td>\n' +
                    '</tr>\n' +
                    '<tr>\n' +
                    '<td class="erptd" colspan="11" height="1" bgcolor="#6ec62e"></td>\n' +
                    '</tr>		\n' +
                    '<tr>\n' +
                    '<td class="erptd" bgcolor="#DFDFDF" width="34">&nbsp;'+loadProfL+' <strong><span style="color: #6ec62e;">L</span></strong></td>\n' +
                    '<td class="erptd" bgcolor="#DFDFDF"><center><span style="font-size: 12px;">&lt;27%</span></center></td>\n' +
                    '<td class="erptd" bgcolor="#DFDFDF"><center><span style="font-size: 12px;">&ge;27%</span></center></td>\n' +
                    '<td class="erptd" bgcolor="#DFDFDF"><center><span style="font-size: 12px;">&ge;30%</span></center></td>\n' +
                    '<td class="erptd" bgcolor="#DFDFDF"><center><span style="font-size: 12px;">&ge;34%</span></center></td>\n' +
                    '<td class="erptd" bgcolor="#DFDFDF"><center><span style="font-size: 12px;">&ge;37%</span></center></td>\n' +
                    '<td class="erptd" bgcolor="#DFDFDF"><center><span style="font-size: 12px;">&ge;50%</span></center></td>\n' +
                    '<td class="erptd" bgcolor="#DFDFDF"><center><span style="font-size: 12px;">&ge;75%</span></center></td>\n' +
                    '<td class="erptd" bgcolor="#DFDFDF"><center><span style="font-size: 12px;">&ge;110%</span></center></td>\n' +
                    '<td class="erptd" bgcolor="#DFDFDF"><center><span style="font-size: 12px;">&ge;150%</span></center></td>\n' +
                    '<td class="erptd" bgcolor="#DFDFDF"><center><span style="font-size: 12px;">&ge;188%</span></center></td>\n' +
                    '</tr>\n' +
                    '<tr>\n' +
                    '<td class="erptd" colspan="11" height="1" bgcolor="#6ec62e"></td>\n' +
                    '</tr>\n' +
                    '<tr>\n' +
                    '<td class="erptd" bgcolor="#DFDFDF" width="34">&nbsp;'+loadProfXL+' <strong><span style="color: #6ec62e;">XL</span></strong></td>\n' +
                    '<td class="erptd" bgcolor="#DFDFDF"><center><span style="font-size: 12px;">&lt;27%</span></center></td>\n' +
                    '<td class="erptd" bgcolor="#DFDFDF"><center><span style="font-size: 12px;">&ge;27%</span></center></td>\n' +
                    '<td class="erptd" bgcolor="#DFDFDF"><center><span style="font-size: 12px;">&ge;30%</span></center></td>\n' +
                    '<td class="erptd" bgcolor="#DFDFDF"><center><span style="font-size: 12px;">&ge;35%</span></center></td>\n' +
                    '<td class="erptd" bgcolor="#DFDFDF"><center><span style="font-size: 12px;">&ge;38%</span></center></td>\n' +
                    '<td class="erptd" bgcolor="#DFDFDF"><center><span style="font-size: 12px;">&ge;55%</span></center></td>\n' +
                    '<td class="erptd" bgcolor="#DFDFDF"><center><span style="font-size: 12px;">&ge;80%</span></center></td>\n' +
                    '<td class="erptd" bgcolor="#DFDFDF"><center><span style="font-size: 12px;">&ge;123%</span></center></td>\n' +
                    '<td class="erptd" bgcolor="#DFDFDF"><center><span style="font-size: 12px;">&ge;160%</span></center></td>\n' +
                    '<td class="erptd" bgcolor="#DFDFDF"><center><span style="font-size: 12px;">&ge;200%</span></center></td>\n' +
                    '</tr>\n' +
                    '<tr>\n' +
                    '<td class="erptd" colspan="11" height="1" bgcolor="#6ec62e"></td>\n' +
                    '</tr>\n' +
                    '<tr>\n' +
                    '<td class="erptd" bgcolor="#DFDFDF" width="34">&nbsp;'+loadProfXXL+' <strong><span style="color: #6ec62e;">XXL</span></strong></td>\n' +
                    '<td class="erptd" bgcolor="#DFDFDF"><center><span style="font-size: 12px;">&lt;28%</span></center></td>\n' +
                    '<td class="erptd" bgcolor="#DFDFDF"><center><span style="font-size: 12px;">&ge;28%</span></center></td>\n' +
                    '<td class="erptd" bgcolor="#DFDFDF"><center><span style="font-size: 12px;">&ge;32%</span></center></td>\n' +
                    '<td class="erptd" bgcolor="#DFDFDF"><center><span style="font-size: 12px;">&ge;36%</span></center></td>\n' +
                    '<td class="erptd" bgcolor="#DFDFDF"><center><span style="font-size: 12px;">&ge;40%</span></center></td>\n' +
                    '<td class="erptd" bgcolor="#DFDFDF"><center><span style="font-size: 12px;">&ge;60%</span></center></td>\n' +
                    '<td class="erptd" bgcolor="#DFDFDF"><center><span style="font-size: 12px;">&ge;85%</span></center></td>\n' +
                    '<td class="erptd" bgcolor="#DFDFDF"><center><span style="font-size: 12px;">&ge;131%</span></center></td>\n' +
                    '<td class="erptd" bgcolor="#DFDFDF"><center><span style="font-size: 12px;">&ge;170%</span></center></td>\n' +
                    '<td class="erptd" bgcolor="#DFDFDF"><center><span style="font-size: 12px;">&ge;213%</span></center></td>\n' +
                    '</tr>\n' +
                    '</tbody>\n' +
                    '</table>\n' +
                    '<br>\n' +
                    '<table width="100%" border="0" cellspacing="3" cellpadding="0">\n' +
                    '<tbody>\n' +
                    '<tr>\n' +
                    '<td class="erptd" colspan="5" height="1" bgcolor="#4f5251"></td>\n' +
                    '</tr>\n' +
                    '<tr>\n' +
                    '<td class="erptd" colspan="5"><p><strong><span class="erpfiche">WATER HEATING ENERGY EFFICIENCY UNDER COLDER &AMP; WARMER CLIMATE CONDITIONS</span></strong></p></td>\n' +
                    '</tr>\n' +
                    '<tr> \n' +
                    '<td class="erptd"><p>Colder:</p></td>\n' +      
                    '<td class="erptd"><p><strong><!-- VIIa CALCULATED WATER HEATING EFFIENCY OF THE PACKAGE-->'+showZero(dhwEfficiency)+' %</strong> - 0.2 x <strong><!-- XIV CALCULATED SOLAR CONTRIBUTION %-->'+showZero(solarBonus)+' %</strong></p></td>\n' +      
                    '<td class="erptd" width="10"><p>=</p></td>\n' +
                    '<td class="erptdbox"><strong><!-- XV CALCULATED WATER HEATING EFFICIENCY IN %, COLDER CLIMATE-->'+showZero(waterHtgEfficiencyCold)+' %</strong></td>\n' +
                    '<td class="erptd" width="210">&nbsp;</td>\n' +
                    '</tr>\n' +
                    '<tr>\n' +
                    '<td class="erptd"><p>Warmer:</p></td>\n' +
                    '<td class="erptd"><p><strong><!-- VIIa CALCULATED WATER HEATING EFFIENCY OF THE PACKAGE-->'+showZero(dhwEfficiency)+' %</strong> + 0.4 x <strong><!-- XIV CALCULATED SOLAR CONTRIBUTION %-->'+showZero(solarBonus)+' %</strong></p></td>\n' +
                    '<td class="erptd" width="10"><p>=</p></td>\n' +
                    '<td class="erptdbox"><strong><!--XVI CALCULATED WATER HEATING EFFICIENCY IN %, COLDER CLIMATE-->'+showZero(waterHtgEfficiencyWarm)+' %</strong></td>\n' +
                    '<td class="erptd" width="210">&nbsp;</td>\n' +
                    '</tr>\n' +
                    '<tr>\n' +
                    '<td class="erptd" colspan="5" height="1" bgcolor="#4f5251"></td>\n' +
                    '</tr>\n' +
                    '</tbody></table>\n';
            }
            var ficheHPNotes = handleNull(theCurrentRecord.getValue({fieldId: 'custbody_erp_hp_comments'}));
            var ficheSolNotes = handleNull(theCurrentRecord.getValue({fieldId: 'custbody_erp_sol_comments'}));
            var ficheNotes = '';
            if (ficheHPNotes || ficheSolNotes)
            {
                ficheNotes = '<p><strong><span class="erpfiche">NOTES</span></strong></p><p><strong>'+ficheHPNotes+'<br />'+ficheSolNotes+'</strong></p>\n';
            }
            
            hpFiche = '<h2 class="row acc_trigger breakhere">Energy Label & Fiche</h2>\n' +
            '<div class="acc_container" id="fiche" style="display: block; overflow: hidden;">\n' +
            '<div class="block col-sm"><h3>System Fiche</h3><p>The package fiche below shows calculations of efficiency for the system as a whole, as required by EU legislation for energy related products.</p><br>\n' + 
            figureThree + figureFive + ficheNotes +	
            '<p>The energy efficiency of the package of products provided for in this fiche may not correspond to its actual energy efficiency once installed in a building, '+
            'as the efficiency is influenced by further factors such as heat loss in the distribution system and the dimensioning of the products in relation to building size and characteristics.</p>\n' + 
            cylinderProductFiche(theCurrentRecord, transactionID) + '</div></div>\n';
        }	
        
        return hpFiche;
    }

    function showZero(value)
    {
        if(!value){
            return '0';
        }
        else return value;
    }

    function showNA(value)
    {
        if(!value){
            return 'N/A';
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
        }
        else return value;
    }
    
});