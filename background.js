var dataStore, NOSELL_TRAINING_DATA, SELL_TRAINING_DATA, BANKRUPT_TRAINING_DATA,
    CORPUS_SKIP_WORDS, initializeDataStore, onRequest, train, classify, splitWords,
    LABELS, initializeWordInDatastore, maxLabelIndex, processWord, finalScores;

LABELS = ['NOSELL', 'SELL'];


CORPUS_SKIP_WORDS = ["a","again","all","along","are","also","an","and","as","at","but","by","came","can","cant","couldnt","did","didn","didnt","do","doesnt","dont","ever","first","from","have","her","here","him","how","i","if","in","into","is","isnt","it","itll","just","last","least","like","most","my","new","no","not","now","of","on","or","should","sinc","so","some","th","than","this","that","the","their","then","those","to","told","too","true","try","until","url","us","were","when","whether","while","with","within","yes","you","youll"]
NOSELL_TRAINING_DATA = "Sharing and finding you on Facebook\nGet to know the privacy settings that help you control your information on facebook.com.\nIf you have questions or complaints regarding our privacy policy or practices, please contact us by mail at 1601 S. California Avenue, Palo Alto, CA 94304 or through this help page.\nted ted.com We will never sell your data to any third party\nWe never sell or rent your personal data, and do not link browsing information or personal data from our server logs to any other personal data that you might submit to us, for example as a registered user of the SoundCloud platform\nWe will never sell, rent or give away private data about you or your contacts. Our business is in making your inbox more powerful, not in selling databases.\nAt Avidity Group, LLC we will NEVER sell your personal information to a third party. We use this information to accommodate your interests in our products and services.\nWe will not sell or rent this information to anyone\nWe value your privacy. We never sell your information to data miners, information database compilation companies, or third parties trying to market to you.\nWe may display advertising on our site, but we will never share Your Data with advertisers or with third parties that display advertising on our behalf\nWe never sell your data to others\nWhile we promise to never share or sell your data to other organizations, there are a few instances where we may have to provide it to other entities. The only situations where we will share your personal information are under the following, very limited circumstances:\nWe never rent or sell your personal data.\nWe do not sell your Personal Information to anyone for any purpose. Period.\nSimply put, we do not and will not sell or rent your personal information to anyone, for any reason, at any time.\nCodecademy will not rent or sell potentially personally-identifying and personally-identifying information to anyone.\nYour email address, payment information, address, and other private account data will never be sold or distributed to third parties except as required to provide you service.\nWe do not sell, trade, or otherwise transfer to outside parties your personally identifiable information.\nWe do not release, sell, or expose any Personally Identifiable Information that you provide us to third parties for marketing purposes\nIt is our policy not to share, sell or rent your personal information to any company not directly related to PageLever as a provider or customer.\nWe will not publish, share, or sell your email address in any way. We hate spam just as much as you do and will not spam your email. We may occasionally send you email to notify you of any important security or software updates to Picplum.com.\nFluency Forums Corporation does not rent, sell or share personal information it collects about you to or with marketers. Information collected from you is only used to complete and support your purchases from and use of the Fluency Forums Corporation Site and to comply with any requirements of law. \ndoes not sell, trade or rent Personal Information collected through the Vidyard Properties to any third party\ndoes not collect or share personal information\nWe don't send you unsolicited communications for marketing purposes.\nnor will such information be sold or otherwise transferred to unaffiliated third parties without the approval of the user at the time of collection\nWikimedia policy does not permit distribution of personally identifiable information under any circumstances.\nMicrosoft will not sell, lease or rent its e-mail subscriber lists to third parties.\nwe do not sell, rent, exchange, or otherwise disclose this information to persons or organizations outside the Executive Office of the President.\nFrom time to time, EFF may work with third-party consultants or other service providers who may have access to personally identifiable information. In such cases, we will restrict their use of personally identifiable information in accordance with their assigned tasks and subject to the limitations of this privacy policy.\nWhen we do this, we do not give that business your name and e-mail address.\nWe will not collect personal information about you just because you visit this Internet site. There are applications on this website that provide you with the opportunity to order forms, ask questions requiring a response, sign up for electronic newsletters, participate in focus groups and customer surveys, or learn the status of filed returns or anticipated payments. Using these services is voluntary and may require that you provide additional personal information to us. Providing the requested information implies your consent for us to use this data in order to respond to your specific request.\nWe do not sell, rent, or otherwise provide your personal information to outside marketers. You will only receive marketing about products and services of the Postal Service or its partners\nthe Department does not collect PII about you when you visit our website, unless you choose to provide such information to us. Submitting PII through our website is voluntary. By doing so, you are giving the Department your permission to use the information for the stated purpose\nWith other business partners with your consent;In aggregated or other non-personally identifiable form;\nWe may also share with third parties aggregated, non-personal information, such as the number of new user registrations over a specific time period or the number of users who edited a particular wiki. \nWe will not provide or sell your personal information to third parties.\nWe will not sell your information to third parties.\nWe extensively secure and limit access to your information.\nwill never share your name, email addresses, phone numbers, geolocation data, or voice recordings with third-parties, other than those required to facilitate the service\nis the sole owner of this information and we will not sell, share, or rent this information with any other company or individual in ways different from what is disclosed in this statement.\ndoes not share, sell, rent, or trade any information provided with third parties for their promotional purposes."

