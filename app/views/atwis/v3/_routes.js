const govukPrototypeKit = require('govuk-prototype-kit')
const router = govukPrototypeKit.requests.setupRouter()

const versionPath = '/atwis/v3'

router.all(versionPath + '/*', function(req, res, next){
    res.locals.versionPath = versionPath
    next()
})



router.post(versionPath + '/referral-type-answer', function(request, response) {

    var referralType = request.session.data['send-new-referral']
    if (referralType == "Workplace Assessment"){
        response.redirect(versionPath + "/referrals/workplace-assessment/personal-details")
    } else {
        response.redirect(versionPath + "/referrals/mental-health-service/personal-details")
    }
})

router.post(versionPath + '/referral-type-mhs-answer', function(request, response) {

    var referralType = request.session.data['referral-type']
    if (referralType == "Authority referral"){
        response.redirect(versionPath + "/referrals/mental-health-service/provider-details-authority")
    } else {
        response.redirect(versionPath + "/referrals/mental-health-service/provider-details-self-referral")
    }
})


router.post(versionPath + '/search-type-answer', function(request, response) {

        var searchSelect = request.session.data['search-type']
        if (searchSelect == "Referrals"){
            response.redirect(versionPath + "/referrals/referral-search")
        } else {
            response.redirect(versionPath + "/search/find-a-case")
        }
    })


    router.post(versionPath + '/search-type-lead-answer', function(request, response) {

        var searchSelect = request.session.data['search-type-lead']
        if (searchSelect == "Referrals"){
            response.redirect(versionPath + "/referrals/team-lead-referral-history/referral-search")
        } else {
            response.redirect("#")
        }
    })

    router.post(versionPath + '/referrals/referral-search', function (req, res) {
        res.render(versionPath + '/referrals/referral-search', { data: req.body});
    });

    router.post(versionPath + '/referrals/team-lead-referral-history/referral-search', function (req, res) {
        res.render(versionPath + '/referrals/team-lead-referral-history/referral-search', { data: req.body});
    });


    router.post(versionPath + '/referral-type-answer-duplicate-referral', function(request, response) {

        var referralType = request.session.data['send-new-referral-duplicate']
        if (referralType == "Workplace Assessment"){
            response.redirect(versionPath + "/referrals/duplicate-referrals/workplace-assessment/personal-details")
        } else {
            response.redirect(versionPath + "/referrals/duplicate-referrals/mental-health-service/personal-details")
        }
    })


    router.post(versionPath + '/send-new-referral-anyway', function(request, response) {

        var sendReferralAnyway = request.session.data['send-new-referral-anyway']
        if (sendReferralAnyway == "yes"){
            response.redirect(versionPath + "/referrals/workplace-assessment/find-address")
        } else {
            response.redirect(versionPath + "/referrals/duplicate-referrals/referrals")
        }
    })

    router.post(versionPath + '/send-new-referral-anyway-mhss', function(request, response) {

        var sendReferralAnyway = request.session.data['six-month-report']
        if (sendReferralAnyway == "yes"){
            response.redirect(versionPath + "/referrals/duplicate-referrals/referrals")
        } else {
            response.redirect(versionPath + "/referrals/mental-health-service/find-address")
        }
    })

    router.post(versionPath + '/send-new-referral-anyway-in-flight', function(request, response) {

        var sendReferralAnyway = request.session.data['send-new-referral-anyway-mhss-in-flight']
        if (sendReferralAnyway == "yes"){
            response.redirect(versionPath + "/referrals/mental-health-service/find-address")
        } else {
            response.redirect(versionPath + "/referrals/duplicate-referrals/referrals")
        }
    })

router.post(versionPath + '/investigation-status-answer', function(request, response) {

    var investigationStatus = request.session.data['investigation-status']
    if (investigationStatus == "yes"){
        response.redirect(versionPath + "/data-retention/customer-record")
    } else {
        response.redirect(versionPath + "/data-retention/customer-record")
    }
})


