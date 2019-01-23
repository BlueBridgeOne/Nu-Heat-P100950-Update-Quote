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

    return function quoteDetailsHTML(theCurrentRecord, transactionID) {
        
        var custNumber = theCurrentRecord.getText({fieldId: 'entity'});
        custNumber = custNumber.replace(/&/gi, '&amp;' ); //Deepak 2019

        var quoteNumber = theCurrentRecord.getValue({fieldId: 'tranid'});
        var quoteDate = theCurrentRecord.getValue({fieldId: 'trandate'});

        var siteAddress = theCurrentRecord.getValue({fieldId: 'custbodyquote_site_adress'});
        var salesEmail = theCurrentRecord.getValue({fieldId: 'custbody_sales_rep_email'});
        var salesPhone = theCurrentRecord.getValue({fieldId: 'custbody_sales_rep_phone'});
        var quoteDescription = theCurrentRecord.getValue({fieldId: 'custbody_quote_description'});
        var quoteType = theCurrentRecord.getValue({fieldId: 'custbody_quote_type'});

        //Deepak 2019 - These aren't used 
        //var boilerSize = theCurrentRecord.getValue({fieldId: 'custbody_boiler_size'});
        //var validTo = theCurrentRecord.getValue({fieldId: 'duedate'});

        //Deepak 2018 - Don't need container here - because it begins at the top
        var quoteDetails = 
        '<h2 class="row acc_trigger">Quotation Summary and Price</h2>\n' +
        '<div class="acc_container">\n' +
            '<ul class="quote-details-list">' +
                '<li class="quote-details-item"> ' +
                    '<span><strong>Customer number: </strong>'+custNumber+'</span>' +
                '</li>' +
                '<li class="quote-details-item"> ' +
                    '<span><strong>Site address: </strong>'+siteAddress+'</span>' +
                '</li>' +
                '<li class="quote-details-item">' +
                    '<span><strong>Quotation number: </strong>'+quoteNumber+'</span>' +
                '</li>' +
                '<li class="quote-details-item">' +
                    '<span><strong>Quotation date: </strong>'+quoteDate+'</span>' +
                '</li>' +
                '<li class="quote-details-item">' +
                    '<span><strong>Nu-Heat contact phone: </strong>'+salesPhone+'</span>' +
                '</li>' +
                '<li class="quote-details-item">' +
                    '<span><strong>Nu-Heat contact email: </strong></span><a href="mailto:'+salesEmail+'">'+salesEmail+'</a>' +
                '</li>' +
            '</ul>';
        '</div>\n';


        if (quoteDescription)
        {
            quoteDetails +=	'<p>'+trailingCommaTrim(quoteDescription)+'</p>\n';
            if (quoteType == 16) //Solar
            {
                //if (theCurrentRecord.getValue({fieldId: 'custbody_default_values') == "1")	//CJM May 2016 - Note below not required actual property details are being used
                //{
                    
                quoteDetails +=	'<p>*Please note, this quote is based on the assumption that the solar panels will be SE/SW facing\n' + 
                    'and for a new build property, the panels will be in-roof, and for retrofit, they will be on-roof. \n' + 
                    'If your project differs from these criteria, please contact your Account Manager.</p>\n';
                //}
            }
            else if (quoteType == 9) //Air Source
            {
                quoteDetails +=	'<p>For detailed product information and specification <a href="/core/media/media.nl?id=4973758&amp;c=472052&amp;h=4c3657445d4160e46d90&amp;_xt=.pdf">click here</a>.</p> \n';
            }
        }

        return quoteDetails;
    }

    function trailingCommaTrim(str)
    { 
        var comma = new String(",");
        var s = new String(str);
        if (comma.indexOf(s.charAt(s.length-1)) != -1) 
        { 
            var i = s.length - 1; 
            while (i >= 0 && comma.indexOf(s.charAt(i)) != -1)
            i--; 
            s = s.substring(0, i+1);
        }
        return handleNull(s);
    }

    function handleNull(value)
    {
        if(!value){
            return '';
        }
        else return value;
    }

});