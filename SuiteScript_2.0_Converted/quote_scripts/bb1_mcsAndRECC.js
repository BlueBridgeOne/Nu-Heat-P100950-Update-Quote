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

    return function mcsAndRECC(theCurrentRecord, transactionID)
    {
        var mcsRECCSection = '';
        var entityID = theCurrentRecord.getValue({fieldId: 'entity'});
        var entity = '';

        var custFilters = new Array();
        custFilters[0] = search.createFilter({name: 'internalid', join: null, operator: 'is', formula: entityID }); //Deepak Dec2018 filter

        var custColumns = new Array();
        custColumns[0] = search.createColumn({name: 'type'}) //Deepak Dec2018 column

        var custSearchresults = search.create({type: 'entity', id: null, filters: custFilters, columns: custColumns});

        log.debug('DEBUG', 'CUST SEARCH RESULTS: ' + JSON.stringify(custSearchresults)); //Deepak Dec2018

        if (custSearchresults != null)
        {
            for ( var m = 0; custSearchresults != null && m < custSearchresults.length; m++ )
            {
                var custSearchresult = custSearchresults[ m ];		
                var entityType = custSearchresult.getText('type');
                log.debug('DEBUG','entityType',entityType);
                
                if (entityType == 'Job')
                {			
                    entity = search.lookupFields({type: 'job', id: entityID, columns: 'customer'});
                }
                else
                {
                    entity = entityID;
                }
    
                            
                custCategory = search.lookupFields({type: 'customer', id: entity, columns: 'category'});
                nibeVIP = search.lookupFields({type: 'customer', id: entity, columns: 'custentity_nibe_vip'});
                mcsStatus = search.lookupFields({type: 'customer', id: entity, columns: 'custentity_mcs_status'});
                
                    //if (custCategory == 'Self-builder')
                    if (custCategory == 5)
                    {
                        mcsRECCSection = '<h2 class="row acc_trigger breakhere"><a href="#14" onclick="ga(\'send\', \'event\', \'quote\', \'Click\', \'mcs-selfbuilder\');"><div class="P-Header">Access the RHI tariff payments </div></a></h2>\n' +
                        '<div class="acc_container" style="display: block; overflow: hidden;">\n' +
                        '<div class="block col-sm">\n' +
                        '<p>Hoping to benefit from the Renewable Heat Incentive (RHI), the Government\'s scheme that helps to offset the cost of installing renewables technologies with tariff payments over a 7 year period?</p>\n' +
                        '<p>Not only are all our products MCS approved for the scheme, we also offer installer support packages with on-site commissioning so that you can use your chosen installer and still successfully qualify for the RHI.</p>\n' +
                        '<p>By choosing a support package you get complete peace of mind as Nu-Heat takes on responsibility for the installation.  And, as a member of the Renewable Energy Consumer Code, <a href="https://www.recc.org.uk/" target="_blank">RECC</a>, you also have peace of mind that Nu-Heat designs and supplies renewable systems that perform as expected.</p>\n' +
                        '<p>If your chosen installer is not MCS Registered in their own right but you want to apply for the RHI payments, ask your Account Manager for more details on how we can support your renewables installation.</p>\n' +
                        '<p>For further information on the RHI, <a href="http://www.nu-heat.co.uk/services/self-builders-renovators/rhi.html?utm_source=quote&utm_medium=email&utm_campaign=rhi" target="_blank">visit our website</a>.</p>\n' +
                        '</div></div>\n'+
    
                        //CJM Jan2017 New RECC details with T&Cs
                        '<h2 class="row acc_trigger breakhere"><a href="#15"><div class="P-Header">RECC - consumer protection you can trust</div></a></h2>\n' +
                        '<div class="acc_container" style="display: block; overflow: hidden;">\n' +
                        '<div class="block col-sm">\n' +
                        '<p><img src="/core/media/media.nl?id=14228163&c=472052&h=ba07be73cd1c44f1f74b" width="200" alt="Renewable Energy Consumer Code" style="float: right; margin-left: 10px; margin-bottom: 10px; margin-top: 0px; margin-right: 0px; border: 0;">Nu-Heat is a member of the Renewable Energy Consumer Code, RECC.  This gives you reassurance that we will always provide:</p>\n' +
                        '<p>&#10004;&nbsp;&nbsp;&nbsp;Realistic performance information and predications</p>\n' +
                        '<p>&#10004;&nbsp;&nbsp;&nbsp;Accurate quotations</p>\n' +
                        '<p>&#10004;&nbsp;&nbsp;&nbsp;Information on any warranties and grants</p>\n' +
                        '<p>&#10004;&nbsp;&nbsp;&nbsp;Installation and commissioning instructions and maintenance and service options</p>\n' +
                        '<p>&#10004;&nbsp;&nbsp;&nbsp;The right to cancel once you have placed your order. You will need to do this in writing and can use our <a href="http://files.nu-heat.co.uk/core/media/media.nl?id=10788023&c=472052&h=cef9fcec962057e7538b&_xt=.pdf" target="_blank">cancellation form</a>. For full details please see our <a href="http://files.nu-heat.co.uk/core/media/media.nl?id=102664&c=472052&h=82644df2d5439927e946&_xt=.pdf" target="_blank">terms and conditions</a>.</p>\n' +
                        '<p>For more details, visit <a href="https://www.recc.org.uk/" target="_blank">RECC</a>.</p>\n' +
                        '</div></div>\n';

                    }
                    else if (nibeVIP == 'T')
                    {
                        mcsRECCSection = '<h2 class="row acc_trigger breakhere"><a href="#14" onclick="ga(\'send\', \'event\', \'quote\', \'Click\', \'mcs-nibevip\');"><div class="P-Header">MCS support for NIBE VIPs &nbsp;&nbsp;&nbsp;<img src="/core/media/media.nl?id=14227099&c=472052&h=204d5d075e85a98c88a2" style="vertical-align: middle; margin-bottom: 3px; width: 35px; height: 35px;"></div></a></h2>\n' +
                        '<div class="acc_container" style="display: block; overflow: hidden;">\n' +
                        '<div class="block col-sm">\n' +
                        '<p>Nu-Heat\'s MCS support packages aim to cut out the laborious MCS paperwork that is required when installing a renewables system, saving you a full day per installation.</p>\n' +
                        '<p>These packages are tailored to your needs and offer a range of benefits, from a comprehensive handover pack to the option of on-site commissioning support for particularly tricky installations.</p>\n' +
                        '<p>We provide everything you need to generate the MCS certificate for the job, including:</p>\n' +
                        '<p>&#10004;&nbsp;&nbsp;&nbsp;A complete MCS compliant documentation pack</p>\n' +
                        '<p>&#10004;&nbsp;&nbsp;&nbsp;Bespoke mechanical and electrical design drawings</p>\n' +
                        '<p>&#10004;&nbsp;&nbsp;&nbsp;Heat loss and heat pump sizing calculations</p>\n' +
                        '<p>&#10004;&nbsp;&nbsp;&nbsp;User manuals</p>\n' +
                        '<p>&#10004;&nbsp;&nbsp;&nbsp;On-site and telephone support</p>\n' +
                        '<p>Ask your Account Manager for more information.</p>\n' +
                        '</div></div>\n' +
    
                        //CJM Jan2017 New RECC details with T&Cs
                        '<h2 class="row acc_trigger breakhere"><a href="#15"><div class="P-Header">RECC - consumer protection you can trust</div></a></h2>\n' +
                        '<div class="acc_container" style="display: block; overflow: hidden;">\n' +
                        '<div class="block col-sm">\n' +
                        '<p><img src="/core/media/media.nl?id=14228163&c=472052&h=ba07be73cd1c44f1f74b" width="200" alt="Renewable Energy Consumer Code" style="float: right; margin-left: 10px; margin-bottom: 10px; margin-top: 0px; margin-right: 0px; border: 0;">Nu-Heat is a member of the Renewable Energy Consumer Code, RECC.  This gives you and your customer reassurance that we will always provide:</p>\n' +
                        '<p>&#10004;&nbsp;&nbsp;&nbsp;Realistic performance information and predications</p>\n' +
                        '<p>&#10004;&nbsp;&nbsp;&nbsp;Accurate quotations</p>\n' +
                        '<p>&#10004;&nbsp;&nbsp;&nbsp;Information on any warranties and grants</p>\n' +
                        '<p>&#10004;&nbsp;&nbsp;&nbsp;Installation and commissioning instructions and maintenance and service options</p>\n' +
                        '<p>&#10004;&nbsp;&nbsp;&nbsp;The right to cancel once you have placed your order. You will need to do this in writing and can use our <a href="http://files.nu-heat.co.uk/core/media/media.nl?id=10788023&c=472052&h=cef9fcec962057e7538b&_xt=.pdf" target="_blank">cancellation form</a>. For full details please see our <a href="http://files.nu-heat.co.uk/core/media/media.nl?id=102664&c=472052&h=82644df2d5439927e946&_xt=.pdf" target="_blank">terms and conditions</a>.</p>\n' +
                        '<p>For more details, visit <a href="https://www.recc.org.uk/" target="_blank">RECC</a>.</p>\n' +
                        '</div></div>\n' ;
                    }
                    else if (mcsStatus == 'T')
                    {
                        mcsRECCSection = '<h2 class="row acc_trigger breakhere"><a href="#14" onclick="ga(\'send\', \'event\', \'quote\', \'Click\', \'mcs-yes\');"><div class="P-Header">Let us deal with MCS paperwork &nbsp;&nbsp;&nbsp;<img src="/core/media/media.nl?id=14227099&c=472052&h=204d5d075e85a98c88a2" style="vertical-align: middle; margin-bottom: 3px; width: 35px; height: 35px;"></div></a></h2>\n' +
                        '<div class="acc_container" style="display: block; overflow: hidden;">\n' +
                        '<div class="block col-sm">\n' +
                        '<p>By choosing an MCS support package you could save at least one day spent on laborious paperwork for every installation because we\'ll do it all for you.</p>\n' +
                        '<p>Tailored to your needs, we ensure that the systems you install fully comply with strict MCS standards.</p>\n' +
                        '<p>Our MCS support package includes everything you need to generate the MCS certificate, including:</p>\n' +
                        '<p>&#10004;&nbsp;&nbsp;&nbsp;A complete MCS compliant documentation pack</p>\n' +
                        '<p>&#10004;&nbsp;&nbsp;&nbsp;Bespoke mechanical and electrical design drawings</p>\n' +
                        '<p>&#10004;&nbsp;&nbsp;&nbsp;Heat loss and heat pump sizing calculations</p>\n' +
                        '<p>&#10004;&nbsp;&nbsp;&nbsp;User manuals</p>\n' +
                        '<p>&#10004;&nbsp;&nbsp;&nbsp;On-site and telephone support</p>\n' +
                        '<p>Ask your Account Manager for more information on MCS support options.</p>\n' +
                        '</div></div>\n' +
                        
                        //CJM Jan2017 New RECC details with T&Cs
                        '<h2 class="row acc_trigger breakhere"><a href="#15"><div class="P-Header">RECC - consumer protection you can trust</div></a></h2>\n' +
                        '<div class="acc_container" style="display: block; overflow: hidden;">\n' +
                        '<div class="block col-sm">\n' +
                        '<p><img src="/core/media/media.nl?id=14228163&c=472052&h=ba07be73cd1c44f1f74b" width="200" alt="Renewable Energy Consumer Code" style="float: right; margin-left: 10px; margin-bottom: 10px; margin-top: 0px; margin-right: 0px; border: 0;">Nu-Heat is a member of the Renewable Energy Consumer Code, RECC.  This gives you and your customer reassurance that we will always provide:</p>\n' +
                        '<p>&#10004;&nbsp;&nbsp;&nbsp;Realistic performance information and predications</p>\n' +
                        '<p>&#10004;&nbsp;&nbsp;&nbsp;Accurate quotations</p>\n' +
                        '<p>&#10004;&nbsp;&nbsp;&nbsp;Information on any warranties and grants</p>\n' +
                        '<p>&#10004;&nbsp;&nbsp;&nbsp;Installation and commissioning instructions and maintenance and service options</p>\n' +
                        '<p>&#10004;&nbsp;&nbsp;&nbsp;The right to cancel once you have placed your order. You will need to do this in writing and can use our <a href="http://files.nu-heat.co.uk/core/media/media.nl?id=10788023&c=472052&h=cef9fcec962057e7538b&_xt=.pdf" target="_blank">cancellation form</a>. For full details please see our <a href="http://files.nu-heat.co.uk/core/media/media.nl?id=102664&c=472052&h=82644df2d5439927e946&_xt=.pdf" target="_blank">terms and conditions</a>.</p>\n' +
                        '<p>For more details, visit <a href="https://www.recc.org.uk/" target="_blank">RECC</a>.</p>\n' +
                        '</div></div>\n' ;
                        
                    }
                    else 
                    {
                        mcsRECCSection = '<h2 class="row acc_trigger breakhere"><a href="#14" onclick="ga(\'send\', \'event\', \'quote\', \'Click\', \'mcs-no\');"><div class="P-Header">Help with MCS compliance&nbsp;&nbsp;&nbsp;<img src="/core/media/media.nl?id=14227099&c=472052&h=204d5d075e85a98c88a2" style="vertical-align: middle; margin-bottom: 3px; width: 35px; height: 35px;"></div></a></h2>\n' +
                        '<div class="acc_container" style="display: block; overflow: hidden;">\n' +
                        '<div class="block col-sm">\n' +
                        '<p>Not MCS accredited?  You can still install renewables systems that qualify for the Domestic RHI scheme by choosing a Nu-Heat MCS support package.</p>\n' +
                        '<p>We will complete all of the paperwork, conduct on-site commissioning to ensure that system installed complies with strict MCS standards and issue your customer with their MCS certificate, required to access the RHI tariff payments. </p>\n' +
                        '<p>Our comprehensive MCS support package includes:</p>\n' +
                        '<p>&#10004;&nbsp;&nbsp;&nbsp;A complete MCS compliant documentation pack with mechanical and electrical design drawings, heat loss and heat pump sizing calculations, user manuals and more</p>\n' +
                        '<p>&#10004;&nbsp;&nbsp;&nbsp;On-site system commissioning by an MCS-approved Nu-Heat engineer</p>\n' +
                        '<p>&#10004;&nbsp;&nbsp;&nbsp;On-site and telephone support</p>\n' +
                        '<p>Ask your Account Manager for more information on MCS support options.\n' +
                        '</p>\n' +
                        '</div></div>\n' +
                        
                        //CJM Jan2017 New RECC details with T&Cs
                        '<h2 class="row acc_trigger breakhere"><a href="#15"><div class="P-Header">RECC - consumer protection you can trust</div></a></h2>\n' +
                        '<div class="acc_container" style="display: block; overflow: hidden;">\n' +
                        '<div class="block col-sm">\n' +
                        '<p><img src="/core/media/media.nl?id=14228163&c=472052&h=ba07be73cd1c44f1f74b" width="200" alt="Renewable Energy Consumer Code" style="float: right; margin-left: 10px; margin-bottom: 10px; margin-top: 0px; margin-right: 0px; border: 0;">Nu-Heat is a member of the Renewable Energy Consumer Code, RECC.  This gives you and your customer reassurance that we will always provide:</p>\n' +
                        '<p>&#10004;&nbsp;&nbsp;&nbsp;Realistic performance information and predications</p>\n' +
                        '<p>&#10004;&nbsp;&nbsp;&nbsp;Accurate quotations</p>\n' +
                        '<p>&#10004;&nbsp;&nbsp;&nbsp;Information on any warranties and grants</p>\n' +
                        '<p>&#10004;&nbsp;&nbsp;&nbsp;Installation and commissioning instructions and maintenance and service options</p>\n' +
                        '<p>&#10004;&nbsp;&nbsp;&nbsp;The right to cancel once you have placed your order. You will need to do this in writing and can use our <a href="http://files.nu-heat.co.uk/core/media/media.nl?id=10788023&c=472052&h=cef9fcec962057e7538b&_xt=.pdf" target="_blank">cancellation form</a>. For full details please see our <a href="http://files.nu-heat.co.uk/core/media/media.nl?id=102664&c=472052&h=82644df2d5439927e946&_xt=.pdf" target="_blank">terms and conditions</a>.</p>\n' +
                        '<p>For more details, visit <a href="https://www.recc.org.uk/" target="_blank">RECC</a>.</p>\n' +
                        '</div></div>\n' ;
                    }
                    
                
            }
        }
        return mcsRECCSection;
    }
    
});