router.post(versionPath + '/sent-rejection-letter-answer', function(request, response) {

    var sentLetter = request.session.data['sent-letter']
    if (sentLetter == "yes"){
        response.redirect(versionPath + "/csi/reject-case/case-rejected-confirmation")
    } else {
        response.redirect(versionPath + "/csi/user-case")
    }
})

router.post(versionPath + '/find-applicant-answer', function(request, response) {

    var findApplicant = request.session.data['found-applicant']
    if (findApplicant == "yes"){
        response.redirect(versionPath + "/csi/add-ni-number/add-ni-number")
    } else {
        response.redirect(versionPath + "/csi/contact-applicant/how-to-contact-applicant")
    }
})

router.post(versionPath + '/how-to-contact-applicant-answer', function(request, response) {

    var contactApplicant = request.session.data['how-to-contact-applicant']
    if (contactApplicant == "email"){
        response.redirect(versionPath + "/csi/contact-applicant/email/email-applicant")
    } else {
        response.redirect(versionPath + "/csi/contact-applicant/telephone/telephone-applicant")
    }
})

router.post(versionPath + '/sent-email-answer', function(request, response) {

    var sentEmail = request.session.data['sent-email']
    if (sentEmail == "yes"){
        response.redirect(versionPath + "/csi/contact-applicant/email/email-sent")
    } else {
        response.redirect(versionPath + "/csi/user-case")
    }
})

router.post(versionPath + '/applicant-answer-phone-answer', function(request, response) {

    var phoneAnswer = request.session.data['applicant-answer-phone']
    if (phoneAnswer == "yes"){
        response.redirect(versionPath + "/csi/contact-applicant/telephone/telephone-call-made")
    } else {
        response.redirect(versionPath + "/csi/user-case")
    }
})

router.post(versionPath + '/add-ni-number-answer', function(request, response) {

    var addNiNumber = request.session.data['ni-number-found']
    if (addNiNumber == "yes"){
        response.redirect(versionPath + "/csi/appointee/have-appointee")
    } else {
        response.redirect(versionPath + "/csi/appointee/have-appointee")
    }
})

router.post(versionPath + '/have-appointee-answer', function(request, response) {

    var haveAppointee = request.session.data['have-appointee']
    if (haveAppointee == "yes"){
        response.redirect(versionPath + "/csi/appointee/appointee-details")
    } else {
        response.redirect(versionPath + "/csi/check-details/check-personal-details")
    }
})

router.post(versionPath + '/how-to-contact-applicant-check-details-answer', function(request, response) {

    var contactApplicant = request.session.data['how-to-contact-applicant-check-details']
    if (contactApplicant == "email"){
        response.redirect(versionPath + "/csi/contact-applicant-check-details/email/email-applicant")
    } else {
        response.redirect(versionPath + "/csi/contact-applicant-check-details/telephone/telephone-applicant")
    }
})

router.post(versionPath + '/applicant-answer-phone-check-details-answer', function(request, response) {

    var phoneAnswer = request.session.data['applicant-answer-phone-check-details']
    if (phoneAnswer == "no"){
        response.redirect(versionPath + "/csi/contact-applicant-check-details/telephone/telephone-call-made")
    } else {
        response.redirect(versionPath + "/csi/user-case")
    }
})

router.post(versionPath + '/sent-email-check-details-answer', function(request, response) {

    var sentEmail = request.session.data['sent-email-check-details']
    if (sentEmail == "yes"){
        response.redirect(versionPath + "/csi/contact-applicant-check-details/email/email-sent")
    } else {
        response.redirect(versionPath + "/csi/user-case")
    }
})


router.post(versionPath + '/check-personal-details', function (req, res) {
  // Just go to next page
  res.redirect('/atwis/v3/csi/check-details/check-company-details');
});

router.post(versionPath + '/check-company-details', function (req, res) {
  // Just go to next page
  res.redirect('/atwis/v3/csi/check-details/check-interview-details');
});


