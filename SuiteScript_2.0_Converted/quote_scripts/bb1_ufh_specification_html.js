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

define(['N/record', 'N/search', 'N/log', 'N/url', 'N/https', 'N/file', 'N/render', './bb1_lookup_arrays.js',  './bb1_nextStepInlineLPM.js', './bb1_printButton.js'],
function(record, search, log, url, https, file, render, lookupArrays, nextStepInlineLPM, printButton) {

    return function UFHspecificationHTML(theCurrentRecord, tranID)
    {
        log.debug('DEBUG','0. tranID: ' + tranID);	//Deepak Dec2018

        //CJM Aug2017 New Floor Construction AcoustiMax&reg; (AMC14 & AMT14)
        //CJM Apr2018 Introduction of LoPro&reg;Max14
        
        var floorConstructions = new Array();
        var floorArea = new Array();
        var floorConstructType = new Array();
        var transRecord = record.load({type: 'estimate', id: tranID});

        log.debug('DEBUG','0.1. transRecord: ' + transRecord);	//Deepak Dec2018

        var systemPrice = theCurrentRecord.getValue({fieldId: 'custbody_subtotal'});
        var discountAmount = theCurrentRecord.getValue({fieldId: 'discounttotal'});

        log.debug('DEBUG', '1. discountAmount ' + discountAmount); //Deepak Dec2018

        var systemSubTotal = theCurrentRecord.getValue({fieldId: 'subtotal'});
        var quoteType = theCurrentRecord.getValue({fieldId: 'custbody_quote_type'});
        var boilerSize = oneDP(theCurrentRecord.getValue({fieldId: 'custbody_boiler_size'}));
        var specification = '';
        var boilerParagraph = '';
        
        if (quoteType != 7 && boilerSize != null && boilerSize != '')
        {
            boilerParagraph = '<p>Our provisional estimate of the required boiler capacity for the underfloor heating system only, \n' +
            'is '+boilerSize+'kW. This will be confirmed at the design stage.<br>&nbsp;</p>';
        }
        
        //new colours and LoProMax added	
        var LPDetails = '';
        var LPMDetails = '';
        var AM14Details = ''; //CJM Aug2017
        var LPM14Details = ''; //CJM Apr2018
        var FD14Details = ''; //CJM May2018 - FastDeck�
        var LPL10Details = ''; //CJM June2018 - LoPro�Lite
        var floorConsTable = '';
        var quotePrice = '';
        var whatNext = '';
        var techTips = '';
        var floorLevels = '';
        var FCextras = '';
    
        // Build Floor Constructions table to determine what sort of quote this is
        floorConsTable += '<table width="570" border="0" cellspacing="1" cellpadding="3" >\n' +
        '<tr style="color:#FFF;">\n' +
        //'<td valign="top" bgcolor="#666666"><strong>Floor Code</strong></td>\n' +
        '<td bgcolor="#666666" ><strong>Description</strong></td>\n' +
        '<td bgcolor="#666666" ><strong>Area (m&sup2;)</strong></td>\n' +
        '</tr>\n';
        var floorConsType;
        var roomCount = transRecord.getLineCount('recmachcustrecord_cad_rooms_quote');

        log.debug('DEBUG','2. floorConsType: ' + floorConsType + ', roomCount: ' + roomCount);	//Deepak Dec2018

        for (var i=0; i < roomCount; i++)
        {

            log.debug('DEBUG','99: ' + roomCount + ', :' + i);

            var floorConst = transRecord.getSublistText({sublistId: 'recmachcustrecord_cad_rooms_quote', fieldId: 'custrecord_cad_floor_construction', line: i});

            var floorSQM = transRecord.getSublistValue({sublistId: 'recmachcustrecord_cad_rooms_quote',fieldId: 'custrecord_cad_room_area',line: i});




            log.debug('DEBUG','3. floorConstructions, SqM: ' + floorConst + ', SqM:' + floorSQM);	//Deepak Dec2018

            if (floorSQM != null && floorSQM != '')
            {
                var a = floorConstructions.indexOf(floorConst);
                log.debug('DEBUG','4. floorConstructions.indexOf(floorConst): ' + a);	//Deepak Dec2018
                if (a == -1)
                {
                    floorConstructions.push(floorConst);
                    floorArea.push(floorSQM);
    
                    floorConsType = lookupArrays.lu_floor_cons_type[floorConst];
                    
                    log.debug('DEBUG','5. floorConsType: ' + floorConsType);	//Deepak Dec2018
                    var b = floorConstructType.indexOf(floorConsType);
                    if (b == -1 && floorConsType != '')
                    {
                        floorConstructType.push(floorConsType);
                    }
                }
                else
                {
                    var floorSQMa = floorArea.slice(a,a+1);
                    var newFloorSQM = Number(floorSQMa) + Number(floorSQM);
                    floorArea.splice(a, 1, newFloorSQM);
                }
                log.debug('DEBUG','6. floorConsType: ' + floorConsType + ', a: ' +a+ ', b: ' +b);
            }
        }   
        log.debug('DEBUG','7.Totals ' + floorConstructions+ ', ' + floorArea);
        
        
        var loPro = 'F';
        var loProMax = 'F';
        var acoustiMax = 'F'; //CJM Aug2017
        var loProMax14 = 'F'; //CJM Apr2018
        var FastDeck = 'F'; //CJM May2018
        var LoProLite = 'F'; //CJM June2018
        
        log.debug('DEBUG','7a. FloorConstructType: ' +floorConstructType);
        
        var floorConsCount = floorConstructions.length;
        log.debug('DEBUG','8.floorConsCount ' +floorConsCount);
        for (var j=0; j < floorConsCount; j++)
        {
            var rowbgColour = "";
            var floorConstruct = floorConstructions.slice(j-1,j);
            var floorMeters = oneDP(floorArea.slice(j-1,j));
    
            log.debug('DEBUG','9. floorConstruct: ' +floorConstruct+ ', floorMeters:' +floorMeters);
            floorConsTable +=	
                '<tr>\n' +
                '<td valign="top" >'+handleUndefined(lookupArrays.lu_floor_cons_desc[floorConstruct]) + handleUndefined(lookupArrays.lu_floor_cons_link[floorConstruct])+'</td>\n' +
                '<td valign="top" >'+floorMeters+'</td>\n' +
                '</tr>\n'  ;
    
        } 
        var floorConsTypeCount = floorConstructType.length;
        var floorConstPics = '<p>&nbsp;</p>';
        var LPfloorConstPics = '<p>&nbsp;</p>';
        var AMfloorConstPics = '<p>&nbsp;</p>';	//CJM Aug2017
        var LPM14floorConstPics = '<p>&nbsp;</p>';	//CJM Apr2018
        var FD14floorConstPics = '<p>&nbsp;</p>';	//CJM May2018
        var LPL10floorConstPics = '<p>&nbsp;</p>';	//CJM June2018
        
        log.debug('DEBUG', '10. floorConsTypeCount:' +floorConsTypeCount);
        var picNo = 1;
        for (var k=0; k < floorConsTypeCount; k++)
        {
            log.debug('DEBUG', '10a. floorConstructionType:'+floorConstructionType+ ', floorConsTypeCount:'+floorConsTypeCount);
            var floorConstructionType = floorConstructType.slice(k-1,k);
            
            log.debug('DEBUG', '11. floorConstructionType:'+ floorConstructionType+ ', K=' +k+ ', floorConsTypeCount:'+floorConsTypeCount);
            
            if (floorConstructionType == 'LoPro Floors' || floorConstructionType == 'LoProMax Floors' || floorConstructionType == 'AcoustiMax Floors' || floorConstructionType == 'LoProMax14 Floors' || floorConstructionType == 'FastDeck Floors'  || floorConstructionType == 'LoProLite Floors')	//CJM June2018 LoPro�Lite added; May2018 FastDeck,FD14 added;  Apr2018 "loProMax14" added
            {
                log.debug('DEBUG', '11a. floorConstructionType:'+ floorConstructionType+ ', K=' +k+ ', floorConsTypeCount:'+floorConsTypeCount);	
                if (floorConstructionType == 'LoPro Floors')
                    {
                        var loPro = 'T';
                    }
                else if (floorConstructionType == 'LoProMax Floors')
                    {
                        var loProMax = 'T';
                    }
                else if (floorConstructionType == 'AcoustiMax Floors')
                    {
                        var acoustiMax = 'T';
                        log.debug('DEBUG', '11b. floorConstructionType:'+ floorConstructionType+ ', K=' +k+ ', floorConsTypeCount:'+floorConsTypeCount);
                    }
                //CJM Apr2018 starts........
                
                else if (floorConstructionType == 'LoProMax14 Floors')		
                {
                        var loProMax14 = 'T';
                        log.debug('DEBUG', '11c. floorConstructionType:'+ floorConstructionType+ ', K=' +k+ ', floorConsTypeCount:'+floorConsTypeCount);
                }
                //CJM Apr2018 ends........
                
                //CJM May2018 starts........
                
                else if (floorConstructionType == 'FastDeck Floors')		
                {
                        var FastDeck = 'T';
                        log.debug('DEBUG', '11d. floorConstructionType:'+ floorConstructionType+ ', K=' +k+ ', floorConsTypeCount:'+floorConsTypeCount);
                }
                //CJM May2018 ends........
    
                //CJM June2018 starts........
                
                else if (floorConstructionType == 'LoProLite Floors')		
                {
                        var LoProLite = 'T';
                        log.debug('DEBUG', '11d. floorConstructionType:'+ floorConstructionType+ ', K=' +k+ ', floorConsTypeCount:'+floorConsTypeCount);
                }
                //CJM June2018 ends........
    
                else {
            //		if (loProMax == 'F' && loPro == 'F')
            //		{	
                    log.debug('DEBUG', '11d. IF MAX FLOOR.....SHOULD NOT REACH HERE:'+ floorConstructionType+ ', K=' +k);
                    
                    if (k == 1)
                        {
                            floorConstPics = '<table width="539" border="0" cellspacing="1" cellpadding="1" > \n' + 
                            '<tr style="color:#FFF;">\n'+
                            '<td><H4>'+floorConstructionType+'</H4><br>'+lookupArrays.lu_floor_cons_pic[floorConstructionType]+'</td>\n';
                        }
                    else if (isEven(k) == true) 
                        {
                            floorConstPics += '<td><H4>'+floorConstructionType+'</H4><br>'+lookupArrays.lu_floor_cons_pic[floorConstructionType]+'</td>\n';
                        }
                    else if (isEven(k) == false)
                        {
                            floorConstPics += '</tr><tr><td><H4>'+floorConstructionType+'</H4><br>'+lookupArrays.lu_floor_cons_pic[floorConstructionType]+'</td>\n';
                        }
                    else 
                        {
                            floorConstPics += '<td><H4>'+floorConstructionType+'</H4><br>'+lookupArrays.lu_floor_cons_pic[floorConstructionType]+'</td>\n';
                        }
                        log.debug('DEBUG', '12. floorConstructionType:' +floorConstructionType+ ', picNo=' +picNo);
            //		 }
            //		else
            //		{
                    if (picNo == 1)
                        {
                        log.debug('DEBUG', '12a. floorConstructionType:'+ floorConstructionType+ ', K=' +k+ ', floorConsTypeCount:'+floorConsTypeCount+ ', picNo=' +picNo);
                        
                        LPfloorConstPics = '<table width="539" border="0" cellspacing="1" cellpadding="1" > \n' + 
                            '<tr style="color:#FFF;">\n'+
                            '<td><H4>'+floorConstructionType+'</H4><br>'+lookupArrays.lu_floor_cons_pic[floorConstructionType]+'</td>\n';
                        }
                    else if (isEven(picNo) == true) 
                        {	LPfloorConstPics += '<td><H4>'+floorConstructionType+'</H4><br>'+lookupArrays.lu_floor_cons_pic[floorConstructionType]+'</td>\n';	}
                    
                    else if (isEven(picNo) == false)
                        {	LPfloorConstPics += '</tr><tr><td><H4>'+floorConstructionType+'</H4><br>'+lookupArrays.lu_floor_cons_pic[floorConstructionType]+'</td>\n';	}
                    
                    else
                        {	LPfloorConstPics += '<td><H4>'+floorConstructionType+'</H4><br>'+lookupArrays.lu_floor_cons_pic[floorConstructionType]+'</td>\n';	}
                    
                    picNo += 1;
                    
                    log.debug('DEBUG', '12b. floorConstructionType:'+ floorConstructionType+ ', K=' +k+ ', floorConsTypeCount:'+floorConsTypeCount+ ', picNo=' +picNo);
                    }
                log.debug('DEBUG', '12c. floorConstructionType:'+ floorConstructionType+ ', K=' +k+ ', floorConsTypeCount:'+floorConsTypeCount+ ', picNo=' +picNo);
    
                }
            log.debug('DEBUG', '12d. floorConstructionType:'+ floorConstructionType+ ', K=' +k+ ', floorConsTypeCount:'+floorConsTypeCount+ ', picNo=' +picNo);
    
        }
        /* CJM Aug2017 Starts.......................
        
        if (loProMax == 'T' || loPro == 'T')
        {	
            floorConstPics = LPfloorConstPics;
        }
        */
        log.debug('DEBUG', '13. floorConstructionType:'+ floorConstructionType+ ' , FastDeck:' +FastDeck+  ', acoustiMax:' +acoustiMax+ ', loPro:' +loPro+ ', loProMax:' +loProMax+ ' , loProMax14:' +loProMax14+ ' , FastDeck:' +FastDeck+  ' ,floorConsTypeCount:' +floorConsTypeCount);
        
        if (loProMax == 'T' || loPro == 'T' || acoustiMax == 'T' || loProMax14 == 'T' || loProMax14 == 'T' || FastDeck == 'T' || LoProLite == 'T' )	//CJM Added: June2018 - LoProLite,  May2018 - FastDeck,  Apr2018 - loProMax14
        {	
            log.debug('DEBUG', '14. floorConstructionType:'+ floorConstructionType+ ' , FastDeck:' +FastDeck+  ', acoustiMax:' +acoustiMax+ ', loPro:' +loPro+ ', loProMax:' +loProMax+ ' , loProMax14:' +loProMax14+ ' , FastDeck:' +FastDeck+ ' ,floorConsTypeCount:' +floorConsTypeCount);	
    
            if (acoustiMax == 'T')
                {
                log.debug('DEBUG', '15. floorConstructionType:'+ floorConstructionType+ ', acoustiMax:' +acoustiMax+ ', loPro:' +loPro+ ', loProMax:' +loProMax+ ' , loProMax14:' +loProMax14+ ' ,floorConsTypeCount:' +floorConsTypeCount);
        
                AMfloorConstPics = '<table width="539" border="0" cellspacing="1" cellpadding="1" > \n' +				//CJM Aug2017 
                    '<tr style="color:#FFF;">\n';																		//CJM Aug2017
                    //'<td><H4>'+floorConstructionType+'</H4><br>'+lookupArrays.lu_floor_cons_pic[floorConstructionType]+'</td>\n';	//CJM Aug2017
                    
                    //LPfloorConstPics += AMfloorConstPics;
                floorConstPics = AMfloorConstPics;
                }
            else if (loProMax14 == 'T')
                {
                log.debug('DEBUG', '15b. floorConstructionType:'+ floorConstructionType+ ', acoustiMax:' +acoustiMax+ ', loPro:' +loPro+ ', loProMax:' +loProMax+ ' , loProMax14:' +loProMax14+ ' ,floorConsTypeCount:' +floorConsTypeCount);
    
                LPM14floorConstPics = '<table width="539" border="0" cellspacing="1" cellpadding="1" > \n' +			//CJM Apr2018 
                '<tr style="color:#FFF;">\n';																			//CJM Apr2018
                floorConstPics = LPM14floorConstPics;
                }
            else if (FastDeck == 'T')
                {
                log.debug('DEBUG', '15a. floorConstructionType:'+ floorConstructionType+ ', acoustiMax:' +acoustiMax+ ', loPro:' +loPro+ ', loProMax:' +loProMax+ ' , loProMax14:' +loProMax14+ ' , FastDeck:' +FastDeck+ ' ,floorConsTypeCount:' +floorConsTypeCount);
        
                FD14floorConstPics = '<table width="539" border="0" cellspacing="1" cellpadding="1" > \n' +				//CJM May2018 FastDeck
                    '<tr style="color:#FFF;">\n';																		//CJM May2018 FastDeck
                floorConstPics = FD14floorConstPics;
                }
            else if (LoProLite == 'T')
                {
                log.debug('DEBUG', '15c. floorConstructionType:'+ floorConstructionType+ ', acoustiMax:' +acoustiMax+ ', loPro:' +loPro+ ', loProMax:' +loProMax+ ' , loProMax14:' +loProMax14+ ' , FastDeck:' +FastDeck+ ' , LoproLite:' +LoProLite+ ' floorConsTypeCount:' +floorConsTypeCount);
        
                FD14floorConstPics = '<table width="539" border="0" cellspacing="1" cellpadding="1" > \n' +				//CJM June2018 LoProLite
                    '<tr style="color:#FFF;">\n';																		//CJM June2018 LoProLite
                floorConstPics = LPL10floorConstPics;
                }
            else 
                {	floorConstPics = LPfloorConstPics;	}
            //floorConstPics = LPfloorConstPics;
        }
        // CJM Aug2017 Ends.............................
        
        log.debug('DEBUG', '15d. floorConstructionType:'+ floorConstructionType+ ', K=' +k+ ', floorConsTypeCount:'+floorConsTypeCount);
        
        if (floorConsTypeCount >= 1){
            floorConstPics += '</tr></table>\n';
        }
    
        floorConsTable += '</table>\n' +floorConstPics;
    
        techTips += '<table><tr><td><p>Any images shown in this quote are for illustration purposes only and should not be used as an installation reference. For floor construction details specific to your project please refer to the PDF file/s above.</p>\n';
        
        if (loPro == 'T' || loProMax == 'T')
        {
            techTips += '<p style="font-weight:bold;">Technical tips for specification and installation</p> \n';
            if (loPro == 'T'){
                techTips += '<p>This guide has been created to offer information on best practice for installing LoPro&reg;10 and appropriate floor coverings. \n' +
                '<a href="/core/media/media.nl?id=1750960&c=472052&h=4420aa863e9ec8e324d4&_xt=.pdf" target="_blank">Read the PDF file.</a></p>\n';
            }
            else if (loProMax == 'T')
            {
                techTips += '<p>This guide has been created to offer information on best practice for installing LoPro&reg;Max and appropriate floor coverings. \n' +
                '<a href="/core/media/media.nl?id=4741365&c=472052&h=8eafc19cc55a0b6e232f&_xt=.pdf" target="_blank">Read the PDF file.</a></p>\n';
            }
        }
        techTips += '<P>This quotation is subject to our <a href="/core/media/media.nl?id=102664&c=472052&h=82644df2d5439927e946&_xt=.pdf">terms and conditions</a>.</P></td></tr></table>';
        
        log.debug('DEBUG', '15d. floorConstructionType:'+ floorConstructionType+ ', acoustiMax:' +acoustiMax+ ', loPro:' +loPro+ ', loProMax:' +loProMax+ ' , loProMax14:' +loProMax14+ ' , FastDeck:' +FastDeck+ ' ,floorConsTypeCount:' +floorConsTypeCount);
    
        if (loProMax == 'T')		
        {
            LPMDetails += '<tr style="background-color:#666; color:#FFF; font-size:17px; font-weight:bold; "> \n' +
            '<td height="64" colspan="2" align="left" valign="middle" style="padding-left:10px; FONT-FAMILY: corbel, Arial, Helvetica, sans-serif; font-size:17px;"><strong>LoPro&reg;Max Floors </strong></td> \n' +
            '</tr> \n' +
            '<tr style="background-color:#7AC143;line-height:2px;"> \n' +
            '<td width="421" valign="top">&nbsp;</td> \n' +
            '<td width="201" valign="top">&nbsp;</td> \n' +
            '</tr> \n' +
            '<tr><td valign="top" bgcolor="#F1F4F9" style="padding-left:10px; padding-top:10px; padding-bottom:8px;LINE-HEIGHT: 18px; FONT-FAMILY: corbel, Arial, Helvetica, sans-serif; COLOR: #333; FONT-SIZE: 14px"> \n' +
            '<strong>THE ULTIMATE RETROFIT SOLUTION - OUTSTANDING THERMAL CONDUCTIVITY AND SUPER-FAST RESPONSE TIMES</strong> \n' +
            '<UL><LI>Outstanding thermal conductivity - heat outputs up to 120W/m&sup2;</LI> \n' +
            '<LI>Super-fast response time - can be timed and run as you would a traditional radiator system</LI> \n' +
            '<LI>Just 22mm average height increase over existing floor level </LI> \n' +
            '<LI>Laid over an existing floor with minimal disruption</LI></UL> \n' +
            '<P align="right"><a href="http://www.nu-heat.co.uk/products/retrofit-ufh/lopromax/">Find out more</a></p> \n' +
            '</td><td valign="center" bgcolor="#F1F4F9"><a href="/core/media/media.nl?id=3934028&c=472052&h=6f109c63a428702e234f" rel="lightbox[plants]" title="An example of a LoPro&reg;Max floor construction."><img src="/core/media/media.nl?id=3934029&c=472052&h=d2b2902722408fa289b7" alt="LoPro&reg;Max Floor Construction" width=157></a></td></tr> \n' +
    
            '<tr><td valign="top" bgcolor="#F1F4F9" style="padding-left:10px; padding-top:10px; padding-bottom:8px;LINE-HEIGHT: 18px; FONT-FAMILY: corbel, Arial, Helvetica, sans-serif; COLOR: #333; FONT-SIZE: 14px"> \n' +
            '<br><strong>LOPRO&reg;QUICKSET SELF-LEVELLING COMPOUND</strong> \n' +
            '<UL><LI>Levels uneven floors</LI> \n' +
            '<LI>Perfectly level floor surface ideal for laying vinyl, tile and stone floor finishes</LI> \n' +
            '<LI>Fast drying time - can be walked on after just 8 hours</LI> \n' +
            '<LI>Floor finishes can be fitted within 72 hours</LI></UL> \n' +
            '<P align="right"><a href="/core/media/media.nl?id=1750963&c=472052&h=43ab678530e4972f1af1&_xt=.pdf">Find out more</a></p> \n' +
            '</td><td valign="center" bgcolor="#F1F4F9"><a href="/core/media/media.nl?id=15687320&c=472052&h=5e073392c0dac4685ba2" rel="lightbox[plants]" title="An example of LoPro&reg;Quickset self-levelling compound."><img src="/core/media/media.nl?id=4141780&c=472052&h=d4fcfe14e4cacb1a4fb6" alt="LoPro&reg; Self Levelling Compound" width=157></a></td></tr> \n' +
    
            '<tr><td colspan="2" bgcolor="#F1F4F9" style="padding-left:10px; padding-top:10px; padding-bottom:8px;LINE-HEIGHT: 18px; FONT-FAMILY: corbel, Arial, Helvetica, sans-serif; COLOR: #333; FONT-SIZE: 14px"></td></TR> \n' +
            '<tr><td colspan="2" bgcolor="#F1F4F9" style="padding-left:10px; padding-top:10px; padding-bottom:8px;LINE-HEIGHT: 18px; FONT-FAMILY: corbel, Arial, Helvetica, sans-serif; COLOR: #333; FONT-SIZE: 14px"> \n' ;
    
            floorLevels = '<tr>  \n' +
            '<td valign="top"><h4>Please check your floor levels</h4></td>  \n' +
            '</tr>  \n' +
            '<tr>  \n' +
            '<td valign="top">The quantity of LoPro&reg;QuickSet self-levelling compound in this quote is calculated based on the floors being level within a tolerance of +/- 2.5mm. \n' +
            '<p>If floor levels are outside of this tolerance, please advise your Account Manager of any additional self-levelling compound requirements so that we can include sufficient compound for your install as part of your delivery. Our <a href="http://www.nu-heat.co.uk/products/retrofit-ufh/lopromax/complete-package/#quicksettable">LoPro&reg;QuickSet Ready Reckoner</a> can help you to calculate your requirements.</p> \n' +
            '<p>Any additional LoPro&reg;QuickSet requested after the initial order has been placed will be subject to a delivery charge. </p> \n' +
            '</td>  \n' +
            '</tr>  \n';
        }	
        
        if (loPro == 'T')		
        {
            LPDetails += '<tr style="background-color:#666; color:#FFF; font-size:17px; font-weight:bold; "> \n' +
            '<td height="64" colspan="2" align="left" valign="middle" style="padding-left:10px; FONT-FAMILY: corbel, Arial, Helvetica, sans-serif; font-size:17px;"><strong>LoPro&reg;10 Floors </strong></td> \n' +
            '</tr> \n' +
            '<tr style="background-color:#7AC143;line-height:2px;"> \n' +
            '<td width="421" valign="top">&nbsp;</td> \n' +
            '<td width="201" valign="top">&nbsp;</td> \n' +
            '</tr> \n' +
            '<tr><td valign="top" bgcolor="#F1F4F9" style="padding-left:10px; padding-top:10px; padding-bottom:8px;LINE-HEIGHT: 18px; FONT-FAMILY: corbel, Arial, Helvetica, sans-serif; COLOR: #333; FONT-SIZE: 14px"> \n' +
            '<strong>ONLY 15MM HEIGHT BUILD UP, EXCELLENT THERMAL PROPERTIES</strong> \n' +
            '<UL><LI>High thermal conductivity</LI> \n' +
            '<LI>Suitable for suspended timber and concrete floor structures</LI> \n' +
            '<LI>Just 15mm average height increase over existing floor level </LI> \n' +
            '<LI>Primarily dry application allowing the deck and floor covering to be fitted quickly</LI> \n' +
            '<LI>Edge detail allows convenient installation of pipe runs to the manifold</LI> \n' +
            '<LI>Can be used with most floor coverings.</LI></UL> \n' +
            '<P align="right"><a href="http://www.nu-heat.co.uk/products/retrofit-ufh/lopro10.html">Find out more</a></p> \n' +
            '</td><td valign="center" bgcolor="#F1F4F9">LoPro&reg;10 over a screed floor<br /><a href="/core/media/media.nl?id=7088624&c=472052&h=83a1969ad707e85c2540" rel="lightbox[plants]" title="An example of LoPro&reg;10 over a screed floor"><img src="/core/media/media.nl?id=7182492&c=472052&h=5dd5b9e51ddd590e364c" alt="LoPro&reg;10 Floor Construction" /></a>\n' +
    
            '<br />LoPro&reg;10 over a joisted floor<br /><a href="/core/media/media.nl?id=1853520&c=472052&h=76ae2266e42d847bcc04" rel="lightbox[plants]" title="An example of LoPro&reg;10 over a joisted floor"><img src="/core/media/media.nl?id=1853521&c=472052&h=3c956e0c3245cb8b745e" alt="LoPro&reg;10" width=157></a></td></tr> \n' +
    
            '<tr><td colspan="2" bgcolor="#F1F4F9" style="padding-left:10px; padding-top:10px; padding-bottom:8px;LINE-HEIGHT: 18px; FONT-FAMILY: corbel, Arial, Helvetica, sans-serif; COLOR: #333; FONT-SIZE: 14px"></td></TR> \n' +
            '<tr><td colspan="2" bgcolor="#F1F4F9" style="padding-left:10px; padding-top:10px; padding-bottom:8px;LINE-HEIGHT: 18px; FONT-FAMILY: corbel, Arial, Helvetica, sans-serif; COLOR: #333; FONT-SIZE: 14px"> \n' ;
            
        }
        
        // CJM Aug2017 Start
        if (acoustiMax == 'T')		
        {
            log.debug('DEBUG', '16. floorConstructionType:'+ floorConstructionType+ ', acoustiMax:' +acoustiMax+ ', loPro:' +loPro+ ', loProMax:' +loProMax+ ' ,floorConsTypeCount:' +floorConsTypeCount);
    
            AM14Details += '<tr style="background-color:#666; color:#FFF; font-size:17px; font-weight:bold; "> \n' +
            '<td height="64" colspan="2" align="left" valign="middle" style="padding-left:10px; FONT-FAMILY: corbel, Arial, Helvetica, sans-serif; font-size:17px;"><strong>AcoustiMax&reg; Floors </strong></td> \n' +
            '</tr> \n' +
            '<tr style="background-color:#7AC143;line-height:2px;"> \n' +
            '<td width="421" valign="top">&nbsp;</td> \n' +
            '<td width="201" valign="top">&nbsp;</td> \n' +
            '</tr> \n' +
            '<tr><td valign="top" bgcolor="#F1F4F9" style="padding-left:10px; padding-top:10px; padding-bottom:8px;LINE-HEIGHT: 18px; FONT-FAMILY: corbel, Arial, Helvetica, sans-serif; COLOR: #333; FONT-SIZE: 14px"> \n' +
            '<strong>THE ULTIMATE RETROFIT SOLUTION - OUTSTANDING THERMAL CONDUCTIVITY AND SUPER-FAST RESPONSE TIMES</strong> \n' +
            '<UL><LI>Outstanding thermal conductivity - heat outputs up to 120W/m&sup2;</LI> \n' +
            '<LI>Super-fast response time - can be timed and run as you would a traditional radiator system</LI> \n' +
            '<LI>Just 31mm average height increase over existing floor level </LI> \n' +
            '<LI>Laid over an existing floor with minimal disruption</LI></UL> \n' +
            '<P align="right"><a href="https://www.nu-heat.co.uk/underfloor-heating/floor-constructions/acoustic/#AcoustiMax">Find out more</a></p> \n' +
            //'<P align="right"><a href="http://www.nu-heat.co.uk/products/retrofit-ufh/lopromax/">Find out more</a></p> \n' + ADD THIS WHEN ACOUSTIMAX PAGE IS AVAILABLE
            '</td><td valign="center" bgcolor="#F1F4F9"><a href="/core/media/media.nl?id=12357897&c=472052&h=9af211aa63a002969bd7" rel="lightbox[plants]" title="An example of a LoPro&reg;Max floor construction."><img src="/core/media/media.nl?id=12357897&c=472052&h=9af211aa63a002969bd7" alt="AcoustiMax&#174; Floor Construction" /></a></td></tr> \n' +
    
            '<tr><td valign="top" bgcolor="#F1F4F9" style="padding-left:10px; padding-top:10px; padding-bottom:8px;LINE-HEIGHT: 18px; FONT-FAMILY: corbel, Arial, Helvetica, sans-serif; COLOR: #333; FONT-SIZE: 14px"> \n' +
            '<br><strong>LOPRO&reg;QUICKSET SELF-LEVELLING COMPOUND</strong> \n' +
            '<UL><LI>Levels uneven floors</LI> \n' +
            '<LI>Perfectly level floor surface ideal for laying vinyl, tile and stone floor finishes</LI> \n' +
            '<LI>Fast drying time - can be walked on after just 8 hours</LI> \n' +
            '<LI>Floor finishes can be fitted within 72 hours</LI></UL> \n' +
            '<P align="right"><a href="/core/media/media.nl?id=1750963&c=472052&h=43ab678530e4972f1af1&_xt=.pdf">Find out more</a></p> \n' +
            '</td><td valign="center" bgcolor="#F1F4F9"><a href="/core/media/media.nl?id=3934027&c=472052&h=68047f5d24e0d3053c5e" rel="lightbox[plants]" title="An example of LoPro&reg;Quickset self-levelling compound."><img src="/core/media/media.nl?id=4141780&c=472052&h=d4fcfe14e4cacb1a4fb6" alt="LoPro&reg; Self Levelling Compound" width=157></a></td></tr> \n' +
            '<tr><td colspan="2" bgcolor="#F1F4F9" style="padding-left:10px; padding-top:10px; padding-bottom:8px;LINE-HEIGHT: 18px; FONT-FAMILY: corbel, Arial, Helvetica, sans-serif; COLOR: #333; FONT-SIZE: 14px"></td></TR> \n' ; //+
            //'<tr><td colspan="2" bgcolor="#F1F4F9" style="padding-left:10px; padding-top:10px; padding-bottom:8px;LINE-HEIGHT: 18px; FONT-FAMILY: corbel, Arial, Helvetica, sans-serif; COLOR: #333; FONT-SIZE: 14px"> \n' ;
    
            floorLevels = '<tr>  \n' +
            '<td valign="top"><h4>Please check your floor levels</h4></td>  \n' +
            '</tr>  \n' +
            '<tr>  \n' +
            '<td valign="top">The quantity of LoPro&reg;QuickSet self-levelling compound in this quote is calculated based on the floors being level within a tolerance of +/- 2.5mm. \n' +
            '<p>If floor levels are outside of this tolerance, please advise your Account Manager of any additional self-levelling compound requirements so that we can include sufficient compound for your install as part of your delivery. Our <a href="http://www.nu-heat.co.uk/products/retrofit-ufh/lopromax/complete-package/#quicksettable">LoPro&reg;QuickSet Ready Reckoner</a> can help you to calculate your requirements.</p> \n' +
            '<p>Any additional LoPro&reg;QuickSet requested after the initial order has been placed will be subject to a delivery charge. </p> \n' +
            '</td>  \n' +
            '</tr>  \n';
        }	
        
         // CJM Aug2017 End
        
        //  CJM Apr2018 Starts
        if (loProMax14 == 'T')		
        {
            LPM14Details += '<tr style="background-color:#666; color:#FFF; font-size:17px; font-weight:bold; "> \n' +
            '<td height="64" colspan="2" align="left" valign="middle" style="padding-left:10px; FONT-FAMILY: corbel, Arial, Helvetica, sans-serif; font-size:17px;"><strong>LoPro&reg;Max14 Floors </strong></td> \n' +
            '</tr> \n' +
            '<tr style="background-color:#7AC143;line-height:2px;"> \n' +
            '<td width="421" valign="top">&nbsp;</td> \n' +
            '<td width="201" valign="top">&nbsp;</td> \n' +
            '</tr> \n' +
            '<tr><td valign="top" bgcolor="#F1F4F9" style="padding-left:10px; padding-top:10px; padding-bottom:8px;LINE-HEIGHT: 18px; FONT-FAMILY: corbel, Arial, Helvetica, sans-serif; COLOR: #333; FONT-SIZE: 14px"> \n' +
            '<strong>THE ULTIMATE RETROFIT SOLUTION - OUTSTANDING THERMAL CONDUCTIVITY AND SUPER-FAST RESPONSE TIMES</strong> \n' +
            '<UL><LI>Outstanding thermal conductivity - heat outputs up to 120W/m&sup2;</LI> \n' +
            '<LI>Super-fast response times on par with radiators</LI> \n' +
            '<LI>Just 26mm average height build-up </LI> \n' +
            '<LI>Cover larger areas with fewer manifolds due to 14mm tube</LI> \n' +
            '<LI>Laid over an existing floor with minimal disruption</LI></UL> \n' +
            '<P align="right"><a href="/core/media/media.nl?id=14206652&c=472052&h=96b61faf96ea0dfd2a87&_xt=.pdf">Find out more</a></p> \n' +
            '</td><td valign="center" bgcolor="#F1F4F9"><a href="/core/media/media.nl?id=15687320&c=472052&h=5e073392c0dac4685ba2" rel="lightbox[plants]" title="An example of a LoPro&reg;Max floor construction."><img src="/core/media/media.nl?id=3934029&c=472052&h=d2b2902722408fa289b7" alt="LoPro&reg;Max14 Floor Construction" /></a></td></tr> \n' +
    
            '<tr><td valign="top" bgcolor="#F1F4F9" style="padding-left:10px; padding-top:10px; padding-bottom:8px;LINE-HEIGHT: 18px; FONT-FAMILY: corbel, Arial, Helvetica, sans-serif; COLOR: #333; FONT-SIZE: 14px"> \n' +
            '<br><strong>LOPRO&reg;QUICKSET SELF-LEVELLING COMPOUND</strong> \n' +
            '<UL><LI>Levels uneven floors</LI> \n' +
            '<LI>Perfectly level floor surface ideal for laying vinyl, tile and stone floor finishes</LI> \n' +
            '<LI>Fast drying time - can be walked on after just 8 hours</LI> \n' +
            '<LI>Floor finishes can be fitted within 72 hours</LI></UL> \n' +
            '<P align="right"><a href="/core/media/media.nl?id=1750963&c=472052&h=43ab678530e4972f1af1&_xt=.pdf">Find out more</a></p> \n' +
            '</td><td valign="center" bgcolor="#F1F4F9"><a href="/core/media/media.nl?id=3934027&c=472052&h=68047f5d24e0d3053c5e" rel="lightbox[plants]" title="An example of LoPro&reg;Quickset self-levelling compound."><img src="/core/media/media.nl?id=4141780&c=472052&h=d4fcfe14e4cacb1a4fb6" alt="LoPro&reg; Self Levelling Compound" width=157></a></td></tr> \n' +
    
            '<tr><td colspan="2" bgcolor="#F1F4F9" style="padding-left:10px; padding-top:10px; padding-bottom:8px;LINE-HEIGHT: 18px; FONT-FAMILY: corbel, Arial, Helvetica, sans-serif; COLOR: #333; FONT-SIZE: 14px"></td></TR> \n' +
            '<tr><td colspan="2" bgcolor="#F1F4F9" style="padding-left:10px; padding-top:10px; padding-bottom:8px;LINE-HEIGHT: 18px; FONT-FAMILY: corbel, Arial, Helvetica, sans-serif; COLOR: #333; FONT-SIZE: 14px"> \n' ;
    
            floorLevels = '<tr>  \n' +
            '<td valign="top"><h4>Please check your floor levels</h4></td>  \n' +
            '</tr>  \n' +
            '<tr>  \n' +
            '<td valign="top">The quantity of LoPro&reg;QuickSet self-levelling compound in this quote is calculated based on the floors being level within a tolerance of +/- 2.5mm. \n' +
            '<p>If floor levels are outside of this tolerance, please advise your Account Manager of any additional self-levelling compound requirements so that we can include sufficient compound for your install as part of your delivery. Our <a href="http://www.nu-heat.co.uk/products/retrofit-ufh/lopromax/complete-package/#quicksettable">LoPro&reg;QuickSet Ready Reckoner</a> can help you to calculate your requirements.</p> \n' +
            '<p>Any additional LoPro&reg;QuickSet requested after the initial order has been placed will be subject to a delivery charge. </p> \n' +
            '</td>  \n' +
            '</tr>  \n';
        }	
        // CJM Apr2018 End
        
        
        //  CJM May2018 FastDeck Starts..........
        if (FastDeck == 'T')		
        {
            FD14Details += '<tr style="background-color:#666; color:#FFF; font-size:17px; font-weight:bold; "> \n' +
            '<td height="64" colspan="2" align="left" valign="middle" style="padding-left:10px; FONT-FAMILY: corbel, Arial, Helvetica, sans-serif; font-size:17px;"><strong>FastDeck&reg; Floors </strong></td> \n' +
            '</tr> \n' +
            '<tr style="background-color:#7AC143;line-height:2px;"> \n' +
            '<td width="421" valign="top">&nbsp;</td> \n' +
            '<td width="201" valign="top">&nbsp;</td> \n' +
            '</tr> \n' +
            '<tr><td valign="top" bgcolor="#F1F4F9" style="padding-left:10px; padding-top:10px; padding-bottom:8px;LINE-HEIGHT: 18px; FONT-FAMILY: corbel, Arial, Helvetica, sans-serif; COLOR: #333; FONT-SIZE: 14px"> \n' +
            '<strong>SAVE TIME WITH FASTDECK&reg;, A UNIQUE UNDERFLOOR HEATING SYSTEM DESIGNED FOR A QUICK INSTALLATION.</strong> \n' +
            '<UL><LI>Completely dry install - no waiting for screeds to dry</LI> \n' +
            '<LI>Conductive coverboard supplied as standard</LI> \n' +
            '<LI>Flexible tray fixing system</LI> \n' +
            '<LI>28mm total height build-up</LI> \n' +
            '<LI>90W/m&sup2; heat output</LI></UL> \n' +
            '<P align="right"><a href="/core/media/media.nl?id=14898620&c=472052&h=9c73239878c134fe7425">Find out more</a></p> \n' +	//PLACEHOLDER FOR TESTING
            //'<P align="right"><a href="/core/media/media.nl?id=14206652&c=472052&h=96b61faf96ea0dfd2a87&_xt=.pdf">Find out more</a></p> \n' +		NEEDS UPDATING WHEN NEW PDF CREATED
            '</td><td valign="center" bgcolor="#F1F4F9"><a href="/core/media/media.nl?id=15687316&c=472052&h=497b427938f9c26d6b9c" rel="lightbox[plants]" title="An example of a FastDeck&reg; floor construction."><img src="/core/media/media.nl?id=14898517&c=472052&h=dc9cccdbfabbcf6d1632" alt="FastDeck&reg; Floor Construction" /></a></td></tr> \n';
        }	
        
        // CJM May2018 End
    
        //  CJM June2018 LoPro�Lite Starts..........
        if (LoProLite == 'T')		
        {
            LPL10Details += '<tr style="background-color:#666; color:#FFF; font-size:17px; font-weight:bold; "> \n' +
            '<td height="64" colspan="2" align="left" valign="middle" style="padding-left:10px; FONT-FAMILY: corbel, Arial, Helvetica, sans-serif; font-size:17px;"><strong>LoPro&reg;Lite Floors </strong></td> \n' +
            '</tr> \n' +
            '<tr style="background-color:#7AC143;line-height:2px;"> \n' +
            '<td width="421" valign="top">&nbsp;</td> \n' +
            '<td width="201" valign="top">&nbsp;</td> \n' +
            '</tr> \n' +
            '<tr><td valign="top" bgcolor="#F1F4F9" style="padding-left:10px; padding-top:10px; padding-bottom:8px;LINE-HEIGHT: 18px; FONT-FAMILY: corbel, Arial, Helvetica, sans-serif; COLOR: #333; FONT-SIZE: 14px"> \n' +
            '<strong>STRONG AND LIGHTWEIGHT, LOPRO&reg;LITE IS A VERSATILE UNDERFLOOR HEATING SYSTEM DESIGNED FOR A STRAIGHTFORWARD INSTALLATION.</strong> \n' +
            '<UL><LI>Completely dry install - no waiting for screeds to dry</LI> \n' +
            '<LI>Pre-routed, high-density EPS board with excellent point-load strength</LI> \n' +
            '<LI>Laid over the existing floor for minimal disruption</LI> \n' +
            '<LI>15mm total height build-up before floor deck</LI> \n' +
            '<LI>Diffuser plates ensure even heat distribution</LI></UL> \n' +
            '<P align="right"><a href="/core/media/media.nl?id=14920645&c=472052&h=5b848a6f82b71642db5d">Find out more</a></p> \n' +	//PLACEHOLDER FOR TESTING
            //'<P align="right"><a href="/core/media/media.nl?id=14206652&c=472052&h=96b61faf96ea0dfd2a87&_xt=.pdf">Find out more</a></p> \n' +		NEEDS UPDATING WHEN NEW PDF CREATED
            //CJM Aug2018....'</td><td valign="center" bgcolor="#F1F4F9"><a href="/core/media/media.nl?id=14920644&c=472052&h=3173a8688c62729a19dc" rel="lightbox[plants]" title="An example of a LoPro&reg;Lite floor construction."><img src="/core/media/media.nl?id=14920644&c=472052&h=3173a8688c62729a19dc" alt="LoPro&reg;Lite Floor Construction" /></a></td></tr> \n';
            '</td><td valign="center" bgcolor="#F1F4F9"><a href="/core/media/media.nl?id=15687319&c=472052&h=451c1b20749c18ed7c50" rel="lightbox[plants]" title="An example of a LoPro&reg;Lite floor construction."><img src="/core/media/media.nl?id=14920644&c=472052&h=3173a8688c62729a19dc" alt="LoPro&reg;Lite Floor Construction" /></a></td></tr> \n';
    
        }	
        
        // CJM June2018 End
    
        
        var dontForgetERP = '';
        var customer = transRecord.getValue({fieldId: 'entity'});
        var customerCategory = search.lookupFields({type: 'customer', id: customer, columns: 'category' });
        if (customerCategory != 'Self-builder')
        {
            dontForgetERP = //'<tr> \n' +
            //'<td valign="top"> \n' +
            '<br /><h4>Don\'t forget ErP!</h4> \n' +
            '<p>From 26th September 2015 all installers must calculate an energy efficiency rating for any new heating system package installed e.g. a boiler with thermostats.  It\'s easy to do this yourself.  <a href="https://www.nu-heat.co.uk/resources/erp?utm_source=quote&utm_medium=quote&utm_campaign=erpufh" target="_blank">Visit our ErP page here</a> to watch the video and download our calculation forms.</p> \n';// +
            //'</td> \n' +
            //'</tr> \n';
        }
        
        if (discountAmount && discountAmount != '0.00'){
            quotePrice =  '<BR><div style="border:#CCCCCC thick solid; background-color:#FFFFFF;width:100%; padding-left: 0px; padding-right:0px;">'+
            '<table > \n' +
            '<tr>  \n' +
            '<td valign="top"><div class="yourquoteprice">Your Quote Price</div></td>  \n' +
            '</tr>  \n' +
            '<tr>  \n' +
            '<td valign="top">  \n' +
            '<table width="100%" border="0" cellspacing="0" cellpadding="0" >  \n' +
            '<tr> \n' +
            '<td width="173" rowspan="2" align="left" valign="middle" ></td> \n' +
            '<td width="176" rowspan="2" align="left" valign="middle" >&nbsp;</td> \n' +
            '<td valign="top" align="left" width="95" style="padding-top:2px; padding-bottom:2px;"><span style="font-size:22px; color:#000;">Subtotal</span></td> \n' +
            '<td valign="top" align="right" width="89" style="padding-top:2px; padding-bottom:2px;"><span style="font-size:22px; color:#000;">&pound;'+systemSubTotal+'</span></td> \n' +
            '<td valign="top" align="right" width="55" style="padding-top:2px; padding-bottom:2px;">&nbsp;</td> \n' +
            '</tr> \n' +
            '<tr> \n' +
            '<td valign="top" align="left" style="padding-top:2px; padding-bottom:2px;"><span style="font-size:22px; color:#000;">Discount</span></td> \n' +
            '<td valign="top" align="right" style="padding-top:2px; padding-bottom:2px;"><span style="font-size:22px; color:#000;">-&pound;'+fixedTwoDP(Math.abs(discountAmount))+'</span></td> \n' +
            '<td valign="top" align="right" style="padding-top:2px; padding-bottom:2px;">&nbsp;</td> \n' +
            '</tr> \n' +
            '<tr> \n' +
            '<td rowspan="2" valign="top"></td> \n' +
            '<td valign="top">&nbsp;</td> \n' +
            '<td valign="bottom" align="left" style="padding-top:2px; padding-bottom:2px;"><div class="quoteprice">Price</div></td> \n' +
            '<td valign="bottom" align="right" style="padding-top:2px; padding-bottom:2px;"><div class="quoteprice">&pound;'+systemPrice+'</div></td> \n' +
            '<td valign="bottom" align="left" style="padding-top:2px; padding-bottom:2px;"><div class="vatquoteprice"> + VAT</div></td> \n' +
            '</tr> \n' +
            '<tr> \n' +
            '<td valign="top">&nbsp;</td> \n' +
            '<td colspan="3" align="left" valign="top" style="padding-top:2px; padding-bottom:2px;">'+printButton(theCurrentRecord, tranID)+'</td> \n' +
            '</tr> \n' +
            '<tr> \n' +
            '<td valign="bottom" colspan="5" style="padding-top:2px; padding-bottom:2px; padding-left:0px; padding-right:0px;"><div class="hidefoot" style="float:right; padding-left:0px; padding-right:0px;"> \n' +
    
            '</div> \n' +  
            '</td> \n' +
            '</tr> \n' +
            '</table>  \n' + floorLevels +		
            '</tr> </table> </div> \n'+ dontForgetERP ;
        }
    
        else{
            quotePrice =  '<BR><div style="border:#CCCCCC thick solid; background-color:#FFFFFF;width:100%; padding-left: 0px; padding-right:0px;">'+		
            '<table> \n' +
            //CJM Dec2016
            //start......
            // add extra text below Price (for design and supply only)
            //'<tr>  \n' +
            //'<td valign="top"><div class="yourquoteprice">Your Quote Price</div></td>  \n' +
            //'</tr>  \n' +
            
            '<tr>  \n' +
            '<td valign="bottom" style="padding-bottom:0px;"><div class="yourquoteprice" padding-bottom:0px >Your Quote Price</div></td>  \n' +
            '</tr>  \n' +
            '<tr><td valign="top" align="left" style="padding-top:0px;">(for design and supply only)</td></tr>  \n' +
            //...ends
            //CJM DEC 2016
            
            '<tr>  \n' +
            '<td valign="top">  \n' +
            '<table width="100%" border="0" cellspacing="0" cellpadding="0" >  \n' +
            '<tr> \n' +
            '<td rowspan="2" valign="top" width="173" ></td> \n' +
            '<td valign="top" width="176" >&nbsp;</td> \n' +
            '<td valign="bottom" width="95" align="left" style="padding-top:2px; padding-bottom:2px;"><div class="quoteprice">Price</div></td> \n' +
            '<td valign="bottom" width="89" align="right" style="padding-top:2px; padding-bottom:2px;"><div class="quoteprice">&pound;'+systemPrice+'</div></td> \n' +
            '<td valign="bottom" width="55" align="left" style="padding-top:2px; padding-bottom:2px;"><div class="vatprice"> + VAT</div></td> \n' +
            '</tr> \n' +
            '<tr> \n' +
            '<td valign="top">&nbsp;</td> \n' +
            '<td colspan="3" align="left" valign="top" style="padding-top:2px; padding-bottom:2px;">'+printButton(theCurrentRecord, tranID)+'</td> \n' +
            '</tr> \n' +
            '</table> \n'+ floorLevels + '</table> </div> \n'+ dontForgetERP ;
        }	
    
        var FCexFilters = new Array();
        FCexFilters[0] = search.createFilter({name: 'custrecord_ex_quote_number', join: null, operator: 'is', formula: tranID }); //Deepak Dec2018 filter
        FCexFilters[1] = search.createFilter({name: 'custrecord_upgrade_item_type', join: null, operator: 'is', formula: 'Extra' }); //Deepak Dec2018 filter
        FCexFilters[2] = search.createFilter({name: 'custrecord_upgrade_option_type', join: null, operator: 'startswith', formula: 'FCC' }); //Deepak Dec2018 filter

        var FCexColumns = new Array();
        FCexColumns[0] = search.createColumn({name: 'custrecord_ex_item_name'}) //Deepak Dec2018 column
        FCexColumns[1] = search.createColumn({name: 'custrecord_ex_item_descr'}) //Deepak Dec2018 column
        FCexColumns[2] = search.createColumn({name: 'custrecord_ex_item_price'}) //Deepak Dec2018 column
        FCexColumns[3] = search.createColumn({name: 'custrecord_ex_quantity'}) //Deepak Dec2018 column
        FCexColumns[4] = search.createColumn({name: 'custrecord_ancillary_area'}) //Deepak Dec2018 column
        FCexColumns[5] = search.createColumn({name: 'custrecord_ex_item_price', sort: search.Sort.DESC}) //Deepak Dec2018 column

        var FCexSearchresults = search.create({type: 'customrecord_upgrades_and_extras', id: null, filters: FCexFilters, columns: FCexColumns});
        if (FCexSearchresults != null)
        {
            FCextras = '<br><br><h3>LoPro Installation Sundries</h3>\n'+
            '<p>The following items are needed to complete the installation of LoPro10&reg;&#59; the prices shown are for the quantities required for this project. \n'+
            'These are displayed separately in order for you to make a decision as to whether you want to purchase them as part of your Nu-Heat system, or from your local trade supplier.</p> \n'+
            '<table width="539" border="0">\n' +
            '<tr style="color:#FFF;">\n' +
            '<td valign="top" width="70" bgcolor="#666666"><strong>Code</strong></td>\n' +
            '<td valign="top" bgcolor="#666666"><strong>Item Description</strong></td>\n' +
            //'<td valign="top" bgcolor="#337BBD"><p><strong>Quantity</strong></p></td>\n' +
            '<td valign="top" width="60" bgcolor="#666666"><strong>Price</strong></td>\n' +
            '</tr>\n';		
            for ( var m = 0; FCexSearchresults != null && m < FCexSearchresults.length; m++ )
            {
                var FCexSearchresult = FCexSearchresults[ m ];		
                var upgradeName = FCexSearchresult.getValue('custrecord_ex_item_name');
                var upgradeLookup = upgradeName;
                if (upgradeName == LPSLC2/25-C && loProMax == 'T')
                    upgradeLookup = upgradeName + 'LMP';
                var itemDescription = FCexSearchresult.getValue('custrecord_ex_item_descr');
                var upgradePrice = fixedTwoDP(FCexSearchresult.getValue('custrecord_ex_item_price'));
                //var itemQuantity = FCCexSearchresult.getValue('custrecord_ex_quantity');
                var ancArea = FCexSearchresult.getValue('custrecord_ancillary_area');
                FCextras +=
                    '<tr style="border-top:#F0F0F0;">\n' +
                    '<td align="left" valign="top">'+ upgradeName +'</td>\n' +
                    '<td align="left" valign="top">'+ ancArea + itemDescription + lookupArrays.lu_fc_upgrades_link[upgradeLookup]+'</td>\n' +
                    //'<td align="left" valign="top"><p>'+ itemQuantity +'</td>\n' +
                    '<td align="left" valign="top">&pound;'+ upgradePrice +'</td>\n' +
                    '</tr>\n';
    
            }
            FCextras += '</table>\n' ;
        }
        whatNext = '<br><br><div class="hidefoot"> '+nextStepInlineLPM(theCurrentRecord, tranID)+'</div>';
    
        /*
        if (loProMax == 'T' || loPro == 'T')		
        {
            specification = boilerParagraph + '</p><h3>System Specification</h3> \n <table cellspacing="0"> \n' + LPMDetails + LPDetails + floorConsTable+'<br> \n' +
            '</td></tr> \n' +
            '<tr style="background-color:#7AC143;"><td colspan="2" valign="top" style="padding-top:10px; padding-bottom:10px; padding-left:10px; FONT-FAMILY: corbel, Arial, Helvetica, sans-serif; font-size:24px;"> \n' +
            '</td></tr> \n' +
            '</table>' + quotePrice + FCextras + whatNext + techTips;
        }
        */
        if (loProMax == 'T' || loPro == 'T' || acoustiMax == 'T' || loProMax14 == 'T' || FastDeck == 'T' || LoProLite == 'T')		
        {
            specification = boilerParagraph + '</p><h3>System Specification</h3> \n <table cellspacing="0"> \n' + LPM14Details + AM14Details + LPMDetails + LPDetails + FD14Details + LPL10Details + floorConsTable+'<br> \n' +	//CJM Apr2018
            '</td></tr> \n' +
            '<tr style="background-color:#7AC143;"><td colspan="2" valign="top" style="padding-top:10px; padding-bottom:10px; padding-left:10px; FONT-FAMILY: corbel, Arial, Helvetica, sans-serif; font-size:24px;"> \n' +
            '</td></tr> \n' +
            '</table>' + quotePrice + FCextras + whatNext + techTips;
        }
    
        
        
    //	else if (loPro == 'T')		
    //	{
    //		specification = boilerParagraph + '</p><h3>System Specification</h3>' + LPDetails + quotePrice + FCextras + whatNext + techTips;
    //	}
        else
        {
            specification = boilerParagraph + '</p><h3>System Specification</h3>' + floorConsTable + quotePrice + FCextras + whatNext + techTips;
        }			
    
        specification +='</div>\n';
    
        return specification;
    } 

    function handleUndefined(value)
    {
        if(value == undefined){
            return '';
        }
        else return value;
    }

    function isEven(value){
        if (value%2 == 0)
            return true;
        else
            return false;
    }

    function oneDP(number)
    {
        return Math.round(number*10)/10;
    }

    function fixedTwoDP(number)
    {
        return parseFloat(number).toFixed(2);
    }

    

});