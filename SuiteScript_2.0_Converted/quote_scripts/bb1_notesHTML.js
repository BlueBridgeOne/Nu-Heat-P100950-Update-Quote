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

define(['N/record', 'N/search', 'N/log', 'N/url', 'N/https', 'N/file', 'N/render', './bb1_notesReplace.js'],
function(record, search, log, url, https, file, render, notesReplace) {

    return function notesHTML(theCurrentRecord, transactionID)
    {   
        
        var estimatorNotes = theCurrentRecord.getValue({fieldId: 'custbody_fm_estimator_notes'});
        var salesEmail = theCurrentRecord.getValue({fieldId: 'custbody_sales_rep_email'});
        var salesPhone = theCurrentRecord.getValue({fieldId: 'custbody_sales_rep_phone'});
        if (estimatorNotes){
            estimatorNotes = notesReplace(estimatorNotes);
        }
        var htmlNotes = '';
        var mcsNotes = '';
        var customerID = theCurrentRecord.getValue({fieldId: 'entity'});
        var customer = record.load({type: 'customer', id: customerID});
        var selfBuilder = customer.getValue({fieldId: 'category'});
        if(selfBuilder == 5){
            var GDPRText = '<p align="left"><h4>Registered Installer Contact</h4></p>\n' +
            '<p align ="left">If requested, we will pass your name, address, contact details and project information to a maximum of three Nu-Heat Registered Installers in your area. This allows the installer to contact you to arrange an installation quote.</p>';
        }
        else{
            var GDPRText = '';
        }
        // CMS 12/04/18 If customer is a self builder they get to see some GDPR compliant text
        // CJM DEC2017  MCS Notes for HP & Solar quotes here - December 2017
        //Starts...
        var quoteType = theCurrentRecord.getValue({fieldId: 'custbody_quote_type'});
        var Schematic = theCurrentRecord.getValue({fieldId: 'custbody_schematic'});
        var schematicType = Schematic.indexOf("-S");
        
        
        log.debug('DEBUG', 'MCS Notes: quoteType=' +quoteType+ ', Schematic=' +Schematic+ ', schematicType=' +schematicType);
        
        if (quoteType == 8 || quoteType == 9 || quoteType == 10 || quoteType == 16) //8,9 & 10 = Heat Pumps 16 = Solar
            {
            if (quoteType == 16 )
                {
                 var mcsText = "<h5>Service and warranty</h5><br>The solar thermal system requires minimal maintenance but to ensure the continued efficient running of your solar system and guarantee in the warranty period it is recommended that it is checked and serviced annually by a qualified engineer.";
                }
            else
                if (Schematic.indexOf("-S") == -1 ) //Heat Pump only
                    {
                        var mcsText = "<h5>Service and warranty</h5><br>The NIBE heat pump requires minimal maintenance but to ensure the continued efficient running of your heat pump and guarantee in the warranty period it is recommended that it is checked and serviced annually by a qualified engineer.";
                    }
                else
                    {
                        var mcsText = "<h5>Service and warranty</h5><br>The NIBE heat pump and solar thermal system requires minimal maintenance but to ensure the continued efficient running of these technologies and guarantee in the warranty period it is recommended that it is checked and serviced annually by a qualified engineer.";
                    }
            }
        if (estimatorNotes != null && estimatorNotes != '')
            {
                if (mcsText != '')
                    {
                    // Estimator and MCS Notes
                    //estimatorNotes = estimatorNotes.replace('<h4>For Information</h4>','<h4>For Information</h4><p align="left">'+mcsText+'</p>');
                    estimatorNotes = estimatorNotes.replace('<h4>For Information</h4>','<h4>For Information</h4><br><br>'+mcsText);
                    htmlNotes = '<h2 class="row acc_trigger breakhere"><a href="#8" onclick="ga(\'send\', \'event\', \'quote\', \'Click\', \'notes\');"><div class="P-Header">Notes</div></a></h2>\n' +
                    '<div class="acc_container">\n' +
                    '<div class="block col-sm">\n' +
                            '<p align="left">The notes below are important information for you to understand in relation to this system. If you have any questions please feel free to contact me on <a href ="mailto:'+salesEmail+'">'+salesEmail+'</a> or '+salesPhone+' for further information.</p>\n' +
                            //'<p align="left">'+mcsText+'</p>\n' +
                            '<p align="left">'+estimatorNotes+'</p>\n' + GDPRText +
                            '</div></div>\n' ;
                    }
                else
                    {
                    // Estimator Notes only
                    htmlNotes = '<h2 class="row acc_trigger breakhere"><a href="#8" onclick="ga(\'send\', \'event\', \'quote\', \'Click\', \'notes\');"><div class="P-Header">Notes</div></a></h2>\n' +
                    '<div class="acc_container">\n' +
                    '<div class="block col-sm">\n' +
                            '<p align="left">The notes below are important information for you to understand in relation to this system. If you have any questions please feel free to contact me on <a href ="mailto:'+salesEmail+'">'+salesEmail+'</a> or '+salesPhone+' for further information.</p>\n' +
                            '<p align="left">'+estimatorNotes+'</p>\n' + GDPRText +
                            '</div></div>\n' ;
                    }
            }
        else if (mcsText != '')
            {
            // MCS Notes only
            htmlNotes = '<h2 class="row acc_trigger breakhere"><a href="#8" onclick="ga(\'send\', \'event\', \'quote\', \'Click\', \'notes\');"><div class="P-Header">Notes</div></a></h2>\n' +
            '<div class="acc_container">\n' +
            '<div class="block col-sm">\n' +
                    '<p align="left">The notes below are important information for you to understand in relation to this system. If you have any questions please feel free to contact me on <a href ="mailto:'+salesEmail+'">'+salesEmail+'</a> or '+salesPhone+' for further information.</p>\n' +
                    '<h4>For Information</h4><p align="left">'+mcsText+'</p>\n' + GDPRText +
            '</div></div>\n' ;
            }
        
        htmlNotes = htmlNotes.replace(/&/gi, '&amp;'); //Deepak 2019
        return htmlNotes;
    }
    
});