router.post(versionPath + '/check-interview-details', function (req, res) {
  const q1 = req.session.data['do-details-match'];
  const q2 = req.session.data['are-details-complete'];
  const q3 = req.session.data['are-details-complete-interview-details'];

  if (q1 === 'no' || q2 === 'no' || q3 === 'no') {
    res.redirect('/atwis/v3/csi/contact-applicant-check-details/how-to-contact-applicant');
  } else {
    res.redirect('/atwis/v3/csi/send-confirmation-email/send-confirmation-email');
  }
});

router.post(versionPath + '/have-you-sent-the-email-confirmation-answer', function(request, response) {

    var sentEmail = request.session.data['have-you-sent-the-email-confirmation']
    if (sentEmail == "yes"){
        response.redirect(versionPath + "/csi/print-send-claim-form/print-send-claim-form")
    } else {
        response.redirect(versionPath + "/csi/print-send-claim-form/print-send-claim-form")
    }
})

router.post(versionPath + '/have-you-printed-and-sent-the-claim-form-answer', function(request, response) {

    var claimForm = request.session.data['have-you-printed-and-sent-the-claim-form']
    if (claimForm == "yes"){
        response.redirect(versionPath + "/csi/confirm-with-employer/confirm-with-employer")
    } else {
        response.redirect(versionPath + "/csi/confirm-with-employer/confirm-with-employer")
    }
})

router.post(versionPath + '/confirmation-method-with-employer-answer', function(request, response) {

        var claimType = request.session.data['confirmation-method-with-employer']
        if (claimType == "email"){
            response.redirect(versionPath + "/csi/confirm-with-employer/email/email-employer")
        } else if (claimType == "telephone"){
            response.redirect(versionPath + "/csi/confirm-with-employer/telephone/telephone-employer")
        } else if (claimType == "record a response"){
            response.redirect(versionPath + "/csi/confirm-with-employer/record-response/did-interview-happen")
        }
    })

    router.post(versionPath + '/sent-email-employer-check-answer', function(request, response) {

    var sentEmail = request.session.data['sent-email-employer-check']
    if (sentEmail == "yes"){
        response.redirect(versionPath + "/csi/confirm-with-employer/email/email-sent")
    } else {
        response.redirect(versionPath + "/csi/confirm-with-employer/record-response/did-interview-happen")
    }
})

router.post(versionPath + '/is-employer-available-answer', function(request, response) {

    var employerAvailability = request.session.data['is-employer-available']
    if (employerAvailability == "yes"){
        response.redirect(versionPath + "/csi/confirm-with-employer/telephone/telephone-call-made")
    } else {
        response.redirect(versionPath + "/csi/confirm-with-employer/record-response/did-interview-happen")
    }
})

router.post(versionPath + '/did-interview-happen-answer', function(request, response) {

    var didInterviewHappen = request.session.data['did-interview-happen']
    if (didInterviewHappen == "yes"){
        response.redirect(versionPath + "/csi/tasks-completed")
    } else {
        response.redirect(versionPath + "/csi/more-information/need-to-contact-applicant")
    }
})

router.post(versionPath + '/need-to-contact-applicant-more-info-answer', function(request, response) {

    var contactApplicant = request.session.data['need-to-contact-applicant-more-info']
    if (contactApplicant == "yes"){
        response.redirect(versionPath + "/csi/more-information/how-to-contact-applicant")
    } else {
        response.redirect(versionPath + "/csi/more-information/support-worker-cancellation-fee")
    }
})

router.post(versionPath + '/how-to-contact-applicant-more-info-answer', function(request, response) {

    var contactApplicant = request.session.data['how-to-contact-applicant-more-info']
    if (contactApplicant == "email"){
        response.redirect(versionPath + "/csi/more-information/email/email-applicant")
    } else {
        response.redirect(versionPath + "/csi/more-information/telephone/telephone-applicant")
    }
})

    router.post(versionPath + '/sent-email-more-info-answer', function(request, response) {

    var sentEmail = request.session.data['sent-email-more-info']
    if (sentEmail == "yes"){
        response.redirect(versionPath + "/csi/more-information/email/email-sent")
    } else {
        response.redirect(versionPath + "/csi/user-case")
    }
})

