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

    return function printButton(theCurrentRecord, transactionID)
    {
        var quoteNumber = theCurrentRecord.getValue({fieldId: 'tranid'});
        var singleQuote = "'";
        var printButton= '<div class="hidefoot" style="float:right; padding-left:0px; padding-right:0px;">\n' +
                '<Script type="text/javascript"> \n' +
                'document.write('+singleQuote+'<a href=\"http://convertold.html2pdf.seven49.net/?urltorender='+singleQuote+'); \n' +
                'document.write(encodeURIComponent(location.href)); \n' +
                'document.write('+singleQuote+'&DisableJavaScript=1&AddLinks=1&Size=A4&usePrintMediaType=1&FooterTemplateUrl=http://www.towelrails.co.uk/html2pdf/footer.html&FileName='+singleQuote+'); \n' +
                'document.write('+singleQuote+''+quoteNumber+''+singleQuote+'); \n' +
                'document.write('+singleQuote+'"><img src="/core/media/media.nl?id=2342823&c=472052&h=f631f957b86385897aeb" style="border:none; background:none;" alt="Generate a PDF of this quotation"></a>'+singleQuote+'); \n' +
                '</script> \n' +
                '</div>  \n';
        return printButton;
    }
    
});