const govukPrototypeKit = require('govuk-prototype-kit')
const router = govukPrototypeKit.requests.setupRouter()

const versionPath = '/claims/v3'

router.all(versionPath + '/*', function(req, res, next){
    res.locals.versionPath = versionPath
    next()
})


router.post('/remove-home-number-answer-claim', function(request, response) {
  const removeHomeNumber = request.body['remove-home-number-claim'];

  // Save the user's answer to the session
  request.session.data['remove-home-number-claim'] = removeHomeNumber;

  // If they confirmed removal, clear the phone number
  if (removeHomeNumber === 'yes') {
    request.session.data['your-home-number-claim'] = null; // or delete it
  }

  // Redirect back to the summary page
  response.redirect(versionPath + "/personal-details/telephone-numbers");
})


router.post('/remove-mobile-number-answer-claim', function(request, response) {
  const removeMobileNumber = request.body['remove-mobile-number-claim'];

  // Save the user's answer to the session
  request.session.data['remove-mobile-number-claim'] = removeMobileNumber;

  // If they confirmed removal, clear the phone number
  if (removeMobileNumber === 'yes') {
    request.session.data['your-mobile-number-claim'] = null; // or delete it
  }

  // Redirect back to the summary page
  response.redirect(versionPath + "/personal-details/telephone-numbers");
})
// Updated phone removal logic V3 
router.post('/remove-home-number-answer', function(request, response) {

  if (request.session.data['remove-home-number'] === 'yes') {
    request.session.data['home-number'] = null; 
  }

  response.redirect(versionPath + "/personal-details/telephone-numbers");
})

router.post('/remove-mobile-number-answer', function(request, response) {

  if (request.session.data['remove-mobile-number'] === 'yes') {
    request.session.data['mobile-number'] = null3; 
  }
  
  response.redirect(versionPath + "/personal-details/telephone-numbers");
})


router.post('/claims-summary', function(request, response) {

    var vehicleAdaptationsClaims = request.session.data['add-another-claim']
    if (vehicleAdaptationsClaims == "yes"){
        response.redirect(versionPath + "/start-claim/vehicle-adaptations/your-vehicle-adaptation")
    } else {
        response.redirect(versionPath + "/start-claim/vehicle-adaptations/adaptation-cost")
    }
})

// Vehicle adaptations - remove claim - not used?
router.post('/remove-vehicle-adaption-claim-answer', function(request, response) {

    var removeVehicleAdaptationsClaim = request.session.data['remove-vehicle-adaptation-claim']
    if (removeVehicleAdaptationsClaim == "yes"){
        response.redirect(versionPath + "/start-claim/vehicle-adaptations/claims-summary")
    } else {
        response.redirect(versionPath + "/start-claim/vehicle-adaptations/claims-summary")
    }
})

// Vehicle adaptations - Add another invoice or receipt
router.post('/add-another-VA-invoice-answer', function(request, response) {

    var addAnotherInvoice = request.session.data['add-another-VA-invoice']
    if (addAnotherInvoice == "yes"){
        response.redirect(versionPath + "/start-claim/vehicle-adaptations/uploads")
    } else {
        response.redirect(versionPath + "/start-claim/vehicle-adaptations/who-to-pay")
    }
})
// Vehicle adaptations - Add another invoice or receipt
router.post('/add-another-equipment-invoice-answer', function(request, response) {

    var addAnotherInvoice = request.session.data['add-another-equipment-invoice']
    if (addAnotherInvoice == "yes"){
        response.redirect(versionPath + "/start-claim/specialist-equipment/uploads")
    } else {
        response.redirect(versionPath + "/start-claim/specialist-equipment/who-to-pay")
    }
})

//Vehicle adaptations - Remove an invoice or receipt
router.post('/remove-adaptation-file-answer', function(request, response) {

    var removeVehicleAdaptationsFile = request.session.data['remove-vehicle-file']
    if (removeVehicleAdaptationsFile == "yes"){
        response.redirect(versionPath + "/start-claim/vehicle-adaptations/no-file")
    } else {
        response.redirect(versionPath + "/start-claim/vehicle-adaptations/uploaded")
    }
})

// Taxi to work - Add another invoice
router.post('/add-another-taxi-invoice-answer', function(request, response) {

    var addAnotherInvoice = request.session.data['add-another-taxi-invoice']
    if (addAnotherInvoice == "yes"){
        response.redirect(versionPath + "/start-claim/travel-to-work/taxi/uploads")
    } else {
        response.redirect(versionPath + "/start-claim/travel-to-work/taxi/payee")
    }
})

//Taxi to work - Remove an invoice or reciept
router.post('/remove-taxi-file-answer', function(request, response) {

    var removeVehicleAdaptationsClaim = request.session.data['remove-taxi-file']
    if (removeVehicleAdaptationsClaim == "yes"){
        response.redirect(versionPath + "/start-claim/travel-to-work/taxi/no-file")
    } else {
        response.redirect(versionPath + "/start-claim/travel-to-work/taxi/uploads")
    }
})

