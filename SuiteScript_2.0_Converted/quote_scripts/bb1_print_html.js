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

    return function printHTML(theCurrentRecord, transactionID, quoteType)
    {   
        var quoteNumber = theCurrentRecord.getValue({fieldId: 'tranid'});//
        var singleQuote = "'";
        var htmlprint='<!-- to hide--><div class="hidefoot">\n' +
          '<h2 class="row acc_trigger"><a href="#11" onclick="ga(\'send\', \'event\', \'quote\', \'Click\', \'print-quote\');">Print the Quote</a></h2>\n' +
        '<div class="acc_container">\n' +
            '<div class="block col-sm">\n' +
                '<h3>Click the button to print the quote.</h3>\n' +
                //'<a href="http://convert.html2pdf.seven49.net/?urltorender=http://www.towelrails.co.uk/html2pdf/index.html&DisableJavaScript=1&AddLinks=1&Size=A4&usePrintMediaType=1&FooterTemplateUrl=http://www.towelrails.co.uk/html2pdf/footer.html&HeaderTemplateUrl=http://www.towelrails.co.uk/html2pdf/header.html&FileName='+quoteNumber+'">Create pdf </a>\n'+
                            
                '<Script type="text/javascript"> \n' +
                'document.write('+singleQuote+'<a href=\"http://convertold.html2pdf.seven49.net/?urltorender='+singleQuote+'); \n' +
                'document.write(encodeURIComponent(location.href)); \n' +
                'document.write('+singleQuote+'&DisableJavaScript=1&AddLinks=1&Size=A4&usePrintMediaType=1&FooterTemplateUrl=http://www.towelrails.co.uk/html2pdf/footer.html&FileName='+singleQuote+'); \n' +
                'document.write('+singleQuote+''+quoteNumber+''+singleQuote+'); \n' +
                'document.write('+singleQuote+'"><img src="/core/media/media.nl?id=2342823&c=472052&h=f631f957b86385897aeb" style="border:none; background:none;"></a>'+singleQuote+'); \n' +
                '</script> \n' +
                
                '<div style="visibility:hidden">  \n' +
                '<iframe name="ifr1" width="20" height="20"></iframe>  \n' +
    
                '</div>  \n' +
                '</p> \n' +
                '<div style="visibility:hidden"> \n' +
                '</div> \n' +
                '</div>\n' +
                '</div></div>\n' +
    
        '<!-- end of to hide-->\n';

        // '<NLFORM><!-- START NL FORM -->' +
        // '<NLCUSTENTITY_CO_MAILING_NAME>\n' +
        // '<NLCUSTENTITY_CO_MAILING_DEAR>\n' +
        // '<NLLEADSOURCE>\n' +
        // '</form><!-- END NL FORM -->\n' +

        return htmlprint;
    }

});