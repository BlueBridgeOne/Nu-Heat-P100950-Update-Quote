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

    return function footerHTML()
    {

        var footer = '<footer id="footer" class="full-width">\n' +     
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
                                
                                //Deepak 2018 - not needed now
                                //'<div id="copyright" class="sixteen columns alpha">\n' +
                                '<div id="copyright">\n' +

                                    '<span>� 1997-2015 Nu-Heat UK Ltd. All rights reserved. Registered in England. Reg. No. 3131852. VAT number: VRN156722794. <a href="/privacy-cookies.html">Cookie &amp; Privacy Policy</a>.</span>\n' +
                                '</div>\n' +
                                
                                //Deepak 2018 - not needed now
                                //'<div id="footer-logos" class="fourteen columns omega">\n' +
                                '<div id="footer-logos" class="columns omega">\n' +

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
                        
                    '</footer>\n';


        var scripts =   '<script>\n' +
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
                        '</script>\n';

        var htmlEnd = 
                            '</div><!-- .bb1-contents-wrapper END -->\n' +
                        
                            '</div><!-- #main-content-wrapper END -->\n' +
        
                            '</div><!-- #content END -->\n' +
                                            
                         '<div id="footer-push"></div>\n' +
                         '<div id="quote-footer-push"></div>\n'+
                         footer + 
    
                 '</div><!-- #wrapper END -->\n' +

                + scripts +

            '</body>\n' +
            '</html>';

        return htmlEnd	;
    }
});