//Specialist equipment - Remove an invoice or receipt
router.post('/remove-equipment-file-answer', function(request, response) {

    var removeVehicleAdaptationsFile = request.session.data['remove-equipment-file']
    if (removeVehicleAdaptationsFile == "yes"){
        response.redirect(versionPath + "/start-claim/specialist-equipment/no-file")
    } else {
        response.redirect(versionPath + "/start-claim/specialist-equipment/uploaded")
    }
})

router.post('/claim-other-journeys-answer', function(request, response) {

    var addOtherMonth = request.session.data['claim-other-journeys']
    if (addOtherMonth == "yes"){
        response.redirect(versionPath + "/start-claim/travel-to-work/taxi/claim-month")
    } else {
        response.redirect(versionPath + "/start-claim/travel-to-work/taxi/total-cost")
    }
})


router.post('/claim-other-journeys-taxi-answer', function(request, response) {

    var addOtherMonth = request.session.data['claim-other-journeys-taxi']
    if (addOtherMonth == "yes"){
        response.redirect(versionPath + "/start-claim/travel-to-work/taxi/uploads")
    } else {
        response.redirect(versionPath + "/start-claim/travel-to-work/taxi/payee")
    }
})


router.post('/select-payee-taxi-answer', function(request, response) {

    var selectPayee = request.session.data['payee-select-taxi']
    if (selectPayee == "Kings Taxis"){
        response.redirect(versionPath + "/start-claim/travel-to-work/taxi/existing-account-details")
    } else {
        response.redirect(versionPath + "/start-claim/travel-to-work/taxi/who-to-pay")
    }
})

router.post('/employment-status-taxi-answer', function(request, response) {

    var employmentStatus = request.session.data['employment-status-taxi']
    if (employmentStatus == "Employed"){
        response.redirect(versionPath + "/start-claim/travel-to-work/taxi/workplace-contact")
    } else {
        response.redirect(versionPath + "/start-claim/travel-to-work/taxi/check-your-answers")
    }
})

router.post('/claim-type-answer', function(request, response) {

        var claimType = request.session.data['claim-type']
        console.log(claimType)
        if (claimType == "vehicle adaptation"){
            response.redirect(versionPath + "/start-claim/vehicle-adaptations/about-your-grant")
        } else if (claimType == "travel to work"){
            response.redirect(versionPath + "/start-claim/travel-to-work/about-your-grant")
        } else if (claimType == "specialist equipment"){
            response.redirect(versionPath + "/start-claim/specialist-equipment/about-your-grant")
        } else if (claimType == "support worker"){
            response.redirect(versionPath + "/start-claim/support-worker/about-your-grant")
        } else if (claimType == "travel during work music"){
            response.redirect(versionPath + "/start-claim/travel-during-work-music/about-your-grant")
        } else if (claimType == "travel during work sport"){
            response.redirect(versionPath + "/start-claim/travel-during-work-sport/about-your-grant")
        } else if (claimType == "something else"){
            response.redirect(versionPath + "/start-claim/something-else/unable-to-claim")
        }
    })

    router.post('/journey-type-answer', function(request, response) {

    var journeyType = request.session.data['journey-type']
    if (journeyType == "taxi"){
        response.redirect(versionPath + "/start-claim/travel-to-work/taxi/claiming-info")
    } else {
        response.redirect(versionPath + "/start-claim/travel-to-work/lift/claim-instructions")
    }
})

  router.post('/select-payee-details-answer', function(request, response) {

    var payeeDetails = request.session.data['select-payee-details']
    if (payeeDetails == "Lloyds bank"){
        response.redirect(versionPath + "/start-claim/travel-to-work/taxi/employment-status")
    } else {
        response.redirect(versionPath + "/start-claim/travel-to-work/taxi/who-to-pay")
    }
})

 router.post('/mileage-or-journey-answer', function(request, response) {

    var mileageOrJourney = request.session.data['mileage-or-journey']
    if (mileageOrJourney == "journeys"){
        response.redirect(versionPath + "/start-claim/travel-to-work/lift/claim-month")
    } else {
        response.redirect(versionPath + "/start-claim/travel-to-work/lift/claim-month-mileage")
    }
})

router.post('/claim-other-journeys-month-answer', function(request, response) {

    var addOtherMonthLift = request.session.data['claim-other-journeys-month']
    if (addOtherMonthLift == "yes"){
        response.redirect(versionPath + "/start-claim/travel-to-work/lift/claim-month")
    } else {
        response.redirect(versionPath + "/start-claim/travel-to-work/lift/total-journeys")
    }
})

router.post('/select-payee-lift-answer', function(request, response) {

    var selectPayee = request.session.data['payee-select-lift']
    if (selectPayee == "Kings Taxis"){
        response.redirect(versionPath + "/start-claim/travel-to-work/lift/existing-account-details")
    } else {
        response.redirect(versionPath + "/start-claim/travel-to-work/lift/who-to-pay")
    }
})

router.post('/employment-status-lift-answer', function(request, response) {

    var employmentStatus = request.session.data['employment-status-lift']
    if (employmentStatus == "Employed"){
        response.redirect(versionPath + "/start-claim/travel-to-work/lift/workplace-contact")
    } else {
        response.redirect(versionPath + "/start-claim/travel-to-work/lift/check-your-answers")
    }
})

