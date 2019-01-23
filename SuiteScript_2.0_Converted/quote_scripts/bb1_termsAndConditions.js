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

    return function termsAndConditions()
    {
        var terms = '<div class="printlogo"><!--<div class="TC">--> \n' +
        '<h2 class="row acc_trigger breakhere"><a href="#20" onclick="ga(\'send\', \'event\', \'quote\', \'Click\', \'terms-conditions\');"><div class="P-Header" >Terms and Conditions</div></a></h2> \n' +
        '<div class="acc_container">\n' +
        '<div class="block col-sm">\n' +
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
        '</div></div></div> <!-- END PRINT LOGO -->\n';
    
        return terms;
    }
    
});