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

    return function notesReplace(str)
    {
        var newStr = str.replace('warranty for this heat pump please click here','warranty for this heat pump please click <A HREF="/core/media/media.nl?id=5021943&c=472052&h=66a350c69afba88ec2ac&_xt=.pdf">here</A>');
            newStr = newStr.replace('\(EnergyPro Cylinder sizing document\)','<A HREF="/core/media/media.nl?id=3027873&c=472052&h=d80272f5978592232a29&_xt=.pdf">EnergyPro Cylinder sizing document</A>');	//CJM June 2016
            newStr = newStr.replace('\(Heat Pump brochure\)','<A HREF="/core/media/media.nl?id=8073401&c=472052&h=34d237f974b8d6641ca0&_xt=.pdf">Heat Pump brochure</A>');	//CJM June 2016
            
        return newStr;
    }
    
});