router.post('/claim-other-mileage-month-answer', function(request, response) {

    var addOtherMonthLift = request.session.data['claim-other-mileage-month']
    if (addOtherMonthLift == "yes"){
        response.redirect(versionPath + "/start-claim/travel-to-work/lift/claim-month-mileage")
    } else {
        response.redirect(versionPath + "/start-claim/travel-to-work/lift/total-mileage")
    }
})

router.post('/claims-summary-specialist-equipment', function(request, response) {

    var specialistEquipmentClaims = request.session.data['add-another-claim-specialist-equipment']
    if (specialistEquipmentClaims == "yes"){
        response.redirect(versionPath + "/start-claim/specialist-equipment/your-specialist-equipment")
    } else {
        response.redirect(versionPath + "/start-claim/specialist-equipment/specialist-equipment-cost")
    }
})

router.post('/upload-other-files-specialist-equipment-answer', function(request, response) {

    var addOtherFileUpload = request.session.data['upload-other-files-specialist-equipment']
    if (addOtherFileUpload == "yes"){
        response.redirect(versionPath + "/start-claim/specialist-equipment/uploads")
    } else {
        response.redirect(versionPath + "/start-claim/specialist-equipment/payee")
    }
})

router.post('/select-payee-specialist-equipment-answer', function(request, response) {

    var selectPayee = request.session.data['payee-select-specialist-equipment']
    if (selectPayee == "Kings Equipment"){
        response.redirect(versionPath + "/start-claim/specialist-equipment/existing-account-details")
    } else {
        response.redirect(versionPath + "/start-claim/specialist-equipment/who-to-pay")
    }
})

 router.post('/select-payee-details-specialist-equipment-answer', function(request, response) {

    var payeeDetails = request.session.data['select-payee-details-specialist-equipment']
    if (payeeDetails == "Lloyds bank"){
        response.redirect(versionPath + "/start-claim/specialist-equipment/check-your-answers")
    } else {
        response.redirect(versionPath + "/start-claim/specialist-equipment/check-your-answers")
    }
})

router.post('/support-worker-add-other-month-answer', function(request, response) {

    var addOtherMonth = request.session.data['add-other-month-support-worker']
    if (addOtherMonth == "yes"){
        response.redirect(versionPath + "/start-claim/support-worker/claim-month")
    } else {
        response.redirect(versionPath + "/start-claim/support-worker/total-cost")
    }
})

router.post('/add-another-invoice-support-worker-answer', function(request, response) {

    var addAnotherInvoice = request.session.data['add-another-invoice-support-worker']
    if (addAnotherInvoice == "yes"){
        response.redirect(versionPath + "/start-claim/support-worker/uploads")
    } else {
        response.redirect(versionPath + "/start-claim/support-worker/payee")
    }
})
router.post('/remove-support-worker-file-answer', function(request, response) {

    var removeVehicleAdaptationsClaim = request.session.data['remove-support-worker-file']
    if (removeVehicleAdaptationsClaim == "yes"){
        response.redirect(versionPath + "/start-claim/support-worker/no-file")
    } else {
        response.redirect(versionPath + "/start-claim/support-worker/uploaded")
    }
})

router.post('/select-payee-support-worker-answer', function(request, response) {

    var selectPayee = request.session.data['payee-select-support-worker']
    if (selectPayee == "The Support Worker Network"){
        response.redirect(versionPath + "/start-claim/support-worker/existing-account-details")
    } else {
        response.redirect(versionPath + "/start-claim/support-worker/who-to-pay")
    }
})

router.post('/select-payee-details-support-worker-answer', function(request, response) {

    var payeeDetails = request.session.data['select-payee-details-support-worker']
    if (payeeDetails == "Lloyds bank"){
        response.redirect(versionPath + "/start-claim/support-worker/check-your-answers")
    } else {
        response.redirect(versionPath + "/start-claim/support-worker/payment-details")
    }
})

router.post('/employment-status-support-worker-answer', function(request, response) {

    var employmentStatus = request.session.data['employment-status-support-worker']
    if (employmentStatus == "Employed"){
        response.redirect(versionPath + "/start-claim/support-worker/workplace-contact")
    } else {
        response.redirect(versionPath + "/start-claim/support-worker/check-your-answers")
    }
})

// Travel during work - music
router.post('/tdwm-add-other-month-answer', function(request, response) {

    var addOtherMonth = request.session.data['add-other-month-tdwm']
    if (addOtherMonth == "yes"){
        response.redirect(versionPath + "/start-claim/travel-during-work-music/claim-month")
    } else {
        response.redirect(versionPath + "/start-claim/travel-during-work-music/total-miles")
    }
})

router.post('/add-another-tdwm-invoice-answer', function(request, response) {

    var addAnotherInvoice = request.session.data['add-another-tdwm-invoice']
    if (addAnotherInvoice == "yes"){
        response.redirect(versionPath + "/start-claim/travel-during-work-music/uploads")
    } else {
        response.redirect(versionPath + "/start-claim/travel-during-work-music/payee")
    }
})

router.post('/remove-tdwm-file-answer', function(request, response) {

    var removeVehicleAdaptationsClaim = request.session.data['remove-tdwm-file']
    if (removeVehicleAdaptationsClaim == "yes"){
        response.redirect(versionPath + "/start-claim/travel-during-work-music/no-file")
    } else {
        response.redirect(versionPath + "/start-claim/travel-during-work-music/uploaded")
    }
})

