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
        return function insideBody(type){ //Deepak Dec2018

            var header =    '<header id="header-container" class="full-width">' +
                                '<div class="container">' +
                                    '<a id="logo" href="http://www.nu-heat.co.uk/">' +
                                    '<img src="http://apps.nu-heat.co.uk/images/logo.svg" class="responsive" alt="Nu-Heat UK Ltd" />' +
                                    '</a>' +
                                '</div>' +
                            '</header>';

            var nav =   '<div id="navigation-container">' +
                            '<nav id="navigation" class="full-width">' +
                            '</nav>' +
                        '</div>';

            var innerBody =
            
                '<div id="wrapper"><!-- #wrapper START -->' +

                header +
                nav +

                '<div class="clearfix"></div>' +

                    '<div id="content"><!-- #content START -->' +

                        //Deepak 2018 - BS container starts here.
                        '<div id="main-content-wrapper" class="container"><!-- #main-content-wrapper START -->' + 

                            '<br>' + 
                            '<h1>' + type + ': Quotation</h1>' +
                            '<a name="1"></a><a name="2"></a><a name="3"></a><a name="4"></a><a name="5"></a><a name="6"></a><a name="7"></a><a name="8"></a><a name="9"></a><a name="10">' + 
                            '</a><a name="11"></a><a name="14"></a><a name="15"></a><a name="17"></a><a name="22"></a>' +

                            //'<NLFORM>'; //Deepak Dec2018 - not sure why this is here - there is no end tag either...
                                    
                                '<div class="bb1-contents-wrapper"><!-- .bb1-contents-wrapper START -->\n';

        

            return innerBody;
        }
    });