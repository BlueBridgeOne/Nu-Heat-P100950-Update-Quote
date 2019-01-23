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

define(['N/record', 'N/search', 'N/log', 'N/url', 'N/https', 'N/file', 'N/render', './bb1_html_parser.js'],
function(record, search, log, url, https, file, render, htmlParser) {

    return function generatePdfFileFromMarkup(quotePDF, quoteNo) { //Deepak Dec2018

        var test1 = file.create({name: 'temp1.txt', fileType: 'PLAINTEXT', contents:quotePDF, folder: 11036357, isOnline: true}); //Deepak Dec2018
        test1.save();
        
        // Render the PDF response
        var templatefile = file.load('SuiteScripts/BB1/Quote PDF Template/bb1_quote_template.txt');
        var template = templatefile.getContents();
        var renderer = render.create();

        quotePDF = quotePDF.replace(/<br>/gi, '<br/>');

        var test2 = file.create({name: 'temp2.txt', fileType: 'PLAINTEXT', contents:quotePDF, folder: 11036357, isOnline: true}); //Deepak Dec2018
        test2.save();

        try{
            template = template.replace('###REPLACE###', quotePDF);
            renderer.templateContent = template;
            
            var pdfFile = renderer.renderAsPdf();
            pdfFile.folder = 11036357;
            pdfFile.name = 'quote_' + quoteNo + '_erp.pdf';
            pdfFile.isOnline = true;
            pdfFile.save();
        }catch(exception){
            log.debug({
                title: 'PDF CREATION EXCEPTION MESSAGE',
                details: exception
            });
        }
    }    
});