SELL_TRAINING_DATA = "We work with certain third parties to perform functions and provide services to us, relating to our business, including, without limitation, hosting and maintenance, customer relationship, customer service, database storage and management, and direct marketing campaigns. We may provide your PII to contractors, agents or service providers acting on our behalf for limited purposes. For example, we may share PII with our contractors, agents or service providers to send you an email on our behalf. These third parties are authorized to use your PII only to perform the service they are providing for us.\nIn addition, from time-to-time we may share with third parties aggregated de-identified information collected from users of our Services without your consent. This information will not include any PII without your consent. If you do not provide your consent, your PII will not be shared. If you do provide your consent, we may share your PII with that organization and that organization alone. At that same time we may ask you if that business partner may contact you. If you do not provide your consent, your PII will not be provided. If you do provide your consent your PII may be shared with that business partner and that business partner alone. Within our organization and that of our affiliates, we restrict access to your PII to those employees with a need to know in order to resolve problems with the Service, provide customer support, or to address suspected violations of the Terms and Conditions of the Service. We require each of our employees, consultants, and independent contractors to sign confidentiality and non-disclosure agreements. We also instruct them on how to secure your PII properly. We may, on occasion, hire other companies to provide services on our behalf. If any such entity has access to your PII, we require them to sign confidentiality and non-disclosure agreements, as well, and prohibit their use of such information beyond the services they are providing on our behalf.\nA user.s PII may be shared with other Nestablish users who need the PII to complete the user.s requests. For example, we may share a homebuyer.s PII with the homebuyer.s loan officer and we may share a real estate agent.s PII with the homebuyer. We may share aggregated non-PII, including the demographics of our users, with third parties, including advertisers and vendors. We may share PII with other companies for marketing purposes, but will always offer our users the opportunity to prohibit sharing (.Opt-out.) such information with third parties.\nUnless you opt out, we may share PII about our users sometimes in connection with Non-PII with service providers that may be associated with us to perform functions on our behalf. In addition, unless you opt out, from time to time we may share and/or sell PII about our users (such as your mailing or email addresses) with selected third parties, so they can offer goods and services that we believe may be of interest or benefit to our users. If you prefer not to receive messages from these third parties you may notify us by opting out at any time by going to the 'Manage Profile' or 'Message Center' sections of your Ad Profile as described more fully below. Legal Request\nSome or all of your personal information will be used to identify Your profile and user content stemming from Your activity on Jemster, and may be viewable to both Jemster Users and non-users. Further, we may use Your email address to send you periodic notifications and updates regarding Jemster and anything else We deem relevant. Your email address will also be used to notify You of updates or communication from other Jemster Users. Generally, you will be able to manage all notifications received from the Company by editing your profile by clicking 'Edit Profile' while viewing your own profile on Jemster. However, Jemster reserves the right to send you important notices about your account even if you have opted-out of all notifications.\nYour non-PII may be used on it's own or in aggregate to help better tailor the Website experience to You and other users. Further, your non-PII may be shared with a third-party service provider, including advertisers and partners, to better target content and advertisements to you.\nWe may share or transfer some or all of your PII among our FFN family of companies, or to one or more non-FFN family entities that acquire some or all of the business in which that PII is used or maintained.\nWe may share your non-PII with third parties, but not in a manner that would reveal your identity. We may share your PII, sometimes in conjunction with your non-PII, with service providers that may be associated with us to perform functions on our behalf. For example, outsourced customer care agents or technology assistants may need access to your information to perform services for you. Your information will be treated as private and confidential by such service providers and not used for any other purpose than we authorize. In addition, from time to time, we may share PII (such as e-mail or mailing address) about our user base with carefully selected third parties, so they can offer goods and services that we believe may be of interest to our users. If you do not wish to receive offers from our trusted partners, you can change your e-mail preferences at any time by following the steps outlined in the .Choice/Opt-Out. section below.\nVerisign, Shopsite Pro and Wells Fargo are the online credit card vendors we work with. The only information they receive is actively provided by you. In addition, from time to time, we may share PII (such as e-mail) about our user base with carefully selected third parties, so they can offer goods and services that we believe may be of interest to our users.\nIn addition, with our users. consent, from time to time we may share profile (such as e-mail or mailing address) about our user base with carefully selected third parties, so they can offer goods and services that we believe may be of interest to our users. If you do not wish to continue to receive offers from our trusted business associates, you can change your e-mail preferences at any time by following the steps outlined in the .Choice/Opt-Out. section below\nIn addition, from time to time, we may share PII (such as e-mail or mailing address) about our user base with carefully selected third parties, so they can offer goods and services that we believe may be of interest to our users. If you do not wish to receive offers from our trusted partners, you can change your e-mail preferences at any time.\nIn addition, from time to time, we may share personally identifiable information (such as e-mail addresses) about our customer base with carefully selected third parties, so they can offer goods and services that we believe may be of interest to our customers. All third parties are bound by the federal CAN-SPAM Act and required to follow all consumer opt out rules and regulations. \nWe may also provide Personal Information to our business partners or other trusted entities for the purpose of providing you with information on goods or services we believe will be of interest to you. You can, at any time, opt out of receiving such communications.\nUnless you opt out, we may share PII about our users sometimes in connection with Non-PII with service providers that may be associated with us to perform functions on our behalf. In addition, unless you opt out, from time to time we may share and/or sell PII about our users (such as your mailing or email addresses) with selected third parties, so they can offer goods and services that we believe may be of interest or benefit to our users. If you prefer not to receive messages from these third parties you may notify us by opting out at any time by going to the 'Manage Profile' or 'Message Center' sections of your Ad Profile as described more fully below. Legal Request\nThe Debteye, Inc. may share or sell Your Information with any other Debteye Related Company (collectively, its Affiliated Companies) and with other companies with whom any Debteye Related Company does business (Non-Affiliated Third Parties) as permitted by law and described in this Privacy Policy. These Affiliated Companies and Non-Affiliated Third Parties may be (1) financial service providers, such as mortgage bankers, mortgage brokers, consumer lenders, small loan lenders, tax refund anticipation loan lenders, loan brokers, deferred deposit providers, check cashers, supervised lenders, delayed deposit providers, deferred presentment providers, collection agencies, consumer reporting agencies, banks, credit card providers, debit card providers, store valued card providers, insurance agencies, bill payment agencies, ATM providers, pawn and title pawn providers, automobile dealers, automobile financing providers, automobile leasing providers, money transfer and remittance providers, sellers and remitters of money orders, insurance services providers, and financial service provider holding companies, or agents, contractors, or representatives of any of the foregoing; (2) non-financial companies, such as retailers, tax preparers, payroll service providers, advertisers, marketing companies, lead generators, advertisers on our websites, companies or individuals that do industry-related research, surveys or polls, automobile dealers, and any person who offers a non-financial product or service, and holding companies, or agents, contractors, or representatives of any of the foregoing; and (3) other businesses, such as non-profit organizations, trade associations, and industry analysts or agents, contractors, or representatives of any of the foregoing.\nAffiliated Companies and Non-Affiliated Third Parties may use Your Information for any legal purpose, including, but not limited to, developing and promoting new or joint products, improving existing products and services, and contacting you to offer products and services that may be of interest to you. We may also disclose Your Information, as described above, to companies who perform services on our behalf or to other financial institutions with which we have joint marketing agreements.\nPersonal Information is used for the following purposes: to provide you with further information and offers from us or third parties that we believe you may find useful or interesting, including newsletters, marketing or promotional materials and other information on services and products offered by us or third parties. If you decide at any time that you no longer wish to receive such communications, please follow the unsubscribe instructions provided in any of the communications or update your 'user preferences' information. (See 'Changing or Deleting Information,' below.) We use information we obtain by technical means (such as the automatic recording performed by our servers or through the use of cookies) for the above purposes and in order to monitor and analyze use of the Site and our services and for the Site's technical administration, to increase our Site's functionality and user-friendliness, to better tailor it to your needs, to generate and derive useful data and information concerning the interests, characteristics and website use behavior of our users, and to verify that visitors to the Site meet the criteria required to process their requests.\nWe may also provide Personal Information to our business partners or other entities with whom we have cooperative relationships so that they can send you promotional and other information and engage in any of the activities described in Section 2 above.\nWe may employ third party companies and individuals to facilitate our Service, to provide the Service on our behalf, to perform Site-related services (e.g., without limitation, maintenance services, database management, web analytics and improvement of the Site's features) or to assist us in analyzing how our Site and Service are used. These third parties may have access to your Personal Information; if they do, this access is only so that they may perform these tasks on our behalf and they are obligated not to disclose or use it for any other purpose. We may also provide Personal Information to our business partners or other trusted entities for the purpose of providing you with information on goods or services we believe will be of interest to you. You can, at any time, opt out of receiving such communications.\nto provide you with further information and offers from us or third parties that we believe you may find useful or interesting, including newsletters, marketing or promotional materials and other information on Acucela related products and services.  If you decide at any time that you no longer wish to receive such communications, please follow the unsubscribe instructions provided in any of the communications.\nto provide you with information and offers from us or third parties that we believe you may find useful or interesting, including newsletters, marketing or promotional materials and other information on services and products offered by us or third parties\nOur site provides users the opportunity to opt-out of receiving communications from us or our partners at the point where we request information about the visitor.\nwe may exchange or rent your name and mailing address and certain other information with other reputable companies that offer marketing information or products through direct mail.\nTo permit third parties to send you promotional materials. If you subscribe to the U.S. edition of The Wall Street Journal, Barron's or SmartMoney print publications, we may share your contact information with other companies whose products and services may be of interest to you. While many of our subscribers appreciate receiving offerings from these companies, if you prefer that we do not share your information for this purpose, please contact the appropriate customer service center listed below in How to Access, Correct or Update Your Information. If you subscribe to Hulbert Financial Digest or Hulbert Financial Digest's related products Long Term Performance Ranking, Newsletter Honor Roll and Newsletter Profile (the 'Hulbert Products'), Hulbert Financial Digest may provide the contact information of the Hulbert Products subscribers to third parties for marketing purposes. See below for contact information for Hulbert Financial Digest and more information on Hulbert's practices regarding sharing your information with third parties. If you sign up to receive a Special Offer on the MarketWatch.com Service, Dow Jones will forward your request along with your email and Special Offer delivery information, to the company making the relevant Special Offer so that it can contact you directly. Once your information is provided to another company pursuant to your request it is not governed by this Privacy Policy.\nPromotional Offers May be Sent to You. We may send you offers on behalf of our company or other businesses, or permit other businesses that we are working with to send you offers, if we believe that you may be interested in receiving these offers. If, after receiving a non-order related email, you do not want to receive such emails in the future, you can notify us, by clicking on the 'unsubscribe' link attached to each email.\nSharing with Third Parties. We may share customer information that we collect with third parties. Usually, this information will be shared with a third party that has relationship with us as a business partner or marketing partner. (See information on Third Party Relationships below.) Also, we may use the information that you provide us, or that we collect about you, in connection with the promotion of our products and services and those of our affiliates. It is not our policy to sell or rent lists of our website customers to unaffiliated third parties.\nWe may provide Personal Information to other service providers to help facilitate our business, such as to host the service at a co-location facility for servers, to send you products\nIf we provide any of the information collected from you with a third party, their use of that information will be governed by their privacy policy.\nThe information that is collected by Axentra is considered to be an asset. We transfer information about you if Axentra is acquired by or merged with another company. before information about you is transferred and becomes subject to a different privacy policy. We will also take reasonable steps to place a notification of such a transfer on our Web site.\nWe may choose to buy or sell assets. In these types of transactions, customer information is typically one of the business assets that is transferred. \nAlso, if we (or substantially all of our assets) are acquired, or if we go out of business, enter bankruptcy, or go through some other change of \ncontrol, Personal Information would be one of the assets transferred to or acquired by a third party. If Boilerplate, or substantially all of its \nassets were acquired, or in the unlikely event that Boilerplate goes out of business or enters bankruptcy, user information would be one of the assets \nthat is transferred or acquired by a third party. You acknowledge that such transfers may occur, and that any acquiror of Boilerplate may continue to \nuse your personal information as set forth in this policy. In the event of a change in ownership, or a merger with, acquisition by, or sale of assets \nto, another entity, we may sell or otherwise transfer all information you provide to us, including personally identifiable information, to that \nentity. Opez may sell, transfer or otherwise share some or all of its assets, including your Personal Information, in connection with a merger, \nacquisition, reorganization or sale of assets or in the event of bankruptcy.\nPageLever may sell, transfer or otherwise disclose user information, including personally identifiable information, in connection with a corporate \nmerger, consolidation, the sale of substantially all assets, or other fundamental corporate change. Quartzy may transfer, sell, or assign information \nconcerning use of the Service, including without limitation, Members' Profile Data and Professional Data, in the event of a change in business \npractices such as a merger, acquisition by another company, consolidation, liquidation, or reorganization. Science Exchange may sell, transfer or \notherwise share some or all of its assets, including your Personal Information, in connection with a merger, acquisition, reorganization or sale of \nassets or in the event of bankruptcy. We transfer information about you if Snapjoy is acquired by or merged with another company.\nbefore information about you is transferred and becomes subject to a different privacy policy. If we are involved in a merger, \nacquisition, or sale of all or a portion of our assets, your information may be transferred as part of that transaction \nchange in control or use of your Personal Information or Files, or if either \nbecome subject to a different Privacy Policy. If Fluency Forums Corporation \nshould ever file for bankruptcy or merge with another company, we may sell the information you provide to us on this Site to a third party or share \nyour Personally Identifiable Information with any company with whom we merge.\nAirbnb may sell, transfer or otherwise share some or all of its assets, including your Personal Information, in connection with a merger, acquisition, reorganization or sale of assets or in the event of bankruptcy.\nIf we are involved in a merger, acquisition, or sale of all or a portion of our assets, your information may be transferred as part of that transaction change in control or use of your Personal Information or Files, or if either become subject to a different Privacy Policy. \nBusiness Transfers.   If we are involved in a merger, acquisition, or sale of all or a portion of our assets, your information may be transferred as part of that transaction subject to a different Privacy Policy. \nIn connection with a substantial corporate transaction, such as the sale of our business, a divestiture, merger, consolidation, or asset sale, or in the unlikely event of bankruptcy.\nIf Intermarkets is merged, acquired, or sold, or in the event of a transfer of some or all of our assets, we may disclose or transfer Personally Identifiable Information and Non-Personally Identifiable Information in connection with such transaction\nBusiness Transfers: As we develop our business, we might sell or buy businesses or assets. In the event of a corporate sale, merger, reorganization, dissolution or similar event, Personal Data may be part of the transferred assets.\nIn addition, as our business changes, we may buy or sell various assets. In the event all or a portion of the assets owned or controlled by Service Provider, its parent or any subsidiary or affiliated entity are sold, assigned, transferred or acquired by another company, the information from and/or about our Website users may be among the transferred assets. \nWe may also disclose your personal information and other information you provide to another third party as part of a sale of the assets\nWhen we share personal information with third parties in connection with the sale of a business\nsubstantially all of its assets were acquired, or in the unlikely event that Automattic goes out of business or enters bankruptcy, user information would be one of the assets that is transferred or acquired by a third party.\nundergoes a business transition, such as a merger, acquisition by another company, or sale of all or a portion of its assets, We may transfer all of your information, including personal information, to the successor organization in such transition.\nwe might sell or buy additional services or business units. In such transactions, user information generally is transferred along with the rest of the service or business unit. Also, in the event that IMDb, Inc., or substantially all of its assets are acquired, user information will of course be included in the transaction.\nyour personal information is also an asset and will become part of our normal business records. As such, we may also disclose your personal information to a third party if we decide to sell a line of business to that third party, so you can continue to receive service and information in connection with that line of business with as little disruption as possible. Similarly, in the event of a merger, acquisition, reorganization, bankruptcy, or other similar event, your personal information may be transferred to successor or assign. \nIn response to a subpoena or similar investigative demand, a court order, or a request for cooperation from a law enforcement or other government agency; to establish or exercise our legal rights; to defend against legal claims; or as otherwise required by law. In such cases, we may raise or waive any legal objection or right available to us.\n\nWhen we believe disclosure is appropriate in connection with efforts to investigate, prevent, or take other action regarding illegal activity, suspected fraud or other wrongdoing; to protect and defend the rights, property or safety of our company, our users, our employees, or others; to comply with applicable law or cooperate with law enforcement; or to enforce our website terms and conditions or other agreements or policies.\n\nIn connection with a substantial corporate transaction, such as the sale of our business, a divestiture, merger, consolidation, or asset sale, or in the unlikely event of bankruptcy.\nAs we develop our business, we may buy or sell assets or business offerings. Customer, Member, transaction, email, and visitor information is generally one of the transferred business assets in these types of transactions. We may also transfer such information in the course of corporate divestitures, mergers, or dissolution.\nWe may share your information in connection with a merger between Pandora and another entity, or in the event of a transfer of all or some of our assets to another company."
var include = function(arr, obj) {
    for(var i=0; i<arr.length; i++) {
        if (arr[i] == obj) return true;
    }
};

