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

define([],
    function () {

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
        lu_floor_cons_desc['FD14'] = 'FastDeck&reg; with cement board'; //CJM May2018
        lu_floor_cons_desc['LH14'] = 'Low profile timber floor';
        lu_floor_cons_desc['LP10'] = 'LoPro&reg;10 routed panel';
        lu_floor_cons_desc['LPL10'] = 'LoPro&reg;Lite floating floor'; //CJM June2018
        lu_floor_cons_desc['LPM10'] = 'LoPro&reg;Max 10mm pipe';
        lu_floor_cons_desc['LPM14'] = 'LoPro&reg;Max 14mm pipe'; //CJM Apr2018
        lu_floor_cons_desc['AMC14'] = 'Acoustic LoPro&reg;Max, on cement'; //CJM Aug2017
        lu_floor_cons_desc['AMT14'] = 'Acoustic LoPro&reg;Max, suspended timber'; //CJM Aug2017
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

        lu_floor_cons_link['ADPK(116)14'] = ' - <a href="/core/media/media.nl?id=206306&amp;c=472052&amp;h=f0f5c23b129b0837c362&amp;_xt=.pdf" target="_blank">view floor construction</a>';
        lu_floor_cons_link['ADPK(175)14'] = ' - <a href="/core/media/media.nl?id=206306&amp;c=472052&amp;h=f0f5c23b129b0837c362&amp;_xt=.pdf" target="_blank">view floor construction</a>';
        lu_floor_cons_link['ADPK(232)14'] = ' - <a href="/core/media/media.nl?id=206306&amp;c=472052&amp;h=f0f5c23b129b0837c362&amp;_xt=.pdf" target="_blank">view floor construction</a>';
        lu_floor_cons_link['ADPK14'] = ' - <a href="/core/media/media.nl?id=206306&amp;c=472052&amp;h=f0f5c23b129b0837c362&amp;_xt=.pdf" target="_blank">view floor construction</a>';
        lu_floor_cons_link['AKA14'] = ' - <a href="/core/media/media.nl?id=431456&amp;c=472052&amp;h=95472d9e545ab4e69c72&amp;_xt=.pdf" target="_blank">view floor construction</a>';
        lu_floor_cons_link['AMC14'] = ' - <a href="/core/media/media.nl?id=12651972&amp;c=472052&amp;h=e43d66f8921c2eb79e8d&amp;_xt=.pdf" target="_blank">view floor construction</a>'; //CJM Aug2017
        lu_floor_cons_link['AMT14'] = ' - <a href="/core/media/media.nl?id=12652074&amp;c=472052&amp;h=98979c225e389adbf62a&amp;_xt=.pdf" target="_blank">view floor construction</a>'; //CJM Aug2017
        lu_floor_cons_link['ASC14'] = ' - <a href="/core/media/media.nl?id=102773&amp;c=472052&amp;h=5862e02813437421fc68&amp;_xt=.pdf" target="_blank">view floor construction</a>';
        lu_floor_cons_link['ASCE14'] = '';
        lu_floor_cons_link['ASC17'] = ' - <a href="/core/media/media.nl?id=10254258&amp;c=472052&amp;h=a3f07bdfa6e21cd7412d&amp;_xt=.pdf" target="_blank">view floor construction</a>';
        lu_floor_cons_link['ASL17'] = ' - <a href="/core/media/media.nl?id=10254258&amp;c=472052&amp;h=a3f07bdfa6e21cd7412d&amp;_xt=.pdf" target="_blank">view floor construction</a>';
        lu_floor_cons_link['ASSC17'] = ' - <a href="/core/media/media.nl?id=10254259&amp;c=472052&amp;h=1512a485aad56beeb1a9&amp;_xt=.pdf" target="_blank">view floor construction</a>';
        lu_floor_cons_link['ASSL17'] = ' - <a href="/core/media/media.nl?id=10254259&amp;c=472052&amp;h=1512a485aad56beeb1a9&amp;_xt=.pdf" target="_blank">view floor construction</a>';
        lu_floor_cons_link['ATA(C)14'] = ' - <a href="/core/media/media.nl?id=102780&amp;c=472052&amp;h=30716603aa11dec92ea8&amp;_xt=.pdf" target="_blank">view floor construction</a>';
        lu_floor_cons_link['ATA(K)14'] = ' - <a href="/core/media/media.nl?id=102777&amp;c=472052&amp;h=96c5ce973552885c43b9&amp;_xt=.pdf" target="_blank">view floor construction</a>';
        lu_floor_cons_link['ATPAK14'] = ' - <a href="/core/media/media.nl?id=5872162&amp;c=472052&amp;h=e4026aa7d5a987e1882b&amp;_xt=.pdf" target="_blank">view floor construction</a>';
        lu_floor_cons_link['DPB(133)14'] = ' - <a href="/core/media/media.nl?id=206309&amp;c=472052&amp;h=5053159156ba27faaca5&amp;_xt=.pdf" target="_blank">view floor construction</a>';
        lu_floor_cons_link['DPB(200)14'] = ' - <a href="/core/media/media.nl?id=206309&amp;c=472052&amp;h=5053159156ba27faaca5&amp;_xt=.pdf" target="_blank">view floor construction</a>';
        lu_floor_cons_link['DPBK(133)14'] = ' - <a href="/core/media/media.nl?id=300696&amp;c=472052&amp;h=81c541ba5ae5d74f18c2&amp;_xt=.pdf" target="_blank">view floor construction</a>';
        lu_floor_cons_link['DPBK(200)14'] = ' - <a href="/core/media/media.nl?id=300696&amp;c=472052&amp;h=81c541ba5ae5d74f18c2&amp;_xt=.pdf" target="_blank">view floor construction</a>';
        lu_floor_cons_link['DPBL(133)14'] = ' - <a href="/core/media/media.nl?id=206310&amp;c=472052&amp;h=1456dfccfdba27a61b2f&amp;_xt=.pdf" target="_blank">view floor construction</a>';
        lu_floor_cons_link['DPBL(200)14'] = ' - <a href="/core/media/media.nl?id=206310&amp;c=472052&amp;h=1456dfccfdba27a61b2f&amp;_xt=.pdf" target="_blank">view floor construction</a>';
        lu_floor_cons_link['DPBLK(133)14'] = ' - <a href="/core/media/media.nl?id=300700&amp;c=472052&amp;h=d9693779ab067183db87&amp;_xt=.pdf" target="_blank">view floor construction</a>';
        lu_floor_cons_link['DPBLK(200)14'] = ' - <a href="/core/media/media.nl?id=300700&amp;c=472052&amp;h=d9693779ab067183db87&amp;_xt=.pdf" target="_blank">view floor construction</a>';
        lu_floor_cons_link['DPF(116)14'] = ' - <a href="/core/media/media.nl?id=206312&amp;c=472052&amp;h=d6646f4846b7b1f38ef9&amp;_xt=.pdf" target="_blank">view floor construction</a>';
        lu_floor_cons_link['DPF(175)14'] = ' - <a href="/core/media/media.nl?id=206312&amp;c=472052&amp;h=d6646f4846b7b1f38ef9&amp;_xt=.pdf" target="_blank">view floor construction</a>';
        lu_floor_cons_link['DPF(232)14'] = ' - <a href="/core/media/media.nl?id=206312&amp;c=472052&amp;h=d6646f4846b7b1f38ef9&amp;_xt=.pdf" target="_blank">view floor construction</a>';
        lu_floor_cons_link['DPFK(116)14'] = ' - <a href="/core/media/media.nl?id=300716&amp;c=472052&amp;h=3cb772cc76c4ecc71278&amp;_xt=.pdf" target="_blank">view floor construction</a>';
        lu_floor_cons_link['DPFK(175)14'] = ' - <a href="/core/media/media.nl?id=300716&amp;c=472052&amp;h=3cb772cc76c4ecc71278&amp;_xt=.pdf" target="_blank">view floor construction</a>';
        lu_floor_cons_link['DPFK(232)14'] = ' - <a href="/core/media/media.nl?id=300716&amp;c=472052&amp;h=3cb772cc76c4ecc71278&amp;_xt=.pdf" target="_blank">view floor construction</a>';
        lu_floor_cons_link['DPJ(133)14'] = ' - <a href="/core/media/media.nl?id=206330&amp;c=472052&amp;h=47219a049b5d611a6878&amp;_xt=.pdf" target="_blank">view floor construction</a>';
        lu_floor_cons_link['DPJ(200)14'] = ' - <a href="/core/media/media.nl?id=206330&amp;c=472052&amp;h=47219a049b5d611a6878&amp;_xt=.pdf" target="_blank">view floor construction</a>';
        lu_floor_cons_link['DPJ4(600)14'] = ' - <a href="/core/media/media.nl?id=206330&amp;c=472052&amp;h=47219a049b5d611a6878&amp;_xt=.pdf" target="_blank">view floor construction</a>';
        lu_floor_cons_link['DPJG(133)14'] = ' - <a href="/core/media/media.nl?id=206329&amp;c=472052&amp;h=201369722f00c46cdd54&amp;_xt=.pdf" target="_blank">view floor construction</a>';
        lu_floor_cons_link['DPJG(200)14'] = ' - <a href="/core/media/media.nl?id=206329&amp;c=472052&amp;h=201369722f00c46cdd54&amp;_xt=.pdf" target="_blank">view floor construction</a>';
        lu_floor_cons_link['DPJGK(133)14'] = ' - <a href="/core/media/media.nl?id=300719&amp;c=472052&amp;h=ba8c4148d2b0e8c199f4&amp;_xt=.pdf" target="_blank">view floor construction</a>';
        lu_floor_cons_link['DPJGK(200)14'] = ' - <a href="/core/media/media.nl?id=300719&amp;c=472052&amp;h=ba8c4148d2b0e8c199f4&amp;_xt=.pdf" target="_blank">view floor construction</a>';
        lu_floor_cons_link['DPJK(133)14'] = ' - <a href="/core/media/media.nl?id=300720&amp;c=472052&amp;h=ec1677677eac1af85d9b&amp;_xt=.pdf" target="_blank">view floor construction</a>';
        lu_floor_cons_link['DPJK(200)14'] = ' - <a href="/core/media/media.nl?id=300720&amp;c=472052&amp;h=ec1677677eac1af85d9b&amp;_xt=.pdf" target="_blank">view floor construction</a>';
        lu_floor_cons_link['DPL(116)14'] = ' - <a href="/core/media/media.nl?id=206311&amp;c=472052&amp;h=a98056ac4939c5b7d1b1&amp;_xt=.pdf" target="_blank">view floor construction</a>';
        lu_floor_cons_link['DPL(175)14'] = ' - <a href="/core/media/media.nl?id=206311&amp;c=472052&amp;h=a98056ac4939c5b7d1b1&amp;_xt=.pdf" target="_blank">view floor construction</a>';
        lu_floor_cons_link['DPL(232)14'] = ' - <a href="/core/media/media.nl?id=206311&amp;c=472052&amp;h=a98056ac4939c5b7d1b1&amp;_xt=.pdf" target="_blank">view floor construction</a>';
        lu_floor_cons_link['DPLK(116)14'] = ' - <a href="/core/media/media.nl?id=300717&amp;c=472052&amp;h=51695a7ce9ef1c5d9315&amp;_xt=.pdf" target="_blank">view floor construction</a>';
        lu_floor_cons_link['DPLK(175)14'] = ' - <a href="/core/media/media.nl?id=300717&amp;c=472052&amp;h=51695a7ce9ef1c5d9315&amp;_xt=.pdf" target="_blank">view floor construction</a>';
        lu_floor_cons_link['DPLK(232)14'] = ' - <a href="/core/media/media.nl?id=300717&amp;c=472052&amp;h=51695a7ce9ef1c5d9315&amp;_xt=.pdf" target="_blank">view floor construction</a>';
        lu_floor_cons_link['FD14'] = ' - <a href="/core/media/media.nl?id=14898620&amp;c=472052&amp;h=9c73239878c134fe7425" target="_blank">view floor construction</a>'; // CJM May2018 ***** N.B. NOT THE ACTUAL DOCUMENT need to UPDATE WHEN AVAILABLE ******
        lu_floor_cons_link['LH14'] = ' - <a href="http://www.nu-heat.co.uk/s.nl/it.I/id.434/.f" target="_blank">view floor construction</a>';
        lu_floor_cons_link['LP10'] = ' - <a href="/core/media/media.nl?id=701246&amp;c=472052&amp;h=423a3a40d471402b4ef4&amp;_xt=.pdf" target="_blank">view floor construction</a>';
        lu_floor_cons_link['LPL10'] = ' - <a href="/core/media/media.nl?id=14920645&amp;c=472052&amp;h=5b848a6f82b71642db5d" target="_blank">view floor construction</a>'; // CJM June2018 ***** N.B. NOT THE ACTUAL DOCUMENT need to UPDATE WHEN AVAILABLE ******
        lu_floor_cons_link['LPM10'] = ' - <a href="/core/media/media.nl?id=3531455&amp;c=472052&amp;h=33c920155499a822a89f&amp;_xt=.pdf" target="_blank">view floor construction</a>';
        lu_floor_cons_link['LPM14'] = ' - <a href="/core/media/media.nl?id=14206856&amp;c=472052&amp;h=f1d37c5b15c57a8e74b3&amp;_xt=.pdf" target="_blank">view floor construction</a>';
        lu_floor_cons_link['SC10'] = '';
        lu_floor_cons_link['SC14'] = ' - <a href="/core/media/media.nl?id=102809&amp;c=472052&amp;h=d71263474e81063ce07d&amp;_xt=.pdf" target="_blank">view floor construction</a>';
        lu_floor_cons_link['SCB14'] = ' - <a href="/core/media/media.nl?id=102812&amp;c=472052&amp;h=a7b75d205dc23ae65194&amp;_xt=.pdf" target="_blank">view floor construction</a>';
        lu_floor_cons_link['SCS14'] = ' - <a href="/core/media/media.nl?id=102814&amp;c=472052&amp;h=fb86c4ae8f0814eefb2c&amp;_xt=.pdf" target="_blank">view floor construction</a>';
        lu_floor_cons_link['SC17'] = ' - <a href="/core/media/media.nl?id=10254366&amp;c=472052&amp;h=407d3b9d4d310d0fc5eb&amp;_xt=.pdf" target="_blank">view floor construction</a>';
        lu_floor_cons_link['SL14'] = ' - <a href="/core/media/media.nl?id=102816&amp;c=472052&amp;h=dfb8d4e17f0cc3ea4790&amp;_xt=.pdf" target="_blank">view floor construction</a>';
        lu_floor_cons_link['SL17'] = ' - <a href="/core/media/media.nl?id=10255078&amp;c=472052&amp;h=320015dab30f6d8703c2&amp;_xt=.pdf" target="_blank">view floor construction</a>';
        lu_floor_cons_link['SL20'] = ' - <a href="/core/media/media.nl?id=736683&amp;c=472052&amp;h=910952832bd1cc13f36a&amp;_xt=.pdf" target="_blank">view floor construction</a>';
        lu_floor_cons_link['SM14'] = ' - <a href="/core/media/media.nl?id=102819&amp;c=472052&amp;h=eae3d7557d60b4c63c10&amp;_xt=.pdf" target="_blank">view floor construction</a>';
        lu_floor_cons_link['SM20'] = '';
        lu_floor_cons_link['SMC14'] = '';
        lu_floor_cons_link['SM17'] = ' - <a href="/core/media/media.nl?id=10254672&amp;c=472052&amp;h=1f7d4a7482f3f555d318&amp;_xt=.pdf" target="_blank">view floor construction</a>';
        lu_floor_cons_link['SSC17'] = ' - <a href="/core/media/media.nl?id=10254673&amp;c=472052&amp;h=6abd869055214f36f211&amp;_xt=.pdf" target="_blank">view floor construction</a>';
        lu_floor_cons_link['SSL17'] = ' - <a href="/core/media/media.nl?id=10254673&amp;c=472052&amp;h=6abd869055214f36f211&amp;_xt=.pdf" target="_blank">view floor construction</a>';
        lu_floor_cons_link['SP14'] = ' - <a href="/core/media/media.nl?id=102823&amp;c=472052&amp;h=20737e99f7e83945f079&amp;_xt=.pdf" target="_blank">view floor construction</a>';
        lu_floor_cons_link['TPBA(300)14'] = ' - <a href="/core/media/media.nl?id=102801&amp;c=472052&amp;h=1d5df819944134931841&amp;_xt=.pdf" target="_blank">view floor construction</a>';
        lu_floor_cons_link['TPBA(400)14'] = ' - <a href="/core/media/media.nl?id=102801&amp;c=472052&amp;h=1d5df819944134931841&amp;_xt=.pdf" target="_blank">view floor construction</a>';
        lu_floor_cons_link['TPBA(600)14'] = ' - <a href="/core/media/media.nl?id=102801&amp;c=472052&amp;h=1d5df819944134931841&amp;_xt=.pdf" target="_blank">view floor construction</a>';
        lu_floor_cons_link['TPBA14'] = ' - <a href="/core/media/media.nl?id=102801&amp;c=472052&amp;h=1d5df819944134931841&amp;_xt=.pdf� target="_blank">view floor construction</a>';
        lu_floor_cons_link['TPBAK(300)14'] = ' - <a href="/core/media/media.nl?id=300721&amp;c=472052&amp;h=1c54e51ac0372e87748e&amp;_xt=.pdf" target="_blank">view floor construction</a>';
        lu_floor_cons_link['TPBAK(600)14'] = ' - <a href="/core/media/media.nl?id=300721&amp;c=472052&amp;h=1c54e51ac0372e87748e&amp;_xt=.pdf� target="_blank">view floor construction</a>';
        lu_floor_cons_link['TPBAK14'] = ' - <a href="/core/media/media.nl?id=300721&amp;c=472052&amp;h=1c54e51ac0372e87748e&amp;_xt=.pdf" target="_blank">view floor construction</a>';
        lu_floor_cons_link['TPBAK14'] = ' - <a href="/core/media/media.nl?id=300721&amp;c=472052&amp;h=1c54e51ac0372e87748e&amp;_xt=.pdf� target="_blank">view floor construction</a>';
        lu_floor_cons_link['TS14'] = ' - <a href="/core/media/media.nl?id=102803&amp;c=472052&amp;h=3c2a470e24c69cf83268&amp;_xt=.pdf" target="_blank">view floor construction</a>';
        lu_floor_cons_link['TSB14'] = ' - <a href="http://www.nu-heat.co.uk/s.nl/it.I/id.118/.f" target="_blank">view floor construction</a>';
        lu_floor_cons_link['TSG14'] = ' - <a href="/core/media/media.nl?id=102807&amp;c=472052&amp;h=5d98036c5a9e6c8b749c&amp;_xt=.pdf" target="_blank">view floor construction</a>';


        //Floor construction types
        var lu_floor_cons_type = new Array();

        lu_floor_cons_type['ADPK(116)14'] = '';
        lu_floor_cons_type['ADPK(175)14'] = '';
        lu_floor_cons_type['ADPK(232)14'] = '';
        lu_floor_cons_type['ADPK14'] = '';
        lu_floor_cons_type['AMC14'] = 'AcoustiMax Floors'; //CJM Aug2017
        lu_floor_cons_type['AMT14'] = 'AcoustiMax Floors'; //CJM Aug2017
        lu_floor_cons_type['AKA14'] = '';
        lu_floor_cons_type['ASC14'] = 'Acoustic Floors';
        lu_floor_cons_type['ASCE14'] = 'Acoustic Floors';
        lu_floor_cons_type['ASC17'] = 'Acoustic Floors';
        lu_floor_cons_type['ASL17'] = 'Acoustic Floors';
        lu_floor_cons_type['ASSC17'] = 'Acoustic Floors';
        lu_floor_cons_type['ASSL17'] = 'Acoustic Floors';
        lu_floor_cons_type['ATA(C)14'] = '';
        lu_floor_cons_type['ATA(K)14'] = '';
        lu_floor_cons_type['ATPAK14'] = '';
        lu_floor_cons_type['DPB(133)14'] = '';
        lu_floor_cons_type['DPB(200)14'] = '';
        lu_floor_cons_type['DPBK(133)14'] = '';
        lu_floor_cons_type['DPBK(200)14'] = '';
        lu_floor_cons_type['DPBL(133)14'] = '';
        lu_floor_cons_type['DPBL(200)14'] = '';
        lu_floor_cons_type['DPBLK(133)14'] = '';
        lu_floor_cons_type['DPBLK(200)14'] = '';
        lu_floor_cons_type['DPF(116)14'] = 'Floating Floors';
        lu_floor_cons_type['DPF(175)14'] = 'Floating Floors';
        lu_floor_cons_type['DPF(232)14'] = 'Floating Floors';
        lu_floor_cons_type['DPFK(116)14'] = 'Floating Floors';
        lu_floor_cons_type['DPFK(175)14'] = 'Floating Floors';
        lu_floor_cons_type['DPFK(232)14'] = 'Floating Floors';
        lu_floor_cons_type['DPJ(133)14'] = '';
        lu_floor_cons_type['DPJ(200)14'] = '';
        lu_floor_cons_type['DPJ4(600)14'] = '';
        lu_floor_cons_type['DPJG(133)14'] = '';
        lu_floor_cons_type['DPJG(200)14'] = '';
        lu_floor_cons_type['DPJGK(133)14'] = '';
        lu_floor_cons_type['DPJGK(200)14'] = '';
        lu_floor_cons_type['DPJK(133)14'] = '';
        lu_floor_cons_type['DPJK(200)14'] = '';
        lu_floor_cons_type['DPL(116)14'] = '';
        lu_floor_cons_type['DPL(175)14'] = '';
        lu_floor_cons_type['DPL(232)14'] = '';
        lu_floor_cons_type['DPLK(116)14'] = '';
        lu_floor_cons_type['DPLK(116)14'] = '';
        lu_floor_cons_type['DPLK(232)14'] = '';
        lu_floor_cons_type['FD14'] = 'FastDeck Floors'; // CJM May2018
        lu_floor_cons_type['LH14'] = 'LH14 Floors';
        lu_floor_cons_type['LP10'] = 'LoPro Floors';
        lu_floor_cons_type['LPL10'] = 'LoProLite Floors'; // CJM June2018
        lu_floor_cons_type['LPM10'] = 'LoProMax Floors';
        lu_floor_cons_type['LPM14'] = 'LoProMax14 Floors'; //CJM Apr2018
        lu_floor_cons_type['SC10'] = 'Screed Floors';
        lu_floor_cons_type['SC14'] = 'Screed Floors';
        lu_floor_cons_type['SC17'] = 'Screed Floors';
        lu_floor_cons_type['SCB14'] = '';
        lu_floor_cons_type['SCS14'] = '';
        lu_floor_cons_type['SL14'] = 'Screed Floors';
        lu_floor_cons_type['SL17'] = 'Screed Floors';
        lu_floor_cons_type['SL20'] = '';
        lu_floor_cons_type['SM14'] = '';
        lu_floor_cons_type['SM17'] = '';
        lu_floor_cons_type['SM20'] = '';
        lu_floor_cons_type['SMC14'] = '';
        lu_floor_cons_type['SP14'] = '';
        lu_floor_cons_type['SSC17'] = 'Screed Floors';
        lu_floor_cons_type['SSE14'] = '';
        lu_floor_cons_type['SSE20'] = '';
        lu_floor_cons_type['SSL17'] = 'Screed Floors';
        lu_floor_cons_type['SSP14'] = '';
        lu_floor_cons_type['SSP20'] = '';
        lu_floor_cons_type['SST14'] = '';
        lu_floor_cons_type['SST20'] = '';
        lu_floor_cons_type['TPBA(300)14'] = 'Suspended Timber Floors';
        lu_floor_cons_type['TPBA(400)14'] = 'Suspended Timber Floors';
        lu_floor_cons_type['TPBA(600)14'] = 'Suspended Timber Floors';
        lu_floor_cons_type['TPBA14'] = 'Suspended Timber Floors';
        lu_floor_cons_type['TPBAK(300)14'] = 'Suspended Timber Floors';
        lu_floor_cons_type['TPBAK(600)14'] = 'Suspended Timber Floors';
        lu_floor_cons_type['TPBAK14'] = 'Suspended Timber Floors';
        lu_floor_cons_type['TPBAK14'] = 'Suspended Timber Floors';
        lu_floor_cons_type['TS14'] = '';
        lu_floor_cons_type['TSB14'] = '';
        lu_floor_cons_type['TSG14'] = '';

        var lu_floor_cons_pic = new Array();
        lu_floor_cons_pic['Acoustic Floors'] = '<a href="/core/media/media.nl?id=1852995&amp;c=472052&amp;h=92da467e9084a458c8a8" rel="lightbox[plants]" title="An example of an acoustic floor construction."><img src="/core/media/media.nl?id=1852996&amp;c=472052&amp;h=86460dae41b9ad973575" alt="Acoustic Floor Construction" /></a>';
        lu_floor_cons_pic['Floating Floors'] = '<a href="/core/media/media.nl?id=1853006&amp;c=472052&amp;h=97a95ba7f66904ec1d7e" rel="lightbox[plants]" title="An example of a floating floor construction."><img src="/core/media/media.nl?id=1853005&amp;c=472052&amp;h=d814017def1ecdf871ad" alt="Floating Floor Construction" /></a>';
        lu_floor_cons_pic['LoPro Floors'] = '<a href="/core/media/media.nl?id=7088624&amp;c=472052&amp;h=83a1969ad707e85c2540" rel="lightbox[plants]" title="An example of a LoPro panel with self-levelling compound edge."><img src="/core/media/media.nl?id=1853003&amp;c=472052&amp;h=a29448b2cf3b3e5e7aec" alt="LoPro Floor Construction" /></a> </p></td>\n <td><p><span style="color:#337BBD; font-weight:bold;">&amp;nbsp;</span><br> <a href="/core/media/media.nl?id=1853520&amp;c=472052&amp;h=76ae2266e42d847bcc04" rel="lightbox[plants]" title="An example of a LoPro joist floor construction."><img src="/core/media/media.nl?id=1853521&amp;c=472052&amp;h=3c956e0c3245cb8b745e" alt="LoPro Floor Construction" /></a>';
        lu_floor_cons_pic['Screed Floors'] = '<a href="/core/media/media.nl?id=1853002&amp;c=472052&amp;h=bcead63669f94c59fdb8" rel="lightbox[plants]" title="An example of a screed floor construction."><img src="/core/media/media.nl?id=1853001&amp;c=472052&amp;h=7039340bad8f42447ac4" alt="Screed Floor Construction" /></a>';
        lu_floor_cons_pic['Suspended Timber Floors'] = '<a href="/core/media/media.nl?id=9530072&amp;c=472052&amp;h=e4b8dedff39d07088db6" rel="lightbox[plants]" title="An example of a suspended timber floor construction."><img src="/core/media/media.nl?id=9530173&amp;c=472052&amp;h=8500e734d9125ed6a3d7" alt="Suspended Timber Floor Construction" /></a>';
        lu_floor_cons_pic['AcoustiMax Floors'] = '<a href="/core/media/media.nl?id=1852995&amp;c=472052&amp;h=92da467e9084a458c8a8" rel="lightbox[plants]" title="An example of an acoustic floor construction."><img src="/core/media/media.nl?id=1852996&amp;c=472052&amp;h=86460dae41b9ad973575" alt="Acoustic Floor Construction" /></a>'; //CJM Aug2017
        lu_floor_cons_pic['FastDeck Floors'] = '<a href="/core/media/media.nl?id=14762616&amp;c=472052&amp;h=86fa96f9b472d3d6e3a3" rel="lightbox[plants]" title="An example of an FastDeck&amp;reg; floor construction."><img src="/core/media/media.nl?id=1852996&amp;c=472052&amp;h=86460dae41b9ad973575" alt="FastDeck&amp;reg; Floor Construction" /></a>'; //CJM May2018 FastDeck
        lu_floor_cons_pic['LoProLite Floors'] = '<a href="/core/media/media.nl?id=14920644&amp;c=472052&amp;h=3173a8688c62729a19dc" rel="lightbox[plants]" title="An example of a LoPro&amp;reg;Lite floor construction."><img src="/core/media/media.nl?id=14920644&amp;c=472052&amp;h=3173a8688c62729a19dc" alt="LoPro&amp;reg;Lite Floor Construction" /></a>'; //CJM June2018 LoPro&amp;reg;Lite

        var lu_srp_rating = new Array();
        lu_srp_rating['A+++'] = '<img src="/core/media/media.nl?id=14227093&amp;c=472052&amp;h=2f6d1bc52d01dc479bb2" alt="A+++" style="float: none; background: none; border: 0px; margin: 0; padding: 0;">';
        lu_srp_rating['A++'] = '<img src="/core/media/media.nl?id=14227126&amp;c=472052&amp;h=38a8c9952d04f4acce62" alt="A++" style="float: none; background: none; border: 0px; margin: 0; padding: 0;">';
        lu_srp_rating['A+'] = '<img src="/core/media/media.nl?id=14227131&amp;c=472052&amp;h=8f6ba8535e083f0ab418" alt="A+" style="float: none; background: none; border: 0px; margin: 0; padding: 0;">';
        lu_srp_rating['A'] = '<img src="/core/media/media.nl?id=14227124&amp;c=472052&amp;h=accd80e2459b72598b0c" alt="A" style="float: none; background: none; border: 0px; margin: 0; padding: 0;">';
        lu_srp_rating['B'] = '<img src="/core/media/media.nl?id=14227105&amp;c=472052&amp;h=e65e5093578e788d2de8" alt="B" style="float: none; background: none; border: 0px; margin: 0; padding: 0;">';
        lu_srp_rating['C'] = '<img src="/core/media/media.nl?id=14227114&amp;c=472052&amp;h=3c1a4f2beecf119e41c2" alt="C" style="float: none; background: none; border: 0px; margin: 0; padding: 0;">';
        lu_srp_rating['D'] = '<img src="/core/media/media.nl?id=14227092&amp;c=472052&amp;h=462211818a30702a31f0" alt="D" style="float: none; background: none; border: 0px; margin: 0; padding: 0;">';
        lu_srp_rating['E'] = '<img src="/core/media/media.nl?id=14227098&amp;c=472052&amp;h=4bec376baffdc7423329" alt="E" style="float: none; background: none; border: 0px; margin: 0; padding: 0;">';
        lu_srp_rating['F'] = '<img src="/core/media/media.nl?id=14227090&amp;c=472052&amp;h=3a74b05846207df8a49b" alt="F" style="float: none; background: none; border: 0px; margin: 0; padding: 0;">';
        lu_srp_rating['G'] = '<img src="/core/media/media.nl?id=14227137&amp;c=472052&amp;h=7a35ff364a892e199725" alt="G" style="float: none; background: none; border: 0px; margin: 0; padding: 0;">';


        //Solar schematic image
        var lu_sol_schematic_image = new Array();
        lu_sol_schematic_image['SC04'] = '<tr><td colspan="2" align="center" valign="top"><img border="0" src="/core/media/media.nl?id=1043483&amp;amp;c=472052&amp;amp;h=ce3a4a7f198edb39b589" /></td></tr>\n';
        lu_sol_schematic_image['SC04B'] = '<tr><td colspan="2" align="center" valign="top"><img border="0" src="/core/media/media.nl?id=1043482&amp;amp;c=472052&amp;amp;h=53152bfc4f47aaf0127e" /></td></tr>\n';
        lu_sol_schematic_image['SC05'] = '<tr><td colspan="2" align="center" valign="top"><img border="0" src="/core/media/media.nl?id=1043484&amp;amp;c=472052&amp;amp;h=145b4104e62b31af2e93" /></td></tr>\n';
        lu_sol_schematic_image['SP02'] = '<tr><td colspan="2" align="center" valign="top"><img border="0" src="/core/media/media.nl?id=1043485&amp;amp;c=472052&amp;amp;h=8fe08a5ee12f591cbbed" /></td></tr>\n';
        lu_sol_schematic_image['SP03'] = '<tr><td colspan="2" align="center" valign="top"><img border="0" src="/core/media/media.nl?id=1043486&amp;amp;c=472052&amp;amp;h=5e8b068b5669635c84a3" /></td></tr>\n';
        lu_sol_schematic_image['SU01'] = '<tr><td colspan="2" align="center" valign="top"><img border="0" src="/core/media/media.nl?id=1043481&amp;amp;c=472052&amp;amp;h=162a4d70eef8969ab9e5" /></td></tr>\n';
        lu_sol_schematic_image['ST01'] = '<tr><td colspan="2" align="center" valign="top"><img border="0" src="/core/media/media.nl?id=2993483&amp;amp;c=472052&amp;amp;h=49785f3caff9a0414a8e" /></td></tr>\n';
        //new values added for the new solar quote 28/01/2014
        lu_sol_schematic_image['SH02'] = '<tr><td colspan="2" align="center" valign="top"><img border="0" src="/core/media/media.nl?id=1043483&amp;amp;c=472052&amp;amp;h=ce3a4a7f198edb39b589" /></td></tr>\n';
        lu_sol_schematic_image['SU02'] = '<tr><td colspan="2" align="center" valign="top"><img border="0" src="/core/media/media.nl?id=1043481&amp;amp;c=472052&amp;amp;h=162a4d70eef8969ab9e5" /></td></tr>\n';
        lu_sol_schematic_image['ST02'] = '<tr><td colspan="2" align="center" valign="top"><img border="0" src="/core/media/media.nl?id=2993483&amp;amp;c=472052&amp;amp;h=49785f3caff9a0414a8e" /></td></tr>\n';


        //Heatpump schematic image
        var lu_hp_schematic_image = new Array();
        lu_hp_schematic_image['A11'] = '<tr><td colspan="3" align="center" valign="top"><img border="0" src="/core/media/media.nl?id=1042862&amp;c=472052&amp;h=2c2dd6deaf5d45c6755f"></td></tr>\n';
        lu_hp_schematic_image['A14'] = '<tr><td colspan="3" align="center" valign="top"><img border="0" src="/core/media/media.nl?id=1042863&amp;c=472052&amp;h=f9992764ba79315b4ffa"></td></tr>\n';
        lu_hp_schematic_image['A14-S'] = '<tr><td colspan="3" align="center" valign="top"><img border="0" src="/core/media/media.nl?id=1042864&amp;c=472052&amp;h=221fb2a45eb1b488cbd1"></td></tr>\n';
        lu_hp_schematic_image['A15'] = '<tr><td colspan="3" align="center" valign="top"><img border="0" src="/core/media/media.nl?id=1042865&amp;c=472052&amp;h=d406284bd4263d66e229"></td></tr>\n';
        lu_hp_schematic_image['A16'] = '<tr><td colspan="3" align="center" valign="top"><img border="0" src="/core/media/media.nl?id=1042866&amp;c=472052&amp;h=d0c54e1acdc638d612e0"></td></tr>\n';
        lu_hp_schematic_image['A16-S'] = '<tr><td colspan="3" align="center" valign="top"><img border="0" src="/core/media/media.nl?id=1042867&amp;c=472052&amp;h=becc7cf9efa5de5369bc"></td></tr>\n';
        lu_hp_schematic_image['B11'] = '<tr><td colspan="3" align="center" valign="top"><img border="0" src="/core/media/media.nl?id=1042868&amp;c=472052&amp;h=d40225fb598e251cd9d2"></td></tr>\n';
        lu_hp_schematic_image['B11-S'] = '<tr><td colspan="3" align="center" valign="top"><img border="0" src="/core/media/media.nl?id=1042869&amp;c=472052&amp;h=4731fb7c816d3820bb36"></td></tr>\n';
        lu_hp_schematic_image['C05'] = '';
        lu_hp_schematic_image['c07.1'] = '';
        lu_hp_schematic_image['C09'] = '';

        lu_hp_schematic_image['C20'] = '<tr><td colspan="3" align="center" valign="top"><img border="0" src="/core/media/media.nl?id=4976985&amp;c=472052&amp;h=49a4f9b515161bf5bda4"></td></tr>\n';
        lu_hp_schematic_image['C21'] = '<tr><td colspan="3" align="center" valign="top"><img border="0" src="/core/media/media.nl?id=4976986&amp;c=472052&amp;h=4cb56f39a59062580f20"></td></tr>\n';
        lu_hp_schematic_image['C21-S'] = '<tr><td colspan="3" align="center" valign="top"><img border="0" src="/core/media/media.nl?id=4976987&amp;c=472052&amp;h=49d1e96a62cd340336ce"></td></tr>\n';
        lu_hp_schematic_image['C22'] = '<tr><td colspan="3" align="center" valign="top"><img border="0" src="/core/media/media.nl?id=4976988&amp;c=472052&amp;h=5ef16ae89685b611d297"></td></tr>\n';
        lu_hp_schematic_image['C23'] = '<tr><td colspan="3" align="center" valign="top"><img border="0" src="/core/media/media.nl?id=4976989&amp;c=472052&amp;h=c61f54fa38a78efd9781"></td></tr>\n';
        lu_hp_schematic_image['C23-S'] = '<tr><td colspan="3" align="center" valign="top"><img border="0" src="/core/media/media.nl?id=4976990&amp;c=472052&amp;h=728bc4a9ebd787cb0b25"></td></tr>\n';

        lu_hp_schematic_image['C24'] = '<tr><td colspan="3" align="center" valign="top"><img border="0" src="/core/media/media.nl?id=5939094&amp;c=472052&amp;h=2f042af110cd004125eb"></td></tr>\n';
        lu_hp_schematic_image['C25'] = '<tr><td colspan="3" align="center" valign="top"><img border="0" src="/core/media/media.nl?id=5939095&amp;c=472052&amp;h=125b04cb7fd570ffcd52"></td></tr>\n';
        lu_hp_schematic_image['C25-S'] = '<tr><td colspan="3" align="center" valign="top"><img border="0" src="/core/media/media.nl?id=5939096&amp;c=472052&amp;h=9626589fdfa38ab6077b"></td></tr>\n';

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
        lu_hp_schematic_image['H23'] = '<tr><td colspan="3" align="center" valign="top"><img border="0" src="/core/media/media.nl?id=1042870&amp;c=472052&amp;h=17222bba2e8dbdfc3d33"></td></tr>\n';
        lu_hp_schematic_image['H24'] = '<tr><td colspan="3" align="center" valign="top"><img border="0" src="/core/media/media.nl?id=1042871&amp;c=472052&amp;h=1b7912a61cede465df06"></td></tr>\n';
        lu_hp_schematic_image['H24-S'] = '<tr><td colspan="3" align="center" valign="top"><img border="0" src="/core/media/media.nl?id=1042858&amp;c=472052&amp;h=d755bde661381bb7b01b"></td></tr>\n';
        lu_hp_schematic_image['H27DUAL'] = '<tr><td colspan="3" align="center" valign="top"><img border="0" src="/core/media/media.nl?id=2336693&amp;c=472052&amp;h=138faceba44e2d3869ed"></td></tr>\n';
        lu_hp_schematic_image['H28DUAL'] = '<tr><td colspan="3" align="center" valign="top"><img border="0" src="/core/media/media.nl?id=2336692&amp;c=472052&amp;h=3562bd11e65faf8abe30"></td></tr>\n';
        lu_hp_schematic_image['H28-SDUAL'] = '<tr><td colspan="3" align="center" valign="top"><img border="0" src="/core/media/media.nl?id=2336691&amp;c=472052&amp;h=820ff2b0429113792749"></td></tr>\n';
        lu_hp_schematic_image['H30'] = '<tr><td colspan="3" align="center" valign="top"><img border="0" src="/core/media/media.nl?id=1042859&amp;c=472052&amp;h=e8ac23e8d130498bdf0a"></td></tr>\n';
        lu_hp_schematic_image['H31'] = '<tr><td colspan="3" align="center" valign="top"><img border="0" src="/core/media/media.nl?id=1042860&amp;c=472052&amp;h=3d07b4388809b9a6aeef"></td></tr>\n';
        lu_hp_schematic_image['H31-S'] = '<tr><td colspan="3" align="center" valign="top"><img border="0" src="/core/media/media.nl?id=1042861&amp;c=472052&amp;h=c3656cc9d512a1098ebb"></td></tr>\n';

        lu_hp_schematic_image['H23M'] = '<tr><td colspan="3" align="center" valign="top"><img border="0" src="/core/media/media.nl?id=1766333&amp;c=472052&amp;h=f9a8f02686fb83c772e7"></td></tr>\n';
        lu_hp_schematic_image['H24M'] = '<tr><td colspan="3" align="center" valign="top"><img border="0" src="/core/media/media.nl?id=1766332&amp;c=472052&amp;h=21c30f814792c1ab9e46"></td></tr>\n';
        lu_hp_schematic_image['H24M-S'] = '<tr><td colspan="3" align="center" valign="top"><img border="0" src="/core/media/media.nl?id=1766331&amp;c=472052&amp;h=6aa6bfba504d9aa47e5b"></td></tr>\n';
        lu_hp_schematic_image['H30M'] = '<tr><td colspan="3" align="center" valign="top"><img border="0" src="/core/media/media.nl?id=1766330&amp;c=472052&amp;h=64af8bc72ad07212fa05"></td></tr>\n';
        lu_hp_schematic_image['H31M'] = '<tr><td colspan="3" align="center" valign="top"><img border="0" src="/core/media/media.nl?id=1766329&amp;c=472052&amp;h=d646689afc11bce9a6b4"></td></tr>\n';
        lu_hp_schematic_image['H31M-S'] = '<tr><td colspan="3" align="center" valign="top"><img border="0" src="/core/media/media.nl?id=1766328&amp;c=472052&amp;h=bb8f75d4813ac3d2f725"></td></tr>\n';

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
        lu_upgrades_link['PBS-A'] = '<a href="http://www.nu-heat.co.uk/products/thermostats/push-button-dial.html?utm_source=quote&amp;utm_medium=email&amp;utm_campaign=upgrades#pbs" target="_blank">Find out more &amp; view 360&deg; images</a>';
        lu_upgrades_link['PBR-A'] = '<a href="http://www.nu-heat.co.uk/products/thermostats/programmable-dial.html?utm_source=quote&amp;utm_medium=quote&amp;utm_campaign=upgrades#pbr" target="_blank">Find out more &amp; view 360&deg; images</a>';
        lu_upgrades_link['PBL-A'] = '<a href="http://www.nu-heat.co.uk/products/thermostats/low-voltage.html?utm_source=quote&amp;utm_medium=email&amp;utm_campaign=upgrades#pbl" target="_blank">Find out more &amp; view 360&deg; images</a>';
        lu_upgrades_link['MCV3-C'] = '<a href="http://www.nu-heat.co.uk/products/thermostats/low-voltage.html?utm_source=quote&amp;utm_medium=email&amp;utm_campaign=upgrades#console" target="_blank">Find out more</a>';
        /*CJM Jan2017 new image page with customer service link*/
        lu_upgrades_link['NWSR-A'] = '<a href="http://www.nu-heat.co.uk/products/thermostats/programmable-dial/?utm_source=quote&amp;utm_medium=quote&amp;utm_campaign=upgrades">Find out more</a>'; //CJM Jan2017
        lu_upgrades_link['NBSR-A'] = '<a href="http://www.nu-heat.co.uk/products/thermostats/programmable-dial/?utm_source=quote&amp;utm_medium=quote&amp;utm_campaign=upgrades">Find out more</a>'; //CJM Jan2017
        lu_upgrades_link['NSSR-A'] = '<a href="http://www.nu-heat.co.uk/products/thermostats/programmable-dial/?utm_source=quote&amp;utm_medium=quote&amp;utm_campaign=upgrades">Find out more</a>'; //CJM Jan2017
        lu_upgrades_link['NBBR-A'] = '<a href="http://www.nu-heat.co.uk/products/thermostats/programmable-dial/?utm_source=quote&amp;utm_medium=quote&amp;utm_campaign=upgrades">Find out more</a>'; //CJM Jan2017
        lu_upgrades_link['NWBR-A'] = '<a href="http://www.nu-heat.co.uk/products/thermostats/programmable-dial/?utm_source=quote&amp;utm_medium=quote&amp;utm_campaign=upgrades">Find out more</a>'; //CJM Jan2017
        lu_upgrades_link['NSBR-A'] = '<a href="http://www.nu-heat.co.uk/products/thermostats/programmable-dial/?utm_source=quote&amp;utm_medium=quote&amp;utm_campaign=upgrades">Find out more</a>'; //CJM Jan2017
        lu_upgrades_link['neoStatW/TC-A'] = '';
        lu_upgrades_link['neoStatB/TC-A'] = '';
        lu_upgrades_link['neoStatS/TC-A'] = '';
        lu_upgrades_link['neoHub-C'] = '<a href="http://www.nu-heat.co.uk/products/thermostats/smart-controls/?utm_source=quote&amp;utm_medium=quote&amp;utm_campaign=upgrades">Find out more</a>'; //CJM May2016
        lu_upgrades_link['neoHub+-C'] = '<a href="http://www.nu-heat.co.uk/products/thermostats/smart-controls/?utm_source=quote&amp;utm_medium=quote&amp;utm_campaign=upgrades">Find out more</a>'; //CJM May2016
        lu_upgrades_link['neoHub/1neoPlug-A'] = '<a href="http://www.nu-heat.co.uk/products/thermostats/smart-controls.html?utm_source=quote&amp;utm_medium=quote&amp;utm_campaign=upgrades">Find out more</a>'; //CJM May2016
        lu_upgrades_link['neoHub/2neoPlug-A'] = '<a href="http://www.nu-heat.co.uk/products/thermostats/smart-controls.html?utm_source=quote&amp;utm_medium=quote&amp;utm_campaign=upgrades">Find out more</a>'; //CJM May2016
        lu_upgrades_link['neoHub/3neoPlug-A'] = '<a href="http://www.nu-heat.co.uk/products/thermostats/smart-controls.html?utm_source=quote&amp;utm_medium=quote&amp;utm_campaign=upgrades">Find out more</a>'; //CJM May2016
        lu_upgrades_link['neoHub/4neoPlug-A'] = '<a href="http://www.nu-heat.co.uk/products/thermostats/smart-controls.html?utm_source=quote&amp;utm_medium=quote&amp;utm_campaign=upgrades">Find out more</a>'; //CJM May2016
        lu_upgrades_link['neoHub+/1neoPlug-A'] = '<a href="http://www.nu-heat.co.uk/products/thermostats/smart-controls.html?utm_source=quote&amp;utm_medium=quote&amp;utm_campaign=upgrades">Find out more</a>'; //CJM May2016
        lu_upgrades_link['neoHub+/2neoPlug-A'] = '<a href="http://www.nu-heat.co.uk/products/thermostats/smart-controls.html?utm_source=quote&amp;utm_medium=quote&amp;utm_campaign=upgrades">Find out more</a>'; //CJM May2016
        lu_upgrades_link['neoHub+/3neoPlug-A'] = '<a href="http://www.nu-heat.co.uk/products/thermostats/smart-controls.html?utm_source=quote&amp;utm_medium=quote&amp;utm_campaign=upgrades">Find out more</a>'; //CJM May2016
        lu_upgrades_link['neoHub+/4neoPlug-A'] = '<a href="http://www.nu-heat.co.uk/products/thermostats/smart-controls.html?utm_source=quote&amp;utm_medium=quote&amp;utm_campaign=upgrades">Find out more</a>'; //CJM May2016
        lu_upgrades_link['RFSWITCH-C'] = ''; //CJM May2016
        lu_upgrades_link['TSL-A'] = '<a href="http://www.nu-heat.co.uk/products/thermostats/low-voltage.html?utm_source=quote&amp;utm_medium=email&amp;utm_campaign=upgrades#tsl">Find out more</a>';
        lu_upgrades_link['neoUltraStat'] = '<a href="http://www.nu-heat.co.uk/products/thermostats/smart-controls/?utm_source=quote&amp;utm_medium=quote&amp;utm_campaign=upgrades">Find out more</a>'; //CJM Jan2017
        lu_upgrades_link['neoUltraAir'] = '<a href="http://www.nu-heat.co.uk/products/thermostats/smart-controls/?utm_source=quote&amp;utm_medium=quote&amp;utm_campaign=upgrades">Find out more</a>'; //CJM Jan2017
        lu_upgrades_link['neoUltraB-C'] = '<a href="http://www.nu-heat.co.uk/products/thermostats/smart-controls/?utm_source=quote&amp;utm_medium=quote&amp;utm_campaign=upgrades">Find out more</a>'; //CJM Jan2017
        lu_upgrades_link['neoUltraW-C'] = '<a href="http://www.nu-heat.co.uk/products/thermostats/smart-controls/?utm_source=quote&amp;utm_medium=quote&amp;utm_campaign=upgrades">Find out more</a>'; //CJM Jan2017
        lu_upgrades_link['neoUltra+Stat'] = '<a href="http://www.nu-heat.co.uk/products/thermostats/smart-controls/?utm_source=quote&amp;utm_medium=quote&amp;utm_campaign=upgrades">Find out more</a>'; //CJM June2017
        lu_upgrades_link['neoUltra+Air'] = '<a href="http://www.nu-heat.co.uk/products/thermostats/smart-controls/?utm_source=quote&amp;utm_medium=quote&amp;utm_campaign=upgrades">Find out more</a>'; //CJM June2017

        /*
        lu_upgrades_link['NWSR-A'] = '<a href="http://www.nu-heat.co.uk/products/thermostats/programmable-dial.html?utm_source=quote&amp;utm_medium=quote&amp;utm_campaign=upgrades">Find out more</a>';	//CJM May2016
        lu_upgrades_link['NBSR-A'] = '<a href="http://www.nu-heat.co.uk/products/thermostats/programmable-dial.html?utm_source=quote&amp;utm_medium=quote&amp;utm_campaign=upgrades">Find out more</a>';	//CJM May2016
        lu_upgrades_link['NSSR-A'] = '<a href="http://www.nu-heat.co.uk/products/thermostats/programmable-dial.html?utm_source=quote&amp;utm_medium=quote&amp;utm_campaign=upgrades">Find out more</a>';	//CJM May2016
        lu_upgrades_link['NBBR-A'] = '<a href="http://www.nu-heat.co.uk/products/thermostats/programmable-dial.html?utm_source=quote&amp;utm_medium=quote&amp;utm_campaign=upgrades">Find out more</a>';	//CJM May2016
        lu_upgrades_link['NWBR-A'] = '<a href="http://www.nu-heat.co.uk/products/thermostats/programmable-dial.html?utm_source=quote&amp;utm_medium=quote&amp;utm_campaign=upgrades">Find out more</a>';	//CJM May2016
        lu_upgrades_link['NSBR-A'] = '<a href="http://www.nu-heat.co.uk/products/thermostats/programmable-dial.html?utm_source=quote&amp;utm_medium=quote&amp;utm_campaign=upgrades">Find out more</a>';	//CJM May2016
        lu_upgrades_link['neoHub-C'] = '<a href="http://www.nu-heat.co.uk/products/thermostats/smart-controls.html?utm_source=quote&amp;utm_medium=quote&amp;utm_campaign=upgrades">Find out more</a>';	//CJM May2016
        */



        var lu_upgrades_image = new Array();
        lu_upgrades_image['PBS-A'] = '<img style="border:none; padding:0; margin:0;" src="/core/media/media.nl?id=14227134&amp;c=472052&amp;h=e8aaa0fb7cc555cfca76" alt="PBS Push button thermostat" width="210" height="143">';
        lu_upgrades_image['PBR-A'] = '<img style="border:none; padding:0; margin:0;" src="/core/media/media.nl?id=14227112&amp;c=472052&amp;h=e517729e780faef6661b" alt="wireless stat" width="210" height="143">';
        lu_upgrades_image['PBL-A'] = '<img style="border:none; padding:0; margin:0;" src="/core/media/media.nl?id=14227134&amp;c=472052&amp;h=e8aaa0fb7cc555cfca76" alt="PBL Push button low voltage thermostat" width="210" height="143">';
        lu_upgrades_image['MCV3-C'] = '<img style="border:none; padding:0; margin:0;" src="/core/media/media.nl?id=14227089&amp;c=472052&amp;h=c6427bc5bc94025d783d" alt="Touchscreen central control unit for low voltage thermostats" width="210" height="143">';
        /*CJM Jan2017 new image page with customer service link*/
        lu_upgrades_image['NWSR-A'] = '<img style="border:none; padding:0; margin:0;" src="/core/media/media.nl?id=14227095&amp;c=472052&amp;h=d728bf8f347ef65fcdc8" alt="Programmable neoStats" width="210" height="143">'; //CJM Jan2017
        lu_upgrades_image['NBSR-A'] = '<img style="border:none; padding:0; margin:0;" src="/core/media/media.nl?id=14227095&amp;c=472052&amp;h=d728bf8f347ef65fcdc8" alt="Programmable neoStats" width="210" height="143">'; //CJM Jan2017
        lu_upgrades_image['NSSR-A'] = '<img style="border:none; padding:0; margin:0;" src="/core/media/media.nl?id=14227095&amp;c=472052&amp;h=d728bf8f347ef65fcdc8" alt="Programmable neoStats" width="210" height="143">'; //CJM Jan2017
        lu_upgrades_image['NBBR-A'] = '<img style="border:none; padding:0; margin:0;" src="/core/media/media.nl?id=14227097&amp;c=472052&amp;h=8b076b1c2daff179f5ba" alt="wireless neoAir" width="210" height="143">'; //CJM Jan2017
        lu_upgrades_image['NWBR-A'] = '<img style="border:none; padding:0; margin:0;" src="/core/media/media.nl?id=14227097&amp;c=472052&amp;h=8b076b1c2daff179f5ba" alt="wireless neoAir" width="210" height="143">'; //CJM Jan2017
        lu_upgrades_image['NSBR-A'] = '<img style="border:none; padding:0; margin:0;" src="/core/media/media.nl?id=14227097&amp;c=472052&amp;h=8b076b1c2daff179f5ba" alt="wireless neoAir" width="210" height="143">'; //CJM Jan2017
        lu_upgrades_image['neoStatW/TC-A'] = '<img style="border:none; padding:0; margin:0;" src="/core/media/media.nl?id=14227132&amp;c=472052&amp;h=3700ce931d888e384a11" alt="neoStat hot water timer" width="210" height="143">';
        lu_upgrades_image['neoStatB/TC-A'] = '<img style="border:none; padding:0; margin:0;" src="/core/media/media.nl?id=14227132&amp;c=472052&amp;h=3700ce931d888e384a11" alt="neoStat hot water timer" width="210" height="143">';
        lu_upgrades_image['neoStatS/TC-A'] = '<img style="border:none; padding:0; margin:0;" src="/core/media/media.nl?id=14227132&amp;c=472052&amp;h=3700ce931d888e384a11" alt="neoStat hot water timer" width="210" height="143">';
        lu_upgrades_image['neoHub-C'] = '<img style="border:none; padding:0; margin:0;" src="/core/media/media.nl?id=14227125&amp;c=472052&amp;h=fecb3e26a6d878062b08" alt="wireless stat" width="210" height="143">';
        lu_upgrades_image['neoHub+-C'] = '<img style="border:none; padding:0; margin:0;" src="/core/media/media.nl?id=14227119&amp;c=472052&amp;h=1a9e618a3729f5bde429" alt="wireless stat" width="210" height="143">';
        lu_upgrades_image['neoHub/1neoPlug-A'] = '<img style="border:none; padding:0; margin:0;" src="/core/media/media.nl?id=14227110&amp;c=472052&amp;h=66ad62f9256f78888805" alt="wireless stat" width="210" height="143">'; //CJM May2016
        lu_upgrades_image['neoHub/2neoPlug-A'] = '<img style="border:none; padding:0; margin:0;" src="/core/media/media.nl?id=14227110&amp;c=472052&amp;h=66ad62f9256f78888805" alt="wireless stat" width="210" height="143">'; //CJM May2016
        lu_upgrades_image['neoHub/3neoPlug-A'] = '<img style="border:none; padding:0; margin:0;" src="/core/media/media.nl?id=14227110&amp;c=472052&amp;h=66ad62f9256f78888805" alt="wireless stat" width="210" height="143">'; //CJM May2016
        lu_upgrades_image['neoHub/4neoPlug-A'] = '<img style="border:none; padding:0; margin:0;" src="/core/media/media.nl?id=14227110&amp;c=472052&amp;h=66ad62f9256f78888805" alt="wireless stat" width="210" height="143">'; //CJM May2016
        lu_upgrades_image['neoHub+/1neoPlug-A'] = '<img style="border:none; padding:0; margin:0;" src="/core/media/media.nl?id=14227127&amp;c=472052&amp;h=8a602e536504e817d7df" alt="wireless stat" width="210" height="143">'; //CJM May2016
        lu_upgrades_image['neoHub+/2neoPlug-A'] = '<img style="border:none; padding:0; margin:0;" src="/core/media/media.nl?id=14227127&amp;c=472052&amp;h=8a602e536504e817d7df" alt="wireless stat" width="210" height="143">'; //CJM May2016
        lu_upgrades_image['neoHub+/3neoPlug-A'] = '<img style="border:none; padding:0; margin:0;" src="/core/media/media.nl?id=14227127&amp;c=472052&amp;h=8a602e536504e817d7df" alt="wireless stat" width="210" height="143">'; //CJM May2016
        lu_upgrades_image['neoHub+/4neoPlug-A'] = '<img style="border:none; padding:0; margin:0;" src="/core/media/media.nl?id=14227127&amp;c=472052&amp;h=8a602e536504e817d7df" alt="wireless stat" width="210" height="143">'; //CJM May2016
        lu_upgrades_image['RFSWITCH-C'] = '<img style="border:none; padding:0; margin:0;" src="/core/media/media.nl?id=14227115&amp;c=472052&amp;h=e0c100a6ed1bcf45141d" alt="wireless stat" width="210" height="143">'; //CJM May2016
        lu_upgrades_image['TSL-A'] = '<img style="border:none; padding:0; margin:0;" src="/core/media/media.nl?id=14227108&amp;c=472052&amp;h=61838fe4114039504065" alt="TsL" width="210" height="143">';
        lu_upgrades_image['neoUltraStat'] = '<img style="border:none; padding:0; margin:0;" src="/core/media/media.nl?id=14227129&amp;c=472052&amp;h=58eefac026c07f8e537e" alt="Smart controls" width="210" height="143">'; //CJM Jan2017
        lu_upgrades_image['neoUltraAir'] = '<img style="border:none; padding:0; margin:0;" src="/core/media/media.nl?id=14227102&amp;c=472052&amp;h=b8e0ed5d602035b11206" alt="Smart controls" width="210" height="143">'; //CJM Jan2017
        lu_upgrades_image['neoUltra+Stat'] = '<img style="border:none; padding:0; margin:0;" src="/core/media/media.nl?id=14227104&amp;c=472052&amp;h=90682a009a3ae0e83c46" alt="Smart controls" width="210" height="143">'; //CJM June2017
        lu_upgrades_image['neoUltra+Air'] = '<img style="border:none; padding:0; margin:0;" src="/core/media/media.nl?id=14227127&amp;c=472052&amp;h=8a602e536504e817d7df" alt="Smart controls" width="210" height="143">'; //CJM June2017
        /*
        lu_upgrades_image['NWSR-A'] = '<img style="border:none; padding:0; margin:0;" src="/core/media/media.nl?id=14231217&amp;c=472052&amp;h=5cda6590ef3aef986dbe" alt="Programmable neoStats" width="210" height="143">';	//CJM Jan2017
        lu_upgrades_image['NBSR-A'] = '<img style="border:none; padding:0; margin:0;" src="/core/media/media.nl?id=14231217&amp;c=472052&amp;h=5cda6590ef3aef986dbe" alt="Programmable neoStats" width="210" height="143">';	//CJM Jan2017
        lu_upgrades_image['NSSR-A'] = '<img style="border:none; padding:0; margin:0;" src="/core/media/media.nl?id=14231217&amp;c=472052&amp;h=5cda6590ef3aef986dbe" alt="Programmable neoStats" width="210" height="143">';	//CJM Jan2017
        lu_upgrades_image['NBBR-A'] = '<img style="border:none; padding:0; margin:0;" src="/core/media/media.nl?id=14231217&amp;c=472052&amp;h=5cda6590ef3aef986dbe" alt="wireless neoAir" width="210" height="143">';	//CJM Jan2017
        lu_upgrades_image['NWBR-A'] = '<img style="border:none; padding:0; margin:0;" src="/core/media/media.nl?id=14231217&amp;c=472052&amp;h=5cda6590ef3aef986dbe" alt="wireless neoAir" width="210" height="143">';	//CJM Jan2017
        lu_upgrades_image['NSBR-A'] = '<img style="border:none; padding:0; margin:0;" src="/core/media/media.nl?id=14231217&amp;c=472052&amp;h=5cda6590ef3aef986dbe" alt="wireless neoAir" width="210" height="143">';	//CJM Jan2017
        */
        var lu_upgrades_name = new Array();
        lu_upgrades_name['PBS-A'] = 'PBS Push button thermostat';
        lu_upgrades_name['PBR-A'] = 'Wireless thermostat - ideal for renovations';
        lu_upgrades_name['PBL-A'] = 'PBL Push button low voltage thermostat';
        lu_upgrades_name['MCV3-C'] = 'Touchscreen central control unit for low voltage thermostats';
        lu_upgrades_name['NWSR-A'] = 'Programmable neoStats';
        lu_upgrades_name['NBSR-A'] = 'Programmable neoStats';
        lu_upgrades_name['NSSR-A'] = 'Programmable neoStats';
        lu_upgrades_name['NBBR-A'] = 'Wireless neoAir'; //CJM May2016
        lu_upgrades_name['NWBR-A'] = 'Wireless neoAir'; //CJM May2016
        lu_upgrades_name['NSBR-A'] = 'Wireless neoAir'; //CJM May2016
        lu_upgrades_name['neoStatW/TC-A'] = 'neoStat hot water timer';
        lu_upgrades_name['neoStatB/TC-A'] = 'neoStat hot water timer';
        lu_upgrades_name['neoStatS/TC-A'] = 'neoStat hot water timer';
        lu_upgrades_name['neoHub-C'] = 'neoStat smart package';
        lu_upgrades_name['neoHub+-C'] = 'neoStat smart package'; //CJM June2017
        lu_upgrades_name['neoHub/1neoPlug-A'] = 'neoAir smart package<br>'; //CJM May2016
        lu_upgrades_name['neoHub/2neoPlug-A'] = 'neoAir smart package<br>'; //CJM May2016
        lu_upgrades_name['neoHub/3neoPlug-A'] = 'neoAir smart package<br>'; //CJM May2016
        lu_upgrades_name['neoHub/4neoPlug-A'] = 'neoAir smart package<br>'; //CJM May2016
        lu_upgrades_name['neoHub+/1neoPlug-A'] = 'neoAir smart package<br>'; //CJM June2017
        lu_upgrades_name['neoHub+/2neoPlug-A'] = 'neoAir smart package<br>'; //CJM June2017
        lu_upgrades_name['neoHub+/3neoPlug-A'] = 'neoAir smart package<br>'; //CJM June2017
        lu_upgrades_name['neoHub+/4neoPlug-A'] = 'neoAir smart package<br>'; //CJM June2017
        lu_upgrades_name['RFSWITCH-C'] = 'RF switch for wireless control of the boiler and pump<br>'; //CJM May2016
        lu_upgrades_name['TSL-A'] = 'TSL Touchscreen low voltage thermostat';
        lu_upgrades_name['neoUltraStat'] = 'neoStat smart package plus+'; //CJM Jan2017
        lu_upgrades_name['neoUltraAir'] = 'neoAir smart package plus+'; //CJM Jan2017
        lu_upgrades_name['neoUltra+Stat'] = 'neoStat smart package plus+'; //CJM June2017
        lu_upgrades_name['neoUltra+Air'] = 'neoAir smart package plus+'; //CJM June2017

        //------CJM 8th Aug 2017 adding Android and Apple text ---- 8Aug2017
        var lu_upgrades_description = new Array();
        lu_upgrades_description['PBS-A'] = 'With individually programmable time and temperature control these thermostats allow precise control of room temperature throughout the day and feature a backlit screen for easy use.<br>';
        lu_upgrades_description['PBR-A'] = 'The programmable, push-button wireless thermostat is a popular choice for renovation projects. As it\'s battery-powered rather than hard-wired, it causes minimal disruption to wall finishes.<br>';
        lu_upgrades_description['PBL-A'] = 'The best solution for larger new-build projects that incorporate building management systems, these thermostats offer individual zone time and temperature control whilst integrating seamlessly with whole house monitoring and control systems.<br>';
        lu_upgrades_description['MCV3-C'] = 'This control unit allows editing of low voltage thermostats from one central location, including being able to copy and repeat global changes. It also incorporates a history function to monitor how the system performs under different conditions.<br>';
        lu_upgrades_description['NWSR-A'] = 'The high-quality, slim-line, hard-wired, programmable neoStat thermostat is fully compatible with home automation systems. Features include holiday and temperature hold, soft touch operation and energy-saving Optimum Start.<br>neoStats are available in black, white and silver.<br>';
        lu_upgrades_description['NBSR-A'] = 'The high-quality, slim-line, hard-wired, programmable neoStat thermostat is fully compatible with home automation systems. Features include holiday and temperature hold, soft touch operation and energy-saving Optimum Start.<br>neoStats are available in black, white and silver.<br>';
        lu_upgrades_description['NSSR-A'] = 'The high-quality, slim-line, hard-wired, programmable neoStat thermostat is fully compatible with home automation systems. Features include holiday and temperature hold, soft touch operation and energy-saving Optimum Start.<br>neoStats are available in black, white and silver.<br>';
        lu_upgrades_description['NBBR-A'] = 'A popular solution for renovation projects, the battery-powered, wireless neoAir thermostat offers the same functionality as the neoStat, without the need to chase wiring into walls.<br>The neoAir is available in black, white and silver.<br>'; //CJM Jan2017
        lu_upgrades_description['NWBR-A'] = 'A popular solution for renovation projects, the battery-powered, wireless neoAir thermostat offers the same functionality as the neoStat, without the need to chase wiring into walls.<br>The neoAir is available in black, white and silver.<br>'; //CJM Jan2017
        lu_upgrades_description['NSBR-A'] = 'A popular solution for renovation projects, the battery-powered, wireless neoAir thermostat offers the same functionality as the neoStat, without the need to chase wiring into walls.<br>The neoAir is available in black, white and silver.<br>'; //CJM Jan2017
        lu_upgrades_description['neoStatW/TC-A'] = 'Nu-Heat\'s neoStats can also be used as a programmable hot water timer offering wireless smart control capability.<br><br><br>';
        lu_upgrades_description['neoStatB/TC-A'] = 'Nu-Heat\'s neoStats can also be used as a programmable hot water timer offering wireless smart control capability.<br><br><br>';
        lu_upgrades_description['neoStatS/TC-A'] = 'Nu-Heat\'s neoStats can also be used as a programmable hot water timer offering wireless smart control capability.<br><br><br>';
        lu_upgrades_description['neoHub-C'] = 'Pair a neoHub with hard-wired neoStats to unlock remote, flexible heating control from a smartphone or tablet via the neoApp<br>';
        lu_upgrades_description['neoHub+-C'] = 'Pair a neoHub+ with hard-wired neoStats to unlock remote, flexible heating control from your Android or Apple smartphone or tablet via the neoApp<br>'; //CJM 8Aug2017
        lu_upgrades_description['neoHub/1neoPlug-A'] = 'Pair a neoHub with wireless neoAir thermostats to unlock remote, flexible heating control from a smartphone or tablet via the neoApp. This package includes the appropriate number of neoPlug signal boosters for the system, to ensure uninterrupted heating control around the home.<br>'; //CJM Jan2017
        lu_upgrades_description['neoHub/2neoPlug-A'] = 'Pair a neoHub with wireless neoAir thermostats to unlock remote, flexible heating control from a smartphone or tablet via the neoApp. This package includes the appropriate number of neoPlug signal boosters for the system, to ensure uninterrupted heating control around the home.<br>'; //CJM Jan2017
        lu_upgrades_description['neoHub/3neoPlug-A'] = 'Pair a neoHub with wireless neoAir thermostats to unlock remote, flexible heating control from a smartphone or tablet via the neoApp. This package includes the appropriate number of neoPlug signal boosters for the system, to ensure uninterrupted heating control around the home.<br>'; //CJM Jan2017
        lu_upgrades_description['neoHub/4neoPlug-A'] = 'Pair a neoHub with wireless neoAir thermostats to unlock remote, flexible heating control from a smartphone or tablet via the neoApp. This package includes the appropriate number of neoPlug signal boosters for the system, to ensure uninterrupted heating control around the home.<br>'; //CJM Jan2017
        lu_upgrades_description['neoHub+/1neoPlug-A'] = 'Pair a neoHub+ with wireless neoAir thermostats to unlock remote, flexible heating control from your Android or Apple smartphone or tablet via the neoApp. This package includes the appropriate number of neoPlug signal boosters for the system, to ensure uninterrupted heating control around the home.<br>'; //CJM New June2017; Amended 8Aug2017
        lu_upgrades_description['neoHub+/2neoPlug-A'] = 'Pair a neoHub+ with wireless neoAir thermostats to unlock remote, flexible heating control from your Android or Apple smartphone or tablet via the neoApp. This package includes the appropriate number of neoPlug signal boosters for the system, to ensure uninterrupted heating control around the home.<br>'; //CJM New June2017; Amended 8Aug2017
        lu_upgrades_description['neoHub+/3neoPlug-A'] = 'Pair a neoHub+ with wireless neoAir thermostats to unlock remote, flexible heating control from your Android or Apple smartphone or tablet via the neoApp. This package includes the appropriate number of neoPlug signal boosters for the system, to ensure uninterrupted heating control around the home.<br>'; //CJM New June2017; Amended 8Aug2017
        lu_upgrades_description['neoHub+/4neoPlug-A'] = 'Pair a neoHub+ with wireless neoAir thermostats to unlock remote, flexible heating control from your Android or Apple smartphone or tablet via the neoApp. This package includes the appropriate number of neoPlug signal boosters for the system, to ensure uninterrupted heating control around the home.<br>'; //CJM New June2017; Amended 8Aug2017
        lu_upgrades_description['RFSWITCH-C'] = 'Add the RF switch for wireless control of the boiler and pump, avoiding the need to run cabling from the wiring centre to the boiler.<br>'; //CJM May2016
        lu_upgrades_description['TSL-A'] = 'A backlit thermostat with a touch sensitive screen, this is a contemporary option that can be networked with whole house monitoring and control systems.';
        lu_upgrades_description['neoUltraStat'] = 'All the benefits of the neoStat smart package, plus a neoUltra for complete control of all heating and domestic hot water requirements from a central control point in the home.<br>';
        lu_upgrades_description['neoUltraAir'] = 'All the benefits of the neoAir smart package, plus a neoUltra for complete control of all heating and domestic hot water requirements from a central control point in the home.<br>';
        lu_upgrades_description['neoUltra+Stat'] = 'All the benefits of the neoStat smart package for Android and Apple devices, plus a neoUltra for complete control of all heating and domestic hot water requirements from a central control point in the home.<br>'; //CJM New June2017; Amended 8Aug2017
        lu_upgrades_description['neoUltra+Air'] = 'All the benefits of the neoAir smart package for Android and Apple devices, plus a neoUltra for complete control of all heating and domestic hot water requirements from a central control point in the home.<br>'; //CJM New June2017; Amended 8Aug2017
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
        lu_upgrades_fiche['PBS-A'] = '<a href="/core/media/media.nl?id=7512975&amp;c=472052&amp;h=fd0fbf341fdde385ef99" rel="lightbox[fiche]">View product fiche</a>';
        lu_upgrades_fiche['PBR-A'] = '<a href="/core/media/media.nl?id=7512975&amp;amp;c=472052&amp;amp;h=fd0fbf341fdde385ef99" rel="lightbox[fiche]">View product fiche</a>';
        lu_upgrades_fiche['PBL-A'] = '<a href="/core/media/media.nl?id=7512975&amp;c=472052&amp;h=fd0fbf341fdde385ef99" rel="lightbox[fiche3]">View product fiche</a>';
        lu_upgrades_fiche['MCV3-C'] = '';
        lu_upgrades_fiche['NWSR-A'] = '<a href="/core/media/media.nl?id=7512975&amp;amp;c=472052&amp;amp;h=fd0fbf341fdde385ef99" rel="lightbox[fiche]">View product fiche</a>';
        lu_upgrades_fiche['NBSR-A'] = '<a href="/core/media/media.nl?id=7512975&amp;amp;c=472052&amp;amp;h=fd0fbf341fdde385ef99" rel="lightbox[fiche]">View product fiche</a>';
        lu_upgrades_fiche['NSSR-A'] = '<a href="/core/media/media.nl?id=7512975&amp;amp;c=472052&amp;amp;h=fd0fbf341fdde385ef99" rel="lightbox[fiche]">View product fiche</a>';
        lu_upgrades_fiche['NBBR-A'] = '<a href="/core/media/media.nl?id=7512975&amp;amp;c=472052&amp;amp;h=fd0fbf341fdde385ef99" rel="lightbox[fiche]">View product fiche</a>'; //CJM May2016
        lu_upgrades_fiche['NWBR-A'] = '<a href="/core/media/media.nl?id=7512975&amp;amp;c=472052&amp;amp;h=fd0fbf341fdde385ef99" rel="lightbox[fiche]">View product fiche</a>'; //CJM May2016
        lu_upgrades_fiche['NSBR-A'] = '<a href="/core/media/media.nl?id=7512975&amp;amp;c=472052&amp;amp;h=fd0fbf341fdde385ef99" rel="lightbox[fiche]">View product fiche</a>'; //CJM May2016
        lu_upgrades_fiche['neoStatW/TC-A'] = '';
        lu_upgrades_fiche['neoStatB/TC-A'] = '';
        lu_upgrades_fiche['neoStatS/TC-A'] = '';
        lu_upgrades_fiche['neoHub+-C'] = ''; //CJM June2017
        lu_upgrades_fiche['neoHub-C'] = '';
        lu_upgrades_fiche['neoHub+/1neoPlug-A'] = ''; //CJM June2017
        lu_upgrades_fiche['neoHub+/2neoPlug-A'] = ''; //CJM June2017
        lu_upgrades_fiche['neoHub+/3neoPlug-A'] = ''; //CJM June2017
        lu_upgrades_fiche['neoHub+/4neoPlug-A'] = ''; //CJM June2017
        lu_upgrades_fiche['neoHub/1neoPlug-A'] = ''; //CJM May2016
        lu_upgrades_fiche['neoHub/2neoPlug-A'] = ''; //CJM May2016
        lu_upgrades_fiche['neoHub/3neoPlug-A'] = ''; //CJM May2016
        lu_upgrades_fiche['neoHub/4neoPlug-A'] = ''; //CJM May2016
        lu_upgrades_fiche['RFSWITCH-C'] = ''; //CJM May2016
        lu_upgrades_fiche['TSL-A'] = '<a href="/core/media/media.nl?id=7512975&amp;c=472052&amp;h=fd0fbf341fdde385ef99" rel="lightbox[fiche6]">View product fiche</a>';
        lu_upgrades_fiche['neoUltraStat'] = '';
        lu_upgrades_fiche['neoUltraAir'] = '';
        lu_upgrades_fiche['neoUltra+Stat'] = ''; //CJM June2017
        lu_upgrades_fiche['neoUltra+Air'] = ''; //CJM June2017
        lu_upgrades_fiche['neoUltraB-C'] = '';
        lu_upgrades_fiche['neoUltraW-C'] = '';


        var lu_fc_upgrades_link = new Array();
        lu_fc_upgrades_link['LPPG/5-C'] = ' - <a href="/core/media/media.nl?id=2137769&amp;c=472052&amp;h=f5c82b2362b805a5bc5b&amp;_xt=.pdf" target="_blank">view details</a>';
        lu_fc_upgrades_link['LPSLC2/25-C'] = ' - <a href="/core/media/media.nl?id=1750963&amp;c=472052&amp;h=43ab678530e4972f1af1&amp;_xt=.pdf" target="_blank">view details</a>';
        lu_fc_upgrades_link['LPSLC2/25-C'] = ' - <a href="/core/media/media.nl?id=1750963&amp;c=472052&amp;h=43ab678530e4972f1af1&amp;_xt=.pdf" target="_blank">view details</a>';
        lu_fc_upgrades_link['LPXPS10-C'] = ' - <a href="/core/media/media.nl?id=1750964&amp;c=472052&amp;h=c4664e2199480ac48e90&amp;_xt=.pdf" target="_blank">view details</a>';
        lu_fc_upgrades_link['LPPE5/15-C'] = ' - <a href="/core/media/media.nl?id=1750961&amp;c=472052&amp;h=e571953b47a2f2efaebc&amp;_xt=.pdf" target="_blank">view details</a>';
        lu_fc_upgrades_link['LPCB/9-C'] = ' - <a href="/core/media/media.nl?id=1750962&amp;c=472052&amp;h=22fe4b408bc0ecc68544&amp;_xt=.pdf" target="_blank">view details</a>';
        lu_fc_upgrades_link['LPG/ESL-C'] = ' - <a href="/core/media/media.nl?id=1750959&amp;c=472052&amp;h=91cf9c819a33be5e228a&amp;_xt=.pdf" target="_blank">view details</a>';
        lu_fc_upgrades_link['LPG/ERW-C'] = ' - <a href="/core/media/media.nl?id=1750959&amp;c=472052&amp;h=91cf9c819a33be5e228a&amp;_xt=.pdf" target="_blank">view details</a>';
        lu_fc_upgrades_link['LPDCM/10-C'] = ' - <a href="/core/media/media.nl?id=2137772&amp;c=472052&amp;h=550317e7a6defd2dca16&amp;_xt=.pdf" target="_blank">view details</a>';
        lu_fc_upgrades_link['LPFB150/10-C'] = ' - <a href="/core/media/media.nl?id=3541350&amp;c=472052&amp;h=13cf5ac2b49ab6ff854d&amp;_xt=.pdf" target="_blank">view details</a>';
        lu_fc_upgrades_link['LPPRIMER/5-C'] = ' - <a href="/core/media/media.nl?id=6152088&amp;c=472052&amp;h=a2353dad93d53239ff70&amp;_xt=.pdf" target="_blank">view details</a>';
        lu_fc_upgrades_link['LPLPT-A'] = ' - <a href="/core/media/media.nl?id=6151983&amp;c=472052&amp;h=3fdc44d391552ff0bc8e&amp;_xt=.pdf" target="_blank">view details</a>';

        var lu_items_popup_pics = new Array();
        lu_items_popup_pics['MSH02-A'] = '<a href="/core/media/media.nl?id=1875601&amp;c=472052&amp;h=32c27f558a76729199f0" rel="lightbox[plants]" title="Optiflow Manifold">MSH02-A</a>';
        lu_items_popup_pics['MSH03-A'] = '<a href="/core/media/media.nl?id=1875601&amp;c=472052&amp;h=32c27f558a76729199f0" rel="lightbox[plants]" title="Optiflow Manifold">MSH03-A</a>';
        lu_items_popup_pics['MSH04-A'] = '<a href="/core/media/media.nl?id=1875601&amp;c=472052&amp;h=32c27f558a76729199f0" rel="lightbox[plants]" title="Optiflow Manifold">MSH04-A</a>';
        lu_items_popup_pics['MSH05-A'] = '<a href="/core/media/media.nl?id=1875601&amp;c=472052&amp;h=32c27f558a76729199f0" rel="lightbox[plants]" title="Optiflow Manifold">MSH05-A</a>';
        lu_items_popup_pics['MSH06-A'] = '<a href="/core/media/media.nl?id=1875601&amp;c=472052&amp;h=32c27f558a76729199f0" rel="lightbox[plants]" title="Optiflow Manifold">MSH06-A</a>';
        lu_items_popup_pics['MSH07-A'] = '<a href="/core/media/media.nl?id=1875601&amp;c=472052&amp;h=32c27f558a76729199f0" rel="lightbox[plants]" title="Optiflow Manifold">MSH07-A</a>';
        lu_items_popup_pics['MSH08-A'] = '<a href="/core/media/media.nl?id=1875601&amp;c=472052&amp;h=32c27f558a76729199f0" rel="lightbox[plants]" title="Optiflow Manifold">MSH08-A</a>';
        lu_items_popup_pics['MSH09-A'] = '<a href="/core/media/media.nl?id=1875601&amp;c=472052&amp;h=32c27f558a76729199f0" rel="lightbox[plants]" title="Optiflow Manifold">MSH09-A</a>';
        lu_items_popup_pics['MSH10-A'] = '<a href="/core/media/media.nl?id=1875601&amp;c=472052&amp;h=32c27f558a76729199f0" rel="lightbox[plants]" title="Optiflow Manifold">MSH10-A</a>';
        lu_items_popup_pics['MSH11-A'] = '<a href="/core/media/media.nl?id=1875601&amp;c=472052&amp;h=32c27f558a76729199f0" rel="lightbox[plants]" title="Optiflow Manifold">MSH11-A</a>';
        lu_items_popup_pics['MSH12-A'] = '<a href="/core/media/media.nl?id=1875601&amp;c=472052&amp;h=32c27f558a76729199f0" rel="lightbox[plants]" title="Optiflow Manifold">MSH12-A</a>';
        lu_items_popup_pics['WPEX14'] = '<a href="/core/media/media.nl?id=1875704&amp;c=472052&amp;h=89a624e8d2789204cca7" rel="lightbox[plants]" title="Fastflo&amp;reg; PEX heating tube">WPEX14</a>';
        lu_items_popup_pics['WPEX10'] = '<a href="/core/media/media.nl?id=1875704&amp;c=472052&amp;h=89a624e8d2789204cca7" rel="lightbox[plants]" title="Fastflo&amp;reg; PEX heating tube">WPEX10</a>';
        lu_items_popup_pics['WPEX17'] = '<a href="/core/media/media.nl?id=1875704&amp;c=472052&amp;h=89a624e8d2789204cca7" rel="lightbox[plants]" title="Fastflo&amp;reg; PEX heating tube">WPEX17</a>'; //CJM August2016
        lu_items_popup_pics['TPEX10'] = '<a href="/core/media/media.nl?id=1875704&amp;c=472052&amp;h=89a624e8d2789204cca7" rel="lightbox[plants]" title="Fastflo&amp;reg; PEX heating tube">TPEX10</a>';
        lu_items_popup_pics['TPER10'] = '<a href="/core/media/media.nl?id=14572414&amp;c=472052&amp;h=18c69983652421f65050" rel="lightbox[plants]" title="Fastflo&amp;reg; heating tube">view details</a>'; //CJM May2018 PEXc to PE-RT update
        lu_items_popup_pics['WPER14'] = '<a href="/core/media/media.nl?id=14572414&amp;c=472052&amp;h=18c69983652421f65050" rel="lightbox[plants]" title="Fastflo&amp;reg; heating tube">view details</a>'; //CJM May2018 PEXc to PE-RT update
        lu_items_popup_pics['WPER17'] = '<a href="/core/media/media.nl?id=14572414&amp;c=472052&amp;h=18c69983652421f65050" rel="lightbox[plants]" title="Fastflo&amp;reg; heating tube">view details</a>'; //CJM May2018 PEXc to PE-RT update
        lu_items_popup_pics['Dial'] = '<a href="/core/media/media.nl?id=1875599&amp;c=472052&amp;h=e7bac748eeb74bef81fb" rel="lightbox[plants]" title="Dial thermostats">Dial</a>';
        lu_items_popup_pics['MPDP-C'] = '<a href="/core/media/media.nl?id=1875600&amp;c=472052&amp;h=af6877df669acf916d6f" rel="lightbox[plants]" title="Design Specification, manuals and documentation">MPDP-C</a>';
        lu_items_popup_pics['PM4M-A'] = '<a href="/core/media/media.nl?id=1875602&amp;c=472052&amp;h=339177bc1e003a308155" rel="lightbox[plants]" title="Pump and temperature control module">PM4M-A</a>';
        lu_items_popup_pics['PM2A/2-A'] = '<a href="/core/media/media.nl?id=1875602&amp;c=472052&amp;h=339177bc1e003a308155" rel="lightbox[plants]" title="Pump and temperature control module">PM2A/2-A</a>';
        lu_items_popup_pics['PM1A-A'] = '<a href="/core/media/media.nl?id=1875602&amp;c=472052&amp;h=339177bc1e003a308155" rel="lightbox[plants]" title="Pump and temperature control module">PM1A-A</a>';
        lu_items_popup_pics['PM1B-A'] = '<a href="/core/media/media.nl?id=1875602&amp;c=472052&amp;h=339177bc1e003a308155" rel="lightbox[plants]" title="Pump and temperature control module">PM1A-A</a>'; //CJM May2016
        lu_items_popup_pics['PM1W/1-A'] = '<a href="/core/media/media.nl?id=1875602&amp;c=472052&amp;h=339177bc1e003a308155" rel="lightbox[plants]" title="Pump and temperature control module">PM1W/1-A</a>'; //CJM August2016
        lu_items_popup_pics['PM2W/1-A'] = '<a href="/core/media/media.nl?id=1875602&amp;c=472052&amp;h=339177bc1e003a308155" rel="lightbox[plants]" title="Pump and temperature control module">PM2W/1-A</a>'; //CJM August2016
        lu_items_popup_pics['PM3W/1-A'] = '<a href="/core/media/media.nl?id=1875602&amp;c=472052&amp;h=339177bc1e003a308155" rel="lightbox[plants]" title="Pump and temperature control module">PM3W/1-A</a>'; //CJM August2016
        lu_items_popup_pics['PM4W/1-A'] = '<a href="/core/media/media.nl?id=1875602&amp;c=472052&amp;h=339177bc1e003a308155" rel="lightbox[plants]" title="Pump and temperature control module">PM4W/1-A</a>'; //CJM August2016
        lu_items_popup_pics['PM5W/1-A'] = '<a href="/core/media/media.nl?id=1875602&amp;c=472052&amp;h=339177bc1e003a308155" rel="lightbox[plants]" title="Pump and temperature control module">PM5W/1-A</a>'; //CJM August2016

        var lu_items_popup_pics2 = new Array();
        lu_items_popup_pics2['MSH02-A'] = '- <a href="/core/media/media.nl?id=1875601&amp;c=472052&amp;h=32c27f558a76729199f0" rel="lightbox[plants]" title="Optiflow Manifold">view details</a>';
        lu_items_popup_pics2['MSH03-A'] = '- <a href="/core/media/media.nl?id=1875601&amp;c=472052&amp;h=32c27f558a76729199f0" rel="lightbox[plants]" title="Optiflow Manifold">view details</a>';
        lu_items_popup_pics2['MSH04-A'] = '- <a href="/core/media/media.nl?id=1875601&amp;c=472052&amp;h=32c27f558a76729199f0" rel="lightbox[plants]" title="Optiflow Manifold">view details</a>';
        lu_items_popup_pics2['MSH05-A'] = '- <a href="/core/media/media.nl?id=1875601&amp;c=472052&amp;h=32c27f558a76729199f0" rel="lightbox[plants]" title="Optiflow Manifold">view details</a>';
        lu_items_popup_pics2['MSH06-A'] = '- <a href="/core/media/media.nl?id=1875601&amp;c=472052&amp;h=32c27f558a76729199f0" rel="lightbox[plants]" title="Optiflow Manifold">view details</a>';
        lu_items_popup_pics2['MSH07-A'] = '- <a href="/core/media/media.nl?id=1875601&amp;c=472052&amp;h=32c27f558a76729199f0" rel="lightbox[plants]" title="Optiflow Manifold">view details</a>';
        lu_items_popup_pics2['MSH08-A'] = '- <a href="/core/media/media.nl?id=1875601&amp;c=472052&amp;h=32c27f558a76729199f0" rel="lightbox[plants]" title="Optiflow Manifold">view details</a>';
        lu_items_popup_pics2['MSH09-A'] = '- <a href="/core/media/media.nl?id=1875601&amp;c=472052&amp;h=32c27f558a76729199f0" rel="lightbox[plants]" title="Optiflow Manifold">view details</a>';
        lu_items_popup_pics2['MSH10-A'] = '- <a href="/core/media/media.nl?id=1875601&amp;c=472052&amp;h=32c27f558a76729199f0" rel="lightbox[plants]" title="Optiflow Manifold">view details</a>';
        lu_items_popup_pics2['MSH11-A'] = '- <a href="/core/media/media.nl?id=1875601&amp;c=472052&amp;h=32c27f558a76729199f0" rel="lightbox[plants]" title="Optiflow Manifold">view details</a>';
        lu_items_popup_pics2['MSH12-A'] = '- <a href="/core/media/media.nl?id=1875601&amp;c=472052&amp;h=32c27f558a76729199f0" rel="lightbox[plants]" title="Optiflow Manifold">view details</a>';
        lu_items_popup_pics2['WPEX14'] = '- <a href="/core/media/media.nl?id=1875704&amp;c=472052&amp;h=89a624e8d2789204cca7" rel="lightbox[plants]" title="Fastflo&amp;reg; PEX heating tube">view details</a>';
        lu_items_popup_pics2['WPEX17'] = '- <a href="/core/media/media.nl?id=1875704&amp;c=472052&amp;h=89a624e8d2789204cca7" rel="lightbox[plants]" title="Fastflo&amp;reg; PEX heating tube">view details</a>'; //CJM August2016
        lu_items_popup_pics2['WPEX10'] = '- <a href="/core/media/media.nl?id=1875704&amp;c=472052&amp;h=89a624e8d2789204cca7" rel="lightbox[plants]" title="Fastflo&amp;reg; PEX heating tube">view details</a>';
        lu_items_popup_pics2['TPEX10'] = '- <a href="/core/media/media.nl?id=1875704&amp;c=472052&amp;h=89a624e8d2789204cca7" rel="lightbox[plants]" title="Fastflo&amp;reg; PEX heating tube">view details</a>';
        lu_items_popup_pics2['TPER10'] = '- <a href="/core/media/media.nl?id=14572414&amp;c=472052&amp;h=18c69983652421f65050" rel="lightbox[plants]" title="Fastflo&amp;reg; heating tube">view details</a>'; //CJM May2018 PEXc to PE-RT update
        lu_items_popup_pics2['WPER14'] = '- <a href="/core/media/media.nl?id=14572414&amp;c=472052&amp;h=18c69983652421f65050" rel="lightbox[plants]" title="Fastflo&amp;reg; heating tube">view details</a>'; //CJM May2018 PEXc to PE-RT update
        lu_items_popup_pics2['WPER17'] = '- <a href="/core/media/media.nl?id=14572414&amp;c=472052&amp;h=18c69983652421f65050" rel="lightbox[plants]" title="Fastflo&amp;reg; heating tube">view details</a>'; //CJM May2018 PEXc to PE-RT update
        lu_items_popup_pics2['Dial'] = '- <a href="/core/media/media.nl?id=1875599&amp;c=472052&amp;h=e7bac748eeb74bef81fb" rel="lightbox[plants]" title="Dial thermostats">view details</a>';
        lu_items_popup_pics2['MPDP-C'] = '- <a href="/core/media/media.nl?id=1875600&amp;c=472052&amp;h=af6877df669acf916d6f" rel="lightbox[plants]" title="Design Specification, manuals and documentation">view details</a>';
        lu_items_popup_pics2['PM4M-A'] = '- <a href="/core/media/media.nl?id=1875602&amp;c=472052&amp;h=339177bc1e003a308155" rel="lightbox[plants]" title="Pump and temperature control module">view details</a>';
        lu_items_popup_pics2['PM2A/2-A'] = '- <a href="/core/media/media.nl?id=1875602&amp;c=472052&amp;h=339177bc1e003a308155" rel="lightbox[plants]" title="Pump and temperature control module">view details</a>';
        lu_items_popup_pics2['PM1A-A'] = '- <a href="/core/media/media.nl?id=1875602&amp;c=472052&amp;h=339177bc1e003a308155" rel="lightbox[plants]" title="Pump and temperature control module">view details</a>';
        lu_items_popup_pics2['PM1B-A'] = '- <a href="/core/media/media.nl?id=1875602&amp;c=472052&amp;h=339177bc1e003a308155" rel="lightbox[plants]" title="Pump and temperature control module">view details</a>'; //CJM May2016
        lu_items_popup_pics2['PM1W/1-A'] = '- <a href="/core/media/media.nl?id=10074806&amp;c=472052&amp;h=90bfe0124a23d2c7bafa" rel="lightbox[plants]" title="Pump and temperature control module">view details</a>'; //CJM August2016
        lu_items_popup_pics2['PM2W/1-A'] = '- <a href="/core/media/media.nl?id=10074806&amp;c=472052&amp;h=90bfe0124a23d2c7bafa" rel="lightbox[plants]" title="Pump and temperature control module">view details</a>'; //CJM August2016
        lu_items_popup_pics2['PM3W/1-A'] = '- <a href="/core/media/media.nl?id=10074806&amp;c=472052&amp;h=90bfe0124a23d2c7bafa" rel="lightbox[plants]" title="Pump and temperature control module">view details</a>'; //CJM August2016
        lu_items_popup_pics2['PM4W/1-A'] = '- <a href="/core/media/media.nl?id=10074806&amp;c=472052&amp;h=90bfe0124a23d2c7bafa" rel="lightbox[plants]" title="Pump and temperature control module">view details</a>'; //CJM August2016
        lu_items_popup_pics2['PM5W/1-A'] = '- <a href="/core/media/media.nl?id=10074806&amp;c=472052&amp;h=90bfe0124a23d2c7bafa" rel="lightbox[plants]" title="Pump and temperature control module">view details</a>'; //CJM August2016

        return {
            lu_floor_cons_desc:lu_floor_cons_desc,
            lu_floor_cons_link:lu_floor_cons_link,
            lu_floor_cons_type:lu_floor_cons_type,
            lu_floor_cons_pic:lu_floor_cons_pic,
            lu_srp_rating:lu_srp_rating,
            lu_sol_schematic_image:lu_sol_schematic_image,
            lu_hp_schematic_image:lu_hp_schematic_image,
            lu_upgrades_link:lu_upgrades_link,
            lu_upgrades_image:lu_upgrades_image,
            lu_upgrades_name:lu_upgrades_name,
            lu_upgrades_description:lu_upgrades_description,
            lu_upgrades_fiche:lu_upgrades_fiche,
            lu_fc_upgrades_link:lu_fc_upgrades_link,
            lu_items_popup_pics:lu_items_popup_pics,
            lu_items_popup_pics2:lu_items_popup_pics2
        }
    });