router.post(versionPath + '/applicant-answer-phone-more-info-answer', function(request, response) {

    var phoneAnswer = request.session.data['applicant-answer-phone-more-info']
    if (phoneAnswer == "no"){
        response.redirect(versionPath + "/csi/more-information/telephone/telephone-call-made")
    } else {
        response.redirect(versionPath + "/csi/user-case")
    }
})

router.post(versionPath + '/support-worker-cancellation-fee-answer', function(request, response) {

    var supportWorkerCancellationFee = request.session.data['support-worker-cancellation-fee']
    if (supportWorkerCancellationFee == "yes"){
        response.redirect(versionPath + "/csi/more-information/cancellation-fee")
    } else {
        response.redirect(versionPath + "/csi/more-information/reject-the-case")
    }
})

router.post(versionPath + '/reject-the-case-more-info-answer', function(request, response) {

    var rejectCase = request.session.data['reject-the-case-more-info']
    if (rejectCase == "yes"){
        response.redirect(versionPath + "/csi/reject-case/reject-case")
    } else {
        response.redirect(versionPath + "/csi/user-case")
    }
})


router.post(versionPath + '/copied-information-answer', function(request, response) {

    var copiedInformation = request.session.data['copied-information']
    if (copiedInformation == "yes"){
        response.redirect(versionPath + "/other-cases/new-application/enter-urn#application-details")
    } else {
        response.redirect(versionPath + "/other-cases/new-application/user-case#application-details")
    }
})

router.post(versionPath + '/copied-information-priority-answer', function(request, response) {

    var copiedInformation = request.session.data['copied-information-priority']
    if (copiedInformation == "yes"){
        response.redirect(versionPath + "/priority-cases/enter-urn#application-details")
    } else {
        response.redirect(versionPath + "/priority-cases/user-case#application-details")
    }
})

router.post(versionPath + '/end-date-answer', function(request, response) {

    var endDate = request.session.data['relevant-end-date']
    if (endDate == "yes"){
        response.redirect(versionPath + "/documents/what-is-the-end-date")
    } else {
        response.redirect(versionPath + "/documents/cant-change-status")
    }
})

router.post(versionPath + '/evidence-included-answer', function(request, response) {

    var evidenceIncluded = request.session.data['evidence-included']
    if (evidenceIncluded == "yes"){
        response.redirect(versionPath + "/search/csi/invoice/add-invoice-details")
    } else {
        response.redirect(versionPath + "/search/csi/check-evidence/request-missing-evidence")
    }
})

router.post(versionPath + '/sent-evidence-back-answer', function(request, response) {

    var sentEvidenceBack = request.session.data['sent-evidence-back']
    if (sentEvidenceBack == "yes"){
        response.redirect(versionPath + "/search/csi/check-evidence/evidence-sent")
    } else {
        response.redirect(versionPath + "/search/csi/user-case")
    }
})

router.post(versionPath + '/check-invoice-answer', function(request, response) {

    var checkInvoice = request.session.data['check-invoice']
    if (checkInvoice == "yes"){
        response.redirect(versionPath + "/search/csi/sop-check/find-payee-on-sop")
    } else {
        response.redirect(versionPath + "/search/csi/invoice/confirm-the-amount")
    }
})

router.post(versionPath + '/is-payee-on-sop-answer', function(request, response) {

    var payeeOnSop = request.session.data['is-payee-on-sop']
    if (payeeOnSop == "yes"){
        response.redirect(versionPath + "/search/csi/sop-check/check-payee-details")
    } else {
        response.redirect(versionPath + "/search/csi/sop-check/check-bank-details")
    }
})

