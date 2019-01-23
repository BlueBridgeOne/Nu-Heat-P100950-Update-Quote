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

    return function printHPDetail(theCurrentRecord, transactionID)
    {
        var EH1 = theCurrentRecord.getValue({fieldId: 'custbody_eh1'});
        var BVT3 = theCurrentRecord.getValue({fieldId: 'custbody_bvt3'});
        var LD2 = theCurrentRecord.getValue({fieldId: 'custbody_ld2'});
        var hpSchematic = theCurrentRecord.getValue({fieldId: 'custbody_schematic'});
        var dualHP = theCurrentRecord.getValue({fieldId: 'custbody_dualhp'});
        if (dualHP == 'Y'){
            EH1 = theCurrentRecord.getValue({fieldId: 'custbody_eh1'});
            BVT3 = theCurrentRecord.getValue({fieldId: 'custbody_dualhp_bvt3'});
            LD2 = theCurrentRecord.getValue({fieldId: 'custbody_dualhp_ld2'});
        }
        
        var startparag1="";
        var startparag2="";
        if (hpSchematic == 'A15' || hpSchematic == 'A16')
        {
            startparag1 = "Nu-Heat%92s heat pump sizing method follows the Microgeneration Certification Scheme%92s guideline, MIS3005. "+
                    "This requires that where the heat pump cannot cover 100%25 of the building heat load for 99%25 of the average year, then any difference must be made up by a conventional boiler.";
                    
            startparag2 = "We calculate that the chosen heat pump will be capable of providing "+EH1+"%25 of the annual energy requirement for heating, supplementary energy covering the remainder."+
                    "This is based on building fabric insulation details suppliedk to us.";
            }
        else if (hpSchematic == 'A16-S')
        {
            startparag1 = "Nu-Heat%92s heat pump sizing method follows the Microgeneration Certification Scheme%92s guideline, MIS3005. "+
                    "This requires that where the heat pump cannot cover 100%25 of the building heat load for 99%25 of the average year, then any difference must be made up by a conventional boiler.";
            
            startparag2 = "We calculate that the chosen heat pump will be capable of providing "+EH1+"%25 of the annual energy requirement for heating and hot water production, supplementary energy covering the remainder."+
                    "This is based on building fabric insulation details supplied to us.";
        }
        else
        {
            startparag1 = "Nu-Heat%92s heat pump sizing method follows the Microgeneration Certification Scheme%92s guideline, MIS3005. "+
                    "This is to ensure that the heat pump covers at least 100%25 of the building heat load for 99%25 of the average year. For this property, MIS 3005 determines a target outside air temperature of "+BVT3+"%B0C, "+  
                    "where the heat pump must provide all of the space heating without any direct electrical backup. We calculate the building heat load at "+BVT3+"%B0C outside, and 20%B0C average inside to be "+LD2+"kW based on building fabric insulation details supplied to us.";
        }
        var hpDetail = "<input name='hpdetail1' type='hidden' id='hpdetail1' value='"+startparag1+"'  /> \n"+
                    "<input name='hpdetail2' type='hidden' id='hpdetail2' value='"+startparag2+"'  /> \n";
        return hpDetail;
    }
    
});