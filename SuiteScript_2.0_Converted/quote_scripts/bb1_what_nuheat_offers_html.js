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

    return function whatNuHeatOffersHTML(theCurrentRecord, transaction)
    {
        var recId = theCurrentRecord.getValue({fieldId: 'opportunity'});
        var entityId = theCurrentRecord.getValue({fieldId: 'entity'});
        var custCategory = search.lookupFields({type: 'customer', id: entityId, columns: 'category'})
        var OffersDetails;
        
        log.debug('DEBUG', 'What Nu-Heat Offers..... transaction:' +transaction+ ', Customer Category:' +custCategory+ ',  recID:'+recId+ ', Entity:' +entityId);
        
        //-----------------------------------HOMEOWNER--------------------------------------------
        if (custCategory == 16 || custCategory == 5)
        {
            OffersDetails = //'<div class="container-quote">\n' +
            '<h2 class="row acc_trigger breakhere"><a href="#14" onclick="ga(\'send\', \'event\', \'quote\', \'Click\', \'nu-heat-offers\');"></a><div class="P-Header"><a href="#14" onclick="ga(\'send\', \'event\', \'quote\', \'Click\', \'mcs-no\');">What Nu-Heat offers you</a></div></h2> \n' +
                '<div class="acc_container" style="display: block; overflow: hidden;"> \n' +
                    '<div class="block col-sm"> \n' +
                        '<h4>Bespoke, efficient heating solutions, designed by the experts</h4> \n' +
                            '<p>A fully designed heating system is unique to your property, giving you complete confidence that the solution will be efficient and perform as required, even in the coldest winter months.</p> \n' +
                            '<p>Nu-Heat works with you to create a heating solution tailored to your project and needs.  Our experienced team offer a precise design service, assessing each room that will be heated, together with usable space and chosen floor finishes, to identify the most suitable system.  This process ensures the best outputs and an even heat distribution from your underfloor heating.</p> \n' +'<p>By creating a design that is unique to the property, you will have complete confidence that the solution will be efficient and perform as required, even in the coldest winter months. </p> \n' +
                            '<p style="border-bottom: 1px dashed #ccc; font-size: 2px;">&nbsp;</p> \n' +
                        '<h4><br>Supplying the very best</h4> \n' +
                            '<div style="float: right; margin-right: 0px; padding-right: 0px;"><img src="/core/media/media.nl?id=14227122&c=472052&h=1b4cc9d3fe52430af0e3" width="130" alt="50 year pipe guarantee" style="margin-right: 0px; margin-bottom: 0px; border: 0px; margin-top: 30px;"></div> \n' +
                            '<p>Nu-Heat uses high quality, dependable products for every system we design and supply. </p> \n' +
                            '<ul style="line-height: 1.6;"> \n' +
                            '<li>From manifolds to controls, all underfloor heating and renewables systems are supplied to specification with a full set of tried-and-tested components</li> \n' +
                            '<li>Our suppliers are carefully selected European manufacturers who work to recognised EU standards</li></ul> \n' +
                            '<p>Our unique system range makes underfloor heating an option for new build and renovation projects, having been developed by our in-house Product Development Team to solve a range of tricky installation situations without compromising on system quality or performance. You can rest assured that we never cut corners.</p> \n' +
                            '<p style="border-bottom: 1px dashed #ccc; font-size: 2px;">&nbsp;</p> \n' +
                        '<h4><br>Unbeatable expertise</h4> \n' +
                            '<p>Nu-Heat is one of the most established specialised suppliers of warm water underfloor heating and renewables in the country, having been founded in 1992. Aside from high-quality, tried-and-tested systems, we are also pleased to offer you the very best expertise through our team of Account Managers, Designers, and Technical Support. Our staff have many years of experience in the plumbing and heating industry.</p>  \n' +
                            '<p>Our core values include offering the best system design, innovative products, unbeatable expertise and superior customer service, and we are proud members of the Institute of Customer Service.</p> \n' +
                            //'<p><img src="/core/media/media.nl?id=14228164&c=472052&h=ade65c13e9d60ae659b0" height="46" alt="Institute of Customer Service member" style="float: left; margin-right: 8px; border:0;"> <img src="/core/media/media.nl?id=14228163&c=472052&h=ba07be73cd1c44f1f74b" height="42" alt="Renewable Energy Consumer Code" style="float: left; margin-right: 8px; border:0;"> <img "/core/media/media.nl?id=14228162&c=472052&h=89b0d2387f085e34463e"2016/beama-underfloor.png" height="46" alt="beama underfloor logo" style="float: left; margin-right: 8px; border:0;"> <img src="/2016/gshp-association-logo.png" height="46" alt="GSHP association logo" style="float: left; margin-right: 8px; border:0;"></p> \n' +	//CJM June2016
                            '<p><img src="/core/media/media.nl?id=14228164&c=472052&h=ade65c13e9d60ae659b0" height="46" alt="Institute of Customer Service member" style="float: left; margin-right: 8px; border:0;"> <img src="/core/media/media.nl?id=14228163&c=472052&h=ba07be73cd1c44f1f74b" height="42" alt="Renewable Energy Consumer Code" style="float: left; margin-right: 8px; border:0;"> <img src="/core/media/media.nl?id=14228162&c=472052&h=89b0d2387f085e34463e" height="46" alt="beama underfloor logo" style="float: left; margin-right: 8px; border:0;"> </p> \n' +	//CJM June2016
                    '</div> \n' +
                '</div> \n';
            
        }
        
        //-----------------------------------INSTALLERS AND CONTRACTORS--------------------------------------------
        
        if (custCategory == 6 || custCategory == 7 || custCategory == 10 || custCategory == 15 || custCategory == 17)
        {
            OffersDetails = //'<div class="container-quote">\n' +
            '<h2 class="row acc_trigger breakhere"><a href="#14" onclick="ga(\'send\', \'event\', \'quote\', \'Click\', \'nu-heat-offers\');"></a><div class="P-Header"><a href="#14" onclick="ga(\'send\', \'event\', \'quote\', \'Click\', \'mcs-no\');">What Nu-Heat offers you</a></div></h2> \n' +
            '<div class="acc_container" style="display: block; overflow: hidden;"> \n' +
                '<div class="block col-sm"> \n' +
                    '<h4>Giving you and your customer complete peace of mind</h4> \n' +
                        '<p>This Nu-Heat system includes a bespoke system design and detailed set up information as standard. Our precise design service assesses each room that will be heated, together with usable space and chosen floor finishes, to identify the most suitable floor construction. </p> \n' +
                        '<p>By creating a design that is unique to the property, you have complete confidence that the solution you are installing will offer the best output with an even heat distribution, even in the coldest winter months.</p> \n' +
                        '<p style="border-bottom: 1px dashed #ccc; font-size: 2px;">&nbsp;</p> \n' +
                    '<h4><br>Simple installation</h4> \n' +
                        '<p>We work with you to make installation as straightforward as possible. Every Nu&#8209;Heat fully&#8209;designed system comes with detailed drawings and award-winning manuals as standard.</p> \n' +
                        '<div style="float: right; margin-right: 0px; padding-right: 0px;"><img src="/core/media/media.nl?id=14227116&c=472052&h=ae800ab4fbfc0b4c6fa3" width="200" alt="Installing underfloor heating" style="margin-right: 0px; margin-bottom: 0px;"></div> \n' +
                            '<p>You can expect us to provide you with:</p> \n' +
                                '<ul style="line-height: 1.6;"> \n' +
                                '<li>Flow and return pipework sizing and flow rates</li> \n' +
                                '<li>Comprehensive electrical and wiring diagrams</li> \n' +
                                '<li>Manifold locations</li> \n' +
                                '<li>High quality, tried-and-tested components</li> \n' +
                                '<li>Tube layout drawings</li></ul> \n' +
                            '<p>For heat pump and solar thermal systems, we also provide complete MCS support packages, supplying you with a comprehensive handover pack and the option of on-site commissioning. </p> \n' +
                            '<p style="border-bottom: 1px dashed #ccc; font-size: 2px;">&nbsp;</p> \n' +
                    '<h4><br>Expert technical support</h4> \n' +
                        '<p>Any competent installer can work with our systems, even if you are completely new to UFH. Our team are always here to offer you support before, during and after the system installation.</p>  \n' +
                            '<ul style="line-height: 1.6;"> \n' +
                            '<li>Your Technical Account Manager can provide valuable advice during the early stages of a project, helping to suggest the most suitable and efficient solution</li> \n' +
                            '<li>The Technical Support Team is always to hand to help with any installation queries or aftercare support should you need it</li> \n' +
                            '<li>Site visits are available for particularly tricky projects</li></ul> \n' +
                        '<p style="border-bottom: 1px dashed #ccc; font-size: 2px;">&nbsp;</p> \n' +
                    '<h4><br>Proud of our reputation</h4> \n' +
                        '<p>Nu-Heat is one of the most established specialised suppliers of warm water underfloor heating and renewables in the country, having been founded in 1992. Since then, we have introduced some of the most innovative systems to the market and we continue to work closely with our customers to provide bespoke heating solutions for every type of project.</p> \n' +
                        '<p>Our core values of offering the best system design, innovative products, unbeatable expertise and superior customer service are just as important today and we are proud members of the Institute of Customer Service.</p> \n' +
                        //'<p><img src="/core/media/media.nl?id=14228164&c=472052&h=ade65c13e9d60ae659b0" height="46" alt="Institute of Customer Service member" style="float: left; margin-right: 8px; border:0;"> <img src="/core/media/media.nl?id=14228163&c=472052&h=ba07be73cd1c44f1f74b" height="42" alt="Renewable Energy Consumer Code" style="float: left; margin-right: 8px; border:0;"> <img src="/core/media/media.nl?id=14228162&c=472052&h=89b0d2387f085e34463e" height="46" alt="beama underfloor logo" style="float: left; margin-right: 8px; border:0;"> <img src="/2016/gshp-association-logo.png" height="46" alt="GSHP association logo" style="float: left; margin-right: 8px; border:0;"></p> \n' +	CJM June2016
                        '<p><img src="/core/media/media.nl?id=14228164&c=472052&h=ade65c13e9d60ae659b0" height="46" alt="Institute of Customer Service member" style="float: left; margin-right: 8px; border:0;"> <img src="/core/media/media.nl?id=14228163&c=472052&h=ba07be73cd1c44f1f74b" height="42" alt="Renewable Energy Consumer Code" style="float: left; margin-right: 8px; border:0;"> <img src="/core/media/media.nl?id=14228162&c=472052&h=89b0d2387f085e34463e" height="46" alt="beama underfloor logo" style="float: left; margin-right: 8px; border:0;"> </p> \n' +	//CJM June2016 					
                '</div> \n' +
            '</div> \n' ;
            }
    
        
        //-----------------------------ARCHITECTS AND SPECIFIERS-------------------------
        
        if (custCategory == 8 || custCategory == 11 || custCategory == 12 || custCategory == 13 || custCategory == 14)
        {
            OffersDetails = //'<div class="container-quote">\n' +
            '<h2 class="row acc_trigger breakhere"><a href="#14" onclick="ga(\'send\', \'event\', \'quote\', \'Click\', \'nu-heat-offers\');"></a><div class="P-Header"><a href="#14" onclick="ga(\'send\', \'event\', \'quote\', \'Click\', \'mcs-no\');">What Nu-Heat offers you</a></div></h2> \n' +
                '<div class="acc_container" style="display: block; overflow: hidden;"> \n' +
                    '<div class="block col-sm"> \n' +
                        '<h4>Expert advice and specification support</h4> \n' +
                            '<div style="float: right; margin-right: 0px; padding-right: 0px;"><img src="/core/media/media.nl?id=14227135&c=472052&h=c26d0e28d2c406eb70aa" width="200" alt="RIBA stages 2 to 6" style="margin-right: 0px; margin-bottom: 0px;"></div> \n' +
                                '<p>Our team are always here to offer support before, during and after the system is installed.</p> \n' +
                                    '<ul style="line-height: 1.6;"> \n' +
                                    '<li>Your Technical Account Manager can provide valuable advice during the early stages of a project (RIBA 1-4), helping to specify a tailored, efficient solution</li> \n' +
                                    '<li>Site visits can be arranged, if required</li> \n' +
                                    '<li>The Technical Support Team is always to hand to help with any installation queries or aftercare support should you need it</li></ul> \n' +
                                '<p style="border-bottom: 1px dashed #ccc; font-size: 2px;">&nbsp;</p> \n' +
                        '<h4><br>Providing complete confidence for you and your customers</h4> \n' +
                            '<p>Nu-Heat has over 20 years experience designing and supplying heating solutions for a wide range of projects, whether a new-build, renovation, or office-to-residential conversion.</p> \n' +
                            '<p>Our precise design service gives you and your customer peace of mind that the system will be efficient and perform as required, even in the coldest winter months. Your Designer will assess each room that will be heated, together with usable space and chosen floor finishes, to identify the most suitable floor construction, ensuring optimal outputs and an even heat distribution.</p> \n' +
                                '<ul style="line-height: 1.6;"> \n' +
                                '<li>For complete reassurance we are backed by a £5million Professional Indemnity Insurance</li> \n' +
                                '<li>Bespoke system design and detailed set-up information is provided as standard* along with end user guides for the homeowner</li> \n' +
                                '<li>For heat pump and solar thermal systems, MCS support is available with the option of on-site commissioning</li></ul> \n' +
                            '<p><i>*excludes OneZone systems</i></p> \n' +
                            '<p style="border-bottom: 1px dashed #ccc; font-size: 2px;">&nbsp;</p> \n' +
                        '<h4><br>Proud of our reputation</h4> \n' +
                            '<p>Nu-Heat is one of the most established specialised suppliers of warm water underfloor heating and renewables in the country, having been founded in 1992. Many of our systems are completely unique in the market, featuring collaborations with Knauf and Thermal Economics, and can be tailored to meet the specific project requirement.</p> \n' +
                            '<p>Our core values of offering the best system design, innovative products, unbeatable expertise and superior customer service are just as important today and we are proud members of the Institute of Customer Service.</p> \n' +
                            //'<p><img src="/core/media/media.nl?id=14228164&c=472052&h=ade65c13e9d60ae659b0" height="40" alt="Institute of Customer Service member" style="float: left; margin-right: 8px; border:0;"> <img src="/core/media/media.nl?id=14228163&c=472052&h=ba07be73cd1c44f1f74b" height="36" alt="Renewable Energy Consumer Code" style="float: left; margin-right: 8px; border:0;"> <img src="/core/media/media.nl?id=14228162&c=472052&h=89b0d2387f085e34463e" height="40" alt="beama underfloor logo" style="float: left; margin-right: 8px; border:0;"> <img src="/2016/gshp-association-logo.png" height="40" alt="GSHP association logo" style="float: left; margin-right: 8px; border:0;"> <img src="/core/media/media.nl?id=14230283&c=472052&h=e14bb22297692bc89d93" height="40" alt="Knauf logo" style="float: left; margin-right: 8px; border:0;"></p> \n' +	//CJM June2016
                            '<p><img src="/core/media/media.nl?id=14228164&c=472052&h=ade65c13e9d60ae659b0" height="40" alt="Institute of Customer Service member" style="float: left; margin-right: 8px; border:0;"> <img src="/core/media/media.nl?id=14228163&c=472052&h=ba07be73cd1c44f1f74b" height="36" alt="Renewable Energy Consumer Code" style="float: left; margin-right: 8px; border:0;"> <img src="/core/media/media.nl?id=14228162&c=472052&h=89b0d2387f085e34463e" height="40" alt="beama underfloor logo" style="float: left; margin-right: 8px; border:0;"> <img src="/core/media/media.nl?id=14230283&c=472052&h=e14bb22297692bc89d93" height="40" alt="Knauf logo" style="float: left; margin-right: 8px; border:0;"></p> \n' +	//CJM June2016
                    '</div> \n' +
                '</div> \n' ;
        }
        
        return OffersDetails;
    }

    

});