router.post(versionPath + '/bank-details-valid-answer', function(request, response) {

    var bankDetails = request.session.data['bank-details-valid']
    if (bankDetails == "yes"){
        response.redirect(versionPath + "/search/csi/sop-check/request-sop-change")
    } else {
        response.redirect(versionPath + "/search/csi/sop-check/request-bank-details")
    }
})

router.post(versionPath + '/sent-evidence-back-sop-check-answer', function(request, response) {

    var sentEvidenceBack = request.session.data['sent-evidence-back']
    if (sentEvidenceBack == "yes"){
        response.redirect(versionPath + "/search/csi/sop-check/evidence-sent")
    } else {
        response.redirect(versionPath + "/search/csi/user-case")
    }
})

router.post(versionPath + '/has-form-been-sent-answer', function(request, response) {

    var sentForm = request.session.data['has-form-been-sent']
    if (sentForm == "yes"){
        response.redirect(versionPath + "/search/csi/sop-check/sop7-form-sent")
    } else {
        response.redirect(versionPath + "/search/csi/user-case")
    }
})

router.post(versionPath + '/do-payee-details-match-answer', function(request, response) {

    var detailsMatch = request.session.data['do-payee-details-match']
    if (detailsMatch == "yes"){
        response.redirect(versionPath + "/search/csi/sop-check/add-sop-supplier-number")
    } else {
        response.redirect(versionPath + "/search/csi/sop-check/request-sop-change")
    }
})

router.post(versionPath + '/approve-payment-answer', function(request, response) {

    var approvePayment = request.session.data['approve-payment']
    if (approvePayment == "yes"){
        response.redirect(versionPath + "/search/csi/sop-check/payment-approved")
    } else {
        response.redirect(versionPath + "/search/csi/user-case")
    }
})

router.post(versionPath + '/is-cost-reasonable-answer', function(request, response) {

    var reasonableCost = request.session.data['is-cost-reasonable']
    if (reasonableCost == "yes"){
        response.redirect(versionPath + "/search/csi/case-manager-handover/allocate-case-to-payment-officer")
    } else {
        response.redirect(versionPath + "/search/csi/case-manager-handover/need-to-contact-applicant")
    }
})

router.post(versionPath + '/need-to-contact-applicant-answer', function(request, response) {

    var contactApplicant = request.session.data['need-to-contact-applicant']
    if (contactApplicant == "yes"){
        response.redirect(versionPath + "/search/csi/case-manager-handover/how-to-contact-applicant")
    } else {
        response.redirect(versionPath + "/search/csi/case-manager-handover/agreed-support-cost")
    }
})

router.post(versionPath + '/how-to-contact-applicant-case-manager-handover-answer', function(request, response) {

    var howToContactApplicant = request.session.data['how-to-contact-applicant']
    if (howToContactApplicant == "email"){
        response.redirect(versionPath + "/search/csi/case-manager-handover/email-applicant")
    } else {
        response.redirect(versionPath + "/search/csi/case-manager-handover/telephone-applicant")
    }
})

router.post(versionPath + '/email-the-applicant-case-manager-handover-answer', function(request, response) {

    var emailApplicant = request.session.data['email-applicant']
    if (emailApplicant == "yes"){
        response.redirect(versionPath + "/search/csi/case-manager-handover/email-sent")
    } else {
        response.redirect(versionPath + "/search/csi/case-manager-handover/user-case")
    }
})

router.post(versionPath + '/telephone-the-applicant-case-manager-handover-answer', function(request, response) {

    var telephoneApplicant = request.session.data['telephone-applicant']
    if (telephoneApplicant == "yes"){
        response.redirect(versionPath + "/search/csi/case-manager-handover/agreed-support-cost")
    } else {
        response.redirect(versionPath + "/search/csi/case-manager-handover/telephone-call-made")
    }
})
//Do not delete this
module.exports = router