router.post('/select-payee-tdwm-answer', function(request, response) {

    var selectPayee = request.session.data['payee-select-tdwm']
    if (selectPayee == "A to B Travel Support"){
        response.redirect(versionPath + "/start-claim/travel-during-work-music/existing-account-details")
    } else {
        response.redirect(versionPath + "/start-claim/travel-during-work-music/who-to-pay")
    }
})

router.post('/select-payee-details-tdwm-answer', function(request, response) {

    var payeeDetails = request.session.data['select-payee-details-tdwm']
    if (payeeDetails == "Lloyds bank"){
        response.redirect(versionPath + "/start-claim/travel-during-work-music/check-your-answers")
    } else {
        response.redirect(versionPath + "/start-claim/travel-during-work-music/payment-details")
    }
})

router.post('/employment-status-tdwm-answer', function(request, response) {

    var employmentStatus = request.session.data['employment-status-tdwm']
    if (employmentStatus == "Employed"){
        response.redirect(versionPath + "/start-claim/travel-during-work-music/workplace-contact")
    } else {
        response.redirect(versionPath + "/start-claim/travel-during-work-music/check-your-answers")
    }
})


// Travel during work - sports

router.post('/tdws-add-other-month-answer', function(request, response) {

    var addOtherMonth = request.session.data['add-other-month-tdws']
    if (addOtherMonth == "yes"){
        response.redirect(versionPath + "/start-claim/travel-during-work-sport/claim-month")
    } else {
        response.redirect(versionPath + "/start-claim/travel-during-work-sport/total-miles")
    }
})

router.post('/add-another-tdws-invoice-answer', function(request, response) {

    var addAnotherInvoice = request.session.data['add-another-tdws-invoice']
    if (addAnotherInvoice == "yes"){
        response.redirect(versionPath + "/start-claim/travel-during-work-sport/uploads")
    } else {
        response.redirect(versionPath + "/start-claim/travel-during-work-sport/payee")
    }
})

router.post('/remove-tdws-file-answer', function(request, response) {

    var removeVehicleAdaptationsClaim = request.session.data['remove-tdws-file']
    if (removeVehicleAdaptationsClaim == "yes"){
        response.redirect(versionPath + "/start-claim/travel-during-work-sport/no-file")
    } else {
        response.redirect(versionPath + "/start-claim/travel-during-work-sport/uploaded")
    }
})

router.post('/select-payee-tdws-answer', function(request, response) {

    var selectPayee = request.session.data['payee-select-tdws']
    if (selectPayee == "A to B Travel Support"){
        response.redirect(versionPath + "/start-claim/travel-during-work-sport/existing-account-details")
    } else {
        response.redirect(versionPath + "/start-claim/travel-during-work-sport/who-to-pay")
    }
})

router.post('/select-payee-details-tdws-answer', function(request, response) {

    var payeeDetails = request.session.data['select-payee-details-tdws']
    if (payeeDetails == "Lloyds bank"){
        response.redirect(versionPath + "/start-claim/travel-during-work-sport/check-your-answers")
    } else {
        response.redirect(versionPath + "/start-claim/travel-during-work-sport/payment-details")
    }
})

router.post('/employment-status-tdws-answer', function(request, response) {

    var employmentStatus = request.session.data['employment-status-tdws']
    if (employmentStatus == "Employed"){
        response.redirect(versionPath + "/start-claim/travel-during-work-sport/workplace-contact")
    } else {
        response.redirect(versionPath + "/start-claim/travel-during-work-sport/check-your-answers")
    }
})


router.post('/claim-grant-summary-support-type-answer', function(request, response) {

        var grantSummarySupportType = request.session.data['grant-summary-support-type']
        if (grantSummarySupportType == "vehicle adaptation"){
            response.redirect(versionPath + "/grant-summary/vehicle-adaptation-grant-summary")
        } else if (grantSummarySupportType == "travel to work"){
            response.redirect(versionPath + "/grant-summary/travel-to-work-grant-summary")
        } else if (grantSummarySupportType == "specialist equipment"){
            response.redirect(versionPath + "/grant-summary/specialist-equipment-grant-summary")
        } else if (grantSummarySupportType == "support worker"){
            response.redirect(versionPath + "/grant-summary/support-worker-grant-summary")
        } else if (grantSummarySupportType == "travel during work"){
            response.redirect(versionPath + "/grant-summary/multiple-jobs/select-role")
        } else if (grantSummarySupportType == "something else"){
            response.redirect(versionPath + "/grant-summary/something-else")
        }
    })

    router.post('/claim-select-role-answer', function(request, response) {

        var selectRole = request.session.data['select-role']
        if (selectRole == "job 1"){
            response.redirect(versionPath + "/grant-summary/multiple-jobs/job-1-grant-summary")
        } else if (selectRole == "job 2"){
            response.redirect(versionPath + "/grant-summary/multiple-jobs/job-2-grant-summary")
        } else if (selectRole == "different job"){
            response.redirect(versionPath + "/grant-summary/something-else")
        }
    })
