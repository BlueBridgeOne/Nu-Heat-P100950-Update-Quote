function quoteInfo(type)
{
		
	var systemURL = dataCenterURL();
//	var shoppingURL = dataCenterURLShopping();
	var formsURL = dataCenterURLForms();
	
	var getQuoteInfo = nlapiGetFieldValue('custbody_quote_html');
	var quoteNo = nlapiGetFieldValue('tranid');
	var quoteID = nlapiGetRecordId();
	var entityID = nlapiGetFieldValue('entity');
	var quoteType = nlapiGetFieldValue('custbody_quote_type');
	var ufhSchematic = nlapiGetFieldValue('custbody_schematic');	//CJM May2016
	var defaultValues = nlapiGetFieldValue('custbody_default_values');	//CJM May2016
	
	var technology = '';
	if (quoteType == 1 || quoteType == 5 || quoteType == 7) //Underfloor
	{
		technology = 'Underfloor Heating';
	}
	else if (quoteType == 8 || quoteType == 9 || quoteType == 10) //Heat Pumps
	{
		technology = 'Heat Pump';
	}
	else if (quoteType == 16) //Solar
	{
		technology = 'Solar';
	}
	var oppID = nlapiGetFieldValue('opportunity');
	var quoteHTML = '' ;
	nlapiLogExecution('DEBUG', 'Starting Execution - Entity '+entityID+'. '+type+' '+quoteType+ 'Quote ID = '+quoteID+ ' Schematic = '+ufhSchematic+ ' Default values: ' +defaultValues);
	if (type == 'create')
	{
		//ADD MANIFOLD CODE HERE.......//CJM DEC20126
		//
		createRooms(quoteID);
		createUpgrades(quoteID,technology);
		//var recordType = nlapiGetRecordType();
		var oppSalesRep = nlapiLookupField('customer', entityID, 'salesrep');
	}
	else if (type == 'edit')
	{
		var createRoomsCheck = nlapiGetFieldValue('custbody_create_roomslist');
		var createUpgradesCheck = nlapiGetFieldValue('custbody_create_upgradeslist');
		if (createRoomsCheck == 'T')
		{
			createRooms(quoteID);
		}
		if (createUpgradesCheck == 'T')
		{
			createUpgrades(quoteID,technology);
		}
	}	

	var transaction = nlapiGetRecordId();
	
	if (quoteType == 1 || quoteType == 5 || quoteType == 7) //Underfloor
	{
		//Solar upgrade on UFH quotes shouldn't be showing where - CJM May2016
		//Schematic DCB- 'combi boiler' is selected as heat source - CJM May2016
		
		nlapiLogExecution('DEBUG', 'Quote type check: '+quoteType+'. Schematic: '+ufhSchematic+' Quote ID = '+quoteID);
		
		if (ufhSchematic == 'DCB' || ufhSchematic == 'HeatmiserD')
		{
			quoteHTML = startHTML('Underfloor Heating', quoteNo, transaction) + quoteDetailsHTML(transaction) + UFHspecificationHTML(transaction) + whatNuHeatOffersHTML(transaction) + roomsList(transaction) + itemsListHTML(transaction, 'Underfloor Heating', systemURL, formsURL) + upgradesHTML(transaction) + notesHTML(transaction) +  installGuidePrice(transaction) + screedContractor(transaction) + nextStep(transaction) + warrantyNotes() + printHTML(transaction, 'Underfloor Heating') + termsAndConditions() + footerHTML();
		}
	else
		{
			//quoteHTML = startHTML('Underfloor Heating', quoteNo, transaction) + quoteDetailsHTML(transaction) + UFHspecificationHTML(transaction) + whatNuHeatOffersHTML(transaction) + roomsList(transaction) + itemsListHTML(transaction, 'Underfloor Heating', systemURL, formsURL) + upgradesHTML(transaction) + hpSolarTab() + notesHTML(transaction) +  installGuidePrice(transaction) + screedContractor(transaction) + nextStep(transaction) + warrantyNotes() + printHTML(transaction, 'Underfloor Heating') + termsAndConditions() + footerHTML();
			quoteHTML = startHTML('Underfloor Heating', quoteNo, transaction) + quoteDetailsHTML(transaction) + UFHspecificationHTML(transaction) + whatNuHeatOffersHTML(transaction) + roomsList(transaction) + itemsListHTML(transaction, 'Underfloor Heating', systemURL, formsURL) + upgradesHTML(transaction) + hpSolarTab() + notesHTML(transaction) +  installGuidePrice(transaction) + screedContractor(transaction) + nextStep(transaction) + warrantyNotes() + printHTML(transaction, 'Underfloor Heating') + termsAndConditions() + footerHTML();

		}
	
		
		//quoteHTML = startHTML('Underfloor Heating', quoteNo, transaction) + quoteDetailsHTML(transaction) + UFHspecificationHTML(transaction) + whatNuHeatOffersHTML(transaction) + roomsList(transaction) + itemsListHTML(transaction, 'Underfloor Heating', systemURL, formsURL) + upgradesHTML(transaction) + hpSolarTab() + notesHTML(transaction) +  installGuidePrice(transaction) + screedContractor(transaction) + nextStep(transaction) + warrantyNotes() + printHTML(transaction, 'Underfloor Heating') + termsAndConditions() + footerHTML(); - CJM May2016 
	}
	else if (quoteType == 8) //Ground Source Heat Pumps
	{
		quoteHTML = startHTML('Ground Source Heat Pump', quoteNo, transaction) + quoteDetailsHTML(transaction) + itemsListHTML(transaction,'Heat Pump', systemURL, formsURL) + HPsystemPerformance(transaction) + HPSOLupgradesHTML(transaction,'Heat Pump') + hpSolarTab() + mcsAndRECC(transaction) + HPsystemFiche(transaction) /*+ cylinderProductFiche(transaction)*/ + notesHTML(transaction) + nextStep(transaction) + printHTML(transaction, 'Heat Pump') + termsAndConditions() + footerHTML();
	}
	else if (quoteType == 9) //Air Source Heat Pumps
	{
		quoteHTML = startHTML('Air Source Heat Pump', quoteNo, transaction) + quoteDetailsHTML(transaction) + itemsListHTML(transaction,'Heat Pump', systemURL, formsURL) + HPsystemPerformance(transaction) + HPSOLupgradesHTML(transaction,'Heat Pump') + hpSolarTab() + mcsAndRECC(transaction) + HPsystemFiche(transaction) /*+ cylinderProductFiche(transaction)*/ + notesHTML(transaction) + nextStep(transaction) + printHTML(transaction, 'Heat Pump') + termsAndConditions() + footerHTML();
	}
	else if (quoteType == 16) //Solar
	{
		quoteHTML = startHTML('Solar', quoteNo, transaction) + quoteDetailsHTML(transaction) + itemsListHTML(transaction, 'Solar', systemURL, formsURL) + SOLsystemPerformance(transaction) + HPSOLupgradesHTML(transaction, 'Solar') + mcsAndRECC(transaction) + /*CJM JAN2017 */ SOLsystemFiche(transaction, quoteNo) /*+ cylinderProductFiche(transaction)*/ + notesHTML(transaction) + nextStep(transaction) + printHTML(transaction, 'Solar') + termsAndConditions() + footerHTML();
	}
	else //Assume NH type quote
	{
		quoteHTML = startHTML('', quoteNo, transaction) + quoteDetailsHTML(transaction) + itemsListHTML(transaction, systemURL, formsURL) + upgradesHTML(transaction) + notesHTML(transaction) + /*nextStep(transaction) +*/ printHTML(transaction) + termsAndConditions() + footerHTML();
	}

	//create quote html document
	var quoteDocument = nlapiCreateFile('quote_'+quoteNo+'_erp.htm', 'HTMLDOC', quoteHTML);
	quoteDocument.setFolder(576054);
	quoteDocument.setIsOnline(true);
	var fileID = nlapiSubmitFile(quoteDocument);
	nlapiLogExecution('DEBUG', 'fileID', fileID);
	
	//update the estimate and add links to html quote document	
	var transRecord = nlapiLoadRecord('estimate', transaction);
	transRecord.setFieldValue('custbody_create_roomslist','F');
	transRecord.setFieldValue('custbody_create_upgradeslist','F');

	var transURL = 'http://files.nu-heat.co.uk'+nlapiLookupField('file',fileID,'url');
	transRecord.setFieldValue('custbody_quote_page', '<a href="'+transURL+'" target = "_new">Quote '+quoteNo+'</a>');
	transRecord.setFieldValue('custbody_quote_page_url', transURL);	
	transRecord.setFieldValue('custbody_quote_pdf_link','<a href="http://convertold.html2pdf.seven49.net/?urltorender='+encodeURIComponent(transURL)+'&DisableJavaScript=1&AddLinks=1&Size=A4&usePrintMediaType=1&FooterTemplateUrl=http://www.towelrails.co.uk/html2pdf/footer.html&FileName=UFH042960">Quote PDF '+quoteNo+'</a>');

	if (type == 'create' && oppID)
	{
		var oppSalesRep = nlapiLookupField('opportunity', oppID, 'salesrep');
		transRecord.setFieldValue('salesrep',oppSalesRep);
	}		
	transactionID = nlapiSubmitRecord(transRecord, false, true);
	nlapiLogExecution('DEBUG', 'transactionID', transactionID);

	nlapiLogExecution('DEBUG', 'End', 'Finished Execution - '+entityID+'. '+type);
}

function startHTML(type, quoteNumber)
{
	var htmlStart = '<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Strict//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-strict.dtd">\n' +
			'<html xmlns="http://www.w3.org/1999/xhtml">\n' +
			'<head>\n' +
					'<meta http-equiv="content-type" content="text/html; charset=utf-8" />\n' +
					'<title>Your Quote - '+quoteNumber+'</title>\n' +
					'<meta name="title" content="" />\n' +
					'<meta name="keywords" content="" />\n' +
					'<meta name="description" content="" />\n' +
					'<META HTTP-EQUIV="Pragma" CONTENT="no-cache">\n' +
					'<META HTTP-EQUIV="Expires" CONTENT="-1">\n' +

				'<link href="/core/media/media.nl?id=14216021&c=472052&h=31275963c115455c9a92&_xt=.css" rel="stylesheet" type="text/css" media="screen, projection" />\n' +
    '<link href="/core/media/media.nl?id=291336&c=472052&h=f352329e2126fa8c1bd8&_xt=.css&ck=sk52wuCbAXv46-Tt&vid=sk52wtqbAUw6M7YE&cktime=105440" rel="stylesheet" type="text/css" media="screen, projection" />\n' + 

    '<STYLE TYPE="text/css">td {padding-left:10px; padding-right:10px; padding-top:6px; padding-bottom:6px;}</STYLE>\n' + 
    
'<script type="text/javascript" src="http://ajax.googleapis.com/ajax/libs/jquery/1.7.2/jquery.min.js"></script>\n' +
'<script type="text/javascript" src="/core/media/media.nl?id=291337&amp;c=472052&amp;h=2ebee1e7178c2227d2a2&amp;_xt=.js"></script>\n' +
'<script type="text/javascript" src="/core/media/media.nl?id=291338&amp;c=472052&amp;h=7661013034af794aa51d&amp;_xt=.js"></script>\n' +
'<script type="text/javascript" src="/core/media/media.nl?id=295601&amp;c=472052&amp;h=5d7cbe4edf85f456bc4b&amp;_xt=.js"></script>\n' +

//'<script type="text/javascript"> \n'+
//'$(document).ready(function () {  \n'+
//'    $(\'.acc_container\').hide(); //hide all at start  \n'+
//'                $(\'.acc_trigger:first\').addClass(\'active\').next().show();  \n'+
//'    $(\'.acc_trigger\').click(function(){  \n'+
//'        $(\'.acc_trigger\').removeClass(\'current\');  //remove the current class  \n'+
//'        $(this).addClass(\'current\'); //add current class to clicked item  \n'+
//'        $(\'.acc_trigger:not(.current)\').removeClass(\'active\').next().slideUp(); //slide up items which are not the current one  \n'+
//'        $(this).toggleClass(\'active\').next().slideToggle(); //toggle class and visibility   \n'+
//'    	}); \n'+
//'	$("#toggle-fiche").click(function() { \n'+
//'   	 $("#fiche").css("display", ($("#fiche").css("display")==="none") ? "block" : "none"); \n'+
//'	}); \n'+
//'});  \n'+
//'</script> \n'+

'<script type="text/javascript">  \n'+
'$(document).ready(function () {   \n'+
'    $(\'.acc_container\').hide(); //hide all at start    \n'+
'    $(\'.acc_trigger\').click(function(){   \n'+
'        $(\'.acc_trigger\').removeClass(\'current\');  //remove the current class   \n'+
'        $(this).addClass(\'current\'); //add current class to clicked item   \n'+
'        $(\'.acc_trigger:not(.current)\').removeClass(\'active\').next().slideUp(); //slide up items which are not the current one   \n'+
'        $(this).toggleClass(\'active\').next().slideToggle(); //toggle class and visibility    \n'+
'    	});  \n'+
'	$("#toggle-fiche").click(function() {  \n'+
'   	 $("#fiche").css("display", ($("#fiche").css("display")==="none") ? "block" : "none");  \n'+
'	});  \n'+
'});   \n'+
'</script> \n'+

'<style type="text/css">\n' +
'.checkboximage{display: none;}\n' +
'</style>\n' +
'<link href="/core/media/media.nl?id=291335&c=472052&h=9612030c37edff094491&_xt=.css&ck=sk52wuCbAXv46-Tt&vid=sk52wtqbAUw6M7YE&cktime=105440" rel="stylesheet" type="text/css" />\n' +

'<!--[if lte IE 6]><link rel="stylesheet" href="style_ie.css" type="text/css" media="screen, projection" /><![endif]-->\n' +


'<style type="text/css">body { \n' +
'  padding:0px; \n' +
'  margin:0px; \n' +
'  height: 100%; \n' +
  
'  /*line-height:16px;*/ \n' +
'} \n' +
'p{padding-left: 5px;} \n' +
'</style> \n' +

'<link rel="stylesheet" href="/core/media/media.nl?id=1391376&c=472052&h=1b181bdcbd40a5f49f57&_xt=.css" type="text/css" media="screen" /> \n' +

'<script src="/core/media/media.nl?id=1391382&c=472052&h=9cf4f845a4d7512e40bc&_xt=.js"></script> \n' +

'<link rel="stylesheet" href="/core/media/media.nl?id=14216020&c=472052&h=510101c962b5173698bd&_xt=.css">\n' +
'<link rel="stylesheet" href="/core/media/media.nl?id=14216651&c=472052&h=6b5ebd0cf253ee79e10a&_xt=.css">\n' +	// CJM May2018 - Font location "Quotes : assets : fonts : museo_sans/font.css"
//'<link rel="stylesheet" http://apps.nu-heat.co.uk/assets/fonts/museo_sans/font.css">\n' +///assets/fonts/museo_sans/font.css">\n' +
'<link rel="stylesheet" href="/core/media/media.nl?id=14216019&c=472052&h=62b238eece00cfac8a90&_xt=.css">\n' +



'</head> \n' +

'<body>\n' +
'<div id="wrapper">\n' +
	'<header id="header-container" class="full-width">\n' +
			'<div class="container-quote">\n' +
				'<div class="thirty columns">\n' +
					'<a id="logo" href="http://www.nu-heat.co.uk/">\n' +
						'<img src="http://apps.nu-heat.co.uk/images/logo.svg" class="responsive" alt="Nu-Heat UK Ltd">\n' +
					'</a>\n' +
				'</div>\n' +
			'</div>\n' +
		'</header>\n' +
        

		'<div id="navigation-container">\n' +
			'<nav id="navigation" class="full-width">\n' +	
			'</nav>\n' +
		'</div>\n' +
       	
		'<div class="clearfix"></div>\n' +
'<div id="content">\n' +

'<div id="main-content-wrapper">\n' +
        
			'<section class="container-quote">  \n' +   
			'<br><h1>'+type+': Quotation</h1>\n' +
           
           '<a name="1"></a><a name="2"></a><a name="3"></a><a name="4"></a><a name="5"></a><a name="6"></a><a name="7"></a><a name="8"></a><a name="9"></a><a name="10"></a><a name="11"></a><a name="14"></a><a name="15"></a><a name="17"></a><a name="22"></a> \n'+
           '<NLFORM>\n';
           
	return htmlStart;
}

function whatNuHeatOffersHTML(transaction)
{
	//var transRecord = nlapiLoadRecord('estimate', transaction);
	//var tranId = nlapiGetFieldValue('tranid');
	var recId = nlapiGetFieldValue('opportunity');
	var entityId = nlapiGetFieldValue('entity');
	var custCategory = nlapiLookupField('customer', entityId,'category');
	var OffersDetails;
	
	nlapiLogExecution('DEBUG', 'What Nu-Heat Offers..... transaction:' +transaction+ ', Customer Category:' +custCategory+ ',  recID:'+recId+ ', Entity:' +entityId);
	
	//-----------------------------------HOMEOWNER--------------------------------------------
	if (custCategory == 16 || custCategory == 5)
	{
		OffersDetails = //'<div class="container-quote">\n' +
		'<h2 class="acc_trigger breakhere"><a href="#14" onclick="ga(\'send\', \'event\', \'quote\', \'Click\', \'nu-heat-offers\');"></a><div class="P-Header"><a href="#14" onclick="ga(\'send\', \'event\', \'quote\', \'Click\', \'mcs-no\');">What Nu-Heat offers you</a></div></h2> \n' +
			'<div class="acc_container" style="display: block; overflow: hidden;"> \n' +
				'<div class="block"> \n' +
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
		'<h2 class="acc_trigger breakhere"><a href="#14" onclick="ga(\'send\', \'event\', \'quote\', \'Click\', \'nu-heat-offers\');"></a><div class="P-Header"><a href="#14" onclick="ga(\'send\', \'event\', \'quote\', \'Click\', \'mcs-no\');">What Nu-Heat offers you</a></div></h2> \n' +
		'<div class="acc_container" style="display: block; overflow: hidden;"> \n' +
			'<div class="block"> \n' +
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
		'<h2 class="acc_trigger breakhere"><a href="#14" onclick="ga(\'send\', \'event\', \'quote\', \'Click\', \'nu-heat-offers\');"></a><div class="P-Header"><a href="#14" onclick="ga(\'send\', \'event\', \'quote\', \'Click\', \'mcs-no\');">What Nu-Heat offers you</a></div></h2> \n' +
			'<div class="acc_container" style="display: block; overflow: hidden;"> \n' +
				'<div class="block"> \n' +
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

function quoteDetailsHTML(transactionID)
{
	//var transRecord = nlapiLoadRecord('estimate', transactionID);	
	var custNumber = nlapiGetFieldText('entity');
	var quoteNumber = nlapiGetFieldValue('tranid');
	var quoteDate = nlapiGetFieldValue('trandate');
	var validTo = nlapiGetFieldValue('duedate');
	var siteAddress = nlapiGetFieldValue('custbodyquote_site_adress');
	var salesEmail = nlapiGetFieldValue('custbody_sales_rep_email');
	var salesPhone = nlapiGetFieldValue('custbody_sales_rep_phone');
	var quoteDescription = nlapiGetFieldValue('custbody_quote_description');
	var quoteType = nlapiGetFieldValue('custbody_quote_type');
	var boilerSize = nlapiGetFieldValue('custbody_boiler_size');
	
	var quoteDetails = '<div class="container-quote">\n' +
	'<h3 class="acc_trigger"><a href="#1" onclick="ga(\'send\', \'event\', \'quote\', \'Click\', \'quotation-summary\');">Quotation Summary and Price</a></h3>\n' +
		'<div class="acc_container">\n' +
			'<div class="block">\n' +
			'<table width="595" border="0" cellspacing="10" cellpadding="5">\n' +
					'<tr>\n' +
						'<td width="134" align="left" valign="top"><strong>Customer number: </strong></td>\n' +
						'<td width="137" align="left" valign="top">'+custNumber+'</td>\n' +
						'<td rowspan="2" align="left" valign="top"><strong>Site address:</strong>\n' +
							'<br />'+siteAddress+'</td>\n' +
					'</tr>\n' +
					'<tr valign="top">\n' +
						'<td height="30" align="left"><strong>Quotation number:</strong></td>\n' +
						'<td align="left" >'+quoteNumber+'</td> \n' +
					'</tr>\n' +
					'<tr>\n' +
						'<td align="left" valign="top"><strong>Quotation date:</strong></td>\n' +
						'<td align="left" valign="top" >'+quoteDate+'</td>\n' +
						'<td rowspan="2" align="left" valign="top" >\n' +
						'<strong>Nu-Heat contact:</strong><br />\n' +
						
						'<TABLE border=0 cellSpacing=0 cellPadding=0 width="100%">\n' +
						'<TR><TD WIDTH="10" align="center" style="PADDING: 0px"><img src="/core/media/media.nl?id=14227094&c=472052&h=c59a82774ebc5b4f62ff" style="float: none; background: none; margin: 0px; border: 0px; vertical-align: middle;"></TD>\n' +
						'<TD align="left">'+salesPhone+'</TD></TR>\n' +
						'<TR><TD align="center" style="PADDING: 0px"><img src="/core/media/media.nl?id=14227138&c=472052&h=e266a92b3f540c261543" style="float: none; background: none; margin: 0px; border: 0px; vertical-align: middle;"></TD>\n' +
						'<TD align="left"><a href="mailto:'+salesEmail+'">'+salesEmail+'</a></TD></TR></TABLE>\n' +
						'</td>\n' +
					'</tr>\n' +
					//CJM T&Cs no longer have 90 day valid clause 
					/*'<tr valign="top">\n' +
						'<td align="left"><strong>Valid to:</strong></td>\n' +
						'<td align="left" >'+validTo+'</td>\n' +
					'</tr>\n' +
					*/
				'</table>\n' ;
		if (quoteDescription)
		{
			quoteDetails +=	'<p>'+trailingCommaTrim(quoteDescription)+'</p>\n';
			if (quoteType == 16) //Solar
			{
				//if (nlapiGetFieldValue('custbody_default_values') == "1")	//CJM May 2016 - Note below not required actual property details are being used
				//{
					
				quoteDetails +=	'<p>*Please note, this quote is based on the assumption that the solar panels will be SE/SW facing\n' + 
					'and for a new build property, the panels will be in-roof, and for retrofit, they will be on-roof. \n' + 
					'If your project differs from these criteria, please contact your Account Manager.</p>\n';
				//}
			}
			else if (quoteType == 9) //Air Source
			{
				quoteDetails +=	'<p>For detailed product information and specification <a href="/core/media/media.nl?id=4973758&c=472052&h=4c3657445d4160e46d90&_xt=.pdf">click here</a>.</p> \n';
			}
		}
	return quoteDetails;	
}

function UFHspecificationHTML(tranID)
{
	//CJM Aug2017 New Floor Construction AcoustiMax&reg; (AMC14 & AMT14)
	//CJM Apr2018 Introduction of LoPro&reg;Max14
	
	var floorConstructions = new Array();
	var floorArea = new Array();
	var floorConstructType = new Array();
	var transRecord = nlapiLoadRecord('estimate', tranID);	    
	var systemPrice = nlapiGetFieldValue('custbody_subtotal');
	var discountAmount = nlapiGetFieldValue('discounttotal');
	nlapiLogExecution('DEBUG', '1. discountAmount',discountAmount);
	var systemSubTotal = nlapiGetFieldValue('subtotal');
	var quoteType = nlapiGetFieldValue('custbody_quote_type');
	var boilerSize = oneDP(nlapiGetFieldValue('custbody_boiler_size'));
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
	var roomCount = transRecord.getLineItemCount('recmachcustrecord_cad_rooms_quote');
	nlapiLogExecution('DEBUG','2. floorConsType: ', floorConsType+ ', roomCount:' +roomCount);	//CJM Aug2017
	for (var i=1; i <= roomCount; i++)
	{
		var floorConst = transRecord.getLineItemText('recmachcustrecord_cad_rooms_quote', 'custrecord_cad_floor_construction', i);
		var floorSQM = transRecord.getLineItemValue('recmachcustrecord_cad_rooms_quote', 'custrecord_cad_room_area', i);
		nlapiLogExecution('DEBUG','3. floorConstructions, SqM: ', floorConst+ ', SqM:' +floorSQM);	//CJM Aug2017
		if (floorSQM != null && floorSQM != '')
		{
			var a = floorConstructions.indexOf(floorConst);
			nlapiLogExecution('DEBUG','4. floorConstructions.indexOf(floorConst): ', a);	//CJM Aug2017
			if (a == -1)
			{
				floorConstructions.push(floorConst);
				floorArea.push(floorSQM);

				floorConsType = lu_floor_cons_type[floorConst];
				
				nlapiLogExecution('DEBUG','5. floorConsType: ', floorConsType);	//CJM Aug2017
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
			nlapiLogExecution('DEBUG','6. floorConsType: ', floorConsType+ ', a: ' +a+ ', b: ' +b);
		}
	}   
	nlapiLogExecution('DEBUG','7.Totals', floorConstructions+', '+floorArea);
	
	
	var loPro = 'F';
	var loProMax = 'F';
	var acoustiMax = 'F'; //CJM Aug2017
	var loProMax14 = 'F'; //CJM Apr2018
	var FastDeck = 'F'; //CJM May2018
	var LoProLite = 'F'; //CJM June2018
	
	nlapiLogExecution('DEBUG','7a. FloorConstructType: ' +floorConstructType);
	
	var floorConsCount = floorConstructions.length;
	nlapiLogExecution('DEBUG','8.floorConsCount ' +floorConsCount);
	for (var j=1; j <= floorConsCount; j++)
	{
		var rowbgColour = "";
		var floorConstruct = floorConstructions.slice(j-1,j);
		var floorMeters = oneDP(floorArea.slice(j-1,j));

		nlapiLogExecution('DEBUG','9. floorConstruct: ' +floorConstruct+ ', floorMeters:' +floorMeters);
		floorConsTable +=	
			'<tr>\n' +
			'<td valign="top" >'+handleUndefined(lu_floor_cons_desc[floorConstruct]) + handleUndefined(lu_floor_cons_link[floorConstruct])+'</td>\n' +
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
	
	nlapiLogExecution('DEBUG', '10. floorConsTypeCount:' +floorConsTypeCount);
	var picNo = 1;
	for (var k=1; k <= floorConsTypeCount; k++)
	{
		nlapiLogExecution('DEBUG', '10a. floorConstructionType:'+floorConstructionType+ ', floorConsTypeCount:'+floorConsTypeCount);
		var floorConstructionType = floorConstructType.slice(k-1,k);
		
		nlapiLogExecution('DEBUG', '11. floorConstructionType:'+ floorConstructionType+ ', K=' +k+ ', floorConsTypeCount:'+floorConsTypeCount);
		
		if (floorConstructionType == 'LoPro Floors' || floorConstructionType == 'LoProMax Floors' || floorConstructionType == 'AcoustiMax Floors' || floorConstructionType == 'LoProMax14 Floors' || floorConstructionType == 'FastDeck Floors'  || floorConstructionType == 'LoProLite Floors')	//CJM June2018 LoPro�Lite added; May2018 FastDeck,FD14 added;  Apr2018 "loProMax14" added
		{
			nlapiLogExecution('DEBUG', '11a. floorConstructionType:'+ floorConstructionType+ ', K=' +k+ ', floorConsTypeCount:'+floorConsTypeCount);	
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
					nlapiLogExecution('DEBUG', '11b. floorConstructionType:'+ floorConstructionType+ ', K=' +k+ ', floorConsTypeCount:'+floorConsTypeCount);
				}
			//CJM Apr2018 starts........
			
			else if (floorConstructionType == 'LoProMax14 Floors')		
			{
					var loProMax14 = 'T';
					nlapiLogExecution('DEBUG', '11c. floorConstructionType:'+ floorConstructionType+ ', K=' +k+ ', floorConsTypeCount:'+floorConsTypeCount);
			}
			//CJM Apr2018 ends........
			
			//CJM May2018 starts........
			
			else if (floorConstructionType == 'FastDeck Floors')		
			{
					var FastDeck = 'T';
					nlapiLogExecution('DEBUG', '11d. floorConstructionType:'+ floorConstructionType+ ', K=' +k+ ', floorConsTypeCount:'+floorConsTypeCount);
			}
			//CJM May2018 ends........

			//CJM June2018 starts........
			
			else if (floorConstructionType == 'LoProLite Floors')		
			{
					var LoProLite = 'T';
					nlapiLogExecution('DEBUG', '11d. floorConstructionType:'+ floorConstructionType+ ', K=' +k+ ', floorConsTypeCount:'+floorConsTypeCount);
			}
			//CJM June2018 ends........

			else {
		//		if (loProMax == 'F' && loPro == 'F')
		//		{	
				nlapiLogExecution('DEBUG', '11d. IF MAX FLOOR.....SHOULD NOT REACH HERE:'+ floorConstructionType+ ', K=' +k);
				
				if (k == 1)
					{
						floorConstPics = '<table width="539" border="0" cellspacing="1" cellpadding="1" > \n' + 
						'<tr style="color:#FFF;">\n'+
						'<td><H4>'+floorConstructionType+'</H4><br>'+lu_floor_cons_pic[floorConstructionType]+'</td>\n';
					}
				else if (isEven(k) == true) 
					{
						floorConstPics += '<td><H4>'+floorConstructionType+'</H4><br>'+lu_floor_cons_pic[floorConstructionType]+'</td>\n';
					}
				else if (isEven(k) == false)
					{
						floorConstPics += '</tr><tr><td><H4>'+floorConstructionType+'</H4><br>'+lu_floor_cons_pic[floorConstructionType]+'</td>\n';
					}
				else 
					{
						floorConstPics += '<td><H4>'+floorConstructionType+'</H4><br>'+lu_floor_cons_pic[floorConstructionType]+'</td>\n';
					}
					nlapiLogExecution('DEBUG', '12. floorConstructionType:' +floorConstructionType+ ', picNo=' +picNo);
		//		 }
		//		else
		//		{
				if (picNo == 1)
					{
					nlapiLogExecution('DEBUG', '12a. floorConstructionType:'+ floorConstructionType+ ', K=' +k+ ', floorConsTypeCount:'+floorConsTypeCount+ ', picNo=' +picNo);
					
					LPfloorConstPics = '<table width="539" border="0" cellspacing="1" cellpadding="1" > \n' + 
						'<tr style="color:#FFF;">\n'+
						'<td><H4>'+floorConstructionType+'</H4><br>'+lu_floor_cons_pic[floorConstructionType]+'</td>\n';
					}
				else if (isEven(picNo) == true) 
					{	LPfloorConstPics += '<td><H4>'+floorConstructionType+'</H4><br>'+lu_floor_cons_pic[floorConstructionType]+'</td>\n';	}
				
				else if (isEven(picNo) == false)
					{	LPfloorConstPics += '</tr><tr><td><H4>'+floorConstructionType+'</H4><br>'+lu_floor_cons_pic[floorConstructionType]+'</td>\n';	}
				
				else
					{	LPfloorConstPics += '<td><H4>'+floorConstructionType+'</H4><br>'+lu_floor_cons_pic[floorConstructionType]+'</td>\n';	}
				
				picNo += 1;
				
				nlapiLogExecution('DEBUG', '12b. floorConstructionType:'+ floorConstructionType+ ', K=' +k+ ', floorConsTypeCount:'+floorConsTypeCount+ ', picNo=' +picNo);
				}
			nlapiLogExecution('DEBUG', '12c. floorConstructionType:'+ floorConstructionType+ ', K=' +k+ ', floorConsTypeCount:'+floorConsTypeCount+ ', picNo=' +picNo);

			}
		nlapiLogExecution('DEBUG', '12d. floorConstructionType:'+ floorConstructionType+ ', K=' +k+ ', floorConsTypeCount:'+floorConsTypeCount+ ', picNo=' +picNo);

	}
	/* CJM Aug2017 Starts.......................
	
	if (loProMax == 'T' || loPro == 'T')
	{	
		floorConstPics = LPfloorConstPics;
	}
	*/
	nlapiLogExecution('DEBUG', '13. floorConstructionType:'+ floorConstructionType+ ' , FastDeck:' +FastDeck+  ', acoustiMax:' +acoustiMax+ ', loPro:' +loPro+ ', loProMax:' +loProMax+ ' , loProMax14:' +loProMax14+ ' , FastDeck:' +FastDeck+  ' ,floorConsTypeCount:' +floorConsTypeCount);
	
	if (loProMax == 'T' || loPro == 'T' || acoustiMax == 'T' || loProMax14 == 'T' || loProMax14 == 'T' || FastDeck == 'T' || LoProLite == 'T' )	//CJM Added: June2018 - LoProLite,  May2018 - FastDeck,  Apr2018 - loProMax14
	{	
		nlapiLogExecution('DEBUG', '14. floorConstructionType:'+ floorConstructionType+ ' , FastDeck:' +FastDeck+  ', acoustiMax:' +acoustiMax+ ', loPro:' +loPro+ ', loProMax:' +loProMax+ ' , loProMax14:' +loProMax14+ ' , FastDeck:' +FastDeck+ ' ,floorConsTypeCount:' +floorConsTypeCount);	

		if (acoustiMax == 'T')
			{
			nlapiLogExecution('DEBUG', '15. floorConstructionType:'+ floorConstructionType+ ', acoustiMax:' +acoustiMax+ ', loPro:' +loPro+ ', loProMax:' +loProMax+ ' , loProMax14:' +loProMax14+ ' ,floorConsTypeCount:' +floorConsTypeCount);
	
			AMfloorConstPics = '<table width="539" border="0" cellspacing="1" cellpadding="1" > \n' +				//CJM Aug2017 
				'<tr style="color:#FFF;">\n';																		//CJM Aug2017
				//'<td><H4>'+floorConstructionType+'</H4><br>'+lu_floor_cons_pic[floorConstructionType]+'</td>\n';	//CJM Aug2017
				
				//LPfloorConstPics += AMfloorConstPics;
			floorConstPics = AMfloorConstPics;
			}
		else if (loProMax14 == 'T')
			{
			nlapiLogExecution('DEBUG', '15b. floorConstructionType:'+ floorConstructionType+ ', acoustiMax:' +acoustiMax+ ', loPro:' +loPro+ ', loProMax:' +loProMax+ ' , loProMax14:' +loProMax14+ ' ,floorConsTypeCount:' +floorConsTypeCount);

			LPM14floorConstPics = '<table width="539" border="0" cellspacing="1" cellpadding="1" > \n' +			//CJM Apr2018 
			'<tr style="color:#FFF;">\n';																			//CJM Apr2018
			floorConstPics = LPM14floorConstPics;
			}
		else if (FastDeck == 'T')
			{
			nlapiLogExecution('DEBUG', '15a. floorConstructionType:'+ floorConstructionType+ ', acoustiMax:' +acoustiMax+ ', loPro:' +loPro+ ', loProMax:' +loProMax+ ' , loProMax14:' +loProMax14+ ' , FastDeck:' +FastDeck+ ' ,floorConsTypeCount:' +floorConsTypeCount);
	
			FD14floorConstPics = '<table width="539" border="0" cellspacing="1" cellpadding="1" > \n' +				//CJM May2018 FastDeck
				'<tr style="color:#FFF;">\n';																		//CJM May2018 FastDeck
			floorConstPics = FD14floorConstPics;
			}
		else if (LoProLite == 'T')
			{
			nlapiLogExecution('DEBUG', '15c. floorConstructionType:'+ floorConstructionType+ ', acoustiMax:' +acoustiMax+ ', loPro:' +loPro+ ', loProMax:' +loProMax+ ' , loProMax14:' +loProMax14+ ' , FastDeck:' +FastDeck+ ' , LoproLite:' +LoProLite+ ' floorConsTypeCount:' +floorConsTypeCount);
	
			FD14floorConstPics = '<table width="539" border="0" cellspacing="1" cellpadding="1" > \n' +				//CJM June2018 LoProLite
				'<tr style="color:#FFF;">\n';																		//CJM June2018 LoProLite
			floorConstPics = LPL10floorConstPics;
			}
		else 
			{	floorConstPics = LPfloorConstPics;	}
		//floorConstPics = LPfloorConstPics;
	}
	// CJM Aug2017 Ends.............................
	
	nlapiLogExecution('DEBUG', '15d. floorConstructionType:'+ floorConstructionType+ ', K=' +k+ ', floorConsTypeCount:'+floorConsTypeCount);
	
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
	
	nlapiLogExecution('DEBUG', '15d. floorConstructionType:'+ floorConstructionType+ ', acoustiMax:' +acoustiMax+ ', loPro:' +loPro+ ', loProMax:' +loProMax+ ' , loProMax14:' +loProMax14+ ' , FastDeck:' +FastDeck+ ' ,floorConsTypeCount:' +floorConsTypeCount);

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
		nlapiLogExecution('DEBUG', '16. floorConstructionType:'+ floorConstructionType+ ', acoustiMax:' +acoustiMax+ ', loPro:' +loPro+ ', loProMax:' +loProMax+ ' ,floorConsTypeCount:' +floorConsTypeCount);

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
	var customer = transRecord.getFieldValue('entity');
	var customerCategory = nlapiLookupField('customer', customer, 'category', true);
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
		'<td colspan="3" align="left" valign="top" style="padding-top:2px; padding-bottom:2px;">'+printButton(tranID)+'</td> \n' +
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
		'<td colspan="3" align="left" valign="top" style="padding-top:2px; padding-bottom:2px;">'+printButton(tranID)+'</td> \n' +
		'</tr> \n' +
		'</table> \n'+ floorLevels + '</table> </div> \n'+ dontForgetERP ;
	}	

	var FCexFilters = new Array();
	FCexFilters[0] = new nlobjSearchFilter('custrecord_ex_quote_number', null, 'is', tranID);
	FCexFilters[1] = new nlobjSearchFilter('custrecord_upgrade_item_type', null, 'is', 'Extra');
	FCexFilters[2] = new nlobjSearchFilter('custrecord_upgrade_option_type', null, 'startswith', 'FCC');
	var FCexColumns = new Array();
	FCexColumns[0] = new nlobjSearchColumn('custrecord_ex_item_name');
	FCexColumns[1] = new nlobjSearchColumn('custrecord_ex_item_descr');
	FCexColumns[2] = new nlobjSearchColumn('custrecord_ex_item_price');
	FCexColumns[3] = new nlobjSearchColumn('custrecord_ex_quantity');
	FCexColumns[4] = new nlobjSearchColumn('custrecord_ancillary_area');
	FCexColumns[5]= FCexColumns[2].setSort();
	var FCexSearchresults = nlapiSearchRecord('customrecord_upgrades_and_extras', null, FCexFilters, FCexColumns);
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
				'<td align="left" valign="top">'+ ancArea + itemDescription + lu_fc_upgrades_link[upgradeLookup]+'</td>\n' +
				//'<td align="left" valign="top"><p>'+ itemQuantity +'</td>\n' +
				'<td align="left" valign="top">&pound;'+ upgradePrice +'</td>\n' +
				'</tr>\n';

		}
		FCextras += '</table>\n' ;
	}
	whatNext = '<br><br><div class="hidefoot"> '+nextStepInlineLPM(tranID)+'</div>';

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


function roomsList(tranID)
{
	var transRecord = nlapiLoadRecord('estimate', tranID);
	
	var manifoldRooms = transRecord.getFieldValue('custbody_manifold_rooms');
	var manifoldPorts = transRecord.getFieldValue('custbody_manifold_ports');	//cjmOct2016
	var portsExist = 'F';
	
	if (manifoldPorts != null && manifoldPorts != '')
		{
		portsExist = 'T';
		}
	
	var roomsList = '<h2 class="acc_trigger breakhere"><a href="#2" onclick="ga(\'send\', \'event\', \'quote\', \'Click\', \'rooms\');"><div class="P-Header">Rooms </div></a></h2>\n' + //and Manifolds
			'<div class="acc_container">\n' +
			'<div class="block">\n'+  			
			'<h3>Manifolds</h3> \n' +
			'<table width="539" border="0" cellspacing="1" cellpadding="3" > \n' +
				'<tr style="color:#FFF;"> \n' +
					'<td valign="top" bgcolor="#666666"><strong>No.</strong></td> \n' +
					'<td bgcolor="#666666" ><strong>Location</strong></td>\n';
					if (portsExist == 'T')	//CJM Jan2017 Check whether Ports information exists
						{
						roomsList += '<td bgcolor="#666666" ><strong>Ports</strong></td> \n';	//cjmOct2016
						}
					roomsList += '</tr>'  ;
		//var row = 0;		
		/*
		if (manifoldRooms != null && manifoldRooms != '')
		{
			var manifoldRoomsArray = manifoldRooms.split(',');
			
			if (portsExist)	//CJM Jan2017 Check whether Ports information exists
				{
				var manifoldPortsArray = manifoldPorts.split(',');	//cjmOct2016
				}
			
			//var manifoldPortsArray = "";	//cjmOct2016
			var numberOfManifolds = manifoldRoomsArray.length;
			for (var p=1; p <= numberOfManifolds; p++)
			{
				var roomName = manifoldRoomsArray.slice(p-1,p);
				if (portsExist)
				{
					var numPorts = manifoldPortsArray.slice(p-1,p);	//cjmOct2016
				}
				
				var manifoldNo = p;
				
				var rowbgColour = "";
				if (isEven(p) == true)
				{
					rowbgColour = 'bgcolor="#FFFFFF"';
				}
				roomsList = roomsList +			
				'<tr>' +
					'<td valign="top" '+rowbgColour+'>'+manifoldNo+'</td>' +
					'<td valign="top" '+rowbgColour+'>'+roomName+'</td>';
					if (portsExist)	//CJM Jan2017 Check whether Ports information exists
					{
						roomsList += '<td valign="top" '+rowbgColour+'>'+numPorts+'</td>'; //cjmOct2016
					}
				roomsList += '</tr>' ;
			}
		}
		*/
		
		var manifoldRooms = transRecord.getFieldValue('custbody_manifold_rooms');
		var manifoldPorts = transRecord.getFieldValue('custbody_manifold_ports');	//cjmOct2016
		
		
		//CJM Jan2017  starts.........
		//To deal with the Number of Ports missing from the quote
		
		var portsExist = 'F';
		
		if (manifoldRooms != null && manifoldRooms != '')
		{
			if (manifoldPorts != null && manifoldPorts != '')
			{ 	
				portsExist = 'T';
			}
			
			var manifoldRoomsArray = manifoldRooms.split(',');
			
			nlapiLogExecution('DEBUG', 'CJM Jan2017 - portsExist='+portsExist); 
			
			if (portsExist == 'T')
			{
				var manifoldPortsArray = manifoldPorts.split(',');	//cjmOct2016
			}
			
			var numberOfManifolds = manifoldRoomsArray.length;
			for (var p=1; p <= numberOfManifolds; p++)
			{
				var roomName = manifoldRoomsArray.slice(p-1,p);
				var manifoldNo = p;
				var rowbgColour = "";
				
				if (isEven(p) == true)
				{
					rowbgColour = 'bgcolor="#FFFFFF"';
				}
				if (portsExist == 'T')
				{
					var numPorts = manifoldPortsArray.slice(p-1,p);	//cjmOct2016
					roomsList = roomsList +			
					'<tr>' +
						'<td valign="top" '+rowbgColour+'>'+manifoldNo+'</td>' +
						'<td valign="top" '+rowbgColour+'>'+roomName+'</td>' +
						'<td valign="top" '+rowbgColour+'>'+numPorts+'</td>' +	//cjmOct2016
					'</tr>' ;
				}
				else
				{
					roomsList = roomsList +			
					'<tr>' +
						'<td valign="top" '+rowbgColour+'>'+manifoldNo+'</td>' +
						'<td valign="top" '+rowbgColour+'>'+roomName+'</td>' +
					'</tr>' ;
				}
			}
		}

					
					//CJM Jan2017 ends........
			
					
		roomsList = roomsList +
					'<tr>\n' +
					'<td valign="top">&nbsp;</td>\n' +
				    '<td align="left" valign="top" >&nbsp;</td>\n' +
				    '<td colspan="1" valign="top" >&nbsp;</td>\n' +
				'</tr>\n' +
			'</table>\n' +
		'<h3>Rooms</h3>\n' +
			'<table width="539" border="0" cellspacing="1" cellpadding="4" >\n' +
		    '<tr style="color:#FFF;">\n' +
		      '<td valign="top" bgcolor="#666666"><strong>Room</strong></td>\n' +
		      '<td valign="top" bgcolor="#666666"><strong>Floor Construction</strong></td>\n' +
		      '<td valign="top" bgcolor="#666666"><strong>Design Temp &deg;C</strong></td>\n' +
		      '<td valign="top" bgcolor="#666666" ><strong>Thermostat</strong></td>\n' +	//cjmOct2016
		      '<td valign="top" bgcolor="#666666" ><strong>Floor</strong></td>\n' +	//cjmOct2016
		      '<td valign="top" bgcolor="#666666" ><strong>Manifold</strong></td>\n' +	//cjmNov2017 Case:SUP351244
		      //'<td colspan="2" valign="top" bgcolor="#666666" ><strong>Thermostat</strong></td>\n' +
		    '</tr>\n';
		
	var roomCount = transRecord.getLineItemCount('recmachcustrecord_cad_rooms_quote');
	for (var i=1; i <= roomCount; i++)
	{
		var roomName = transRecord.getLineItemValue('recmachcustrecord_cad_rooms_quote', 'name', i);
		var floorCons = transRecord.getLineItemText('recmachcustrecord_cad_rooms_quote', 'custrecord_cad_floor_construction', i);
		var designTemp = transRecord.getLineItemValue('recmachcustrecord_cad_rooms_quote', 'custrecord_cad_design_temp', i);
		var thermostat = transRecord.getLineItemText('recmachcustrecord_cad_rooms_quote', 'custrecord_cad_rooms_stats', i);
		var floorLevel = transRecord.getLineItemValue('recmachcustrecord_cad_rooms_quote', 'custrecord_cad_floor_level', i);	//cjmOct2016
		var manifoldNum = transRecord.getLineItemValue('recmachcustrecord_cad_rooms_quote', 'custrecord_cad_manifold_no', i);	//cjmNov2017 Case:SUP351244

		
		var rowbgColour = "";
		if (isEven(i) == true)
		{
			rowbgColour = 'bgcolor="#FFFFFF"';
		}
		roomsList = roomsList +
				'<tr style="border-top:#F0F0F0;">\n' +
					'<td align="left" valign="top" '+rowbgColour+'>'+roomName+'</td>\n' +
					'<td align="left" valign="top" '+rowbgColour+'>'+handleUndefined(lu_floor_cons_desc[floorCons])+'</td>\n' +
					'<td align="center" valign="top" '+rowbgColour+'>'+designTemp+'</td>\n' +
					'<td align="center" valign="top" '+rowbgColour+'>'+thermostat+'</td>\n' +
					'<td align="center" valign="top" '+rowbgColour+'>'+floorLevel+'</td>\n' +	//cjmOct2016
					'<td align="center" valign="top" '+rowbgColour+'>'+manifoldNum+'</td>\n' +	//cjmNov2017 Case:SUP351244
				'</tr>\n';
	}	    
		roomsList = roomsList + '</table>\n' +
				
			'</div>\n' +
			'</div>\n';
	return roomsList;
}


function itemsListHTML(tranID, type, system, forms)
{
//	var transRecord = nlapiLoadRecord('estimate', tranID);
	var systemPrice = nlapiGetFieldValue('custbody_subtotal');
	var department = nlapiGetFieldValue('department');
	var plusVAT = ' + VAT';
	var itemsTable = '';
	var itemsList = '';
	var loProMax = 'F';
	var loProMaxTable = '';
	var loProMax14 = 'F';		//CJM Apr2018
	var loProMax14Table = '';	//CJM Apr2018
	var itemCodeLink = '';
	var neoStatSelected = 'F';	//CJM Dec2016
	var gshp1145 = 'F';			//CJM May2018
	var FastDeck = 'F';			//CJM May2018
	var FastDeckTable = '';		//CJM May2018
	var LoProLite = 'F';		//CJM June2018
	var LoProLiteTable = '';	//CJM June2018

		
	if (type == 'Underfloor Heating')
	{
		itemsTable = itemsTable + '<h2 class="acc_trigger breakhere">\n'+
		'<a href="#3" onclick="ga(\'send\', \'event\', \'quote\', \'Click\', \'whats-included\');"><div class="P-Header">What\'s Included</div></a></h2>\n' +
		'<div class="acc_container">\n' +
		'<div class="block">\n';
	}
	else
	{
		itemsTable = itemsTable + '<br>';
	}
		
	var itemCount = nlapiGetLineItemCount('item');
	for (var i=1; i <= itemCount; i++)
	{
		var itemCode = nlapiGetLineItemText('item', 'item', i);
		if (itemCode.substring(0,6) == "Hidden" || itemCode.substring(0,5) == "SPACE")
		{
			itemCode = "";
		}
		else 
		{
			itemCodeLink = handleUndefined(lu_items_popup_pics2[itemCode]);			
		}
		
		if (itemCode == 'LPM10')
		{
			loProMax = 'T';
		}
		
		//CJM Dec2016 starts....
		if (itemCode == 'dial')
		{
			neoStatSelected = 'T';
		}
		//CJM Dec2016 ends...
		
		
		//CJM May2018 Replacement HPs
		if (itemCode.substring(3,4) == "1145")
			{
				gshp1145 = 'T';
			}
		
		//CJM May2018 FastDeck
		if (itemCode == "FD14")
			{
				FastDeck = 'T';
			}

		//CJM June2018 LoProLite
		if (itemCode == "LPL10")
			{
				LoProLite = 'T';
			}

		var quantity = handleNullNumber(nlapiGetLineItemValue('item', 'quantity', i));
		
		nlapiLogExecution('DEBUG', '17. custitem_quote_description: ' +nlapiGetLineItemValue('item', 'custitem_quote_description', i));
		
		nlapiLogExecution('DEBUG', '17a. custitem_quote_description: ' +nlapiGetLineItemText('item', 'custitem_quote_description', i));
		
		//var itemDesc = handleNull(nlapiGetLineItemValue('item', 'description', i));	//CJM Aug2017
		
		var itemType = handleNull(nlapiGetLineItemValue('item', 'custitem_prod_type', i));
		var itemDesc = handleNull(nlapiGetLineItemValue('item', 'custitem_quote_description', i));
		
		nlapiLogExecution('DEBUG', '18. itemCode:'+ itemCode+ ', itemDesc:'+ itemDesc+ ', custitem_quote_description: ' +nlapiGetLineItemValue('item', 'custitem_quote_description', i) + ', custitem_prod_type: ' +nlapiGetLineItemValue('item', 'custitem_prod_type',i));

		/* Removed Aug2018 - CJM
		if (itemDesc == '')
			{	itemDesc = handleNull(nlapiGetLineItemValue('item', 'description', i));		}
		else
			{	itemDesc = itemDesc.replace ('AcoustiMax', 'AcoustiMax&#8482;');	//CJM Aug2017
				itemDesc = itemDesc.replace ('EnergyPro', 'EnergyPro&#8482;');		//CJM Dec2017
				itemDesc = itemDesc.replace ('LoPro', 'LoPro&#8482;');				//CJM may2018
				itemDesc = itemDesc.replace ('Fastflo', 'Fastflo&#8482;');			//CJM may2018
			}
		*/
			
		if (itemDesc == '')			// Quote description not found
			{	itemDesc = handleNull(nlapiGetLineItemValue('item', 'description', i));
			nlapiLogExecution('DEBUG', '18a. Item Description:' + itemDesc+ ', Line no: ' +i);
			
			if (itemDesc == '')	// Non-inventory items do not have a description field
				{
					itemDesc = handleNull(nlapiGetLineItemValue('item', 'salesdescription', i))
				    nlapiLogExecution('DEBUG', '18b. Item Description:' + itemDesc+ ', Line no: ' +i);
				}
			itemDesc = itemDesc.replace (/m\u00B2/g, 'mSqrd');
			
			itemDesc = itemDesc.replace (/AcoustiMax/g, 'AcoustiMax&reg;');
			itemDesc = itemDesc.replace (/EnergyPro/g, 'EnergyPro&reg;');
			itemDesc = itemDesc.replace (/LoPro/g, 'LoPro&reg;');
			itemDesc = itemDesc.replace (/Fastflo/g, 'Fastflo&reg;');
			itemDesc = itemDesc.replace (/FastDeck/g, 'FastDeck&reg;');
					
			itemDesc = itemDesc.replace(/[^\u0000-\u007E]/g, "");	// Remove unwanted invisible characters
			itemDesc = itemDesc.replace (/mSqrd/g, 'm&sup2;');
			
			}
		else
			{
			itemDesc = itemDesc.replace (/AcoustiMax/g, 'AcoustiMax&reg;');
			itemDesc = itemDesc.replace (/EnergyPro/g, 'EnergyPro&reg;');
			itemDesc = itemDesc.replace (/LoPro/g, 'LoPro&reg;');
			itemDesc = itemDesc.replace (/Fastflo/g, 'Fastflo&reg;');
			itemDesc = itemDesc.replace (/FastDeck/g, 'FastDeck&reg;');
					
			itemDesc = itemDesc.replace(/[^\u0000-\u007E]/g, "");	// Remove unwanted invisible characters
			
			nlapiLogExecution('DEBUG', '18c. Item Description:' + itemDesc+ ', Line no: ' +i);
			
			itemDesc = itemDesc.replace (/mSqrd/g, 'm&sup2;');

			}
		
		var rowbgColour = "";
		if (isEven(i) == true)
			rowbgColour = 'bgcolor="#FFFFFF"';
		
		nlapiLogExecution('DEBUG', '19. Item Description:' + itemDesc+ ', Line no: ' +i);
		
		itemsList += '<tr style="border-top:#F0F0F0; font-family : MuseoSans-300, Arial, Helvetica;">\n' +
		'<td align="left" valign="top" '+rowbgColour+'>'+quantity+'</td>\n' +
		'<td colspan="3" valign="top" '+rowbgColour+'>'+itemDesc+' '+itemCodeLink+ '</td>\n' +
		'</tr>\n';
	}
	
	/* KEY POINTS REMOVED - CJM August 2018
	 
	if (loProMax == 'T')
	{
		loProMaxTable = '<table cellspacing="0" width="544">\n' +
		'<tr style="background-color:#666; color:#FFF; font-size:17px; font-weight:bold; ">\n' +
		'<td height="40" colspan="2" align="left" valign="middle" style="padding-left:10px; FONT-FAMILY: corbel, Arial, Helvetica, sans-serif; font-size:17px;"><strong>Key Points</strong></td>\n' +
		'</tr>\n' +
		'<tr style="background-color:#7AC143;line-height:2px;">\n' +
		'<td valign="top">&nbsp;</td>\n' +
		'<td valign="top">&nbsp;</td>\n' +
		'</tr>\n' +
		'<tr><td valign="top" bgcolor="#F1F4F9" style="padding-left:10px; padding-top:10px; padding-bottom:8px;LINE-HEIGHT: 18px; FONT-FAMILY: corbel, Arial, Helvetica, sans-serif; COLOR: #333; FONT-SIZE: 14px">\n' +
		'<p>All LoPro&reg;Max systems include all the LoPro&reg;QuickSet Self Levelling Compound needed to achieve a 22mm coverage of the floor area (based on a level floor +/-2.5mm), vacuum formed castellated panel sheets  and Nu-Heat\'s tried and tested 10mm FastFlo tube.</p>\n' + 
		//CJM Screed TAB removed'<p>For areas over 100m&sup2; we have a national network of screeding contractors who will be happy to provide a quote for installation of the self-levelling compound. These are listed in the \'Screeding Contractors Information\' section.</p> \n' + 
		'<p>For areas over 100m&sup2; we have a national network of screeding contractors, for details please contact your Account Manager</p> \n' +
		'</td><td valign="center" bgcolor="#F1F4F9"><a href="'+ system +'/core/media/media.nl?id=3484875&c=472052&h=37c180817173b689923a" rel="lightbox[plants]" title="An example of LoPro&reg;Max components."><img src="'+ system +'/core/media/media.nl?id=3484875&c=472052&h=37c180817173b689923a" alt="LoPro&reg;Max components" width=120/></a></td></tr>\n' +
		'</table>\n' +
		'<br><br>\n' +
		'<H3>Included With Your Order</H3>';
	}
	
	// CJM Apr2018 start
	else if (loProMax14 == 'T')
	{
		loProMax14Table = '<table cellspacing="0" width="544">\n' +
		'<tr style="background-color:#666; color:#FFF; font-size:17px; font-weight:bold; ">\n' +
		'<td height="40" colspan="2" align="left" valign="middle" style="padding-left:10px; FONT-FAMILY: corbel, Arial, Helvetica, sans-serif; font-size:17px;"><strong>Key Points</strong></td>\n' +
		'</tr>\n' +
		'<tr style="background-color:#7AC143;line-height:2px;">\n' +
		'<td valign="top">&nbsp;</td>\n' +
		'<td valign="top">&nbsp;</td>\n' +
		'</tr>\n' +
		'<tr><td valign="top" bgcolor="#F1F4F9" style="padding-left:10px; padding-top:10px; padding-bottom:8px;LINE-HEIGHT: 18px; FONT-FAMILY: corbel, Arial, Helvetica, sans-serif; COLOR: #333; FONT-SIZE: 14px">\n' +
		'<p>The LoPro&reg;Max14 system includes the required amount of LoPro&reg;QuickSet self-levelling compound to achieve a 26mm coverage of the floor area (based on a level floor +/-2.5mm), vacuum formed castellated panel sheets and Nu-Heat�s tried and tested 14mm FastFlo tube.</p>\n' + 
		'<p>For areas over 100m&sup2; we have a national network of screeding contractors, for details please contact your Account Manager</p> \n' +
		'</td><td valign="center" bgcolor="#F1F4F9"><a href="'+ system +'/core/media/media.nl?id=3484875&c=472052&h=37c180817173b689923a" rel="lightbox[plants]" title="An example of LoPro&reg;Max14 components."><img src="'+ system +'/core/media/media.nl?id=3484875&c=472052&h=37c180817173b689923a" alt="LoPro&reg;Max14 components" width=120/></a></td></tr>\n' +
		'</table>\n' +
		'<br><br>\n' +
		'<H3>Included With Your Order</H3>';
	}
	// CJM Apr2018 end
		
	// CJM May2018 FastDeck start........
	else if (FastDeck == 'T')
	{
		FastDeckTable = '<table cellspacing="0" width="544">\n' +
		'<tr style="background-color:#666; color:#FFF; font-size:17px; font-weight:bold; ">\n' +
		'<td height="40" colspan="2" align="left" valign="middle" style="padding-left:10px; FONT-FAMILY: corbel, Arial, Helvetica, sans-serif; font-size:17px;"><strong>Key Points</strong></td>\n' +
		'</tr>\n' +
		'<tr style="background-color:#7AC143;line-height:2px;">\n' +
		'<td valign="top">&nbsp;</td>\n' +
		'<td valign="top">&nbsp;</td>\n' +
		'</tr>\n' +
		'<tr><td valign="top" bgcolor="#F1F4F9" style="padding-left:10px; padding-top:10px; padding-bottom:8px;LINE-HEIGHT: 18px; FONT-FAMILY: corbel, Arial, Helvetica, sans-serif; COLOR: #333; FONT-SIZE: 14px">\n' +
		'<b>FastDeck&reg; includes everything you need for an impressively quick underfloor heating installation. Along with the core components, like the manifold, FastDeck&#8482; also includes:</b>\n' + 
		'<UL><LI>A unique tray fixing system for flexible tube runs</LI> \n' +
		'<LI>A conductive cement deck for a completely dry installation - fit floor coverings immediately</LI></UL> \n' +
		'</td><td valign="center" bgcolor="#F1F4F9"><a href="/core/media/media.nl?id=3484875&c=472052&h=37c180817173b689923a" rel="lightbox[plants]" title="An example of a FastDeck&reg; components."><img src="/core/media/media.nl?id=3484875&c=472052&h=37c180817173b689923a" alt="FastDeck&reg; components" width=120/></a></td></tr> \n';
		'</table>\n' +
		'<br><br>\n' +
		'<H3>Included With Your Order</H3>';
	}
	// CJM May2018 end
	
	// CJM June2018 LoProLite start........
	else if (LoProLite == 'T')
	{
		LoProLiteTable = '<table cellspacing="0" width="544">\n' +
		'<tr style="background-color:#666; color:#FFF; font-size:17px; font-weight:bold; ">\n' +
		'<td height="40" colspan="2" align="left" valign="middle" style="padding-left:10px; FONT-FAMILY: corbel, Arial, Helvetica, sans-serif; font-size:17px;"><strong>Key Points</strong></td>\n' +
		'</tr>\n' +
		'<tr style="background-color:#7AC143;line-height:2px;">\n' +
		'<td valign="top">&nbsp;</td>\n' +
		'<td valign="top">&nbsp;</td>\n' +
		'</tr>\n' +
		'<tr><td valign="top" bgcolor="#F1F4F9" style="padding-left:10px; padding-top:10px; padding-bottom:8px;LINE-HEIGHT: 18px; FONT-FAMILY: corbel, Arial, Helvetica, sans-serif; COLOR: #333; FONT-SIZE: 14px">\n' +
		'<b>LoPro&reg;Lite includes everything you need for a lightweight, low-profile underfloor heating installation. Along with the core components, like the manifold, LoPro&#8482;Lite also includes:</b>\n' + 
		'<UL><LI>A unique, high-density, pre-routed EPS board and castellated edge detail for easy, multi-directional run-back to the manifold.</LI> \n' +
		'<LI>10mm FastFlo&reg; underfloor heating tube for minimal height build-up and maximum flexibility.</LI></UL> \n' +
		'</td><td valign="center" bgcolor="#F1F4F9"><a href="/core/media/media.nl?id=3484875&c=472052&h=37c180817173b689923a" rel="lightbox[plants]" title="An example of a FLoPro&#8482;Lite components."><img src="/core/media/media.nl?id=3484875&c=472052&h=37c180817173b689923a" alt="LoPro&#8482;Lite components" width=120/></a></td></tr> \n';
		'</table>\n' +
		'<br><br>\n' +
		'<H3>Included With Your Order</H3>';
	}
	// CJM June2018 end
	 */
	
	var quoteType = nlapiGetFieldValue('custbody_quote_type');
	var renewBenefits = '';
	if (department != '31')
	{
		if (quoteType == '8')//GSHP
		{
			// CJM May2018 starts...
			if (gshp1145)
				{//FOR THE OLD 1145 GSHP MODELS
				renewBenefits = '<h5 style="color: #D71920;">Why choose a NIBE Ground Source Heat Pump</h5> \n'+
				'<p><img src="/core/media/media.nl?id=14227128&c=472052&h=5ffc6af3947232b48006" alt="NIBE ground source heat pumps" width="250" style="float: right; margin-left: 8px; margin-top: 0px;"> \n'+
				'<ul><li>Highly efficient</li> \n'+
				'<li>MCS approved for the Renewable Heat Incentive</li> \n'+
				'<li>Easy to read, intuitive display</li> \n'+
				'<li>Quiet, low sound level</li> \n'+
				'<li>Supplied with a full set of mechanical and electrical docking drawings</li> \n'+
				'<li>7 year warranty when supplied and commissioned by Nu-Heat</li> \n'+
				'<li>Wireless control available through <a href="http://www.nu-heat.co.uk/products/heat-pumps/controls.html?utm_source=quote&utm_medium=email&utm_campaign=uplink" target="_blank"> NIBE Uplink</a></li> \n'+
				'</ul></p><p><a href="http://www.nu-heat.co.uk/products/heat-pumps/"> Find out more</a> about our range of NIBE heat pumps.<br><br></p> \n';
				}
			else
				{//FOR THE NEW 1155 AND 1255 GSHP MODELS
				renewBenefits = '<h5 style="color: #D71920;">Why choose a NIBE Ground Source Heat Pump</h5> \n'+
				'<p><img src="/core/media/media.nl?id=14227128&c=472052&h=5ffc6af3947232b48006" alt="NIBE ground source heat pumps" width="250" style="float: right; margin-left: 8px; margin-top: 0px;"> \n'+
				'<ul><li>Highly efficient, modulating heat pump</li> \n'+
				'<li>Adjusts output based on the heat needed, drawing less electricity</li> \n'+
				'<li>MCS approved for the Renewable Heat Incentive</li> \n'+
				'<li>Easy to read, intuitive display</li> \n'+
				'<li>Quiet, low sound level</li> \n'+
				'<li>Supplied with a full set of mechanical and electrical docking drawings</li> \n'+
				'<li>7 year warranty when supplied and commissioned by Nu-Heat</li> \n'+
				'<li>Wireless control available through <a href="http://www.nu-heat.co.uk/products/heat-pumps/controls.html?utm_source=quote&utm_medium=email&utm_campaign=uplink" target="_blank"> NIBE Uplink</a></li> \n'+
				'</ul></p><p><a href="http://www.nu-heat.co.uk/products/heat-pumps/"> Find out more</a> about our range of NIBE heat pumps.<br><br></p> \n';
				}
			/*
			renewBenefits = '<h5 style="color: #D71920;">Why choose a NIBE Ground Source Heat Pump</h5> \n'+
			'<p><img src="/core/media/media.nl?id=14227128&c=472052&h=5ffc6af3947232b48006" alt="NIBE ground source heat pumps" width="250" style="float: right; margin-left: 8px; margin-top: 0px;"> \n'+
			'<ul><li>Extremely high CoP</li> \n'+
			'<li>Easy to read performance display</li> \n'+
			'<li>Low sound level</li> \n'+
			'<li>Supplied with a full set of mechanical and electrical docking drawings</li> \n'+
			'<li>MCS compliant</li> \n'+
			'<li>7 year warranty when supplied and commissioned by Nu-Heat</li> \n'+
			'<li>Wireless remote control option available on NIBE Uplink - <a href="http://www.nu-heat.co.uk/products/heat-pumps/controls.html?utm_source=quote&utm_medium=email&utm_campaign=uplink" target="_blank">read more</a></li> \n'+
			'<li><p><a href="http://www.nu-heat.co.uk/products/heat-pumps.html?utm_source=quote&utm_medium=quote&utm_campaign=heatpumps" target="_blank">Find out more</a> about our range of NIBE heat pumps.<br><br></p> \n';
			*/
			// CJM May2018 ends...........
		}
	
		else if (quoteType == '9')//ASHP
		{
			var schematic = nlapiGetFieldValue('custbody_schematic');
			if (schematic.charAt(0) != 'H')
			{
				renewBenefits = '<h5 style="color: #D71920;">Why choose a NIBE Air Source Heat Pump</h5> \n'+
				'<p><img src="/core/media/media.nl?id=14227130&c=472052&h=8c2a583692d4c5d6abad" width="250" style="float: right; margin-left: 8px; margin-top: 0px;" alt="NIBE air source heat pumps">\n'+ 
				'<ul><li>Quiet operation</li> \n'+
				'<li>Improved energy efficiency</li> \n'+
				'<li>MCS approved offering access to the RHI</li> \n'+
				'<li>Supplied with a full set of mechanical and electrical docking drawings</li> \n'+
				'<li>Remote monitoring and adjustment of the system with NIBE Uplink - <a href="http://www.nu-heat.co.uk/products/heat-pumps/controls.html?utm_source=quote&utm_medium=email&utm_campaign=uplink" target="_blank">read more</a></li> \n'+
				'<li>Easy installation thanks to simple wiring, adjustable feet and long hoses</li> \n'+
				'<li>7 year warranty when supplied and commissioned by Nu-Heat</li></ul></p> \n'+
				'<p><a href="http://www.nu-heat.co.uk/products/heat-pumps/">Find out more</a> about our high performance heat pumps.<br><br></p> \n';
			}
		}
		else if (quoteType == '16')//Solar
		{
			renewBenefits = '<h5 style="color: #FBB034;">Why choose solar thermal</h5>\n'+
			'<p><img src="/core/media/media.nl?id=14227123&c=472052&h=c6fdc77aef2bc8ea8b30" alt="Solar thermal" width="250" style="float: right; margin-left: 8px;">\n'+
			'<ul><li>Produces up to 60% of annual hot water - as much as 100% in summer</li>\n'+
			'<li>Suitable for all types of homes - retrofit or new build</li>\n'+
			'<li>Both roof surface-mounted (on roof) and integral roof-mounted (in roof) flat panel models available</li>\n'+
			'<li>Quick and easy to install - no major building works involved</li>\n'+
			'<li>Eligible for government grants and incentives</li>\n'+
			'<li>Can be integrated with a heat pump to increase overall energy efficiency</li><br><br></ul></p>\n';
		}
	}

	itemsTable += renewBenefits + '<h3>Your system price - What\'s included?</h3>\n' + loProMaxTable + loProMax14Table + FastDeckTable + LoProLiteTable +
	'<table width="544" border="0" cellspacing="1" cellpadding="5">\n' +
	'<tr style="color:#FFF;">\n' +
	'<td align="center" valign="top" bgcolor="#666666" width="35px"><strong>Qty</strong></td>\n' +
	'<td colspan="3" valign="top" bgcolor="#666666"><strong>Item Description</strong></td>\n' +
	'</tr> \n'+ itemsList;

	var hpDisclaimer = '';
	if (type != 'Underfloor Heating')
	{		
		var salesEmail = nlapiGetFieldValue('custbody_sales_rep_email');
		var salesPhone = nlapiGetFieldValue('custbody_sales_rep_phone');
		
		if (type == 'Heat Pump')
		{
			hpDisclaimer = '<tr>\n' +
		    '<td colspan="3" valign="top"><p><h3>Important</h3></p>\n' +
		    '<p>This quotation may be subject to revision at design stage when a more in-depth heat loss calculation and energy simulation will be performed. \n'+
			'This can occasionally require that a different sized heat pump or ground loop array is required (if applicable) or a different heat pump (larger or smaller) is required. \n'+
			'A change of this nature may require the system to be re-priced.</p></td></tr>\n';
		
			plusVAT = '</span></td></tr>\n' +
			'<tr>\n' +
		    '<td valign="bottom" colspan="3" align="right"><span style="font-size:18px; color:#000; font-weight:bold;">(Excludes support option and VAT)';
		}
		var systemPrice = nlapiGetFieldValue('custbody_subtotal');
		var discountAmount = nlapiGetFieldValue('discounttotal');
		var systemSubTotal = nlapiGetFieldValue('subtotal');
		
		
		itemsTable = itemsTable+ '<tr>\n' +
			    '<td valign="top">&nbsp;</td>\n' +
			    '<td align="left" valign="top" >&nbsp;</td>\n' +
			    '<td colspan="1" valign="top" >&nbsp;</td>\n' +
			    '</tr>\n'  + 
			    '</table>\n';
		
		var rhiPic = '';
//		var cashbackTitle = '';
		var rhiDetail = '';
		var VATdetail = '';
		var erpDetail = '';
		var erpRatings = '';
		var vatCharge = '';
		if (department != '31')//Commercial Division
		{
			var contactMe = 'For further information on the RHI scheme either contact me on '+salesPhone+', email <a href="mailto:'+salesEmail+'">'+salesEmail+'</a> or refer to our <a href="http://www.nu-heat.co.uk/s.nl/it.I/id.645/.f">RHI factsheet</a>.<br />';
			var vatCharge = '<p><strong>VAT Charges</strong></p> \n'+ 
			'<p valign="top">VAT on renewables systems commissioned by Nu-Heat will be charged at 0% for new build projects and 5% for renovation projects.</p> \n'+ 
			'<p valign="top">VAT on renewables systems not commissioned by Nu-Heat will be charged at 20%. </p>';

			vatCharge = '<tr><td class="newtable" colspan="3"> \n'+
				'<h4>VAT charges</h4> \n'+
				'<p>VAT on renewables systems commissioned by Nu-Heat will be charged at 0% for new build projects and 5% for renovation projects.</p> \n'+
				'<p>VAT on renewables systems not commissioned by Nu-Heat will be charged at 20%.</p> \n'+
				'</td></tr> \n';
			
			if (quoteType == '8')//GSHP
			{// CJM May2018 starts..........
				cashbackTitle = 'Renewable Heat Incentive Payments'; 

				rhiPic = '<img src="/core/media/media.nl?id=14716195&c=472052&h=342757b9ddfeb2e28caf" alt="Potential RHI payment" style="background: none; border: 0px; margin: 0; padding: 0;">';
				rhiDetail = '<p>The Renewable Heat Incentive (RHI) is a tariff based* scheme offering regular payments to qualifying homeowners. It helps offset the cost of installing a renewable technology.</p> \n'+
				'<p><strong/>The potential payment shown here is for illustrative purposes only, based on the assumptions below:</strong></p>\n'+
				'<ul><li>Tariff of 20.46p/kWh* </li> \n'+
				'<li>Annual Heat Load of 15,000kWh </li> \n'+
				'<li>Seasonal Performance Factor (SPF) of 3.4</li></ul>';
		
				/*
				cashbackTitle = 'Homeowner Cash Back'; 

				rhiPic = '<img src="/core/media/media.nl?id=14227118&c=472052&h=a2b9264d180e3bf6d545" alt="Potential RHI payment" style="background: none; border: 0px; margin: 0; padding: 0;">';
				//CJM May2016 starts....
				//rhiDetail = '<p>The RHI is a tariff based scheme offering regular payments to qualifying homeowners. The tariff may be subject to change.</p> \n'+
				//'<p>Potential payment sum is for illustrative purposes only and assumes the following:</p>\n'+
				rhiDetail = '<p>The RHI is a tariff based scheme offering regular payments to qualifying homeowners. The tariff may be subject to change.</p> \n'+
				'<p>The potential payment shown here is for <u><strong>illustrative purposes</strong></u> only and is based on the assumptions below. The figures may differ from those shown in the System Performance section which is based on calculations specific to this project.</p>\n'+
				//CJM May2016 ends........
				'<ul><li>Tariff of 19.86p/kWh </li> \n'+ //PB 2017-09-20 old 19.64p	|| CJM 2017-5-2 old:19.33p
				'<li>Annual Heat Load of 15,000kWh </li> \n'+
				'<li>Seasonal Performance Factor (SPF) of 3.4</li></ul>';
				*/
				// CJM May2018 ends
			}

			else if (quoteType == '9')//ASHP
			{// CJM May2018 starts..........
				cashbackTitle = 'Renewable Heat Incentive Payments'; 

				rhiPic = '<img src="/core/media/media.nl?id=14716194&c=472052&h=5a2d7097b3790d31382a" alt="Potential RHI payment" style="background: none; border: 0px; margin: 0; padding: 0;">';
				rhiDetail = '<p>The Renewable Heat Incentive (RHI) is a tariff based* scheme offering regular payments to qualifying homeowners. It helps offset the cost of installing a renewable technology.</p> \n'+
				'<p><strong/>The potential payment shown here is for illustrative purposes only, based on the assumptions below:</strong></p>\n'+
				'<ul><li>Tariff of 10.49p/kWh* </li> \n'+
				'<li>Annual Heat Load of 15,000kWh </li> \n'+
				'<li>Seasonal Performance Factor (SPF) of 2.7</li></ul>';
				
				/*
				cashbackTitle = 'Homeowner Cash Back';
				rhiPic = '<img src="/core/media/media.nl?id=14227117&c=472052&h=6f847d6f1a79485199ee" alt="Potential RHI payment" style="background: none; border: 0px; margin: 0; padding: 0;">';
				//CJM May2016 starts........
				//rhiDetail = '<p>The RHI is a tariff based scheme offering regular payments to qualifying homeowners. The tariff may be subject to change.</p> \n'+
				//'<p>Potential payment sum is for illustrative purposes only and assumes the following:</p> \n'+
				rhiDetail = '<p>The RHI is a tariff based scheme offering regular payments to qualifying homeowners. The tariff may be subject to change.</p> \n'+
				'<p>The potential payment shown here is for <u><strong>illustrative purposes</strong></u> only and is based on the assumptions below. The figures may differ from those shown in the System Performance section which is based on calculations specific to this project.</p>\n'+
				//CJM May2016 ends........
				'<ul><li>Tariff of 10.18p/kWh </li> \n'+	//PB 2017-09-20 old 7.63p || CJM 2017-5-2 old:7.51p
				'<li>Annual Heat Load of 15,000kWh </li> \n'+
				'<li>Seasonal Performance Factor (SPF) of 2.7</li></ul>';
				*/
				// CJM May2018 ends
				
			}
			else if (quoteType == '16')//Solar
			{// CJM May2018 starts..........
				cashbackTitle = 'Renewable Heat Incentive Payments'; 

				rhiPic = '<img src="/core/media/media.nl?id=14716296&c=472052&h=e0fb4828ce7b4f0fddc9" alt="Potential RHI payment" style="background: none; border: 0px; margin: 0; padding: 0;">';
				rhiDetail = '<p>The Renewable Heat Incentive (RHI) is a tariff based* scheme offering regular payments to qualifying homeowners. It helps offset the cost of installing a renewable technology.</p> \n'+
				'<p><strong/>The potential payment shown here is for illustrative purposes only, based on the assumptions below:</strong></p>\n'+
				'<ul><li>Tariff of 10.66p/kWh* </li> \n'+
				'<li>A standard dwelling with four occupants </li> \n'+
				'<li>A modest overshading of 4m� of panels on a 30� south facing roof generating 1278kWh of heat</li></ul>';
				
				/*
				cashbackTitle = 'Homeowner Cash Back';
				rhiPic = '<img src="/core/media/media.nl?id=14227109&c=472052&h=8e02ffaa76077d1ace57" alt="Potential RHI payment" style="background: none; border: 0px; margin: 0; padding: 0;">';
				rhiDetail = '<p>The RHI is a tariff based scheme offering regular payments to qualifying homeowners. The tariff may be subject to change.</p> \n'+
				'<p>Potential payment sum is for illustrative purposes only and assumes the following:</p> \n'+
				'<ul><li>Tariff of 20.06p/kWh </li> \n'+	// CJM 2017-5-2 old:19.74p
				'<li>A 2 panel system in a 3-bed house with a 300-litre cylinder typically yielding 2000-2500 kWh p.a.</li></ul>';
				*/
				// CJM May2018 ends
			}

		}

		if (discountAmount != '0.00' && discountAmount != '' && discountAmount != null){
			
			priceTable=	'<table width="100%" border="0" cellspacing="0" cellpadding="0"> \n'+
			  '<tbody> \n'+
			   '<tr> \n'+
			      '<td class="newtable" valign="middle"><span class="discountprice">Subtotal:</span></td> \n'+
			      '<td class="newtable" valign="middle"><span class="discountprice">&pound;'+systemSubTotal+'</span></td> \n'+
			    '</tr> \n'+
			    '<tr> \n'+
			      '<td class="newtable" valign="middle"><span class="discountprice">Discount:</span></td> \n'+
			      '<td class="newtable" valign="middle"><span class="discountprice"> -&pound;'+fixedTwoDP(Math.abs(discountAmount))+'</span></td> \n'+
			    '</tr> \n'+
			    '<tr> \n'+
			      '<td class="newtable" width="100" valign="middle"><span class="hpquoteprice">Total:</span></td> \n'+
			      '<td class="newtable" valign="middle"><span class="hpquoteprice">&pound;'+systemPrice+' + VAT</span></td> \n'+
			    '</tr> \n'+
			  '</tbody> \n'+
			'</table> \n';
			
			
		}
		else
		{
			priceTable=	'<table width="100%" border="0" cellspacing="0" cellpadding="0"> \n'+
			  '<tbody> \n'+
			    '<tr> \n'+
			      '<td class="newtable" width="100" valign="middle"><span class="hpquoteprice">Total:</span></td> \n'+
			      '<td class="newtable" valign="middle"><span class="hpquoteprice">&pound;'+systemPrice+' + VAT</span></td> \n'+
			    '</tr> \n'+
			  '</tbody> \n'+
			'</table> \n';
		}

		var systemHeatingRating = nlapiGetFieldValue('custbody_erp_system_heating_rating');
		var hwHeatingRating = nlapiGetFieldValue('custbody_erp_system_hot_water_rating');
//		var energyPDF = nlapiGetFieldValue('custbody_bb1_energy_pdf');
		var entity = nlapiGetFieldValue('entity');
		
		if (systemHeatingRating)
		{
			if (hwHeatingRating)
			{
				erpDetail = '<td class="newtable" width="24" height="150"><img src="/core/media/media.nl?id=14227091&c=472052&h=635c6598cf389c12d1a6/img/15-spaceheat.png" alt="Space heating rating" style="float: none; background: none; border: 0px; margin: 0; padding: 0;"><!--ONLY ADD THIS BIT IF THERE IS A WATER RATING --><br><img src="/core/media/media.nl?id=14227111&c=472052&h=841fedf29255d9176f50" alt="Water heating rating" style="float: none; background: none; border: 0px; margin: 0; padding: 0;"><!--END OF IF--></td> \n'+
				'<td class="newtable" width="70"><!--LINK TO LABEL --><a href="'+ forms +'/app/site/hosting/scriptlet.nl?script=645&deploy=1&compid=472052&h=db9338be5551924b1da3&trxid='+tranID+'&entityid='+entity+'" target="_blank" onclick="ga(\'send\', \'event\', \'quote\', \'Click\', \'erp-label\');">'+handleUndefined(lu_srp_rating[systemHeatingRating])+'</a><!--ONLY ADD THIS BIT IF THERE IS A WATER RATING --><br><a href="'+ forms +'/app/site/hosting/scriptlet.nl?script=645&deploy=1&compid=472052&h=db9338be5551924b1da3&trxid='+tranID+'&entityid='+entity+'" target="_blank">'+handleUndefined(lu_srp_rating[hwHeatingRating])+'</a><!-- END OF IF --></td> \n'+
				'<td class="newtable" valign="middle"><span class="hpquoteprice">'+priceTable+'</span></td> \n';
			}
			else
			{
				erpDetail = '<td class="newtable" width="24" height="150"><img src="/core/media/media.nl?id=14227091&c=472052&h=635c6598cf389c12d1a6" alt="Space heating rating" style="float: none; background: none; border: 0px; margin: 0; padding: 0;"></td> \n'+
				'<td class="newtable" width="70"><!--LINK TO LABEL --><a href="'+ forms +'/app/site/hosting/scriptlet.nl?script=645&deploy=1&compid=472052&h=db9338be5551924b1da3&trxid='+tranID+'&entityid='+entity+'" target="_blank" onclick="ga(\'send\', \'event\', \'quote\', \'Click\', \'erp-label\');">'+handleUndefined(lu_srp_rating[systemHeatingRating])+'</a></td> \n'+
				'<td class="newtable" valign="middle"><span class="hpquoteprice">'+priceTable+'</span></td> \n';
			}
			
			erpRatings = '<tr> \n'+
			'<td colspan="3" class="newtable"> \n'+
			'<h4>Energy efficiency ratings</h4> \n'+
			'<p>As part of the Energy Related Products Directive, or ErP, all new heating system packages must come with an energy rating and label.</p>\n'+
			'<p>The flame icon represents the energy efficiency rating for the heating element of the system from A++ - G.\n'+
			'A tap icon represents the energy efficiency rating for the hot water element of the system from A++ - G, where applicable.</p>\n'+
			'<p>The system fiche shows how the energy rating(s) for the system have been calculated.</p> \n'+
			'<p><a href="'+ forms +'/app/site/hosting/scriptlet.nl?script=645&deploy=1&compid=472052&h=db9338be5551924b1da3&trxid='+tranID+'&entityid='+entity+'" onclick="ga(\'send\', \'event\', \'quote\', \'Click\', \'erp-label-text\');">View your system package energy efficiency label</a><br><a href="#sfiche" id="toggle-fiche" onclick="ga(\'send\', \'event\', \'quote\', \'Click\', \'erp-fiche-text\');">View the system fiche</a></p></td> \n'+
			'</tr> \n';

		}
		else
		{
			erpDetail = '<td class="newtable" valign="middle"><span class="hpquoteprice">'+priceTable+'</span></td> \n';
		}
		
		
		itemsTable += //renewBenefits + 		
		'<table width="100%" border="0" style="padding-top: 0px;"><tbody> \n'+
		'<tr><td colspan="2" class="newtable" style="color:#6EC62E;"><h3>Renewable Heat Incentive Payments</h3></td></tr> \n'+	// CJM May2018
		'<tr> \n'+
		'<td class="newtable">'+rhiDetail+'</td> \n'+	// CJM May2018
		//'<td class="newtable"><h4>RHI payments</h4>'+rhiDetail+'</td> \n'+
		'<td width="130" class="newtable">'+rhiPic+'</td> \n'+
		'</tr> \n'+
		'<tr><td colspan="2" class="newtable"><p>An estimated annual heat load specific to this project can be found under the System Performance section.</p></td></tr> \n'+	// CJM May2018
		'<tr> \n'+
		'<td colspan="2" class="newtable"><p>For further information on the RHI scheme read our <a href="/core/media/media.nl?id=180172&c=472052&h=4b885fb3cbc90ae9401b&_xt=.pdf">RHI factsheet</a>.</p></td> \n'+	// CJM May2018
		//
		//'<tr style="font-size: 10px;"><i>*Tariffs are subject to change</i></tr> \n'+	// CJM May2018
		//'<td colspan="2" class="newtable"><p>For further information on the RHI scheme either contact me or refer to our <a href="/core/media/media.nl?id=180172&c=472052&h=4b885fb3cbc90ae9401b&_xt=.pdf">RHI factsheet</a>.</p></td> \n'+
		'</tr> \n'+
		'</tbody></table> \n'+
		'<p style="font-size: 12px;"><i>*Tariffs are subject to change</i></p> \n'+
		'<br> \n'+
		'<div style="border:#4F5251 solid 1px; width:100%; padding-left: 8px; padding-right:8px; background-color: #fff;"> \n'+
		'<table width="100%" border="0" style="padding-top: 0px;"><tbody> \n'+
		'<tr><td colspan="3" class="newtable"><br><h3 style="font-size: 20px;">Your quote price</h3></td></tr> \n'+
		'<tr> \n'+erpDetail+'</tr> \n'+
		'<tr> \n'+
		'<td colspan="3" class="newtable"> \n'+
		'<p style="border-bottom: 1px dashed #ccc; font-size: 2px;">&nbsp;</p></td> \n'+
		'</tr> \n'+ erpRatings +'</tbody> \n'+vatCharge+'</table> \n'+
		'</div><br /><br /> \n';
		
		
		
		
		
		if (type == 'Heat Pump' || type == 'Solar')
		{
			var CPexFilters = new Array();
			CPexFilters[0] = new nlobjSearchFilter('custrecord_ex_quote_number', null, 'is', tranID);
			CPexFilters[1] = new nlobjSearchFilter('custrecord_upgrade_item_type', null, 'is', 'Extra');
			CPexFilters[2] = new nlobjSearchFilter('custrecord_upgrade_option_type', null, 'startswith', 'CP');
			var CPexColumns = new Array();
			CPexColumns[0] = new nlobjSearchColumn('custrecord_ex_item_name');
			CPexColumns[1] = new nlobjSearchColumn('custrecord_ex_item_descr');
			CPexColumns[2] = new nlobjSearchColumn('custrecord_ex_discount_price');
			CPexColumns[3] = new nlobjSearchColumn('custrecord_ex_quantity');
			CPexColumns[4]= CPexColumns[0].setSort();
			var CPexSearchresults = nlapiSearchRecord('customrecord_upgrades_and_extras', null, CPexFilters, CPexColumns);
			if (CPexSearchresults != null)
			{
				if (department == '31' /*&& nlapiGetUser() == 29918*/)
				{
					itemsTable += '<h3>Support Options</h3>\n'+
					'<table width="539" border="0">\n';	
				}
				else
				{	
					var salesEmail = nlapiGetFieldValue('custbody_sales_rep_email');
					var salesPhone = nlapiGetFieldValue('custbody_sales_rep_phone');
					
					itemsTable += '<h3>Support Package Option(s)</h3>\n'+
					'<p><span style="font-size:16px;">The following support package option(s) are available with this quote.</span> </p> \n';//You can contact me via <a href="mailto:'+salesEmail+'">'+salesEmail+'</a> or '+salesPhone+' to confirm your selection.</p> \n';

						itemsTable += '<table width="539" border="0">\n' +
						'<tr style="color:#FFF;">\n' +
					      '<td valign="top"bgcolor="#666666"><strong>Support Option</strong></td>\n' +
					      '<td valign="top" width="60" bgcolor="#666666"><strong>Price</strong></td>\n' +
					    '</tr>\n';					
				}
				for ( var m = 0; CPexSearchresults != null && m < CPexSearchresults.length; m++ )
				{
					var CPexSearchresult = CPexSearchresults[ m ];		
					var upgradeName = CPexSearchresult.getValue('custrecord_ex_item_name');
					var itemDescription = CPexSearchresult.getValue('custrecord_ex_item_descr');
					var upgradePrice = fixedTwoDP(CPexSearchresult.getValue('custrecord_ex_discount_price'));
					var rowbgColour = "";
					if (isEven(m) == true)
					{
						rowbgColour = 'bgcolor="#FFFFFF"';
					}
					if (department == '31' /*&& nlapiGetUser() == 29918*/)
					{
						itemsTable += '<tr>\n' +
						'<td align="left" valign="top" style="padding-left:0px;">'+ itemDescription +'</td>\n' +
						'<td width="60" align="left" valign="top">&pound;'+ upgradePrice +'</td>\n' +
						'</tr>\n';
					}
					else
					{	
						itemsTable += '<tr style="border-top:#F0F0F0;">\n' +
							'<td align="left" valign="top" '+rowbgColour+'><b>'+ upgradeName +'</b><br>'+ itemDescription +'</td>\n' +
							'<td align="left" valign="top" '+rowbgColour+'>&pound;'+ upgradePrice +'</td>\n' +
							'</tr>\n';
					}
				}
				itemsTable += '</table>\n' ;
			}
		}	
//		if (department == '31' )
//		{
//			itemsTable += hpDisclaimer +'<p>This quotation is subject to our <a href="/core/media/media.nl?id=102664&c=472052&h=82644df2d5439927e946&_xt=.pdf">terms and conditions</a>.</p>';
//		}	
//		else
//		{
			itemsTable += hpDisclaimer + '<br /><div class="hidefoot">'+ nextStepInlineLPM(tranID) +'</div> <table><tr><td><p>This quotation is subject to our <a href="/core/media/media.nl?id=102664&c=472052&h=82644df2d5439927e946&_xt=.pdf">terms and conditions</a>.</p></td></tr></table>';
//		}
	}
	else 
	{
		itemsTable += hpDisclaimer + '</table>\n </div>\n' ;
	}
	itemsTable +=     
	'</div>\n' ;
	return itemsTable;
}

function upgradesHTML(tranID)
{
	//CJM Aug2017 New Floor Construction AcoustiMax�14 (AMC14 & AMT14)
	
	/* for removing dial stat and when any neoStat option appears in the BoM
	 * CJM Jan 2017
	 * 
	 
		var newUpgrade = '';
	//	var transRecord = nlapiLoadRecord('estimate', tranID);
		var salesEmail = nlapiGetFieldValue('custbody_sales_rep_email');
		var salesPhone = nlapiGetFieldValue('custbody_sales_rep_phone');
		var upgradesList = '<h2 class="acc_trigger breakhere"><a href="#4" onclick="ga(\'send\', \'event\', \'quote\', \'Click\', \'ufh-upgrades\');"><div class="P-Header">Upgrades and Extras</div></a></h2>\n' +
	//		'<div class="acc_container" >\n' +
	//		'<div class="block" >\n' +
	//		'<p><span style="font-size:14px;"><strong>It\'s quick and easy to upgrade to any of the options shown below. Please contact me on <a href="mailto:'+salesEmail+'">'+salesEmail+'</a> or '+salesPhone+' and I will update your quote immediately.</strong></span> </p>\n';
			
		'<div class="acc_container" style="display: block; overflow: hidden;">\n' +
		'<div class="block">\n' +
		'<h3>Included in your quote</h3>\n' +
		'<div style="border:#4F5251 solid 1px; width:100%; padding-left: 8px; padding-right:8px;">\n' +
		'<br>\n' +
		'<table width="100%" border="0" style="padding-top: 0px;">\n' + 
		'<tbody>\n' +
		'<tr style="margin-bottom: 22px;">\n' + 
		'<td width="210" style="padding:0" valign="top"><img style="border:none; padding:0; margin:0;" src="/core/media/media.nl?id=14227101&c=472052&h=edc895c640b84f786954" alt="Standard Dial Stat" width="210" height="143"></td>\n' + 	 
		// CJM '<td valign="top" style="padding-top:0px;"><h5 style="color: #6EC62E; margin-top: 0px; margin-bottom:0px; font-size: 14px;">Standard dial thermostat</h5><p><span class="stattext">A dial-type thermostat with 4-channel timeclock and setback facility is supplied as standard. This is a straightforward and simple method of controlling the underfloor heating system.<br><a href="/core/media/media.nl?id=7512975&c=472052&h=fd0fbf341fdde385ef99" rel="lightbox[fiche7]">View product fiche</a><br></span></p></td>\n' + 	 
		'<td valign="top" style="padding-top:0px;"><h5 style="color: #6EC62E; margin-top: 0px; margin-bottom:0px; font-size: 14px;">Standard dial thermostat</h5><p><span class="stattext">A dial thermostat with 4-channel timeclock and setback facility is supplied as standard. It offers a stylish yet simple and straightforward method of controlling an underfloor heating system.<br><a href="/core/media/media.nl?id=7512975&amp;c=472052&amp;h=fd0fbf341fdde385ef99" rel="lightbox[fiche]">View product fiche</a><br></span></p></td>\n' +
		'<td width="110" style="padding:0" valign="top">&nbsp;</td>\n' + 
		'</tr>\n' +
		'</tbody>\n' +
		'</table>\n' +
		'</div>\n' +
		'<br> \n';
		*/
	
		var ufhSchematic = nlapiGetFieldValue('custbody_schematic');
		var newUpgrade = '';
	//	var transRecord = nlapiLoadRecord('estimate', tranID);
		var salesEmail = nlapiGetFieldValue('custbody_sales_rep_email');
		var salesPhone = nlapiGetFieldValue('custbody_sales_rep_phone');
		var upgradesList = '<h2 class="acc_trigger breakhere"><a href="#4" onclick="ga(\'send\', \'event\', \'quote\', \'Click\', \'ufh-upgrades\');"><div class="P-Header">Upgrades and Extras</div></a></h2>\n' +
	//		'<div class="acc_container" >\n' +
	//		'<div class="block" >\n' +
	//		'<p><span style="font-size:14px;"><strong>It\'s quick and easy to upgrade to any of the options shown below. Please contact me on <a href="mailto:'+salesEmail+'">'+salesEmail+'</a> or '+salesPhone+' and I will update your quote immediately.</strong></span> </p>\n';
			
		'<div class="acc_container" style="display: block; overflow: hidden;">\n' +
		'<div class="block">\n' +
		'<h3>Included in your quote</h3>\n' +
		'<div style="border:#4F5251 solid 1px; width:100%; padding-left: 8px; padding-right:8px;">\n' +
		'<br>\n' +
		'<table width="100%" border="0" style="padding-top: 0px;">\n' + 
		'<tbody>\n' +
		'<tr style="margin-bottom: 22px;">\n' + 
		'<td width="210" style="padding:0" valign="top"><img style="border:none; padding:0; margin:0;" src="/core/media/media.nl?id=14227101&c=472052&h=edc895c640b84f786954" alt="Standard Dial Stat" width="210" height="143"></td>\n' + 	 
		// CJM '<td valign="top" style="padding-top:0px;"><h5 style="color: #6EC62E; margin-top: 0px; margin-bottom:0px; font-size: 14px;">Standard dial thermostat</h5><p><span class="stattext">A dial-type thermostat with 4-channel timeclock and setback facility is supplied as standard. This is a straightforward and simple method of controlling the underfloor heating system.<br><a href="/core/media/media.nl?id=7512975&c=472052&h=fd0fbf341fdde385ef99" rel="lightbox[fiche7]">View product fiche</a><br></span></p></td>\n' + 	 
		'<td valign="top" style="padding-top:0px;"><h5 style="color: #6EC62E; margin-top: 0px; margin-bottom:0px; font-size: 14px;">Standard dial thermostat</h5><p><span class="stattext">A dial thermostat with 4-channel timeclock and setback facility is supplied as standard. It offers a stylish yet simple and straightforward method of controlling an underfloor heating system.<br><a href="/core/media/media.nl?id=7512975&amp;c=472052&amp;h=fd0fbf341fdde385ef99" rel="lightbox[fiche]">View product fiche</a><br></span></p></td>\n' +
		'<td width="110" style="padding:0" valign="top">&nbsp;</td>\n' + 
		'</tr>\n' +
		'</tbody>\n' +
		'</table>\n' +
		'</div>\n' +
		'<br> \n';

		
		// Starts..........
		//CJM 2017 Apple Homekit
		/*
		var smartHKList = '<h2 class="acc_trigger breakhere"><a href="#4" onclick="ga(\'send\', \'event\', \'quote\', \'Click\', \'ufh-upgrades\');"><div class="P-Header">Smart Package Upgrades</div></a></h2>\n' +		
		'<div class="block">\n' +
		'<div class="acc_container" style="display: block; overflow: hidden;">\n' +
		'<div style="border:#4F5251 solid 1px; width:100%; padding-left: 8px; padding-right:8px;">\n' +
		///*
        '<br>\n' +
		'<table width="100%" border="0" style="padding-top: 0px;">\n' + 
		'<tbody>\n' +
		'<tr style="margin-bottom: 22px;">\n' + 
		'<td width="210" style="padding:0" valign="top"><img style="border:none; padding:0; margin:0;" src="/core/media/media.nl?id=14227101&c=472052&h=edc895c640b84f786954" alt="Standard Dial Stat" width="210" height="143"></td>\n' +
		'</tr>\n' +
		'</tbody>\n' +
		'</table>\n' +
		'</div>\n' +
		'</div>\n' +
		'<br> \n';
		//Ends............
		*/
		
		//var smartHKList = //'<h2 class="acc_trigger breakhere"><a href="#4" onclick="ga(\'send\', \'event\', \'quote\', \'Click\', \'ufh-upgrades\');"><div class="P-Header">Smart Packages Upgrades</div></a></h2>\n' + //CJM June2017
			//'<h3>Smart Packages Upgrades</h3>\n' +
			//'<div class="acc_container" style="display: block; width:100%; padding-top: 0px; padding-left: 22px; padding-right: 22px; overflow: hidden;">\n' +
			//'<div class="block">\n' +
			//'<h3>Included in your quote</h3>\n' +
			//'<div style="border:#4F5251 solid 1px; width:100%; padding-left: 8px; padding-right:8px;">\n' +
			//'<br>\n' +
			//'<table width="100%" border="0" style="padding-top: 0px;">\n' + 
			//'<tbody>\n' + 
			//'<tr style="margin-bottom: 22px;">\n' + 
			//'<td width="210" style="padding:0" valign="top"><img style="border:none; padding:0; margin:0;" src="/core/media/media.nl?id=14227101&c=472052&h=edc895c640b84f786954" alt="Standard Dial Stat" width="210" height="143"></td>\n' + 	 
			//'<td valign="top" style="padding-top:0px;"><h5 style="color: #6EC62E; margin-top: 0px; margin-bottom:0px; font-size: 14px;">Standard dial thermostat</h5><p><span class="stattext">A dial thermostat with 4-channel timeclock and setback facility is supplied as standard. It offers a stylish yet simple and straightforward method of controlling an underfloor heating system.<br><a href="/core/media/media.nl?id=7512975&amp;c=472052&amp;h=fd0fbf341fdde385ef99" rel="lightbox[fiche]">View product fiche</a><br></span></p></td>\n' +
			//'<td width="110" style="padding:0" valign="top">&nbsp;</td>\n' + 
			//'</tr>\n' +
			//'</tbody>\n' +
			//'</table>\n' +
			//'</div>\n' +
			//'<br> \n';

		var smartHKList = '';
	
	
	
		var upFilters = new Array();
		upFilters[0] = new nlobjSearchFilter('custrecord_ex_quote_number', null, 'is', tranID);
		upFilters[1] = new nlobjSearchFilter('custrecord_upgrade_item_type', null, 'is', 'Upgrade');
		upFilters[2] = new nlobjSearchFilter('custrecord_upgrade_option_type', null, 'is', 'Upgrade');
		var upColumns = new Array();
		upColumns[0] = new nlobjSearchColumn('custrecord_ex_item_name');
		upColumns[1] = new nlobjSearchColumn('custrecord_ex_item_descr');
		upColumns[2] = new nlobjSearchColumn('custrecord_ex_discount_price');
		upColumns[3]= upColumns[2].setSort();
		var upSearchresults = nlapiSearchRecord('customrecord_upgrades_and_extras', null, upFilters, upColumns);
		if (upSearchresults != null)
		{
			newUpgrade= '<h3>Thermostat Upgrades</h3><p>All prices quoted are excluding VAT.</p><div style="border:#CCCCCC thick solid; background-color:#FFFFFF;width:100%; padding-left: 8px; padding-right:8px;">\n' +
			'<table width="100%" border="0" style="padding-top: 0px;"> \n';
			
			for ( var j = 0; upSearchresults != null && j < upSearchresults.length; j++ )
			{
				var upSearchresult = upSearchresults[ j ];		
				var upgradeName = upSearchresult.getValue('custrecord_ex_item_name');
				var itemDescription = upSearchresult.getValue('custrecord_ex_item_descr');
				var upgradePrice = fixedTwoDP(upSearchresult.getValue('custrecord_ex_discount_price'));
				var rowbgColour = "";
				if (isEven(j) == true)
				{
					rowbgColour = 'bgcolor="#FFFFFF"';
				}
				
				newUpgrade += '<tr> \n' +
							   '<td width="24%" style="padding:0"><img style="border:none; padding:0" src="/core/media/media.nl?id=2487696&c=472052&h=aeda6485e074ccb33450" alt="Standard Dial Stat" width="110" height="110" /></td> \n' +
							    '<td width="3%" style="padding:0">&nbsp;</td> \n' +
							    '<td width="47%" align="center" valign="middle" style="padding:0"><img style="background:none; border:none;" src="/core/media/media.nl?id=2487699&c=472052&h=c39a3cb96c332d6ee642" alt="upgrade your thermostat" width="274" height="73" /></td> \n' +
							    '<td width="2%" style="padding:0">&nbsp;</td> \n' +
							    '<td width="24%" style="padding:0">'+lu_upgrades_image[upgradeName]+'</td> \n' +
							  '</tr> \n' +
							  '<tr> \n' +
							    '<td style="padding:0">Standard Dial</td> \n' +
							    '<td style="padding:0">&nbsp;</td> \n' +
							    '<td style="text-align: center; padding:0" valign="bottom"><span style="font-size:18px; color:#337BBD;">Total Upgrade Price: &pound;'+ upgradePrice +'</span></td> \n' +
							    '<td style="padding:0">&nbsp;</td> \n' +
							    '<td style="padding:0">'+lu_upgrades_name[upgradeName]+'</td> \n' +
							  '</tr> \n' +
							  '<tr> \n' +
							    '<td style="padding:0">&nbsp;</td> \n' +
							    '<td style="padding:0">&nbsp;</td> \n' +
							    '<td align="center" valign="bottom" style="padding:0">&nbsp;</td> \n' +
							    '<td style="padding:0">&nbsp;</td> \n' +
							    '<td style="padding:0">&nbsp;</td> \n' +
							  '</tr>';
			}
			
			newUpgrade +='</table>\n' ;
		}
		
		var mcv;
		var ncm;
			
		var upExFilters = new Array();
		upExFilters[0] = new nlobjSearchFilter('custrecord_ex_quote_number', null, 'is', tranID);
		upExFilters[1] = new nlobjSearchFilter('custrecord_upgrade_item_type', null, 'is', 'Upgrade');
		upExFilters[2] = new nlobjSearchFilter('custrecord_upgrade_option_type', null, 'is', 'Extra');
		var upExColumns = new Array();
		upExColumns[0] = new nlobjSearchColumn('custrecord_ex_item_name');
		upExColumns[1] = new nlobjSearchColumn('custrecord_ex_item_descr');
		upExColumns[2] = new nlobjSearchColumn('custrecord_ex_discount_price');
		upExColumns[3]= upExColumns[2].setSort();
		var upExSearchresults = nlapiSearchRecord('customrecord_upgrades_and_extras', null, upExFilters, upExColumns);
		if (upExSearchresults != null)
		{			
			
			
			for ( var k = 0; upExSearchresults != null && k < upExSearchresults.length; k++ )
			{
				var upExSearchresult = upExSearchresults[ k ];		
				var upgradeName = upExSearchresult.getValue('custrecord_ex_item_name');
				var itemDescription = upExSearchresult.getValue('custrecord_ex_item_descr');
				var upgradePrice = fixedTwoDP(upExSearchresult.getValue('custrecord_ex_discount_price'));
				var rowbgColour = "";
				if (isEven(k) == true)
				{
					rowbgColour = 'bgcolor="#FFFFFF"';
				}

				if (upgradeName == 'MCV3-C')
					mcv = '<table width="100%"><tr> \n' +
						'<td colspan="4" valign="top" style="padding:0"><span style="font-size:18px;"><strong>Central network control unit with touchscreen</strong></span></td> \n' +
			        '</tr> \n' +
			        '<tr> \n' +
				        '<td valign="top" style="padding:0"><p><img src="/core/media/media.nl?id=2487592&c=472052&h=8c7b1b4cbd27cdcbde25" alt="Central network control unit with touchscreen"width="110" height="110" align="right" style="border:none; float:right; background:none;padding-left:10px; padding-bottom: 10px;">A central controller that allows editing of thermostats from one   location, including being able to copy and repeat global changes. The   console also incorporates a history function to monitor how the system   performs under different conditions.Can be used with low-voltage <a href="http://www.nu-heat.co.uk/s.nl/it.I/id.888/.f?sc=7&category=40" target="_blank">pushbutton thermostat (PbL)</a> and <a href="http://www.nu-heat.co.uk/s.nl/it.I/id.892/.f?sc=7&category=40" target="_blank">low-voltage touchscreen version (TsL)</a>.</p></td> \n' +
			        '</tr> \n' +
			        '<tr> \n' +
			        	'<td align="right" style="padding:0"><span style="font-size:22px; color:#337BBD;">&pound;'+ upgradePrice +'</span></td> \n' +
			        '</tr></table>';
				else if (upgradeName == 'NCMApp-C')
					ncm = '<table width="100%"><tr> \n' +
						'<td valign="top" style="padding:0"><span style="font-size:18px;"><strong>Internet and SMS heating control unit, App. ready</strong></span></td> \n' +
			        '</tr> \n' +
			        '<tr> \n' +
				        '<td colspan="4" valign="top" style="padding:0"><p><img src="/core/media/media.nl?id=2487694&c=472052&h=cbd4c4e75d438c3bbdfc" alt="Internet and SMS heating control unit - Netmonitor+"width="110" height="110" align="right" style="border:none; float:right;  background:none;padding-left:10px; padding-bottom: 10px;">Allows the heating system to be controlled remotely via the http://www.nu-heat.co.uk/s.nl/it.I/id.883/.f?sc=7&category=40" target="_blank">Nu-Heat\'s FREE Smartphone App</a>. Can be used with low-voltage <a href="http://www.nu-heat.co.uk/s.nl/it.I/id.888/.f?sc=7&category=40" target="_blank">pushbutton thermostat (PbL)</a> and <a href="http://www.nu-heat.co.uk/s.nl/it.I/id.892/.f?sc=7&category=40">low-voltage touchscreen version (TsL)</a>.</p>'+
				        '<p><strong>For further information on Netmonitor+ watch a <a href="http://www.nu-heat.co.uk/s.nl/it.I/id.883/.f?sc=7&category=40" target="_blank">3D walk through</a>.</strong></p></td> \n' +
			        '</tr> \n' +
			        '<tr> \n' +
				        '<td align="right" style="padding:0"><span style="font-size:22px; color:#337BBD;">&pound;'+ upgradePrice +'</span></td> \n' +
			        '</tr></table>';
			}
			
			newUpgrade +='<br>\n' +
			//'<div style="border:#CCCCCC thick solid; background-color:#FFFFFF;width:100%; padding-left: 8px; padding-right:8px;">\n' +
		    '<table width="100%" border="0">\n' +
			    '<tr>\n' +
		        	'<td colspan="3" valign="top"><span style="font-size:15px; color:#337BBD;">Please note:</strong> the options below are for use only with the low voltage upgrades (PBL &amp; TSL)</span><br />\n' +
					'</td>\n' +
				'</tr>\n';
			
			if (ncm && mcv)
			{
				newUpgrade += '<tr>\n' +
				          '<td width="49%" valign="top">'+mcv+'</td>\n' +
				          '<td width="49%" valign="top">'+ncm+'</td>\n' +
				          '</tr></table></div>\n';
			}
			
		
		}
		
		if (newUpgrade && (!ncm || !mcv))
		{
			newUpgrade += '</table></div>\n';
		}
		
		
//		if (nlapiGetUser() == 29918)
//		{
			var SDUpgrade = '';
			var WLUpgrade = '';
			var LVUpgrade = '';
			var neoUpgrade = '';
			
			var smartUpgrade = '';
			var neoOptions = '';
			var pushButton = '';
			var lowVoltage = '';
			
			var neoStat = '';
			var smartControl = '';
			var neoStatTC = '';
			var hubPackPrice = 0;
			var hubAirPackPrice = 0;
			var neoHub = 'F';
			
			var neoAir = '';			//CJM May2016
			var neoAirHub = 'F';		//CJM May2016 Represents neoHub/neoPlug combination
			var smartControlAir = '';	//CJM May2016
			var RFSwitch = '';			//CJM May2016
			
			var neoUltra = '';				//CJM Jan2017
			var neoUltraHub = 'F';			//CJM Jan2017
			var neoUltraSmart = '';			//CJM Jan2017
			var smartControlUltra = '';	//CJM Jan2017
			var smartControlUltraAir = '';	//CJM Jan2017
			var hubUltraPackPrice = 0;	//CJM Jan2017
			var hubAirUltraPackPrice = 0;	//CJM Jan2017
			
			var smartControlPlus = '';	//CJM Jan2017
			var smartControlPlusAir = '';	//CJM Jan2017
			var neoStatPlusHub = 'F';		//CJM Jan2017
			var neoAirPlusHub = 'F';		//CJM Jan2017
			var hubStatplusPackPrice = 0;	//CJM Jan2017


			
			var PBS = ''; //Push button thermostat
			var PBR = ''; //Push button wireless thermostat
//			var LVstats = '';//Low Voltage thermostats
			var TSL = '';
			var PBL = ''; //Push button low voltage thermostat
			var MCV3 = ''; //Touchscreen central control unit for low voltage thermostats
			
			var SDupFilters = new Array();
			SDupFilters[0] = new nlobjSearchFilter('custrecord_ex_quote_number', null, 'is', tranID);
			SDupFilters[1] = new nlobjSearchFilter('custrecord_upgrade_item_type', null, 'is', 'SDUpgrade');
			var SDupColumns = new Array();
			SDupColumns[0] = new nlobjSearchColumn('custrecord_ex_item_name');
			SDupColumns[1] = new nlobjSearchColumn('custrecord_ex_item_descr');
			SDupColumns[2] = new nlobjSearchColumn('custrecord_ex_discount_price');
			SDupColumns[3]= SDupColumns[2].setSort();
			var SDupSearchresults = nlapiSearchRecord('customrecord_upgrades_and_extras', null, SDupFilters, SDupColumns);
			if (SDupSearchresults != null)
			{	
				SDUpgrade= '<div style="border:#4F5251 solid 1px; width:100%; padding-left: 8px; padding-right:8px;">\n' +
					'<br><h4 style="color: #4F5251;">Mains Voltage</h4><br>\n' +
					'<table width="100%" border="0" style="padding-top: 0px;"> \n' +
					'<tbody>\n';
				
				for ( var p = 0; SDupSearchresults != null && p < SDupSearchresults.length; p++ )
				{
					var SDupSearchresult = SDupSearchresults[ p ];		
					var upgradeName = SDupSearchresult.getValue('custrecord_ex_item_name');
					var upgradePrice = fixedTwoDP(SDupSearchresult.getValue('custrecord_ex_discount_price'));
					
					if (upgradeName == 'NWSR-A' && neoStat == '')
					{
						neoStat = statDetails(upgradeName,upgradePrice);
						hubPackPrice += parseFloat(upgradePrice);
					}
					if (upgradeName == 'NBSR-A' && neoStat == '')
					{
						neoStat = statDetails(upgradeName,upgradePrice);
						hubPackPrice += parseFloat(upgradePrice);
					}
					if (upgradeName == 'neoHub-C')
					{
						neoHub = 'T';
						hubPackPrice += parseFloat(upgradePrice);
					}
					if (upgradeName == 'neoStatW/TC-A' && neoStatTC == '')
					{
						neoStatTC = statDetails(upgradeName,upgradePrice);						
					}
					if (upgradeName == 'neoStatB/TC-A' && neoStatTC == '')
					{
						neoStatTC = statDetails(upgradeName,upgradePrice);						
					}
					if (upgradeName == 'PBS-A')
					{
						PBS = statDetails(upgradeName,upgradePrice);
					}
										
				}
				if (neoHub == 'T')
				{
					smartControl = statDetails('neoHub-C',fixedTwoDP(hubPackPrice));
				}
				SDUpgrade += neoStat + smartControl + neoStatTC + PBS + '</tbody></table><br></div>\n' ;
			}
			
			
			//NEOSTAT OPTIONS
			

			/*var smartHKLogo =
				//'<tr style="margin-bottom: 22px;">\n' +
				'<table colspan="3" cellspacing="0" width="564">\n' +
				//'<tr style="background-color:#3C3D41; color:#FFFFFF; ">\n' +
				'<td height="80" valign="middle" style="background-color:#3C3D41;  font-size:10px; color:#FFFFFF; padding-left:30px; FONT-FAMILY: corbel, Arial, Helvetica, sans-serif;">\n' +
				//'<td height="40" valign="middle" style="padding-right:10px; FONT-FAMILY: corbel, Arial, Helvetica, sans-serif;">\n' +
				'<div><img colspan="1" align="left" valign="middle" width="122.49" height="32.64" style="background:#3C3D41; border:#3C3D41;" src="/assets/img/Works-with-Apple-HomeKit.png" /></div>\n' +
				'<div><span width="66%" height="60px" style="padding-left:0px;color:#FFFFFF;">Apple HomeKit technology provides an easy, secure way to control your home�s lights, doors, thermostats, and more from your iPhone, iPad, or iPod touch. The Nu-Heat neoHub+ responds to Siri, letting you request the current temperature, set a new temperature or temperature hold and turn on/turn off standby directly from your iPhone, iPad, or iPod touch.\n' +
				//'<p>Apple HomeKit technology provides an easy, secure way to control your</p>\n' + 
				//'<p>home�s lights, doors, thermostats, and more from your iPhone, iPad, or iPod</p>\n' +
				//'<p>touch. The Nu-Heat neoHub+ responds to Siri, letting you request the current</p>\n' +
				//'<p>temperature, set a new temperature or temperature hold and turn on/turn</p>\n' +
				//'<p>off standby directly from your iPhone, iPad, or iPod touch.<\p>\n'+
				//'</span></div></td><tr><br><td valign="top">&nbsp;</td><td valign="top">&nbsp;</td></tr></table><br><br>\n' ;
				'</span></div></td><tr><br><td valign="top">&nbsp;</td></tr></table>\n' ;
				
				//'<strong>Apple HomeKit technology provides an easy, secure way to control your home�s lights, doors, thermostats, and more from your iPhone, iPad, or iPod touch. The Nu-Heat neoHub+ responds to Siri, letting you request the current temperature, set a new temperature or temperature hold and turn on/turn off standby directly from your iPhone, iPad, or iPod touch.</strong></td>\n' +
				//'</tr>\n' +
				//'<tr>\n' +
				//'<br>\n' +
				//'<td valign="top">&nbsp;</td>\n' +
				//'<td valign="top">&nbsp;</td>\n' +
				//'</tr>\n';
				*/

			/*
			var smartHKLogo =
				'<table colspan="3" cellspacing="0" width="564">\n' +
				'<td width="210" height="80" valign="middle" style="background-color:#3C3D41;  font-size:10px; color:#FFFFFF; padding-left:30px; FONT-FAMILY: corbel, Arial, Helvetica, sans-serif;">\n' +
				'<div><img colspan="2" align="left" valign="middle" width="122.49" height="32.64" style="background:#3C3D41; border:#3C3D41;" src="/assets/img/Works-with-Apple-HomeKit.png" /></div>\n' +
				'<div><span width="30%" height="60px" style="padding-left:0px;color:#FFFFFF;">Apple HomeKit technology provides an easy, secure way to control your home&rsquo;s lights, doors, thermostats, and more from your iPhone, iPad, or iPod touch. The Nu-Heat neoHub+ responds to Siri, letting you request the current temperature, set a new temperature or temperature hold and turn on/turn off standby directly from your iPhone, iPad, or iPod touch.\n' +
				'</span></div></td><tr><br></td><tr><br><td valign="top">&nbsp;</td></tr></table>\n' ;
			*/

			var smartHKLogo =
				'<table style="background-color:#3C3D41; padding-top:0px;" colspan="3" cellspacing="0" width="564" height="164" >\n' +
				'<td width="215" height="30" valign="middle" style="background-color:#3C3D41;  font-size:9px; color:#FFFFFF; padding-left:30px; FONT-FAMILY: corbel, Arial, Helvetica, sans-serif;">\n' +
				//'<div><img colspan="2" align="left" valign="middle" width="122.49" height="32.64" style="background:#3C3D41; border:#3C3D41;" src="/assets/img/Works-with-Apple-HomeKit.png" /></div>\n' +
				//'<div><img colspan="2" align="left" valign="middle" style="background:#3C3D41; border:#3C3D41; padding-left:20px;" src="/assets/img/Works-with-Apple-HomeKit.png" /></div>\n' +
				'<div><img colspan="2" align="left" valign="middle" width="90%" style="background:#3C3D41; border:#3C3D41; padding:0px;" src="/core/media/media.nl?id=14227136&c=472052&h=2dc28a457558a771f240&_xt=.svg"/></div> \n' +
				'<td><div style="line-height:1.4;"><span class="stattext" width="30%" height="50%" style="padding-left:0px; padding-bottom:0px; color:#FFFFFF; font-size:12px;">Apple HomeKit technology provides an easy, secure way to control your home&rsquo;s lights, doors, thermostats, and more from your iPhone, iPad, or iPod touch. The Nu-Heat neoHub+ responds to Siri, letting you request the current temperature, set a new temperature or temperature hold and turn on/turn off standby directly from your iPhone, iPad, or iPod touch.</td>\n' +
				//'</span></div></td><tr><br><td valign="top">&nbsp;</td></tr></table>\n' ;
				//'</span></div></td><tr><br></tr></table>\n' ;
				'</span></div></td></table><br>\n' ;
			
			//<span class="stattext">

			var smartHKUpgrade = '';
			var smartHKCompatibility = '';
	


			var neoUpgFilters = new Array();
			neoUpgFilters[0] = new nlobjSearchFilter('custrecord_ex_quote_number', null, 'is', tranID);
			neoUpgFilters[1] = new nlobjSearchFilter('custrecord_upgrade_item_type', null, 'is', 'neoUpgrade');
			var neoUpgColumns = new Array();
			neoUpgColumns[0] = new nlobjSearchColumn('custrecord_ex_item_name');
			neoUpgColumns[1] = new nlobjSearchColumn('custrecord_ex_item_descr');
			neoUpgColumns[2] = new nlobjSearchColumn('custrecord_ex_discount_price');
			neoUpgColumns[3]= neoUpgColumns[2].setSort();
			
			//CJM May2016
			nlapiLogExecution('DEBUG', 'Search filters:' +neoUpgFilters+ ', Columns:' +neoUpgColumns );
			
			var neoUpgSearchresults = nlapiSearchRecord('customrecord_upgrades_and_extras', null, neoUpgFilters, neoUpgColumns);
			if (neoUpgSearchresults != null)
			{	
				neoUpgrade= '<div style="border:#4F5251 solid 1px; width:100%; padding-left: 8px; padding-right:8px;"> \n' +
				'<br> \n' +
				'<table width="100%" border="0" style="padding-top: 0px;"> \n' +
				'<tbody>\n';
				
				
				// Starts.....
				// CJM 2017 Apple Homekit
				
				smartHKUpgrade= 
				
				'<div style="border:#4F5251 solid 1px; width:100%; padding-top: 30px; padding-left: 8px; padding-right:8px;">\n' + smartHKLogo +
				'<div><table width="564" border="0" style="padding-top: 10px;"> \n' +
				'<tbody>\n';
				
				//var HKLogo = '<td align="left" valign="middle" style="text-colour:#ffffff padding:0"><img style="background:none; border:none;" src="/assets/img/Works-with-Apple-HomeKit.png" width="122.49" height="32.64" /></td><br> \n';
				//var smartHKLogo = HKLogo;
				
				/*smartHKLogo =+ 
				'<tr style="margin-bottom: 22px;">\n' + 
				'<td valign="top" style="padding-top:0px;"><h5 style="color: #6EC62E; margin-top: 0px; margin-bottom:0px; font-size: 14px;"></h5></td>\n' +
				'<td width="110" style="padding:0" valign="top">&nbsp;</td>\n' + 
				'</tr>\n';
				*/

				/*
				//'<table cellspacing="0" width="544">\n' +
				'<tr style="background-color:#666; color:#FFF; font-size:17px; font-weight:bold; ">\n' +
				'<td height="40" colspan="2" align="left" valign="middle" style="padding-left:10px; FONT-FAMILY: corbel, Arial, Helvetica, sans-serif; font-size:17px;"><strong>Key Points</strong></td>\n' +
				'</tr>\n' +
				'<tr style="background-color:#7AC143;line-height:2px;">\n' +
				'<td valign="top">&nbsp;</td>\n' +
				'<td valign="top">&nbsp;</td>\n' +
				'</tr>\n' +
				'<tr><td valign="top" bgcolor="#F1F4F9" style="padding-left:10px; padding-top:10px; padding-bottom:8px;LINE-HEIGHT: 18px; FONT-FAMILY: corbel, Arial, Helvetica, sans-serif; COLOR: #333; FONT-SIZE: 14px">\n' +
				'<p>All LoPro&reg;Max systems include all the LoPro&reg;QuickSet Self Levelling Compound needed to achieve a 22mm coverage of the floor area (based on a level floor +/-2.5mm), vacuum formed castellated panel sheets  and Nu-Heat\'s tried and tested 10mm FastFlo tube.</p>\n' + 
				'<p>For areas over 100m&sup2; we have a national network of screeding contractors, for details please contact your Account Manager</p> \n' +
				'</td><td valign="center" bgcolor="#F1F4F9"><a href="'+ system +'/core/media/media.nl?id=3484875&c=472052&h=37c180817173b689923a" rel="lightbox[plants]" title="An example of LoPro&reg;Max components."><img src="'+ system +'/core/media/media.nl?id=3484875&c=472052&h=37c180817173b689923a" alt="LoPro&reg;Max components" width=120/></a></td></tr>\n' +
				'</table>\n' +
				'<br><br>\n' +
				'<H3>Included With Your Order</H3>';
				
				
				
				var HKLogo = //'<h3>Your system price - What\'s included?</h3>\n' + loProMaxTable +
				//'<table width="544" height="75" border="0" cellspacing="1" cellpadding="5">\n' +
				'<tr  width="100%" style="background-color:#3C3D41;">\n' +
					//'<td colspan="1" >Works with apple homekit lozenge</td>\n' +
					//'<td align="left" valign="middle" padding:0"><img style="background:none; border:none;" src="/assets/img/Works-with-Apple-HomeKit.png" width="122.49" height="32.64" /><br> \n' +
					'<td><img style="background:none; border:none;" src="/assets/img/Works-with-Apple-HomeKit.png" /><br> \n' +
					'<p style="text-colour:#ffffff>Apple HomeKit technology provides an easy, secure way to control your</p>\n' + 
					'<p>home�s lights, doors, thermostats, and more from your iPhone, iPad, or iPod</p>\n' +
					'<p>touch. The Nu-Heat neoHub+ responds to Siri, letting you request the current</p>\n' +
					'<p>temperature, set a new temperature or temperature hold and turn on/turn</p>\n' +
					'<p>off standby directly from your iPhone, iPad, or iPod touch.<\p></td><br><br>\n'+
				//'<td align="center" valign="top" bgcolor="#666666" width="35px"><strong>Qty</strong></td>\n' +
				//'<td colspan="3" valign="top" bgcolor="#666666"><strong>Item Description</strong></td>\n' +
				'</tr> \n';
				
				// '<td colspan="3" valign="top"><span style="font-size:15px; color:#337BBD;">Please note:</strong> the options below are for use only with the low voltage upgrades (PBL &amp; TSL)</span><br />\n' +
				//'<td width="47%" align="center" valign="middle" style="padding:0"><img style="background:none; border:none;" src="/core/media/media.nl?id=2487699&c=472052&h=c39a3cb96c332d6ee642" alt="upgrade your thermostat" width="274" height="73" /></td> \n' +
			    */

				


				//'<td valign="top" style="padding-top:0px;"><h5 style="color: #6EC62E; margin-top: 0px; margin-bottom:0px; font-size: 14px;"></h5><p><span class="stattext">APPLE HOMEKIT LOGO GOES HERE<br></span></p></td>\n' +
				//'<td valign="top" style="padding-top:0px;"><h5 style="color: #6EC62E; margin-top: 0px; margin-bottom:0px; font-size: 14px;"></h5></td>\n' +
				//'<td width="210" style="padding:0" valign="top"><img style="border:none; padding:0; margin:0; width:100%" src="/assets/img/HomeKit-box-out.png" height="143"></td>\n' + 	 
				//'<td width="110" style="padding:0" valign="top">&nbsp;</td>\n' + 
				//'</tr><br><br>\n';
				
				//Add table row for Homekit LOGO here
				// Ends.......
				
				
					
				/*
				'<tr style="margin-bottom: 22px;">\n' + 
				'<td valign="top" style="padding-top:0px;"><h5 style="color: #6EC62E; margin-top: 0px; margin-bottom:0px; font-size: 14px;"></h5><p><span class="stattext">APPLE HOMEKIT COMPATIBILITY STATEMENT GOES HERE.<br></span></p></td>\n' +
				'<td width="110" style="padding:0" valign="top">&nbsp;</td>\n' + 
				'</tr>\n';
				*/



				nlapiLogExecution('DEBUG', 'SearchResults=' +neoUpgSearchresults.length+ ' records' );	//CJM May2016
				
				for ( var p = 0; neoUpgSearchresults != null && p < neoUpgSearchresults.length; p++ )
				{
					var neoUpgSearchresult = neoUpgSearchresults[ p ];		
					var upgradeName = neoUpgSearchresult.getValue('custrecord_ex_item_name');
					var upgradePrice = fixedTwoDP(neoUpgSearchresult.getValue('custrecord_ex_discount_price'));
					
					//Programmable neoStats
					
					if (upgradeName == 'NWSR-A' && neoStat == '')
					{
						neoStat = neoDetails(upgradeName,upgradePrice);
						hubPackPrice += parseFloat(upgradePrice);
					}
					if (upgradeName == 'NBSR-A' && neoStat == '')
					{
						neoStat = neoDetails(upgradeName,upgradePrice);
						hubPackPrice += parseFloat(upgradePrice);
					}
					if (upgradeName == 'NSSR-A' && neoStat == '')
					{
						neoStat = neoDetails(upgradeName,upgradePrice);
						hubPackPrice += parseFloat(upgradePrice);
					}
					
					//CJM May2016 starts..............
					
					//Wireless neoStats - neoAir
					
					nlapiLogExecution('DEBUG', 'CJM May2016 - neoAir rowNumber='+p+ ', upgradeName='+upgradeName+', upgradePrice='+upgradePrice);
					
					if (upgradeName == 'NBBR-A' && neoAir == '')
					{
						neoAir = neoDetails(upgradeName,upgradePrice);
						hubAirPackPrice += parseFloat(upgradePrice);
					}
					if (upgradeName == 'NWBR-A' && neoAir == '')
					{
						neoAir = neoDetails(upgradeName,upgradePrice);
						hubAirPackPrice += parseFloat(upgradePrice);
					}
					if (upgradeName == 'NSBR-A' && neoAir == '')
					{
						neoAir = neoDetails(upgradeName,upgradePrice);
						hubAirPackPrice += parseFloat(upgradePrice);
					}
					//CJM May2016 ends................
				
					if (upgradeName == 'neoHub+-C')	//(upgradeName == 'neoHub-C') CJM June2017
					{
						var neoStatSmart = upgradeName;	//CJM June 2017
						neoHub = 'T';
						hubPackPrice += parseFloat(upgradePrice);
					}
					
					//neoStat - hotwater timer extra
					
					if (upgradeName == 'neoStatW/TC-A' && neoStatTC == '')
					{
						neoStatTC = neoDetails(upgradeName,upgradePrice);						
					}
					if (upgradeName == 'neoStatB/TC-A' && neoStatTC == '')
					{
						neoStatTC = neoDetails(upgradeName,upgradePrice);						
					}
					if (upgradeName == 'neoStatS/TC-A' && neoStatTC == '')
					{
						neoStatTC = neoDetails(upgradeName,upgradePrice);						
					}
					
					//CJM May2016 starts...
					
					/* CJM May2016 PBR-A superceded by wireless neoAir
					if (upgradeName == 'PBR-A')
					{
						PBR = neoDetails(upgradeName,upgradePrice);
					}
					*/
					
					//neoAir Smart Package
					
					//if (upgradeName == 'neoHub/1neoPlug-A' || upgradeName == 'neoHub/2neoPlug-A' || upgradeName == 'neoHub/3neoPlug-A' || upgradeName == 'neoHub/4neoPlug-A')	   CJM JUne2017
					if (upgradeName == 'neoHub+/1neoPlug-A' || upgradeName == 'neoHub+/2neoPlug-A' || upgradeName == 'neoHub+/3neoPlug-A' || upgradeName == 'neoHub+/4neoPlug-A')	// CJM June2017
					{
						var neoAirSmart = upgradeName;
						neoAirHub = 'T';
						hubAirPackPrice += parseFloat(upgradePrice);
					}
										
					//if (upgradeName.endsWith("neoPlug-A"))
					//{
						//var neoAirHub = upgradeName.endsWith("Plug-A");	//CJM May2016	neoAir SmartControl Upgrade
						//nlapiLogExecution('DEBUG', 'CJM May2016 - neoHub='+neoHub+ ', neoAirHub='+neoAirHub+', upgradePrice='+upgradePrice); 
					//}
					
					//RFSwitch
					
					if (upgradeName == 'RFSWITCH-C')
					{
						RFSwitch = neoDetails(upgradeName,upgradePrice);						
					}
					
					// CJM Jan2017 neoUltra
					if (upgradeName == 'neoUltraB-C' || upgradeName == 'neoUltraW-C')
					{
						neoUltra = 'T';
						var ultraPrice = parseFloat(upgradePrice);
						neoUltraSmart = upgradeName;
					}
				}
				

				nlapiLogExecution('DEBUG', 'CJM Jan2017 - neoHub='+neoHub+ ', neoAirHub='+neoAirHub+', neoUltra='+neoUltra);
				
				
				//neoStat Smart Package
				
				if (neoHub == 'T')
				{
					smartControl = neoDetails(neoStatSmart,fixedTwoDP(hubPackPrice));		// neoDetails('neoHub-C',fixedTwoDP(hubPackPrice)); //CJM June2017
					//CJM Jan2017 adding neoUltra Smart Package
					if (neoUltra = 'T')
					{	
						hubUltraPackPrice = parseFloat(hubPackPrice) + parseFloat(ultraPrice);
						//smartControlUltra = neoDetails('neoUltraStat',fixedTwoDP(hubUltraPackPrice));
						smartControlUltra = neoDetails('neoUltra+Stat',fixedTwoDP(hubUltraPackPrice));	//CJM June2017
					}
					nlapiLogExecution('DEBUG', 'CJM Jan2017 - neoUltra='+neoUltra+ ', hubPackPrice='+hubPackPrice+', hubUltraPackPrice='+hubUltraPackPrice);
				}
				
				//CJM May2016 starts.....
				
				if (neoAirHub == 'T')
				{
					//hubPackPrice += parseFloat(upgradePrice);
					smartControlAir = neoDetails(neoAirSmart,fixedTwoDP(hubAirPackPrice));
					//CJM Jan2017 adding neoUltra Air Smart Package
					if (neoUltra == 'T')
					{	hubAirUltraPackPrice = parseFloat(hubAirPackPrice) + parseFloat(ultraPrice);
						//smartControlUltraAir = neoDetails('neoUltraAir',fixedTwoDP(hubAirUltraPackPrice));
						smartControlUltraAir = neoDetails('neoUltra+Air',fixedTwoDP(hubAirUltraPackPrice));	//CJM June2017
					}
					nlapiLogExecution('DEBUG', 'CJM Jan2017 - neoUltra='+neoUltra+ ', hubPackPrice='+hubPackPrice+', hubAirUltraPackPrice='+hubAirUltraPackPrice);
				}
				
				//CJM May2016 ends...........
				
				//neoUpgrade += neoStat + smartControl + neoStatTC + PBR + '</tbody></table><br></div>\n' ;	//CJM May2016
				
				//neoUpgrade += neoStat + smartControl + neoAir + smartControlAir + RFSwitch + neoStatTC + '</tbody></table><br></div>\n' ;	//CJM May2016
				
				//CJM 2017 neoUpgrade += neoStat + smartControl + smartControlUltra + neoAir + smartControlAir + smartControlUltraAir + RFSwitch + neoStatTC + '</tbody></table><br></div>\n' ;	//CJM Jan2017
				
				// Starts.....CJM 2017
				neoUpgrade += neoStat + neoAir + RFSwitch + neoStatTC + '</tbody></table><br></div>\n' ;	//CJM Jan2017
				smartHKUpgrade += smartControl + smartControlUltra + smartControlAir + smartControlUltraAir +'</tbody></table></div>\n' ;	//CJM June2017
				//smartHKUpgrade += smartHKLogo + smartControl + smartControlUltra + smartControlAir + smartControlUltraAir + smartHKCompatibility +'</tbody></table><br></div>\n' ;
				
				//Ends.......CJM Jan2017

			}
			/*					CJM June2017 
			//WIRELESS OPTIONS

			var WupFilters = new Array();
			WupFilters[0] = new nlobjSearchFilter('custrecord_ex_quote_number', null, 'is', tranID);
			WupFilters[1] = new nlobjSearchFilter('custrecord_upgrade_item_type', null, 'is', 'WLUpgrade');
			WupFilters[2] = new nlobjSearchFilter('custrecord_upgrade_option_type', null, 'is', 'Upgrade');
			var WupColumns = new Array();
			WupColumns[0] = new nlobjSearchColumn('custrecord_ex_item_name');
			WupColumns[1] = new nlobjSearchColumn('custrecord_ex_item_descr');
			WupColumns[2] = new nlobjSearchColumn('custrecord_ex_discount_price');
			WupColumns[3]= WupColumns[2].setSort();
			var WupSearchresults = nlapiSearchRecord('customrecord_upgrades_and_extras', null, WupFilters, WupColumns);
			if (WupSearchresults != null)
			{
				WLUpgrade = '<p>&nbsp;</p> \n' +
				'<div style="border:#4F5251 solid 1px; width:100%; padding-left: 8px; padding-right:8px;"> \n' +
				'<br> <h4 style="color: #4F5251;">Wireless</h4> \n' +
				'<br> <table width="100%" border="0" style="padding-top: 0px;">  \n' +
				'<tbody>\n';

				for ( var l = 0; WupSearchresults != null && l < WupSearchresults.length; l++ )
				{
					var WupSearchresult = WupSearchresults[ l ];		
					var upgradeName = WupSearchresult.getValue('custrecord_ex_item_name');
					var upgradePrice = fixedTwoDP(WupSearchresult.getValue('custrecord_ex_discount_price'));
					
					if (upgradeName == 'PBR-A')
					{
						PBR = statDetails(upgradeName,upgradePrice);
					}
				}

				WLUpgrade += PBR + '</tbody></table><br></div>\n' ;
			}
		
		//LOW-VOLTAGE OPTIONS


			var LVUpFilters = new Array();
			LVUpFilters[0] = new nlobjSearchFilter('custrecord_ex_quote_number', null, 'is', tranID);
			LVUpFilters[1] = new nlobjSearchFilter('custrecord_upgrade_item_type', null, 'is', 'LVUpgrade');
			var LVUpColumns = new Array();
			LVUpColumns[0] = new nlobjSearchColumn('custrecord_ex_item_name');
			LVUpColumns[1] = new nlobjSearchColumn('custrecord_ex_item_descr');
			LVUpColumns[2] = new nlobjSearchColumn('custrecord_ex_discount_price');
			LVUpColumns[3]= LVUpColumns[0].setSort();
			var LVUpSearchresults = nlapiSearchRecord('customrecord_upgrades_and_extras', null, LVUpFilters, LVUpColumns);
			if (LVUpSearchresults != null)
			{
				LVUpgrade =  '<p>&nbsp;</p> \n' +
					'<div style="border:#4F5251 solid 1px; width:100%; padding-left: 8px; padding-right:8px;"> \n' +
					'<br> <h4 style="color: #4F5251;">Low voltage</h4> \n' +
					'<br> <table width="100%" border="0" style="padding-top: 0px;">  \n' +
					'<tbody>\n';
				
				for ( var n = 0; LVUpSearchresults != null && n < LVUpSearchresults.length; n++ )
				{
					var LVUpSearchresult = LVUpSearchresults[ n ];		
					var upgradeName = LVUpSearchresult.getValue('custrecord_ex_item_name');
					var upgradePrice = fixedTwoDP(LVUpSearchresult.getValue('custrecord_ex_discount_price'));

					if (upgradeName == 'PBL-A')
					{
						PBL = statDetails(upgradeName,upgradePrice);
					}
					
					if (upgradeName == 'MCV3-C')
					{
						MCV3 = statDetails(upgradeName,upgradePrice);
					}
					if (upgradeName == 'TSL-A')
					{
						TSL = statDetails(upgradeName,upgradePrice);
					}
					 
				}

				LVUpgrade += PBL + TSL + MCV3 + '</tbody></table><br></div>\n' ;
				
			}
			*/
			
			//upgradesList += newUpgrade + '<h3>Thermostat Upgrades</h3>' + SDUpgrade + WLUpgrade + LVUpgrade;
			if (smartControl)
			{
				smartUpgrade = '<div style="border:#4F5251 solid 1px; width:100%; padding-top: 8px; padding-left: 8px; padding-right:8px;">  \n' +
				'<br> <h4 style="color: #4F5251;">Smart control</h4>  \n' +
				'<br> <table width="100%" border="0" style="padding-top: 0px;">   \n' +
				'<tbody> \n' + smartControl +
				'</tbody></table><br></div>';
			}
			
			if (neoStat || neoStatTC)
			{
				neoOptions = '<p>&nbsp;</p> \n' +
				'<div style="border:#4F5251 solid 1px; width:100%; padding-left: 8px; padding-right:8px;"> \n' +
				'<br><h4 style="color: #4F5251;">neo options</h4> \n' +
				'<br><table width="100%" border="0" style="padding-top: 0px;">  \n' +
				'<tbody> \n' + neoStat + neoStatTC + 
				'</tbody></table><br></div>';
			}
			
			if (PBR || PBS)
			{
				pushButton = '<p>&nbsp;</p> \n' +
				'<div style="border:#4F5251 solid 1px; width:100%; padding-left: 8px; padding-right:8px;"> \n' +
				'<br><h4 style="color: #4F5251;">Push button</h4> \n' +
				'<br><table width="100%" border="0" style="padding-top: 0px;">  \n' +
				'<tbody> \n' + PBR + PBS + 
				'</tbody></table><br></div>';
			}
			
			if(PBL || TSL || MCV3)
			{
				lowVoltage = '<p>&nbsp;</p> \n' +
				'<div style="border:#4F5251 solid 1px; width:100%; padding-left: 8px; padding-right:8px;"> \n' +
				'<br><h4 style="color: #4F5251;">Low voltage (compatible with building management systems)</h4> \n' +
				'<br><table width="100%" border="0" style="padding-top: 0px;">  \n' +
				'<tbody> \n' + PBL + TSL + MCV3 +  
				'</tbody></table><br></div>';
			}
			
			//CJM March 2016 starts...............
			
			if (neoUpgrade)
			{
				neoUpgrade+=
				'</table>\n'+
				'<br>\n';

			}
			
			//Starts.......CJM June2017
			if (smartHKUpgrade)
			{
				smartHKUpgrade+= '</table>\n';
				//'</table>\n'+
				//'<br>\n';

			}
			//Ends..........



			
			/*
			if (neoUpgrade)
			{
				neoUpgrade=+
				//'<tbody>\n'+
				'<tr style="margin-bottom: 22px;"> \n'+
				'<td width="210" style="padding:0" valign="top"><img style="border:none; padding:0; margin:0;" src="/core/media/media.nl?id=14227095&c=472052&h=d728bf8f347ef65fcdc8" alt="Programmable neoStats" width="210" height="143"></td> \n'+
				'<td valign="top" style="padding-top:0px;"><h5 style="color: #6EC62E; margin-top: 0px; margin-bottom:0px; font-size: 14px;">Programmable neoStats</h5><p><span class="stattext">Nu-Heat\'s neoStats are high quality, hard-wired programmable thermostats that are fully compatible with home automation systems. Features include holiday and temperature hold, soft touch operation and energy-saving Optimum Start.<br>The slim-line neo is available in three colour options: black, white and silver.<br><strong><a href="http://www.nu-heat.co.uk/products/thermostats/programmable-dial.html?utm_source=quote&utm_medium=quote&utm_campaign=upgrades">Find out more</a></strong><br><a href="/core/media/media.nl?id=7512975&amp;c=472052&amp;h=fd0fbf341fdde385ef99" rel="lightbox[fiche]">View product fiche</a><br><br></span></p></td> \n'+
				'<td width="110" style="padding:0; background:url(/core/media/media.nl?id=14231217&c=472052&h=5cda6590ef3aef986dbe) no-repeat center top;" valign="top"><center><p style="padding-left:13px; padding-right: 20px; padding-top: 15px;"><span style="font-size: 14px; color: #fff;">Upgrade price</span><br><span style="font-size: 16px;"><strong>���</strong></span></p></center></td>\n'+
				'</tr>\n'+
				'<tr style="margin-bottom: 22px;"> \n'+
				'<td width="210" style="padding:0" valign="top"><img style="border:none; padding:0; margin:0;" src="/assets/img/16-stat-wireless.png" alt="wireless stat" width="210" height="143"></td> \n'+ 
				'<td valign="top" style="padding-top:0px;"><h5 style="color: #6EC62E; margin-top: 0px; margin-bottom:0px; font-size: 14px;">Wireless thermostat � ideal for renovations</h5><p><span class="stattext">The programmable, push-button wireless thermostat is a popular choice for renovation projects. As it\'s battery-powered rather than hard-wired, it causes minimal disruption to wall finishes.<br><strong><a href="http://www.nu-heat.co.uk/products/thermostats/programmable-dial.html?utm_source=quote&utm_medium=quote&utm_campaign=upgrades">Find out more</a></strong><br><a href="/core/media/media.nl?id=7512975&amp;c=472052&amp;h=fd0fbf341fdde385ef99" rel="lightbox[fiche]">View product fiche</a><br><br></span></p></td> \n'+
				'<td width="110" style="padding:0; background:url(/core/media/media.nl?id=14231217&c=472052&h=5cda6590ef3aef986dbe) no-repeat center top;" valign="top"><center><p style="padding-left:13px; padding-right: 20px; padding-top: 15px;"><span style="font-size: 14px; color: #fff;">Upgrade price</span><br><span style="font-size: 16px;"><strong>���</strong></span></p></center></td>\n'+
				'</tr>\n'+  
				'<tr style="margin-bottom: 22px;"> \n'+
				'<td width="210" style="padding:0" valign="top"><img style="border:none; padding:0; margin:0;" src="/core/media/media.nl?id=14227125&c=472052&h=fecb3e26a6d878062b08" alt="wireless stat" width="210" height="143"></td> \n'+ 
				'<td valign="top" style="padding-top:0px;"><h5 style="color: #6EC62E; margin-top: 0px; margin-bottom:0px; font-size: 14px;">Smart control package</h5><p><span class="stattext">Pair any thermostat from the neo range with the neoHub to create a smart system, enabling control from a smartphone or tablet. Simply link the neoStats with the central hub to use the neoApp to remotely control the heating with just a few screen taps.<br><strong><a href="http://www.nu-heat.co.uk/products/thermostats/smart-controls.html?utm_source=quote&utm_medium=quote&utm_campaign=upgrades">Find out more</a></strong><br><br></span></p></td> \n'+
				'<td width="110" style="padding:0; background:url(/core/media/media.nl?id=14231217&c=472052&h=5cda6590ef3aef986dbe) no-repeat center top;" valign="top"><center><p style="padding-left:13px; padding-right: 20px; padding-top: 15px;"><span style="font-size: 14px; color: #fff;">Upgrade price</span><br><span style="font-size: 16px;"><strong>���</strong></span></p></center></td>\n'+
				'</tr>\n'+ 
				//-- THIS MIGHT COME OUT -->

				'<tr style="margin-bottom: 22px;"> \n'+
				'<td width="210" style="padding:0" valign="top"><img style="border:none; padding:0; margin:0;" src="/assets/img/15-stat-nw.png" alt="neoStat hot water timer" width="210" height="143"></td> \n'+ 
				'<td valign="top" style="padding-top:0px;"><h5 style="color: #6EC62E; margin-top: 0px; margin-bottom:0px; font-size: 14px;">neoStat hot water timer</h5><p><span class="stattext">Nu-Heat\'s neoStats can also be used as a programmable hot water timer offering wireless smart control capability.<br><br><br></span></p></td> \n'+ 
				'<td width="110" style="padding:0; background:url(/core/media/media.nl?id=14231217&c=472052&h=5cda6590ef3aef986dbe) no-repeat center top;" valign="top"><center><p style="padding-left:13px; padding-right: 20px; padding-top: 15px;"><span style="font-size: 14px; color: #fff;">Upgrade price</span><br><span style="font-size: 16px;"><strong>���</strong></span></p></center></td> \n'+
				'</tr>\n'+

				//--END OF SECTION THAT MIGHT COME OUT -->

				'</tbody>\n'+
				'</table>\n'+
				'<br>\n'+
				//'</div>\n'+
				//'<p>&nbsp;</p>\n'+
				//'</div>\n'+
				'</div>\n';

			}*/
			
			//CJM Mar 2016............ends
			
			
		
			
			
			var customer = nlapiGetFieldValue('entity');
			var customerCategory = nlapiLookupField('customer', customer, 'category', true);
			
			if (neoUpgSearchresults)
			{
				//smartHKList += '<h3>Smart Package Upgrades</h3><p>All prices quoted are excluding VAT.</p> ' + smartHKUpgrade;	// CJM June2017
				smartHKList += '<h3>Smart Package Upgrades</h3><p>All prices quoted are excluding VAT and indicate the total price for upgrading all of the thermostats in your quote and adding the additional components of the smart package option chosen.</p> ' + smartHKUpgrade;	// CJM June2017
				
				/*
				smartHKCompatibility +=
					 '<table colspan="3" cellspacing="0" width="564">\n' +
					 '<td height="120" valign="middle" style="color:#3C3D41; FONT-FAMILY: corbel, Arial, Helvetica, sans-serif;">\n' +
					 //'<div><p style="font-size:10px; color:#6EC62E;"><strong>Apple HomeKit Compatibility</strong></p></div>\n' +
					 '<div style="font-size:10px; color:#6EC62E;"><strong>Apple HomeKit Compatibility</strong></div>\n' +
					 '<div><span width="100%" style="padding-left:0px;"><p style="font-size:8px; color:#3C3D41;"\n' +
					 'The neoHub+ enables the neoStat, neoAir, neoPlug & neoUltra to work with HomeKit technology. See www.nu-heat.co.uk&frasl;homekit for more details.\n' +
					 'To control this HomeKit-enabled accessory, iOS 9.3.2 or later is recommended.\n' +
					 '<p style="font-size:8px;">Communication between the Nu-Heat neoHub+ and neoStat, neoAir, neoPlug & neoUltra is secured by utilising frame-protection mechanism based on Advanced Encryption Standard (AES) with 128-bit randomly generated keys.</p>\n' +
					 '<p style="font-size:8px;">Use of the Works with Apple HomeKit logo means that an electronic accessory has been designed to connect specifically to iPod touch, iPhone, or iPad, respectively, and has been certified by the developer to meet Apple performance standards. Apple is not responsible for the operation of this device or its compliance with safety and regulatory standards.\n' +
					 'Apple, iPad, iPad Air, iPhone, and iPod touch are trademarks of Apple Inc., registered in the U.S. and other countries. HomeKit is a trademark of Apple Inc. Apple and the Apple logo are trademarks of Apple Inc., registered in the U.S. and other countries. App Store is a service mark of Apple Inc., registered in the U.S. and other countries.</p>\n' +
					 //'</p></span></div></td><tr><br><td valign="top">&nbsp;</td></tr></table>\n' ;
					 '</p></span></div></td><tr><br></tr></table>\n' ;
				*/
				
				smartHKCompatibility +=
					 '<table colspan="3" cellspacing="0" width="564">\n' +
					 '<td height="120" valign="middle" style="color:#3C3D41; FONT-FAMILY: corbel, Arial, Helvetica, sans-serif;">\n' +
					 //'<div><p style="font-size:10px; color:#6EC62E;"><strong>Apple HomeKit Compatibility</strong></p></div>\n' +
					 '<div style="font-size:10px; color:#6EC62E;"><strong>Apple HomeKit Compatibility</strong></div>\n' +
					 '<span width="100%" style="padding-left:0px; font-size:8px;"><div> \n' +
					 //'<tr style="font-size:8px; color:#3C3D41;"\n' +
					 '<p style="padding-left:0px; margin-top:0px; margin-bottom:0px; padding-bottom:0em; font-size:8px;">The neoHub+ enables the neoStat, neoAir, neoPlug & neoUltra to work with HomeKit technology. See www.nu-heat.co.uk&frasl;homekit for more details.</p> \n' +
					 '<p style="padding-left:0px; margin-top:0px; margin-bottom:0px; padding-bottom:0em; font-size:8px;">To control this HomeKit-enabled accessory, iOS 9.3.2 or later is recommended.</p> \n' +
					 '<p style="padding-left:0px; margin-top:0px; margin-bottom:0px; padding-bottom:0em; font-size:8px;">Communication between the Nu-Heat neoHub+ and neoStat, neoAir, neoPlug & neoUltra is secured by utilising frame-protection mechanism based on Advanced Encryption Standard (AES) with 128-bit randomly generated keys.</p>\n' +
					 '<p style="padding-left:0px; margin-top:0px; margin-bottom:0px; padding-bottom:0em; font-size:8px;">Use of the Works with Apple HomeKit logo means that an electronic accessory has been designed to connect specifically to iPod touch, iPhone, or iPad, respectively, and has been certified by the developer to meet Apple performance standards. Apple is not responsible for the operation of this device or its compliance with safety and regulatory standards. \n' +
					 'Apple, iPad, iPad Air, iPhone, and iPod touch are trademarks of Apple Inc., registered in the U.S. and other countries. HomeKit is a trademark of Apple Inc. Apple and the Apple logo are trademarks of Apple Inc., registered in the U.S. and other countries. App Store is a service mark of Apple Inc., registered in the U.S. and other countries. \n' +
					 //'</p></span></div></td><tr><br><td valign="top">&nbsp;</td></tr></table>\n' ;
					 '</p></div></span></td></table>\n' ;
				
								
				smartHKList += smartHKCompatibility + '<p><strong>Please note:</strong> Upgrade Option prices valid until point of delivery.</p></td>\n' + 
				//'</div></div>\n';	// CJM June2017
				'</div>\n';	// CJM June2017
				
				
				//upgradesList += newUpgrade + '<h3>Thermostat Upgrades</h3><p>All prices quoted are excluding VAT.</p> ' + neoUpgrade;
				
				
				upgradesList += newUpgrade + '<h3>Thermostat Upgrades</h3><p>All prices quoted are excluding VAT and indicate the total price for upgrading all of the thermostats in your quote.</p> ' + neoUpgrade;
								
				if (ufhSchematic != 'DHPC' && ufhSchematic != 'DHPS' && neoUltra == 'T')	//UFH for Heat Pump systems - Smart packages are not compatible
					{
						upgradesList += smartHKList;
					}
					//CJM Jun2017
			}
			else
			{
				if (customerCategory == 'Self-builder')
				{
					upgradesList += newUpgrade + '<h3>Thermostat Upgrades</h3>' + smartUpgrade + neoOptions + pushButton + lowVoltage;
				}
				else
				{
					upgradesList += newUpgrade + '<h3>Thermostat Upgrades</h3>' + SDUpgrade + WLUpgrade + LVUpgrade;
				}
			}
					
			var cylFilters = new Array();
			cylFilters[0] = new nlobjSearchFilter('custrecord_ex_quote_number', null, 'is', tranID);
			cylFilters[1] = new nlobjSearchFilter('custrecord_upgrade_item_type', null, 'is', 'Extra');
			cylFilters[2] = new nlobjSearchFilter('custrecord_upgrade_option_type', null, 'is', 'CYLExtra');
			var cylColumns = new Array();
			cylColumns[0] = new nlobjSearchColumn('custrecord_ex_item_name');
			cylColumns[1] = new nlobjSearchColumn('custrecord_ex_item_descr');
			cylColumns[2] = new nlobjSearchColumn('custrecord_ex_discount_price');
			cylColumns[3] = new nlobjSearchColumn('custrecord_ex_itemid');
			cylColumns[4] = cylColumns[2].setSort();
			var cylSearchresults = nlapiSearchRecord('customrecord_upgrades_and_extras', null, cylFilters, cylColumns);
			if (cylSearchresults != null)
			
			{
				var ficheText = 'The product fiche below shows technical information related to the product\'s efficiency, as required by EU legislation for energy related products.';
				if(cylSearchresults.length > 1)
				{
					ficheText = 'The product fiches below show technical information related to the product\'s efficiency, as required by EU legislation for energy related products.'; 
				}
				/* REMOVED FOR TESTING - LIVE CODE
				upgradesList +='<br><br><h3>Mains pressure domestic hot water cylinder</h3><div style="border:#4F5251 solid 1px; width:100%; padding-left: 8px; padding-right:8px;">\n' +
				'<table width="100%" border="0">\n' +
				'<tbody><tr>\n' +
				'<td colspan="3" valign="top"><img src="/core/media/media.nl?id=2969902&amp;c=472052&amp;h=b83a89a8651ebbcafd7f" alt="EnergyPro Cylinder" width="150" height="248" style="border:none; background:none; float:right; padding-left:8px; padding-bottom:8px;">\n' +
				'<p>Cylinders in Nu-Heat\'s EnergyPro range meet all relevant UK and European standards and are covered by a 25-year warranty:<br>\n' +
				'<br>\n' +
				'</p><ul>\n' +
				'<li>Lightweight all-stainless-steel construction</li>\n' +
				'<li>Insulated in excess of the requirements of Part L, using CFC- and HCFC-free fire-retardant foam with a Global Warming Potential of 2.8, and Ozone D epletion Potential of Zero</li>\n' +
				'<li>Smooth-walled coils for good heat transfer and low pressure drop</li>\n' +
				'<li>Supplied complete with connection fittings, and G3 equipment comprising inlet group, tundish, temperature &amp; pressure relief valve (factory fitted) and wholesome water expansion vessel</li>\n' +
				'<li>Optimum connection positions at the front of the unit for ease of installation, easy access and minimal space requirements</li>\n' +
				'<li>Connection for optional EnergyPro Hot Water Loop</li>\n' +
				'</ul></td>\n' +
				'</tr>\n' +
				'<tr>\n' +
				'<td colspan="3" valign="top" style="padding-top:12px;">For technical information and dimensions view the <a href="/core/media/media.nl?id=2974363&amp;c=472052&amp;h=5efd7bc75b6c1d1dca57&amp;_xt=.pdf&amp;ck=sk52woq-AdwU980g&amp;vid=sk52wl--Adq9B40v&amp;cktime=114313&amp;addrcountry=GB">PDF datasheet</a>.\n'+
				'<br /><br />'+ficheText+'</td>\n' +
				'</tr>\n';
				*/
				
				//Case: SUP353174
				//starts: CJM DEC 2017 
				var newCylinderBulletList = 
				'<li>Lightweight duplex stainless steel construction</li>\n' +
				'<li>High flow rates (up to 50 litre/min) with minimum pressure drops</li>\n' +
				'<li>Pressure tested to 10bar</li>\n' +
				'<li>Insulated in excess of the requirements of Part L, using CFC- and HCFC-free fire-retardant foam with a Global Warming Potential of 2.8, and Ozone Depletion Potential of Zero</li>\n' +
				'<li>Smooth-walled coils for good heat transfer and low pressure drop</li>\n' +
				'<li>Supplied complete with connection fittings, and G3 equipment comprising inlet group, tundish, temperature and pressure relief valve (factory fitted) and wholesome water expansion vessel</li>\n' +
				'<li>Optimum connection positions at the front of the unit for ease of installation, easy access and minimal space requirements</li>\n' +
				'<li>Connection for optional EnergyPro&reg; Hot Water Loop</li>\n' +
				'<li>Powder-coated case</li>\n';
				
				upgradesList +='<br><br><h3>Mains pressure domestic hot water cylinder</h3><div style="border:#4F5251 solid 1px; width:100%; padding-left: 8px; padding-right:8px;">\n' +
				'<table width="100%" border="0">\n' +
				'<tbody><tr>\n' +
				'<td colspan="3" valign="top"><img src="/core/media/media.nl?id=2969902&amp;c=472052&amp;h=b83a89a8651ebbcafd7f" alt="EnergyPro Cylinder" width="150" height="248" style="border:none; background:none; float:right; padding-left:8px; padding-bottom:8px;">\n' +
				'<p>Cylinders in Nu-Heat\'s EnergyPro&reg; range meet all relevant UK and European standards and are covered by a 25-year warranty:<br>\n' +
				'<br>\n' +
				'</p><ul>\n'+newCylinderBulletList+
				'</ul></td>\n' +
				'</tr>\n' +
				'<tr>\n' +
				'<td colspan="3" valign="top" style="padding-top:12px;">For technical information and dimensions view the <a href="/core/media/media.nl?id=2974363&amp;c=472052&amp;h=5efd7bc75b6c1d1dca57&amp;_xt=.pdf&amp;ck=sk52woq-AdwU980g&amp;vid=sk52wl--Adq9B40v&amp;cktime=114313&amp;addrcountry=GB">PDF datasheet</a>.\n'+
				'<br /><br />'+ficheText+'</td>\n' +
				'</tr>\n';
				//ends: CJM DEC 2017 

				
				for ( var l = 0; cylSearchresults != null && l < cylSearchresults.length; l++ )
				{
					var cylSearchresult = cylSearchresults[ l ];		
					var upgradeName = cylSearchresult.getValue('custrecord_ex_item_name');
					var itemDescription = cylSearchresult.getValue('custrecord_ex_item_descr');
					var upgradePrice = fixedTwoDP(cylSearchresult.getValue('custrecord_ex_discount_price'));
					var itemID = cylSearchresult.getValue('custrecord_ex_itemid');
					
					var erpClass = nlapiLookupField('item',itemID,'custitem_erp_energy_efficiency_class');
					var erpStLoss = nlapiLookupField('item',itemID,'custitem_erp_standing_loss');
					var erpStVolume = nlapiLookupField('item',itemID,'custitem_erp_standing_volume');
					
					upgradesList += '<tr>\n' +
					'<td colspan="2"><h5 style="color: #6EC62E; margin-top: 0px; margin-bottom:0px; font-size: 16px;">'+ itemDescription +'</h5></td>\n' +
					'<td width="110" rowspan="4" style="padding:0; background:url(/core/media/media.nl?id=14231217&c=472052&h=5cda6590ef3aef986dbe) no-repeat center top;" valign="top"><center><p style="padding-left:13px; padding-right: 20px; padding-top: 15px;"><span style="font-size: 14px; color: #fff;">Upgrade price</span><br><span style="font-size: 16px;"><strong>&pound;'+upgradePrice+'</strong></span></p></center></td>\n' +
					'</tr>\n' +
					   '<tr>\n' +
					      '<td class="erpinfobox" width="200">Energy efficiency class</td>\n' +
					      '<td class="erpinfobox"><strong>'+erpClass+'</strong></td>\n' +
					    '</tr>\n' +
					    '<tr>\n' +
					      '<td class="erpinfobox">Standing loss</td>\n' +
					      '<td class="erpinfobox"><strong>'+erpStLoss+' W</strong></td>\n' +
					    '</tr>\n' +
					    '<tr>\n' +
					      '<td class="erpinfobox">Standing volume</td>\n' +
					      '<td class="erpinfobox"><strong>'+erpStVolume+' l</strong></td>\n' +
					    '</tr>\n' +
					    '<tr>\n' +
					'<td colspan="3">&nbsp;</td>\n' +
					'</tr>\n';
					
				}
				upgradesList +=
				'</tbody></table><br></div>\n';
			}
		
		var exFilters = new Array();
		exFilters[0] = new nlobjSearchFilter('custrecord_ex_quote_number', null, 'is', tranID);
		exFilters[1] = new nlobjSearchFilter('custrecord_upgrade_item_type', null, 'is', 'Extra');
		exFilters[2] = new nlobjSearchFilter('custrecord_upgrade_option_type', null, 'is', 'Extra');
		var exColumns = new Array();
		exColumns[0] = new nlobjSearchColumn('custrecord_ex_item_name');
		exColumns[1] = new nlobjSearchColumn('custrecord_ex_item_descr');
		exColumns[2] = new nlobjSearchColumn('custrecord_ex_discount_price');
		exColumns[3]= exColumns[2].setSort();
		var exSearchresults = nlapiSearchRecord('customrecord_upgrades_and_extras', null, exFilters, exColumns);
		if (exSearchresults != null)
		{
			upgradesList +='<br><br><h3>Customers also bought</h3>\n' +
			'<table border="0">\n' +
				'<tr style="color:#FFF;">\n' +
			      '<td valign="top" width="70" bgcolor="#666666"><strong>Code</strong></td>\n' +
			      '<td valign="top" bgcolor="#666666"><strong>Item Description</strong></td>\n' +
			      '<td valign="top" width="65" bgcolor="#666666"><strong>Price</strong></td>\n' +
			    '</tr>\n';		
			for ( var l = 0; exSearchresults != null && l < exSearchresults.length; l++ )
			{
				var exSearchresult = exSearchresults[ l ];		
				var upgradeName = exSearchresult.getValue('custrecord_ex_item_name');
				var itemDescription = exSearchresult.getValue('custrecord_ex_item_descr');
				var upgradePrice = fixedTwoDP(exSearchresult.getValue('custrecord_ex_discount_price'));
				var rowbgColour = "";
				if (isEven(l) == true)
				{
					rowbgColour = 'bgcolor="#FFFFFF"';
				}
				if (upgradeName.search('HWL') != -1)
				{
					itemDescription += ' - <a href="/core/media/media.nl?id=8861578&c=472052&h=f7ba8bc223149b552913&_xt=.pdf" target="_blank">view details</a>';
				}
				upgradesList +=
						'<tr style="border-top:#F0F0F0;">\n' +
							'<td align="left" valign="top" '+rowbgColour+'><strong>'+ upgradeName +'</strong></td>\n' +
							'<td align="left" valign="top" '+rowbgColour+'>'+ itemDescription +'</td>\n' +
							'<td align="left" valign="top" '+rowbgColour+'>&pound;'+ upgradePrice +'</td>\n' +
						'</tr>\n';
				
			}
			upgradesList +=
			'</table>\n' ;
		}
		
		var FCexFilters = new Array();
		FCexFilters[0] = new nlobjSearchFilter('custrecord_ex_quote_number', null, 'is', tranID);
		FCexFilters[1] = new nlobjSearchFilter('custrecord_upgrade_item_type', null, 'is', 'Extra');
		FCexFilters[2] = new nlobjSearchFilter('custrecord_upgrade_option_type', null, 'startswith', 'FCE');
		var FCexColumns = new Array();
		FCexColumns[0] = new nlobjSearchColumn('custrecord_ex_item_name');
		FCexColumns[1] = new nlobjSearchColumn('custrecord_ex_item_descr');
		FCexColumns[2] = new nlobjSearchColumn('custrecord_ex_item_price');
		FCexColumns[3] = new nlobjSearchColumn('custrecord_ex_quantity');
		FCexColumns[4]= FCexColumns[2].setSort();
		var FCexSearchresults = nlapiSearchRecord('customrecord_upgrades_and_extras', null, FCexFilters, FCexColumns);
		if (FCexSearchresults != null)
		{
			upgradesList +='<br><br><h3>Suggested for use with LoPro&reg;</h3>\n' +
			'<table border="0">\n' +
				'<tr style="color:#FFF;">\n' +
			      '<td valign="top" width="70" bgcolor="#666666"><strong>Code</strong></td>\n' +
			      '<td valign="top" bgcolor="#666666"><strong>Item Description</strong></td>\n' +
			      //'<td valign="top" bgcolor="#337BBD"><p><strong>Quantity</strong></p></td>\n' +
			      '<td valign="top" width="65" bgcolor="#666666"><strong>Price <br>(per unit)</strong></td>\n' +
			    '</tr>\n';		
			for ( var m = 0; FCexSearchresults != null && m < FCexSearchresults.length; m++ )
			{
				var FCexSearchresult = FCexSearchresults[ m ];		
				var upgradeName = FCexSearchresult.getValue('custrecord_ex_item_name');
				var itemDescription = FCexSearchresult.getValue('custrecord_ex_item_descr');
				var upgradePrice = fixedTwoDP(FCexSearchresult.getValue('custrecord_ex_item_price'));
				//var itemQuantity = FCexSearchresult.getValue('custrecord_ex_quantity');
				var rowbgColour = "";
				if (isEven(m) == true)
				{
					rowbgColour = 'bgcolor="#FFFFFF"';
				}
				upgradesList +=
						'<tr style="border-top:#F0F0F0;">\n' +
							'<td align="left" valign="top" '+rowbgColour+'><strong>'+ upgradeName +'</strong></td>\n' +
							'<td align="left" valign="top" '+rowbgColour+'>'+ itemDescription + handleUndefined(lu_fc_upgrades_link[upgradeName])+'</td>\n' +
							//'<td align="left" valign="top" '+rowbgColour+'>'+ itemQuantity +'</td>\n' +
							'<td align="left" valign="top" '+rowbgColour+'>&pound;'+ upgradePrice +'</td>\n' +
						'</tr>\n';				
			}
			upgradesList +='</table>\n' ;
		}
		
		//CJM Aug2017 Start
		
		var FCAMexFilters = new Array();
		FCAMexFilters[0] = new nlobjSearchFilter('custrecord_ex_quote_number', null, 'is', tranID);
		FCAMexFilters[1] = new nlobjSearchFilter('custrecord_upgrade_item_type', null, 'is', 'Extra');
		FCAMexFilters[2] = new nlobjSearchFilter('custrecord_upgrade_option_type', null, 'startswith', 'FCAME');
		var FCAMexColumns = new Array();
		FCAMexColumns[0] = new nlobjSearchColumn('custrecord_ex_item_name');
		FCAMexColumns[1] = new nlobjSearchColumn('custrecord_ex_item_descr');
		FCAMexColumns[2] = new nlobjSearchColumn('custrecord_ex_item_price');
		FCAMexColumns[3] = new nlobjSearchColumn('custrecord_ex_quantity');
		FCAMexColumns[4]= FCAMexColumns[2].setSort();
		var FCAMexSearchresults = nlapiSearchRecord('customrecord_upgrades_and_extras', null, FCAMexFilters, FCAMexColumns);
		if (FCAMexSearchresults != null)
		{
			upgradesList +='<br><br><h3>Suggested for use with AcoustiMax&#174;</h3>\n' +
			'<table border="0">\n' +
				'<tr style="color:#FFF;">\n' +
			      '<td valign="top" width="70" bgcolor="#666666"><strong>Code</strong></td>\n' +
			      '<td valign="top" bgcolor="#666666"><strong>Item Description</strong></td>\n' +
			      //'<td valign="top" bgcolor="#337BBD"><p><strong>Quantity</strong></p></td>\n' +
			      '<td valign="top" width="65" bgcolor="#666666"><strong>Price <br>(per unit)</strong></td>\n' +
			    '</tr>\n';		
			for ( var m = 0; FCAMexSearchresults != null && m < FCAMexSearchresults.length; m++ )
			{
				var FCAMexSearchresult = FCAMexSearchresults[ m ];		
				var upgradeName = FCAMexSearchresult.getValue('custrecord_ex_item_name');
				var itemDescription = FCAMexSearchresult.getValue('custrecord_ex_item_descr');
				// variationCold = variationCold.replace('-','- ');
				itemDescription = itemDescription.replace ('Max�', '"Max"+"&#174;"');		//CJM Aug2017 replacing '�' with ASCII code for trademark
				var upgradePrice = fixedTwoDP(FCAMexSearchresult.getValue('custrecord_ex_item_price'));
				var rowbgColour = "";
				if (isEven(m) == true)
				{
					rowbgColour = 'bgcolor="#FFFFFF"';
				}
				upgradesList +=
						'<tr style="border-top:#F0F0F0;">\n' +
							'<td align="left" valign="top" '+rowbgColour+'><strong>'+ upgradeName +'</strong></td>\n' +
							'<td align="left" valign="top" '+rowbgColour+'>'+ itemDescription + handleUndefined(lu_fc_upgrades_link[upgradeName])+'</td>\n' +
							//'<td align="left" valign="top" '+rowbgColour+'>'+ itemQuantity +'</td>\n' +
							'<td align="left" valign="top" '+rowbgColour+'>&pound;'+ upgradePrice +'</td>\n' +
						'</tr>\n';				
			}
			upgradesList +='</table>\n' ; 
		}

		//CJM Aug2017 End
		
		upgradesList +='<p><strong>Please note:</strong> Upgrade Option prices valid until point of delivery.</p></td>\n' + 
		'</div></div>\n';
		
		
		/*	
		 smartHKCompatibility += 
			'<table><tr><br><td valign="top">&nbsp;</td><div><td height="80" valign="middle" style="font-size:10px; color:#3C3D41;">\n' +
			'<p style="font-size:10px; color:#6EC62E;><strong>Apple HomeKit Compatibility</strong></p>\n' +
			'<p>The neoHub+ enables the neoStat, neoAir, neoPlug & neoUltra to work with HomeKit technology. See www.nu-heat.co.uk&frasl;homekit for more details.</p>\n' +
			'<p>To control this HomeKit-enabled accessory, iOS 9.3.2 or later is recommended.</p>\n' +
			'<p>Communication between the Nu-Heat neoHub+ and neoStat, neoAir, neoPlug & neoUltra is secured by utilising frame-protection mechanism based on Advanced Encryption Standard (AES) with 128-bit randomly generated keys.</p>\n' +
			'<p>Use of the Works with Apple HomeKit logo means that an electronic accessory has been designed to connect specifically to iPod touch, iPhone, or iPad, respectively, and has been certified by the developer to meet Apple performance standards. Apple is not responsible for the operation of this device or its compliance with safety and regulatory standards.</p>\n' +
			'<p>Apple, iPad, iPad Air, iPhone, and iPod touch are trademarks of Apple Inc., registered in the U.S. and other countries. HomeKit is a trademark of Apple Inc. Apple and the Apple logo are trademarks of Apple Inc., registered in the U.S. and other countries. App Store is a service mark of Apple Inc., registered in the U.S. and other countries.</p>\n' +
			'</td></div></tr></table>\n' ;
			*/
			/*
		 smartHKCompatibility +=
			 '<table colspan="3" cellspacing="0" width="564">\n' +
			 '<tr><span style="font-size:8px; color:#3C3D41;"><td valign="middle" >\n'+
			 //'<p style="color:#6EC62E;"><strong>Apple HomeKit Compatibility</strong></p>\n'+
			 '<p>The neoHub+ enables the neoStat, neoAir, neoPlug & neoUltra to work with HomeKit technology. See www.nu-heat.co.uk&frasl;homekit for more details.</p>\n' +
			 '<p>To control this HomeKit-enabled accessory, iOS 9.3.2 or later is recommended.</p>\n' +
			 '<p>Communication between the Nu-Heat neoHub+ and neoStat, neoAir, neoPlug & neoUltra is secured by utilising frame-protection mechanism based on Advanced Encryption Standard (AES) with 128-bit randomly generated keys.</p>\n' +
			 '<p>Use of the Works with Apple HomeKit logo means that an electronic accessory has been designed to connect specifically to iPod touch, iPhone, or iPad, respectively, and has been certified by the developer to meet Apple performance standards. Apple is not responsible for the operation of this device or its compliance with safety and regulatory standards.</p>\n' +
			 '<p>Apple, iPad, iPad Air, iPhone, and iPod touch are trademarks of Apple Inc., registered in the U.S. and other countries. HomeKit is a trademark of Apple Inc. Apple and the Apple logo are trademarks of Apple Inc., registered in the U.S. and other countries. App Store is a service mark of Apple Inc., registered in the U.S. and other countries.</p>\n' +
			 '</td></tr></span></table>\n' ;
			 */

		 

	if (!neoUpgSearchresults && !upSearchresults && !upExSearchresults && !exSearchresults && !FCexSearchresults && !newUpgrade && !SDUpgrade && !WLUpgrade && !LVUpgrade)
	{
		upgradesList = '';
		smartHKList = '';	//CJM June 2017
	}
	
	/*CJM June 2017 AppleHomekit starts.............
	//return (upgradesList);
	*/
	//var upgradeSmartList = upgradesList + smartHKList;
	//return (upgradeSmartList);
	
	/* Ends...... */
	return (upgradesList);
	
}

function statDetails(upgradeName,upgradePrice)
{
	statTable='<tr style="margin-bottom: 22px;">  \n' +
	'<td width="210" style="padding:0" valign="top">'+lu_upgrades_image[upgradeName]+'</td> \n' + 					 
	'<td valign="top" style="padding-top:0px;"><h5 style="color: #6EC62E; margin-top: 0px; margin-bottom:0px; font-size: 14px;">'+lu_upgrades_name[upgradeName]+'</h5> \n' +
	'<p><span class="stattext">'+[upgradeName]+'<br> \n' +
	'<strong>'+lu_upgrades_link[upgradeName]+'</strong><br> \n' +lu_upgrades_fiche[upgradeName]+
	'<br><br></span></p></td>  \n' +
	'<td align="right" width="110" style="padding:0; background:url(/core/media/media.nl?id=14231217&c=472052&h=5cda6590ef3aef986dbe) no-repeat center top;" valign="top"><center><p style="padding-left:13px; padding-right: 20px; padding-top: 15px;">\n' +
	//'<span style="font-size: 14px; color: #fff;">Upgrade price</span><br><span style="font-size: 16px;"><strong>&pound;'+upgradePrice+'</strong></span></p></center></td> \n' +
	'<span style="font-size: 14px; color: #fff;">Total upgrade price</span><br><span style="font-size: 16px;"><strong>&pound;'+upgradePrice+'</strong></span></p></center></td> \n' +	//CJM June2017
	'</tr>\n' ;
	
	if (lu_upgrades_image[upgradeName] == undefined)
		{statTable = '';}
	
	return statTable;
}

function neoDetails(upgradeName,upgradePrice)
{
	
	if (upgradeName == 'neoUltra+Air')
		{
			var tableMargin = "0px;";
			var tableBreak = "</span></p></td>  \n";
		}
	else
		{
			var tableMargin = "22px;";
			var tableBreak = "<br><br></span></p></td>  \n";
			
		}
	
	neoTable=
		//'<tr style="margin-bottom: 22px;">  \n' +
		'<tr style="margin-bottom:' +  tableMargin + '">  \n' +
		'<td width="210" style="padding:0" valign="top">'+lu_upgrades_image[upgradeName]+'</td> \n' + 					 
		//'<td width="230" valign="top" style="padding-top:0px;"><h5 style="color: #6EC62E; margin-top: 0px; margin-bottom:0px; font-size: 14px;">'+lu_upgrades_name[upgradeName]+'</h5> \n' +	//CJM June2017
		'<td valign="top" style="padding-top:0px;"><h5 style="color: #6EC62E; margin-top: 0px; margin-bottom:0px; font-size: 14px;">'+lu_upgrades_name[upgradeName]+'</h5> \n' +	//CJM June2017
		'<p><span class="stattext">'+lu_upgrades_description[upgradeName]+'<br> \n' +
		'<strong>'+lu_upgrades_link[upgradeName]+'</strong><br> \n' +lu_upgrades_fiche[upgradeName]+ tableBreak +
		//'<br><br></span></p></td>  \n' +
		'<td align="right" width="110" style="padding:0; background:url(/core/media/media.nl?id=14231217&c=472052&h=5cda6590ef3aef986dbe) no-repeat center top;" valign="top"><center><p style="padding-left:8px; padding-right: 10px; padding-top: 25px;">\n' +
		//'<span style="font-size: 14px; color: #fff;">Upgrade price</span><br><span style="font-size: 16px;"><strong>&pound;'+upgradePrice+'</strong></span></p></center></td> \n' +
		'<span style="font-size: 14px; color: #fff;">Total upgrade price</span><br><span style="font-size: 16px;"><strong>&pound;'+upgradePrice+'</strong></span></p></center></td> \n' +	//CJM June2017
		'</tr>\n' ;

if (lu_upgrades_image[upgradeName] == undefined)
		{neoTable = '';}
	
	return neoTable;
}


function HPSOLupgradesHTML(tranID, type)
{
	var upgradesList = '';
	if (type = 'Heat Pump' || type == 'Solar')
	{
//		var transRecord = nlapiLoadRecord('estimate', tranID);
		var exFilters = new Array();
		exFilters[0] = new nlobjSearchFilter('custrecord_ex_quote_number', null, 'is', tranID);
		exFilters[1] = new nlobjSearchFilter('custrecord_upgrade_item_type', null, 'is', 'Extra');
		exFilters[2] = new nlobjSearchFilter('custrecord_upgrade_option_type', null, 'is', 'Extra');
		var exColumns = new Array();
		exColumns[0] = new nlobjSearchColumn('custrecord_ex_item_name');
		exColumns[1] = new nlobjSearchColumn('custrecord_ex_item_descr');
		exColumns[2] = new nlobjSearchColumn('custrecord_ex_discount_price');
		exColumns[3]= exColumns[2].setSort();
		var exSearchresults = nlapiSearchRecord('customrecord_upgrades_and_extras', null, exFilters, exColumns);
		if (exSearchresults != null)
		{
			var salesEmail = nlapiGetFieldValue('custbody_sales_rep_email');
			var salesPhone = nlapiGetFieldValue('custbody_sales_rep_phone');
			upgradesList =  '<h2 class="acc_trigger breakhere"><a href="#5" onclick="ga(\'send\', \'event\', \'quote\', \'Click\', \'hp-sol-upgrades\');"><div class="P-Header">Upgrade Options</div></a></h2>\n' +
			'<div class="acc_container">\n' +
			'<div class="block">\n'+  
			'<p>It\'s quick and easy to upgrade to any of the options shown below. Please contact me on <a href ="mailto:'+salesEmail+'">'+salesEmail+'</a> or '+salesPhone+' and I will update your quote immediately. </p>\n'+
			'<h3>Options</h3>\n' +
			'<table width="539" border="0">\n' +
				'<tr style="color:#FFF;">\n' +
			      '<td valign="top" width="70" bgcolor="#666666"><strong>Code</strong></td>\n' +
			      '<td valign="top" bgcolor="#666666"><strong>Item Description</strong></td>\n' +
			      '<td valign="top" width="60" bgcolor="#666666"><strong>Price</strong></td>\n' +
			    '</tr>\n';		
			for ( var l = 0; exSearchresults != null && l < exSearchresults.length; l++ )
			{
				var exSearchresult = exSearchresults[ l ];		
				var upgradeName = exSearchresult.getValue('custrecord_ex_item_name');
				var itemDescription = exSearchresult.getValue('custrecord_ex_item_descr');
				var upgradePrice = fixedTwoDP(exSearchresult.getValue('custrecord_ex_discount_price'));
				var rowbgColour = "";
				if (isEven(l) == true)
				{
					rowbgColour = 'bgcolor="#FFFFFF"';
				}
				upgradesList +=
						'<tr style="border-top:#F0F0F0;">\n' +
							'<td align="left" valign="top" '+rowbgColour+'>'+ upgradeName +'</td>\n' +
							'<td align="left" valign="top" '+rowbgColour+'>'+ itemDescription +'</td>\n' +
							'<td align="left" valign="top" '+rowbgColour+'>&pound;'+ upgradePrice +'</td>\n' +
						'</tr>\n';
				
			}
			upgradesList +='</table>\n' ;
			upgradesList +='<p><strong>Please note:</strong> Upgrade Option prices valid until point of delivery.</p></td>\n' + 
			'</div></div>\n';
		}
		else
		{
			upgradesList = '';
		}
	}	
	
	return upgradesList;
	
}


function HPsystemPerformance(transactionID)
{
	//var transRecord = nlapiLoadRecord('estimate', transactionID);	
	
	var combinedSCoP = nlapiGetFieldValue('custbody_hp_annheatingfact_tot');
	var htgSCoP = nlapiGetFieldValue('custbody_heating_scop');
	var hwtrSCoP = nlapiGetFieldValue('custbody_hot_water_scop');
	var buildingHtReq = nlapiGetFieldValue('custbody_hp_building_energy_req');
	var floorArea = nlapiGetFieldValue('custbody_pqc_totalfloor');
	var heatOutput = nlapiGetFieldValue('custbody_hp_energy_delivered');
	var elecReqd = nlapiGetFieldValue('custbody_hp_energy_supplied');
	var backupElec = nlapiGetFieldValue('custbody_hp_supp_energy');
	//var totalElecConsumed = nlapiGetFieldValue('custbody_hp_electricity_consumed');
	var estPoolLoad = nlapiGetFieldValue('custbody_est_pool_load');
	var freeEnergy = nlapiGetFieldValue('custbody_hp_free_energy');
	var EH1 = nlapiGetFieldValue('custbody_eh1');
	var BVT3 = nlapiGetFieldValue('custbody_bvt3');
	var LD2 = nlapiGetFieldValue('custbody_ld2');
	var hwcTypicalReheat = Math.round(nlapiGetFieldValue('custbody_hwc_typ_reheat_time'));
	var hwcMaxReheat = Math.round(nlapiGetFieldValue('custbody_hwc_max_reheat_time'));
	var hpMCScertNo = nlapiGetFieldValue('custbody_hp_mcs_cert_no');
	var dualHP = nlapiGetFieldValue('custbody_dualhp');
	if (dualHP == 'Y'){
		var combinedSCoP = nlapiGetFieldValue('custbody_dualhp_combined_scop');
		var htgSCoP = nlapiGetFieldValue('custbody_dualhp_heating_scop');
		var hwtrSCoP = nlapiGetFieldValue('custbody_dualhp_hot_water_scop');
		var buildingHtReq = nlapiGetFieldValue('custbody_dualhp_building_energy_req');
		var floorArea = nlapiGetFieldValue('custbody_dualhp_floor_area');
		var heatOutput = nlapiGetFieldValue('custbody_dualhp_energy_delivered');
		var elecReqd = nlapiGetFieldValue('custbody_dualhp_energy_supplied');
		var backupElec = nlapiGetFieldValue('custbody_dualhp_supp_energy');
		var freeEnergy = nlapiGetFieldValue('custbody_dualhp_free_energy');
		var BVT3 = nlapiGetFieldValue('custbody_dualhp_bvt3');
		var LD2 = nlapiGetFieldValue('custbody_dualhp_ld2');
		var hwcTypicalReheat = Math.round(nlapiGetFieldValue('custbody_dualhp_typ_reheat_time'));
		var hwcMaxReheat = Math.round(nlapiGetFieldValue('custbody_dualhp_max_reheat_time'));
		var hpMCScertNo = nlapiGetFieldValue('custbody_dualhp_mcs_cert_no');
		if (!hpMCScertNo){
			hpMCScertNo = '';}
	}
	
	var schematicImage = '';
	var hpSchematic = nlapiGetFieldValue('custbody_schematic');
	if (hpSchematic != '' && hpSchematic != null)
	{
		if (dualHP == 'Y')
		{
			//hpSchematic = hpSchematic + 'DUAL';
			if (lu_hp_schematic_image[hpSchematic + 'DUAL'] != undefined){
				schematicImage = lu_hp_schematic_image[hpSchematic + 'DUAL'];
			}
			else if (lu_hp_schematic_image[hpSchematic] != undefined){
				schematicImage = lu_hp_schematic_image[hpSchematic];
			}
		}
		else if (lu_hp_schematic_image[hpSchematic] != undefined){
			schematicImage = lu_hp_schematic_image[hpSchematic];
		}
	}
	
	var quoteType = nlapiGetFieldValue('custbody_quote_type');
	var planningText = '';
	if (quoteType == 9 /*&& nlapiGetUser() == 29918*/)
	{
		planningText = '<br><br>In order to achieve permitted development status in England and Wales the installation must comply with the MCS020 standard, which requires a noise limit below 42 dB(A). \n'+ 
		'It is the responsibility of the MCS Approved installer to confirm compliance with MCS020. Where this is Nu-Heat you will be contacted by one of our design engineers for information that will enable us to carry out the calculation. \n' +
		'<br><br>A copy of the calculation will be inserted into the Commissioning & Warranty Documents section of Nu-Heat&#39;s MCS Handover Pack as proof of compliance.\n';
//		'<br><br>Please note that compliance to MCS020 does not mean that a heat pump installation is classed as permitted development. Other requirements of the Town and Country Planning Act must also be followed.\n'+
//		'<br><br><a href="http://www.nu-heat.co.uk/mcs020" target="_new">http://www.nu-heat.co.uk/mcs020</a><br><br>\n'+
//		'<b>Please note: Dual air source heat pump systems will require planning permission.</b> <br><br> \n';
	}
	
	
	var startparag;
	if (hpSchematic == 'A15' || hpSchematic == 'A16')
	{
		startparag = 
			'<tr>\n' +
				'<td colspan="3" align="left" valign="top">Nu-Heat&#39;s heat pump sizing method follows the Microgeneration Certification Scheme&#39;s guideline, MIS3005. \n'+
				'This requires that where the heat pump cannot cover 100&#37; of the building heat load for 99&#37; of the average year, then any difference must be made up by a conventional boiler.<br><br>\n'+
				'We calculate that the chosen heat pump will be capable of providing '+EH1+' of the annual energy requirement for heating, supplementary energy covering the remainder. \n'+
				'This is based on building fabric insulation details supplied to us.<br><br>\n'+
				'This quotation may be subject to revision at design stage when a more in-depth heat loss calculation and energy simulation will be performed. \n'+
				'This can occasionally require that a different sized heat pump or ground loop array is required. A change of this nature may require the system to be re-priced.'+ planningText +'</td>\n' +
			'</tr>\n' ;
	}
	else if (hpSchematic == 'A16-S')
	{
		startparag = 
			'<tr>\n' +
				'<td colspan="3" align="left" valign="top">Nu-Heat&#39;s heat pump sizing method follows the Microgeneration Certification Scheme&#39;s guideline, MIS3005. \n'+
				'This requires that where the heat pump cannot cover 100&#37; of the building heat load for 99&#37; of the average year, then any difference must be made up by a conventional boiler.<br><br>\n'+
				'We calculate that the chosen heat pump will be capable of providing '+EH1+' of the annual energy requirement for heating and hot water production, supplementary energy covering the remainder. \n'+
				'This is based on building fabric insulation details supplied to us.<br><br>\n'+
				'This quotation may be subject to revision at design stage when a more in-depth heat loss calculation and energy simulation will be performed. \n'+
				'This can occasionally require that a different sized heat pump or ground loop array is required. A change of this nature may require the system to be re-priced.'+ planningText +'</td>\n' +
			'</tr>\n' ;
	}
	else
	{
		startparag = 
			'<tr>\n' +
				'<td colspan="3" align="left" valign="top">Nu-Heat&#39;s heat pump sizing method follows the Microgeneration Certification Scheme&#39;s guideline, MIS3005.  \n'+
				'This is to ensure that the heat pump covers at least 100&#37; of the building heat load for 99&#37; of the average year. For this property, MIS 3005 determines a target outside air temperature of '+BVT3+'&deg;C, \n'+  
				'where the heat pump must provide all of the space heating without any direct electrical backup. We calculate the building heat load at '+BVT3+'&deg;C outside, and 20&deg;C average inside to be '+LD2+'kW based on building fabric insulation details supplied to us. <br><br>\n'+
				'This quotation may be subject to revision at design stage when a more in-depth heat loss calculation and energy simulation will be performed. This can occasionally require that a different heat pump (larger or smaller) is required.  \n'+
				'A change of this nature may require the system to be re-priced.'+ planningText +'</td>\n' +
			'</tr>\n' ;
	}	
	
	
	var rhiPara = ''; 
	var rhi = nlapiGetFieldValue('custbody_hp_proposed_system');
	if (rhi){
		rhiText = rhi.replace('new RHI scheme', '<a href="https://www.ofgem.gov.uk/environmental-programmes/domestic-renewable-heat-incentive-domestic-rhi" target = "_new" >new RHI scheme</a>').replace('<br> Government RHI Scheme<br>', '<br><br>');;
		rhiPara = '<tr>\n' +
		'<td colspan="3" align="left" valign="top"><!--<h3>Proposed System </h3>'+
		'<br>-->'+rhiText+'</td>\n' +
		'</tr>\n' ;}

	
	
	var quoteDetails ='<h2 class="acc_trigger breakhere"><a href="#6" onclick="ga(\'send\', \'event\', \'quote\', \'Click\', \'system-performance\');"><div class="P-Header">System Performance</div></a></h2>\n' +
			'<div class="acc_container">\n' +
			'<div class="block">\n'+  
						
				'<table width="560" border="0" cellspacing="5" cellpadding="5">\n' + rhiPara + schematicImage + startparag+
				/*	CJM May 2016
					'<tr>\n' +
						'<td width="220" align="left" valign="top"><span style="color:#337BBD; font-weight:bold;">Combined SCoP of heat pump: </span></td>\n' +
						'<td width="100" align="center" valign="top" >'+combinedSCoP+'</td>\n' +
						'<td width="280" rowspan="3" align="left" valign="center" >Based on regional weather data in line with MIS 3005</td>\n' +
					'</tr>\n' + */
					'<tr>\n' +
						'<td align="left" valign="top"><span style="color:#337BBD; font-weight:bold;">Heating SCoP: </span></td>\n' +
						'<td align="center" valign="top" >'+htgSCoP+'</td>\n' +
						'<td width="280" rowspan="1" align="left" valign="center" >Based on regional weather data in line with MIS 3005</td>\n' +	//CJM May 2016
					'</tr>\n' +
					'<tr>\n' +
						'<td align="left" valign="top"><span style="color:#337BBD; font-weight:bold;">Hot water SCoP:</span></td>\n' +
						'<td align="center" valign="top" >'+hwtrSCoP+'</td>\n' +
					'</tr>\n' +
					'<tr>\n' +
						'<td align="left" valign="top"><span style="color:#337BBD; font-weight:bold;">Total building heat requirement:</span></td>\n' +
						'<td align="center" valign="top" >'+buildingHtReq+'</td>\n' +
						'<td align="left" valign="top" >kWh based on: '+floorArea+' m&sup2;</td>\n' +
					'</tr>\n' +
					'<tr>\n' +
						'<td align="left" valign="top"><span style="color:#337BBD; font-weight:bold;">Heat output by heat pump:</span></td>\n' +
						'<td align="center" valign="top" >'+heatOutput+'</td>\n' +
						'<td align="left" valign="top" >kWh for heating and hot water</td>\n' +
					'</tr>\n' +
					'<tr>\n' +
						'<td align="left" valign="top"><span style="color:#337BBD; font-weight:bold;">Electricity required to power heat pump:</span></td>\n' +
						'<td align="center" valign="top" >'+elecReqd+'</td>\n' +
						'<td align="left" valign="top" >kWh</td>\n' +
					'</tr>\n' +
					'<tr>\n' +
						'<td align="left" valign="top"><span style="color:#337BBD; font-weight:bold;">Backup electricity:</span></td>\n' +
						'<td align="center" valign="top">'+backupElec+'</td>\n' +
						'<td align="left" valign="top" >kWh</td>\n' +
					'</tr>\n' +
					'<tr>\n' +
						'<td align="left" valign="top"><span style="color:#337BBD; font-weight:bold;">Free energy from Heat Pump:</span></td>\n' +
						'<td align="center" valign="top" >'+freeEnergy+'</td>\n' +
						'<td align="left" valign="top" >kWh</td>\n' +
					'</tr>\n';
					
				if (estPoolLoad != '' && estPoolLoad != null)	
				{	quoteDetails +='<tr>\n' +
						'<td align="left" valign="top"><span style="color:#337BBD; font-weight:bold;">Estimated swimming pool load:</span></td>\n' +
						'<td align="center" valign="top">'+estPoolLoad+'</td>\n' +
						'<td align="left" valign="top">kWh</td>\n' +
					'</tr>\n' ;
				}
				quoteDetails +=
				'<tr>\n' +
					'<td align="left" valign="top"><span style="color:#337BBD; font-weight:bold;">Hot water cylinder re-heat time:</span></td>\n' +
					'<td align="center" valign="top" >'+hwcTypicalReheat+'<br>'+hwcMaxReheat+'</td>\n' +
					'<td align="left" valign="top" >minutes (typical)<br>minutes (max)</td>\n' +
				'</tr>\n' +
				'<tr>\n' +
					'<td width="220" align="left" valign="top"><span style="color:#337BBD; font-weight:bold;">Heat Pump MCS Certificate No.</span></td>\n' +
					'<td width="380" align="left" valign="top" colspan="2">'+hpMCScertNo+'</td>\n' +
				'</tr>\n' +
			'</table>\n' +				
			'</div>\n' +
			'</div>\n';
			
	return quoteDetails;
}



function SOLsystemPerformance(transactionID)
{
//	var transRecord = nlapiLoadRecord('estimate', transactionID);	
	
	var orientation = nlapiGetFieldText('custbody_sol_orientation');
	var overshading = nlapiGetFieldText('custbody_sol_overshading');
	var roofTilt = nlapiGetFieldText('custbody_sol_roof_tilt');
	var dhwUsage = nlapiGetFieldValue('custbody_dhw_usage_litres');
	var occupants = nlapiGetFieldValue('custbody_pqc_occupancy');
	var solarInput = nlapiGetFieldValue('custbody_sol_input');
	var solarProportion = nlapiGetFieldValue('custbody_sol_proportion');
	var schematicImage = '';
	var solarSchematic = nlapiGetFieldValue('custbody_schematic');
	if (solarSchematic != '' && solarSchematic != null)
	{
		schematicImage = lu_sol_schematic_image[solarSchematic];
	}
	
	var quoteDetails ='<h2 class="acc_trigger breakhere"><a href="#7" onclick="ga(\'send\', \'event\', \'quote\', \'Click\', \'system-performance\');"><div class="P-Header">System Performance</div></a></h2>\n' +
			'<div class="acc_container">\n' +
			'<div class="block">\n'+  
						
				'<table width="560" border="0" cellspacing="5" cellpadding="5">\n' + schematicImage +
					'<tr>\n' +
						'<td colspan="2" align="left" valign="top"><p>The figures below provide an indication of the potential energy '+
						'savings achievable based on your approximate daily hot water demand. The solar fraction figure is the proportion '+
						'of domestic hot water that can potentially be heated by solar panels alone. It is a yearly average so in summer '+
						'months, the proportion will be significantly higher. The \'yearly free energy harvested\' figure is based on SAP '+
						'appendix H and may be required for any RHI funding (subject to confirmation of the scheme).'+
						'<ul><li>Assumed roof direction for panel installation is '+orientation+'.</li>'+
						'<li>There is '+overshading+' overshading in front of the panels.</li>'+
						'<li>A '+roofTilt+' roof pitch has been assumed for calculation purposes.</li>'+
						'</ul></p></td>\n' +
						//New Text:
//						'<td colspan="2" align="left" valign="top"><p>The figures below are based on assumptions that the roof is south east facing, there is little or no shading and the roof pitch is at 45&deg;.\n' +  
//						'These assumptions and your approximate daily hot water demand have produced an indication of the potential energy savings achievable. \n' +
//						'The solar fraction figure is the proportion of domestic hot water that can potentially be heated by solar panels alone. \n' +
//						'It is a yearly average so in summer months, the proportion will be significantly higher. The &#39;yearly free energy harvested&#39; \n' +
//						'figure is based on SAP appendix H and may be required for any RHI funding (subject to Terms and Conditions).  \n' +
//						'You will need to confirm these assumptions or provide the relevant information prior to accepting the order, \n' +
//						'at which time Nu-Heat will issue you with a recalculated Annual Solar Energy Input figure as necessary.</p></td>\n' +
						
					'</tr>\n' +
					'<tr>\n' +
						'<td width="130" align="left" valign="top"><span style="color:#337BBD; font-weight:bold;">Hot water demand:</span></td>\n' +
						'<td align="left" valign="top" >'+dhwUsage+' litres daily, based on an occupancy of '+occupants+' people*</td>\n' +
					'</tr>\n' +
					'<tr>\n' +
						'<td align="left" valign="top"><span style="color:#337BBD; font-weight:bold;">Solar input:</span></td>\n' +
						'<td align="left" valign="top" >'+solarInput+'kWh of free solar energy harvested yearly**</td>\n' +
					'</tr>\n' +
					'<tr>\n' +
						'<td align="left" valign="top"><span style="color:#337BBD; font-weight:bold;">Solar proportion:</span></td>\n' +
						'<td align="left" valign="top" >'+solarProportion+'\% of hot water supplied yearly by solar***</td>\n' +
					'</tr>\n' +
					'<tr>\n' +
						'<td colspan="3" align="left" valign="top" style="FONT-SIZE: 9px">* according to SAP table 1 at 50&#176;C draw-off\n' +
						'<br>** based on SAP appendix H\n' +
						'<br>*** based on calculations from TSol Expert</td>\n' +
					'</tr>\n' +		
				'</table>\n' +				
			'</div>\n' +
			'</div>\n';
	return quoteDetails;
}

function HPsystemFiche(transactionID)
{
//	var transRecord = nlapiLoadRecord('estimate', transactionID);	
	var packageClass = nlapiGetFieldValue('custbody_erp_system_heating_rating');
	var hpFiche = '';
	
	if (packageClass)
	{
		var spaceHtgEfficiency = Math.round(nlapiGetFieldValue('custbody_erp_space_htg_efficiency_hp'));
		var htgEfficiency = Math.round(nlapiGetFieldValue('custbody_erp_sys_htg_efficiency'));
		var tempControl = nlapiGetFieldValue('custbody_erp_temp_control_bonus');
		var suppEfficiency = showNA(nlapiGetFieldValue('custbody_erp_2nd_heat_src_efficiency'));
		var suppBoiler = showZero(nlapiGetFieldValue('custbody_erp_supp_htg'));
		var efficiencyCold = Math.round(nlapiGetFieldValue('custbody_erp_space_htg_efficiency_cold'));
		var efficiencyWarm = Math.round(nlapiGetFieldValue('custbody_erp_space_htg_efficiency_warm'));
		var weightingFactorII = nlapiGetFieldValue('custbody_erp_htg_weight_factorii');
		var variationCold = nlapiGetFieldValue('custbody_erp_htg_variation_cold');
		if (variationCold.charAt(0) != '-')
		{
			variationCold = '+ ' + variationCold;
		}
		else
		{
			variationCold = variationCold.replace('-','- ');
		}
		var variationWarm = nlapiGetFieldValue('custbody_erp_htg_variation_warm');
		if (variationWarm.charAt(0) != '-')
		{
			variationWarm = '+ ' + variationWarm;
		}
		else
		{
			variationWarm = variationWarm.replace('-','- ');
		}
		var classaplus3 = '&#9744;';
		var classaplus2 = '&#9744;';
		var classaplus = '&#9744;';
		var classa = '&#9744;';
		var classb = '&#9744;';
		var classc = '&#9744;';
		var classd = '&#9744;';
		var classe = '&#9744;';
		var classf = '&#9744;';
		var classg = '&#9744;';
		if (packageClass == 'A+++')
		{
			classaplus3 = '&#9745;';
		}
		else if (packageClass == 'A++')
		{
			classaplus2 = '&#9745;';
		}
		else if (packageClass == 'A+')
		{
			classaplus = '&#9745;';
		}
		else if (packageClass == 'A')
		{
			classa = '&#9745;';
		}
		else if (packageClass == 'B')
		{
			classb = '&#9745;';
		}
		else if (packageClass == 'C')
		{
			classc = '&#9745;';
		}
		else if (packageClass == 'D')
		{
			classd = '&#9745;';
		}
		else if (packageClass == 'E')
		{
			classe = '&#9745;';
		}
		else if (packageClass == 'F')
		{
			classf = '&#9745;';
		}
		else if (packageClass == 'G')
		{
			classg = '&#9745;';
		}
		
		var figureThree= '<h3 class="erp">Figure 3</h3><p class="erp"><strong>For preferential heat pump space heaters and preferential heat pump combination heaters, element of the\n' +
		'fiche for a package of space heater, temperature control and solar device and a package of combination heater, temperature control and solar device, \n' +
		'respectively, indicating the seasonal space heating energy efficiency of the package offered</strong></p>      \n' +
		    
		  '<table width="100%" border="0" cellspacing="3" cellpadding="0">\n' +
		  '<tbody>\n' +
		    '<tr>\n' +
		      '<td class="erptd" colspan="4"><p><strong><span class="erpfiche">SEASONAL SPACE HEATING ENERGY EFFICIENCY OF HEAT PUMP</span></strong></p></td>\n' +
		      '<td class="erptdbox"><strong> <!-- IVa THE VALUE OF THE SEASONAL SPACE HEATING EFFICIENCY OF THE PREFERENTIAL SPACE HEATER EXPRESSED IN % --> '+spaceHtgEfficiency+' %</strong></td>\n' +
		   ' </tr>\n' +
		    '<tr>\n' +
		      '<td class="erptd" colspan="5" height="1" bgcolor="#4f5251"></td>\n' +
		    '</tr>\n' +
		    '<tr>\n' +
		      '<td class="erptd" colspan="3"><p><strong><span class="erpfiche">TEMPERATURE CONTROL</span></strong></p></td>\n' +
		      '<td class="erpsign">+</td>\n' +
		      '<td class="erptdbox"><strong> <!-- VIII From temperature control fiche --> '+tempControl+' %</strong></td>\n' +
		    '</tr>\n' +
		    '<tr>\n' +
		      '<td class="erptd" colspan="5" height="1" bgcolor="#4f5251"></td>\n' +
		    '</tr>\n' +
		    '<tr>\n' +
		      '<td class="erptd" colspan="5"><p><strong><span class="erpfiche">SUPPLEMENTARY BOILER</span></strong></p></td>\n' +
		     '</tr>\n' +
		      
		     '<tr> \n' +
		     ' <td class="erptd" colspan="3"><p>( <strong><!-- IX SEASONAL SPACE HEATING ENERGY EFFICIENCY OF THE SUPPLEMENTARY BOILER FROM THE BOILER FICHE, IN % --> '+suppEfficiency+
		     ' %</strong> - <strong><!-- IVa THE VALUE OF THE SEASONAL SPACE HEATING EFFICIENCY OF THE PREFERENTIAL SPACE HEATER EXPRESSED IN % --> '+spaceHtgEfficiency+' %</strong> ) x <strong><!-- XVII THE FACTOR FOR WEIGHTING THE HEAT OUTPUT - WEIGHTING FACTOR II PRATED FROM TABLE 6 --> '+weightingFactorII+'</strong> = </td>\n' +
		      '<td class="erpsign">-</td>\n' +
		      '<td class="erptdbox"><strong> <!-- X CALCULATED EFFECT OF SUPPLEMENTARY BOILER ON SYSTEM SPACE HEATING EFFICIENCY -->'+suppBoiler+' %</strong></td>\n' +
		    '</tr>\n' +
		    
		    '<tr>\n' +
		      '<td class="erptd" colspan="5" height="1" bgcolor="#4f5251"></td>\n' +
		    '</tr>\n' +
		    
		     '<tr>\n' +
		      '<td class="erptd" colspan="5"><p><strong><span class="erpfiche">SOLAR CONTRIBUTION</span></strong></p></td>\n' +
		    '</tr>\n' +
		    
		      '<tr>\n' +
		      '<td class="erptd" colspan="3"><p>( <strong><!-- VALUE OF MATHEMATICAL EXPRESSION FROM TABLE 15 --> N/A %</strong> x <strong><!-- COLLECTOR SIZE IN M2 FROM SOLAR FICHE -->N/A </strong>m<sup>2</sup> + <strong><!-- VALUE OF MATHEMATICAL EXPRESSION ?? -->N/A</strong> x <strong><!-- TANK VOLUME IN M3 -->N/A </strong>m<sup>3</sup> ) x 0.45 x ( <strong><!--COLLECTOR EFFICIENCY IN %-->N/A %</strong>/100 ) x <strong><!-- TANK RATING-->N/A</strong> = </td>\n' +
		     // '<td class="erptd" colspan="3"></td>\n' +
		      '<td class="erpsign">+</td>\n' +
		      '<td class="erptdbox"><strong><!--CALCULATED EFFECT OF SOLAR CONTRIBUTION-->0 %</strong></td>\n' +
		      //'<td class="erptdbox"><strong></strong></td>\n' +
			  '</tr>\n' +
		  '<tr>\n' +
		      '<td class="erptd" colspan="5" height="1" bgcolor="#4f5251"></td>\n' +
		    '</tr>\n' +
		    '<tr>\n' +
		      '<td class="erptd" colspan="4"><p><strong><span class="erpfiche">SEASONAL SPACE HEATING ENERGY EFFICIENCY OF PACKAGE UNDER AVERAGE CLIMATE</span></strong></p></td>\n' +
		      '<td class="erptdbox"><strong><!--VIa CALCULATED SPACE HEATING EFFIENCY OF THE PACKAGE-->'+htgEfficiency+' %</strong></td>\n' +
		    '</tr>\n' +
		    '<tr>\n' +
		      '<td class="erptd" colspan="5" height="1" bgcolor="#4f5251"></td>\n' +
		    '</tr>\n' +
		    '</tbody>\n' +
		    '</table>\n' +
		    '<br>\n' +
		    '<table width="100%" style="border-bottom: 1px solid #4f5251;" cellspacing="2" cellpadding="0">\n' +
		  '<tbody>\n' +
		    '<tr>\n' +
		      '<td colspan="10" bgcolor="#6ec62e"><p><strong><span style="color: #fff;">SEASONAL SPACE HEATING ENERGY EFFICIENCY CLASS OF PACKAGE UNDER AVERAGE CLIMATE</span></strong></p></td>\n' +
		    '</tr>\n' +
		    '<tr>\n' +
		      '<td bgcolor="#DFDFDF"><center>'+classg+'<br>\n' +
		      '<img src="/core/media/media.nl?id=14227103&c=472052&h=c7e43498998c47f3750c" alt="G" style="padding: 0px; margin: 0px; background: none; border: 0px;"><br><span style="font-size: 12px;">&lt;30%</span></center></td>\n' +
		       '<td bgcolor="#DFDFDF"><center>'+classf+'<br>\n' +
		       '<img src="/core/media/media.nl?id=14227106&c=472052&h=777c6cb9201fd362e141" alt="F" style="padding: 0px; margin: 0px; background: none; border: 0px;"><br><span style="font-size: 12px;">&ge;30%</span></center></td>\n' +
		      '<td bgcolor="#DFDFDF"><center>'+classe+'<br>\n' +
		       '<img src="/core/media/media.nl?id=14227113&c=472052&h=69c08524ff0fe175cc2e" alt="E" style="padding: 0px; margin: 0px; background: none; border: 0px;"><br><span style="font-size: 12px;">&ge;34%</span></center></td>\n' + 
		      '<td bgcolor="#DFDFDF"><center>'+classd+'<br>\n' +
		       '<img src="/core/media/media.nl?id=14227120&c=472052&h=d374a7789898f385df7f" alt="D" style="padding: 0px; margin: 0px; background: none; border: 0px;"><br><span style="font-size: 12px;">&ge;36%</span></center></td>\n' + 
		      '<td bgcolor="#DFDFDF"><center>'+classc+'<br>\n' +
		       '<img src="/core/media/media.nl?id=14227121&c=472052&h=bfff469ea8e7191574c7" alt="C" style="padding: 0px; margin: 0px; background: none; border: 0px;"><br><span style="font-size: 12px;">&ge;75%</span></center></td>\n' +
		      '<td bgcolor="#DFDFDF"><center>'+classb+'<br>\n' +
		       '<img src="/core/media/media.nl?id=14227133&c=472052&h=b9ac637e5ea56117e11b" alt="B" style="padding: 0px; margin: 0px; background: none; border: 0px;"><br><span style="font-size: 12px;">&ge;82%</span></center></td>\n' +
		      '<td bgcolor="#DFDFDF"><center>'+classa+'<br>\n' +
		       '<img src="/core/media/media.nl?id=14227139&c=472052&h=d4db0b47b6fbaa1562c8" alt="A" style="padding: 0px; margin: 0px; background: none; border: 0px;"><br><span style="font-size: 12px;">&ge;90%</span></center></td>\n' +
		      '<td bgcolor="#DFDFDF"><center>'+classaplus+'<br>\n' +
		       '<img src="/core/media/media.nl?id=14227107&c=472052&h=75ca69cae0aa26784577" alt="A+" style="padding: 0px; margin: 0px; background: none; border: 0px;"><br><span style="font-size: 12px;">&ge;98%</span></center></td>\n' +
		      '<td bgcolor="#DFDFDF"><center>'+classaplus2+'<br>\n' +
		       '<img src="/core/media/media.nl?id=14227100&c=472052&h=140189d35f87ceb566ae" alt="A++" style="padding: 0px; margin: 0px; background: none; border: 0px;"><br><span style="font-size: 12px;">&ge;125%</span></center></td>\n' +
		      '<td bgcolor="#DFDFDF"><center>'+classaplus3+'<br>\n' +
		       '<img src="/core/media/media.nl?id=14227096&c=472052&h=363d5505cbee88fb2ed6" alt="A+++" style="padding: 0px; margin: 0px; background: none; border: 0px;"><br><span style="font-size: 12px;">&ge;150%</span></center></td>\n' +
		    '</tr>\n' +
		  '</tbody>\n' +
		'</table>\n' +
	
		'<br>\n' +
		  '<table width="100%" border="0" cellspacing="3" cellpadding="0">\n' +
		  '<tbody>\n' +
		  '<tr>\n' +
		      '<td class="erptd" colspan="5" height="1" bgcolor="#4f5251"></td>\n' +
		    '</tr>\n' +
		    '<tr>\n' +
		      '<td class="erptd" colspan="5"><p><strong><span class="erpfiche">SEASONAL SPACE HEATING ENERGY EFFICIENCY UNDER COLDER &AMP; WARMER CLIMATE CONDITIONS</span></strong></p></td>\n' +
		    '</tr>\n' +
		   
		     '<tr> \n' +
		      '<td class="erptd"><p>Colder: <strong><!--VIa CALCULATED SPACE HEATING EFFICIENCY OF THE PACKAGE-->'+htgEfficiency+' %</strong> <strong><!--XVIII VALUE OF THE DIFFERENCE BETWEEN THE SEASONAL SPACE HEATING ENERGY EFFICIENCIES UNDER AVERAGE AND COLDER CLIMATE CONDITIONS, EXPRESSED IN %-->'+variationCold+'</strong> = </td>\n' +
		      '<td class="erptdbox"><strong><!--XI CALCULATED SEASONAL SPACE HEATING EFFICIENCY IN %, COLDER CLIMATE-->'+efficiencyCold+' %</strong></td>\n' +
		      '<td class="erptd" width="90">&nbsp;</td>\n' +
		      '<td class="erptd"><p>Warmer: <strong><!--VIa CALCULATED SPACE HEATING EFFIENCY OF THE PACKAGE-->'+htgEfficiency+' %</strong> <strong><!--XIX VALUE OF THE DIFFERENCE BETWEEN THE SEASONAL SPACE HEATING ENERGY EFFICIENCIES UNDER WARMER AND AVERAFE CLIMATE CONDITIONS, EXPRESSED IN %-->'+variationWarm+'</strong> = </td>\n' +
		      '<td class="erptdbox"><strong><!--XII CALCULATED SEASONAL SPACE HEATING EFFICIENCY IN %, COLDER CLIMATE-->'+efficiencyWarm+' %</strong></td>\n' +
		    '</tr>\n' +
		    '<tr>\n' +
		      '<td class="erptd" colspan="5" height="1" bgcolor="#4f5251"></td>\n' +
		    '</tr>\n' +
		    '</tbody>\n' +
		    '</table>\n';
		
		var figureFive = '';
		var hwClass = nlapiGetFieldValue('custbody_erp_system_hot_water_rating');
		if (hwClass)
		{
			var declaredLoadProf = nlapiGetFieldValue('custbody_erp_hot_water_load_profile');
			var waterHtgEfficiency = twoDP(nlapiGetFieldValue('custbody_erp_water_htg_efficiency_hp'));
			var dhwEfficiency = twoDP(nlapiGetFieldValue('custbody_erp_dhw_efficiency'));
			var weightingFactorII = twoDP(nlapiGetFieldValue('custbody_erp_htg_weight_factorii'));
			var solarBonus = Math.round(nlapiGetFieldValue('custbody_erp_solar_bonus'));
			var waterHtgEfficiencyCold = Math.round(nlapiGetFieldValue('custbody_erp_water_htg_efficiency_cold'));
			var waterHtgEfficiencyWarm = Math.round(nlapiGetFieldValue('custbody_erp_water_htg_efficiency_warm'));
			var weightingFactorIII = twoDP(nlapiGetFieldValue('custbody_erp_htg_weight_factoriii'));
		
			var loadProfM = '&#9744;';
			var loadProfL = '&#9744;';	
			var loadProfXL = '&#9744;';
			var loadProfXXL = '&#9744;';		
			if (declaredLoadProf == 'M')
			{
				loadProfM = '&#9745;';
			}
			else if (declaredLoadProf == 'L')
			{
				loadProfL = '&#9745;';
			}
			else if (declaredLoadProf == 'XL')
			{
				loadProfXL = '&#9745;';
			}
			else if (declaredLoadProf == 'XXL')
			{
				loadProfXXL = '&#9745;';
			}
			
			var HWclassaplus3 = '&#9744;';
			var HWclassaplus2 = '&#9744;';
			var HWclassaplus = '&#9744;';
			var HWclassa = '&#9744;';
			var HWclassb = '&#9744;';
			var HWclassc = '&#9744;';
			var HWclassd = '&#9744;';
			var HWclasse = '&#9744;';
			var HWclassf = '&#9744;';
			var HWclassg = '&#9744;';
			if (hwClass == 'A+++')
			{
				HWclassaplus3 = '&#9745;';
			}
			else if (hwClass == 'A++')
			{
				HWclassaplus2 = '&#9745;';
			}
			else if (hwClass == 'A+')
			{
				HWclassaplus = '&#9745;';
			}
			else if (hwClass == 'A')
			{
				HWclassa = '&#9745;';
			}
			else if (hwClass == 'B')
			{
				HWclassb = '&#9745;';
			}
			else if (hwClass == 'C')
			{
				HWclassc = '&#9745;';
			}
			else if (hwClass == 'D')
			{
				HWclassd = '&#9745;';
			}
			else if (hwClass == 'E')
			{
				HWclasse = '&#9745;';
			}
			else if (hwClass == 'F')
			{
				HWclassf = '&#9745;';
			}
			else if (hwClass == 'G')
			{
				HWclassg = '&#9745;';
			}
			figureFive = '<br /><br /><h3 class="erp">Figure 5</h3><p class="erp"><strong>For preferential boiler combination heaters and preferential heat pump combination heaters, element of the fiche for a package of combination heater, temperature control and solar device indicating the water heating energy efficiency of the package offered</strong></p>\n' +      
				'<table width="100%" border="0" cellspacing="3" cellpadding="0">\n' +
				'<tbody>\n' +
				'<tr>\n' +
				'<td class="erptd" colspan="4"><p><strong><span class="erpfiche">WATER HEATING ENERGY EFFICIENCY OF COMBINATION HEATER</span></strong></p></td>\n' +
				'<td class="erptdbox"><strong> <!-- IVb THE VALUE OF THE WATER HEATING EFFICIENCY OF THE COMBINATION HEATER EXPRESSED IN % --> '+showZero(waterHtgEfficiency)+' %</strong></td>\n' +
				'</tr>\n' +
				'<tr>\n' +
				'<td class="erptd" width="180">Declared load profile</td>\n' +
				'<td class="erptdbox"><strong> <!-- III LOAD PROFILE FROM HEATER FICHE --> '+declaredLoadProf+'</strong></td>\n' +
				'<td class="erptd" colspan="3">&nbsp;</td>\n' +
				'</tr>\n' +
				'<tr>\n' +
				'<td class="erptd" colspan="5" height="1" bgcolor="#4f5251"></td>\n' +
				'</tr>\n' +
				'<tr>\n' +
				'<td class="erptd" colspan="5"><p><strong><span class="erpfiche">SOLAR CONTRIBUTION</span></strong></p></td>\n' +
				'</tr>\n' +
				'<tr>\n' +
				'<td class="erptd" colspan="3"><p>( 1.1 x <strong><!-- IVb THE VALUE OF THE WATER HEATING EFFICIENCY OF THE COMBINATION HEATER EXPRESSED IN % --> '+waterHtgEfficiency+' %</strong> - 10% ) x <strong><!-- XXI THE VALUE OF THE MATHEMATICAL EXPRESSION FROM TABLE 15 -->'+weightingFactorII+'</strong> - <strong><!-- XX ANOTHER VALUE OF THE MATHEMATICAL EXPRESSION FROM TABLE 15 -->'+weightingFactorIII+'</strong> -  <strong><!-- IVb THE VALUE OF THE WATER HEATING EFFICIENCY OF THE COMBINATION HEATER EXPRESSED IN % --> '+waterHtgEfficiency+' %</strong> = </td>\n' +
				'<td class="erpsign">+</td>\n' +
				'<td class="erptdbox"><strong><!-- XIV CALCULATED EFFECT OF SOLAR CONTRIBUTION-->'+showZero(solarBonus)+' %</strong></td>\n' +
				'</tr>\n' +
				'<tr>\n' +
				'<td class="erptd" colspan="5" height="1" bgcolor="#4f5251"></td>\n' +
				'</tr>\n' +
				'<tr>\n' +
				'<td class="erptd" colspan="4"><p><strong><span class="erpfiche">WATER HEATING ENERGY EFFICIENCY OF PACKAGE UNDER AVERAGE CLIMATE</span></strong></p></td>\n' +
				'<td class="erptdbox"><strong><!--VIIa CALCULATED SPACE HEATING EFFIENCY OF THE PACKAGE--> '+showZero(dhwEfficiency)+' %</strong></td>\n' +
				'</tr>\n' +
				'<tr>\n' +
				'<td class="erptd" colspan="5" height="1" bgcolor="#4f5251"></td>\n' +
				'</tr>\n' +
				'</tbody>\n' +
				'</table>\n' +
				'<br>\n' +
				'<table width="100%" style="border-bottom: 1px solid #4f5251;" cellspacing="2" cellpadding="0">\n' +
				'<tbody>\n' +
				'<tr>\n' +
				'<td colspan="11" bgcolor="#6ec62e"><p><strong><span style="color: #fff;">WATER HEATING ENERGY EFFICIENCY CLASS OF PACKAGE UNDER AVERAGE CLIMATE</span></strong></p></td>\n' +
				'</tr>\n' +
				'<tr>\n' +
				'<td class="erptd" bgcolor="#DFDFDF"><center>&nbsp;</center></td>\n' +
				'<td class="erptd" bgcolor="#DFDFDF"><center>'+HWclassg+'<br><img src="/core/media/media.nl?id=14227103&c=472052&h=c7e43498998c47f3750c" alt="G" style="float: none; padding: 0px; margin: 0px; background: none; border: 0px;"></center></td>\n' +
				'<td class="erptd" bgcolor="#DFDFDF"><center>'+HWclassf+'<br><img src="/core/media/media.nl?id=14227106&c=472052&h=777c6cb9201fd362e141" alt="F" style="float: none; padding: 0px; margin: 0px; background: none; border: 0px;"></center></td>\n' +
				'<td class="erptd" bgcolor="#DFDFDF"><center>'+HWclasse+'<br><img src="/core/media/media.nl?id=14227113&c=472052&h=69c08524ff0fe175cc2e" alt="E" style="float: none; padding: 0px; margin: 0px; background: none; border: 0px;"></center></td>\n' +
				'<td class="erptd" bgcolor="#DFDFDF"><center>'+HWclassd+'<br><img src="/core/media/media.nl?id=14227120&c=472052&h=d374a7789898f385df7f" alt="D" style="float: none; padding: 0px; margin: 0px; background: none; border: 0px;"></center></td>\n' +
				'<td class="erptd" bgcolor="#DFDFDF"><center>'+HWclassc+'<br><img src="/core/media/media.nl?id=14227121&c=472052&h=bfff469ea8e7191574c7" alt="C" style="float: none; padding: 0px; margin: 0px; background: none; border: 0px;"></center></td>\n' +
				'<td class="erptd" bgcolor="#DFDFDF"><center>'+HWclassb+'<br><img src="/core/media/media.nl?id=14227133&c=472052&h=b9ac637e5ea56117e11b" alt="B" style="float: none; padding: 0px; margin: 0px; background: none; border: 0px;"></center></td>\n' +
				'<td class="erptd" bgcolor="#DFDFDF"><center>'+HWclassa+'<br><img src="/core/media/media.nl?id=14227139&c=472052&h=d4db0b47b6fbaa1562c8" alt="A" style="float: none; padding: 0px; margin: 0px; background: none; border: 0px;"></center></td>\n' +
				'<td class="erptd" bgcolor="#DFDFDF"><center>'+HWclassaplus+'<br><img src="/core/media/media.nl?id=14227107&c=472052&h=75ca69cae0aa26784577" alt="A+" style="float: none; padding: 0px; margin: 0px; background: none; border: 0px;"></center></td>\n' +
				'<td class="erptd" bgcolor="#DFDFDF"><center>'+HWclassaplus2+'<br><img src="/core/media/media.nl?id=14227100&c=472052&h=140189d35f87ceb566ae" alt="A++" style="float: none; padding: 0px; margin: 0px; background: none; border: 0px;"></center></td>\n' +
				'<td class="erptd" bgcolor="#DFDFDF"><center>'+HWclassaplus3+'<br><img src="/core/media/media.nl?id=14227096&c=472052&h=363d5505cbee88fb2ed6" alt="A+++" style="float: none; padding: 0px; margin: 0px; background: none; border: 0px;"></center></td>\n' +
				'</tr>\n' +
				'<tr>\n' +
				'<td class="erptd" colspan="11" height="1" bgcolor="#6ec62e"></td>\n' +
				'</tr>\n' +
				'<tr>\n' +
				'<td class="erptd" bgcolor="#DFDFDF" width="48">&nbsp;'+loadProfM+' <strong><span style="color: #6ec62e;">M</span></strong></td>\n' +
				'<td class="erptd" bgcolor="#DFDFDF"><center><span style="font-size: 12px;">&lt;27%</span></center></td>\n' +
				'<td class="erptd" bgcolor="#DFDFDF"><center><span style="font-size: 12px;">&ge;27%</span></center></td>\n' +
				'<td class="erptd" bgcolor="#DFDFDF"><center><span style="font-size: 12px;">&ge;30%</span></center></td>\n' +
				'<td class="erptd" bgcolor="#DFDFDF"><center><span style="font-size: 12px;">&ge;33%</span></center></td>\n' +
				'<td class="erptd" bgcolor="#DFDFDF"><center><span style="font-size: 12px;">&ge;36%</span></center></td>\n' +
				'<td class="erptd" bgcolor="#DFDFDF"><center><span style="font-size: 12px;">&ge;39%</span></center></td>\n' +
				'<td class="erptd" bgcolor="#DFDFDF"><center><span style="font-size: 12px;">&ge;65%</span></center></td>\n' +
				'<td class="erptd" bgcolor="#DFDFDF"><center><span style="font-size: 12px;">&ge;100%</span></center></td>\n' +
				'<td class="erptd" bgcolor="#DFDFDF"><center><span style="font-size: 12px;">&ge;130%</span></center></td>\n' +
				'<td class="erptd" bgcolor="#DFDFDF"><center><span style="font-size: 12px;">&ge;163%</span></center></td>\n' +
				'</tr>\n' +
				'<tr>\n' +
				'<td class="erptd" colspan="11" height="1" bgcolor="#6ec62e"></td>\n' +
				'</tr>		\n' +
				'<tr>\n' +
				'<td class="erptd" bgcolor="#DFDFDF" width="34">&nbsp;'+loadProfL+' <strong><span style="color: #6ec62e;">L</span></strong></td>\n' +
				'<td class="erptd" bgcolor="#DFDFDF"><center><span style="font-size: 12px;">&lt;27%</span></center></td>\n' +
				'<td class="erptd" bgcolor="#DFDFDF"><center><span style="font-size: 12px;">&ge;27%</span></center></td>\n' +
				'<td class="erptd" bgcolor="#DFDFDF"><center><span style="font-size: 12px;">&ge;30%</span></center></td>\n' +
				'<td class="erptd" bgcolor="#DFDFDF"><center><span style="font-size: 12px;">&ge;34%</span></center></td>\n' +
				'<td class="erptd" bgcolor="#DFDFDF"><center><span style="font-size: 12px;">&ge;37%</span></center></td>\n' +
				'<td class="erptd" bgcolor="#DFDFDF"><center><span style="font-size: 12px;">&ge;50%</span></center></td>\n' +
				'<td class="erptd" bgcolor="#DFDFDF"><center><span style="font-size: 12px;">&ge;75%</span></center></td>\n' +
				'<td class="erptd" bgcolor="#DFDFDF"><center><span style="font-size: 12px;">&ge;110%</span></center></td>\n' +
				'<td class="erptd" bgcolor="#DFDFDF"><center><span style="font-size: 12px;">&ge;150%</span></center></td>\n' +
				'<td class="erptd" bgcolor="#DFDFDF"><center><span style="font-size: 12px;">&ge;188%</span></center></td>\n' +
				'</tr>\n' +
				'<tr>\n' +
				'<td class="erptd" colspan="11" height="1" bgcolor="#6ec62e"></td>\n' +
				'</tr>\n' +
				'<tr>\n' +
				'<td class="erptd" bgcolor="#DFDFDF" width="34">&nbsp;'+loadProfXL+' <strong><span style="color: #6ec62e;">XL</span></strong></td>\n' +
				'<td class="erptd" bgcolor="#DFDFDF"><center><span style="font-size: 12px;">&lt;27%</span></center></td>\n' +
				'<td class="erptd" bgcolor="#DFDFDF"><center><span style="font-size: 12px;">&ge;27%</span></center></td>\n' +
				'<td class="erptd" bgcolor="#DFDFDF"><center><span style="font-size: 12px;">&ge;30%</span></center></td>\n' +
				'<td class="erptd" bgcolor="#DFDFDF"><center><span style="font-size: 12px;">&ge;35%</span></center></td>\n' +
				'<td class="erptd" bgcolor="#DFDFDF"><center><span style="font-size: 12px;">&ge;38%</span></center></td>\n' +
				'<td class="erptd" bgcolor="#DFDFDF"><center><span style="font-size: 12px;">&ge;55%</span></center></td>\n' +
				'<td class="erptd" bgcolor="#DFDFDF"><center><span style="font-size: 12px;">&ge;80%</span></center></td>\n' +
				'<td class="erptd" bgcolor="#DFDFDF"><center><span style="font-size: 12px;">&ge;123%</span></center></td>\n' +
				'<td class="erptd" bgcolor="#DFDFDF"><center><span style="font-size: 12px;">&ge;160%</span></center></td>\n' +
				'<td class="erptd" bgcolor="#DFDFDF"><center><span style="font-size: 12px;">&ge;200%</span></center></td>\n' +
				'</tr>\n' +
				'<tr>\n' +
				'<td class="erptd" colspan="11" height="1" bgcolor="#6ec62e"></td>\n' +
				'</tr>\n' +
				'<tr>\n' +
				'<td class="erptd" bgcolor="#DFDFDF" width="34">&nbsp;'+loadProfXXL+' <strong><span style="color: #6ec62e;">XXL</span></strong></td>\n' +
				'<td class="erptd" bgcolor="#DFDFDF"><center><span style="font-size: 12px;">&lt;28%</span></center></td>\n' +
				'<td class="erptd" bgcolor="#DFDFDF"><center><span style="font-size: 12px;">&ge;28%</span></center></td>\n' +
				'<td class="erptd" bgcolor="#DFDFDF"><center><span style="font-size: 12px;">&ge;32%</span></center></td>\n' +
				'<td class="erptd" bgcolor="#DFDFDF"><center><span style="font-size: 12px;">&ge;36%</span></center></td>\n' +
				'<td class="erptd" bgcolor="#DFDFDF"><center><span style="font-size: 12px;">&ge;40%</span></center></td>\n' +
				'<td class="erptd" bgcolor="#DFDFDF"><center><span style="font-size: 12px;">&ge;60%</span></center></td>\n' +
				'<td class="erptd" bgcolor="#DFDFDF"><center><span style="font-size: 12px;">&ge;85%</span></center></td>\n' +
				'<td class="erptd" bgcolor="#DFDFDF"><center><span style="font-size: 12px;">&ge;131%</span></center></td>\n' +
				'<td class="erptd" bgcolor="#DFDFDF"><center><span style="font-size: 12px;">&ge;170%</span></center></td>\n' +
				'<td class="erptd" bgcolor="#DFDFDF"><center><span style="font-size: 12px;">&ge;213%</span></center></td>\n' +
				'</tr>\n' +
				'</tbody>\n' +
				'</table>\n' +
				'<br>\n' +
				'<table width="100%" border="0" cellspacing="3" cellpadding="0">\n' +
				'<tbody>\n' +
				'<tr>\n' +
				'<td class="erptd" colspan="5" height="1" bgcolor="#4f5251"></td>\n' +
				'</tr>\n' +
				'<tr>\n' +
				'<td class="erptd" colspan="5"><p><strong><span class="erpfiche">WATER HEATING ENERGY EFFICIENCY UNDER COLDER &AMP; WARMER CLIMATE CONDITIONS</span></strong></p></td>\n' +
				'</tr>\n' +
				'<tr> \n' +
				'<td class="erptd"><p>Colder:</p></td>\n' +      
				'<td class="erptd"><p><strong><!-- VIIa CALCULATED WATER HEATING EFFIENCY OF THE PACKAGE-->'+showZero(dhwEfficiency)+' %</strong> - 0.2 x <strong><!-- XIV CALCULATED SOLAR CONTRIBUTION %-->'+showZero(solarBonus)+' %</strong></p></td>\n' +      
				'<td class="erptd" width="10"><p>=</p></td>\n' +
				'<td class="erptdbox"><strong><!-- XV CALCULATED WATER HEATING EFFICIENCY IN %, COLDER CLIMATE-->'+showZero(waterHtgEfficiencyCold)+' %</strong></td>\n' +
				'<td class="erptd" width="210">&nbsp;</td>\n' +
				'</tr>\n' +
				'<tr>\n' +
				'<td class="erptd"><p>Warmer:</p></td>\n' +
				'<td class="erptd"><p><strong><!-- VIIa CALCULATED WATER HEATING EFFIENCY OF THE PACKAGE-->'+showZero(dhwEfficiency)+' %</strong> + 0.4 x <strong><!-- XIV CALCULATED SOLAR CONTRIBUTION %-->'+showZero(solarBonus)+' %</strong></p></td>\n' +
				'<td class="erptd" width="10"><p>=</p></td>\n' +
				'<td class="erptdbox"><strong><!--XVI CALCULATED WATER HEATING EFFICIENCY IN %, COLDER CLIMATE-->'+showZero(waterHtgEfficiencyWarm)+' %</strong></td>\n' +
				'<td class="erptd" width="210">&nbsp;</td>\n' +
				'</tr>\n' +
				'<tr>\n' +
				'<td class="erptd" colspan="5" height="1" bgcolor="#4f5251"></td>\n' +
				'</tr>\n' +
				'</tbody></table>\n';
		}
		var ficheHPNotes = handleNull(nlapiGetFieldValue('custbody_erp_hp_comments'));
		var ficheSolNotes = handleNull(nlapiGetFieldValue('custbody_erp_sol_comments'));
		var ficheNotes = '';
		if (ficheHPNotes || ficheSolNotes)
		{
			ficheNotes = '<p><strong><span class="erpfiche">NOTES</span></strong></p><p><strong>'+ficheHPNotes+'<br />'+ficheSolNotes+'</strong></p>\n';
		}
		
		hpFiche = '<h2 class="acc_trigger breakhere"><a href="#3" id="sfiche" onclick="ga(\'send\', \'event\', \'quote\', \'Click\', \'erp-fiche\');"><div class="P-Header">Energy Label & Fiche</div></a></h2>\n' +
		'<div class="acc_container" id="fiche" style="display: block; overflow: hidden;">\n' +
		'<div class="block"><h3>System Fiche</h3><p>The package fiche below shows calculations of efficiency for the system as a whole, as required by EU legislation for energy related products.</p><br>\n' + 
		figureThree + figureFive + ficheNotes +	
		'<p>The energy efficiency of the package of products provided for in this fiche may not correspond to its actual energy efficiency once installed in a building, '+
		'as the efficiency is influenced by further factors such as heat loss in the distribution system and the dimensioning of the products in relation to building size and characteristics.</p>\n' + 
		cylinderProductFiche(transactionID) + '</div></div>\n';
	}	
	
	return hpFiche;
}

function SOLsystemFiche(transactionID, quoteNumber)
{
//	var transRecord = nlapiLoadRecord('estimate', transactionID);	
	
	var collectorArea = nlapiGetFieldValue('custbody_erp_sol_col_area');			//Total collector aperture area, m�
	var collectorEfficiency = nlapiGetFieldValue('custbody_erp_sol_col_eff');	//Collector efficiency, %
	var firstOrder = nlapiGetFieldValue('custbody_erp_sol_first_order');			//1st order coefficient, W/(m2 K)
	var secondOrder = nlapiGetFieldValue('custbody_erp_sol_second_order');		//2nd order coefficient, W/(m2 K)
	var incidenceAngle = nlapiGetFieldValue('custbody_erp_sol_inc_angle_mod');	//Incidence angle modifier
	var efficiencyClass = handleNull(nlapiGetFieldValue('custbody_erp_sol_eff_class'));		//Energy efficiency class of solar hot water cylinder
	var standingLoss = handleNull(nlapiGetFieldValue('custbody_erp_sol_standing_loss'));		//Standing loss solar hot water cylinder, W
	var storageVolume = removeZero(twoDP(nlapiGetFieldValue('custbody_erp_sol_storage_volume')));	//Storage volume of solar hot water cylinder, litres
	var storageVolumeM = removeZero(twoDP(nlapiGetFieldValue('custbody_erp_sol_storage_volume_m3')));//removeZero(twoDP(parseFloat(storageVolume)/1000));								//Storage volume of solar hot water cylinder, m�
	var mElectricity = removeZero(Math.round(nlapiGetFieldValue('custbody_erp_sol_melec')));				//M	Electricity (kWh of primary energy)
	var lElectricity= removeZero(Math.round(nlapiGetFieldValue('custbody_erp_sol_lelec')));				//L	Electricity (kWh of primary energy)
	var xlElectricity = removeZero(Math.round(nlapiGetFieldValue('custbody_erp_sol_xlelec')));			//XL Electricity (kWh of primary energy)
	var xxlElectricity = removeZero(Math.round(nlapiGetFieldValue('custbody_erp_sol_xxlelec')));			//XXL Electricity (kWh of primary energy)
	var mFossilFuels = handleNull(nlapiGetFieldValue('custbody_erp_sol_mfossil'));			//M Fossil fuels (kWh of�GCV)
	var lFossilFuels = handleNull(nlapiGetFieldValue('custbody_erp_sol_lfossil'));			//L	Fossil fuels (kWh of�GCV)
	var xlFossilFuels = handleNull(nlapiGetFieldValue('custbody_erp_sol_xlfossil'));			//XL Fossil fuels (kWh of�GCV)
	var xxlFossilFuels = handleNull(nlapiGetFieldValue('custbody_erp_sol_xxlfossil'));		//XXL Fossil fuels (kWh of�GCV)
	var pumpPower = nlapiGetFieldValue('custbody_erp_sol_pump_power');			//Pump power consumption, W
	var standbyPower = nlapiGetFieldValue('custbody_erp_sol_standby_power');		//Standby power consumption, W
	var auxElectricity = Math.round(nlapiGetFieldValue('custbody_erp_sol_aux_elec'));		//Annual auxiliary electricity consumption, kWh of final energy
	var ficheHPNotes = handleNull(nlapiGetFieldValue('custbody_erp_hp_comments'));
	var ficheSolNotes = handleNull(nlapiGetFieldValue('custbody_erp_sol_comments'));
	var ficheNotes = '';
	if (ficheHPNotes || ficheSolNotes)
	{
		ficheNotes = '<tr>\n' +
		'<td class="erptd" colspan="2" ><p><strong><span class="erpfiche">NOTES</span></strong></p><p><strong>'+ficheHPNotes+'<br />'+ficheSolNotes+'</strong></p></td>\n' +
		'</tr>\n' +
		'<tr>\n' +
		'<td class="erptd" colspan="2" height="1" bgcolor="#4f5251"></td>\n' +
		'</tr>\n';
	}
	
	var solFiche = '<h2 class="acc_trigger breakhere"><a href="#2" onclick="ga(\'send\', \'event\', \'quote\', \'Click\', \'erp-fiche\');"><div class="P-Header">System Fiche</div></a></h2>\n' +
	'<div class="acc_container" style="display: block; overflow: hidden;"> <div class="block">\n'+
	'<p>The package fiche below shows calculations of efficiency for the system as a whole, as required by EU legislation for energy related products.</p><br>\n' +
	'<h3 class="erp">Solar system fiche</h3> \n' +  
	'<table width="100%" border="0" cellspacing="3" cellpadding="0"> <tbody> \n' +
	'<tr> \n' +
	'<td class="erptd"><p><strong><span class="erpfiche">SUPPLIER</span></strong></p></td> \n' +
	'<td class="erptd" width="190" colspan="2"><strong>Nu-Heat UK Ltd</strong></td> \n' +
	'</tr>\n' +
	'<tr>\n' +
	'<td class="erptd" colspan="3" height="1" bgcolor="#4f5251"></td>\n' +
	'</tr>\n' +
	'<tr>\n' +
	'<td class="erptd"><p><strong><span class="erpfiche">SOLAR QUOTE NUMBER</span></strong></p></td>\n' +
	'<td class="erptd" colspan="2"><strong>'+quoteNumber+'</strong></td>\n' +
	'</tr>\n' +
	'<tr>\n' +
	'<td class="erptd" colspan="3" height="1" bgcolor="#4f5251"></td>\n' +
	'</tr>\n' +
	'<tr>\n' +
	'<td class="erptd"><p><strong><span class="erpfiche">TOTAL COLLECTOR APERTURE AREA</span></strong></p></td>\n' +
	'<td class="erptd" colspan="2"><strong>'+collectorArea+' m<sup>2</sup></strong></td>\n' +
	'</tr>\n' +
	'<tr>\n' +
	'<td class="erptd" colspan="3" height="1" bgcolor="#4f5251"></td>\n' +
	'</tr>\n' +
	'<tr>\n' +
	'<td class="erptd"><p><strong><span class="erpfiche">ZERO-LOSS EFFICIENCY</span></strong></p></td>\n' +
	'<td class="erptd" colspan="2"><strong>'+collectorEfficiency+' %</strong></td>\n' +
	'</tr>\n' +
	'<tr>\n' +
	'<td class="erptd" colspan="3" height="1" bgcolor="#4f5251"></td>\n' +
	'</tr>\n' +
	'<tr>\n' +
	'<td class="erptd"><p><strong><span class="erpfiche">FIRST-ORDER COEFFICIENT</span></strong></p></td>\n' +
	'<td class="erptd" colspan="2"><strong>'+firstOrder+' W/(m<sup>2</sup> K)</strong></td>\n' +
	'</tr>\n' +
	'<tr>\n' +
	'<td class="erptd" colspan="3" height="1" bgcolor="#4f5251"></td>\n' +
	'</tr>\n' +
	'<tr>\n' +
	'<td class="erptd"><p><strong><span class="erpfiche">SECOND-ORDER COEFFICIENT</span></strong></p></td>\n' +
	'<td class="erptd" colspan="2"><strong>'+secondOrder+' W/(m<sup>2</sup> K<sup>2</sup>)</strong></td>\n' +
	'</tr>\n' +
	'<tr>\n' +
	'<td class="erptd" colspan="3" height="1" bgcolor="#4f5251"></td>\n' +
	'</tr>\n' +
	'<tr>\n' +
	'<td class="erptd"><p><strong><span class="erpfiche">INCIDENCE ANGLE MODIFIER</span></strong></p></td>\n' +
	'<td class="erptd" colspan="2"><strong>'+incidenceAngle+'</strong></td>\n' +
	'</tr>\n' +
	'<tr>\n' +
	'<td class="erptd" colspan="3" height="1" bgcolor="#4f5251"></td>\n' +
	'</tr>\n' +
	'<tr>\n' +
	'<td class="erptd"><p><strong><span class="erpfiche">ENERGY EFFICIENCY CLASS OF SOLAR HOT WATER CYLINDER</span></strong></p></td>\n' +
	'<td class="erptd" colspan="2"><strong>'+efficiencyClass+'</strong></td>\n' +
	'</tr>\n' +
	'<tr>\n' +
	'<td class="erptd" colspan="3" height="1" bgcolor="#4f5251"></td>\n' +
	'</tr>\n' +
	'<tr>\n' +
	'<td class="erptd"><p><strong><span class="erpfiche">STANDING LOSS OF SOLAR HOT WATER CYLINDER</span></strong></p></td>\n' +
	'<td class="erptd" colspan="2"><strong>'+standingLoss+' W</strong></td>\n' +
	'</tr>\n' +
	'<tr>\n' +
	'<td class="erptd" colspan="3" height="1" bgcolor="#4f5251"></td>\n' +
	'</tr>\n' +
	'<tr>\n' +
	'<td class="erptd"><p><strong><span class="erpfiche">STORAGE VOLUME OF SOLAR HOT WATER CYLINDER</span></strong></p></td>\n' +
	'<td class="erptd"><strong>'+storageVolumeM+' m<sup>3</sup></strong></td>\n' +
	'<td class="erptd"><strong>'+storageVolume+' l</strong></td>\n' +
	'</tr>\n' +
	'<tr>\n' +
	'<td class="erptd" colspan="3" height="1" bgcolor="#4f5251"></td>\n' +
	'</tr> \n' +
	'</tbody></table>\n' +
      
	'<table width="100%" border="0" cellspacing="3" cellpadding="0"><tbody>  \n' +
	'<tr>\n' +
	'<td class="erptd" colspan="3"><p><strong><span class="erpfiche">ANNUAL NON-SOLAR HEAT CONTRIBUTION UNDER AVERAGE CLIMATE CONDITIONS</span></strong></p></td>\n' +
	'</tr>\n' +
	'<tr>\n' + 
	'<td>&nbsp;</td>\n' +
	'<td width="45%" bgcolor="#DFDFDF"><strong>Electricity (kWh of primary energy)</strong></td>\n' +
	'<td width="45%" bgcolor="#DFDFDF"><strong>Fossil fuels (kWh of GCV)</strong></td>\n' +
	'</tr>\n' +
	'<tr>\n' +
	'<td class="erptd" colspan="3" height="1" bgcolor="#6ec62e"></td>\n' +
	'</tr>\n' +
	'<tr>\n' + 
	'<td bgcolor="#DFDFDF" align="right"><strong><span style="color: #6ec62e;">M</span></strong></td>\n' +
	'<td bgcolor="#DFDFDF"><strong>'+mElectricity+'</strong></td>\n' + 
	'<td bgcolor="#DFDFDF"><strong>'+mFossilFuels+'</strong></td>\n' +
	'</tr>\n' +
	'<tr>\n' +
	'<td class="erptd" colspan="3" height="1" bgcolor="#6ec62e"></td>\n' +
	'</tr>\n' +
	'<tr>\n' + 
	'<td bgcolor="#DFDFDF" align="right"><strong><span style="color: #6ec62e;">L</span></strong></td>\n' +
	'<td bgcolor="#DFDFDF"><strong>'+lElectricity+'</strong></td>\n' +
	'<td bgcolor="#DFDFDF"><strong>'+lFossilFuels+'</strong></td>\n' +
	'</tr>\n' +
	'<tr>\n' +
	'<td class="erptd" colspan="3" height="1" bgcolor="#6ec62e"></td>\n' +
	'</tr>\n' +
	'<tr>\n' + 
	'<td bgcolor="#DFDFDF" align="right"><strong><span style="color: #6ec62e;">XL</span></strong></td>\n' +
	'<td bgcolor="#DFDFDF"><strong>'+xlElectricity+'</strong></td>\n' +
	'<td bgcolor="#DFDFDF"><strong>'+xlFossilFuels+'</strong></td>\n' +
	'</tr>\n' +
	'<tr>\n' +
	'<td class="erptd" colspan="3" height="1" bgcolor="#6ec62e"></td>\n' +
	'</tr>\n' +
	'<tr>\n' + 
	'<td bgcolor="#DFDFDF" align="right"><strong><span style="color: #6ec62e;">XXL</span></strong></td>\n' +
	'<td bgcolor="#DFDFDF"><strong>'+xxlElectricity+'</strong></td>\n' +
	'<td bgcolor="#DFDFDF"><strong>'+xxlFossilFuels+'</strong></td>\n' +
	'</tr>\n' +
	'<tr>\n' +
	'<td class="erptd" colspan="3" height="1" bgcolor="#4f5251"></td>\n' +
	'</tr>\n' +
	'</tbody>\n' +
	'</table>\n' +	
	
	'<table width="100%" border="0" cellspacing="3" cellpadding="0"><tbody>\n' +
	'<tr>\n' +
	'<td class="erptd"><p><strong><span class="erpfiche">PUMP POWER CONSUMPTION</span></strong></p></td>\n' +
	'<td class="erptd" width="190"><strong>'+pumpPower+' W</strong></td>\n' +
	'</tr>\n' +
	'<tr>\n' +
	'<td class="erptd" colspan="2" height="1" bgcolor="#4f5251"></td>\n' +
	'</tr>\n' +
	'<tr>\n' +
	'<td class="erptd"><p><strong><span class="erpfiche">STANDBY POWER CONSUMPTION</span></strong></p></td>\n' +
	'<td class="erptd"><strong>'+standbyPower+' W</strong></td>\n' +
	'</tr>\n' +
	'<tr>\n' +
	'<td class="erptd" colspan="2" height="1" bgcolor="#4f5251"></td>\n' +
	'</tr>\n' +
	'<tr>\n' +
	'<td class="erptd"><p><strong><span class="erpfiche">ANNUAL AUXILIARY ELECTRICITY CONSUMPTION</span></strong></p></td>\n' +
	'<td class="erptd"><strong>'+auxElectricity+' kWh of final energy</strong></td>\n' +
	'</tr>\n' +
	'<tr>\n' +
	'<td class="erptd" colspan="2" height="1" bgcolor="#4f5251"></td>\n' +
	'</tr>\n' + ficheNotes +
//	'<tr>\n' +
//	'<td class="erptd" colspan="2" >'+ficheNotes+'</td>\n' +
//	'</tr>\n' +
	'</tbody></table>\n' +
	'<br>'+cylinderProductFiche(transactionID) + '</div></div> \n';
	
	return solFiche;

}
function cylinderProductFiche(transactionID)
{
//	var transRecord = nlapiLoadRecord('estimate', transactionID);
	var itemCount = nlapiGetLineItemCount('item');
	var cylinderFiche = '';
	var modelIdentifier = '';
	var energyEffClass = '';
	var standingLoss = '';
	var storageVolume = '';
	var ficheDetail = '';
	var energyLabel = '';
	for (var i=1; i <= itemCount; i++)
	{
		energyEffClass = nlapiGetLineItemValue('item', 'custcol_erp_energy_efficiency_class', i);
		if (energyEffClass)
		{
			modelIdentifier = nlapiGetLineItemText('item', 'item', i);
			standingLoss = nlapiGetLineItemValue('item', 'custcol_erp_standing_loss', i);
			storageVolume = nlapiGetLineItemValue('item', 'custcol_erp_standing_volume', i);
			productLabelLink = nlapiGetLineItemValue('item', 'custcol_erp_product_label', i);
			
			ficheDetail += '<h3>Product Fiche</h3>\n'+
			'<table width="100%" border="0" cellspacing="3" cellpadding="0"><tbody>\n' +
			'<tr>\n' +
			'<td class="erptd" colspan="2" height="1" bgcolor="#4f5251"></td>\n' +
			'</tr>\n' +
			'<tr>\n' +
			'<td class="erptd" width="250"><p><strong><span class="erpfiche">SUPPLIER</span></strong></p></td>\n' +
			'<td class="erptd"><strong>Nu-Heat UK Ltd</strong></td>\n' +
			'</tr>\n' +
			'<tr>\n' +
			'<td class="erptd" colspan="2" height="1" bgcolor="#4f5251"></td>\n' +
			'</tr>\n' +
			'<tr>\n' +
			'<td class="erptd"><p><strong><span class="erpfiche">MODEL IDENTIFIER</span></strong></p></td>\n' +
			'<td class="erptd"><strong>'+modelIdentifier+'</strong></td>\n' +
			'</tr>\n' +
			'<tr>\n' +
			'<td class="erptd" colspan="2" height="1" bgcolor="#4f5251"></td>\n' +
			'</tr>\n' +
			'<tr>\n' +
			'<td class="erptd"><p><strong><span class="erpfiche">ENERGY EFFICIENCY CLASS</span></strong></p></td>\n' +
			'<td class="erptd"><strong>'+energyEffClass+'</strong></td>\n' +
			'</tr>\n' +
			'<tr>\n' +
			'<td class="erptd" colspan="2" height="1" bgcolor="#4f5251"></td>\n' +
			'</tr>\n' +
			'<tr>\n' +
			'<td class="erptd"><p><strong><span class="erpfiche">STANDING LOSS</span></strong></p></td>\n' +
			'<td class="erptd"><strong>'+standingLoss+' W</strong></td>\n' +
			'</tr>\n' +
			'<tr>\n' +
			'<td class="erptd" colspan="2" height="1" bgcolor="#4f5251"></td>\n' +
			'</tr>\n' +
			'<tr>\n' +
			'<td class="erptd"><p><strong><span class="erpfiche">STORAGE VOLUME</span></strong></p></td>\n' +
			'<td class="erptd"><strong>'+storageVolume+' l</strong></td>\n' +
			'</tr>\n' +
			'<tr>\n' +
			'<td class="erptd" colspan="2" height="1" bgcolor="#4f5251"></td>\n' +
			'</tr>\n' +
			'</tbody></table><br>\n';
			
			energyLabel += '<tr>\n' +
			'<td class="erptd" width="250"><p><strong><span class="erpfiche"><!--model identifier-->'+modelIdentifier+'</span></strong></p></td>\n' +
			'<td class="erptd"><a href="'+productLabelLink+'" target="_blank">Click to view label [PDF]</a></td>\n' +
			'</tr>\n' +
			'<tr>\n' +
			'<td class="erptd" colspan="2" height="1" bgcolor="#4f5251"></td>\n' +
			'</tr>\n';
		}
		
		if (ficheDetail)
		{
			cylinderFiche = /*'<h2 class="acc_trigger breakhere"><a href="#2" onclick="ga(\'send\', \'event\', \'quote\', \'Click\', \'erp-product-fiche\');"><div class="P-Header">Product Fiche &amp; Energy Labels</div></a></h2>\n' +
			'<div class="acc_container" style="display: block; overflow: hidden;">\n' +
			'<div class="block">'+*/
			'<p>The product fiche below shows technical information related to the product\'s efficiency, as required by EU legislation for energy related products.</p>\n'+
			'<br>\n' +ficheDetail+
			'<h3>Energy Labels</h3>\n' +
			'<table width="100%" border="0" cellspacing="3" cellpadding="0">\n' +
			'<tbody>\n' +
			'<tr>\n' +
			'<td class="erptd" colspan="2" height="1" bgcolor="#4f5251"></td>\n' +
			'</tr>\n' +energyLabel+'</tbody>\n' +
			'</table>\n';
		}
		
	}
	return cylinderFiche;
}


function mcsAndRECC(transactionID)
{
	var mcsRECCSection = '';
//	var transRecord = nlapiLoadRecord('estimate', transactionID);	
	var entityID = nlapiGetFieldValue('entity');
	var entity = '';
	var custFilters = new Array();
	custFilters[0] = new nlobjSearchFilter('internalid', null, 'is', entityID);
	var custColumns = new Array();
	custColumns[0] = new nlobjSearchColumn('type');
	var custSearchresults = nlapiSearchRecord('entity', null, custFilters, custColumns);
	if (custSearchresults != null)
	{
		for ( var m = 0; custSearchresults != null && m < custSearchresults.length; m++ )
		{
			var custSearchresult = custSearchresults[ m ];		
			var entityType = custSearchresult.getText('type');
			nlapiLogExecution('DEBUG','entityType',entityType);
			
			if (entityType == 'Job')
			{			
				entity = nlapiLookupField('job',entityID,'customer');
			}
			else
			{
				entity = entityID;
			}
			
//			
//			try {
//			      var entityRecord = nlapiLoadRecord('customer', entityID);
//			    }
//			    catch (e) {
//			     if (e instanceof nlobjError ) {
//			      //entityRecord = nlapiLoadRecord('job', entityID);
//			      entity = nlapiLookupField('job',entityID,'customer');
//			     }
//			     else {
//			      //entityRecord = nlapiLoadRecord('customer', entityID);
//			    	 entity = entityID;
//			     }
//			    }

						
			custCategory = nlapiLookupField('customer', entity, 'category');
			nibeVIP = nlapiLookupField('customer', entity, 'custentity_nibe_vip');
			mcsStatus = nlapiLookupField('customer', entity, 'custentity_mcs_status');
			
				//if (custCategory == 'Self-builder')
				if (custCategory == 5)
				{
					mcsRECCSection = '<h2 class="acc_trigger breakhere"><a href="#14" onclick="ga(\'send\', \'event\', \'quote\', \'Click\', \'mcs-selfbuilder\');"><div class="P-Header">Access the RHI tariff payments </div></a></h2>\n' +
					'<div class="acc_container" style="display: block; overflow: hidden;">\n' +
					'<div class="block">\n' +
					'<p>Hoping to benefit from the Renewable Heat Incentive (RHI), the Government\'s scheme that helps to offset the cost of installing renewables technologies with tariff payments over a 7 year period?</p>\n' +
					'<p>Not only are all our products MCS approved for the scheme, we also offer installer support packages with on-site commissioning so that you can use your chosen installer and still successfully qualify for the RHI.</p>\n' +
					'<p>By choosing a support package you get complete peace of mind as Nu-Heat takes on responsibility for the installation.  And, as a member of the Renewable Energy Consumer Code, <a href="https://www.recc.org.uk/" target="_blank">RECC</a>, you also have peace of mind that Nu-Heat designs and supplies renewable systems that perform as expected.</p>\n' +
					'<p>If your chosen installer is not MCS Registered in their own right but you want to apply for the RHI payments, ask your Account Manager for more details on how we can support your renewables installation.</p>\n' +
					'<p>For further information on the RHI, <a href="http://www.nu-heat.co.uk/services/self-builders-renovators/rhi.html?utm_source=quote&utm_medium=email&utm_campaign=rhi" target="_blank">visit our website</a>.</p>\n' +
					'</div></div>\n'+

					//CJM Jan2017 New RECC details with T&Cs
					'<h2 class="acc_trigger breakhere"><a href="#15"><div class="P-Header">RECC - consumer protection you can trust</div></a></h2>\n' +
					'<div class="acc_container" style="display: block; overflow: hidden;">\n' +
					'<div class="block">\n' +
					'<p><img src="/core/media/media.nl?id=14228163&c=472052&h=ba07be73cd1c44f1f74b" width="200" alt="Renewable Energy Consumer Code" style="float: right; margin-left: 10px; margin-bottom: 10px; margin-top: 0px; margin-right: 0px; border: 0;">Nu-Heat is a member of the Renewable Energy Consumer Code, RECC.  This gives you reassurance that we will always provide:</p>\n' +
					'<p>&#10004;&nbsp;&nbsp;&nbsp;Realistic performance information and predications</p>\n' +
					'<p>&#10004;&nbsp;&nbsp;&nbsp;Accurate quotations</p>\n' +
					'<p>&#10004;&nbsp;&nbsp;&nbsp;Information on any warranties and grants</p>\n' +
					'<p>&#10004;&nbsp;&nbsp;&nbsp;Installation and commissioning instructions and maintenance and service options</p>\n' +
					'<p>&#10004;&nbsp;&nbsp;&nbsp;The right to cancel once you have placed your order. You will need to do this in writing and can use our <a href="http://files.nu-heat.co.uk/core/media/media.nl?id=10788023&c=472052&h=cef9fcec962057e7538b&_xt=.pdf" target="_blank">cancellation form</a>. For full details please see our <a href="http://files.nu-heat.co.uk/core/media/media.nl?id=102664&c=472052&h=82644df2d5439927e946&_xt=.pdf" target="_blank">terms and conditions</a>.</p>\n' +
					'<p>For more details, visit <a href="https://www.recc.org.uk/" target="_blank">RECC</a>.</p>\n' +
					'</div></div>\n';

					/* 
					'<h2 class="acc_trigger breakhere"><a href="#15"  onclick="ga(\'send\', \'event\', \'quote\', \'Click\', \'recc-selfbuilder\');"><div class="P-Header">RECC - consumer protection you can trust</div></a></h2>\n' +
					'<div class="acc_container" style="display: block; overflow: hidden;">\n' +
					'<div class="block">\n' +
					'<p><img src="/assets/img/recc-logo-quote.jpg" width="200" alt="Renewable Energy Consumer Code" style="float: right; margin-left: 10px; margin-bottom: 10px; margin-top: 0px; margin-right: 0px; border: 0;">Nu-Heat is a member of the Renewable Energy Consumer Code, RECC.  This gives customers reassurance that we will always provide:</p>\n' +
					'<p>&#10004;&nbsp;&nbsp;&nbsp;Realistic performance information and predications</p>\n' +
					'<p>&#10004;&nbsp;&nbsp;&nbsp;Accurate quotations</p>\n' +
					'<p>&#10004;&nbsp;&nbsp;&nbsp;Information on any warranties and grants</p>\n' +
					'<p>&#10004;&nbsp;&nbsp;&nbsp;Installation and commissioning instructions and maintenance and service options</p>\n' +
					'<p>For more details, visit <a href="https://www.recc.org.uk/" target="_blank">RECC</a>.</p>\n' +
					'</div></div>\n';
					*/
				}
				else if (nibeVIP == 'T')
				{
					mcsRECCSection = '<h2 class="acc_trigger breakhere"><a href="#14" onclick="ga(\'send\', \'event\', \'quote\', \'Click\', \'mcs-nibevip\');"><div class="P-Header">MCS support for NIBE VIPs &nbsp;&nbsp;&nbsp;<img src="/core/media/media.nl?id=14227099&c=472052&h=204d5d075e85a98c88a2" style="vertical-align: middle; margin-bottom: 3px; width: 35px; height: 35px;"></div></a></h2>\n' +
					'<div class="acc_container" style="display: block; overflow: hidden;">\n' +
					'<div class="block">\n' +
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
					'<h2 class="acc_trigger breakhere"><a href="#15"><div class="P-Header">RECC - consumer protection you can trust</div></a></h2>\n' +
					'<div class="acc_container" style="display: block; overflow: hidden;">\n' +
					'<div class="block">\n' +
					'<p><img src="/core/media/media.nl?id=14228163&c=472052&h=ba07be73cd1c44f1f74b" width="200" alt="Renewable Energy Consumer Code" style="float: right; margin-left: 10px; margin-bottom: 10px; margin-top: 0px; margin-right: 0px; border: 0;">Nu-Heat is a member of the Renewable Energy Consumer Code, RECC.  This gives you and your customer reassurance that we will always provide:</p>\n' +
					'<p>&#10004;&nbsp;&nbsp;&nbsp;Realistic performance information and predications</p>\n' +
					'<p>&#10004;&nbsp;&nbsp;&nbsp;Accurate quotations</p>\n' +
					'<p>&#10004;&nbsp;&nbsp;&nbsp;Information on any warranties and grants</p>\n' +
					'<p>&#10004;&nbsp;&nbsp;&nbsp;Installation and commissioning instructions and maintenance and service options</p>\n' +
					'<p>&#10004;&nbsp;&nbsp;&nbsp;The right to cancel once you have placed your order. You will need to do this in writing and can use our <a href="http://files.nu-heat.co.uk/core/media/media.nl?id=10788023&c=472052&h=cef9fcec962057e7538b&_xt=.pdf" target="_blank">cancellation form</a>. For full details please see our <a href="http://files.nu-heat.co.uk/core/media/media.nl?id=102664&c=472052&h=82644df2d5439927e946&_xt=.pdf" target="_blank">terms and conditions</a>.</p>\n' +
					'<p>For more details, visit <a href="https://www.recc.org.uk/" target="_blank">RECC</a>.</p>\n' +
					'</div></div>\n' ;
					
					/*
					'<h2 class="acc_trigger breakhere"><a href="#15" onclick="ga(\'send\', \'event\', \'quote\', \'Click\', \'recc-nibevip\');"><div class="P-Header">RECC - consumer protection you can trust</div></a></h2>\n' +
					'<div class="acc_container" style="display: block; overflow: hidden;">\n' +
					'<div class="block">\n' +
					'<p><img src="/assets/img/recc-logo-quote.jpg" width="200" alt="Renewable Energy Consumer Code" style="float: right; margin-left: 10px; margin-bottom: 10px; margin-top: 0px; margin-right: 0px; border: 0;">Nu-Heat is a member of the Renewable Energy Consumer Code, RECC.  This gives you and your customer reassurance that we will always provide:</p>\n' +
					'<p>&#10004;&nbsp;&nbsp;&nbsp;Realistic performance information and predications</p>\n' +
					'<p>&#10004;&nbsp;&nbsp;&nbsp;Accurate quotations</p>\n' +
					'<p>&#10004;&nbsp;&nbsp;&nbsp;Information on any warranties and grants</p>\n' +
					'<p>&#10004;&nbsp;&nbsp;&nbsp;Installation and commissioning instructions and maintenance and service options</p>\n' +
					'<p>For more details, visit <a href="https://www.recc.org.uk/" target="_blank">RECC</a>.</p>\n' +
					'</div></div>\n';
					*/ 
				}
				else if (mcsStatus == 'T')
				{
					mcsRECCSection = '<h2 class="acc_trigger breakhere"><a href="#14" onclick="ga(\'send\', \'event\', \'quote\', \'Click\', \'mcs-yes\');"><div class="P-Header">Let us deal with MCS paperwork &nbsp;&nbsp;&nbsp;<img src="/core/media/media.nl?id=14227099&c=472052&h=204d5d075e85a98c88a2" style="vertical-align: middle; margin-bottom: 3px; width: 35px; height: 35px;"></div></a></h2>\n' +
					'<div class="acc_container" style="display: block; overflow: hidden;">\n' +
					'<div class="block">\n' +
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
					'<h2 class="acc_trigger breakhere"><a href="#15"><div class="P-Header">RECC - consumer protection you can trust</div></a></h2>\n' +
					'<div class="acc_container" style="display: block; overflow: hidden;">\n' +
					'<div class="block">\n' +
					'<p><img src="/core/media/media.nl?id=14228163&c=472052&h=ba07be73cd1c44f1f74b" width="200" alt="Renewable Energy Consumer Code" style="float: right; margin-left: 10px; margin-bottom: 10px; margin-top: 0px; margin-right: 0px; border: 0;">Nu-Heat is a member of the Renewable Energy Consumer Code, RECC.  This gives you and your customer reassurance that we will always provide:</p>\n' +
					'<p>&#10004;&nbsp;&nbsp;&nbsp;Realistic performance information and predications</p>\n' +
					'<p>&#10004;&nbsp;&nbsp;&nbsp;Accurate quotations</p>\n' +
					'<p>&#10004;&nbsp;&nbsp;&nbsp;Information on any warranties and grants</p>\n' +
					'<p>&#10004;&nbsp;&nbsp;&nbsp;Installation and commissioning instructions and maintenance and service options</p>\n' +
					'<p>&#10004;&nbsp;&nbsp;&nbsp;The right to cancel once you have placed your order. You will need to do this in writing and can use our <a href="http://files.nu-heat.co.uk/core/media/media.nl?id=10788023&c=472052&h=cef9fcec962057e7538b&_xt=.pdf" target="_blank">cancellation form</a>. For full details please see our <a href="http://files.nu-heat.co.uk/core/media/media.nl?id=102664&c=472052&h=82644df2d5439927e946&_xt=.pdf" target="_blank">terms and conditions</a>.</p>\n' +
					'<p>For more details, visit <a href="https://www.recc.org.uk/" target="_blank">RECC</a>.</p>\n' +
					'</div></div>\n' ;
					
					/*
					'<h2 class="acc_trigger breakhere"><a href="#15" onclick="ga(\'send\', \'event\', \'quote\', \'Click\', \'reccmcs-yes\');"><div class="P-Header">RECC - consumer protection you can trust</div></a></h2>\n' +
					'<div class="acc_container" style="display: block; overflow: hidden;">\n' +
					'<div class="block">\n' +
					'<p><img src="/assets/img/recc-logo-quote.jpg" width="200" alt="Renewable Energy Consumer Code" style="float: right; margin-left: 10px; margin-bottom: 10px; margin-top: 0px; margin-right: 0px; border: 0;">Nu-Heat is a member of the Renewable Energy Consumer Code, RECC.  This gives you and your customer reassurance that we will always provide:</p>\n' +
					'<p>&#10004;&nbsp;&nbsp;&nbsp;Realistic performance information and predications</p>\n' +
					'<p>&#10004;&nbsp;&nbsp;&nbsp;Accurate quotations</p>\n' +
					'<p>&#10004;&nbsp;&nbsp;&nbsp;Information on any warranties and grants</p>\n' +
					'<p>&#10004;&nbsp;&nbsp;&nbsp;Installation and commissioning instructions and maintenance and service options</p>\n' +
					'<p>For more details, visit <a href="https://www.recc.org.uk/" target="_blank">RECC</a>.</p>\n' +
					'</div></div>\n';
					*/
				}
				else 
				{
					mcsRECCSection = '<h2 class="acc_trigger breakhere"><a href="#14" onclick="ga(\'send\', \'event\', \'quote\', \'Click\', \'mcs-no\');"><div class="P-Header">Help with MCS compliance&nbsp;&nbsp;&nbsp;<img src="/core/media/media.nl?id=14227099&c=472052&h=204d5d075e85a98c88a2" style="vertical-align: middle; margin-bottom: 3px; width: 35px; height: 35px;"></div></a></h2>\n' +
					'<div class="acc_container" style="display: block; overflow: hidden;">\n' +
					'<div class="block">\n' +
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
					'<h2 class="acc_trigger breakhere"><a href="#15"><div class="P-Header">RECC - consumer protection you can trust</div></a></h2>\n' +
					'<div class="acc_container" style="display: block; overflow: hidden;">\n' +
					'<div class="block">\n' +
					'<p><img src="/core/media/media.nl?id=14228163&c=472052&h=ba07be73cd1c44f1f74b" width="200" alt="Renewable Energy Consumer Code" style="float: right; margin-left: 10px; margin-bottom: 10px; margin-top: 0px; margin-right: 0px; border: 0;">Nu-Heat is a member of the Renewable Energy Consumer Code, RECC.  This gives you and your customer reassurance that we will always provide:</p>\n' +
					'<p>&#10004;&nbsp;&nbsp;&nbsp;Realistic performance information and predications</p>\n' +
					'<p>&#10004;&nbsp;&nbsp;&nbsp;Accurate quotations</p>\n' +
					'<p>&#10004;&nbsp;&nbsp;&nbsp;Information on any warranties and grants</p>\n' +
					'<p>&#10004;&nbsp;&nbsp;&nbsp;Installation and commissioning instructions and maintenance and service options</p>\n' +
					'<p>&#10004;&nbsp;&nbsp;&nbsp;The right to cancel once you have placed your order. You will need to do this in writing and can use our <a href="http://files.nu-heat.co.uk/core/media/media.nl?id=10788023&c=472052&h=cef9fcec962057e7538b&_xt=.pdf" target="_blank">cancellation form</a>. For full details please see our <a href="http://files.nu-heat.co.uk/core/media/media.nl?id=102664&c=472052&h=82644df2d5439927e946&_xt=.pdf" target="_blank">terms and conditions</a>.</p>\n' +
					'<p>For more details, visit <a href="https://www.recc.org.uk/" target="_blank">RECC</a>.</p>\n' +
					'</div></div>\n' ;
					
					/*
					'<h2 class="acc_trigger breakhere"><a href="#15" onclick="ga(\'send\', \'event\', \'quote\', \'Click\', \'reccmcs-no\');"><div class="P-Header">RECC - consumer protection you can trust</div></a></h2>\n' +
					'<div class="acc_container" style="display: block; overflow: hidden;">\n' +
					'<div class="block">\n' +
					'<p><img src="/assets/img/recc-logo-quote.jpg" width="200" alt="Renewable Energy Consumer Code" style="float: right; margin-left: 10px; margin-bottom: 10px; margin-top: 0px; margin-right: 0px; border: 0;">Nu-Heat is a member of the Renewable Energy Consumer Code, RECC.  This gives you and your customer reassurance that we will always provide:</p>\n' +
					'<p>&#10004;&nbsp;&nbsp;&nbsp;Realistic performance information and predications</p>\n' +
					'<p>&#10004;&nbsp;&nbsp;&nbsp;Accurate quotations</p>\n' +
					'<p>&#10004;&nbsp;&nbsp;&nbsp;Information on any warranties and grants</p>\n' +
					'<p>&#10004;&nbsp;&nbsp;&nbsp;Installation and commissioning instructions and maintenance and service options</p>\n' +
					'<p>For more details, visit <a href="https://www.recc.org.uk/" target="_blank">RECC</a>.</p>\n' +
					'</div></div>\n';
					*/
				}
				
			
		}
	}
	return mcsRECCSection;
}

function hpSolarTab()
{
	var solarText = '<h2 class="acc_trigger breakhere"><a href="#17"  onclick="ga(\'send\', \'event\', \'quote\', \'Click\', \'solar-upgrade\');"><div class="P-Header">Solar Thermal Hot Water <strong><i>Upgrade</i></strong>\n' +
	'&nbsp;&nbsp;&nbsp;<img src="/core/media/media.nl?id=14229575&c=472052&h=4cbe7a91f7accb8be6e4" style="vertical-align: middle; margin-bottom: 3px; width: 35px; height: 35px;"></div></a></h2>\n' +
	'<div class="acc_container" style="display: block; overflow: hidden;">\n' +
	'<div class="block" style="background-color: #ffffff;">\n' +
	'<div style="float: right; margin-left: 10px;"><img src="/core/media/media.nl?id=14229576&c=472052&h=f45229256f977bfbc6be" style="background: none; border: 0px; margin: 0; padding: 0;"></div>\n' +
	'<p>Capture free solar energy and use it to heat domestic hot water with Nu-Heat\'s EnergyPro&reg; solar thermal panels.</p>\n' +
	'<ul><li>Produces up to 60% of annual hot water demand, up to 100% in the summer months</li>\n' +
	'<li>Quick and easy to install</li>\n' +
	'<li>MCS approved</li>\n' +
	'<li>Eligible for RHI grant - up to &pound;1,795 over 7 years</li></ul>\n' +	/* CJM 2017-5-2 old:1,540 */
	'<p>2 panel Solar Thermal In Roof systems start from &pound;1,900 +VAT. Speak to your Account Manager for a quotation.</p>\n' +
	'<p>&nbsp;</p>\n' +
	'<div style="clear:both;"></div>\n' +
	'<div style="float: right; margin-left: 10px;"><img src="/core/media/media.nl?id=14229679&c=472052&h=2530a0c07d716d8cca56" style="background: none; border: 0px; margin: 0; padding: 0;"></div>\n' +								//CJM Oct2017 SUP350586 start
    '<p><strong>Considering solar in the future?</strong></p>\n' +
	'<p>Future proof your home with an EnergyPro&reg; cylinder, featuring a second coil which is ready to be linked to a solar collector system.</p>\n' +
	'<ul><li>25 year warranty</li>\n' +
	'<li>Lightweight all-stainless-steel construction</li>\n' +
	'<li>Supplied complete with connection fittings and G3 equipment</li>\n' +
	'<li>Connection positions at front of the unit for simple installation, easy access and minimal space requirements</li>\n' +
    '<li>Starting from &pound;939+VAT</li></ul>\n' +
	'<p>&nbsp;</p>\n' +																																//CJM Oct2017 SUP350586 end
	
	'</div></div>\n';
	
	return solarText;
}

function notesHTML(transactionID)
{   
	
	//	var transRecord = nlapiLoadRecord('estimate', transactionID);	
	var estimatorNotes = nlapiGetFieldValue('custbody_fm_estimator_notes');
	var salesEmail = nlapiGetFieldValue('custbody_sales_rep_email');
	var salesPhone = nlapiGetFieldValue('custbody_sales_rep_phone');
	if (estimatorNotes){
		estimatorNotes = notesReplace(estimatorNotes);}
	var htmlNotes = '';
	var mcsNotes = '';
	var customerID = nlapiGetFieldValue('entity');
	var customer = nlapiLoadRecord('customer', customerID);
	var selfBuilder = customer.getFieldValue('category');
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
	var quoteType = nlapiGetFieldValue('custbody_quote_type');
	var Schematic = nlapiGetFieldValue('custbody_schematic');
	var schematicType = Schematic.indexOf("-S");
	
	
	nlapiLogExecution('DEBUG', 'MCS Notes: quoteType=' +quoteType+ ', Schematic=' +Schematic+ ', schematicType=' +schematicType);
	
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
		
			/*mcsNotes = '<h2 class="acc_trigger breakhere"><a href="#8" onclick="ga(\'send\', \'event\', \'quote\', \'Click\', \'notes\');"><div class="P-Header">Notes</div></a></h2>\n' +
			'<div class="acc_container">\n' +
				'<div class="block">\n' +mcsText+ '</div></div>\n' ;
			
			htmlNotes = mcsNotes;
			nlapiLogExecution('DEBUG', 'htmlNotes: quoteType=', htmlNotes);*/
		}
	if (estimatorNotes != null && estimatorNotes != '')
		{
			if (mcsText != '')
				{
				// Estimator and MCS Notes
				//estimatorNotes = estimatorNotes.replace('<h4>For Information</h4>','<h4>For Information</h4><p align="left">'+mcsText+'</p>');
				estimatorNotes = estimatorNotes.replace('<h4>For Information</h4>','<h4>For Information</h4><br><br>'+mcsText);
				htmlNotes = '<h2 class="acc_trigger breakhere"><a href="#8" onclick="ga(\'send\', \'event\', \'quote\', \'Click\', \'notes\');"><div class="P-Header">Notes</div></a></h2>\n' +
				'<div class="acc_container">\n' +
				'<div class="block">\n' +
						'<p align="left">The notes below are important information for you to understand in relation to this system. If you have any questions please feel free to contact me on <a href ="mailto:'+salesEmail+'">'+salesEmail+'</a> or '+salesPhone+' for further information.</p>\n' +
						//'<p align="left">'+mcsText+'</p>\n' +
						'<p align="left">'+estimatorNotes+'</p>\n' + GDPRText +
						'</div></div>\n' ;
				}
			else
				{
				// Estimator Notes only
				htmlNotes = '<h2 class="acc_trigger breakhere"><a href="#8" onclick="ga(\'send\', \'event\', \'quote\', \'Click\', \'notes\');"><div class="P-Header">Notes</div></a></h2>\n' +
				'<div class="acc_container">\n' +
				'<div class="block">\n' +
						'<p align="left">The notes below are important information for you to understand in relation to this system. If you have any questions please feel free to contact me on <a href ="mailto:'+salesEmail+'">'+salesEmail+'</a> or '+salesPhone+' for further information.</p>\n' +
						'<p align="left">'+estimatorNotes+'</p>\n' + GDPRText +
						'</div></div>\n' ;
				}
		}
	else if (mcsText != '')
		{
		// MCS Notes only
		htmlNotes = '<h2 class="acc_trigger breakhere"><a href="#8" onclick="ga(\'send\', \'event\', \'quote\', \'Click\', \'notes\');"><div class="P-Header">Notes</div></a></h2>\n' +
		'<div class="acc_container">\n' +
		'<div class="block">\n' +
				'<p align="left">The notes below are important information for you to understand in relation to this system. If you have any questions please feel free to contact me on <a href ="mailto:'+salesEmail+'">'+salesEmail+'</a> or '+salesPhone+' for further information.</p>\n' +
				'<h4>For Information</h4><p align="left">'+mcsText+'</p>\n' + GDPRText +
		'</div></div>\n' ;
		}
		
	/*	
	// CJM DEC2017........Ends

	//nlapiLogExecution('DEBUG', 'Estimator Notes',estimatorNotes);
	if (estimatorNotes != null && estimatorNotes != '')
		{/*
		if (htmlNotes == null || htmlNotes == '')
			{
			nlapiLogExecution('DEBUG', 'No MCS Note: quoteType=' +quoteType+ ', Schematic=' +Schematic+ ', schematicType=' +schematicType);
			htmlNotes = '<h2 class="acc_trigger breakhere"><a href="#8" onclick="ga(\'send\', \'event\', \'quote\', \'Click\', \'notes\');"><div class="P-Header">Notes</div></a></h2>\n' +
			'<div class="acc_container">\n' +
				'<div class="block">\n' +
					//CJM May2016 start
					'<p align="left">The notes below are important information for you to understand in relation to this system. If you have any questions please feel free to contact me on <a href ="mailto:'+salesEmail+'">'+salesEmail+'</a> or '+salesPhone+' for further information.</p>\n' +
					//CJM '<p align="left">These notes are intended to make you aware of important information and/or points that you need to check relating to this system quote.<br><br>To discuss anything in the notes below you can contact me by email on  <a href ="mailto:'+salesEmail+'">'+salesEmail+'</a> or '+salesPhone+' .</p>\n' +
					//CJM May2016 ends
					'<p align="left">'+estimatorNotes+'</p>\n' +
					//'<div class="printlogo">'+printNotes+'</div>\n';
			'</div></div>\n' ;
			}
		else
			{
			nlapiLogExecution('DEBUG', 'MCS Note exists:' , htmlNotes);
			
			//htmlNotes = mcsNotes +'<h2 class="acc_trigger breakhere"><a href="#8" onclick="ga(\'send\', \'event\', \'quote\', \'Click\', \'notes\');"><div class="P-Header">Notes</div></a></h2>\n' +
			
			htmlNotes = '<h2 class="acc_trigger breakhere"><a href="#8" onclick="ga(\'send\', \'event\', \'quote\', \'Click\', \'notes\');"><div class="P-Header">Notes</div></a></h2>\n' +
			'<div class="acc_container">\n' +
			'<div class="block">\n' +
					'<p align="left">The notes below are important information for you to understand in relation to this system. If you have any questions please feel free to contact me on <a href ="mailto:'+salesEmail+'">'+salesEmail+'</a> or '+salesPhone+' for further information.</p>\n' +
					'<p align="left">'+mcsText+'</p>\n' +
					'<p align="left">'+estimatorNotes+'</p>\n' +
			'</div></div>\n' ;
			}
		}
//	else {htmlNotes = '<div class="printlogo"><h2 class="NotesHeader">Notes</h2>\n'+printNotes+'</div>';}
	*/
	
	return htmlNotes;
}

function notesReplace(str)
{
	var newStr = str.replace('warranty for this heat pump please click here','warranty for this heat pump please click <A HREF="/core/media/media.nl?id=5021943&c=472052&h=66a350c69afba88ec2ac&_xt=.pdf">here</A>');
		newStr = newStr.replace('\(EnergyPro Cylinder sizing document\)','<A HREF="/core/media/media.nl?id=3027873&c=472052&h=d80272f5978592232a29&_xt=.pdf">EnergyPro Cylinder sizing document</A>');	//CJM June 2016
		newStr = newStr.replace('\(Heat Pump brochure\)','<A HREF="/core/media/media.nl?id=8073401&c=472052&h=34d237f974b8d6641ca0&_xt=.pdf">Heat Pump brochure</A>');	//CJM June 2016
		
	return newStr;
}

function warrantyNotes()
{
	var printNotes = '<div class="printlogo"><h2 class="acc_trigger breakhere"><a href="#13" onclick="ga(\'send\', \'event\', \'quote\', \'Click\', \'notes\');"><div class="P-Header">Notes</div></a></h2>\n' +
	'<div class="acc_container">\n' +
	'<div class="block">\n' +
	'<table width="789" border="0" cellpadding="8" cellspacing="0">\n' +
	  '<tr>\n' +
	    '<td width="352" valign="top"><p class="NotesSub"><strong>Design</strong></p><p>\n' +
	     'On confirming your order, Nu-Heat will complete a detailed design process resulting in detailed CAD layouts, \n' +
	      'manifold locations and wiring diagrams. An example of our award-winning manuals can be found on our website \n' +
	      'at www.nu-heat.co.uk.</p>\n' +
	      '<p class="NotesSub">\n' +
	        '<strong>Heat Source</strong></p><p>Underfloor heating can be used in conjunction with a \n' +
	        'number of different heat sources: gas or oil boilers, LPG or heat pump technology. Nu-Heat supplies high quality \n' +
	        'heat pumps from NIBE and is happy to work with alternative suppliers.</p>\n' +
	      '<p class="NotesSub">\n' +
	        '<strong>Components excluded</strong></p><p>It is Nu-Heat&#39;s policy to only supply complete, fully \n' +
	        'designed systems with all components selected and matched in an overall design to ensure compatibility. You \n' +
	        'need only supply pipework to the Optiflo manifolds, plus electrical wiring components. Please see the floor \n' +
	        'construction sections of this quotation for floor insulation requirements, and the items included within this quotation.\n' +
	        'The components supplied meet all relevant UK and European standards.</p></td>\n' +
	    '<td width="40" valign="top">&nbsp;</td>\n' +
	    '<td width="349" valign="top"><p class="NotesSub"><strong>Room thermostats</strong></p><p>\n' +
	    	'Nu-Heat provides room thermostat options to meet your customer requirements. \n' +
	    	'These are detailed in the Options Brochure included with this quotation or available online. \n' +
	    	'Separate control is provided in every main room of the building.</p>\n' +
	      '<p class="NotesSub"><strong>\n' +
	        'Floor constructions</strong></p><p>Fastflo&reg; floor heating tube in renowned for its flexibility,  \n' +
	    	'the benefits of which include saving on installation time and improved comfort due to closer spacing.  \n' +
	    	'Closer spacing provides an even spread of warmth across the floor and rapid response times because the  \n' +
	    	'warm water has less distance to travel through the shorter tube lengths. Nu-Heat has over sixty floor construction options,  \n' +
	    	'therefore should the one specified not meet your project requirements please contact your Nu-Heat Account Manager to discuss alternatives. \n' +
	    	'Note: Please inform us at design stage if a hardwood floor finish has been specified, as a floor-temperature  \n' +
	    	'sensing thermostat may be required to prevent overheating - this is a no-cost option.</p>\n' +
	      '<p class="NotesSub">\n' +
	        '<strong>Insurances/Warranties</strong></p><p>\n' +
	        'Professional Indemnity, Products Liability,<br>\n' +
	        'Public Liability - &pound;5m<br>\n' +
	        'Fastflo&reg; floor heating tube - 10 years<br>\n' +
	        'EnergyPro&reg; cylinders - 25 years<br>\n' +
	        'EnergyMaster&reg; cylinders - 25 years</p></td>\n' +
	  '</tr>\n' +
	  '<tr>\n' +
	    '<td>&nbsp;</td>\n' +
	    '<td>&nbsp;</td>\n' +
	    '<td>&nbsp;</td>\n' +
	  '</tr>\n' +
	'</table>\n' +
	'</div></div></div>\n' ;
	
	return printNotes;
}

function installGuidePrice(transactionID)
{   
//	var transRecord = nlapiLoadRecord('estimate', transactionID);	
	var guidePrice = fixedTwoDP(nlapiGetFieldValue('custbody_inst_estimate'));
	var screedingHours = fixedTwoDP(nlapiGetFieldValue('custbody_screeding_hours'));
	var installGuide;
	var operationList = '';
	var loPro = 'F';
	var loProMax = 'F';
	var otherFloorCon = 'F';
	var floorCons = ''; 
	var roomCount = nlapiGetLineItemCount('recmachcustrecord_cad_rooms_quote');
	for (var i=1; i <= roomCount; i++)
	{
		var floorConst = nlapiGetLineItemText('recmachcustrecord_cad_rooms_quote', 'custrecord_cad_floor_construction', i);
		if (lu_floor_cons_type[floorConst] == 'LoPro Floors')
		{
			loPro = 'T';
		}
		else if (lu_floor_cons_type[floorConst] == 'LoProMax Floors')
		{
			loProMax = 'T';
		}
		else
		{
			otherFloorCon = 'T';
		}	
	}   
	
	if (loProMax == 'T')
	{
		floorCons = 'LoPro&reg;Max'; 
		operationList = '<tr style="background-color: #fff;">\n' +
		        '<td align="left" valign="top" style="font-size:12px; padding:4px;">Prepare/repair floors where necessary prior to installing the LoPro&reg;Max UFH system. Floors outside Nu-Heat\'s tolerance levels will require levelling prior to the UFH system being installed.</td>\n' + //Operation
		        '<td align="center" style="font-size:20px; background-color: #ededed;"></td>\n' + //RI
		        '<td align="center" style="font-size:20px;">&#10003;</td>\n' + //Builder
		        '<td align="center" style="font-size:20px;"></td>\n' + //Heating Contractor
		        '<td align="center" style="font-size:20px;"></td>\n' + //Electrical Contractor
		        '<td align="center" style="font-size:20px;">&#10003;</td>\n' + //RI Optional
		'</tr>\n'+
		'<tr style="background-color: #ccc;" height="1">\n'+
		'<td colspan="6" style="padding-top: 0px; padding-bottom: 0px; padding-left: 0px; padding-right: 0px;"></td>\n'+
		'</tr>\n'+
		'<tr style="background-color: #fff;">\n' +
		        '<td align="left" valign="top" style="font-size:12px; padding:4px;">Where specified, lay 10mm acoustic wood fibreboard for 1st floors & attic rooms</td>\n' + //Operation
		        '<td align="center" style="font-size:20px; background-color: #ededed;">&#10003;</td>\n' + //RI
		        '<td align="center" style="font-size:20px;"></td>\n' + //Builder
		        '<td align="center" style="font-size:20px;"></td>\n' + //Heating Contractor
		        '<td align="center" style="font-size:20px;"></td>\n' + //Electrical Contractor
		        '<td align="center" style="font-size:20px;"></td>\n' + //RI Optional
		'</tr>\n'+
		'<tr style="background-color: #ccc;" height="1">\n'+
		'<td colspan="6" style="padding-top: 0px; padding-bottom: 0px; padding-left: 0px; padding-right: 0px;"></td>\n'+
		'</tr>\n'+
		'<tr style="background-color: #fff;">\n' +
		        '<td align="left" valign="top" style="font-size:12px; padding:4px;">Install room thermostats, wiring centre and all associated electrical wiring (1<sup>st</sup> & 2<sup>nd</sup> fix)</td>\n' + //Operation
		        '<td align="center" style="font-size:20px; background-color: #ededed;"></td>\n' + //RI
		        '<td align="center" style="font-size:20px;"></td>\n' + //Builder
		        '<td align="center" style="font-size:20px;"></td>\n' + //Heating Contractor
		        '<td align="center" style="font-size:20px;">&#10003;</td>\n' + //Electrical Contractor
		        '<td align="center" style="font-size:20px;"></td>\n' + //RI Optional
		'</tr>\n'+
		'<tr style="background-color: #ccc;" height="1">\n'+
		'<td colspan="6" style="padding-top: 0px; padding-bottom: 0px; padding-left: 0px; padding-right: 0px;"></td>\n'+
		'</tr>\n'+
		'<tr style="background-color: #fff;">\n' +
		        '<td align="left" valign="top" style="font-size:12px; padding:4px;">Install cylinder and the flow & return pipework between cylinder or boiler and Optiflo manifold(s) 1<sup>st</sup> & 2<sup>nd</sup> fix</td>\n' + //Operation
		        '<td align="center" style="font-size:20px; background-color: #ededed;"></td>\n' + //RI
		        '<td align="center" style="font-size:20px;"></td>\n' + //Builder
		        '<td align="center" style="font-size:20px;">&#10003;</td>\n' + //Heating Contractor
		        '<td align="center" style="font-size:20px;"></td>\n' + //Electrical Contractor
		        '<td align="center" style="font-size:20px;">&#10003;</td>\n' + //RI Optional
		'</tr>\n'+
		'<tr style="background-color: #ccc;" height="1">\n'+
		'<td colspan="6" style="padding-top: 0px; padding-bottom: 0px; padding-left: 0px; padding-right: 0px;"></td>\n'+
		'</tr>\n'+
		'<tr style="background-color: #fff;">\n' +
		        '<td align="left" valign="top" style="font-size:12px; padding:4px;">Install Nu-Heat Optiflo manifold with remote or direct pump module</td>\n' + //Operation
		        '<td align="center" style="font-size:20px; background-color: #ededed;">&#10003;</td>\n' + //RI
		        '<td align="center" style="font-size:20px;"></td>\n' + //Builder
		        '<td align="center" style="font-size:20px;"></td>\n' + //Heating Contractor
		        '<td align="center" style="font-size:20px;"></td>\n' + //Electrical Contractor
		        '<td align="center" style="font-size:20px;"></td>\n' + //RI Optional
		'</tr>\n'+
		'<tr style="background-color: #ccc;" height="1">\n'+
		'<td colspan="6" style="padding-top: 0px; padding-bottom: 0px; padding-left: 0px; padding-right: 0px;"></td>\n'+
		'</tr>\n'+
		'<tr style="background-color: #fff;">\n' +
		        '<td align="left" valign="top" style="font-size:12px; padding:4px;">Install LoPro&reg;Max edge expansion strip and castellated panel </td>\n' + //Operation
		        '<td align="center" style="font-size:20px; background-color: #ededed;">&#10003;</td>\n' + //RI
		        '<td align="center" style="font-size:20px;"></td>\n' + //Builder
		        '<td align="center" style="font-size:20px;"></td>\n' + //Heating Contractor
		        '<td align="center" style="font-size:20px;"></td>\n' + //Electrical Contractor
		        '<td align="center" style="font-size:20px;"></td>\n' + //RI Optional
		'</tr>\n'+
		'<tr style="background-color: #ccc;" height="1">\n'+
		'<td colspan="6" style="padding-top: 0px; padding-bottom: 0px; padding-left: 0px; padding-right: 0px;"></td>\n'+
		'</tr>\n'+
		'<tr style="background-color: #fff;">\n' +
		        '<td align="left" valign="top" style="font-size:12px; padding:4px;">Install  floor temp sensors & 10mm Fastflo&reg; UFH tube then fill, flush and pressure test (Note: this can be done on a room-by-room basis)</td>\n' + //Operation
		        '<td align="center" style="font-size:20px; background-color: #ededed;">&#10003;</td>\n' + //RI
		        '<td align="center" style="font-size:20px;"></td>\n' + //Builder
		        '<td align="center" style="font-size:20px;"></td>\n' + //Heating Contractor
		        '<td align="center" style="font-size:20px;"></td>\n' + //Electrical Contractor
		        '<td align="center" style="font-size:20px;"></td>\n' + //RI Optional
		'</tr>\n'+
		'<tr style="background-color: #ccc;" height="1">\n'+
		'<td colspan="6" style="padding-top: 0px; padding-bottom: 0px; padding-left: 0px; padding-right: 0px;"></td>\n'+
		'</tr>\n'+
		'<tr style="background-color: #fff;">\n' +
		        '<td align="left" valign="top" style="font-size:12px; padding:4px;">Installation of LoPro&reg;QuickSet self-levelling compound *see below</td>\n' + //Operation
		        '<td align="center" style="font-size:20px; background-color: #ededed;"></td>\n' + //RI
		        '<td align="center" style="font-size:20px;">&#10003;</td>\n' + //Builder
		        '<td align="center" style="font-size:20px;"></td>\n' + //Heating Contractor
		        '<td align="center" style="font-size:20px;"></td>\n' + //Electrical Contractor
		        '<td align="center" style="font-size:20px;">&#10003;</td>\n' + //RI Optional
		'</tr>\n'+
		'<tr style="background-color: #ccc;" height="1">\n'+
		'<td colspan="6" style="padding-top: 0px; padding-bottom: 0px; padding-left: 0px; padding-right: 0px;"></td>\n'+
		'</tr>\n'+
		'<tr style="background-color: #fff;">\n' +
		        '<td align="left" valign="top" style="font-size:12px; padding:4px;">Install and commission boiler/heat source</td>\n' + //Operation
		        '<td align="center" style="font-size:20px; background-color: #ededed;"></td>\n' + //RI
		        '<td align="center" style="font-size:20px;"></td>\n' + //Builder
		        '<td align="center" style="font-size:20px;">&#10003;</td>\n' + //Heating Contractor
		        '<td align="center" style="font-size:20px;"></td>\n' + //Electrical Contractor
		        '<td align="center" style="font-size:20px;">&#10003;</td>\n' + //RI Optional
		'</tr>\n'+
		'<tr style="background-color: #ccc;" height="1">\n'+
		'<td colspan="6" style="padding-top: 0px; padding-bottom: 0px; padding-left: 0px; padding-right: 0px;"></td>\n'+
		'</tr>\n'+
		'<tr style="background-color: #fff;">\n' +
		        '<td align="left" valign="top" style="font-size:12px; padding:4px;">Install domestic services 1st &amp; 2nd fix</td>\n' + //Operation
		        '<td align="center" style="font-size:20px; background-color: #ededed;"></td>\n' + //RI
		        '<td align="center" style="font-size:20px;"></td>\n' + //Builder
		        '<td align="center" style="font-size:20px;">&#10003;</td>\n' + //Heating Contractor
		        '<td align="center" style="font-size:20px;"></td>\n' + //Electrical Contractor
		        '<td align="center" style="font-size:20px;">&#10003;</td>\n' + //RI Optional
		'</tr>\n'+
		'<tr style="background-color: #ccc;" height="1">\n'+
		'<td colspan="6" style="padding-top: 0px; padding-bottom: 0px; padding-left: 0px; padding-right: 0px;"></td>\n'+
		'</tr>\n'+
		'<tr style="background-color: #fff;">\n' +
		        '<td align="left" valign="top" style="font-size:12px; padding:4px;">Commission floor heating &amp; provide customer handover of operational instructions, User Guide, etc.</td>\n' + //Operation
		        '<td align="center" style="font-size:20px; background-color: #ededed;">&#10003;</td>\n' + //RI
		        '<td align="center" style="font-size:20px;"></td>\n' + //Builder
		        '<td align="center" style="font-size:20px;"></td>\n' + //Heating Contractor
		        '<td align="center" style="font-size:20px;"></td>\n' + //Electrical Contractor
		        '<td align="center" style="font-size:20px;"></td>\n' + //RI Optional
//		'</tr>\n'+ 
//		'<tr>\n' +
//		'<td colspan="6" style="padding:4px; font-size:12px;" ><br><b>Note:</b><br>Guide Prices are provided for information only. This is not a quotation for installation by Nu-Heat. Variations in regional labour rates and travelling times are not included. If required we can provide details of a Nu-Heat Registered Installer in your area who will provide a firm installation quotation.<br>\n'+
//		'The Guide Price for installing the LoPro&reg;Max underfloor heating components listed in your quotation are highlighted in the shaded column above. These aspects of the installation can be carried out either by a Nu-Heat Registered Installer, entirely by your own nominated heating engineer or by a combination of both, depending on preference.\n'+
//		'For areas over 60m&sup2;, it may be more economical to obtain a price for laying the self-levelling compound directly from one of Nu-Heat\'s national screeding contractors. Please contact Nu-Heat for details of contractors in your area.<br><br>\n'+
//		'<b>Guide time to lay LoPro&reg;Max QuickSet self levelling compound:</b><br>\n'+
//		'The guideline time is based on the LoPro&reg;Max QuickSet self levelling compound being mixed by hand with either an electric paddle drill or forced action mixer then poured and laid to each room.<br><br>\n'+
//		'<b>Screeding Total Hours </b>   '+screedingHours+'<br><br>\n'+
//		'Please note for large floor areas typically over 60m&sup;2 it may be more economical to obtain a estimate from one of Nu-Heat\'s national screeding contractors who will provide you with a fixed price for laying the LoPro&reg;Max QuickSet self levelling compound. Please contact your Account Manager for the screeding contractor details in your area.</td>\n' +
//		'</tr>\n'+
//		'<tr>\n' +
//		    '<td colspan="6" style="padding:4px; font-size:12px;" ><br>The guide price is based on LoPro&reg;QuickSet self-levelling compound being mixed by hand with an electric drill and paddle-whisk then poured manually in each room/floor area that contains LoPro&reg;Max UFH. Cost is based on a labour charge of &pound;25 per hour and 10 minutes per m&sup2;.\n'+
//		    'For areas over 60m&sup2;, it may be more economical to obtain a price for laying the self-levelling compound directly from one of Nu-Heat\'s national screeding contractors. Please contact Nu-Heat for details of contractors in your area.</td>\n' +
		'</tr>\n'+
		'<tr style="background-color: #ccc;" height="1">\n'+
		'<td colspan="6" style="padding-top: 0px; padding-bottom: 0px; padding-left: 0px; padding-right: 0px;"></td>\n'+
		'</tr>\n'+
   	'</tbody></table>\n' +
	'<p><br><span style="font-size:20px;"><strong>Installation Estimate (excl. VAT): &pound;'+guidePrice+'</strong></span></p>\n' +
	'<p><br><strong>Note:</strong><br>This guide price shown above is based on completion of activities indicated in the shaded column. These aspects of installation can be carried out either by a Nu-Heat Registered Installer or by another chosen heating engineer. Variations in regional labour rates and travelling times are not included. The price does not take into account laying QuickSet self-levelling compound.  Please note this is not a quotation for installation by Nu-Heat.</p>\n' +
	'<h5><br>Guide time to lay LoPro&reg;Max QuickSet self-levelling compound</h5>\n' +
	'<p><strong>Screeding Total Hours</strong> '+screedingHours+'</p>\n' +
	'<p>The guideline time is based on the LoPro&reg;Max QuickSet self-levelling compound being mixed by hand with either an electric paddle drill or forced action mixer then poured and laid to each room.</p>\n' +
	//CJM Screed tab removed'<p>Please note for large floor areas typically over 60m<sup>2</sup> it may be more economical to obtain a estimate from one of Nu-Heat\'s national screeding contractors who will provide you with a fixed price for laying the LoPro&reg;Max QuickSet self levelling compound. Please view the Screeding Contractors Information tab on this quote for more information.</p>\n';
	'<p>Please note for large floor areas typically over 60m<sup>2</sup> it may be more economical to obtain a estimate from one of Nu-Heat\'s national screeding contractors who will provide you with a fixed price for laying the LoPro&reg;Max QuickSet self levelling compound. For details please contact your Account Manager.</p>\n';
	
	}
	
	else if (loPro == 'T')
	{
		floorCons = 'LoPro&reg;10';
		operationList = '<tr style="border-top:#F0F0F0;">\n' +
			'<td align="left" valign="top" style="font-size:12px; padding:4px;">Prepare floor and level using appropriate primer and self-levelling compound as necessary</td>\n' + //Operation
			'<td align="center" valign="top" style="font-size:12px;"></td>\n' + //RI
			'<td align="center" valign="top" style="font-size:12px;">&#10003;</td>\n' + //Builder
			'<td align="center" valign="top" style="font-size:12px;"></td>\n' + //Heating Contractor
			'<td align="center" valign="top" style="font-size:12px;"></td>\n' + //Electrical Contractor
			'<td align="center" valign="top" style="font-size:12px;"></td>\n' + //RI Optional
		'</tr>\n'+
		'<tr style="border-top:#F0F0F0;">\n' +
			'<td align="left" valign="top" style="font-size:12px; padding:4px;" bgcolor="#FFFFFF">Where specified, lay LoPro acoustic wood fibre board/ LoPro AcousticPE foam underlay</td>\n' + //Operation
			'<td align="center" valign="top" style="font-size:12px;" bgcolor="#FFFFFF"></td>\n' + //RI
			'<td align="center" valign="top" style="font-size:12px;" bgcolor="#FFFFFF">&#10003;</td>\n' + //Builder
			'<td align="center" valign="top" style="font-size:12px;" bgcolor="#FFFFFF"></td>\n' + //Heating Contractor
			'<td align="center" valign="top" style="font-size:12px;" bgcolor="#FFFFFF"></td>\n' + //Electrical Contractor
			'<td align="center" valign="top" style="font-size:12px;" bgcolor="#FFFFFF">&#10003;</td>\n' + //RI Optional
		'</tr>\n'+
		'<tr style="border-top:#F0F0F0;">\n' +
			'<td align="left" valign="top" style="font-size:12px; padding:4px;">Install room thermostats and wiring centre for UFH manifolds, 1st and 2nd fix wiring</td>\n' + //Operation
			'<td align="center" valign="top" style="font-size:12px;"></td>\n' + //RI
			'<td align="center" valign="top" style="font-size:12px;"></td>\n' + //Builder
			'<td align="center" valign="top" style="font-size:12px;"></td>\n' + //Heating Contractor
			'<td align="center" valign="top" style="font-size:12px;">&#10003;</td>\n' + //Electrical Contractor
			'<td align="center" valign="top" style="font-size:12px;"></td>\n' + //RI Optional
		'</tr>\n'+
		'<tr style="border-top:#F0F0F0;">\n' +
			'<td align="left" valign="top" style="font-size:12px; padding:4px;" bgcolor="#FFFFFF">Install 1st fix flow and return heating pipework to UFH manifold positions and fix UFH manifold</td>\n' + //Operation
			'<td align="center" valign="top" style="font-size:12px;" bgcolor="#FFFFFF"></td>\n' + //RI
			'<td align="center" valign="top" style="font-size:12px;" bgcolor="#FFFFFF"></td>\n' + //Builder
			'<td align="center" valign="top" style="font-size:12px;" bgcolor="#FFFFFF">&#10003;</td>\n' + //Heating Contractor
			'<td align="center" valign="top" style="font-size:12px;" bgcolor="#FFFFFF"></td>\n' + //Electrical Contractor
			'<td align="center" valign="top" style="font-size:12px;" bgcolor="#FFFFFF">&#10003;</td>\n' + //RI Optional
		'</tr>\n'+
		'<tr style="border-top:#F0F0F0;">\n' +
			'<td align="left" valign="top" style="font-size:12px; padding:4px;">Install LoPro10&reg; panel and castellated pipe tray to all areas specified on CAD drawings</td>\n' + //Operation
			'<td align="center" valign="top" style="font-size:12px;">&#10003;</td>\n' + //RI
			'<td align="center" valign="top" style="font-size:12px;"></td>\n' + //Builder
			'<td align="center" valign="top" style="font-size:12px;"></td>\n' + //Heating Contractor
			'<td align="center" valign="top" style="font-size:12px;"></td>\n' + //Electrical Contractor
			'<td align="center" valign="top" style="font-size:12px;"></td>\n' + //RI Optional
		'</tr>\n'+
		'<tr style="border-top:#F0F0F0;">\n' +
			'<td align="left" valign="top" style="font-size:12px; padding:4px;" bgcolor="#FFFFFF">Install Fastflo&reg; UFH pipe to all rooms and pressure test</td>\n' + //Operation
			'<td align="center" valign="top" style="font-size:12px;" bgcolor="#FFFFFF">&#10003;</td>\n' + //RI
			'<td align="center" valign="top" style="font-size:12px;" bgcolor="#FFFFFF"></td>\n' + //Builder
			'<td align="center" valign="top" style="font-size:12px;" bgcolor="#FFFFFF"></td>\n' + //Heating Contractor
			'<td align="center" valign="top" style="font-size:12px;" bgcolor="#FFFFFF"></td>\n' + //Electrical Contractor
			'<td align="center" valign="top" style="font-size:12px;" bgcolor="#FFFFFF"></td>\n' + //RI Optional
		'</tr>\n'+
		 '<tr style="border-top:#F0F0F0;">\n' +
			'<td align="left" valign="top" style="font-size:12px; padding:4px;">Lay LoPro QuickSet self-levelling compound in all areas where castellated pipe tray is present</td>\n' + //Operation
			'<td align="center" valign="top" style="font-size:12px;">&#10003;</td>\n' + //RI
			'<td align="center" valign="top" style="font-size:12px;"></td>\n' + //Builder
			'<td align="center" valign="top" style="font-size:12px;"></td>\n' + //Heating Contractor
			'<td align="center" valign="top" style="font-size:12px;"></td>\n' + //Electrical Contractor
			'<td align="center" valign="top" style="font-size:12px;"></td>\n' + //RI Optional
		'</tr>\n'+
		'<tr style="border-top:#F0F0F0;">\n' +
			'<td align="left" valign="top" style="font-size:12px; padding:4px;" bgcolor="#FFFFFF">2nd fix heating controls and 2-port zone valves for standard S-Plan layout where applicable</td>\n' + //Operation
			'<td align="center" valign="top" style="font-size:12px;" bgcolor="#FFFFFF"></td>\n' + //RI
			'<td align="center" valign="top" style="font-size:12px;" bgcolor="#FFFFFF"></td>\n' + //Builder
			'<td align="center" valign="top" style="font-size:12px;" bgcolor="#FFFFFF">&#10003;</td>\n' + //Heating Contractor
			'<td align="center" valign="top" style="font-size:12px;" bgcolor="#FFFFFF"></td>\n' + //Electrical Contractor
			'<td align="center" valign="top" style="font-size:12px;" bgcolor="#FFFFFF">&#10003;</td>\n' + //RI Optional
		'</tr>\n'+
		 '<tr style="border-top:#F0F0F0;">\n' +
			'<td align="left" valign="top" style="font-size:12px; padding:4px;">Where specified, install new boiler and domestic hot water cylinder control valves, etc.</td>\n' + //Operation
			'<td align="center" valign="top" style="font-size:12px;"></td>\n' + //RI
			'<td align="center" valign="top" style="font-size:12px;"></td>\n' + //Builder
			'<td align="center" valign="top" style="font-size:12px;">&#10003;</td>\n' + //Heating Contractor
			'<td align="center" valign="top" style="font-size:12px;"></td>\n' + //Electrical Contractor
			'<td align="center" valign="top" style="font-size:12px;">&#10003;</td>\n' + //RI Optional
		'</tr>\n'+
		'<tr style="border-top:#F0F0F0;">\n' +
			'<td align="left" valign="top" style="font-size:12px; padding:4px;" bgcolor="#FFFFFF">Commission boiler, cylinder and UFH</td>\n' + //Operation
			'<td align="center" valign="top" style="font-size:12px;" bgcolor="#FFFFFF"></td>\n' + //RI
			'<td align="center" valign="top" style="font-size:12px;" bgcolor="#FFFFFF"></td>\n' + //Builder
			'<td align="center" valign="top" style="font-size:12px;" bgcolor="#FFFFFF">&#10003;</td>\n' + //Heating Contractor
			'<td align="center" valign="top" style="font-size:12px;" bgcolor="#FFFFFF"></td>\n' + //Electrical Contractor
			'<td align="center" valign="top" style="font-size:12px;" bgcolor="#FFFFFF">&#10003;</td>\n' + //RI Optional
		'</tr>\n'+
		'<tr style="border-top:#F0F0F0;">\n' +
			'<td align="left" valign="top" style="font-size:12px; padding:4px;">Provide customer handover of operational instructions, User Guide, etc.</td>\n' + //Operation
			'<td align="center" valign="top" style="font-size:12px;">&#10003;</td>\n' + //RI
			'<td align="center" valign="top" style="font-size:12px;"></td>\n' + //Builder
			'<td align="center" valign="top" style="font-size:12px;">&#10003;</td>\n' + //Heating Contractor
			'<td align="center" valign="top" style="font-size:12px;"></td>\n' + //Electrical Contractor
			'<td align="center" valign="top" style="font-size:12px;"></td>\n' + //RI Optional
		'</tr>\n'+
		
		'<tr>\n' +
		   '<td colspan="6" style="padding:4px; font-size:12px;" ><br><strong>Note:</strong> Guide Prices are provided for information only. This is not a quotation for installation by Nu-Heat. Variations in regional labour rates and travelling times are not included. If required we can provide details of a Nu-Heat Registered Installer in your area who will provide a firm installation quotation.<br><br>\n' +
			'The Guide Price for installing the LoPro10&reg; underfloor heating components listed in your quotation are highlighted in the shaded column above. These aspects of the installation can be carried out either by a Nu-Heat Registered Installer, entirely by your own nominated heating engineer or by a combination of both, depending on preference.<br><br>\n' +
			'General building works are not included, as they would be carried out by a builder/carpenter as part of the overall contract.<br><br>\n' +
			'Electrical work must be carried out by a qualified electrical contractor. This can be quoted separately but usually forms part of the heating engineer&rsquo;s overall quotation/contract.<br><br>\n' +
		'</tr>\n' +
		'<tr>\n' +
    	'<td colspan="6" align="right" valign="top" ><br><span style="font-size:22px; color:#000; font-weight:bold;">Installation Estimate (excl. VAT): &pound;'+guidePrice+'</span></td>\n' +
    '</tr>\n' +
'</tbody></table>\n';
	}
	
	else
	{
		operationList = '<tr style="border-top:#F0F0F0;">\n' +
			'<td align="left" valign="top" style="font-size:12px; padding:4px;">Prepare floor surface for registered installer</td>\n' + //Operation
			'<td align="center" valign="top" style="font-size:12px;"></td>\n' + //RI
			'<td align="center" valign="top" style="font-size:12px;">&#10003;</td>\n' + //Builder
			'<td align="center" valign="top" style="font-size:12px;"></td>\n' + //Heating Contractor
			'<td align="center" valign="top" style="font-size:12px;"></td>\n' + //Electrical Contractor
			'<td align="center" valign="top" style="font-size:12px;"></td>\n' + //RI Optional
		'</tr>\n'+
		'<tr style="border-top:#F0F0F0;">\n' +
			'<td align="left" valign="top" style="font-size:12px; padding:4px;" bgcolor="#FFFFFF">Install locally sourced insulation complying with current building regulations</td>\n' + //Operation
			'<td align="center" valign="top" style="font-size:12px;" bgcolor="#FFFFFF"></td>\n' + //RI
			'<td align="center" valign="top" style="font-size:12px;" bgcolor="#FFFFFF">&#10003;</td>\n' + //Builder
			'<td align="center" valign="top" style="font-size:12px;" bgcolor="#FFFFFF"></td>\n' + //Heating Contractor
			'<td align="center" valign="top" style="font-size:12px;" bgcolor="#FFFFFF"></td>\n' + //Electrical Contractor
			'<td align="center" valign="top" style="font-size:12px;" bgcolor="#FFFFFF"></td>\n' + //RI Optional
		'</tr>\n'+
		'</tr>\n'+
		'<tr style="border-top:#F0F0F0;">\n' +
			'<td align="left" valign="top" style="font-size:12px; padding:4px;">Install Nu-Heat tracked polystyrene insulation for floating floors and heat transfer plates where present</td>\n' + //Operation
			'<td align="center" valign="top" style="font-size:12px;">&#10003;</td>\n' + //RI
			'<td align="center" valign="top" style="font-size:12px;"></td>\n' + //Builder
			'<td align="center" valign="top" style="font-size:12px;"></td>\n' + //Heating Contractor
			'<td align="center" valign="top" style="font-size:12px;"></td>\n' + //Electrical Contractor
			'<td align="center" valign="top" style="font-size:12px;"></td>\n' + //RI Optional
		'</tr>\n'+
		'<tr style="border-top:#F0F0F0;">\n' +
			'<td align="left" valign="top" style="font-size:12px; padding:4px;" bgcolor="#FFFFFF">Notch joists in suspended timber floors in accordance with current Building Regulations where applicable</td>\n' + //Operation
			'<td align="center" valign="top" style="font-size:12px;" bgcolor="#FFFFFF"></td>\n' + //RI
			'<td align="center" valign="top" style="font-size:12px;" bgcolor="#FFFFFF">&#10003;</td>\n' + //Builder
			'<td align="center" valign="top" style="font-size:12px;" bgcolor="#FFFFFF"></td>\n' + //Heating Contractor
			'<td align="center" valign="top" style="font-size:12px;" bgcolor="#FFFFFF"></td>\n' + //Electrical Contractor
			'<td align="center" valign="top" style="font-size:12px;" bgcolor="#FFFFFF">&#10003;</td>\n' + //RI Optional
		'</tr>\n'+
		'<tr style="border-top:#F0F0F0;">\n' +
			'<td align="left" valign="top" style="font-size:12px; padding:4px;">Install timber battens associated with the floor construction specified (eg DPJ14) for UFH installed between floor joists</td>\n' + //Operation
			'<td align="center" valign="top" style="font-size:12px;"></td>\n' + //RI
			'<td align="center" valign="top" style="font-size:12px;">&#10003;</td>\n' + //Builder
			'<td align="center" valign="top" style="font-size:12px;"></td>\n' + //Heating Contractor
			'<td align="center" valign="top" style="font-size:12px;"></td>\n' + //Electrical Contractor
			'<td align="center" valign="top" style="font-size:12px;"></td>\n' + //RI Optional
		'</tr>\n'+
		'<tr style="border-top:#F0F0F0;">\n' +
			'<td align="left" valign="top" style="font-size:12px; padding:4px;" bgcolor="#FFFFFF">Install Nu-HeatOptiflo manifold(s)</td>\n' + //Operation
			'<td align="center" valign="top" style="font-size:12px;" bgcolor="#FFFFFF">&#10003;</td>\n' + //RI
			'<td align="center" valign="top" style="font-size:12px;" bgcolor="#FFFFFF"></td>\n' + //Builder
			'<td align="center" valign="top" style="font-size:12px;" bgcolor="#FFFFFF"></td>\n' + //Heating Contractor
			'<td align="center" valign="top" style="font-size:12px;" bgcolor="#FFFFFF"></td>\n' + //Electrical Contractor
			'<td align="center" valign="top" style="font-size:12px;" bgcolor="#FFFFFF">&#10003;</td>\n' + //RI Optional
		'</tr>\n'+
		 '<tr style="border-top:#F0F0F0;">\n' +
			'<td align="left" valign="top" style="font-size:12px; padding:4px;">Install remote or direct pump module(s)</td>\n' + //Operation
			'<td align="center" valign="top" style="font-size:12px;"></td>\n' + //RI
			'<td align="center" valign="top" style="font-size:12px;"></td>\n' + //Builder
			'<td align="center" valign="top" style="font-size:12px;">&#10003;</td>\n' + //Heating Contractor
			'<td align="center" valign="top" style="font-size:12px;"></td>\n' + //Electrical Contractor
			'<td align="center" valign="top" style="font-size:12px;">&#10003;</td>\n' + //RI Optional
		'</tr>\n'+
//		'<tr style="border-top:#F0F0F0;">\n' +
//			'<td align="left" valign="top" style="font-size:12px; padding:4px;" bgcolor="#FFFFFF">Install Alupex flow and return pipework from Optiflo manifold(s) to remote distributors (where applicable)</td>\n' + //Operation
//			'<td align="center" valign="top" style="font-size:12px;" bgcolor="#FFFFFF">&#10003;</td>\n' + //RI
//			'<td align="center" valign="top" style="font-size:12px;" bgcolor="#FFFFFF"></td>\n' + //Builder
//			'<td align="center" valign="top" style="font-size:12px;" bgcolor="#FFFFFF"></td>\n' + //Heating Contractor
//			'<td align="center" valign="top" style="font-size:12px;" bgcolor="#FFFFFF"></td>\n' + //Electrical Contractor
//			'<td align="center" valign="top" style="font-size:12px;" bgcolor="#FFFFFF"></td>\n' + //RI Optional
//		'</tr>\n'+
		 '<tr style="border-top:#F0F0F0;">\n' +
			'<td align="left" valign="top" style="font-size:12px; padding:4px;">Install floor heating tube (and cliptrack for screed systems)</td>\n' + //Operation
			'<td align="center" valign="top" style="font-size:12px;">&#10003;</td>\n' + //RI
			'<td align="center" valign="top" style="font-size:12px;"></td>\n' + //Builder
			'<td align="center" valign="top" style="font-size:12px;"></td>\n' + //Heating Contractor
			'<td align="center" valign="top" style="font-size:12px;"></td>\n' + //Electrical Contractor
			'<td align="center" valign="top" style="font-size:12px;"></td>\n' + //RI Optional
		'</tr>\n'+
		'<tr style="border-top:#F0F0F0;">\n' +
			'<td align="left" valign="top" style="font-size:12px; padding:4px;" bgcolor="#FFFFFF">Fill, flush & pressure test floor heating system</td>\n' + //Operation
			'<td align="center" valign="top" style="font-size:12px;" bgcolor="#FFFFFF">&#10003;</td>\n' + //RI
			'<td align="center" valign="top" style="font-size:12px;" bgcolor="#FFFFFF"></td>\n' + //Builder
			'<td align="center" valign="top" style="font-size:12px;" bgcolor="#FFFFFF"></td>\n' + //Heating Contractor
			'<td align="center" valign="top" style="font-size:12px;" bgcolor="#FFFFFF"></td>\n' + //Electrical Contractor
			'<td align="center" valign="top" style="font-size:12px;" bgcolor="#FFFFFF"></td>\n' + //RI Optional
		'</tr>\n'+
		'<tr style="border-top:#F0F0F0;">\n' +
			'<td align="left" valign="top" style="font-size:12px; padding:4px;">Lay floor screed/timber floor</td>\n' + //Operation
			'<td align="center" valign="top" style="font-size:12px;"></td>\n' + //RI
			'<td align="center" valign="top" style="font-size:12px;">&#10003;</td>\n' + //Builder
			'<td align="center" valign="top" style="font-size:12px;"></td>\n' + //Heating Contractor
			'<td align="center" valign="top" style="font-size:12px;"></td>\n' + //Electrical Contractor
			'<td align="center" valign="top" style="font-size:12px;"></td>\n' + //RI Optional
		'</tr>\n'+
		'<tr style="border-top:#F0F0F0;">\n' +
			'<td align="left" valign="top" style="font-size:12px; padding:4px;" bgcolor="#FFFFFF">Install room stats, control boards, and all electrical wiring (1<sup>st</sup> and 2<sup>nd</sup> fix)</td>\n' + //Operation
			'<td align="center" valign="top" style="font-size:12px;" bgcolor="#FFFFFF"></td>\n' + //RI
			'<td align="center" valign="top" style="font-size:12px;" bgcolor="#FFFFFF"></td>\n' + //Builder
			'<td align="center" valign="top" style="font-size:12px;" bgcolor="#FFFFFF"></td>\n' + //Heating Contractor
			'<td align="center" valign="top" style="font-size:12px;" bgcolor="#FFFFFF">&#10003;</td>\n' + //Electrical Contractor
			'<td align="center" valign="top" style="font-size:12px;" bgcolor="#FFFFFF"></td>\n' + //RI Optional
		'</tr>\n'+
		 '<tr style="border-top:#F0F0F0;">\n' +
			'<td align="left" valign="top" style="font-size:12px; padding:4px;">Install cylinder (if present)</td>\n' + //Operation
			'<td align="center" valign="top" style="font-size:12px;"></td>\n' + //RI
			'<td align="center" valign="top" style="font-size:12px;"></td>\n' + //Builder
			'<td align="center" valign="top" style="font-size:12px;">&#10003;</td>\n' + //Heating Contractor
			'<td align="center" valign="top" style="font-size:12px;"></td>\n' + //Electrical Contractor
			'<td align="center" valign="top" style="font-size:12px;">&#10003;</td>\n' + //RI Optional
		'</tr>\n'+
		'<tr style="border-top:#F0F0F0;">\n' +
			'<td align="left" valign="top" style="font-size:12px; padding:4px;" bgcolor="#FFFFFF">Install pipework between cylinder or boiler and Optiflo manifold(s) (1<sup>st</sup> and 2<sup>nd</sup> fix)</td>\n' + //Operation
			'<td align="center" valign="top" style="font-size:12px;" bgcolor="#FFFFFF"></td>\n' + //RI
			'<td align="center" valign="top" style="font-size:12px;" bgcolor="#FFFFFF"></td>\n' + //Builder
			'<td align="center" valign="top" style="font-size:12px;" bgcolor="#FFFFFF">&#10003;</td>\n' + //Heating Contractor
			'<td align="center" valign="top" style="font-size:12px;" bgcolor="#FFFFFF"></td>\n' + //Electrical Contractor
			'<td align="center" valign="top" style="font-size:12px;" bgcolor="#FFFFFF">&#10003;</td>\n' + //RI Optional
		'</tr>\n'+
		 '<tr style="border-top:#F0F0F0;">\n' +
			'<td align="left" valign="top" style="font-size:12px; padding:4px;">Install domestic services (1<sup>st</sup> and 2<sup>nd</sup> fix)</td>\n' + //Operation
			'<td align="center" valign="top" style="font-size:12px;"></td>\n' + //RI
			'<td align="center" valign="top" style="font-size:12px;"></td>\n' + //Builder
			'<td align="center" valign="top" style="font-size:12px;">&#10003;</td>\n' + //Heating Contractor
			'<td align="center" valign="top" style="font-size:12px;"></td>\n' + //Electrical Contractor
			'<td align="center" valign="top" style="font-size:12px;">&#10003;</td>\n' + //RI Optional
		'</tr>\n'+
		'<tr style="border-top:#F0F0F0;">\n' +
			'<td align="left" valign="top" style="font-size:12px; padding:4px;" bgcolor="#FFFFFF">Install and commission boiler/heat source</td>\n' + //Operation
			'<td align="center" valign="top" style="font-size:12px;" bgcolor="#FFFFFF"></td>\n' + //RI
			'<td align="center" valign="top" style="font-size:12px;" bgcolor="#FFFFFF"></td>\n' + //Builder
			'<td align="center" valign="top" style="font-size:12px;" bgcolor="#FFFFFF">&#10003;</td>\n' + //Heating Contractor
			'<td align="center" valign="top" style="font-size:12px;" bgcolor="#FFFFFF"></td>\n' + //Electrical Contractor
			'<td align="center" valign="top" style="font-size:12px;" bgcolor="#FFFFFF">&#10003;</td>\n' + //RI Optional
		'</tr>\n'+
		'<tr style="border-top:#F0F0F0;">\n' +
			'<td align="left" valign="top" style="font-size:12px; padding:4px;">Connect boiler/heat source to cylinder (if present)</td>\n' + //Operation
			'<td align="center" valign="top" style="font-size:12px;"></td>\n' + //RI
			'<td align="center" valign="top" style="font-size:12px;"></td>\n' + //Builder
			'<td align="center" valign="top" style="font-size:12px;">&#10003;</td>\n' + //Heating Contractor
			'<td align="center" valign="top" style="font-size:12px;"></td>\n' + //Electrical Contractor
			'<td align="center" valign="top" style="font-size:12px;">&#10003;</td>\n' + //RI Optional
		'</tr>\n'+
		'<tr style="border-top:#F0F0F0;">\n' +
			'<td align="left" valign="top" style="font-size:12px; padding:4px;" bgcolor="#FFFFFF">Commission floor heating and provide operational instruction</td>\n' + //Operation
			'<td align="center" valign="top" style="font-size:12px;" bgcolor="#FFFFFF">&#10003;</td>\n' + //RI
			'<td align="center" valign="top" style="font-size:12px;" bgcolor="#FFFFFF"></td>\n' + //Builder
			'<td align="center" valign="top" style="font-size:12px;" bgcolor="#FFFFFF"></td>\n' + //Heating Contractor
			'<td align="center" valign="top" style="font-size:12px;" bgcolor="#FFFFFF"></td>\n' + //Electrical Contractor
			'<td align="center" valign="top" style="font-size:12px;" bgcolor="#FFFFFF"></td>\n' + //RI Optional
		'</tr>\n'+
		'<tr>\n' +
		    '<td colspan="6" valign="top" style="font-size:12px; padding:4px;"><p><strong>Note:</strong> Guide prices are provided for information only. This is not a quotation for installation by Nu-Heat.\n' +
			'Variations in regional labour rates and travelling times are not included. We can provide contact details of a registered installer in your area, who will provide a firm installation quotation.</p></td>\n' +
		'</tr>\n'+
		'<tr>\n' +
    	'<td colspan="6" align="right" valign="top" ><br><span style="font-size:22px; color:#000; font-weight:bold;">Installation Estimate (excl. VAT): &pound;'+guidePrice+'</span></td>\n' +
    '</tr>\n' +
'</tbody></table>\n';
	}
	
	
	if (guidePrice != null && guidePrice != '' && guidePrice > 0)
	{
		installGuide = '<h2 class="acc_trigger breakhere"><a href="#9" onclick="ga(\'send\', \'event\', \'quote\', \'Click\', \'install-guide-price\');"><div class="P-Header">Installation Guide Price</div></a></h2>\n' +
		'<div class="acc_container">\n' +
			'<div class="block">\n' +
			'<h5>Installation Sequence and Guide Price for '+floorCons+' underfloor heating components</h5>\n' +
				'<table width="100%">\n' +
					'<tbody><tr style="color:#FFF;">\n' +
				      '<td valign="top" width="250">&nbsp;</td>\n' +
				      '<td valign="center" bgcolor="#666666" align="center" style="font-size:12px;"><strong>Included</strong></td>\n' +
				      '<td valign="center" colspan="4" bgcolor="#666666" align="center" style="font-size:12px;"><strong>Not Included in Guide Price</strong></td>\n' +
				    '</tr>\n'+
				    '<tr style="color:#FFF;">\n' +
				      '<td valign="center" bgcolor="#666666" align="left" style="font-size:12px;"><p><strong>Operation</strong></td>\n' +
				      '<td valign="center" bgcolor="#666666" align="center" style="font-size:12px;"><strong>Registered Installer</strong></td>\n' +
				      '<td valign="center" bgcolor="#666666" align="center" style="font-size:12px;"><strong>Builder</strong></td>\n' +
				      '<td valign="center" bgcolor="#666666" align="center" style="font-size:12px;"><strong>Heating Contractor</strong></td>\n' +
				      '<td valign="center" bgcolor="#666666" align="center" style="font-size:12px;"><strong>Electrical Contractor</strong></td>\n' +
				      '<td valign="center" bgcolor="#666666" align="center" style="font-size:12px;"><strong>Registered Installer (optional)</strong></td>\n' +
				    '</tr>\n'+
				    operationList+			
		'</div></div>\n' ;
	}
	else {installGuide = '';}
	
	return installGuide;
}

function screedContractor(transactionID)
{
	var screedContract = '';
	var loPro = 'F';
	var loProMax = 'F';
	var otherFloorCon = 'F';
	var transRecord = nlapiLoadRecord('estimate', transactionID);	

	var floorConstructions = transRecord.getFieldValue('custbody_floor_cons_list');
	if (floorConstructions != null && floorConstructions != '') {
		var floorConstructionsArray = floorConstructions.split('*'); 
		var numberOfFCs = floorConstructionsArray.length;
		for (var i=1; i <= numberOfFCs; i++){
			var floorCons = floorConstructionsArray.slice(i-1,i);
			if (lu_floor_cons_type[floorCons] == 'LoProMax Floors'){
				loProMax = 'T';
				break;
			}
//			else if (lu_floor_cons_type[floorConst] == 'LoPro Floors'){
//				loPro = 'T';
//			}			 
//			else{
//				otherFloorCon = 'T';
//			}
		}
	}

//	var roomCount = nlapiGetLineItemCount('recmachcustrecord_cad_rooms_quote');
//	for (var i=1; i <= roomCount; i++)
//	{	
//		var floorConst = nlapiGetLineItemText('recmachcustrecord_cad_rooms_quote', 'custrecord_cad_floor_construction', i);
//		if (lu_floor_cons_type[floorConst] == 'LoPro Floors')
//		{
//			loPro = 'T';
//		}
//		else if (lu_floor_cons_type[floorConst] == 'LoProMax Floors')
//		{
//			loProMax = 'T';
//		}
//		else
//		{
//			otherFloorCon = 'T';
//		}	
//	}

	
	if (loProMax == 'T')
	{
		screedContract = '<h2 class="acc_trigger breakhere"><a href="#22" onclick="ga(\'send\', \'event\', \'quote\', \'Click\', \'screeding-contractors\');"><div class="P-Header">Screeding Contractors Information</div></a></h2>\n' +
		'<div class="acc_container">\n' +
			'<div class="block"><p style="PADDING-LEFT: 8px">For the names and details of the contractors who are able to provide a fixed price quotation for the installation of LoPro&reg;Max QuickSet self-levelling compound please contact your Account Manager.</p>\n' +
		'</div></div>\n' ;
		
		/* CJM Jan2017 CONTRACTOR DETAILS TO BE REPLACED WITH IMAGES AND NEW TEXT SHORTLY.....
		
		var salesEmail = nlapiGetFieldValue('custbody_sales_rep_email');
		var salesPhone = nlapiGetFieldValue('custbody_sales_rep_phone');
		screedContract = '<h2 class="acc_trigger breakhere"><a href="#22" onclick="ga(\'send\', \'event\', \'quote\', \'Click\', \'screeding-contractors\');"><div class="P-Header">Screeding Contractors Information</div></a></h2>\n' +
		'<div class="acc_container">\n' +
			'<div class="block"><p style="PADDING-LEFT: 8px">Please see below for the names and details of the contractors who are able to provide a fixed price quotation for the installation of LoPro&reg;Max QuickSet self-levelling compound.</p>\n' +
				'<table width="560">\n' +
				'<tbody>\n' +
					'<tr>\n' +
					'<td style="PADDING-BOTTOM=15px; vertical-align: top; PADDING-LEFT: 8px;" width="50%">\n' +
					'<p><span style="font-weight:bold;">Self Set Screeding</span><br />\n' +
					'Contact name: Kelvin Llewellyn<br />\n' +
					'Tel: 07970 683996<br />\n' +
					'Email: <a href="mailto:selfsetscreeding@fsmail.net">selfsetscreeding@fsmail.net</a><br />\n' +
					'Based in: Southwest<br />\n' +
					'Operates: Nationally<br />\n' +
					'<a href="/core/media/media.nl?id=4973144&amp;c=472052&amp;h=85e1799a5be43d59961c&amp;_xt=.pdf">LINK TO MAP</a></p>\n' +
					'</td>\n' +
					'<td style="PADDING-BOTTOM=15px; vertical-align: top; PADDING-LEFT: 8px">\n' +
					'<p><span style="font-weight:bold;">Flow Screed Services Surrey Ltd</span><br />\n' +
					'Contact name: Kevin Holley<br />\n' +
					'Tel: 01932 761236<br />\n' +
					'Email: <a href="mailto:info@flowscreedservices.co.uk">info@flowscreedservices.co.uk</a><br />\n' +
					'Based in: Middlesex<br />\n' +
					'Operates: England &amp; Wales<br />\n' +
					'<a href="/core/media/media.nl?id=6421062&amp;c=472052&amp;h=800d99056c4e78cb87ef&amp;_xt=.pdf">LINK TO MAP</a></p>\n' +
					'</td>\n' +
					'</tr>\n' +
					
					'<tr>\n' +
					'<td style="PADDING-BOTTOM=15px; vertical-align: top; PADDING-LEFT: 8px">\n' +
					'<p><span style="font-weight:bold;">Ultra Syntec Ltd</span><br />\n' +
					'Contact name: William Hoyle<br />\n' +
					'Tel: 01422 377708<br />\n' +
					'Email: <a href="mailto:will@ultrasyntecltd.co.uk">will@ultrasyntecltd.co.uk</a><br />\n' +
					'Based in: West Yorkshire<br />\n' +
					'Operates: Nationally - except SE &amp; SW<br />\n' +
					'<a href="/core/media/media.nl?id=6421163&amp;c=472052&amp;h=67c8187e6331eebccc4e&amp;_xt=.pdf">LINK TO MAP</a></p>\n' +
					'</td>\n' +
					'<td style="PADDING-BOTTOM=15px; vertical-align: top; PADDING-LEFT: 8px">\n' +
					'<p><span style="font-weight:bold;">ARH Tucker &amp; Sons (Cleethorpes) Ltd</span><br />\n' +
					'Contact name: John Tucker<br />\n' +
					'Tel: 01472 692012<br />\n' +
					'Email: <a href="mailto:office@arhtuckerandsons.co.uk">office@arhtuckerandsons.co.uk</a><br />\n' +
					'Based in: Lincolnshire<br />\n' +
					'Operates: England &amp; Wales<br />\n' +
					'<a href="/core/media/media.nl?id=6420860&amp;c=472052&amp;h=8db8c20599f310bd3c1e&amp;_xt=.pdf">LINK TO MAP</a></p>\n' +
					'</td>\n' +
					'</tr>\n' +
					
					'<tr>\n' +
					'<td style="PADDING-BOTTOM=15px; vertical-align: top; PADDING-LEFT: 8px">\n' +
					'<p><span style="font-weight:bold;">Dragon Underfloor Heating &amp; Screed</span><br />\n' +
					'Contact name: Alan Williams<br />\n' +
					'Tel: 01924 574003 / 07979 751154<br />\n' +
					'Email: <a href="mailto:alan@dragonfloorheating.co.uk">alan@dragonfloorheating.co.uk</a><br />\n' +
					'Based in: Mirfield<br />\n' +
					'Operates: Nationally<br />\n' +
					'<a href="/core/media/media.nl?id=7128942&amp;c=472052&amp;h=e6f8c1c79b6838b4c3db&amp;_xt=.pdf">LINK TO MAP</a></p>\n' +
					'</td>\n' +
					'<td style="PADDING-BOTTOM=15px; vertical-align: top; PADDING-LEFT: 8px">\n' +
					'<p><span style="font-weight:bold;">Saber Systems Ltd</span><br />\n' +
					'Contact name: Adrian Heath<br />\n' +
					'Tel: 01217 488937 / 07545 142424<br />\n' +
					'Email: <a href="mailto:enquiries@sabersystemsltd.com">enquiries@sabersystemsltd.com</a><br />\n' +
					'Based in: Birmingham<br />\n' +
					'Operates: Midlands and Southern England &amp; Wales<br />\n' +
					'<a href="/core/media/media.nl?id=4973450&amp;c=472052&amp;h=b40471b47a7d75c5404f&amp;_xt=.pdf">LINK TO MAP</a></p>\n' +
					'</td>\n' +
					'</tr>\n' +
					
					/*NEW Screeding Contractor
					'<tr>\n' +
					'<td style="PADDING-BOTTOM=15px; vertical-align: top; PADDING-LEFT: 8px">\n' +
					'<p><span style="font-weight:bold;">Interior Screed Ltd</span><br />\n' +
					'Contact name: Wesley Boopy<br />\n' +
					'Tel: 01926 679603<br />\n' +
					'Email: <a href="mailto:estimating@interiorscreed.co.uk">estimating@interiorscreed.co.uk</a><br />\n' +
					'Based in: Manchester and Warwick<br />\n' +
					'Operates: Nationally<br />\n' +
					'<a href="/core/media/media.nl?id=10297513&amp;c=472052&amp;h=b96575bd2e17fa1ad5df&amp;_xt=.pdf">LINK TO MAP</a></p>\n' +
					'</td>\n' +
					'<td style="PADDING-BOTTOM=15px; vertical-align: top; PADDING-LEFT: 8px">\n' +
					'<p><span style="font-weight:bold;">Screedmaster SW Ltd</span><br />\n' +
					'Contact name: David Moyes<br />\n' +
					'Tel: 0800 9807 260 / 07961 076 815<br />\n' +
					'Email: <a href="mailto:info@screed-floors.co.uk">info@screed-floors.co.uk</a><br />\n' +
					'Based in: Devon<br />\n' +
					'Operates: Southwest, South Coast, West Midlands<br />\n' +
					'<a href="/core/media/media.nl?id=10489809&c=472052&h=698fb4382a564fac53e8&_xt=.pdf">LINK TO MAP</a></p>\n' +
					'</td>\n' +
					'</tr>\n' +					

					'<tr>\n' +
					'<td style="PADDING-BOTTOM=15px; vertical-align: top; PADDING-LEFT: 8px">\n' +
					'<p><span style="font-weight:bold;">Screed-Tech</span><br />\n' +
					'Contact name: Jez Stevens<br />\n' +
					'Tel: 07931 657 673<br />\n' +
					'Email: <a href="mailto:superscreed@screed-tech.com">superscreed@screed-tech.com</a><br />\n' +
					'Based in: Devon<br />\n' +
					'Operates: Southwest<br />\n' +
					'<a href="/core/media/media.nl?id=10489810&c=472052&h=ebc6bdb32338caedfbd2&_xt=.pdf">LINK TO MAP</a></p>\n' +
					'</td>\n' +
					'<td style="PADDING-BOTTOM=15px; vertical-align: top; PADDING-LEFT: 8px">\n' +
					'<p><span style="font-weight:bold;">Porters Screeding Services</span><br />\n' +
					'Contact name: Nick Porter<br />\n' +
					'Tel: 01234 401551 / 07824 446683 / 07976 531156<br />\n' +
					'Email: <a href="mailto:nicz.porter@virgin.net">nicz.porter@virgin.net</a><br />\n' +
					'Based in: Bedfordshire<br />\n' +
					'Operates: Midlands, London, M25 and East Anglia<br />\n' +
					'<a href="/core/media/media.nl?id=10489704&c=472052&h=5446f09fd15f4914680b&_xt=.pdf">LINK TO MAP</a></p>\n' +
					'</td>\n' +
					'</tr>\n' +
					
//					'<tr>\n' +
//					'<td style="PADDING-BOTTOM=15px; vertical-align: top; PADDING-LEFT: 8px">\n' +
//					'<p><span style="font-weight:bold;"> </span><br />\n' +
//					'Contact name: <br />\n' +
//					'Tel: <br />\n' +
//					'Email: <a href="mailto: "> </a><br />\n' +
//					'Based in:  <br />\n' +
//					'Operates:  <br />\n' +
//					'<a href="/core/media/media.nl? ">LINK TO MAP</a></p>\n' +
//					'</td>\n' +
//					'<td style="PADDING-BOTTOM=15px; vertical-align: top; PADDING-LEFT: 8px">\n' +
//					'<p><span style="font-weight:bold;"> </span><br />\n' +
//					'Contact name: <br />\n' +
//					'Tel: <br />\n' +
//					'Email: <a href="mailto: "> </a><br />\n' +
//					'Based in:  <br />\n' +
//					'Operates:  <br />\n' +
//					'<a href="/core/media/media.nl? ">LINK TO MAP</a></p>\n' +
//					'</td>\n' +
//					'</tr>\n' +
					
				'</tbody>\n' +
				'</table>\n' +
				'<p style="PADDING-LEFT: 8px">This service is provided through professional self-levelling compound contractors that are registered with Nu-Heat.</p>\n' +
				'<p style="PADDING-LEFT: 8px">If you would like to get a quote from one of the companies listed, please contact them directly. They will be happy to provide the following:</p>\n' +
				'<ul>\n' +
					'<li>A written quotation confirming installation costs</li>\n' +
					'<li>An agreed date and time for carrying out the work</li>\n' +
					'<li>A copy of their Terms &amp; Conditions detailing all site requirements</li>\n' +
				'</ul>\n' +
				'<p style="PADDING-LEFT: 8px">In the meantime of you have any further questions you can contact me by <a href="mailto:'+ salesEmail +'">Email</a> or by phone on '+ salesPhone +'</p>\n' +
				'<p style="LINE-HEIGHT: 18px; COLOR: #333; FONT-SIZE: 14px;PADDING-LEFT: 8px; font-weight:bold;"><b>Notes</b></p>\n' +
				'<ol>\n' +
					'<li>The contract for installation of LoPro&reg;QuickSet self-levelling compound is between the customer and the self-levelling compound contractor. All financial agreements and transactions are solely between the customer and the self-levelling compound contractor.</li>\n' +
					'<li>All self-levelling compound contractors listed by Nu-Heat UK Ltd should provide their standard Terms &amp; Conditions together with a Service Level Agreement clearly setting out the extent of their responsibility in relation to the installation of the LoPro&reg;QuickSet self-levelling compound and the items that are the responsibility of the customer.</li>\n' +
				'</ol>\n' +
				'</table>\n' +
		'</div></div>\n' ;
		*/
	}
	return screedContract;
}

function nextStep(transactionID)
{
	var nextStep = '<div class="printlogo"><h2 class="acc_trigger breakhere"><a href="#10" onclick="ga(\'send\', \'event\', \'quote\', \'Click\', \'next-step\');"><div class="P-Header" >The Next Step</div></a></h2>\n' +
	'<div class="acc_container">\n' +
	'<div class="block">\n' + nextStepInlineLPM(transactionID,'tab')+'</div></div>\n' ;
	return nextStep;
}

function nextStepInlineLPM(transactionID, origin)
{
//	var transRecord = nlapiLoadRecord('estimate', transactionID);
	var salesEmail = nlapiGetFieldValue('custbody_sales_rep_email');
	var salesPhone = nlapiGetFieldValue('custbody_sales_rep_phone');
	var depositTxt = '';//'<p>To secure your order and begin the design process simply get in touch (using the contact details below) to start the design process.</p>\n';
	
	var estimatedDeposit = twoDP(nlapiGetFieldValue('custbody_deposit'));
	var customerID = nlapiGetFieldValue('entity');
	var customerCategory = nlapiLookupField('customer',customerID,'category', true);
	var FCparagraph = '';
	if (customerCategory == 'Self-builder'){
		//depositTxt = '<p><strong>All we need is a deposit of <span style="font-size: 16px;">&pound;'+estimatedDeposit+'</span> which equates to 20% of your quote price (inc VAT).</strong></p>\n';
		depositTxt = '<p><strong>All we need is a deposit of 20% of your quote price (inc VAT).</strong></p>\n'; //PB deposit amount removed 25/09/17 SUP349709
		}
	if (origin == 'tab')
	{
		if (floorConCheck(transactionID, 'LoProMax Floors') != -1)
		{
			FCparagraph = '\n<h4>Please check your floor levels</h4>  \n' +
			'<p>The quantity of LoPro&reg;QuickSet self-levelling compound in this quote is calculated based on the floors being level within a tolerance of +/- 2.5mm. \n' +
			'<p>If floor levels are outside of this tolerance, please advise your Account Manager of any additional self-levelling compound requirements so that we can include sufficient compound for your install as part of your delivery. Our <a href="http://www.nu-heat.co.uk/products/retrofit-ufh/lopromax/complete-package/#quicksettable">LoPro&reg;QuickSet Ready Reckoner</a> can help you to calculate your requirements.</p> \n' +
			'<p>Any additional LoPro&reg;QuickSet requested after the initial order has been placed will be subject to a delivery charge. </p>';
		}
	}
	/* CJM Aug2017 start........ 
	// CJM Aug2017 CASE:SUP347303
	
	var nextStep='<div style="border:#4F5251 solid 1px; width:100%; padding-left: 8px; padding-right:8px; background-color: #fff;"><br>\n' +
		'<h3>What\'s Next?</h3>\n' +
		'<h4>Place your order now</h4>\n' +
		'<p>To place your order please contact me on:</p>\n' +
		'<p style="line-height: 20px;"><img src="/core/media/media.nl?id=14227094&c=472052&h=c59a82774ebc5b4f62ff" style="float: none; background: none; margin: 0px; border: 0px; vertical-align: middle;">&nbsp;&nbsp;<span class="contactdetails">'+salesPhone+'</span> or email <img src="/core/media/media.nl?id=14227138&c=472052&h=e266a92b3f540c261543" style="float: none; background: none; margin: 0px; border: 0px; vertical-align: middle;">&nbsp;&nbsp;<span class="contactdetails"><a href="'+salesEmail+'">'+salesEmail+'</a></span></p>\n' +
		depositTxt+'<p>In busy periods, our design process can take up to three weeks, although we always do our best to design systems as quickly as possible. Please contact us in good time to ensure that we can meet your project deadlines.</p>\n' +
		'<br><h4>Ask questions or make changes</h4>\n' +
		'<p>If you wish to discuss any aspect of your quote, add upgrades or make any other changes, please contact me on:</p>\n' +
		'<p style="line-height: 20px;"><img src="/core/media/media.nl?id=14227094&c=472052&h=c59a82774ebc5b4f62ff" style="float: none; background: none; margin: 0px; border: 0px; vertical-align: middle;">&nbsp;&nbsp;<span class="contactdetails">'+salesPhone+'</span> or email <img src="/core/media/media.nl?id=14227138&c=472052&h=e266a92b3f540c261543" style="float: none; background: none; margin: 0px; border: 0px; vertical-align: middle;">&nbsp;&nbsp;<span class="contactdetails"><a href="'+salesEmail+'">'+salesEmail+'</a></span></p>\n' +
		'<p style="border-bottom: 1px dashed #ccc;">&nbsp;</p>\n' + FCparagraph +
		'<br></div></div>\n';
	*/
	
	var nextStep='<div style="border:#4F5251 solid 1px; width:100%; padding-left: 8px; padding-right:8px; background-color: #fff;"><br>\n' +
		'<h3>What\'s Next?</h3>\n' +
		'<h4>Place your order now</h4>\n' +
		'<p>To place your order please contact me on:</p>\n' +
		'<p style="line-height: 20px;"><img src="/core/media/media.nl?id=14227094&c=472052&h=c59a82774ebc5b4f62ff" style="float: none; background: none; margin: 0px; border: 0px; vertical-align: middle;">&nbsp;&nbsp;<span class="contactdetails">'+salesPhone+'</span> or email <img src="/core/media/media.nl?id=14227138&c=472052&h=e266a92b3f540c261543" style="float: none; background: none; margin: 0px; border: 0px; vertical-align: middle;">&nbsp;&nbsp;<span class="contactdetails"><a href="'+salesEmail+'">'+salesEmail+'</a></span></p>\n' +
		depositTxt+
		'<br><h4>Design</h4>\n' +
		'<p>On confirming your order, Nu-Heat will complete a thorough design process resulting in detailed CAD layouts, manifold locations and wiring diagrams. In busy periods, our design process can take up to three weeks, although we always do our best to design systems as quickly as possible. Please contact us in good time to ensure that we can meet your project deadlines.</p>\n' +
		'<br><h4>Ask questions or make changes</h4>\n' +
		'<p>If you wish to discuss any aspect of your quote, add upgrades or make any other changes, please contact me on:</p>\n' +
		'<p style="line-height: 20px;"><img src="/core/media/media.nl?id=14227094&c=472052&h=c59a82774ebc5b4f62ff" style="float: none; background: none; margin: 0px; border: 0px; vertical-align: middle;">&nbsp;&nbsp;<span class="contactdetails">'+salesPhone+'</span> or email <img src="/core/media/media.nl?id=14227138&c=472052&h=e266a92b3f540c261543" style="float: none; background: none; margin: 0px; border: 0px; vertical-align: middle;">&nbsp;&nbsp;<span class="contactdetails"><a href="'+salesEmail+'">'+salesEmail+'</a></span></p>\n' +
		'<p style="border-bottom: 1px dashed #ccc;">&nbsp;</p>\n' + FCparagraph +
		'<br></div></div>\n';

	//CJM Aug 2017 ends...........

	return nextStep;
}



function printHTML(transactionID, quoteType)
{   
//	var transRecord = nlapiLoadRecord('estimate', transactionID);	
	var quoteNumber = nlapiGetFieldValue('tranid');//
	var singleQuote = "'";
	var htmlprint='<!-- to hide--><div class="hidefoot">\n' +
      '<h2 class="acc_trigger"><a href="#11" onclick="ga(\'send\', \'event\', \'quote\', \'Click\', \'print-quote\');">Print the Quote</a></h2>\n' +
	'<div class="acc_container">\n' +
		'<div class="block">\n' +
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

    '<!-- end of to hide-->\n' +
    
'</div>\n' +
                '<NLCUSTENTITY_CO_MAILING_NAME>\n' +
'<NLCUSTENTITY_CO_MAILING_DEAR>\n' +
'<NLLEADSOURCE>\n' +
'</form>\n' +
         
        '<br /><br />\n' +
'<br />\n' +
'</div>\n';
return htmlprint;
}

function printButton(transactionID)
{
//	var transRecord = nlapiLoadRecord('estimate', transactionID);
	var quoteNumber = nlapiGetFieldValue('tranid');
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
			
function printFloorCons(tranID)
{
	var floorConstPrint = "";
	var floorConstructions = new Array();
	var floorArea = new Array();
//	var transRecord = nlapiLoadRecord('estimate', tranID);
	var roomCount = nlapiGetLineItemCount('recmachcustrecord_cad_rooms_quote');
	for (var i=1; i <= roomCount; i++)
	{
		var floorConst = nlapiGetLineItemText('recmachcustrecord_cad_rooms_quote', 'custrecord_cad_floor_construction', i);
	    var floorSQM = nlapiGetLineItemValue('recmachcustrecord_cad_rooms_quote', 'custrecord_cad_room_area', i);
	    if (floorSQM != null && floorSQM != '')
	    {
		    var a = floorConstructions.indexOf(floorConst);
		    if (a == -1)
		    {
		    	floorConstructions.push(floorConst);
		    	floorArea.push(floorSQM);
		    }
		    else
		    {
		    	var floorSQMa = floorArea.slice(a,a+1);
		    	var newFloorSQM = Number(floorSQMa) + Number(floorSQM);
		    	floorArea.splice(a, 1, newFloorSQM);
			}
	    }
	}   
	for (var j=1; j <= 10; j++)
	{
		var floorConstruct = floorConstructions.slice(j-1,j);
		var floorMeters = oneDP(floorArea.slice(j-1,j));
		if (floorMeters == 0)
			floorMeters = "";
		var floorConstructDesc = lu_floor_cons_desc[floorConstruct];
		if (floorConstructDesc == undefined)
			floorConstructDesc = "";
		
		floorConstPrint +=
		'<input name="floorcode'+j+'" type="hidden" id="floorcode'+j+'" value="'+floorConstruct+'"  /> \n' +
		'<input name="floorarea'+j+'" type="hidden" id="floorarea'+j+'" value="'+floorMeters+'"  /> \n' +
		'<input name="floordesc'+j+'" type="hidden" id="floordesc'+j+'" value="'+floorConstructDesc.replace("&reg;","%99")+'"  /> \n';
	}
	return floorConstPrint;
}

function printHPDetail(transactionID)
{
//	var transRecord = nlapiLoadRecord('estimate', transactionID);	
	var EH1 = nlapiGetFieldValue('custbody_eh1');
	var BVT3 = nlapiGetFieldValue('custbody_bvt3');
	var LD2 = nlapiGetFieldValue('custbody_ld2');
	var hpSchematic = nlapiGetFieldValue('custbody_schematic');
	var dualHP = nlapiGetFieldValue('custbody_dualhp');
	if (dualHP == 'Y'){
		EH1 = nlapiGetFieldValue('custbody_eh1');
		BVT3 = nlapiGetFieldValue('custbody_dualhp_bvt3');
		LD2 = nlapiGetFieldValue('custbody_dualhp_ld2');
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

function footerHTML()
{        
    var htmlEnd = '<div id="footer-push"></div></div><!-- #content-->\n' +

'<div id="quote-footer-push"></div>\n'+


			'<footer id="footer" class="full-width">\n' +
	
		'<a href="#top" id="back-to-top" class="scroll-up">Back to top</a>\n' +
	        '<div id="stop" class="button-desk"></div>\n' +
		'<div class="full-width">\n' +
			'<div class="container">\n' +
				
				'<div id="footer-address" class="ten columns alpha">\n' +
					'<h4 itemprop="name">Nu-Heat UK Ltd</h4>\n' +
					'<div class="expandable">\n' +
						'<p itemprop="address">Heathpark House<br>Devonshire Road<br>Heathpark Industrial Estate<br>Honiton<br>Devon<br>EX14 1SD</p>\n' +
					'</div>\n' +
				'</div>\n' +
				
				'<div id="footer-contact" class="ten columns">\n' +
					'<h4>Opening times</h4>\n' +
					'<div class="expandable">\n' +
						'<p>8am - 5pm, Monday to Friday</p>\n' +
						'<ul class="ico-list">\n' +
							'<li class="phone">\n' +
								'<span>Telephone</span>\n' +
								'<strong itemprop="tel">01404 549770</strong>\n' +
							'</li>\n' +
							'<li class="email">\n' +
								'<span>Email us</span>\n' +
								'<strong><a href="mailto:info@nu-heat.co.uk">info@nu-heat.co.uk</a></strong>\n' +
							'</li>\n' +
						'</ul>\n' +
					'</div>\n' +
				'</div>\n' +
				
				
				
				'<div id="footer-social" class="ten columns omega">\n' +
					'<ul class="ico-list">\n' +
						'<li class="twitter">\n' +
							'<span>Follow us</span>\n' +
							'<strong><a href="https://twitter.com/nuheatuk" target="_blank">@nuheatuk</a></strong>\n' +
						'</li>\n' +
						'<li class="blog">\n' +
							'<span>Read our blog</span>\n' +
							'<strong><a href="http://blog.nu-heat.co.uk">blog.nu-heat.co.uk</a></strong>\n' +
						'</li>\n' +
						'<li class="youtube">\n' +
							'<span>See our videos</span>\n' +
							'<strong><a href="https://youtube.com/nuheatuk" target="_blank">/nuheatuk</a></strong>\n' +
						'</li>\n' +
					'</ul>\n' +
				'</div>\n' +
				
				'<div class="clearfix"></div>\n' +
				
				'<div id="copyright" class="sixteen columns alpha">\n' +
					'<span>� 1997-2015 Nu-Heat UK Ltd. All rights reserved. Registered in England. Reg. No. 3131852. VAT number: VRN156722794. <a href="/privacy-cookies.html">Cookie &amp; Privacy Policy</a>.</span>\n' +
				'</div>\n' +
				
				'<div id="footer-logos" class="fourteen columns omega">\n' +
					'<ul>\n' +
						'<li class="alpha"><img src="http://apps.nu-heat.co.uk/images/logo-mcs-l.svg" alt="MCS"></li>\n' +
						'<li><img src="http://apps.nu-heat.co.uk/images/logo-gshp-l.svg" alt="GSHP"></li>\n' +
						'<li><img src="http://apps.nu-heat.co.uk/images/logo-recc-l.svg" alt="RECC"></li>\n' +
						'<li><img src="http://apps.nu-heat.co.uk/images/logo-beama-l.svg" alt="BEAMA"></li>\n' +
						'<li class="omega"><img src="http://apps.nu-heat.co.uk/images/logo-ask-l.svg" alt="ask for underfloor"></li>\n' +
					'</ul>\n' +
				'</div>\n' +
				
			'</div>\n' +
		'</div>\n' +
		
	'</footer>\n' +
	
	'</div>\n' +
//'<script type="text/javascript">\n' +
//'var gaJsHost = (("https:" == document.location.protocol) ? "https://ssl." : "http://www.");\n' +
//'document.write(unescape("%3Cscript src=\'" + gaJsHost + "google-analytics.com/ga.js\' type=\'text/javascript\'%3E%3C/script%3E"));\n' +
//'</script>\n' +
//'<script type="text/javascript">\n' +
//'try {\n' +
//'var pageTracker = _gat._getTracker("UA-801167-1");\n' +
//'pageTracker._trackPageview();\n' +
//'} catch(err) {}</script>\n' +
	 '<script>\n' +
	  '(function(i,s,o,g,r,a,m){i[\'GoogleAnalyticsObject\']=r;i[r]=i[r]||function(){\n' +
	  '(i[r].q=i[r].q||[]).push(arguments)},i[r].l=1*new Date();a=s.createElement(o),\n' +
	  'm=s.getElementsByTagName(o)[0];a.async=1;a.src=g;m.parentNode.insertBefore(a,m)\n' +
	  '})(window,document,\'script\',\'//www.google-analytics.com/analytics.js\',\'ga\');\n' +

	  'ga(\'create\', \'UA-801167-1\', \'auto\', {\n' +
	'\'allowLinker\': true\n' +
	'});\n' +

	'// Load the plugin.\n' +
	'ga(\'require\', \'linker\');\n' +

	'// Define which domains to autoLink.\n' +
	'ga(\'linker:autoLink\', [\'nu-heat.co.uk\', \'netsuite.com\']);\n' +
	'ga(\'send\', \'pageview\');\n' +

	'</script>\n' +

	
'<script language="javascript" type="text/javascript">\n' +
'var i=new Image();\n' +
'i.src=\'/app/site/hit/tracker.nl?c=472052&n=1&type=page&siteroot=Live+Hosting+Files&url=%2FOnline-UFH-Quote.html&referer=\'+escape(document.referrer);\n' +
'i.onload=function(){nsVoid();};\n' +
'function nsVoid(){return;};\n' +
'</script>\n' +

'</body>\n' +
'</html>';
	return htmlEnd	;
}

function footerHTMLold(forms)
{        
    var htmlEnd = '</div><div id="ContentImageBottom"><img src="/core/media/media.nl?id=291341&amp;c=472052&amp;h=d5d99db38c409b8539f9" alt="Quick link buttons" width="1000" height="82" usemap="#Map" border="0" />\n' +
        '<map name="Map" id="Map">\n' +
          '<area shape="rect" coords="57,12,282,62" href="http://www.nu-heat.co.uk/s.nl/it.I/id.828/.f?sc=7&category=3863469" alt="" />\n' +
          '<area shape="rect" coords="293,12,510,62" href="http://www.nu-heat.co.uk/s.nl/it.I/id.201/.f?sc=7&category=-107" alt="" />\n' +
          '<area shape="rect" coords="516,11,792,58" href="http://www.nu-heat.co.uk/s.nl/it.I/id.810/.f?sc=7&category=4043604" alt="" />\n' +
          '<area shape="rect" coords="823,13,962,62" href="'+ forms +'/app/site/crm/externalleadpage.nl?compid=472052&formid=401&h=dd6a98f0c604efb2ff93&redirect_count=1&did_javascript_redirect=T&ck=sk52wuCbAXv46-Tt&vid=sk52wtqbAUw6M7YE&cktime=105440" alt="" />\n' +
    '</map>\n' +
      '</div>\n' +
	'</div><!-- #content-->\n' +



'<div id="footer">\n' +
    '<div id="footercontent">\n' +
		
        '<div id="leftcolumn">\n' +
       
          '<p>Please note our offices are open Monday to Friday from 9.00am to 5.00pm and closed at weekends and bank holidays. Nu-Heat UK Ltd, Heathpark House, Devonshire Road, Honiton Devon, EX14 1SD Tel: 0800 731 1976 or 01404 549770 Fax :01404 549 771   </p>\n' +
          '<p class="SmallFooterText">&copy; 1997-2011 Nu-Heat UK Ltd. All rights reserved - <a href="/s.nl/it.I/id.650/.f">Privacy Policy</a><br>\n' +
'Registered in England. Reg. No. 3131852</p>\n' +
        '</div>\n' +
'<div id="rightcolumn"><blockquote><p>Nu-Heat has a team of people who are very conscientious; the staff are technically capable and very helpful.  We have a dedicated account manager who knows us personally</p>\n' +
'<p id="quotefoot">Simon Dimmock, <a href="http://www.towelrails.co.uk/Pop/ie/LandingPages/5-Neptune.html">Neptune Installations</a></p></blockquote><br />\n' +
'<img src="/core/media/media.nl?id=291342&amp;c=472052&amp;h=4be4fc0c38038cc14594" alt="Youtube and Twitter" width="250" height="44" border="0" align="right" usemap="#Map2"  />\n' +
'<map name="Map2">\n' +
  '<area shape="rect" coords="5,7,122,39" href="http://twitter.com/#!/nuheatuk">\n' +
  '<area shape="rect" coords="138,0,245,41" href="http://www.youtube.com/nuheatuk">\n' +
'</map>\n' +
'<br />\n' +
'<br />\n' +
'</div>\n' +
        
        
	'</div></div><!-- #footer -->\n' +


	
'</div><!-- #wrappertop -->\n' +
'</div><!-- #wrapperbottom -->\n' +
'<script type="text/javascript">\n' +
'var gaJsHost = (("https:" == document.location.protocol) ? "https://ssl." : "http://www.");\n' +
'document.write(unescape("%3Cscript src=\'" + gaJsHost + "google-analytics.com/ga.js\' type=\'text/javascript\'%3E%3C/script%3E"));\n' +
'</script>\n' +
'<script type="text/javascript">\n' +
'try {\n' +
'var pageTracker = _gat._getTracker("UA-801167-1");\n' +
'pageTracker._trackPageview();\n' +
'} catch(err) {}</script>\n' +
'<script language="javascript" type="text/javascript">\n' +
'var i=new Image();\n' +
'i.src=\'/app/site/hit/tracker.nl?c=472052&n=1&type=page&siteroot=Live+Hosting+Files&url=%2FOnline-UFH-Quote.html&referer=\'+escape(document.referrer);\n' +
'i.onload=function(){nsVoid();};\n' +
'function nsVoid(){return;};\n' +
'</script>\n' +

'</body>\n' +
'</html>';
	return htmlEnd	;
}


function createRooms(quotationID)
{
	nlapiLogExecution('DEBUG', 'custbody rooms list: ' + nlapiGetFieldValue('custbody_rooms_list') );
	var roomNames = nlapiGetFieldValue('custbody_rooms_list');
	nlapiLogExecution('DEBUG', 'roomNames: ' + roomNames);
	
	if (roomNames != null && roomNames != '')
	{
		nlapiLogExecution('DEBUG', 'Create Rooms Start');
		
		var roomsArray = roomNames.split('*');  
		var roomStatsArray = nlapiGetFieldValue('custbody_thermostat_list').split('*');
		var roomLevelArray = nlapiGetFieldValue('custbody_level_list').split('*');
		var roomAreaArray = nlapiGetFieldValue('custbody_sq_metres_list').split('*');
		var roomFCArray = nlapiGetFieldValue('custbody_floor_cons_list').split('*');
		
		var manifoldNumberArray = nlapiGetFieldValue('custbody_manifold_number_list').split('*');
		var designTempArray = nlapiGetFieldValue('custbody_design_temp_list').split('*');
		var manifoldLocArray = nlapiGetFieldValue('custbody_manifold_loc_list').split('*');
		
		var numberOfRooms = roomsArray.length;
		for (var i=1; i <= numberOfRooms; i++)
		{
			var roomNumber = i;
			var roomName = tildeTrim(RTrim(roomsArray.slice(i-1,i)));
			var roomStat = RTrim(roomStatsArray.slice(i-1,i));
			var roomLevel = roomLevelArray.slice(i-1,i);
			var roomArea = roomAreaArray.slice(i-1,i);
			if (isNaN(roomArea) == true)
				roomArea = '';
			var roomFC = RTrim(roomFCArray.slice(i-1,i));
			var manifoldNumber = RTrim(manifoldNumberArray.slice(i-1,i));
			if (isNaN(manifoldNumber) == true)
				manifoldNumber = '';
			var designTemp = RTrim(designTempArray.slice(i-1,i));
			if (isNaN(designTemp) == true)
				designTemp = '';
			var manifoldLoc = manifoldLocArray.slice(i-1,i);
			
			nlapiLogExecution('DEBUG', 'Room '+roomNumber+', '+roomName+'.','Detail:'+roomStat+','+roomLevel+','+roomArea+','+roomFC+'.');
			
			var roomsRecord = nlapiCreateRecord('customrecord_cad_rooms_list');
			roomsRecord.setFieldValue('name', roomName);
			roomsRecord.setFieldValue('custrecord_cad_rooms_quote', quotationID);
			roomsRecord.setFieldValue('custrecord_cad_room_number', roomNumber);
			roomsRecord.setFieldText('custrecord_cad_rooms_stats', roomStat);
			roomsRecord.setFieldValue('custrecord_cad_floor_level', roomLevel);
			roomsRecord.setFieldValue('custrecord_cad_room_area', roomArea);
			roomsRecord.setFieldText('custrecord_cad_floor_construction', roomFC);
			roomsRecord.setFieldValue('custrecord_cad_manifold_no', manifoldNumber);
			roomsRecord.setFieldValue('custrecord_cad_design_temp', designTemp);
			roomsRecord.setFieldValue('custrecord_cad_manifold_locations', manifoldLoc);
			nlapiSubmitRecord(roomsRecord,true,true);
		}
	}
}

function createUpgrades(quotationID,type)
{
	nlapiLogExecution('DEBUG', 'custbody_upgrades_itemid: ' + nlapiGetFieldValue('custbody_upgrades_itemid') );
	var itemID = nlapiGetFieldValue('custbody_upgrades_itemid');
	nlapiLogExecution('DEBUG', 'itemID: ' + itemID);
	
	if (itemID != null && itemID != '')
	{
		nlapiLogExecution('DEBUG', 'Create Upgrades Start');
		
		var itemIDArray = itemID.split('*');  
		var itemNameArray = nlapiGetFieldValue('custbody_upgrades_itemname').split('*');
		var itemDescArray = nlapiGetFieldValue('custbody_upgrades_itemdesc').split('*');
		var itemQtyArray = nlapiGetFieldValue('custbody_upgrades_itemqty').split('*');
		var discPriceArray = nlapiGetFieldValue('custbody_upgrades_discountedprice').split('*');
		var itemTypeArray = nlapiGetFieldValue('custbody_upgrades_itemtype').split('*');
		var optionTypeArray = nlapiGetFieldValue('custbody_upgrades_optiontype').split('*');					
		if (type == 'Underfloor Heating')
		{	
			var itemPriceArray = nlapiGetFieldValue('custbody_upgrades_itemprice').split('*');
			var itemCostArray = nlapiGetFieldValue('custbody_upgrades_itemcost').split('*');
			var ancAreaArray = nlapiGetFieldValue('custbody_upgrades_ancillaryarea').split('*');	
		}
		var numberOfUpgrades = itemIDArray.length;
		for (var i=1; i <= numberOfUpgrades; i++)
		{
			var itemID = RTrim(itemIDArray.slice(i-1,i));
			var itemName = itemNameArray.slice(i-1,i);
			var itemDesc = tildeTrim(RTrim(itemDescArray.slice(i-1,i)));
			var itemQty = RTrim(itemQtyArray.slice(i-1,i));
			var discPrice = RTrim(discPriceArray.slice(i-1,i));
			var itemType = itemTypeArray.slice(i-1,i);
			var optionType = optionTypeArray.slice(i-1,i);
		
			if (type == 'Underfloor Heating')
			{
				var itemPrice = RTrim(itemPriceArray.slice(i-1,i));
				var itemCost = RTrim(itemCostArray.slice(i-1,i));
				var ancArea = RTrim(ancAreaArray.slice(i-1,i));
			}
						
			var upgradesRecord = nlapiCreateRecord('customrecord_upgrades_and_extras');
			upgradesRecord.setFieldValue('custrecord_ex_itemid', itemID);
			upgradesRecord.setFieldValue('custrecord_ex_item_name', itemName);
			upgradesRecord.setFieldValue('custrecord_ex_quote_number', quotationID);
			upgradesRecord.setFieldValue('custrecord_ex_item_descr', itemDesc);
			upgradesRecord.setFieldValue('custrecord_ex_quantity', itemQty);
			upgradesRecord.setFieldValue('custrecord_ex_discount_price', discPrice);
			upgradesRecord.setFieldValue('custrecord_upgrade_item_type', itemType);
			upgradesRecord.setFieldValue('custrecord_upgrade_option_type', optionType);
			
			if (type == 'Underfloor Heating')
			{
				upgradesRecord.setFieldValue('custrecord_ex_item_price', itemPrice);
				upgradesRecord.setFieldValue('custrecord_ex_item_cost', itemCost);
				if(ancArea!= '0'){
					upgradesRecord.setFieldValue('custrecord_ancillary_area', ancArea);
				}
			}
			nlapiSubmitRecord(upgradesRecord,true,true);
		}
	}
}  

function loProCalc(type,name)
{
	if (name == 'custbody_lpxps10_area'){
		var upgradeCount = nlapiGetLineItemCount('recmachcustrecord_ex_quote_number');
		for (var i=1; i <= upgradeCount; i++)
		{
			var upgradeName = nlapiGetLineItemValue('recmachcustrecord_ex_quote_number', 'custrecord_ex_item_name', i);
			if (upgradeName == 'LPXPS10-C'){
				var unitPrice = nlapiGetLineItemValue('recmachcustrecord_ex_quote_number', 'custrecord_ex_discount_price', i);
				var itemDesc = nlapiGetLineItemValue('recmachcustrecord_ex_quote_number', 'custrecord_ex_item_descr', i);
				var itemArea = nlapiGetFieldValue('custbody_lpxps10_area');
				var itemPrice = Math.ceil(itemArea/0.72)*unitPrice;
				//alert('LPXPS10-C area = '+itemArea+', price per unit = '+unitPrice+', number of units = '+Math.ceil(itemArea/0.72)+', upgrade price ='+itemPrice);
				nlapiSetFieldValue('custbodylpxps10_price', itemPrice);
				nlapiSetFieldValue('custbody_lpxps10_desc', itemDesc);
			}
		}
	}	
	if (name == 'custbody_lppe515_area'){
		var upgradeCount = nlapiGetLineItemCount('recmachcustrecord_ex_quote_number');
		for (var i=1; i <= upgradeCount; i++)
		{
			var upgradeName = nlapiGetLineItemValue('recmachcustrecord_ex_quote_number', 'custrecord_ex_item_name', i);
			if (upgradeName == 'LPPE5/15-C'){
				var unitPrice = nlapiGetLineItemValue('recmachcustrecord_ex_quote_number', 'custrecord_ex_discount_price', i);
				var itemDesc = nlapiGetLineItemValue('recmachcustrecord_ex_quote_number', 'custrecord_ex_item_descr', i);
				var itemArea = nlapiGetFieldValue('custbody_lppe515_area');
				var itemPrice = Math.ceil(itemArea/15)*unitPrice;
				//alert('LPPE5/15-C area = '+itemArea+', price per unit = '+unitPrice+', number of units = '+Math.ceil(itemArea/15)+', upgrade price ='+itemPrice);
				nlapiSetFieldValue('custbody_lppe515_price', itemPrice);
				nlapiSetFieldValue('custbody_lppe515_desc', itemDesc);
			}
		}
	}
	if (name == 'custbody_lppg5_area'){
		var upgradeCount = nlapiGetLineItemCount('recmachcustrecord_ex_quote_number');
		for (var i=1; i <= upgradeCount; i++)
		{
			var upgradeName = nlapiGetLineItemValue('recmachcustrecord_ex_quote_number', 'custrecord_ex_item_name', i);
			if (upgradeName == 'LPPG/5-C'){
				var unitPrice = nlapiGetLineItemValue('recmachcustrecord_ex_quote_number', 'custrecord_ex_discount_price', i);
				var itemDesc = nlapiGetLineItemValue('recmachcustrecord_ex_quote_number', 'custrecord_ex_item_descr', i);
				var itemArea = nlapiGetFieldValue('custbody_lppg5_area');
				var itemPrice = Math.ceil(itemArea/20)*unitPrice;
				//alert('LPPG/5-C area = '+itemArea+', price per unit = '+unitPrice+', number of units = '+Math.ceil(itemArea/20)+', upgrade price ='+itemPrice);
				nlapiSetFieldValue('custbody_lppg5_price', itemPrice);
				nlapiSetFieldValue('custbody_lppg5_desc', itemDesc);
			}
		}
	}
	if (name == 'custbody_lpcb9_area'){
		var upgradeCount = nlapiGetLineItemCount('recmachcustrecord_ex_quote_number');
		for (var i=1; i <= upgradeCount; i++)
		{
			var upgradeName = nlapiGetLineItemValue('recmachcustrecord_ex_quote_number', 'custrecord_ex_item_name', i);
			if (upgradeName == 'LPCB/9-C'){
				var unitPrice = nlapiGetLineItemValue('recmachcustrecord_ex_quote_number', 'custrecord_ex_discount_price', i);
				var itemDesc = nlapiGetLineItemValue('recmachcustrecord_ex_quote_number', 'custrecord_ex_item_descr', i);
				var itemArea = nlapiGetFieldValue('custbody_lpcb9_area');
				var itemPrice = Math.ceil(itemArea/0.5)*unitPrice;
				//alert('LPCB/9-C area = '+itemArea+', price per unit = '+unitPrice+', number of units = '+Math.ceil(itemArea/0.5)+', upgrade price ='+itemPrice);
				nlapiSetFieldValue('custbody_lpcb9_price', itemPrice);
				nlapiSetFieldValue('custbody_lpcb9_desc', itemDesc);
			}
		}
	}	
}


function downloadHTML()
{
	quoteURL = nlapiGetFieldValue('custbody_quote_page_url');
	if (!quoteURL)
	{
		alert('No online quote present');
	}
	else
	{
		window.open(quoteURL+'&_xd=T&e=T');
	}
}

function termsAndConditions()
{
	var terms = '<div class="printlogo"><!--<div class="TC">--> \n' +
	'<h2 class="acc_trigger breakhere"><a href="#20" onclick="ga(\'send\', \'event\', \'quote\', \'Click\', \'terms-conditions\');"><div class="P-Header" >Terms and Conditions</div></a></h2> \n' +
	'<div class="acc_container">\n' +
	'<div class="block">\n' +
	'<table width="100%" border="0" style="font-size:8px; font-family:Arial, Helvetica, sans-serif"> \n' +
	'<tr> \n' +
		'<td width="25%" valign="top">NU-HEAT UK LIMITED<br> \n' +
		'Company No. 3131852 <br> \n' +
		'<strong>1. DEFINITION</strong> &quot;The Company&quot; means Nu-Heat U.K. Limited of Heathpark House, Devonshire Road, Heathpark Industrial \n' + 
		'Estate, Honiton, Devon EX14 1SD. &quot;The Conditions&quot; means the standard conditions of sale set out in this document and (unless the context \n' + 
		'otherwise requires) includes any special terms agreed in Writing between the Company and the Customer. &quot;The Contract&quot; means the contract for the \n' + 
		'sale and purchase of the Goods and/or Services. &quot;The Customer&quot; means any person contracting with the Company. &quot;Services&quot; means any \n' + 
		'service which the company is to provide in accordance with these Conditions. &quot;The Goods&quot; means the Goods (including any instalment of the \n' + 
		'goods or any parts for them) which the Company is to supply in accordance with these Conditions. &quot;Writing&quot; and any similar expression, includes \n' + 
		'a facsimile transmission, email, and other comparable means of communication.<br> \n' +
		
		'<strong>2. APPLICATION<br> \n' +
		'(a).</strong> THE Company&#39;s Conditions are set out below to the exclusion of all other conditions, and shall be incorporated in every offer, quotation, \n' + 
		'acceptance and the Contract for the sale or supply of Goods or services by the Company. No addition to, or variation of these Conditions will bind the \n' + 
		'Company unless it is specifically agreed in writing and signed by a Director of the Company. No agent or person employed by, or under contract with the \n' + 
		'Company has any authority to alter or vary in any way these Conditions except as stated above. <br> \n' +
		'<strong>(b).</strong> IF these Conditions are so varied then, subject to the express terms of that variation, these Conditions shall continue to apply \n' + 
		'as if that variation were incorporated in this Contract. If any document placing an order on the Company includes or refers to other conditions of \n' + 
		'contract then no account shall be taken of such other conditions. <br> \n' +
		'<strong>(c)</strong>.ANY typographical, clerical or other error or omission in any sales literature, quotation, price list, acceptance of offer, \n' + 
		'invoice or other document or information issued by the Company shall be subject to correction without any liability on the part of the Company. <br> \n' +
		
		'<strong>3. ACCEPTANCE OF ORDERS <br> \n' +
		'(a).</strong> ALL offers and quotations by the Company are given on the basis of prompt acceptance by the Customer and shall remain open for acceptance for \n' + 
		'a period of 90 days unless revoked, withdrawn or verified by the Company prior to such acceptance. <br> \n' +
		'<strong>(b)</strong>. THE Company shall sell and the Customer shall purchase the Goods in accordance with the Company&#39;s Written quotation (if accepted \n' + 
		'by the Customer), or the Customer&#39;s Written order (if accepted by the Company), to the exclusion of any other conditions subject to which any such \n' + 
		'quotation is accepted or purported to be accepted, or any such order is made, or purported to be made, by the Customer. <br> \n' +
		'<strong>(c)</strong>. A deposit representing 20% of the total purchase price as set out in the Company&#39;s quotation (&quot;the Deposit&quot;) shall be \n' + 
		'payable by the Customer to the Company when placing an order. Payment of the Deposit may be made by credit card, debit card or cheque.<br> \n' +
		'<strong>(d)</strong>. NO order submitted by a Customer shall be deemed to be accepted by the Company unless and until confirmed by the Company in \n' + 
		'writing.<br> \n' +
		'<strong>(e)</strong>. THE Customer shall be responsible to the Company for ensuring the accuracy of the terms of any order submitted by the Customer, \n' + 
		'and for giving the Company any necessary information relating to the Goods within a sufficient time to enable the Company to perform the Contract.<br> \n' +
		'<strong>(f)</strong>. ANY discrepancies contained in the quotation must be notified in writing to the Company within seven days or the Company will be \n' + 
		'entitled to assume that all details contained thereon are a correct and accurate interpretation of the Customer&#39;s requirements. <br> \n' +
		'<strong>(g)</strong>. AFTER the Company shall have acknowledged the Customer&#39;s order the Customer shall have a &#39;coolingoff&#39; period of seven working \n' + 
		'days in which to cancel the Contract (or any parts thereof). Cancellation of the Contract must be done in writing to the Company. After this period the \n' + 
		'Customer shall not be entitled to cancel the Contract (or any parts thereof) without the Written agreement of the Company. If the Contract (or any parts \n' + 
		'thereof) is cancelled at any time after the Company&#39;s acknowledgement of the Customer&#39;s order the Customer undertakes forthwith to pay the fair and \n' + 
		'reasonable cost of any or all work actually carried out by the Company prior to the date of such cancellation. Once the Customer has authorised commencement \n' + 
		'of any design work then that part of the Contract comes into force, and cannot be cancelled, irrespective of the &#39;cooling-off&#39; period and the Customer \n' + 
		'undertakes forthwith to pay the fair and reasonable cost of any or all work carried out by the Company. <br> \n' +
		
		'<strong>4. COMPANY SPECIFICATIONS</strong> ALL descriptions, specifications, drawings and particulars of layouts and dimensions submitted by the \n' + 
		'Company are to be deemed approximate only, and descriptions and illustrations in the Company&#39;s catalogues, price lists and other advertising matter shall \n' + 
		'not form any part of a Contract.</td> \n' +
		
		//'<td width="1%" valign="top">&nbsp;</td> \n' +
		
		'<td width="25%" valign="top"><strong>5. PRICES AND CHARGES<br> \n' +
		'(a)</strong>. UNTIL an order has become binding on the Company all prices are subject to change without prior notice.<br> \n' +
		'<strong>(b)</strong>. THE price of the Goods shall be the Company&#39;s quoted price. Prices quoted are exclusive of VAT (unless otherwise stated).<br>       \n' +
		'<strong>(c)</strong>. AFTER an order has become binding on the Company, all prices are subject to increase to reflect variations from time to time in \n' + 
		'costs which are due to any factor beyond the control of the Company (including without limitation, costs of materials, labour, transport and any tax, \n' + 
		'fee or charge imposed by the Government or other authority) or any change in delivery dates, quantities or specifications for the Goods which is \n' + 
		'requested by the Customer, or any delay caused by any instructions of the Customer or failure of the Customer to give the Company adequate information \n' + 
		'or instructions. <br> \n' +
		
		'<strong>6. INVOICES AND PAYMENT<br> \n' +
		'(a)</strong>. UNLESS otherwise deemed by the Company or stated in Writing the net invoice amount is payable prior to delivery of the Goods (&quot;the \n' + 
		'Due Date&quot;).<br> \n' +
		'<strong>(b)</strong>. IF the Customer defaults in payment the Company may, in addition to exercising rights as above, and without prejudice to any \n' + 
		'other right or remedy available to the Company cancel the contract and cancel any other orders received from the Customer.<br> \n' +
		'(<strong>c)</strong>. AFTER the Due Date interest will, at the discretion of the Company, be chargeable at a rate not greater than 5% above the base \n' + 
		'rate of Lloyds Bank Plc from time to time calculated, (&quot;the Base Rate&quot;), from the date payment was due until and including the date of actual \n' + 
		'payment. If any invoice is not paid on the Due Date all other invoices rendered by the Company shall thereupon be deemed due and immediately become \n' + 
		'payable in full<br> \n' +
		'<strong>(d)</strong>. IF the Customer issues a cheque which is not honoured on presentation or if the Company deems it necessary to arrange the special \n' + 
		'presentation of a cheque the Company reserves the right to debit the Customer with the cost of doing so.<br> \n' +
		
		'<strong>7. DELIVERY OF GOODS <br> \n' +
		'(a)</strong>. DELIVERY of the Goods shall be made by the Company delivering the Goods at the time and the place notified by the Customer or if the \n' + 
		'Customer wrongfully fails to take delivery of the Goods, the time when the Company has tendered delivery of the Goods. Where goods are sent to a \n' + 
		'destination outside the United Kingdom, the provisions of INCOTERMS shall apply.<br> \n' +
		'<strong>(b)</strong>. ANY time or date specified by the Company as the time at which or date on which the Goods will be delivered is given and intended \n' + 
		'as an estimate only and the Company shall not be liable for any loss, damage or expense howsoever arising from any delay in delivery howsoever caused. \n' + 
		'The time for delivery shall not be of the essence unless previously agreed by the Company in Writing. The Goods may be delivered by the Company in \n' + 
		'advance of the quoted delivery date upon giving reasonable notice to the Customer.<br> \n' +
		'<strong>(c)</strong>. THE Company reserves the right to make delivery by instalments unless otherwise expressly stipulated in the Contract, and these \n' + 
		'Conditions shall apply to each instalment delivery and any claim by the Customer in respect of any one or more instalments shall not entitle the \n' + 
		'Customer to treat the Contract as a whole as repudiated.<br> \n' +
		'<strong>(d)</strong>. IF the Company failed to deliver the Goods (or any instalment) for any reason other than any cause beyond the Company&#39;s \n' + 
		'reasonable control, or the Customers fault, and the Company is accordingly liable to the Customer, the Company&#39;s liability shall be limited to the \n' + 
		'excess (if any) of a cost to the Customer (in the cheapest available market) of similar goods to replace those not delivered over the price of the \n' + 
		'Goods.<br> \n' +
		'<strong>(e)</strong>. If the Customer fails to take delivery of the Goods or fails to give the Company adequate delivery instructions at the time \n' + 
		'stated for delivery, then, without limiting any other right or remedy available to the Company, the Company may:<br> \n' +
		'<strong>(i)</strong>. Store the Goods until actual delivery and charge the Customer for the reasonable costs (including insurance of storage); or<br>  \n' +
		'<strong>(ii)</strong>. Sell the Goods at the best price readily obtainable and (after deducting all reasonable storage and selling expenses) account to \n' + 
		'the Customer for the excess over the price under the Contract or charge the Customer for any shortfall below the price under the Contract (f). THE \n' + 
		'mode of transport shall be at the Company&#39;s discretion. For deliveries outside mainland Great Britain, the Company shall be entitled to charge all \n' + 
		'additional delivery costs to the Customer&#39;s account. <br> \n' +
		
		'<strong>8. INSPECTION OF GOODS DELIVERED</strong><br> \n' +
		'Goods must be carefully examined on arrival at the Customer&#39;s premises, and acceptance thereof duly signed for by the Customer or his appointed \n' + 
		'agent will be deemed to constitute acceptance by the Customer of the Goods in good condition and conformity in all respects with the order. <br> \n' +
		
		'<strong>9. DEFECTIVE GOODS <br> \n' +
		'(a)</strong>. SUBJECT to the exclusions set out in (b) below, the Company warrants that the Goods will correspond with their specification at the time of \n' +
		'</td> \n' +
		
		//'<td width="1%" valign="top">&nbsp;</td> \n' +
		
		'<td width="25%" valign="top">delivery and will be free from defects in material and workmanship from the date of delivery for the following periods: \n' + 
		'<strong>(i)</strong> Floor heating tube: 10 (ten) years <br> \n' +
		'<strong>(ii)</strong> All other goods: As per manufacturer&#39;s warranty <br> \n' +
		'<strong>(b)</strong>. THE above warranty is given by the Company subject to the following conditions: <br> \n' +
		'<strong>(i) </strong>THE Company shall be under no liability in respect of any defect in the goods arising from any drawing, design or specification \n' + 
		'supplied by the Customer;<br> \n' +
		'<strong>(ii)</strong> THE Company shall be under no liability in respect of any defect arising from fair wear or tear, wilful damage, negligence, \n' + 
		'abnormal working conditions, failure to follow the Company&#39;s instructions (whether oral or in Writing), misuse or alteration or repair of the goods \n' + 
		'without the Company&#39;s approval;<br> \n' +
		'<strong>(iii)</strong> THE Company shall be under no liability under the above warranty (or any other warranty, condition or guarantee) if the total \n' + 
		'price for the goods has not been paid by the Due Date for payment;<br> \n' +
		'<strong>(iv) </strong>THE above warranty does not extend to parts, materials or other equipment not manufactured by the Company, in respect of which \n' + 
		'the Customer shall only be entitled to the benefit of any such warranty or guarantee as is given by the manufacturer to the Company. <br> \n' +
		'<strong>(c)</strong>. A claim by the Customer which is based on any defect in the quality or condition of the Goods or their failure to correspond with \n' + 
		'specification shall (whether or not delivery is refused by the Customer) be notified to the Company within seven days from the date of delivery or \n' + 
		'(whether defect or failure was not apparent on reasonable inspection) within a reasonable time after discovery of the defect or failure. If delivery is \n' + 
		'not refused, and the Customer does not notify the Company accordingly, the Customer shall not be entitled to reject the Goods and the Company shall  \n' + 
		'have no liability for such defect or failure, and the Customer shall be bound to pay the price as if the Goods had been delivered in accordance with the \n' + 
		'Contract.<br> \n' +
		'<strong>(d)</strong>.WHERE Goods are returned by the Customer and accepted as defective by the Company, the Company shall at its option either repair \n' + 
		'or replace such Goods without cost to the Customer or allow the Customer to credit therefore. The Customer shall not be entitled to make any claim in \n' + 
		'respect of such Goods for work done thereon, transport costs, loss of profit on resale or in respect of any claim, loss, damage or expense whatsoever \n' + 
		'other than replacement cost.<br> \n' +
		'<strong>(e)</strong>. THE Customer shall not be entitled to withhold payment by reason of an alleged minor defect.<br> \n' +
		'<strong>(f)</strong>. EXCEPT as expressly provided in these Conditions, and except where the goods are sold to a person dealing as a consumer (within \n' + 
		'the meaning of Unfair Contract Terms Act 1977), all warranties, conditions or other terms implied by statute or common law are excluded. <br> \n' +
		'<strong>(g)</strong>. WHERE the Goods are sold under a consumer transaction (as defined by the Consumer Transactions (Restrictions on Statements) \n' + 
		'Order 1976) the statutory rights of the Customer are not affected by these conditions. <br> \n' +
		'<strong>(h)</strong>. EXCEPT in respect of death or personal injury caused by the Company&#39;s negligence, or liability for defective products under the \n' + 
		'Consumer Protection Act 1987 the Company shall not be liable to the Customer by reason of any representation, or any implied warranty, condition or \n' + 
		'other term, or any duty at common law under the express terms of the contract, for any consequential loss or damage (whether for loss of profit or \n' + 
		'otherwise), costs expenses or other claims for consequential compensation whatsoever (and whether caused by the negligence of the Company or its \n' + 
		'employees or agents or otherwise) which arise out of or in connection with the supply of the goods or their use or resale by the Customer, except as \n' + 
		'expressly provided in these Conditions. <br> \n' +
		
		'<strong>10. RISK AND PROPERTY<br> \n' +
		'(a)</strong>. RISK of damage to or loss of the Goods shall pass to the Customer:<br> \n' +
		'<strong>(i)</strong> in the case of Goods to be delivered at the Company&#39;s premises, at the time when the Company notifies the Customer that the Goods \n' + 
		'are available for collection; or<br> \n' +
		'<strong>(ii)</strong> in the case of Goods to be delivered otherwise than at the Company&#39;s premises, at the time of delivery or, if the Customer \n' + 
		'wrongfully fails to take delivery of the Goods, the time when the Company has tendered delivery of the Goods. <strong>(b)</strong>. NOTWITHSTANDING \n' + 
		'delivery and the passing of risk in the Goods, or any other provision of these Conditions, the property in the Goods shall not pass to the Customer \n' + 
		'until the Company has received in cash or cleared funds payment in full of the price of the Goods and all other goods agreed to be sold by the Company \n' + 
		'to the Customer for which payment is then due.<br>  \n' +
		'<strong>(c)</strong>. UNTIL such time as the property in the Goods passes to the Customer, the Customer shall hold the Goods as the Company&#39;s fiduciary \n' + 
		'agent and bailee, and shall keep the Goods separate from those of the Customer and third parties and properly stored, protected and insured and \n' + 
		'identified as the Company&#39;s property, but the Customer shall be entitled to re-sell or use the Goods in the ordinary course of its business. (d). UNTIL \n' + 
		'such time as the property in the Goods passes to the Customer (and provided the Goods are still in existence and have not been resold), the Company \n' + 
		'shall be entitled at any time to require the Buyer to deliver up the Goods to the Company</td> \n' +
		
		//'<td width="1%" valign="top">&nbsp;</td> \n' +
		
		'<td width="25%" valign="top">and, if the Buyer fails to do so forthwith, to enter upon any premises of the Buyer or any third party where the Goods are stored \n' + 
		'and repossess the Goods. (e). THE Customer shall not be entitled to pledge or in any way charge by way of security for any indebtedness any of the Goods \n' + 
		'which remain the property of the Company, but if the Customer does so all moneys owing by the Customer to the Company shall (without prejudice to any \n' + 
		'other right or remedy of the Company) forthwith become due and payable. <br> \n' +
		
		'<strong>11. INSTALLATION <br> \n' +
		'(a)</strong>.WHERE the Company provides installation work, or advice to the Customer, it warrants that such work shall be done or such advice given \n' + 
		'with reasonable skill and care.<br> \n' +
		'<strong>(b)</strong>. THE Company does not accept liability for any action or omission on the part of any approved installer or other person.<br> \n' +
		'<strong>(c)</strong>. IT is the responsibility of the Customer to obtain any required planning permission and to ensure that the work to be undertaken \n' + 
		'complies with building regulations including any LOCAL building code. <br> \n' +
		'<strong>(d)</strong>. THE Company shall not be liable in respect of any waste or damage to or interference with any water supply whether public or \n' + 
		'private whether under the Environmental Protection Act 1990, the Water Industries Act 1991, the Water Resources Act 1991 or otherwise in connection with \n' + 
		'the supply or installation of Goods and it shall be the Customer&#39;s responsibility to ensure that any reasonable requirements in respect of water \n' + 
		'supplies and the presence on land of waste are complied with fully. If a claim is made against the Company under any of the aforegoing legislation then \n' + 
		'the Customer shall indemnify the Company against all loss, damages, costs and expenses awarded against or incurred by the Company in connection with the \n' + 
		'claim.<br> \n' +
		
		'<strong>12. FORCE MAJEURE</strong> <br> \n' +
		'THE Company shall not be liable to the Customer to the extent that fulfilment of its obligation to the Customer has been prevented, hindered or \n' + 
		'delayed by force majeure as hereinafter defined and without limiting the generality of the foregoing the Company shall be entitled to cancel delivery in \n' + 
		'whole or in part when it is delayed in or prevented from making delivering by strikes, lock-outs, trade disputes or labour troubles or any cause beyond \n' + 
		'the Company+&#39;s control including, but without limitation, Act of God, embargo, or other Governmental Act, regulation or request, fire, accident, war, \n' + 
		'riot, delay in transportation, inability to obtain adequate labour, materials, or manufacturing facilities (&#39;force majeure&#39;), and the Company shall not \n' + 
		'be bound to obtain in the market goods with which to replace goods delivery of which has been cancelled as a result of any said events. <br> \n' +
		
		'<strong>13. PATENTS/MODIFICATIONS AND IMPROVEMENTS<br> \n' +
		'(a)</strong>. IN cases where the Customer provides drawings, designs, models or specifications, for the purpose of enabling the Company to fulfil the \n' + 
		'Contract, the Customer shall indemnify the Company against all actions, claims, costs, damages or losses arising from any infringement of letters \n' + 
		'patent, design, trademark or copyright protected by law in respect of such drawings, models or specifications or any Goods made or supplied by the \n' + 
		'Company in compliance therewith. (b). THE Company reserves the right to undertake such modifications or improvements to any of its products as shall be \n' + 
		'deemed necessary from time to time without any prior notification and such modifications or improvements shall not entitle the Customer to reject the \n' + 
		'Goods so improved or modified or any products previously supplied to the Customer prior to the modification or improvement being effected. <br> \n' +
		
		'<strong>14. MISCELLANEOUS <br> \n' +
		'(a)</strong>. A person who is not a party to the Contract has no right under the Contract (Rights of Third Parties) Act 1999 to enforce any term of the \n' + 
		'Contract but this does not affect any right or remedy of a third party which exists or is available apart from that Act.<br> \n' +
		'<strong>(b)</strong>. THE validity, construction, and performance of this contract shall be governed by the Law of England and be within the exclusive \n' + 
		'jurisdiction of the English Courts. <br> \n' +
		'<strong>(c)</strong>. ANY notice relating to these Conditions shall be in writing and may be served or delivered to the party to be served in the case \n' + 
		'of a Company at its registered office and in the case of an individual at his address notified in writing to the other party from time to time and \n' + 
		'notices sent by first class delivery mail shall be deemed to have been delivered seventy-two hours after posting and proof of due posting shall be \n' + 
		'sufficient evidence of delivery. <br> \n' +
		'<strong>(d)</strong>. THE headings of these Conditions are for ease of reference only and do not affect their construction and nor to they limit their \n' + 
		'scope.<br> \n' +
		'<strong>(e)</strong>. THE singular, where appropriate includes the plural and vice versa.<br> \n' +
		'<strong>(f)</strong>. IF any provision of these Conditions is held by any competent authority to be invalid or unenforceable in whole or in part the \n' + 
		'validity of the other provisions of these Conditions and the remainder of the provision in question shall not be affected thereby. <br> \n' +
		'<strong>(g)</strong>. NO waiver by the Company of any breach of the contract by the Customer shall be considered as a waiver of any subsequent breach \n' + 
		'of the same or any other provision.</td> \n' +
		'</tr> \n' +
	'</table> \n' +
	'</div></div></div> \n';

	return terms;
}

function floorConCheck(transaction, test)
{
	var floorConstructions = new Array();
	var floorConstructType = new Array();
//	var transRecord = nlapiLoadRecord('estimate', transaction);
	var floorConsType;
	var roomCount = nlapiGetLineItemCount('recmachcustrecord_cad_rooms_quote');
	for (var i=1; i <= roomCount; i++)
	{
		var floorConst = nlapiGetLineItemText('recmachcustrecord_cad_rooms_quote', 'custrecord_cad_floor_construction', i);
		var a = floorConstructions.indexOf(floorConst);
		if (a == -1)
		{
			floorConstructions.push(floorConst);
				floorConsType = lu_floor_cons_type[floorConst];
			var b = floorConstructType.indexOf(floorConsType);
			if (b == -1 && floorConsType != '')
			{
				floorConstructType.push(floorConsType);
			}
		}
	} 	
	return floorConstructType.indexOf(test);
}

function dataCenterURL()
{
	var URL = nlapiRequestURL(nlapiResolveURL('SUITELET',765,'customdeploy_data_center_url',true)).getBody();
	nlapiLogExecution('DEBUG', 'Suitelet dynamic discovery of Data Center', URL);
		
	return URL;
}

function dataCenterURLShopping()
{
	var URL = nlapiRequestURL(nlapiResolveURL('SUITELET',766,'customdeploy_data_center_url_shopping',true)).getBody();
	nlapiLogExecution('DEBUG', 'Suitelet dynamic discovery of Data Center Shopping', URL);
		
	return URL;
}

function dataCenterURLForms()
{
	var URL = nlapiRequestURL(nlapiResolveURL('SUITELET',767,'customdeploy_data_center_url_forms',true)).getBody();
	nlapiLogExecution('DEBUG', 'Suitelet dynamic discovery of Data Center Forms', URL);
		
	return URL;
}

function RTrim(str)
{ 
	var whitespace = new String(" \t\n\r");
	var s = new String(str);
	if (whitespace.indexOf(s.charAt(s.length-1)) != -1) // We have a string with trailing blank(s)...
	{ 
		var i = s.length - 1; // Get length of string 
		while (i >= 0 && whitespace.indexOf(s.charAt(i)) != -1)// Iterate from the far right of string until we don't have any more whitespace...
		i--; 
		s = s.substring(0, i+1);// Get the substring from the front of the string to where the last non-whitespace character is...
	}
	return s;
}

function tildeTrim(str)
{ 
	var tilde = new String("~");
	var s = new String(str);
	if (tilde.indexOf(s.charAt(s.length-1)) != -1) 
	{ 
		var i = s.length - 1; 
		while (i >= 0 && tilde.indexOf(s.charAt(i)) != -1)
		i--; 
		s = s.substring(0, i+1);
	}
	return s;
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

function handleNullNumber(value)
{
	if(!value || isNaN(value)){
		return '';
	}
	else return Math.round(value);
}

function showZero(value)
{
	if(!value){
		return '0';
	}
	else return value;
}

function showNA(value)
{
	if(!value){
		return 'N/A';
	}
	else return value;
}

function removeZero(value)
{
	if(value == '0'){
		return '';
	}
	else return value;
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

function twoDP(number)
{
	return Math.round(number*100)/100;
}
 

function oneDP(number)
{
	return Math.round(number*10)/10;
}

function fixedTwoDP(number)
{
	return parseFloat(number).toFixed(2);
}
 



// Lookup Arrays
// Floor construction description
var lu_floor_cons_desc = new Array();

lu_floor_cons_desc['ADPK(116)14'] = 'Acoustic brio floating floor';
lu_floor_cons_desc['ADPK(175)14'] = 'Acoustic brio floating floor';
lu_floor_cons_desc['ADPK(232)14'] = 'Acoustic brio floating floor';
lu_floor_cons_desc['ADPK14'] = 'Acoustic brio floating floor';
lu_floor_cons_desc['AKA14'] = 'Acoustic battens with Clippaplate';
lu_floor_cons_desc['ASC14'] = 'Acoustic screed with cliptrack&reg;';
lu_floor_cons_desc['ASCE14'] = 'Acoustic screed with cliptrack&reg;';
lu_floor_cons_desc['ASC17'] = 'Acoustic screed with cliprail';
lu_floor_cons_desc['ASL17'] = 'Acoustic screed with cliprail';
lu_floor_cons_desc['ASSC17'] = 'Acoustic screed with staples';
lu_floor_cons_desc['ASSL17'] = 'Acoustic screed with staples';
lu_floor_cons_desc['ATA(C)14'] = 'Acoustic battens with Clippaplate';
lu_floor_cons_desc['ATA(K)14'] = 'Acoustic battens with Clippaplate';
lu_floor_cons_desc['ATPAK14'] = 'Clippaplate with pipe clips and screws';
lu_floor_cons_desc['DPB(133)14'] = 'Diffuser plates between battens';
lu_floor_cons_desc['DPB(200)14'] = 'Diffuser plates between battens';
lu_floor_cons_desc['DPBK(133)14'] = 'Diffuser plates between battens';
lu_floor_cons_desc['DPBK(200)14'] = 'Diffuser plates between battens';
lu_floor_cons_desc['DPBL(133)14'] = 'Diffuser plates between battens';
lu_floor_cons_desc['DPBL(200)14'] = 'Diffuser plates between battens';
lu_floor_cons_desc['DPBLK(133)14'] = 'Diffuser plates between battens';
lu_floor_cons_desc['DPBLK(200)14'] = 'Diffuser plates between battens';
lu_floor_cons_desc['DPF(116)14'] = 'Floating floor with diffuser plates';
lu_floor_cons_desc['DPF(175)14'] = 'Floating floor with diffuser plates';
lu_floor_cons_desc['DPF(232)14'] = 'Floating floor with diffuser plates';
lu_floor_cons_desc['DPFK(116)14'] = 'Floating floor with diffuser plates';
lu_floor_cons_desc['DPFK(175)14'] = 'Floating floor with diffuser plates';
lu_floor_cons_desc['DPFK(232)14'] = 'Floating floor with diffuser plates';
lu_floor_cons_desc['DPJ(133)14'] = 'Diffuser plates between joists';
lu_floor_cons_desc['DPJ(200)14'] = 'Diffuser plates between joists';
lu_floor_cons_desc['DPJ4(600)14'] = 'Diffuser plates between joists';
lu_floor_cons_desc['DPJG(133)14'] = 'Diffuser plates between joists';
lu_floor_cons_desc['DPJG(200)14'] = 'Diffuser plates between joists';
lu_floor_cons_desc['DPJGK(133)14'] = 'Diffuser plates between joists';
lu_floor_cons_desc['DPJGK(200)14'] = 'Diffuser plates between joists';
lu_floor_cons_desc['DPJK(133)14'] = 'Diffuser plates between joists';
lu_floor_cons_desc['DPJK(200)14'] = 'Diffuser plates between joists';
lu_floor_cons_desc['DPL(116)14'] = 'Floating floor with diffuser plates';
lu_floor_cons_desc['DPL(175)14'] = 'Floating floor with diffuser plates';
lu_floor_cons_desc['DPL(232)14'] = 'Floating floor with diffuser plates';
lu_floor_cons_desc['DPLK(116)14'] = 'Floating floor with diffuser plates';
lu_floor_cons_desc['DPLK(175)14'] = 'Floating floor with diffuser plates';
lu_floor_cons_desc['DPLK(232)14'] = 'Floating floor with diffuser plates';
lu_floor_cons_desc['FD14'] = 'FastDeck&reg; with cement board';	//CJM May2018
lu_floor_cons_desc['LH14'] = 'Low profile timber floor';
lu_floor_cons_desc['LP10'] = 'LoPro&reg;10 routed panel';
lu_floor_cons_desc['LPL10'] = 'LoPro&reg;Lite floating floor';	//CJM June2018
lu_floor_cons_desc['LPM10'] = 'LoPro&reg;Max 10mm pipe';
lu_floor_cons_desc['LPM14'] = 'LoPro&reg;Max 14mm pipe';	//CJM Apr2018
lu_floor_cons_desc['AMC14'] = 'Acoustic LoPro&reg;Max, on cement';	//CJM Aug2017
lu_floor_cons_desc['AMT14'] = 'Acoustic LoPro&reg;Max, suspended timber';	//CJM Aug2017
lu_floor_cons_desc['SC10'] = 'Screed with cliptrack&reg;';
lu_floor_cons_desc['SC14'] = 'Screed with cliptrack&reg;';
lu_floor_cons_desc['SC17'] = 'Screed with cliptrack';
lu_floor_cons_desc['SCB14'] = 'Screed and battens with cliptrack&reg;';
lu_floor_cons_desc['SCS14'] = 'Screed directly over concrete';
lu_floor_cons_desc['SL14'] = 'Screed with cliptrack&reg;';
lu_floor_cons_desc['SL17'] = 'Screed with cliptrack';
lu_floor_cons_desc['SL20'] = 'Screed with cliptrack&reg;';
lu_floor_cons_desc['SM14'] = 'Screed with reinforcing mesh';
lu_floor_cons_desc['SM17'] = 'Screed with reinforcing mesh';
lu_floor_cons_desc['SM20'] = 'Screed with reinforcing mesh';
lu_floor_cons_desc['SMC14'] = 'Screed with reinforcing mesh';
lu_floor_cons_desc['SP14'] = 'Screed with fixing panel';
lu_floor_cons_desc['SSC17'] = 'Screed with staples';
lu_floor_cons_desc['SSL17'] = 'Screed with staples';
lu_floor_cons_desc['TPBA(300)14'] = 'Clippaplate between joists';
lu_floor_cons_desc['TPBA(400)14'] = 'Clippaplate between joists';
lu_floor_cons_desc['TPBA(600)14'] = 'Clippaplate between joists';
lu_floor_cons_desc['TPBA14'] = 'Clippaplate between joists';
lu_floor_cons_desc['TPBAK(300)14'] = 'Clippaplate between joists';
lu_floor_cons_desc['TPBAK(600)14'] = 'Clippaplate between joists';
lu_floor_cons_desc['TPBAK14'] = 'Clippaplate between joists';
lu_floor_cons_desc['TPBAK14'] = 'Clippaplate between joists';
lu_floor_cons_desc['TS14'] = 'Pug screed between joists';
lu_floor_cons_desc['TSB14'] = 'Pug screed between battens';
lu_floor_cons_desc['TSG14'] = 'Pug screed between joists';



// Floor construction webpage link - Info Sheets
var lu_floor_cons_link = new Array();

lu_floor_cons_link['ADPK(116)14'] = ' - <a href="/core/media/media.nl?id=206306&c=472052&h=f0f5c23b129b0837c362&_xt=.pdf" target="_blank">view floor construction</a>';
lu_floor_cons_link['ADPK(175)14'] = ' - <a href="/core/media/media.nl?id=206306&c=472052&h=f0f5c23b129b0837c362&_xt=.pdf" target="_blank">view floor construction</a>';
lu_floor_cons_link['ADPK(232)14'] = ' - <a href="/core/media/media.nl?id=206306&c=472052&h=f0f5c23b129b0837c362&_xt=.pdf" target="_blank">view floor construction</a>';
lu_floor_cons_link['ADPK14'] = ' - <a href="/core/media/media.nl?id=206306&c=472052&h=f0f5c23b129b0837c362&_xt=.pdf" target="_blank">view floor construction</a>';
lu_floor_cons_link['AKA14'] = ' - <a href="/core/media/media.nl?id=431456&c=472052&h=95472d9e545ab4e69c72&_xt=.pdf" target="_blank">view floor construction</a>';
lu_floor_cons_link['AMC14'] = ' - <a href="/core/media/media.nl?id=12651972&c=472052&h=e43d66f8921c2eb79e8d&_xt=.pdf" target="_blank">view floor construction</a>';	//CJM Aug2017
lu_floor_cons_link['AMT14'] = ' - <a href="/core/media/media.nl?id=12652074&c=472052&h=98979c225e389adbf62a&_xt=.pdf" target="_blank">view floor construction</a>';	//CJM Aug2017
lu_floor_cons_link['ASC14'] = ' - <a href="/core/media/media.nl?id=102773&c=472052&h=5862e02813437421fc68&_xt=.pdf" target="_blank">view floor construction</a>';
lu_floor_cons_link['ASCE14'] = '';
lu_floor_cons_link['ASC17'] = ' - <a href="/core/media/media.nl?id=10254258&c=472052&h=a3f07bdfa6e21cd7412d&_xt=.pdf" target="_blank">view floor construction</a>';
lu_floor_cons_link['ASL17'] = ' - <a href="/core/media/media.nl?id=10254258&c=472052&h=a3f07bdfa6e21cd7412d&_xt=.pdf" target="_blank">view floor construction</a>';
lu_floor_cons_link['ASSC17'] = ' - <a href="/core/media/media.nl?id=10254259&c=472052&h=1512a485aad56beeb1a9&_xt=.pdf" target="_blank">view floor construction</a>';
lu_floor_cons_link['ASSL17'] = ' - <a href="/core/media/media.nl?id=10254259&c=472052&h=1512a485aad56beeb1a9&_xt=.pdf" target="_blank">view floor construction</a>';
lu_floor_cons_link['ATA(C)14'] = ' - <a href="/core/media/media.nl?id=102780&c=472052&h=30716603aa11dec92ea8&_xt=.pdf" target="_blank">view floor construction</a>';
lu_floor_cons_link['ATA(K)14'] = ' - <a href="/core/media/media.nl?id=102777&c=472052&h=96c5ce973552885c43b9&_xt=.pdf" target="_blank">view floor construction</a>';
lu_floor_cons_link['ATPAK14'] = ' - <a href="/core/media/media.nl?id=5872162&c=472052&h=e4026aa7d5a987e1882b&_xt=.pdf" target="_blank">view floor construction</a>';
lu_floor_cons_link['DPB(133)14'] = ' - <a href="/core/media/media.nl?id=206309&c=472052&h=5053159156ba27faaca5&_xt=.pdf" target="_blank">view floor construction</a>';
lu_floor_cons_link['DPB(200)14'] = ' - <a href="/core/media/media.nl?id=206309&c=472052&h=5053159156ba27faaca5&_xt=.pdf" target="_blank">view floor construction</a>';
lu_floor_cons_link['DPBK(133)14'] = ' - <a href="/core/media/media.nl?id=300696&c=472052&h=81c541ba5ae5d74f18c2&_xt=.pdf" target="_blank">view floor construction</a>';
lu_floor_cons_link['DPBK(200)14'] = ' - <a href="/core/media/media.nl?id=300696&c=472052&h=81c541ba5ae5d74f18c2&_xt=.pdf" target="_blank">view floor construction</a>';
lu_floor_cons_link['DPBL(133)14'] = ' - <a href="/core/media/media.nl?id=206310&c=472052&h=1456dfccfdba27a61b2f&_xt=.pdf" target="_blank">view floor construction</a>';
lu_floor_cons_link['DPBL(200)14'] = ' - <a href="/core/media/media.nl?id=206310&c=472052&h=1456dfccfdba27a61b2f&_xt=.pdf" target="_blank">view floor construction</a>';
lu_floor_cons_link['DPBLK(133)14'] = ' - <a href="/core/media/media.nl?id=300700&c=472052&h=d9693779ab067183db87&_xt=.pdf" target="_blank">view floor construction</a>';
lu_floor_cons_link['DPBLK(200)14'] = ' - <a href="/core/media/media.nl?id=300700&c=472052&h=d9693779ab067183db87&_xt=.pdf" target="_blank">view floor construction</a>';
lu_floor_cons_link['DPF(116)14'] = ' - <a href="/core/media/media.nl?id=206312&c=472052&h=d6646f4846b7b1f38ef9&_xt=.pdf" target="_blank">view floor construction</a>';
lu_floor_cons_link['DPF(175)14'] = ' - <a href="/core/media/media.nl?id=206312&c=472052&h=d6646f4846b7b1f38ef9&_xt=.pdf" target="_blank">view floor construction</a>';
lu_floor_cons_link['DPF(232)14'] = ' - <a href="/core/media/media.nl?id=206312&c=472052&h=d6646f4846b7b1f38ef9&_xt=.pdf" target="_blank">view floor construction</a>';
lu_floor_cons_link['DPFK(116)14'] = ' - <a href="/core/media/media.nl?id=300716&c=472052&h=3cb772cc76c4ecc71278&_xt=.pdf" target="_blank">view floor construction</a>';
lu_floor_cons_link['DPFK(175)14'] = ' - <a href="/core/media/media.nl?id=300716&c=472052&h=3cb772cc76c4ecc71278&_xt=.pdf" target="_blank">view floor construction</a>';
lu_floor_cons_link['DPFK(232)14'] = ' - <a href="/core/media/media.nl?id=300716&c=472052&h=3cb772cc76c4ecc71278&_xt=.pdf" target="_blank">view floor construction</a>';
lu_floor_cons_link['DPJ(133)14'] = ' - <a href="/core/media/media.nl?id=206330&c=472052&h=47219a049b5d611a6878&_xt=.pdf" target="_blank">view floor construction</a>';
lu_floor_cons_link['DPJ(200)14'] = ' - <a href="/core/media/media.nl?id=206330&c=472052&h=47219a049b5d611a6878&_xt=.pdf" target="_blank">view floor construction</a>';
lu_floor_cons_link['DPJ4(600)14'] = ' - <a href="/core/media/media.nl?id=206330&c=472052&h=47219a049b5d611a6878&_xt=.pdf" target="_blank">view floor construction</a>';
lu_floor_cons_link['DPJG(133)14'] = ' - <a href="/core/media/media.nl?id=206329&c=472052&h=201369722f00c46cdd54&_xt=.pdf" target="_blank">view floor construction</a>';
lu_floor_cons_link['DPJG(200)14'] = ' - <a href="/core/media/media.nl?id=206329&c=472052&h=201369722f00c46cdd54&_xt=.pdf" target="_blank">view floor construction</a>';
lu_floor_cons_link['DPJGK(133)14'] = ' - <a href="/core/media/media.nl?id=300719&c=472052&h=ba8c4148d2b0e8c199f4&_xt=.pdf" target="_blank">view floor construction</a>';
lu_floor_cons_link['DPJGK(200)14'] = ' - <a href="/core/media/media.nl?id=300719&c=472052&h=ba8c4148d2b0e8c199f4&_xt=.pdf" target="_blank">view floor construction</a>';
lu_floor_cons_link['DPJK(133)14'] = ' - <a href="/core/media/media.nl?id=300720&c=472052&h=ec1677677eac1af85d9b&_xt=.pdf" target="_blank">view floor construction</a>';
lu_floor_cons_link['DPJK(200)14'] = ' - <a href="/core/media/media.nl?id=300720&c=472052&h=ec1677677eac1af85d9b&_xt=.pdf" target="_blank">view floor construction</a>';
lu_floor_cons_link['DPL(116)14'] = ' - <a href="/core/media/media.nl?id=206311&c=472052&h=a98056ac4939c5b7d1b1&_xt=.pdf" target="_blank">view floor construction</a>';
lu_floor_cons_link['DPL(175)14'] = ' - <a href="/core/media/media.nl?id=206311&c=472052&h=a98056ac4939c5b7d1b1&_xt=.pdf" target="_blank">view floor construction</a>';
lu_floor_cons_link['DPL(232)14'] = ' - <a href="/core/media/media.nl?id=206311&c=472052&h=a98056ac4939c5b7d1b1&_xt=.pdf" target="_blank">view floor construction</a>';
lu_floor_cons_link['DPLK(116)14'] = ' - <a href="/core/media/media.nl?id=300717&c=472052&h=51695a7ce9ef1c5d9315&_xt=.pdf" target="_blank">view floor construction</a>';
lu_floor_cons_link['DPLK(175)14'] = ' - <a href="/core/media/media.nl?id=300717&c=472052&h=51695a7ce9ef1c5d9315&_xt=.pdf" target="_blank">view floor construction</a>';
lu_floor_cons_link['DPLK(232)14'] = ' - <a href="/core/media/media.nl?id=300717&c=472052&h=51695a7ce9ef1c5d9315&_xt=.pdf" target="_blank">view floor construction</a>';
lu_floor_cons_link['FD14'] = ' - <a href="/core/media/media.nl?id=14898620&c=472052&h=9c73239878c134fe7425" target="_blank">view floor construction</a>';	// CJM May2018 ***** N.B. NOT THE ACTUAL DOCUMENT need to UPDATE WHEN AVAILABLE ******
lu_floor_cons_link['LH14'] = ' - <a href="http://www.nu-heat.co.uk/s.nl/it.I/id.434/.f" target="_blank">view floor construction</a>';
lu_floor_cons_link['LP10'] = ' - <a href="/core/media/media.nl?id=701246&c=472052&h=423a3a40d471402b4ef4&_xt=.pdf" target="_blank">view floor construction</a>';
lu_floor_cons_link['LPL10'] = ' - <a href="/core/media/media.nl?id=14920645&c=472052&h=5b848a6f82b71642db5d" target="_blank">view floor construction</a>';	// CJM June2018 ***** N.B. NOT THE ACTUAL DOCUMENT need to UPDATE WHEN AVAILABLE ******
lu_floor_cons_link['LPM10'] = ' - <a href="/core/media/media.nl?id=3531455&c=472052&h=33c920155499a822a89f&_xt=.pdf" target="_blank">view floor construction</a>';
lu_floor_cons_link['LPM14'] = ' - <a href="/core/media/media.nl?id=14206856&c=472052&h=f1d37c5b15c57a8e74b3&_xt=.pdf" target="_blank">view floor construction</a>';
lu_floor_cons_link['SC10'] = '';
lu_floor_cons_link['SC14'] = ' - <a href="/core/media/media.nl?id=102809&c=472052&h=d71263474e81063ce07d&_xt=.pdf" target="_blank">view floor construction</a>';
lu_floor_cons_link['SCB14'] = ' - <a href="/core/media/media.nl?id=102812&c=472052&h=a7b75d205dc23ae65194&_xt=.pdf" target="_blank">view floor construction</a>';
lu_floor_cons_link['SCS14'] = ' - <a href="/core/media/media.nl?id=102814&c=472052&h=fb86c4ae8f0814eefb2c&_xt=.pdf" target="_blank">view floor construction</a>';
lu_floor_cons_link['SC17'] = ' - <a href="/core/media/media.nl?id=10254366&c=472052&h=407d3b9d4d310d0fc5eb&_xt=.pdf" target="_blank">view floor construction</a>';
lu_floor_cons_link['SL14'] = ' - <a href="/core/media/media.nl?id=102816&c=472052&h=dfb8d4e17f0cc3ea4790&_xt=.pdf" target="_blank">view floor construction</a>';
lu_floor_cons_link['SL17'] = ' - <a href="/core/media/media.nl?id=10255078&c=472052&h=320015dab30f6d8703c2&_xt=.pdf" target="_blank">view floor construction</a>';
lu_floor_cons_link['SL20'] = ' - <a href="/core/media/media.nl?id=736683&c=472052&h=910952832bd1cc13f36a&_xt=.pdf" target="_blank">view floor construction</a>';
lu_floor_cons_link['SM14'] = ' - <a href="/core/media/media.nl?id=102819&c=472052&h=eae3d7557d60b4c63c10&_xt=.pdf" target="_blank">view floor construction</a>';
lu_floor_cons_link['SM20'] = '';
lu_floor_cons_link['SMC14'] = '';
lu_floor_cons_link['SM17'] = ' - <a href="/core/media/media.nl?id=10254672&c=472052&h=1f7d4a7482f3f555d318&_xt=.pdf" target="_blank">view floor construction</a>';
lu_floor_cons_link['SSC17'] = ' - <a href="/core/media/media.nl?id=10254673&c=472052&h=6abd869055214f36f211&_xt=.pdf" target="_blank">view floor construction</a>';
lu_floor_cons_link['SSL17'] = ' - <a href="/core/media/media.nl?id=10254673&c=472052&h=6abd869055214f36f211&_xt=.pdf" target="_blank">view floor construction</a>';
lu_floor_cons_link['SP14'] = ' - <a href="/core/media/media.nl?id=102823&c=472052&h=20737e99f7e83945f079&_xt=.pdf" target="_blank">view floor construction</a>';
lu_floor_cons_link['TPBA(300)14'] = ' - <a href="/core/media/media.nl?id=102801&c=472052&h=1d5df819944134931841&_xt=.pdf" target="_blank">view floor construction</a>';
lu_floor_cons_link['TPBA(400)14'] = ' - <a href="/core/media/media.nl?id=102801&c=472052&h=1d5df819944134931841&_xt=.pdf" target="_blank">view floor construction</a>';
lu_floor_cons_link['TPBA(600)14'] = ' - <a href="/core/media/media.nl?id=102801&c=472052&h=1d5df819944134931841&_xt=.pdf" target="_blank">view floor construction</a>';
lu_floor_cons_link['TPBA14'] = ' - <a href="/core/media/media.nl?id=102801&c=472052&h=1d5df819944134931841&_xt=.pdf� target="_blank">view floor construction</a>';
lu_floor_cons_link['TPBAK(300)14'] = ' - <a href="/core/media/media.nl?id=300721&c=472052&h=1c54e51ac0372e87748e&_xt=.pdf" target="_blank">view floor construction</a>';
lu_floor_cons_link['TPBAK(600)14'] = ' - <a href="/core/media/media.nl?id=300721&c=472052&h=1c54e51ac0372e87748e&_xt=.pdf� target="_blank">view floor construction</a>';
lu_floor_cons_link['TPBAK14'] = ' - <a href="/core/media/media.nl?id=300721&c=472052&h=1c54e51ac0372e87748e&_xt=.pdf" target="_blank">view floor construction</a>';
lu_floor_cons_link['TPBAK14'] = ' - <a href="/core/media/media.nl?id=300721&c=472052&h=1c54e51ac0372e87748e&_xt=.pdf� target="_blank">view floor construction</a>';
lu_floor_cons_link['TS14'] = ' - <a href="/core/media/media.nl?id=102803&c=472052&h=3c2a470e24c69cf83268&_xt=.pdf" target="_blank">view floor construction</a>';
lu_floor_cons_link['TSB14'] = ' - <a href="http://www.nu-heat.co.uk/s.nl/it.I/id.118/.f" target="_blank">view floor construction</a>';
lu_floor_cons_link['TSG14'] = ' - <a href="/core/media/media.nl?id=102807&c=472052&h=5d98036c5a9e6c8b749c&_xt=.pdf" target="_blank">view floor construction</a>';


//Floor construction types
var lu_floor_cons_type = new Array();

lu_floor_cons_type['ADPK(116)14']= '';
lu_floor_cons_type['ADPK(175)14']= '';
lu_floor_cons_type['ADPK(232)14']= '';
lu_floor_cons_type['ADPK14']= '';
lu_floor_cons_type['AMC14']= 'AcoustiMax Floors';	//CJM Aug2017
lu_floor_cons_type['AMT14']= 'AcoustiMax Floors';	//CJM Aug2017
lu_floor_cons_type['AKA14']= '';
lu_floor_cons_type['ASC14']= 'Acoustic Floors';
lu_floor_cons_type['ASCE14']= 'Acoustic Floors';
lu_floor_cons_type['ASC17']= 'Acoustic Floors';
lu_floor_cons_type['ASL17']= 'Acoustic Floors';
lu_floor_cons_type['ASSC17']= 'Acoustic Floors';
lu_floor_cons_type['ASSL17']= 'Acoustic Floors';
lu_floor_cons_type['ATA(C)14']= '';
lu_floor_cons_type['ATA(K)14']= '';
lu_floor_cons_type['ATPAK14']= '';
lu_floor_cons_type['DPB(133)14']= '';
lu_floor_cons_type['DPB(200)14']= '';
lu_floor_cons_type['DPBK(133)14']= '';
lu_floor_cons_type['DPBK(200)14']= '';
lu_floor_cons_type['DPBL(133)14']= '';
lu_floor_cons_type['DPBL(200)14']= '';
lu_floor_cons_type['DPBLK(133)14']= '';
lu_floor_cons_type['DPBLK(200)14']= '';
lu_floor_cons_type['DPF(116)14']= 'Floating Floors';
lu_floor_cons_type['DPF(175)14']= 'Floating Floors';
lu_floor_cons_type['DPF(232)14']= 'Floating Floors';
lu_floor_cons_type['DPFK(116)14']= 'Floating Floors';
lu_floor_cons_type['DPFK(175)14']= 'Floating Floors';
lu_floor_cons_type['DPFK(232)14']= 'Floating Floors';
lu_floor_cons_type['DPJ(133)14']= '';
lu_floor_cons_type['DPJ(200)14']= '';
lu_floor_cons_type['DPJ4(600)14']= '';
lu_floor_cons_type['DPJG(133)14']= '';
lu_floor_cons_type['DPJG(200)14']= '';
lu_floor_cons_type['DPJGK(133)14']= '';
lu_floor_cons_type['DPJGK(200)14']= '';
lu_floor_cons_type['DPJK(133)14']= '';
lu_floor_cons_type['DPJK(200)14']= '';
lu_floor_cons_type['DPL(116)14']= '';
lu_floor_cons_type['DPL(175)14']= '';
lu_floor_cons_type['DPL(232)14']= '';
lu_floor_cons_type['DPLK(116)14']= '';
lu_floor_cons_type['DPLK(116)14']= '';
lu_floor_cons_type['DPLK(232)14']= '';
lu_floor_cons_type['FD14']= 'FastDeck Floors';	// CJM May2018
lu_floor_cons_type['LH14']= 'LH14 Floors';
lu_floor_cons_type['LP10']= 'LoPro Floors';
lu_floor_cons_type['LPL10']= 'LoProLite Floors';	// CJM June2018
lu_floor_cons_type['LPM10']= 'LoProMax Floors';
lu_floor_cons_type['LPM14']= 'LoProMax14 Floors';	//CJM Apr2018
lu_floor_cons_type['SC10']= 'Screed Floors';
lu_floor_cons_type['SC14']= 'Screed Floors';
lu_floor_cons_type['SC17']= 'Screed Floors';
lu_floor_cons_type['SCB14']= '';
lu_floor_cons_type['SCS14']= '';
lu_floor_cons_type['SL14']= 'Screed Floors';
lu_floor_cons_type['SL17']= 'Screed Floors';
lu_floor_cons_type['SL20']= '';
lu_floor_cons_type['SM14']= '';
lu_floor_cons_type['SM17']= '';
lu_floor_cons_type['SM20']= '';
lu_floor_cons_type['SMC14']= '';
lu_floor_cons_type['SP14']= '';
lu_floor_cons_type['SSC17']= 'Screed Floors';
lu_floor_cons_type['SSE14']= '';
lu_floor_cons_type['SSE20']= '';
lu_floor_cons_type['SSL17']= 'Screed Floors';
lu_floor_cons_type['SSP14']= '';
lu_floor_cons_type['SSP20']= '';
lu_floor_cons_type['SST14']= '';
lu_floor_cons_type['SST20']= '';
lu_floor_cons_type['TPBA(300)14']= 'Suspended Timber Floors';
lu_floor_cons_type['TPBA(400)14']= 'Suspended Timber Floors';
lu_floor_cons_type['TPBA(600)14']= 'Suspended Timber Floors';
lu_floor_cons_type['TPBA14']= 'Suspended Timber Floors';
lu_floor_cons_type['TPBAK(300)14']= 'Suspended Timber Floors';
lu_floor_cons_type['TPBAK(600)14']= 'Suspended Timber Floors';
lu_floor_cons_type['TPBAK14']= 'Suspended Timber Floors';
lu_floor_cons_type['TPBAK14']= 'Suspended Timber Floors';
lu_floor_cons_type['TS14']= '';
lu_floor_cons_type['TSB14']= '';
lu_floor_cons_type['TSG14']= '';

var lu_floor_cons_pic = new Array();
lu_floor_cons_pic['Acoustic Floors'] = '<a href="/core/media/media.nl?id=1852995&c=472052&h=92da467e9084a458c8a8" rel="lightbox[plants]" title="An example of an acoustic floor construction."><img src="/core/media/media.nl?id=1852996&c=472052&h=86460dae41b9ad973575" alt="Acoustic Floor Construction" /></a>';
lu_floor_cons_pic['Floating Floors'] = '<a href="/core/media/media.nl?id=1853006&c=472052&h=97a95ba7f66904ec1d7e" rel="lightbox[plants]" title="An example of a floating floor construction."><img src="/core/media/media.nl?id=1853005&c=472052&h=d814017def1ecdf871ad" alt="Floating Floor Construction" /></a>';
lu_floor_cons_pic['LoPro Floors'] = '<a href="/core/media/media.nl?id=7088624&c=472052&h=83a1969ad707e85c2540" rel="lightbox[plants]" title="An example of a LoPro panel with self-levelling compound edge."><img src="/core/media/media.nl?id=1853003&c=472052&h=a29448b2cf3b3e5e7aec" alt="LoPro Floor Construction" /></a> </p></td>\n <td><p><span style="color:#337BBD; font-weight:bold;">&nbsp;</span><br> <a href="/core/media/media.nl?id=1853520&c=472052&h=76ae2266e42d847bcc04" rel="lightbox[plants]" title="An example of a LoPro joist floor construction."><img src="/core/media/media.nl?id=1853521&c=472052&h=3c956e0c3245cb8b745e" alt="LoPro Floor Construction" /></a>';
lu_floor_cons_pic['Screed Floors'] = '<a href="/core/media/media.nl?id=1853002&c=472052&h=bcead63669f94c59fdb8" rel="lightbox[plants]" title="An example of a screed floor construction."><img src="/core/media/media.nl?id=1853001&c=472052&h=7039340bad8f42447ac4" alt="Screed Floor Construction" /></a>';
lu_floor_cons_pic['Suspended Timber Floors'] = '<a href="/core/media/media.nl?id=9530072&c=472052&h=e4b8dedff39d07088db6" rel="lightbox[plants]" title="An example of a suspended timber floor construction."><img src="/core/media/media.nl?id=9530173&c=472052&h=8500e734d9125ed6a3d7" alt="Suspended Timber Floor Construction" /></a>';
lu_floor_cons_pic['AcoustiMax Floors'] = '<a href="/core/media/media.nl?id=1852995&c=472052&h=92da467e9084a458c8a8" rel="lightbox[plants]" title="An example of an acoustic floor construction."><img src="/core/media/media.nl?id=1852996&c=472052&h=86460dae41b9ad973575" alt="Acoustic Floor Construction" /></a>';	//CJM Aug2017
lu_floor_cons_pic['FastDeck Floors'] = '<a href="/core/media/media.nl?id=14762616&c=472052&h=86fa96f9b472d3d6e3a3" rel="lightbox[plants]" title="An example of an FastDeck&reg; floor construction."><img src="/core/media/media.nl?id=1852996&c=472052&h=86460dae41b9ad973575" alt="FastDeck&reg; Floor Construction" /></a>';	//CJM May2018 FastDeck
lu_floor_cons_pic['LoProLite Floors'] = '<a href="/core/media/media.nl?id=14920644&c=472052&h=3173a8688c62729a19dc" rel="lightbox[plants]" title="An example of a LoPro&reg;Lite floor construction."><img src="/core/media/media.nl?id=14920644&c=472052&h=3173a8688c62729a19dc" alt="LoPro&reg;Lite Floor Construction" /></a>';	//CJM June2018 LoPro&reg;Lite

var lu_srp_rating = new Array();
lu_srp_rating['A+++'] = '<img src="/core/media/media.nl?id=14227093&c=472052&h=2f6d1bc52d01dc479bb2" alt="A+++" style="float: none; background: none; border: 0px; margin: 0; padding: 0;">';
lu_srp_rating['A++'] = '<img src="/core/media/media.nl?id=14227126&c=472052&h=38a8c9952d04f4acce62" alt="A++" style="float: none; background: none; border: 0px; margin: 0; padding: 0;">';
lu_srp_rating['A+'] = '<img src="/core/media/media.nl?id=14227131&c=472052&h=8f6ba8535e083f0ab418" alt="A+" style="float: none; background: none; border: 0px; margin: 0; padding: 0;">';
lu_srp_rating['A'] = '<img src="/core/media/media.nl?id=14227124&c=472052&h=accd80e2459b72598b0c" alt="A" style="float: none; background: none; border: 0px; margin: 0; padding: 0;">';
lu_srp_rating['B'] = '<img src="/core/media/media.nl?id=14227105&c=472052&h=e65e5093578e788d2de8" alt="B" style="float: none; background: none; border: 0px; margin: 0; padding: 0;">';
lu_srp_rating['C'] = '<img src="/core/media/media.nl?id=14227114&c=472052&h=3c1a4f2beecf119e41c2" alt="C" style="float: none; background: none; border: 0px; margin: 0; padding: 0;">';
lu_srp_rating['D'] = '<img src="/core/media/media.nl?id=14227092&c=472052&h=462211818a30702a31f0" alt="D" style="float: none; background: none; border: 0px; margin: 0; padding: 0;">';
lu_srp_rating['E'] = '<img src="/core/media/media.nl?id=14227098&c=472052&h=4bec376baffdc7423329" alt="E" style="float: none; background: none; border: 0px; margin: 0; padding: 0;">';
lu_srp_rating['F'] = '<img src="/core/media/media.nl?id=14227090&c=472052&h=3a74b05846207df8a49b" alt="F" style="float: none; background: none; border: 0px; margin: 0; padding: 0;">';
lu_srp_rating['G'] = '<img src="/core/media/media.nl?id=14227137&c=472052&h=7a35ff364a892e199725" alt="G" style="float: none; background: none; border: 0px; margin: 0; padding: 0;">';


//Solar schematic image
var lu_sol_schematic_image = new Array();
lu_sol_schematic_image['SC04'] = '<tr><td colspan="2" align="center" valign="top"><img border=0 src="/core/media/media.nl?id=1043483&c=472052&h=ce3a4a7f198edb39b589"></td></tr>\n';
lu_sol_schematic_image['SC04B'] = '<tr><td colspan="2" align="center" valign="top"><img border=0 src="/core/media/media.nl?id=1043482&c=472052&h=53152bfc4f47aaf0127e"></td></tr>\n';
lu_sol_schematic_image['SC05'] = '<tr><td colspan="2" align="center" valign="top"><img border=0 src="/core/media/media.nl?id=1043484&c=472052&h=145b4104e62b31af2e93"></td></tr>\n';
lu_sol_schematic_image['SP02'] = '<tr><td colspan="2" align="center" valign="top"><img border=0 src="/core/media/media.nl?id=1043485&c=472052&h=8fe08a5ee12f591cbbed"></td></tr>\n';
lu_sol_schematic_image['SP03'] = '<tr><td colspan="2" align="center" valign="top"><img border=0 src="/core/media/media.nl?id=1043486&c=472052&h=5e8b068b5669635c84a3"></td></tr>\n';
lu_sol_schematic_image['SU01'] = '<tr><td colspan="2" align="center" valign="top"><img border=0 src="/core/media/media.nl?id=1043481&c=472052&h=162a4d70eef8969ab9e5"></td></tr>\n';
lu_sol_schematic_image['ST01'] = '<tr><td colspan="2" align="center" valign="top"><img border=0 src="/core/media/media.nl?id=2993483&c=472052&h=49785f3caff9a0414a8e"></td></tr>\n';
//new values added for the new solar quote 28/01/2014
lu_sol_schematic_image['SH02'] = '<tr><td colspan="2" align="center" valign="top"><img border=0 src="/core/media/media.nl?id=1043483&c=472052&h=ce3a4a7f198edb39b589"></td></tr>\n';
lu_sol_schematic_image['SU02'] = '<tr><td colspan="2" align="center" valign="top"><img border=0 src="/core/media/media.nl?id=1043481&c=472052&h=162a4d70eef8969ab9e5"></td></tr>\n';
lu_sol_schematic_image['ST02'] = '<tr><td colspan="2" align="center" valign="top"><img border=0 src="/core/media/media.nl?id=2993483&c=472052&h=49785f3caff9a0414a8e"></td></tr>\n';


//Heatpump schematic image
var lu_hp_schematic_image = new Array();
lu_hp_schematic_image['A11'] = '<tr><td colspan="3" align="center" valign="top"><img border=0 src="/core/media/media.nl?id=1042862&c=472052&h=2c2dd6deaf5d45c6755f"></td></tr>\n';
lu_hp_schematic_image['A14'] = '<tr><td colspan="3" align="center" valign="top"><img border=0 src="/core/media/media.nl?id=1042863&c=472052&h=f9992764ba79315b4ffa"></td></tr>\n';
lu_hp_schematic_image['A14-S'] = '<tr><td colspan="3" align="center" valign="top"><img border=0 src="/core/media/media.nl?id=1042864&c=472052&h=221fb2a45eb1b488cbd1"></td></tr>\n';
lu_hp_schematic_image['A15'] = '<tr><td colspan="3" align="center" valign="top"><img border=0 src="/core/media/media.nl?id=1042865&c=472052&h=d406284bd4263d66e229"></td></tr>\n';
lu_hp_schematic_image['A16'] = '<tr><td colspan="3" align="center" valign="top"><img border=0 src="/core/media/media.nl?id=1042866&c=472052&h=d0c54e1acdc638d612e0"></td></tr>\n';
lu_hp_schematic_image['A16-S'] = '<tr><td colspan="3" align="center" valign="top"><img border=0 src="/core/media/media.nl?id=1042867&c=472052&h=becc7cf9efa5de5369bc"></td></tr>\n';
lu_hp_schematic_image['B11'] = '<tr><td colspan="3" align="center" valign="top"><img border=0 src="/core/media/media.nl?id=1042868&c=472052&h=d40225fb598e251cd9d2"></td></tr>\n';
lu_hp_schematic_image['B11-S'] = '<tr><td colspan="3" align="center" valign="top"><img border=0 src="/core/media/media.nl?id=1042869&c=472052&h=4731fb7c816d3820bb36"></td></tr>\n';
lu_hp_schematic_image['C05'] = '';
lu_hp_schematic_image['c07.1'] = '';
lu_hp_schematic_image['C09'] = '';

lu_hp_schematic_image['C20'] = '<tr><td colspan="3" align="center" valign="top"><img border=0 src="/core/media/media.nl?id=4976985&c=472052&h=49a4f9b515161bf5bda4"></td></tr>\n';
lu_hp_schematic_image['C21'] = '<tr><td colspan="3" align="center" valign="top"><img border=0 src="/core/media/media.nl?id=4976986&c=472052&h=4cb56f39a59062580f20"></td></tr>\n';
lu_hp_schematic_image['C21-S'] = '<tr><td colspan="3" align="center" valign="top"><img border=0 src="/core/media/media.nl?id=4976987&c=472052&h=49d1e96a62cd340336ce"></td></tr>\n';
lu_hp_schematic_image['C22'] = '<tr><td colspan="3" align="center" valign="top"><img border=0 src="/core/media/media.nl?id=4976988&c=472052&h=5ef16ae89685b611d297"></td></tr>\n';
lu_hp_schematic_image['C23'] = '<tr><td colspan="3" align="center" valign="top"><img border=0 src="/core/media/media.nl?id=4976989&c=472052&h=c61f54fa38a78efd9781"></td></tr>\n';
lu_hp_schematic_image['C23-S'] = '<tr><td colspan="3" align="center" valign="top"><img border=0 src="/core/media/media.nl?id=4976990&c=472052&h=728bc4a9ebd787cb0b25"></td></tr>\n';

lu_hp_schematic_image['C24'] = '<tr><td colspan="3" align="center" valign="top"><img border=0 src="/core/media/media.nl?id=5939094&c=472052&h=2f042af110cd004125eb"></td></tr>\n';
lu_hp_schematic_image['C25'] = '<tr><td colspan="3" align="center" valign="top"><img border=0 src="/core/media/media.nl?id=5939095&c=472052&h=125b04cb7fd570ffcd52"></td></tr>\n';
lu_hp_schematic_image['C25-S'] = '<tr><td colspan="3" align="center" valign="top"><img border=0 src="/core/media/media.nl?id=5939096&c=472052&h=9626589fdfa38ab6077b"></td></tr>\n';

lu_hp_schematic_image['CSG23'] = '';
lu_hp_schematic_image['CSG34'] = '';
lu_hp_schematic_image['CSG47'] = '';
lu_hp_schematic_image['CSG57'] = '';
lu_hp_schematic_image['D01'] = '';
lu_hp_schematic_image['D02'] = '';
lu_hp_schematic_image['D03'] = '';
lu_hp_schematic_image['D04'] = '';
lu_hp_schematic_image['E01'] = '';
lu_hp_schematic_image['H03'] = '';
lu_hp_schematic_image['H04'] = '';
lu_hp_schematic_image['H04-S'] = '';
lu_hp_schematic_image['H06'] = '';
lu_hp_schematic_image['H07'] = '';
lu_hp_schematic_image['H23'] = '<tr><td colspan="3" align="center" valign="top"><img border=0 src="/core/media/media.nl?id=1042870&c=472052&h=17222bba2e8dbdfc3d33"></td></tr>\n';
lu_hp_schematic_image['H24'] = '<tr><td colspan="3" align="center" valign="top"><img border=0 src="/core/media/media.nl?id=1042871&c=472052&h=1b7912a61cede465df06"></td></tr>\n';
lu_hp_schematic_image['H24-S'] = '<tr><td colspan="3" align="center" valign="top"><img border=0 src="/core/media/media.nl?id=1042858&c=472052&h=d755bde661381bb7b01b"></td></tr>\n';
lu_hp_schematic_image['H27DUAL'] = '<tr><td colspan="3" align="center" valign="top"><img border=0 src="/core/media/media.nl?id=2336693&c=472052&h=138faceba44e2d3869ed"></td></tr>\n';
lu_hp_schematic_image['H28DUAL'] = '<tr><td colspan="3" align="center" valign="top"><img border=0 src="/core/media/media.nl?id=2336692&c=472052&h=3562bd11e65faf8abe30"></td></tr>\n';
lu_hp_schematic_image['H28-SDUAL'] = '<tr><td colspan="3" align="center" valign="top"><img border=0 src="/core/media/media.nl?id=2336691&c=472052&h=820ff2b0429113792749"></td></tr>\n';
lu_hp_schematic_image['H30'] = '<tr><td colspan="3" align="center" valign="top"><img border=0 src="/core/media/media.nl?id=1042859&c=472052&h=e8ac23e8d130498bdf0a"></td></tr>\n';
lu_hp_schematic_image['H31'] = '<tr><td colspan="3" align="center" valign="top"><img border=0 src="/core/media/media.nl?id=1042860&c=472052&h=3d07b4388809b9a6aeef"></td></tr>\n';
lu_hp_schematic_image['H31-S'] = '<tr><td colspan="3" align="center" valign="top"><img border=0 src="/core/media/media.nl?id=1042861&c=472052&h=c3656cc9d512a1098ebb"></td></tr>\n';

lu_hp_schematic_image['H23M'] = '<tr><td colspan="3" align="center" valign="top"><img border=0 src="/core/media/media.nl?id=1766333&c=472052&h=f9a8f02686fb83c772e7"></td></tr>\n';
lu_hp_schematic_image['H24M'] = '<tr><td colspan="3" align="center" valign="top"><img border=0 src="/core/media/media.nl?id=1766332&c=472052&h=21c30f814792c1ab9e46"></td></tr>\n';
lu_hp_schematic_image['H24M-S'] = '<tr><td colspan="3" align="center" valign="top"><img border=0 src="/core/media/media.nl?id=1766331&c=472052&h=6aa6bfba504d9aa47e5b"></td></tr>\n';
lu_hp_schematic_image['H30M'] = '<tr><td colspan="3" align="center" valign="top"><img border=0 src="/core/media/media.nl?id=1766330&c=472052&h=64af8bc72ad07212fa05"></td></tr>\n';
lu_hp_schematic_image['H31M'] = '<tr><td colspan="3" align="center" valign="top"><img border=0 src="/core/media/media.nl?id=1766329&c=472052&h=d646689afc11bce9a6b4"></td></tr>\n';
lu_hp_schematic_image['H31M-S'] = '<tr><td colspan="3" align="center" valign="top"><img border=0 src="/core/media/media.nl?id=1766328&c=472052&h=bb8f75d4813ac3d2f725"></td></tr>\n';

lu_hp_schematic_image['J01'] = '';
lu_hp_schematic_image['J02'] = '';
lu_hp_schematic_image['J03'] = '';
lu_hp_schematic_image['J04'] = '';
lu_hp_schematic_image['J05'] = '';
lu_hp_schematic_image['K01'] = '';
lu_hp_schematic_image['L01'] = '';
lu_hp_schematic_image['L02'] = '';
lu_hp_schematic_image['L03'] = '';
lu_hp_schematic_image['L04'] = '';
lu_hp_schematic_image['L05'] = '';
lu_hp_schematic_image['M01a'] = '';
lu_hp_schematic_image['M01b'] = '';
lu_hp_schematic_image['M02a'] = '';
lu_hp_schematic_image['M02b'] = '';
lu_hp_schematic_image['M03a'] = '';
lu_hp_schematic_image['M03b'] = '';
lu_hp_schematic_image['M04a'] = '';
lu_hp_schematic_image['M04b'] = '';
lu_hp_schematic_image['M05b'] = '';
lu_hp_schematic_image['N01'] = '';
lu_hp_schematic_image['N02'] = '';
lu_hp_schematic_image['N03'] = '';
lu_hp_schematic_image['N04'] = '';
lu_hp_schematic_image['N05'] = '';
lu_hp_schematic_image['P01'] = '';
lu_hp_schematic_image['P02'] = '';
lu_hp_schematic_image['P03'] = '';
lu_hp_schematic_image['P04'] = '';

var lu_upgrades_link = new Array();
lu_upgrades_link['PBS-A'] = '<a href="http://www.nu-heat.co.uk/products/thermostats/push-button-dial.html?utm_source=quote&utm_medium=email&utm_campaign=upgrades#pbs" target="_blank">Find out more &amp; view 360&deg; images</a>';
lu_upgrades_link['PBR-A'] = '<a href="http://www.nu-heat.co.uk/products/thermostats/programmable-dial.html?utm_source=quote&utm_medium=quote&utm_campaign=upgrades#pbr" target="_blank">Find out more &amp; view 360&deg; images</a>';
lu_upgrades_link['PBL-A'] = '<a href="http://www.nu-heat.co.uk/products/thermostats/low-voltage.html?utm_source=quote&utm_medium=email&utm_campaign=upgrades#pbl" target="_blank">Find out more &amp; view 360&deg; images</a>';
lu_upgrades_link['MCV3-C'] = '<a href="http://www.nu-heat.co.uk/products/thermostats/low-voltage.html?utm_source=quote&utm_medium=email&utm_campaign=upgrades#console" target="_blank">Find out more</a>';
/*CJM Jan2017 new image page with customer service link*/
lu_upgrades_link['NWSR-A'] = '<a href="http://www.nu-heat.co.uk/products/thermostats/programmable-dial/?utm_source=quote&utm_medium=quote&utm_campaign=upgrades">Find out more</a>';	//CJM Jan2017
lu_upgrades_link['NBSR-A'] = '<a href="http://www.nu-heat.co.uk/products/thermostats/programmable-dial/?utm_source=quote&utm_medium=quote&utm_campaign=upgrades">Find out more</a>';	//CJM Jan2017
lu_upgrades_link['NSSR-A'] = '<a href="http://www.nu-heat.co.uk/products/thermostats/programmable-dial/?utm_source=quote&utm_medium=quote&utm_campaign=upgrades">Find out more</a>';	//CJM Jan2017
lu_upgrades_link['NBBR-A'] = '<a href="http://www.nu-heat.co.uk/products/thermostats/programmable-dial/?utm_source=quote&utm_medium=quote&utm_campaign=upgrades">Find out more</a>';	//CJM Jan2017
lu_upgrades_link['NWBR-A'] = '<a href="http://www.nu-heat.co.uk/products/thermostats/programmable-dial/?utm_source=quote&utm_medium=quote&utm_campaign=upgrades">Find out more</a>';	//CJM Jan2017
lu_upgrades_link['NSBR-A'] = '<a href="http://www.nu-heat.co.uk/products/thermostats/programmable-dial/?utm_source=quote&utm_medium=quote&utm_campaign=upgrades">Find out more</a>';	//CJM Jan2017
lu_upgrades_link['neoStatW/TC-A'] = '';
lu_upgrades_link['neoStatB/TC-A'] = '';
lu_upgrades_link['neoStatS/TC-A'] = '';
lu_upgrades_link['neoHub-C'] = '<a href="http://www.nu-heat.co.uk/products/thermostats/smart-controls/?utm_source=quote&utm_medium=quote&utm_campaign=upgrades">Find out more</a>';	//CJM May2016
lu_upgrades_link['neoHub+-C'] = '<a href="http://www.nu-heat.co.uk/products/thermostats/smart-controls/?utm_source=quote&utm_medium=quote&utm_campaign=upgrades">Find out more</a>';	//CJM May2016
lu_upgrades_link['neoHub/1neoPlug-A'] = '<a href="http://www.nu-heat.co.uk/products/thermostats/smart-controls.html?utm_source=quote&utm_medium=quote&utm_campaign=upgrades">Find out more</a>';	//CJM May2016
lu_upgrades_link['neoHub/2neoPlug-A'] = '<a href="http://www.nu-heat.co.uk/products/thermostats/smart-controls.html?utm_source=quote&utm_medium=quote&utm_campaign=upgrades">Find out more</a>';	//CJM May2016
lu_upgrades_link['neoHub/3neoPlug-A'] = '<a href="http://www.nu-heat.co.uk/products/thermostats/smart-controls.html?utm_source=quote&utm_medium=quote&utm_campaign=upgrades">Find out more</a>';	//CJM May2016
lu_upgrades_link['neoHub/4neoPlug-A'] = '<a href="http://www.nu-heat.co.uk/products/thermostats/smart-controls.html?utm_source=quote&utm_medium=quote&utm_campaign=upgrades">Find out more</a>';	//CJM May2016
lu_upgrades_link['neoHub+/1neoPlug-A'] = '<a href="http://www.nu-heat.co.uk/products/thermostats/smart-controls.html?utm_source=quote&utm_medium=quote&utm_campaign=upgrades">Find out more</a>';	//CJM May2016
lu_upgrades_link['neoHub+/2neoPlug-A'] = '<a href="http://www.nu-heat.co.uk/products/thermostats/smart-controls.html?utm_source=quote&utm_medium=quote&utm_campaign=upgrades">Find out more</a>';	//CJM May2016
lu_upgrades_link['neoHub+/3neoPlug-A'] = '<a href="http://www.nu-heat.co.uk/products/thermostats/smart-controls.html?utm_source=quote&utm_medium=quote&utm_campaign=upgrades">Find out more</a>';	//CJM May2016
lu_upgrades_link['neoHub+/4neoPlug-A'] = '<a href="http://www.nu-heat.co.uk/products/thermostats/smart-controls.html?utm_source=quote&utm_medium=quote&utm_campaign=upgrades">Find out more</a>';	//CJM May2016
lu_upgrades_link['RFSWITCH-C'] = '';	//CJM May2016
lu_upgrades_link['TSL-A'] = '<a href="http://www.nu-heat.co.uk/products/thermostats/low-voltage.html?utm_source=quote&utm_medium=email&utm_campaign=upgrades#tsl">Find out more</a>';
lu_upgrades_link['neoUltraStat'] = '<a href="http://www.nu-heat.co.uk/products/thermostats/smart-controls/?utm_source=quote&utm_medium=quote&utm_campaign=upgrades">Find out more</a>';	//CJM Jan2017
lu_upgrades_link['neoUltraAir'] = '<a href="http://www.nu-heat.co.uk/products/thermostats/smart-controls/?utm_source=quote&utm_medium=quote&utm_campaign=upgrades">Find out more</a>';	//CJM Jan2017
lu_upgrades_link['neoUltraB-C'] = '<a href="http://www.nu-heat.co.uk/products/thermostats/smart-controls/?utm_source=quote&utm_medium=quote&utm_campaign=upgrades">Find out more</a>';	//CJM Jan2017
lu_upgrades_link['neoUltraW-C'] = '<a href="http://www.nu-heat.co.uk/products/thermostats/smart-controls/?utm_source=quote&utm_medium=quote&utm_campaign=upgrades">Find out more</a>';	//CJM Jan2017
lu_upgrades_link['neoUltra+Stat'] = '<a href="http://www.nu-heat.co.uk/products/thermostats/smart-controls/?utm_source=quote&utm_medium=quote&utm_campaign=upgrades">Find out more</a>';	//CJM June2017
lu_upgrades_link['neoUltra+Air'] = '<a href="http://www.nu-heat.co.uk/products/thermostats/smart-controls/?utm_source=quote&utm_medium=quote&utm_campaign=upgrades">Find out more</a>';		//CJM June2017

/*
lu_upgrades_link['NWSR-A'] = '<a href="http://www.nu-heat.co.uk/products/thermostats/programmable-dial.html?utm_source=quote&utm_medium=quote&utm_campaign=upgrades">Find out more</a>';	//CJM May2016
lu_upgrades_link['NBSR-A'] = '<a href="http://www.nu-heat.co.uk/products/thermostats/programmable-dial.html?utm_source=quote&utm_medium=quote&utm_campaign=upgrades">Find out more</a>';	//CJM May2016
lu_upgrades_link['NSSR-A'] = '<a href="http://www.nu-heat.co.uk/products/thermostats/programmable-dial.html?utm_source=quote&utm_medium=quote&utm_campaign=upgrades">Find out more</a>';	//CJM May2016
lu_upgrades_link['NBBR-A'] = '<a href="http://www.nu-heat.co.uk/products/thermostats/programmable-dial.html?utm_source=quote&utm_medium=quote&utm_campaign=upgrades">Find out more</a>';	//CJM May2016
lu_upgrades_link['NWBR-A'] = '<a href="http://www.nu-heat.co.uk/products/thermostats/programmable-dial.html?utm_source=quote&utm_medium=quote&utm_campaign=upgrades">Find out more</a>';	//CJM May2016
lu_upgrades_link['NSBR-A'] = '<a href="http://www.nu-heat.co.uk/products/thermostats/programmable-dial.html?utm_source=quote&utm_medium=quote&utm_campaign=upgrades">Find out more</a>';	//CJM May2016
lu_upgrades_link['neoHub-C'] = '<a href="http://www.nu-heat.co.uk/products/thermostats/smart-controls.html?utm_source=quote&utm_medium=quote&utm_campaign=upgrades">Find out more</a>';	//CJM May2016
*/	

	
	
var lu_upgrades_image = new Array();
lu_upgrades_image['PBS-A'] = '<img style="border:none; padding:0; margin:0;" src="/core/media/media.nl?id=14227134&c=472052&h=e8aaa0fb7cc555cfca76" alt="PBS Push button thermostat" width="210" height="143">';
lu_upgrades_image['PBR-A'] = '<img style="border:none; padding:0; margin:0;" src="/core/media/media.nl?id=14227112&c=472052&h=e517729e780faef6661b" alt="wireless stat" width="210" height="143">';
lu_upgrades_image['PBL-A'] = '<img style="border:none; padding:0; margin:0;" src="/core/media/media.nl?id=14227134&c=472052&h=e8aaa0fb7cc555cfca76" alt="PBL Push button low voltage thermostat" width="210" height="143">';
lu_upgrades_image['MCV3-C'] = '<img style="border:none; padding:0; margin:0;" src="/core/media/media.nl?id=14227089&c=472052&h=c6427bc5bc94025d783d" alt="Touchscreen central control unit for low voltage thermostats" width="210" height="143">';
/*CJM Jan2017 new image page with customer service link*/
lu_upgrades_image['NWSR-A'] = '<img style="border:none; padding:0; margin:0;" src="/core/media/media.nl?id=14227095&c=472052&h=d728bf8f347ef65fcdc8" alt="Programmable neoStats" width="210" height="143">';	//CJM Jan2017
lu_upgrades_image['NBSR-A'] = '<img style="border:none; padding:0; margin:0;" src="/core/media/media.nl?id=14227095&c=472052&h=d728bf8f347ef65fcdc8" alt="Programmable neoStats" width="210" height="143">';	//CJM Jan2017
lu_upgrades_image['NSSR-A'] = '<img style="border:none; padding:0; margin:0;" src="/core/media/media.nl?id=14227095&c=472052&h=d728bf8f347ef65fcdc8" alt="Programmable neoStats" width="210" height="143">';	//CJM Jan2017
lu_upgrades_image['NBBR-A'] = '<img style="border:none; padding:0; margin:0;" src="/core/media/media.nl?id=14227097&c=472052&h=8b076b1c2daff179f5ba" alt="wireless neoAir" width="210" height="143">';	//CJM Jan2017
lu_upgrades_image['NWBR-A'] = '<img style="border:none; padding:0; margin:0;" src="/core/media/media.nl?id=14227097&c=472052&h=8b076b1c2daff179f5ba" alt="wireless neoAir" width="210" height="143">';	//CJM Jan2017
lu_upgrades_image['NSBR-A'] = '<img style="border:none; padding:0; margin:0;" src="/core/media/media.nl?id=14227097&c=472052&h=8b076b1c2daff179f5ba" alt="wireless neoAir" width="210" height="143">';	//CJM Jan2017
lu_upgrades_image['neoStatW/TC-A'] = '<img style="border:none; padding:0; margin:0;" src="/core/media/media.nl?id=14227132&c=472052&h=3700ce931d888e384a11" alt="neoStat hot water timer" width="210" height="143">';
lu_upgrades_image['neoStatB/TC-A'] = '<img style="border:none; padding:0; margin:0;" src="/core/media/media.nl?id=14227132&c=472052&h=3700ce931d888e384a11" alt="neoStat hot water timer" width="210" height="143">';
lu_upgrades_image['neoStatS/TC-A'] = '<img style="border:none; padding:0; margin:0;" src="/core/media/media.nl?id=14227132&c=472052&h=3700ce931d888e384a11" alt="neoStat hot water timer" width="210" height="143">';
lu_upgrades_image['neoHub-C'] = '<img style="border:none; padding:0; margin:0;" src="/core/media/media.nl?id=14227125&c=472052&h=fecb3e26a6d878062b08" alt="wireless stat" width="210" height="143">';
lu_upgrades_image['neoHub+-C'] = '<img style="border:none; padding:0; margin:0;" src="/core/media/media.nl?id=14227119&c=472052&h=1a9e618a3729f5bde429" alt="wireless stat" width="210" height="143">';
lu_upgrades_image['neoHub/1neoPlug-A'] = '<img style="border:none; padding:0; margin:0;" src="/core/media/media.nl?id=14227110&c=472052&h=66ad62f9256f78888805" alt="wireless stat" width="210" height="143">';	//CJM May2016
lu_upgrades_image['neoHub/2neoPlug-A'] = '<img style="border:none; padding:0; margin:0;" src="/core/media/media.nl?id=14227110&c=472052&h=66ad62f9256f78888805" alt="wireless stat" width="210" height="143">';	//CJM May2016
lu_upgrades_image['neoHub/3neoPlug-A'] = '<img style="border:none; padding:0; margin:0;" src="/core/media/media.nl?id=14227110&c=472052&h=66ad62f9256f78888805" alt="wireless stat" width="210" height="143">';	//CJM May2016
lu_upgrades_image['neoHub/4neoPlug-A'] = '<img style="border:none; padding:0; margin:0;" src="/core/media/media.nl?id=14227110&c=472052&h=66ad62f9256f78888805" alt="wireless stat" width="210" height="143">';	//CJM May2016
lu_upgrades_image['neoHub+/1neoPlug-A'] = '<img style="border:none; padding:0; margin:0;" src="/core/media/media.nl?id=14227127&c=472052&h=8a602e536504e817d7df" alt="wireless stat" width="210" height="143">';	//CJM May2016
lu_upgrades_image['neoHub+/2neoPlug-A'] = '<img style="border:none; padding:0; margin:0;" src="/core/media/media.nl?id=14227127&c=472052&h=8a602e536504e817d7df" alt="wireless stat" width="210" height="143">';	//CJM May2016
lu_upgrades_image['neoHub+/3neoPlug-A'] = '<img style="border:none; padding:0; margin:0;" src="/core/media/media.nl?id=14227127&c=472052&h=8a602e536504e817d7df" alt="wireless stat" width="210" height="143">';	//CJM May2016
lu_upgrades_image['neoHub+/4neoPlug-A'] = '<img style="border:none; padding:0; margin:0;" src="/core/media/media.nl?id=14227127&c=472052&h=8a602e536504e817d7df" alt="wireless stat" width="210" height="143">';	//CJM May2016
lu_upgrades_image['RFSWITCH-C'] = '<img style="border:none; padding:0; margin:0;" src="/core/media/media.nl?id=14227115&c=472052&h=e0c100a6ed1bcf45141d" alt="wireless stat" width="210" height="143">';				//CJM May2016
lu_upgrades_image['TSL-A'] = '<img style="border:none; padding:0; margin:0;" src="/core/media/media.nl?id=14227108&c=472052&h=61838fe4114039504065" alt="TsL" width="210" height="143">';
lu_upgrades_image['neoUltraStat'] = '<img style="border:none; padding:0; margin:0;" src="/core/media/media.nl?id=14227129&c=472052&h=58eefac026c07f8e537e" alt="Smart controls" width="210" height="143">';		//CJM Jan2017
lu_upgrades_image['neoUltraAir'] = '<img style="border:none; padding:0; margin:0;" src="/core/media/media.nl?id=14227102&c=472052&h=b8e0ed5d602035b11206" alt="Smart controls" width="210" height="143">';	//CJM Jan2017
lu_upgrades_image['neoUltra+Stat'] = '<img style="border:none; padding:0; margin:0;" src="/core/media/media.nl?id=14227104&c=472052&h=90682a009a3ae0e83c46" alt="Smart controls" width="210" height="143">';	//CJM June2017
lu_upgrades_image['neoUltra+Air'] = '<img style="border:none; padding:0; margin:0;" src="/core/media/media.nl?id=14227127&c=472052&h=8a602e536504e817d7df" alt="Smart controls" width="210" height="143">';		//CJM June2017
/*
lu_upgrades_image['NWSR-A'] = '<img style="border:none; padding:0; margin:0;" src="/core/media/media.nl?id=14231217&c=472052&h=5cda6590ef3aef986dbe" alt="Programmable neoStats" width="210" height="143">';	//CJM Jan2017
lu_upgrades_image['NBSR-A'] = '<img style="border:none; padding:0; margin:0;" src="/core/media/media.nl?id=14231217&c=472052&h=5cda6590ef3aef986dbe" alt="Programmable neoStats" width="210" height="143">';	//CJM Jan2017
lu_upgrades_image['NSSR-A'] = '<img style="border:none; padding:0; margin:0;" src="/core/media/media.nl?id=14231217&c=472052&h=5cda6590ef3aef986dbe" alt="Programmable neoStats" width="210" height="143">';	//CJM Jan2017
lu_upgrades_image['NBBR-A'] = '<img style="border:none; padding:0; margin:0;" src="/core/media/media.nl?id=14231217&c=472052&h=5cda6590ef3aef986dbe" alt="wireless neoAir" width="210" height="143">';	//CJM Jan2017
lu_upgrades_image['NWBR-A'] = '<img style="border:none; padding:0; margin:0;" src="/core/media/media.nl?id=14231217&c=472052&h=5cda6590ef3aef986dbe" alt="wireless neoAir" width="210" height="143">';	//CJM Jan2017
lu_upgrades_image['NSBR-A'] = '<img style="border:none; padding:0; margin:0;" src="/core/media/media.nl?id=14231217&c=472052&h=5cda6590ef3aef986dbe" alt="wireless neoAir" width="210" height="143">';	//CJM Jan2017
*/	
var lu_upgrades_name = new Array();
lu_upgrades_name['PBS-A'] = 'PBS Push button thermostat';
lu_upgrades_name['PBR-A'] = 'Wireless thermostat - ideal for renovations';
lu_upgrades_name['PBL-A'] = 'PBL Push button low voltage thermostat';
lu_upgrades_name['MCV3-C'] = 'Touchscreen central control unit for low voltage thermostats';
lu_upgrades_name['NWSR-A'] = 'Programmable neoStats';
lu_upgrades_name['NBSR-A'] = 'Programmable neoStats';
lu_upgrades_name['NSSR-A'] = 'Programmable neoStats';
lu_upgrades_name['NBBR-A'] = 'Wireless neoAir';	//CJM May2016
lu_upgrades_name['NWBR-A'] = 'Wireless neoAir';	//CJM May2016
lu_upgrades_name['NSBR-A'] = 'Wireless neoAir';	//CJM May2016
lu_upgrades_name['neoStatW/TC-A'] = 'neoStat hot water timer';
lu_upgrades_name['neoStatB/TC-A'] = 'neoStat hot water timer';
lu_upgrades_name['neoStatS/TC-A'] = 'neoStat hot water timer';
lu_upgrades_name['neoHub-C'] = 'neoStat smart package';
lu_upgrades_name['neoHub+-C'] = 'neoStat smart package';			//CJM June2017
lu_upgrades_name['neoHub/1neoPlug-A'] = 'neoAir smart package<br>';	//CJM May2016
lu_upgrades_name['neoHub/2neoPlug-A'] = 'neoAir smart package<br>';	//CJM May2016
lu_upgrades_name['neoHub/3neoPlug-A'] = 'neoAir smart package<br>';	//CJM May2016
lu_upgrades_name['neoHub/4neoPlug-A'] = 'neoAir smart package<br>';	//CJM May2016
lu_upgrades_name['neoHub+/1neoPlug-A'] = 'neoAir smart package<br>';	//CJM June2017
lu_upgrades_name['neoHub+/2neoPlug-A'] = 'neoAir smart package<br>';	//CJM June2017
lu_upgrades_name['neoHub+/3neoPlug-A'] = 'neoAir smart package<br>';	//CJM June2017
lu_upgrades_name['neoHub+/4neoPlug-A'] = 'neoAir smart package<br>';	//CJM June2017
lu_upgrades_name['RFSWITCH-C'] = 'RF switch for wireless control of the boiler and pump<br>';	//CJM May2016
lu_upgrades_name['TSL-A'] = 'TSL Touchscreen low voltage thermostat';
lu_upgrades_name['neoUltraStat'] = 'neoStat smart package plus+';	//CJM Jan2017
lu_upgrades_name['neoUltraAir'] = 'neoAir smart package plus+';		//CJM Jan2017
lu_upgrades_name['neoUltra+Stat'] = 'neoStat smart package plus+';		//CJM June2017
lu_upgrades_name['neoUltra+Air'] = 'neoAir smart package plus+';		//CJM June2017

//------CJM 8th Aug 2017 adding Android and Apple text ---- 8Aug2017
var lu_upgrades_description = new Array();
lu_upgrades_description['PBS-A'] = 'With individually programmable time and temperature control these thermostats allow precise control of room temperature throughout the day and feature a backlit screen for easy use.<br>';
lu_upgrades_description['PBR-A'] = 'The programmable, push-button wireless thermostat is a popular choice for renovation projects. As it\'s battery-powered rather than hard-wired, it causes minimal disruption to wall finishes.<br>';
lu_upgrades_description['PBL-A'] = 'The best solution for larger new-build projects that incorporate building management systems, these thermostats offer individual zone time and temperature control whilst integrating seamlessly with whole house monitoring and control systems.<br>';
lu_upgrades_description['MCV3-C'] = 'This control unit allows editing of low voltage thermostats from one central location, including being able to copy and repeat global changes. It also incorporates a history function to monitor how the system performs under different conditions.<br>';
lu_upgrades_description['NWSR-A'] = 'The high-quality, slim-line, hard-wired, programmable neoStat thermostat is fully compatible with home automation systems. Features include holiday and temperature hold, soft touch operation and energy-saving Optimum Start.<br>neoStats are available in black, white and silver.<br>';
lu_upgrades_description['NBSR-A'] = 'The high-quality, slim-line, hard-wired, programmable neoStat thermostat is fully compatible with home automation systems. Features include holiday and temperature hold, soft touch operation and energy-saving Optimum Start.<br>neoStats are available in black, white and silver.<br>';
lu_upgrades_description['NSSR-A'] = 'The high-quality, slim-line, hard-wired, programmable neoStat thermostat is fully compatible with home automation systems. Features include holiday and temperature hold, soft touch operation and energy-saving Optimum Start.<br>neoStats are available in black, white and silver.<br>';
lu_upgrades_description['NBBR-A'] = 'A popular solution for renovation projects, the battery-powered, wireless neoAir thermostat offers the same functionality as the neoStat, without the need to chase wiring into walls.<br>The neoAir is available in black, white and silver.<br>';	//CJM Jan2017
lu_upgrades_description['NWBR-A'] = 'A popular solution for renovation projects, the battery-powered, wireless neoAir thermostat offers the same functionality as the neoStat, without the need to chase wiring into walls.<br>The neoAir is available in black, white and silver.<br>';	//CJM Jan2017
lu_upgrades_description['NSBR-A'] = 'A popular solution for renovation projects, the battery-powered, wireless neoAir thermostat offers the same functionality as the neoStat, without the need to chase wiring into walls.<br>The neoAir is available in black, white and silver.<br>';	//CJM Jan2017
lu_upgrades_description['neoStatW/TC-A'] = 'Nu-Heat\'s neoStats can also be used as a programmable hot water timer offering wireless smart control capability.<br><br><br>';
lu_upgrades_description['neoStatB/TC-A'] = 'Nu-Heat\'s neoStats can also be used as a programmable hot water timer offering wireless smart control capability.<br><br><br>';
lu_upgrades_description['neoStatS/TC-A'] = 'Nu-Heat\'s neoStats can also be used as a programmable hot water timer offering wireless smart control capability.<br><br><br>';
lu_upgrades_description['neoHub-C'] = 'Pair a neoHub with hard-wired neoStats to unlock remote, flexible heating control from a smartphone or tablet via the neoApp<br>';
lu_upgrades_description['neoHub+-C'] = 'Pair a neoHub+ with hard-wired neoStats to unlock remote, flexible heating control from your Android or Apple smartphone or tablet via the neoApp<br>'; //CJM 8Aug2017
lu_upgrades_description['neoHub/1neoPlug-A'] = 'Pair a neoHub with wireless neoAir thermostats to unlock remote, flexible heating control from a smartphone or tablet via the neoApp. This package includes the appropriate number of neoPlug signal boosters for the system, to ensure uninterrupted heating control around the home.<br>';	//CJM Jan2017
lu_upgrades_description['neoHub/2neoPlug-A'] = 'Pair a neoHub with wireless neoAir thermostats to unlock remote, flexible heating control from a smartphone or tablet via the neoApp. This package includes the appropriate number of neoPlug signal boosters for the system, to ensure uninterrupted heating control around the home.<br>';	//CJM Jan2017
lu_upgrades_description['neoHub/3neoPlug-A'] = 'Pair a neoHub with wireless neoAir thermostats to unlock remote, flexible heating control from a smartphone or tablet via the neoApp. This package includes the appropriate number of neoPlug signal boosters for the system, to ensure uninterrupted heating control around the home.<br>';	//CJM Jan2017
lu_upgrades_description['neoHub/4neoPlug-A'] = 'Pair a neoHub with wireless neoAir thermostats to unlock remote, flexible heating control from a smartphone or tablet via the neoApp. This package includes the appropriate number of neoPlug signal boosters for the system, to ensure uninterrupted heating control around the home.<br>';	//CJM Jan2017
lu_upgrades_description['neoHub+/1neoPlug-A'] = 'Pair a neoHub+ with wireless neoAir thermostats to unlock remote, flexible heating control from your Android or Apple smartphone or tablet via the neoApp. This package includes the appropriate number of neoPlug signal boosters for the system, to ensure uninterrupted heating control around the home.<br>';	//CJM New June2017; Amended 8Aug2017
lu_upgrades_description['neoHub+/2neoPlug-A'] = 'Pair a neoHub+ with wireless neoAir thermostats to unlock remote, flexible heating control from your Android or Apple smartphone or tablet via the neoApp. This package includes the appropriate number of neoPlug signal boosters for the system, to ensure uninterrupted heating control around the home.<br>';	//CJM New June2017; Amended 8Aug2017
lu_upgrades_description['neoHub+/3neoPlug-A'] = 'Pair a neoHub+ with wireless neoAir thermostats to unlock remote, flexible heating control from your Android or Apple smartphone or tablet via the neoApp. This package includes the appropriate number of neoPlug signal boosters for the system, to ensure uninterrupted heating control around the home.<br>';	//CJM New June2017; Amended 8Aug2017
lu_upgrades_description['neoHub+/4neoPlug-A'] = 'Pair a neoHub+ with wireless neoAir thermostats to unlock remote, flexible heating control from your Android or Apple smartphone or tablet via the neoApp. This package includes the appropriate number of neoPlug signal boosters for the system, to ensure uninterrupted heating control around the home.<br>';	//CJM New June2017; Amended 8Aug2017
lu_upgrades_description['RFSWITCH-C'] = 'Add the RF switch for wireless control of the boiler and pump, avoiding the need to run cabling from the wiring centre to the boiler.<br>';	//CJM May2016
lu_upgrades_description['TSL-A'] = 'A backlit thermostat with a touch sensitive screen, this is a contemporary option that can be networked with whole house monitoring and control systems.';
lu_upgrades_description['neoUltraStat'] = 'All the benefits of the neoStat smart package, plus a neoUltra for complete control of all heating and domestic hot water requirements from a central control point in the home.<br>';
lu_upgrades_description['neoUltraAir'] = 'All the benefits of the neoAir smart package, plus a neoUltra for complete control of all heating and domestic hot water requirements from a central control point in the home.<br>';
lu_upgrades_description['neoUltra+Stat'] = 'All the benefits of the neoStat smart package for Android and Apple devices, plus a neoUltra for complete control of all heating and domestic hot water requirements from a central control point in the home.<br>';	//CJM New June2017; Amended 8Aug2017
lu_upgrades_description['neoUltra+Air'] = 'All the benefits of the neoAir smart package for Android and Apple devices, plus a neoUltra for complete control of all heating and domestic hot water requirements from a central control point in the home.<br>';	//CJM New June2017; Amended 8Aug2017
/* CJM Jan2017
lu_upgrades_description['NWSR-A'] = 'Nu-Heat\'s neoStats are high quality, hard-wired programmable thermostats that are fully compatible with home automation systems. Features include holiday and temperature hold, soft touch operation and energy-saving Optimum Start.<br>The slim-line neo is available in three colour options: black, white and silver.<br>';
lu_upgrades_description['NBSR-A'] = 'Nu-Heat\'s neoStats are high quality, hard-wired programmable thermostats that are fully compatible with home automation systems. Features include holiday and temperature hold, soft touch operation and energy-saving Optimum Start.<br>The slim-line neo is available in three colour options: black, white and silver.<br>';
lu_upgrades_description['NSSR-A'] = 'Nu-Heat\'s neoStats are high quality, hard-wired programmable thermostats that are fully compatible with home automation systems. Features include holiday and temperature hold, soft touch operation and energy-saving Optimum Start.<br>The slim-line neo is available in three colour options: black, white and silver.<br>';
lu_upgrades_description['NBBR-A'] = 'The neoAir is a battery-powered, wireless thermostat that offers the same functionality as the neoStat. It can be fitted in an existing building without the need to chase wiring into walls, making the neoAir a popular solution for renovation projects.<br>The slim-line neoAir is available in three colour options: black, white and silver.<br>';	//CJM May2016
lu_upgrades_description['NWBR-A'] = 'The neoAir is a battery-powered, wireless thermostat that offers the same functionality as the neoStat. It can be fitted in an existing building without the need to chase wiring into walls, making the neoAir a popular solution for renovation projects.<br>The slim-line neoAir is available in three colour options: black, white and silver.<br>';	//CJM May2016
lu_upgrades_description['NSBR-A'] = 'The neoAir is a battery-powered, wireless thermostat that offers the same functionality as the neoStat. It can be fitted in an existing building without the need to chase wiring into walls, making the neoAir a popular solution for renovation projects.<br>The slim-line neoAir is available in three colour options: black, white and silver.<br>';	//CJM May2016
lu_upgrades_description['neoHub-C'] = 'Add the neoHub to the hard-wired neoStats to create a smart system, enabling flexible heating control from a smartphone or tablet via the neoApp.<br>';
lu_upgrades_description['neoHub/XXneoPlug-A'] = 'You can also add the neoHub to the wireless neoAir thermostats to create a smart system, enabling flexible heating control from a smartphone or tablet via the neoApp.<br>This package comes with the appropriate number of neoPlugs for the system. These act as a signal booster for the wireless neoAir package, ensuring uninterrupted control around the home.<br>';	//CJM May2016

*/

var lu_upgrades_fiche = new Array();
lu_upgrades_fiche['PBS-A'] = '<a href="/core/media/media.nl?id=7512975&c=472052&h=fd0fbf341fdde385ef99" rel="lightbox[fiche]">View product fiche</a>';
lu_upgrades_fiche['PBR-A'] = '<a href="/core/media/media.nl?id=7512975&amp;c=472052&amp;h=fd0fbf341fdde385ef99" rel="lightbox[fiche]">View product fiche</a>';
lu_upgrades_fiche['PBL-A'] = '<a href="/core/media/media.nl?id=7512975&c=472052&h=fd0fbf341fdde385ef99" rel="lightbox[fiche3]">View product fiche</a>';
lu_upgrades_fiche['MCV3-C'] = '';
lu_upgrades_fiche['NWSR-A'] = '<a href="/core/media/media.nl?id=7512975&amp;c=472052&amp;h=fd0fbf341fdde385ef99" rel="lightbox[fiche]">View product fiche</a>';
lu_upgrades_fiche['NBSR-A'] = '<a href="/core/media/media.nl?id=7512975&amp;c=472052&amp;h=fd0fbf341fdde385ef99" rel="lightbox[fiche]">View product fiche</a>';
lu_upgrades_fiche['NSSR-A'] = '<a href="/core/media/media.nl?id=7512975&amp;c=472052&amp;h=fd0fbf341fdde385ef99" rel="lightbox[fiche]">View product fiche</a>';
lu_upgrades_fiche['NBBR-A'] = '<a href="/core/media/media.nl?id=7512975&amp;c=472052&amp;h=fd0fbf341fdde385ef99" rel="lightbox[fiche]">View product fiche</a>';	//CJM May2016
lu_upgrades_fiche['NWBR-A'] = '<a href="/core/media/media.nl?id=7512975&amp;c=472052&amp;h=fd0fbf341fdde385ef99" rel="lightbox[fiche]">View product fiche</a>';	//CJM May2016
lu_upgrades_fiche['NSBR-A'] = '<a href="/core/media/media.nl?id=7512975&amp;c=472052&amp;h=fd0fbf341fdde385ef99" rel="lightbox[fiche]">View product fiche</a>';	//CJM May2016
lu_upgrades_fiche['neoStatW/TC-A'] = '';
lu_upgrades_fiche['neoStatB/TC-A'] = '';
lu_upgrades_fiche['neoStatS/TC-A'] = '';
lu_upgrades_fiche['neoHub+-C'] = '';			//CJM June2017
lu_upgrades_fiche['neoHub-C'] = '';
lu_upgrades_fiche['neoHub+/1neoPlug-A'] = '';	//CJM June2017
lu_upgrades_fiche['neoHub+/2neoPlug-A'] = '';	//CJM June2017
lu_upgrades_fiche['neoHub+/3neoPlug-A'] = '';	//CJM June2017
lu_upgrades_fiche['neoHub+/4neoPlug-A'] = '';	//CJM June2017
lu_upgrades_fiche['neoHub/1neoPlug-A'] = '';	//CJM May2016
lu_upgrades_fiche['neoHub/2neoPlug-A'] = '';	//CJM May2016
lu_upgrades_fiche['neoHub/3neoPlug-A'] = '';	//CJM May2016
lu_upgrades_fiche['neoHub/4neoPlug-A'] = '';	//CJM May2016
lu_upgrades_fiche['RFSWITCH-C'] = '';			//CJM May2016
lu_upgrades_fiche['TSL-A'] = '<a href="/core/media/media.nl?id=7512975&c=472052&h=fd0fbf341fdde385ef99" rel="lightbox[fiche6]">View product fiche</a>';
lu_upgrades_fiche['neoUltraStat'] = '';
lu_upgrades_fiche['neoUltraAir'] = '';
lu_upgrades_fiche['neoUltra+Stat'] = '';	//CJM June2017
lu_upgrades_fiche['neoUltra+Air'] = '';		//CJM June2017
lu_upgrades_fiche['neoUltraB-C'] = '';
lu_upgrades_fiche['neoUltraW-C'] = '';


var lu_fc_upgrades_link = new Array();
lu_fc_upgrades_link['LPPG/5-C'] = ' - <a href="/core/media/media.nl?id=2137769&c=472052&h=f5c82b2362b805a5bc5b&_xt=.pdf" target="_blank">view details</a>';
lu_fc_upgrades_link['LPSLC2/25-C'] = ' - <a href="/core/media/media.nl?id=1750963&c=472052&h=43ab678530e4972f1af1&_xt=.pdf" target="_blank">view details</a>';
lu_fc_upgrades_link['LPSLC2/25-C'] = ' - <a href="/core/media/media.nl?id=1750963&c=472052&h=43ab678530e4972f1af1&_xt=.pdf" target="_blank">view details</a>';
lu_fc_upgrades_link['LPXPS10-C'] = ' - <a href="/core/media/media.nl?id=1750964&c=472052&h=c4664e2199480ac48e90&_xt=.pdf" target="_blank">view details</a>';
lu_fc_upgrades_link['LPPE5/15-C'] = ' - <a href="/core/media/media.nl?id=1750961&c=472052&h=e571953b47a2f2efaebc&_xt=.pdf" target="_blank">view details</a>';
lu_fc_upgrades_link['LPCB/9-C'] = ' - <a href="/core/media/media.nl?id=1750962&c=472052&h=22fe4b408bc0ecc68544&_xt=.pdf" target="_blank">view details</a>';
lu_fc_upgrades_link['LPG/ESL-C'] = ' - <a href="/core/media/media.nl?id=1750959&c=472052&h=91cf9c819a33be5e228a&_xt=.pdf" target="_blank">view details</a>';
lu_fc_upgrades_link['LPG/ERW-C'] = ' - <a href="/core/media/media.nl?id=1750959&c=472052&h=91cf9c819a33be5e228a&_xt=.pdf" target="_blank">view details</a>';
lu_fc_upgrades_link['LPDCM/10-C'] = ' - <a href="/core/media/media.nl?id=2137772&c=472052&h=550317e7a6defd2dca16&_xt=.pdf" target="_blank">view details</a>';
lu_fc_upgrades_link['LPFB150/10-C'] = ' - <a href="/core/media/media.nl?id=3541350&c=472052&h=13cf5ac2b49ab6ff854d&_xt=.pdf" target="_blank">view details</a>';
lu_fc_upgrades_link['LPPRIMER/5-C'] = ' - <a href="/core/media/media.nl?id=6152088&c=472052&h=a2353dad93d53239ff70&_xt=.pdf" target="_blank">view details</a>';
lu_fc_upgrades_link['LPLPT-A'] = ' - <a href="/core/media/media.nl?id=6151983&c=472052&h=3fdc44d391552ff0bc8e&_xt=.pdf" target="_blank">view details</a>';
  
var lu_items_popup_pics = new Array();
lu_items_popup_pics['MSH02-A'] = '<a href="/core/media/media.nl?id=1875601&c=472052&h=32c27f558a76729199f0" rel="lightbox[plants]" title="Optiflow Manifold">MSH02-A</a>';
lu_items_popup_pics['MSH03-A'] = '<a href="/core/media/media.nl?id=1875601&c=472052&h=32c27f558a76729199f0" rel="lightbox[plants]" title="Optiflow Manifold">MSH03-A</a>';
lu_items_popup_pics['MSH04-A'] = '<a href="/core/media/media.nl?id=1875601&c=472052&h=32c27f558a76729199f0" rel="lightbox[plants]" title="Optiflow Manifold">MSH04-A</a>';
lu_items_popup_pics['MSH05-A'] = '<a href="/core/media/media.nl?id=1875601&c=472052&h=32c27f558a76729199f0" rel="lightbox[plants]" title="Optiflow Manifold">MSH05-A</a>';
lu_items_popup_pics['MSH06-A'] = '<a href="/core/media/media.nl?id=1875601&c=472052&h=32c27f558a76729199f0" rel="lightbox[plants]" title="Optiflow Manifold">MSH06-A</a>';
lu_items_popup_pics['MSH07-A'] = '<a href="/core/media/media.nl?id=1875601&c=472052&h=32c27f558a76729199f0" rel="lightbox[plants]" title="Optiflow Manifold">MSH07-A</a>';
lu_items_popup_pics['MSH08-A'] = '<a href="/core/media/media.nl?id=1875601&c=472052&h=32c27f558a76729199f0" rel="lightbox[plants]" title="Optiflow Manifold">MSH08-A</a>';
lu_items_popup_pics['MSH09-A'] = '<a href="/core/media/media.nl?id=1875601&c=472052&h=32c27f558a76729199f0" rel="lightbox[plants]" title="Optiflow Manifold">MSH09-A</a>';
lu_items_popup_pics['MSH10-A'] = '<a href="/core/media/media.nl?id=1875601&c=472052&h=32c27f558a76729199f0" rel="lightbox[plants]" title="Optiflow Manifold">MSH10-A</a>';
lu_items_popup_pics['MSH11-A'] = '<a href="/core/media/media.nl?id=1875601&c=472052&h=32c27f558a76729199f0" rel="lightbox[plants]" title="Optiflow Manifold">MSH11-A</a>';
lu_items_popup_pics['MSH12-A'] = '<a href="/core/media/media.nl?id=1875601&c=472052&h=32c27f558a76729199f0" rel="lightbox[plants]" title="Optiflow Manifold">MSH12-A</a>';
lu_items_popup_pics['WPEX14'] = '<a href="/core/media/media.nl?id=1875704&c=472052&h=89a624e8d2789204cca7" rel="lightbox[plants]" title="Fastflo&reg; PEX heating tube">WPEX14</a>';
lu_items_popup_pics['WPEX10'] = '<a href="/core/media/media.nl?id=1875704&c=472052&h=89a624e8d2789204cca7" rel="lightbox[plants]" title="Fastflo&reg; PEX heating tube">WPEX10</a>';
lu_items_popup_pics['WPEX17'] = '<a href="/core/media/media.nl?id=1875704&c=472052&h=89a624e8d2789204cca7" rel="lightbox[plants]" title="Fastflo&reg; PEX heating tube">WPEX17</a>';	//CJM August2016
lu_items_popup_pics['TPEX10'] = '<a href="/core/media/media.nl?id=1875704&c=472052&h=89a624e8d2789204cca7" rel="lightbox[plants]" title="Fastflo&reg; PEX heating tube">TPEX10</a>';
lu_items_popup_pics['TPER10'] = '<a href="/core/media/media.nl?id=14572414&c=472052&h=18c69983652421f65050" rel="lightbox[plants]" title="Fastflo&reg; heating tube">view details</a>';	//CJM May2018 PEXc to PE-RT update
lu_items_popup_pics['WPER14'] = '<a href="/core/media/media.nl?id=14572414&c=472052&h=18c69983652421f65050" rel="lightbox[plants]" title="Fastflo&reg; heating tube">view details</a>';	//CJM May2018 PEXc to PE-RT update
lu_items_popup_pics['WPER17'] = '<a href="/core/media/media.nl?id=14572414&c=472052&h=18c69983652421f65050" rel="lightbox[plants]" title="Fastflo&reg; heating tube">view details</a>';	//CJM May2018 PEXc to PE-RT update
lu_items_popup_pics['Dial'] = '<a href="/core/media/media.nl?id=1875599&c=472052&h=e7bac748eeb74bef81fb" rel="lightbox[plants]" title="Dial thermostats">Dial</a>';
lu_items_popup_pics['MPDP-C'] = '<a href="/core/media/media.nl?id=1875600&c=472052&h=af6877df669acf916d6f" rel="lightbox[plants]" title="Design Specification, manuals and documentation">MPDP-C</a>';
lu_items_popup_pics['PM4M-A'] = '<a href="/core/media/media.nl?id=1875602&c=472052&h=339177bc1e003a308155" rel="lightbox[plants]" title="Pump and temperature control module">PM4M-A</a>';
lu_items_popup_pics['PM2A/2-A'] = '<a href="/core/media/media.nl?id=1875602&c=472052&h=339177bc1e003a308155" rel="lightbox[plants]" title="Pump and temperature control module">PM2A/2-A</a>';
lu_items_popup_pics['PM1A-A'] = '<a href="/core/media/media.nl?id=1875602&c=472052&h=339177bc1e003a308155" rel="lightbox[plants]" title="Pump and temperature control module">PM1A-A</a>';
lu_items_popup_pics['PM1B-A'] = '<a href="/core/media/media.nl?id=1875602&c=472052&h=339177bc1e003a308155" rel="lightbox[plants]" title="Pump and temperature control module">PM1A-A</a>';	//CJM May2016
lu_items_popup_pics['PM1W/1-A'] = '<a href="/core/media/media.nl?id=1875602&c=472052&h=339177bc1e003a308155" rel="lightbox[plants]" title="Pump and temperature control module">PM1W/1-A</a>';	//CJM August2016
lu_items_popup_pics['PM2W/1-A'] = '<a href="/core/media/media.nl?id=1875602&c=472052&h=339177bc1e003a308155" rel="lightbox[plants]" title="Pump and temperature control module">PM2W/1-A</a>';	//CJM August2016
lu_items_popup_pics['PM3W/1-A'] = '<a href="/core/media/media.nl?id=1875602&c=472052&h=339177bc1e003a308155" rel="lightbox[plants]" title="Pump and temperature control module">PM3W/1-A</a>';	//CJM August2016
lu_items_popup_pics['PM4W/1-A'] = '<a href="/core/media/media.nl?id=1875602&c=472052&h=339177bc1e003a308155" rel="lightbox[plants]" title="Pump and temperature control module">PM4W/1-A</a>';	//CJM August2016
lu_items_popup_pics['PM5W/1-A'] = '<a href="/core/media/media.nl?id=1875602&c=472052&h=339177bc1e003a308155" rel="lightbox[plants]" title="Pump and temperature control module">PM5W/1-A</a>';	//CJM August2016

var lu_items_popup_pics2 = new Array();
lu_items_popup_pics2['MSH02-A'] = '- <a href="/core/media/media.nl?id=1875601&c=472052&h=32c27f558a76729199f0" rel="lightbox[plants]" title="Optiflow Manifold">view details</a>';
lu_items_popup_pics2['MSH03-A'] = '- <a href="/core/media/media.nl?id=1875601&c=472052&h=32c27f558a76729199f0" rel="lightbox[plants]" title="Optiflow Manifold">view details</a>';
lu_items_popup_pics2['MSH04-A'] = '- <a href="/core/media/media.nl?id=1875601&c=472052&h=32c27f558a76729199f0" rel="lightbox[plants]" title="Optiflow Manifold">view details</a>';
lu_items_popup_pics2['MSH05-A'] = '- <a href="/core/media/media.nl?id=1875601&c=472052&h=32c27f558a76729199f0" rel="lightbox[plants]" title="Optiflow Manifold">view details</a>';
lu_items_popup_pics2['MSH06-A'] = '- <a href="/core/media/media.nl?id=1875601&c=472052&h=32c27f558a76729199f0" rel="lightbox[plants]" title="Optiflow Manifold">view details</a>';
lu_items_popup_pics2['MSH07-A'] = '- <a href="/core/media/media.nl?id=1875601&c=472052&h=32c27f558a76729199f0" rel="lightbox[plants]" title="Optiflow Manifold">view details</a>';
lu_items_popup_pics2['MSH08-A'] = '- <a href="/core/media/media.nl?id=1875601&c=472052&h=32c27f558a76729199f0" rel="lightbox[plants]" title="Optiflow Manifold">view details</a>';
lu_items_popup_pics2['MSH09-A'] = '- <a href="/core/media/media.nl?id=1875601&c=472052&h=32c27f558a76729199f0" rel="lightbox[plants]" title="Optiflow Manifold">view details</a>';
lu_items_popup_pics2['MSH10-A'] = '- <a href="/core/media/media.nl?id=1875601&c=472052&h=32c27f558a76729199f0" rel="lightbox[plants]" title="Optiflow Manifold">view details</a>';
lu_items_popup_pics2['MSH11-A'] = '- <a href="/core/media/media.nl?id=1875601&c=472052&h=32c27f558a76729199f0" rel="lightbox[plants]" title="Optiflow Manifold">view details</a>';
lu_items_popup_pics2['MSH12-A'] = '- <a href="/core/media/media.nl?id=1875601&c=472052&h=32c27f558a76729199f0" rel="lightbox[plants]" title="Optiflow Manifold">view details</a>';
lu_items_popup_pics2['WPEX14'] = '- <a href="/core/media/media.nl?id=1875704&c=472052&h=89a624e8d2789204cca7" rel="lightbox[plants]" title="Fastflo&reg; PEX heating tube">view details</a>';
lu_items_popup_pics2['WPEX17'] = '- <a href="/core/media/media.nl?id=1875704&c=472052&h=89a624e8d2789204cca7" rel="lightbox[plants]" title="Fastflo&reg; PEX heating tube">view details</a>';	//CJM August2016
lu_items_popup_pics2['WPEX10'] = '- <a href="/core/media/media.nl?id=1875704&c=472052&h=89a624e8d2789204cca7" rel="lightbox[plants]" title="Fastflo&reg; PEX heating tube">view details</a>';
lu_items_popup_pics2['TPEX10'] = '- <a href="/core/media/media.nl?id=1875704&c=472052&h=89a624e8d2789204cca7" rel="lightbox[plants]" title="Fastflo&reg; PEX heating tube">view details</a>';
lu_items_popup_pics2['TPER10'] = '- <a href="/core/media/media.nl?id=14572414&c=472052&h=18c69983652421f65050" rel="lightbox[plants]" title="Fastflo&reg; heating tube">view details</a>';	//CJM May2018 PEXc to PE-RT update
lu_items_popup_pics2['WPER14'] = '- <a href="/core/media/media.nl?id=14572414&c=472052&h=18c69983652421f65050" rel="lightbox[plants]" title="Fastflo&reg; heating tube">view details</a>';	//CJM May2018 PEXc to PE-RT update
lu_items_popup_pics2['WPER17'] = '- <a href="/core/media/media.nl?id=14572414&c=472052&h=18c69983652421f65050" rel="lightbox[plants]" title="Fastflo&reg; heating tube">view details</a>';	//CJM May2018 PEXc to PE-RT update
lu_items_popup_pics2['Dial'] = '- <a href="/core/media/media.nl?id=1875599&c=472052&h=e7bac748eeb74bef81fb" rel="lightbox[plants]" title="Dial thermostats">view details</a>';
lu_items_popup_pics2['MPDP-C'] = '- <a href="/core/media/media.nl?id=1875600&c=472052&h=af6877df669acf916d6f" rel="lightbox[plants]" title="Design Specification, manuals and documentation">view details</a>';
lu_items_popup_pics2['PM4M-A'] = '- <a href="/core/media/media.nl?id=1875602&c=472052&h=339177bc1e003a308155" rel="lightbox[plants]" title="Pump and temperature control module">view details</a>';
lu_items_popup_pics2['PM2A/2-A'] = '- <a href="/core/media/media.nl?id=1875602&c=472052&h=339177bc1e003a308155" rel="lightbox[plants]" title="Pump and temperature control module">view details</a>';
lu_items_popup_pics2['PM1A-A'] = '- <a href="/core/media/media.nl?id=1875602&c=472052&h=339177bc1e003a308155" rel="lightbox[plants]" title="Pump and temperature control module">view details</a>';
lu_items_popup_pics2['PM1B-A'] = '- <a href="/core/media/media.nl?id=1875602&c=472052&h=339177bc1e003a308155" rel="lightbox[plants]" title="Pump and temperature control module">view details</a>';	//CJM May2016
lu_items_popup_pics2['PM1W/1-A'] = '- <a href="/core/media/media.nl?id=10074806&c=472052&h=90bfe0124a23d2c7bafa" rel="lightbox[plants]" title="Pump and temperature control module">view details</a>';	//CJM August2016
lu_items_popup_pics2['PM2W/1-A'] = '- <a href="/core/media/media.nl?id=10074806&c=472052&h=90bfe0124a23d2c7bafa" rel="lightbox[plants]" title="Pump and temperature control module">view details</a>';	//CJM August2016
lu_items_popup_pics2['PM3W/1-A'] = '- <a href="/core/media/media.nl?id=10074806&c=472052&h=90bfe0124a23d2c7bafa" rel="lightbox[plants]" title="Pump and temperature control module">view details</a>';	//CJM August2016
lu_items_popup_pics2['PM4W/1-A'] = '- <a href="/core/media/media.nl?id=10074806&c=472052&h=90bfe0124a23d2c7bafa" rel="lightbox[plants]" title="Pump and temperature control module">view details</a>';	//CJM August2016
lu_items_popup_pics2['PM5W/1-A'] = '- <a href="/core/media/media.nl?id=10074806&c=472052&h=90bfe0124a23d2c7bafa" rel="lightbox[plants]" title="Pump and temperature control module">view details</a>';	//CJM August2016



