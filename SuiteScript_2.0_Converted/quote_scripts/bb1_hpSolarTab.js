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

    return function hpSolarTab()
    {
        var solarText = '<h2 class="row acc_trigger breakhere">Solar Thermal Hot Water <strong><i>Upgrade</i></strong>\n' +
        '</h2>\n' +

        '<div class="acc_container" style="display: block; overflow: hidden;">\n' +
        '<div class="block col-sm" style="background-color: #ffffff;">\n' +
        '<div style="float: right; margin-left: 10px;"><img src="/core/media/media.nl?id=14229576&amp;c=472052&amp;h=f45229256f977bfbc6be" style="background: none; border: 0px; margin: 0; padding: 0;" /></div>\n' +
        '<p>Capture free solar energy and use it to heat domestic hot water with Nu-Heat\'s EnergyPro&reg; solar thermal panels.</p>\n' +
        '<ul><li>Produces up to 60% of annual hot water demand, up to 100% in the summer months</li>\n' +
        '<li>Quick and easy to install</li>\n' +
        '<li>MCS approved</li>\n' +
        '<li>Eligible for RHI grant - up to &pound;1,795 over 7 years</li></ul>\n' +	/* CJM 2017-5-2 old:1,540 */
        '<p>2 panel Solar Thermal In Roof systems start from &pound;1,900 +VAT. Speak to your Account Manager for a quotation.</p>\n' +
        '<p>&nbsp;</p>\n' +
        '<div style="clear:both;"></div>\n' +
        '<div style="float: right; margin-left: 10px;"><img src="/core/media/media.nl?id=14229679&amp;c=472052&amp;h=2530a0c07d716d8cca56" style="background: none; border: 0px; margin: 0; padding: 0;" /></div>\n' +								//CJM Oct2017 SUP350586 start
        '<p><strong>Considering solar in the future?</strong></p>\n' +
        '<p>Future proof your home with an EnergyPro&reg; cylinder, featuring a second coil which is ready to be linked to a solar collector system.</p>\n' +
        '<ul><li>25 year warranty</li>\n' +
        '<li>Lightweight all-stainless-steel construction</li>\n' +
        '<li>Supplied complete with connection fittings and G3 equipment</li>\n' +
        '<li>Connection positions at front of the unit for simple installation, easy access and minimal space requirements</li>\n' +
        '<li>Starting from &pound;939+VAT</li></ul>\n' +
        '<p>&nbsp;</p>\n' +																																//CJM Oct2017 SUP350586 end
        
        '</div></div>\n';
        
        return solarText;
    }
    
});