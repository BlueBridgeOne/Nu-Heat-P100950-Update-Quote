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

define(['N/record', 'N/search', 'N/log', 'N/url', 'N/https', 'N/file', 'N/render', './bb1_nextStepInlineLPM.js'],
function(record, search, log, url, https, file, render, nextStepInlineLPM) {

    return function nextStep(theCurrentRecord, transactionID)
    {
        var nextStep = '<div class="printlogo"><h2 class="row acc_trigger breakhere"><a href="#10" onclick="ga(\'send\', \'event\', \'quote\', \'Click\', \'next-step\');"><div class="P-Header" >The Next Step</div></a></h2>\n' +
        '<div class="acc_container">\n' +
        '<div class="block col-sm">\n' + nextStepInlineLPM(theCurrentRecord, transactionID,'tab') + '</div></div>\n' ;
        return nextStep;
    }
    
});