router.post(versionPath + '/payments/which-payments-post', function (req, res) {

    const employer = req.session.data['journey-type']

    req.session.data.page = 1
    

    if (employer === 'supportworker') {
      req.session.data['claimshistory'] = [
        {
          date: '1 November',
          paid: '13 November',
          type: 'BSL Interpreter',
          person: 'Jane Smith',
          cost: '£150',
          status: 'Created',
          year: 2024,
          yearpaid: 2024
        },
        {
          date: '1 November',
          paid: '12 November',
          type: 'Support worker',
          person: 'John Doe',
          cost: '£50',
          status: 'Created',
          year: 2024,
          yearpaid: 2024
        },
        {
          date: '1 October',
          paid: '14 October',
          type: 'BSL Interpreter',
          person: 'Jane Smith',
          cost: '£155',
          status: 'Approved',
          year: 2024,
          yearpaid: 2024
        },
        {
          date: '1 October',
          paid: '14 October',
          type: 'Support worker',
          person: 'John Doe',
          cost: '£50',
          status: 'Not approved',
          year: 2024,
          yearpaid: 2024
        },
        {
          date: '2 September',
          paid: '8 September',
          type: 'BSL Interpreter',
          person: 'Jane Smith',
          cost: '£150',
          status: 'Posted',
          year: 2024,
          yearpaid: 2024
        },
        {
          date: '1 September',
          paid: '10 September',
          type: 'Support worker',
          person: 'John Doe',
          cost: '£50',
          status: 'Posted',
          year: 2024,
          yearpaid: 2024
        },
        {
          date: '1 August',
          paid: '21 August',
          type: 'BSL Interpreter',
          person: 'Jane Smith',
          cost: '£150',
          status: 'Posted',
          year: 2024,
          yearpaid: 2024
        },
        {
          date: '1 August',
          paid: '11 August',
          type: 'Support worker',
          person: 'John Doe',
          cost: '£50',
          status: 'Posted',
          year: 2024,
          yearpaid: 2024
        },
        {
          date: '1 July',
          paid: '9 July',
          type: 'BSL Interpreter',
          person: 'Jane Smith',
          cost: '£150',
          status: 'Posted',
          year: 2024,
          yearpaid: 2024
        },
        {
          date: '1 July',
          paid: '14 July',
          type: 'Support worker',
          person: 'John Doe',
          cost: '£50',
          status: 'Posted',
          year: 2024,
          yearpaid: 2024
        },
        {
          date: '1 June',
          paid: '14 June',
          type: 'BSL Interpreter',
          person: 'Jane Smith',
          cost: '£150',
          status: 'Posted',
          year: 2024,
          yearpaid: 2024
        },
        {
          date: '1 May',
          paid: '30 May',
          type: 'BSL Interpreter',
          person: 'Jane Smith',
          cost: '£150',
          status: 'Posted',
          year: 2024,
          yearpaid: 2024
        },
        {
          date: '1 April',
          paid: '2 May',
          type: 'BSL Interpreter',
          person: 'Jane Smith',
          cost: '£150',
          status: 'Posted',
          year: 2024,
          yearpaid: 2024
        },
        {
          date: '1 March',
          paid: '10 March',
          type: 'BSL Interpreter',
          person: 'Jane Smith',
          cost: '£130',
          status: 'Posted',
          year: 2024,
          yearpaid: 2024
        },
        {
          date: '1 February',
          paid: '10 February',
          type: 'BSL Interpreter',
          person: 'Jane Smith',
          cost: '£130',
          status: 'RM Rejected',
          year: 2024,
          yearpaid: 2024
        },
        {
          date: '1 January',
          paid: '10 January',
          type: 'BSL Interpreter',
          person: 'Jane Smith',
          cost: '£130',
          status: 'Posted',
          year: 2024,
          yearpaid: 2024
        },
        {
          date: '1 December',
          paid: '7 December',
          type: 'BSL Interpreter',
          person: 'Jane Smith',
          cost: '£80',
          status: 'Posted',
          year: 2023,
          yearpaid: 2023
        },
        {
          date: '1 November',
          paid: '11 November',
          type: 'BSL Interpreter',
          person: 'Jane Smith',
          cost: '£130',
          status: 'Posted',
          year: 2023,
          yearpaid: 2023
        },
        {
          date: '1 October',
          paid: '10 October',
          type: 'BSL Interpreter',
          person: 'Jane Smith',
          cost: '£130',
          status: 'Posted',
          year: 2023,
          yearpaid: 2023
        },
        {
          date: '1 September',
          paid: '13 September',
          type: 'BSL Interpreter',
          person: 'Jane Smith',
          cost: '£130',
          status: 'Posted',
          year: 2023,
          yearpaid: 2023
        },
        {
          date: '1 April',
          paid: '11 April',
          type: 'BSL Interpreter',
          person: 'Jane Smith',
          cost: '£130',
          status: 'Posted',
          year: 2023,
          yearpaid: 2023
        },
        {
          date: '1 March',
          paid: '11 March',
          type: 'BSL Interpreter',
          person: 'Jane Smith',
          cost: '£130',
          status: 'Posted',
          year: 2023,
          yearpaid: 2023
        },
        {
          date: '3 February',
          paid: '12 February',
          type: 'BSL Interpreter',
          person: 'Jane Smith',
          cost: '£130',
          status: 'Posted',
          year: 2023,
          yearpaid: 2023
        },
        {
          date: '12 January',
          paid: '22 January',
          type: 'BSL Interpreter',
          person: 'Jane Smith',
          cost: '£130',
          status: 'Posted',
          year: 2023,
          yearpaid: 2023
        },
        {
          date: '1 December',
          paid: '12 December',
          type: 'BSL Interpreter',
          person: 'Jane Smith',
          cost: '£85',
          status: 'Posted',
          year: 2022,
          yearpaid: 2022
        },
        {
          date: '1 November',
          paid: '12 November',
          type: 'BSL Interpreter',
          person: 'Jane Smith',
          cost: '£130',
          status: 'Posted',
          year: 2022,
          yearpaid: 2022
        },
        {
          date: '1 October',
          paid: '10 October',
          type: 'BSL Interpreter',
          person: 'Jane Smith',
          cost: '£130',
          status: 'Posted',
          year: 2022,
          yearpaid: 2022
        },
        {
          date: '1 September',
          paid: '6 September',
          type: 'BSL Interpreter',
          person: 'Jane Smith',
          cost: '£130',
          status: 'RM Rejected',
          year: 2022,
          yearpaid: 2022
        },
        {
          date: '1 August',
          paid: '12 August',
          type: 'BSL Interpreter',
          person: 'Jane Smith',
          cost: '£130',
          status: 'Posted',
          year: 2022,
          yearpaid: 2022
        },
        {
          date: '1 July',
          paid: '11 July',
          type: 'BSL Interpreter',
          person: 'Jane Smith',
          cost: '£100',
          status: 'Posted',
          year: 2022,
          yearpaid: 2022
        },
        {
          date: '1 June',
          paid: '11 June',
          type: 'BSL Interpreter',
          person: 'Jane Smith',
          cost: '£100',
          status: 'Posted',
          year: 2022,
          yearpaid: 2022
        },
        {
          date: '1 May',
          paid: '11 May',
          type: 'BSL Interpreter',
          person: 'Jane Smith',
          cost: '£100',
          status: 'Posted',
          year: 2022,
          yearpaid: 2022
        },
        {
          date: '1 April',
          paid: '11 April',
          type: 'BSL Interpreter',
          person: 'Jane Smith',
          cost: '£100',
          status: 'Posted',
          year: 2022,
          yearpaid: 2022
        },
        {
          date: '1 March',
          paid: '23 March',
          type: 'BSL Interpreter',
          person: 'Jane Smith',
          cost: '£100',
          status: 'Posted',
          year: 2022,
          yearpaid: 2022
        },
        {
          date: '1 February',
          paid: '13 February',
          type: 'BSL Interpreter',
          person: 'Jane Smith',
          cost: '£100',
          status: 'Posted',
          year: 2022,
          yearpaid: 2022
        },
        {
          date: '3 January',
          paid: '30 January',
          type: 'BSL Interpreter',
          person: 'Jane Smith',
          cost: '£100',
          status: 'Posted',
          year: 2022,
          yearpaid: 2022
        },
        {
          date: '1 December',
          paid: '12 December',
          type: 'BSL Interpreter',
          person: 'Jane Smith',
          cost: '£65',
          status: 'Posted',
          year: 2021,
          yearpaid: 2021
        },
        {
          date: '1 November',
          paid: '12 November',
          type: 'BSL Interpreter',
          person: 'Jane Smith',
          cost: '£100',
          status: 'Posted',
          year: 2021,
          yearpaid: 2021
        },
        {
          date: '1 October',
          paid: '11 October',
          type: 'BSL Interpreter',
          person: 'Jane Smith',
          cost: '£100',
          status: 'Posted',
          year: 2021,
          yearpaid: 2021
        },
        {
          date: '1 September',
          paid: '11 September',
          type: 'BSL Interpreter',
          person: 'Jane Smith',
          cost: '£100',
          status: 'Posted',
          year: 2021,
          yearpaid: 2021
        },
        {
          date: '1 August',
          paid: '11 August',
          type: 'BSL Interpreter',
          person: 'Jane Smith',
          cost: '£100',
          status: 'Posted',
          year: 2021,
          yearpaid: 2021
        },
        {
          date: '1 July',
          paid: '12 July',
          type: 'BSL Interpreter',
          person: 'Jane Smith',
          cost: '£100',
          status: 'Posted',
          year: 2021,
          yearpaid: 2021
        },
        {
          date: '1 June',
          paid: '12 June',
          type: 'BSL Interpreter',
          person: 'Jane Smith',
          cost: '£100',
          status: 'Posted',
          year: 2021,
          yearpaid: 2021
        },
        {
          date: '1 May',
          paid: '28 May',
          type: 'BSL Interpreter',
          person: 'Jane Smith',
          cost: '£100',
          status: 'Posted',
          year: 2021,
          yearpaid: 2021
        },
        {
          date: '1 April',
          paid: '10 April',
          type: 'BSL Interpreter',
          person: 'Jane Smith',
          cost: '£100',
          status: 'Posted',
          year: 2021,
          yearpaid: 2021
        }
      ]
    }

    if (employer === 'traveltowork') {
      req.session.data['claimshistory'] = [
        /*{
          date: '1 November',
          paid: '18 November',
          type: 'Taxi',
          person: 'London Taxis',
          cost: '£150',
          status: 'Created',
          year: 2024,
          yearpaid: 2024
        },
        {
          date: '1 October',
          paid: '16 October',
          type: 'Taxi',
          person: 'London Taxis',
          cost: '£155',
          status: 'Approved',
          year: 2024,
          yearpaid: 2024
        },*/
        {
          date: '2 September',
          paid: '14 September',
          type: 'Taxi',
          person: 'London Taxis',
          cost: '£150',
          status: 'Created',
          year: 2024,
          yearpaid: 2024
        },
        {
          date: '1 August',
          paid: '16 August',
          type: 'Taxi',
          person: 'London Taxis',
          cost: '£150',
          status: 'Approved',
          year: 2024,
          yearpaid: 2024
        },
        {
          date: '1 July',
          paid: '2 August',
          type: 'Taxi',
          person: 'London Taxis',
          cost: '£150',
          status: 'Posted',
          year: 2024,
          yearpaid: 2024
        },
        {
          date: '1 June',
          paid: '28 June',
          type: 'Taxi',
          person: 'London Taxis',
          cost: '£150',
          status: 'Approved',
          year: 2024,
          yearpaid: 2024
        },
        {
          date: '1 May',
          paid: '28 May',
          type: 'Taxi',
          person: 'London Taxis',
          cost: '£150',
          status: 'Posted',
          year: 2024,
          yearpaid: 2024
        },
        {
          date: '1 April',
          paid: '21 April',
          type: 'Taxi',
          person: 'London Taxis',
          cost: '£150',
          status: 'RM Rejected',
          year: 2024,
          yearpaid: 2024
        },
        {
          date: '1 March',
          paid: '5 March',
          type: 'Taxi',
          person: 'London Taxis',
          cost: '£130',
          status: 'Posted',
          year: 2024,
          yearpaid: 2024
        },
        {
          date: '1 February',
          paid: '10 February',
          type: 'Taxi',
          person: 'London Taxis',
          cost: '£130',
          status: 'Not approved',
          year: 2024,
          yearpaid: 2024
        },
        {
          date: '1 January',
          paid: '10 January',
          type: 'Taxi',
          person: 'London Taxis',
          cost: '£130',
          status: 'Posted',
          year: 2024,
          yearpaid: 2024
        },
        {
          date: '1 December',
          paid: '11 December',
          type: 'Taxi',
          person: 'London Taxis',
          cost: '£80',
          status: 'Posted',
          year: 2023,
          yearpaid: 2023
        },
        {
          date: '1 November',
          paid: '10 November',
          type: 'Taxi',
          person: 'London Taxis',
          cost: '£130',
          status: 'Posted',
          year: 2023,
          yearpaid: 2023
        },
        {
          date: '1 October',
          paid: '25 October',
          type: 'Taxi',
          person: 'London Taxis',
          cost: '£130',
          status: 'Posted',
          year: 2023,
          yearpaid: 2023
        },
        {
          date: '1 September',
          paid: '21 September',
          type: 'Taxi',
          person: 'London Taxis',
          cost: '£130',
          status: 'Posted',
          year: 2023,
          yearpaid: 2023
        },
        {
          date: '1 August',
          paid: '27 August',
          type: 'Taxi',
          person: 'London Taxis',
          cost: '£130',
          status: 'Posted',
          year: 2023,
          yearpaid: 2023
        },
        {
          date: '1 July',
          paid: '10 August',
          type: 'Taxi',
          person: 'London Taxis',
          cost: '£120',
          status: 'Posted',
          year: 2023,
          yearpaid: 2023
        },
        {
          date: '1 June',
          paid: '11 August',
          type: 'Taxi',
          person: 'London Taxis',
          cost: '£130',
          status: 'Posted',
          year: 2023,
          yearpaid: 2023
        },
        {
          date: '1 May',
          paid: '2 August',
          type: 'Taxi',
          person: 'London Taxis',
          cost: '£120',
          status: 'Posted',
          year: 2023,
          yearpaid: 2023
        },
        {
          date: '1 April',
          paid: '1 July',
          type: 'Taxi',
          person: 'London Taxis',
          cost: '£130',
          status: 'Posted',
          year: 2023,
          yearpaid: 2023
        },
        {
          date: '1 March',
          paid: '1 June',
          type: 'Taxi',
          person: 'London Taxis',
          cost: '£130',
          status: 'Posted',
          year: 2023,
          yearpaid: 2023
        },
        {
          date: '3 February',
          paid: '1 March',
          type: 'Taxi',
          person: 'London Taxis',
          cost: '£130',
          status: 'Posted',
          year: 2023,
          yearpaid: 2023
        },
        {
          date: '12 January',
          paid: '1 February',
          type: 'Taxi',
          person: 'London Taxis',
          cost: '£130',
          status: 'Posted',
          year: 2023,
          yearpaid: 2023
        },
        {
          date: '1 December',
          paid: '8 December',
          type: 'Taxi',
          person: 'London Taxis',
          cost: '£85',
          status: 'Posted',
          year: 2022,
          yearpaid: 2022
        },
        {
          date: '1 November',
          paid: '19 November',
          type: 'Taxi',
          person: 'London Taxis',
          cost: '£130',
          status: 'Posted',
          year: 2022,
          yearpaid: 2022
        },
        {
          date: '1 October',
          paid: '11 October',
          type: 'Taxi',
          person: 'London Taxis',
          cost: '£130',
          status: 'Posted',
          year: 2022,
          yearpaid: 2022
        },
        {
          date: '1 September',
          paid: '7 September',
          type: 'Taxi',
          person: 'London Taxis',
          cost: '£130',
          status: 'Posted',
          year: 2022,
          yearpaid: 2022
        },
        {
          date: '1 August',
          paid: '12 August',
          type: 'Taxi',
          person: 'London Taxis',
          cost: '£130',
          status: 'Posted',
          year: 2022,
          yearpaid: 2022
        },
        {
          date: '1 July',
          paid: '12 July',
          type: 'Taxi',
          person: 'London Taxis',
          cost: '£100',
          status: 'Posted',
          year: 2022,
          yearpaid: 2022
        },
        {
          date: '1 June',
          paid: '12 June',
          type: 'Taxi',
          person: 'London Taxis',
          cost: '£100',
          status: 'Posted',
          year: 2022,
          yearpaid: 2022
        },
        {
          date: '1 May',
          paid: '12 May',
          type: 'Taxi',
          person: 'London Taxis',
          cost: '£100',
          status: 'Posted',
          year: 2022,
          yearpaid: 2022
        },
        {
          date: '1 April',
          paid: '14 April',
          type: 'Taxi',
          person: 'London Taxis',
          cost: '£100',
          status: 'Posted',
          year: 2022,
          yearpaid: 2022
        },
        {
          date: '1 March',
          paid: '12 March',
          type: 'Taxi',
          person: 'London Taxis',
          cost: '£100',
          status: 'Posted',
          year: 2022,
          yearpaid: 2022
        },
        {
          date: '1 February',
          paid: '23 February',
          type: 'Taxi',
          person: 'London Taxis',
          cost: '£100',
          status: 'Posted',
          year: 2022,
          yearpaid: 2022
        },
        {
          date: '3 January',
          paid: '15 January',
          type: 'Taxi',
          person: 'London Taxis',
          cost: '£100',
          status: 'Posted',
          year: 2022,
          yearpaid: 2022
        },
        {
          date: '1 December',
          paid: '12 December',
          type: 'Taxi',
          person: 'London Taxis',
          cost: '£65',
          status: 'Posted',
          year: 2021,
          yearpaid: 2021
        },
        {
          date: '1 November',
          paid: '12 November',
          type: 'Taxi',
          person: 'London Taxis',
          cost: '£100',
          status: 'Posted',
          year: 2021,
          yearpaid: 2021
        },
        {
          date: '1 October',
          paid: '12 October',
          type: 'Taxi',
          person: 'London Taxis',
          cost: '£100',
          status: 'Posted',
          year: 2021,
          yearpaid: 2021
        },
        {
          date: '1 September',
          paid: '11 September',
          type: 'Taxi',
          person: 'London Taxis',
          cost: '£100',
          status: 'Posted',
          year: 2021,
          yearpaid: 2021
        },
        {
          date: '1 August',
          paid: '12 August',
          type: 'Taxi',
          person: 'London Taxis',
          cost: '£100',
          status: 'Posted',
          year: 2021,
          yearpaid: 2021
        },
        {
          date: '1 July',
          paid: '11 July',
          type: 'Taxi',
          person: 'London Taxis',
          cost: '£100',
          status: 'Posted',
          year: 2021,
          yearpaid: 2021
        },
        {
          date: '1 June',
          paid: '11 June',
          type: 'Taxi',
          person: 'London Taxis',
          cost: '£100',
          status: 'Posted',
          year: 2021,
          yearpaid: 2021
        },
        {
          date: '1 May',
          paid: '11 May',
          type: 'Taxi',
          person: 'London Taxis',
          cost: '£100',
          status: 'Posted',
          year: 2021,
          yearpaid: 2021
        },
        {
          date: '1 April',
          paid: '17 April',
          type: 'Taxi',
          person: 'London Taxis',
          cost: '£100',
          status: 'Posted',
          year: 2021,
          yearpaid: 2021
        }
      ]
    }

    if (employer === 'specialaidsandequipment') {
      req.session.data['claimshistory'] = [
        {
          date: '1 November',
          paid: '15 November',
          type: 'Ergonomic keyboard, Ergonomic mouse, Mouse pad',
          person: 'EmployerCo',
          cost: '£60',
          year: 2023
        },
        {
          date: '20 October',
          paid: '1 November',
          type: 'Large monitor',
          person: 'EmployerCo',
          cost: '£30',
          year: 2023
        },
        {
          date: '19 January',
          paid: '23 January',
          type: 'Monitor',
          person: 'EmployerCo',
          cost: '£150',
          year: 2021
        }
      ]
    }
    if (employer === 'specialaidsandequipment') {
      res.redirect(`${versionPath}/payments/claims-history-2`)
    }
    else if (employer === 'traveltowork') {
      res.redirect(`${versionPath}/payments/claims-history-2`)
    }
    else if (employer === 'supportworker') {
      res.redirect(`${versionPath}/payments/claims-history-2`)
    }

  })
module.exports = router