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

    return function startHTML(quoteNumber) {

        var docTypeHTML = '<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Strict//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-strict.dtd">\n' +
            '<html xmlns="http://www.w3.org/1999/xhtml">\n';

        var htmlStart = docTypeHTML + 
            '<head>\n' +
            '<meta http-equiv="content-type" content="text/html; charset=utf-8" />\n' +
            '<title>Your Quote - ' + quoteNumber + '</title>\n' +
            '<meta name="title" content="" />\n' +
            '<meta name="keywords" content="" />\n' +
            '<meta name="description" content="" />\n' +
            '<META HTTP-EQUIV="Pragma" CONTENT="no-cache">\n' +
            '<META HTTP-EQUIV="Expires" CONTENT="-1">\n' +


            //Deepak 2018 - bring in BS4
            '<link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.1.3/css/bootstrap.min.css" integrity="sha384-MCw98/SFnGE8fJT3GXwEOngsV7Zt27NXFoaoApmYm81iuXoPkFOJwJ8ERdknLPMO" crossorigin="anonymous">' +

            '<link href="/core/media/media.nl?id=14216021&c=472052&h=31275963c115455c9a92&_xt=.css" rel="stylesheet" type="text/css" media="screen, projection" />\n' +

            //Deepak 2018 - doesn't look like this is needed
            //'<link href="/core/media/media.nl?id=291336&c=472052&h=f352329e2126fa8c1bd8&_xt=.css&ck=sk52wuCbAXv46-Tt&vid=sk52wtqbAUw6M7YE&cktime=105440" rel="stylesheet" type="text/css" media="screen, projection" />\n' +

            '<style type="text/css">td {padding-left:10px; padding-right:10px; padding-top:6px; padding-bottom:6px;}</style>\n' +

            '<style type="text/css">\n' +
            '.checkboximage{display: none;}\n' +
            '</style>\n' +

            //Deepak 2018 - doesn't look like this is needed
            //'<link href="/core/media/media.nl?id=291335&c=472052&h=9612030c37edff094491&_xt=.css&ck=sk52wuCbAXv46-Tt&vid=sk52wtqbAUw6M7YE&cktime=105440" rel="stylesheet" type="text/css" />\n' +

            //Deepak 2018 - clean up arrangement
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
            '<link rel="stylesheet" href="/core/media/media.nl?id=14216020&c=472052&h=510101c962b5173698bd&_xt=.css">\n' +
            '<link rel="stylesheet" href="/core/media/media.nl?id=14216651&c=472052&h=6b5ebd0cf253ee79e10a&_xt=.css">\n' + // CJM May2018 - Font location "Quotes : assets : fonts : museo_sans/font.css"
            '<link rel="stylesheet" href="/core/media/media.nl?id=14216019&c=472052&h=62b238eece00cfac8a90&_xt=.css">\n' +

            //Deepak 2018 - BS4 fluid container max width 768px
            '<style type="text/css">\n'+
            '@media (max-width: 768px) {\n'+
                '.container {\n'+
                'width: 100%;\n'+
                'max-width: none;\n'+
                'padding-left: 10px;'+
                'padding-right: 10px;'+
                '}\n'+
            '}\n'+
            
            //Deepak 2018 - more style to tidy footer logos on small screen
            '@media (max-width: 576px) {\n'+
            '#footer-logos ul li {\n'+
                'display: block;\n'+
                'margin: 15px 0;\n'+
            '}\n'+
            '}\n'+

            '</style>\n' +

            //Deepak 2018 - group scripts together
            '<script type="text/javascript" src="http://ajax.googleapis.com/ajax/libs/jquery/1.7.2/jquery.min.js"></script>\n' +
            '<script type="text/javascript" src="/core/media/media.nl?id=291337&amp;c=472052&amp;h=2ebee1e7178c2227d2a2&amp;_xt=.js"></script>\n' +
            '<script type="text/javascript" src="/core/media/media.nl?id=291338&amp;c=472052&amp;h=7661013034af794aa51d&amp;_xt=.js"></script>\n' +
            '<script type="text/javascript" src="/core/media/media.nl?id=295601&amp;c=472052&amp;h=5d7cbe4edf85f456bc4b&amp;_xt=.js"></script>\n' +
            '<script type="text/javascript">  \n' +
            '$(document).ready(function () {   \n' +
            '    $(\'.acc_container\').hide(); //hide all at start    \n' +
            '    $(\'.acc_trigger\').click(function(){   \n' +
            '        $(\'.acc_trigger\').removeClass(\'current\');  //remove the current class   \n' +
            '        $(this).addClass(\'current\'); //add current class to clicked item   \n' +
            '        $(\'.acc_trigger:not(.current)\').removeClass(\'active\').next().slideUp(); //slide up items which are not the current one   \n' +
            '        $(this).toggleClass(\'active\').next().slideToggle(); //toggle class and visibility    \n' +
            '    	});  \n' +
            '	$("#toggle-fiche").click(function() {  \n' +
            '   	 $("#fiche").css("display", ($("#fiche").css("display")==="none") ? "block" : "none");  \n' +
            '	});  \n' +
            '});   \n' +
            '</script> \n' +
            '<script src="/core/media/media.nl?id=1391382&c=472052&h=9cf4f845a4d7512e40bc&_xt=.js"></script> \n' +

            '</head> \n' +

            '<body>\n';

        return htmlStart;
    }

});