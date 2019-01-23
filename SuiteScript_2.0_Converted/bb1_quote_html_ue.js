/**
 * Project : NuHeat SOW #146354 44
 * 
 * Description : NuHeat Quote to generate HTML and PDF files
 * 
 * @Author : {__Deepak Bhari__}
 * @Date : {__27/11/2018__}
 * 
 * Copyright (c) 2017 BlueBridge One Business Solutions, All Rights Reserved
 * support@bluebridgeone.com, +44 (0)1932 300007
 * 
 * @NApiVersion 2.x
 * @NScriptType UserEventScript
 * @NModuleScope SameAccount
 */

define(['N/record', 'N/search', 'N/log', 'N/url', 'N/https', 'N/file', 'N/render', 
    './quote_scripts/bb1_createRooms.js',
    './quote_scripts/bb1_createUpgrades.js',
    './quote_scripts/bb1_downloadHTML.js',
    './quote_scripts/bb1_footerHTML.js',
    './quote_scripts/bb1_generate_pdf_file_from_markup.js',
    './quote_scripts/bb1_hpSolarTab.js',
    './quote_scripts/bb1_HPSOLupgradesHTML.js',
    './quote_scripts/bb1_HPsystemFiche.js',
    './quote_scripts/bb1_HPsystemPerformance.js',
    './quote_scripts/bb1_inside_body.js',
    './quote_scripts/bb1_installGuidePrice.js',
    './quote_scripts/bb1_items_list_html.js',
    './quote_scripts/bb1_loProCalc.js',
    './quote_scripts/bb1_mcsAndRECC.js',
    './quote_scripts/bb1_nextStep.js',
    './quote_scripts/bb1_notesHTML.js',
    './quote_scripts/bb1_print_html.js', 
    './quote_scripts/bb1_printFloorCons.js',
    './quote_scripts/bb1_printHPDetail.js',
    './quote_scripts/bb1_quote_details.js', 
    './quote_scripts/bb1_rooms_list.js', 
    './quote_scripts/bb1_screedContractor.js',
    './quote_scripts/bb1_SOLsystemFiche.js',
    './quote_scripts/bb1_SOLsystemPerformance.js',
    './quote_scripts/bb1_start_html.js', 
    './quote_scripts/bb1_termsAndConditions.js',
    './quote_scripts/bb1_ufh_specification_html.js',
    './quote_scripts/bb1_upgrades_html.js',
    './quote_scripts/bb1_warrantyNotes.js',
    './quote_scripts/bb1_what_nuheat_offers_html.js'
    ],

    function (record, search, log, url, https, file, render, 
        createRooms,
        createUpgrades,
        downloadHTML,
        footerHTML,
        generatePdfFileFromMarkup,
        hpSolarTab,
        HPSOLupgradesHTML,
        HPsystemFiche,
        HPsystemPerformance,
        insideBody,
        installGuidePrice,
        itemsListHTML,
        loProCalc,
        mcsAndRECC,
        nextStep,
        notesHTML,
        printHTML, 
        printFloorCons,
        printHPDetail,
        quoteDetailsHTML, 
        roomsList,
        screedContractor,
        SOLsystemFiche,
        SOLsystemPerformance,
        startHTML, 
        termsAndConditions,
        UFHspecificationHTML,
        upgradesHTML,
        warrantyNotes,
        whatNuHeatOffersHTML
        ) {
        
        var theCurrentRecord = ''; //Deepak Dec2018 - global current record variable

        /**
         * Function definition to be triggered before record is loaded.
         *
         * @param {Object} scriptContext
         * @param {Record} scriptContext.newRecord - New record
         * @param {string} scriptContext.type - Trigger type
         * @param {Form} scriptContext.form - Current form
         * @Since 2015.2
         */
        function beforeLoad(scriptContext) {

            if (scriptContext.type == scriptContext.UserEventType.DELETE) return;

            var currentRecord = scriptContext.newRecord;
            var duedate = currentRecord.getValue({
                fieldId: 'duedate'
            });
        }
        
        /**
         * Function definition to be triggered before record is loaded.
         *
         * @param {Object} scriptContext
         * @param {Record} scriptContext.newRecord - New record
         * @param {Record} scriptContext.oldRecord - Old record
         * @param {string} scriptContext.type - Trigger type
         * @Since 2015.2
         */
        function beforeSubmit(scriptContext) {
            if (scriptContext.type == scriptContext.UserEventType.DELETE) return;

            var currentRecord = scriptContext.newRecord;
            var duedate = currentRecord.getValue({
                fieldId: 'duedate'
            });
        }

        /**
         * Function definition to be triggered before record is loaded.
         *
         * @param {Object} scriptContext
         * @param {Record} scriptContext.newRecord - New record
         * @param {Record} scriptContext.oldRecord - Old record
         * @param {string} scriptContext.type - Trigger type
         * @Since 2015.2
         */
        function afterSubmit(scriptContext) {

            if (scriptContext.type == scriptContext.UserEventType.DELETE) return;

            theCurrentRecord = scriptContext.newRecord;
            quoteInfo(scriptContext);
        }

        function quoteInfo(scriptContext) {
            var type = scriptContext.type;
            var objRecord = scriptContext.newRecord;

            var systemURL = dataCenterURL();
            //	var shoppingURL = dataCenterURLShopping();
            var formsURL = dataCenterURLForms();

            var getQuoteInfo = objRecord.getValue({
                fieldId: 'custbody_quote_html'
            });
            var quoteNo = objRecord.getValue({
                fieldId: 'tranid'
            });

            var quoteID = objRecord.id;

            var entityID = objRecord.getValue({
                fieldId: 'entity'
            });
            var quoteType = objRecord.getValue({
                fieldId: 'custbody_quote_type'
            });
            var ufhSchematic = objRecord.getValue({
                fieldId: 'custbody_schematic'
            }); //CJM May2016
            var defaultValues = objRecord.getValue({
                fieldId: 'custbody_default_values'
            }); //CJM May2016

            var technology = '';
            if (quoteType == 1 || quoteType == 5 || quoteType == 7) //Underfloor
            {
                technology = 'Underfloor Heating';
            } else if (quoteType == 8 || quoteType == 9 || quoteType == 10) //Heat Pumps
            {
                technology = 'Heat Pump';
            } else if (quoteType == 16) //Solar
            {
                technology = 'Solar';
            }
            var oppID = objRecord.getValue({fieldId: 'opportunity'});

            var quoteHTML = '';
            var quotePDF = '';

            log.debug({
                title: 'DEBUG',
                details: 'Starting Execution - Entity ' + entityID + '. ' + type + ' ' + quoteType + 'Quote ID = ' + quoteID + ' Schematic = ' + ufhSchematic + ' Default values: ' + defaultValues
            });

            if (type == 'create') {
                //ADD MANIFOLD CODE HERE.......//CJM DEC20126
                //
                createRooms(theCurrentRecord, quoteID);
                createUpgrades(theCurrentRecord, quoteID, technology);

                var oppSalesRep = search.lookupFields({type: 'customer', id: entityID, columns: 'salesrep'});

            } else if (type == 'edit') {
                var createRoomsCheck = objRecord.getValue({
                    fieldId: 'custbody_create_roomslist'
                });
                var createUpgradesCheck = objRecord.getValue({
                    fieldId: 'custbody_create_upgradeslist'
                });
                if (createRoomsCheck == 'T') {
                    createRooms(theCurrentRecord, quoteID);
                }
                if (createUpgradesCheck == 'T') {
                    createUpgrades(theCurrentRecord, quoteID, technology);
                }
            }

            var transaction = objRecord.id;

            if (quoteType == 1 || quoteType == 5 || quoteType == 7) //Underfloor
            {
                if (ufhSchematic == 'DCB' || ufhSchematic == 'HeatmiserD') {
                    log.debug({title: '1',details: '1'});

                    quoteHTML = 
                    startHTML(quoteNo, transaction) + 
                    insideBody('Underfloor Heating') +  
                    quoteDetailsHTML(theCurrentRecord, transaction) + 
                    UFHspecificationHTML(theCurrentRecord, transaction) + 
                    whatNuHeatOffersHTML(theCurrentRecord, transaction) + 
                    roomsList(theCurrentRecord, transaction) + 
                    itemsListHTML(theCurrentRecord, transaction, 'Underfloor Heating', systemURL, formsURL) + 
                    upgradesHTML(theCurrentRecord, transaction) + notesHTML(theCurrentRecord, transaction) + 
                    installGuidePrice(theCurrentRecord, transaction) + 
                    screedContractor(theCurrentRecord, transaction) + 
                    nextStep(theCurrentRecord, transaction) + 
                    warrantyNotes() + 
                    printHTML(theCurrentRecord, transaction, 'Underfloor Heating') + 
                    termsAndConditions() + 
                    footerHTML();
                } else {
                    log.debug({title: '2',details: '2'});

                    quoteHTML = 
                    startHTML(quoteNo, transaction) + 
                    insideBody('Underfloor Heating') +  

                    quoteDetailsHTML(theCurrentRecord, transaction) + //WORKS
                    UFHspecificationHTML(theCurrentRecord, transaction) + 
                    whatNuHeatOffersHTML(theCurrentRecord, transaction) + 
                    roomsList(theCurrentRecord, transaction) + 
                    itemsListHTML(theCurrentRecord, transaction, 'Underfloor Heating', systemURL, formsURL) +  //WORKS
                    upgradesHTML(theCurrentRecord, transaction) + 
                    hpSolarTab() + 
                    notesHTML(theCurrentRecord, transaction) +  //WORKS
                    installGuidePrice(theCurrentRecord, transaction) + 
                    screedContractor(theCurrentRecord, transaction) + 
                    nextStep(theCurrentRecord, transaction) +  //WORKS
                    warrantyNotes() + 

                    printHTML(theCurrentRecord, transaction, 'Underfloor Heating') + 
                    termsAndConditions() + 
                    footerHTML();



                    quotePDF =                     
                    //quoteDetailsHTML(theCurrentRecord, transaction) + //WORKS
                    // UFHspecificationHTML(theCurrentRecord, transaction) + 
                    // whatNuHeatOffersHTML(theCurrentRecord, transaction) + 
                    // roomsList(theCurrentRecord, transaction) + 
                    // itemsListHTML(theCurrentRecord, transaction, 'Underfloor Heating', systemURL, formsURL) +  //WORKS
                    upgradesHTML(theCurrentRecord, transaction) + 
                    // hpSolarTab() + 
                    // notesHTML(theCurrentRecord, transaction) +  //WORKS
                    // installGuidePrice(theCurrentRecord, transaction) + 
                    // screedContractor(theCurrentRecord, transaction) + 
                    // nextStep(theCurrentRecord, transaction) +  //WORKS
                    // warrantyNotes();
                    '';
                }
            } else if (quoteType == 8) //Ground Source Heat Pumps
            {
                log.debug({title: '3',details: '3'});

                quoteHTML = 
                startHTML(quoteNo, transaction) + 
                insideBody('Ground Source Heat Pump') +  
                quoteDetailsHTML(theCurrentRecord, transaction) + 
                itemsListHTML(theCurrentRecord, transaction, 'Heat Pump', systemURL, formsURL) + 
                HPsystemPerformance(theCurrentRecord, transaction) + 
                HPSOLupgradesHTML(theCurrentRecord, transaction, 'Heat Pump') + 
                hpSolarTab() + mcsAndRECC(theCurrentRecord, transaction) + 
                HPsystemFiche(theCurrentRecord, transaction)  + 
                notesHTML(theCurrentRecord, transaction) + 
                nextStep(theCurrentRecord, transaction) + 
                printHTML(theCurrentRecord, transaction, 'Heat Pump') + 
                termsAndConditions() + 
                footerHTML();
            } else if (quoteType == 9) //Air Source Heat Pumps
            {
                log.debug({title: '4',details: '4'});

                quoteHTML = 
                startHTML(quoteNo, transaction) + 
                insideBody('Air Source Heat Pump') +  
                quoteDetailsHTML(theCurrentRecord, transaction) + 
                itemsListHTML(theCurrentRecord, transaction, 'Heat Pump', systemURL, formsURL) + 
                HPsystemPerformance(theCurrentRecord, transaction) + 
                HPSOLupgradesHTML(theCurrentRecord, transaction, 'Heat Pump') + 
                hpSolarTab() + mcsAndRECC(theCurrentRecord, transaction) + 
                HPsystemFiche(theCurrentRecord, transaction)  + 
                notesHTML(theCurrentRecord, transaction) + 
                nextStep(theCurrentRecord, transaction) + 
                printHTML(theCurrentRecord, transaction, 'Heat Pump') + 
                termsAndConditions() + 
                footerHTML();
            } else if (quoteType == 16) //Solar
            {
                log.debug({title: '5',details: '5'});

                quoteHTML = 
                startHTML(quoteNo, transaction) + 
                insideBody('Solar') +  
                quoteDetailsHTML(theCurrentRecord, transaction) +
                itemsListHTML(theCurrentRecord, transaction, 'Solar', systemURL, formsURL) + 
                SOLsystemPerformance(theCurrentRecord, transaction) + 
                HPSOLupgradesHTML(theCurrentRecord, transaction, 'Solar') + 
                mcsAndRECC(theCurrentRecord, transaction) + 
                SOLsystemFiche(theCurrentRecord, transaction, quoteNo) +
                notesHTML(theCurrentRecord, transaction) +
                nextStep(theCurrentRecord, transaction) +
                printHTML(theCurrentRecord, transaction, 'Solar') + 
                termsAndConditions() + 
                footerHTML();

                quotePDF =
                quoteDetailsHTML(theCurrentRecord, transaction) +
                itemsListHTML(theCurrentRecord, transaction, 'Solar', systemURL, formsURL) +
                SOLsystemPerformance(theCurrentRecord, transaction) +
                HPSOLupgradesHTML(theCurrentRecord, transaction, 'Solar') +
                mcsAndRECC(theCurrentRecord, transaction) +
                SOLsystemFiche(theCurrentRecord, transaction, quoteNo) +
                notesHTML(theCurrentRecord, transaction) +
                nextStep(theCurrentRecord, transaction) +
                '';

            } else //Assume NH type quote
            {
                log.debug({title: '6',details: '6'});

                quoteHTML = 
                startHTML(quoteNo, transaction) + 
                insideBody('') +  
                quoteDetailsHTML(theCurrentRecord, transaction) + 
                itemsListHTML(theCurrentRecord, transaction, systemURL, formsURL) + 
                upgradesHTML(theCurrentRecord, transaction) + 
                notesHTML(theCurrentRecord, transaction) + /*nextStep(theCurrentRecord, transaction) +*/ 
                printHTML(theCurrentRecord, transaction) + 
                termsAndConditions() + 
                footerHTML();
            }

            // log.debug({title: 'startHTML',details: startHTML('Solar', quoteNo, transaction)});
            // log.debug({title: 'quoteDetailsHTML',details: quoteDetailsHTML(theCurrentRecord, transaction)});
            // log.debug({title: 'itemsListHTML',details: itemsListHTML(theCurrentRecord, transaction, 'Solar', systemURL, formsURL)});
            // log.debug({title: 'SOLsystemPerformance',details: SOLsystemPerformance(theCurrentRecord, transaction)});
            // log.debug({title: 'HPSOLupgradesHTML',details: HPSOLupgradesHTML(theCurrentRecord, transaction, 'Solar')});
            // log.debug({title: 'mcsAndRECC',details: mcsAndRECC(theCurrentRecord, transaction)});
            // log.debug({title: 'SOLsystemFiche',details: SOLsystemFiche(theCurrentRecord, transaction, quoteNo)});
            // log.debug({title: 'notesHTML',details: notesHTML(theCurrentRecord, transaction)});
            // log.debug({title: 'nextStep',details: nextStep(theCurrentRecord, transaction)});
            // log.debug({title: 'printHTML',details: printHTML(theCurrentRecord, transaction, 'Solar')});
            // log.debug({title: 'termsAndConditions',details: termsAndConditions()});
            // log.debug({title: 'footerHTML',details: footerHTML()});
            // log.debug({title: 'COMPLETE HTML DOCUMENT', details: quoteHTML});

            //strip inline styles
            quoteHTML = quoteHTML.replace(/style=".*"/gi, 'style=""');

            //create quote html document
            var quoteDocument = file.create({name: 'quote_' + quoteNo + '_erp.htm', fileType: 'HTMLDOC', contents:quoteHTML, folder: 11036357, isOnline: true}); //Deepak Dec2018

            var fileID = quoteDocument.save();

            log.debug({
                title: 'DEBUG',
                details: 'ONLINE QUOTE FILE ID: ' + fileID
            }); //Deepak Dec2018

            //update the estimate and add links to html quote document	
            var transRecord = record.load({type: 'estimate', id: transaction}) //Deepak Dec2018

            log.debug({
                title: 'DEBUG',
                details: 'TRANSACTION RECORD: ' + transRecord
            }); //Deepak Dec2018

            transRecord.setValue('custbody_create_roomslist', false);
            transRecord.setValue('custbody_create_upgradeslist', false);

            log.debug({
                title: 'DEBUG',
                details: 'TRANSACTION RECORD AFTER SETTING VALUES: ' + transRecord
            }); //Deepak Dec2018

            log.debug({
                title: 'DEBUG',
                details: {type: 'file', id: fileID, columns: 'url'}
            }); //Deepak Dec2018

            var urlPath = search.lookupFields({type: 'file', id: fileID, columns: 'url'});

            var transURL = 'http://files.nu-heat.co.uk' + urlPath.url;

            log.debug({
                title: 'DEBUG',
                details: 'TRANSACTION URL: ' + transURL
            }); //Deepak Dec2018

            transRecord.setValue('custbody_quote_page', '<a href="' + transURL + '" target = "_new">Quote ' + quoteNo + '</a>');
            transRecord.setValue('custbody_quote_page_url', transURL);
            transRecord.setValue('custbody_quote_pdf_link', '<a href="http://convertold.html2pdf.seven49.net/?urltorender=' + encodeURIComponent(transURL) + '&DisableJavaScript=1&AddLinks=1&Size=A4&usePrintMediaType=1&FooterTemplateUrl=http://www.towelrails.co.uk/html2pdf/footer.html&FileName=UFH042960">Quote PDF ' + quoteNo + '</a>');

            if (type == 'create' && oppID) {
                var oppSalesRep = search.lookupFields({type: 'opportunity', id: oppID, columns: 'salesrep'});

                transRecord.setValue('salesrep', oppSalesRep);
            }
            transactionID = transRecord.save({enableSourcing: false, ignoreMandatoryFields: true});

            generatePdfFileFromMarkup(quotePDF, quoteNo); //Deepak Dec2018
        }

        function dataCenterURL() {
            var suiteletUrl = url.resolveScript({ scriptId: 765, deploymentId: 'customdeploy_data_center_url', returnExternalUrl: true });
            log.debug('DEBUG', 'Suitelet dynamic discovery of Data Center', suiteletUrl);

            //Deepak Bhari - had to use https module - otherwise got an error that SSS_INVALID_URL","message":"The URL must be a fully qualified HTTP URL.
            var response = https.get({ url: suiteletUrl });
            return response.body;
        }

        function dataCenterURLShopping() {
            var suiteletUrl = url.resolveScript({ scriptId: 766, deploymentId: 'customdeploy_data_center_url_shopping', returnExternalUrl: true });
            log.debug('DEBUG', 'Suitelet dynamic discovery of Data Center Shopping', suiteletUrl);

            //Deepak Bhari - had to use https module - otherwise got an error that SSS_INVALID_URL","message":"The URL must be a fully qualified HTTP URL.
            var response = https.get({ url: suiteletUrl });
            return response.body;
        }

        function dataCenterURLForms() {
            var suiteletUrl = url.resolveScript({ scriptId: 767, deploymentId: 'customdeploy_data_center_url_forms', returnExternalUrl: true });
            log.debug('DEBUG', 'Suitelet dynamic discovery of Data Center Forms', suiteletUrl);

            //Deepak Bhari - had to use https module - otherwise got an error that SSS_INVALID_URL","message":"The URL must be a fully qualified HTTP URL.
            var response = https.get({ url: suiteletUrl });
            return response.body;
        }
        
        return {
            beforeLoad: beforeLoad,
            beforeSubmit: beforeSubmit,
            afterSubmit: afterSubmit
        };
});