initializeDataStore = function() {
    var i, l;
    dataStore = {
        words: {},
        labels: {},
        labelUseCount: 0
    };

    for (i=0, l=LABELS.length; i<l; i++) {
        dataStore.labels[LABELS[i]] = 0;
    }
};

splitWords = function(str) {
    return str.split(/[\s\n;".,;:()<>[\]\\]+/);
};

processWord = function(word) {
    word = word.toLowerCase();
    word = word.length > 2 && !include(CORPUS_SKIP_WORDS, word) ? word : null;
    return word;
};

initializeWordInDatastore = function(word) {
    var i, l;
    dataStore.words[word] = {};

    for (i=0, l=LABELS.length; i<l; i++) {
        dataStore.words[word][LABELS[i]] = {count: 0, prob: 0.5};
    }
};

var setWordProbabilities = function() {
    var sumProb, sumCounts, word;

    for (var key in dataStore.words) {
        if (dataStore.words.hasOwnProperty(key)) {
            word = dataStore.words[key];
            sumProb = 0.0;
            sumCounts = 0;
            // set prob = count / total words for label
            LABELS.forEach(function(label) {
                word[label].prob = Math.min(1,
                    word[label].count / dataStore.labels[label]);
                sumProb += word[label].prob;
                sumCounts += word[label].count;
            });
            // set prob = prob / combined prob
            LABELS.forEach(function(label) {
                // zero-out prob if total occurrences < 5
                word[label].prob = sumCounts > 4 ?
                    Math.max(0.01, Math.min(0.99, word[label].prob / sumProb)) :
                    0;
            });
        }
    }
};

train = function(data, label) {
    var words = splitWords(data), i, l, word;

    for (i=0, l=words.length; i<l; i++) {
        word = processWord(words[i]);

        if (word) {
            // initialize word.
            if (!dataStore.words[word]) initializeWordInDatastore(word);

            dataStore.words[word][label].count += 1;
            dataStore.labels[label] += 1;
            dataStore.labelUseCount += 1;
        }
    }
};

maxLabelIndex = function(arr) {
    var maxIndex=0, i, l;

    for (i=0, l=arr.length; i<l; i++) {
        if (arr[i] > arr[maxIndex]) maxIndex = i;
    }

    return maxIndex;
};

var indexOfHighest = function(arr) {
    var maxIndex=0, highest=0, i, l;

    for (i=0, l=arr.length; i<l; i++) {
        if (arr[i].score > highest) {
            highest = arr[i].score;
            maxIndex = i;
        }
    }

    return maxIndex;
};

var getInterestingWords = function(words, label) {
    var interestScores, interestingWords=[], swapHolder, i, l, highIndex,
        seen = {}, count=0, prob;

    interestScores = words.map(function(word) {
        word = processWord(word);
        if (seen[word]) return {word: word, prob: 0, score: 0};
        seen[word] = true;
        prob = dataStore.words[word] ?
            dataStore.words[word][label].prob : 0.5;
        return {
            word: word,
            prob: prob,
            score: prob > 0 ? Math.abs(prob - 0.5) : 0
        };
    });
 
    for (i=0, l=interestScores.length; count<20 && i<l; i++) {
        highIndex = indexOfHighest(interestScores);
        swapHolder = interestScores[l-1];
        interestScores[l-1] = interestScores[highIndex];
        interestScores[highIndex] = swapHolder;
        interestingWords.push(interestScores.pop());
        l = interestScores.length;
        count +=1;
    }

    return interestingWords;
};

classify = function(data) {
    var words = splitWords(data), interesting,
        score, i, l, probSum=0, matchesProbLabel=true, ratio, prod, altProd,
        mult = function(result, ele) {
            return result * ele;
        }, label, index;

    index = 1;
    label = LABELS[index];
    interesting = getInterestingWords(words, label);
    prod = interesting.map(function(word) {
        return word.prob > 0 ? word.prob : 1;
    }).reduce(mult);
    altProd = interesting.map(function(word) {
        return 1 - word.prob;
    }).reduce(mult);
    score = prod / (prod + altProd);

    // debugging info.
    finalScores = [interesting, score];

    return score > .9 ? LABELS[1] : LABELS[0];
};

// run initialization;
(function() {
    initializeDataStore();
    train(NOSELL_TRAINING_DATA, LABELS[0]);
    train(SELL_TRAINING_DATA, LABELS[1]);
    setWordProbabilities();
})();

// Event handler for chrome requests.
onMessage = function(request, sender, sendResponse) {
    var tabID = sender.tab.id,
        classification = classify(request.bodyText);

    // regular expression test is simply a placeholder for classification.
    if (classification === 'NOSELL') {
        chrome.pageAction.setIcon({path: "green.png", tabId: tabID});
        chrome.pageAction.setTitle({title: "This site can't sell your info.", 
                tabId: tabID});
    } else {
        chrome.pageAction.setIcon({path: "red.png", tabId: tabID});
        chrome.pageAction.setTitle({title: "This site can sell your info :(",
                tabId: tabID});
    }

    chrome.pageAction.show(tabID);

    // Return nothing to let the connection be cleaned up.
    sendResponse({classification: classification, scores: finalScores});
};

// Listen for the content script to send a message to the background page.
chrome.extension.onMessage.addListener(onMessage);
