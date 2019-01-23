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

define(['N/record', 'N/search', 'N/log', 'N/url', 'N/https', 'N/file', 'N/render', './bb1_floorConCheck.js'],
function(record, search, log, url, https, file, render, floorConCheck) {

    return function nextStepInlineLPM(theCurrentRecord, transactionID, origin)
    {
        var salesEmail = theCurrentRecord.getValue({fieldId: 'custbody_sales_rep_email'});
        var salesPhone = theCurrentRecord.getValue({fieldId: 'custbody_sales_rep_phone'});
        var depositTxt = '';
        
        var estimatedDeposit = twoDP(theCurrentRecord.getValue({fieldId: 'custbody_deposit'}));
        var customerID = theCurrentRecord.getValue({fieldId: 'entity'});
        var customerCategory = search.lookupFields({type: 'customer', id: customerID, columns: 'category'});
        var FCparagraph = '';
        if (customerCategory == 'Self-builder'){
            depositTxt = '<p><strong>All we need is a deposit of 20% of your quote price (inc VAT).</strong></p>\n';
            }
        if (origin == 'tab')
        {
            if (floorConCheck(theCurrentRecord, transactionID, 'LoProMax Floors') != -1)
            {
                FCparagraph = '\n<h4>Please check your floor levels</h4>  \n' +
                '<p>The quantity of LoPro&reg;QuickSet self-levelling compound in this quote is calculated based on the floors being level within a tolerance of +/- 2.5mm.</p> \n' +
                '<p>If floor levels are outside of this tolerance, please advise your Account Manager of any additional self-levelling compound requirements so that we can ' + 
                'include sufficient compound for your install as part of your delivery.</p>' + 
                '<p>Our <a href="http://www.nu-heat.co.uk/products/retrofit-ufh/lopromax/complete-package/#quicksettable">LoPro&reg;QuickSet Ready Reckoner</a> can help ' + 
                'you to calculate your requirements.</p> \n' +
                '<p>Any additional LoPro&reg;QuickSet requested after the initial order has been placed will be subject to a delivery charge. </p>';
            }
        }
        
        var nextStep=
        '<div style="border:#4F5251 solid 1px; width:100%; padding-left: 8px; padding-right:8px; background-color: #fff;"><br>\n' +


            '<h3>What\'s Next?</h3>\n' +
            '<h4>Place your order now</h4>\n' +
            '<p>To place your order please contact me on:</p>\n' +


            '<p style="line-height: 20px;">'+

            '<img src="/core/media/media.nl?id=14227094&amp;=472052&amp;=c59a82774ebc5b4f62ff" style="float: none; background: none; margin: 0px; border: 0px; vertical-align: middle;" />'+

            '&nbsp;&nbsp;<span class="contactdetails">'+salesPhone+'</span> or email '+

            '<img src="/core/media/media.nl?id=14227138&amp;=472052&amp;=e266a92b3f540c261543" style="float: none; background: none; margin: 0px; border: 0px; vertical-align: middle;" />'+

            '&nbsp;&nbsp;<span class="contactdetails">'+
            salesEmail +
            '</span>'+

            '</p>\n' +

            depositTxt+


            '<br><h4>Design</h4>\n' +
            '<p>On confirming your order, Nu-Heat will complete a thorough design process resulting in detailed CAD layouts, manifold locations and wiring diagrams. In busy periods, our design process can take up to three weeks, although we always do our best to design systems as quickly as possible. Please contact us in good time to ensure that we can meet your project deadlines.</p>\n' +
            '<br><h4>Ask questions or make changes</h4>\n' +
            '<p>If you wish to discuss any aspect of your quote, add upgrades or make any other changes, please contact me on:</p>\n' +


            '<p style="line-height: 20px;">'+

            '<img src="/core/media/media.nl?id=14227094&amp;=472052&amp;=c59a82774ebc5b4f62ff" style="float: none; background: none; margin: 0px; border: 0px; vertical-align: middle;" />'+

            '&nbsp;&nbsp;<span class="contactdetails">'+
            salesPhone+
             '</span> or email <img src="/core/media/media.nl?id=14227138&amp;=472052&amp;=e266a92b3f540c261543" style="float: none; background: none; margin: 0px; border: 0px; vertical-align: middle;" />'+
            


            '&nbsp;&nbsp;<span class="contactdetails">'+

            salesEmail+
            
            '</span></p>\n' +
            
            
            '<p style="border-bottom: 1px dashed #ccc;">&nbsp;</p>\n' + FCparagraph +


            '<br/></div>\n';
    
        return nextStep
    }

    function twoDP(number)
    {
        return Math.round(number*100)/100;
    }
    
});