//
// For guidance on how to create routes see:
// https://prototype-kit.service.gov.uk/docs/create-routes
//

const govukPrototypeKit = require('govuk-prototype-kit')
const router = govukPrototypeKit.requests.setupRouter()

// Add your routes here

router.post('/referral-type-answer', function(request, response) {

    var referralType = request.session.data['send-new-referral']
    if (referralType == "Workplace Assessment"){
        response.redirect("/atwis/v2/referrals/workplace-assessment/personal-details")
    } else {
        response.redirect("/atwis/v2/referrals/mental-health-service/personal-details")
    }
})

router.post('/referral-type-mhs-answer', function(request, response) {

    var referralType = request.session.data['referral-type']
    if (referralType == "Authority referral"){
        response.redirect("/atwis/v2/referrals/mental-health-service/provider-details-authority")
    } else {
        response.redirect("/atwis/v2/referrals/mental-health-service/provider-details-self-referral")
    }
})

router.post('/civil-servant-answer', function(request, response) {

    var civilServant = request.session.data['are-you-a-civil-servant']
    if (civilServant == "yes"){
        response.redirect("/apply/v1/eligibility/any-other-jobs")
    } else {
        response.redirect("/apply/v1/eligibility/eligible")
    }
})

router.post('/support-other-jobs-answer', function(request, response) {

    var otherJobs = request.session.data['support-for-other-jobs']
    if (otherJobs == "yes"){
        response.redirect("/apply/v1/eligibility/other-jobs")
    } else {
        response.redirect("/apply/v1/eligibility/civil-service-employment")
    }
})

router.post('/task-list', function (req, res) {
    req.session.data['answers-checked-condition-disabilities'] = req.body['answers-checked-condition-disabilities'];
    res.redirect('/task-list');
    });


    router.post('/mental-health-support-answer', function(req, res) {
        req.session.data['mental-health-support'] = req.body['mental-health-support']

        req.session.data['mental-health-support-answer'] = true

        res.redirect('/apply/v1/task-list')

    })

    router.post('/travel-in-work-answer', function(req, res) {
        req.session.data['travel-in-work'] = req.body['travel-in-work']

        req.session.data['travel-in-work-answer'] = true

        res.redirect('/apply/v1/task-list')

    })

    router.post('/workplace-changes-answer', function(req, res) {
        req.session.data['changes-to-work'] = req.body['changes-to-work']

        req.session.data['workplace-changes-answer'] = true

        res.redirect('/apply/v1/task-list')

    })

    router.post('/vehicle-changes-answer', function(req, res) {
        req.session.data['vehicle-changes'] = req.body['vehicle-changes']

        req.session.data['vehicle-changes-answer'] = true

        res.redirect('/apply/v1/task-list')

    })

    router.post('/who-we-contact-answer', function(request, response) {

        var contactPreference = request.session.data['who-we-contact']
        if (contactPreference == "Me"){
            response.redirect("/apply/v1/contact/telephone-number")
        } else {
            response.redirect("/apply/v1/contact/someone-else")
        }
    })

    router.post('/started-job-answer', function(request, response) {

        var jobStart = request.session.data['job-start']
        if (jobStart == "Yes"){
            response.redirect("/apply/v1/job/started-job/employment-status")
        } else {
            response.redirect("/apply/v1/job/starting-job/employment-status")
        }
    })

    router.post('/job-status-answer', function(request, response) {

        var jobStatus = request.session.data['job-status']
        if (jobStatus == "Employed"){
            response.redirect("/apply/v1/job/started-job/employed/company")
        } else if (jobStatus == "Self-employed"){
            response.redirect("/apply/v1/job/started-job/self-employed/job-title")
        } else if (jobStatus == "Registered director"){
            response.redirect("/apply/v1/job/started-job/registered-director/job-title")
        }
    })

    router.post('/job-status-answer-starting-job', function(request, response) {

        var jobStatus = request.session.data['job-status-starting-job']
        if (jobStatus == "Employed"){
            response.redirect("/apply/v1/job/starting-job/employed/company")
        } else if (jobStatus == "Self-employed"){
            response.redirect("/apply/v1/job/starting-job/self-employed/job-title")
        } else if (jobStatus == "Registered director"){
            response.redirect("/apply/v1/job/starting-job/registered-director/job-title")
        }
    })

    router.post('/hybrid-worker-answer', function(request, response) {

        var hybridWorker = request.session.data['job-start']
        if (hybridWorker == "Yes"){
            response.redirect("/apply/v1/job/started-job/employed/job-contact")
        } else {
            response.redirect("/apply/v1/job/started-job/employed/job-contact")
        }
    })

    router.post('/contact-permission-answer', function(request, response) {

        var contactPermission = request.session.data['contact-permission']
        if (contactPermission == "Yes"){
            response.redirect("/apply/v1/job/started-job/employed/check-answers-job")
        } else {
            response.redirect("/apply/v1/job/started-job/employed/check-answers-job")
        }
    })

    router.post('/another-job-answer', function(request, response) {

        var anotherJob = request.session.data['add-another-job']
        if (anotherJob == "Yes"){
            response.redirect("/apply/v1/job/employment")
        } else {
            response.redirect("/apply/v1/task-list")
        }
    })

    router.post('/remove-job-answer', function(request, response) {

        var removeJob = request.session.data['remove-job']
        if (removeJob == "Yes"){
            response.redirect("/apply/v1/job/employment")
        } else {
            response.redirect("/apply/v1/job/started-job/employed/another-job")
        }
    })

    router.post('/check-date', function (req, res) {
        const day = parseInt(req.body['self-employed-start-date-day'], 10)
        const month = parseInt(req.body['self-employed-start-date-month'], 10) - 1 // JavaScript months are 0-indexed
        const year = parseInt(req.body['self-employed-start-date-year'], 10)
       
        const enteredDate = new Date(year, month, day)
        const cutoffDate = new Date(2025, 3, 6) // 6 April 2025 (month 3 = April)
       
        if (enteredDate < cutoffDate) {
          res.redirect('/apply/v1/job/started-job/self-employed/tax-year-earnings')
        } else {
          res.redirect('/apply/v1/job/started-job/self-employed/business-plan')
        }
      })

      router.post('/check-date-registered-director', function (req, res) {
        const day = parseInt(req.body['registered-director-start-date-day'], 10)
        const month = parseInt(req.body['registered-director-start-date-month'], 10) - 1 // JavaScript months are 0-indexed
        const year = parseInt(req.body['registered-director-start-date-year'], 10)
       
        const enteredDate = new Date(year, month, day)
        const cutoffDate = new Date(2025, 3, 6) // 6 April 2025 (month 3 = April)
       
        if (enteredDate < cutoffDate) {
          res.redirect('/apply/v1/job/started-job/registered-director/tax-year-earnings')
        } else {
          res.redirect('/apply/v1/job/started-job/registered-director/business-plan')
        }
      })

      router.post('/have-utr-answer', function(request, response) {

        var haveUtr = request.session.data['have-utr']
        if (haveUtr == "Yes"){
            response.redirect("/apply/v1/job/started-job/self-employed/new-utr")
        } else {
            response.redirect("/apply/v1/job/started-job/self-employed/work-hours")
        }
    })

    router.post('/have-utr-answer-registered-director', function(request, response) {

        var haveUtr = request.session.data['have-utr-registered-director']
        if (haveUtr == "Yes"){
            response.redirect("/apply/v1/job/started-job/registered-director/new-utr")
        } else {
            response.redirect("/apply/v1/job/started-job/registered-director/work-hours")
        }
    })

    router.post('/another-job-answer-self-employed', function(request, response) {

        var anotherJob = request.session.data['add-another-job-self-employed']
        if (anotherJob == "Yes"){
            response.redirect("/apply/v1/job/employment")
        } else {
            response.redirect("/apply/v1/task-list")
        }
    })

    router.post('/another-job-answer-registered-director', function(request, response) {

        var anotherJob = request.session.data['add-another-job-registered-director']
        if (anotherJob == "Yes"){
            response.redirect("/apply/v1/job/employment")
        } else {
            response.redirect("/apply/v1/task-list")
        }
    })

    router.post('/remove-job-answer-self-employed', function(request, response) {

        var removeJob = request.session.data['remove-job-self-employed']
        if (removeJob == "Yes"){
            response.redirect("/apply/v1/job/employment")
        } else {
            response.redirect("/apply/v1/job/started-job/self-employed/another-job")
        }
    })

    router.post('/remove-job-answer-registered-director', function(request, response) {

        var removeJob = request.session.data['remove-job-registered-director']
        if (removeJob == "Yes"){
            response.redirect("/apply/v1/job/employment")
        } else {
            response.redirect("/apply/v1/job/started-job/registered-director/another-job")
        }
    })

    router.post('/search-type-answer', function(request, response) {

        var searchSelect = request.session.data['search-type']
        if (searchSelect == "Referrals"){
            response.redirect("/atwis/v2/referrals/referral-search")
        } else {
            response.redirect("#")
        }
    })


    router.post('/search-type-lead-answer', function(request, response) {

        var searchSelect = request.session.data['search-type-lead']
        if (searchSelect == "Referrals"){
            response.redirect("/atwis/v2/referrals/team-lead-referral-history/referral-search")
        } else {
            response.redirect("#")
        }
    })

    router.post('/atwis/v2/referrals/referral-search', function (req, res) {
        res.render('atwis/v2/referrals/referral-search', { data: req.body});
    });

    router.post('/atwis/v2/referrals/team-lead-referral-history/referral-search', function (req, res) {
        res.render('atwis/v2/referrals/team-lead-referral-history/referral-search', { data: req.body});
    });

    router.post('/days-will-work-answer', function(request, response) {

        var workingDays = request.session.data['days-will-work']
        if (workingDays == "Yes"){
            response.redirect("/apply/v1/job/starting-job/employed/work-days")
        } else {
            response.redirect("/apply/v1/job/starting-job/employed/job-address")
        }
    })

    router.post('/hybrid-worker-answer-starting-job', function(request, response) {

        var hybridWorker = request.session.data['hybrid-worker-starting-job']
        if (hybridWorker == "Yes"){
            response.redirect("/apply/v1/job/starting-job/employed/job-contact")
        } else {
            response.redirect("/apply/v1/job/starting-job/employed/job-contact")
        }
    })

    router.post('/contact-permission-answer-starting-job', function(request, response) {

        var contactPermission = request.session.data['contact-permission-starting-job']
        if (contactPermission == "Yes"){
            response.redirect("/apply/v1/job/starting-job/employed/check-answers-job")
        } else {
            response.redirect("/apply/v1/job/starting-job/employed/check-answers-job")
        }
    })

    router.post('/another-job-answer-starting-job', function(request, response) {

        var anotherJob = request.session.data['add-another-job-starting-job']
        if (anotherJob == "Yes"){
            response.redirect("/apply/v1/job/employment")
        } else {
            response.redirect("/apply/v1/task-list")
        }
    })

    router.post('/remove-job-answer-starting-job', function(request, response) {

        var removeJob = request.session.data['remove-job-starting-job']
        if (removeJob == "Yes"){
            response.redirect("/apply/v1/job/employment")
        } else {
            response.redirect("/apply/v1/job/starting-job/employed/another-job")
        }
    })

    router.post('/have-utr-answer-self-employed-starting-job', function(request, response) {

        var haveUtr = request.session.data['have-utr-self-employed-starting-job']
        if (haveUtr == "Yes"){
            response.redirect("/apply/v1/job/starting-job/self-employed/utr")
        } else {
            response.redirect("/apply/v1/job/starting-job/self-employed/start-date")
        }
    })

    router.post('/days-will-work-answer-self-employed-starting-job', function(request, response) {

        var workingDays = request.session.data['days-will-work-self-employed-starting-job']
        if (workingDays == "Yes"){
            response.redirect("/apply/v1/job/starting-job/self-employed/work-days")
        } else {
            response.redirect("/apply/v1/job/starting-job/self-employed/job-address")
        }
    })

    router.post('/another-job-answer-self-employed-starting-job', function(request, response) {

        var anotherJob = request.session.data['add-another-job-self-employed-starting-job']
        if (anotherJob == "Yes"){
            response.redirect("/apply/v1/job/employment")
        } else {
            response.redirect("/apply/v1/task-list")
        }
    })

    router.post('/remove-job-answer-self-employed-starting-job', function(request, response) {

        var removeJob = request.session.data['remove-job-self-employed-starting-job']
        if (removeJob == "Yes"){
            response.redirect("/apply/v1/job/employment")
        } else {
            response.redirect("/apply/v1/job/starting-job/self-employed/another-job")
        }
    })

    router.post('/have-utr-answer-registered-director-starting-job', function(request, response) {

        var haveUtr = request.session.data['have-utr-registered-director-starting-job']
        if (haveUtr == "Yes"){
            response.redirect("/apply/v1/job/starting-job/registered-director/utr")
        } else {
            response.redirect("/apply/v1/job/starting-job/registered-director/start-date")
        }
    })

    router.post('/days-will-work-answer-registered-director-starting-job', function(request, response) {

        var workingDays = request.session.data['days-will-work-registered-director-starting-job']
        if (workingDays == "Yes"){
            response.redirect("/apply/v1/job/starting-job/registered-director/work-days")
        } else {
            response.redirect("/apply/v1/job/starting-job/registered-director/job-address")
        }
    })

    router.post('/another-job-answer-registered-director-starting-job', function(request, response) {

        var anotherJob = request.session.data['add-another-job-registered-director-starting-job']
        if (anotherJob == "Yes"){
            response.redirect("/apply/v1/job/employment")
        } else {
            response.redirect("/apply/v1/task-list")
        }
    })

    router.post('/remove-job-answer-registered-director-starting-job', function(request, response) {

        var removeJob = request.session.data['remove-job-registered-director-starting-job']
        if (removeJob == "Yes"){
            response.redirect("/apply/v1/job/employment")
        } else {
            response.redirect("/apply/v1/job/starting-job/registered-director/another-job")
        }
    })

    router.get('/show-address-row', function (req, res) {
        req.session.data['showAddressRow'] = true
        res.redirect('apply/v1/job/starting-job/registered-director/check-answers-registered-director')
    })

    router.get('/show-address-row-self-employed', function (req, res) {
        req.session.data['showAddressRowSelfEmployed'] = true
        res.redirect('apply/v1/job/starting-job/self-employed/check-answers-self-employed')
    })

    router.get('/show-address-row-employed', function (req, res) {
        req.session.data['showAddressRowEmployed'] = true
        res.redirect('apply/v1/job/starting-job/employed/hybrid-worker')
    })

    router.get('/show-address-row-employed-started-work', function (req, res) {
        req.session.data['showAddressRowEmployedStartedWork'] = true
        res.redirect('apply/v1/job/started-job/employed/hybrid-worker')
    })

    router.get('/show-address-row-self-employed-started-work', function (req, res) {
        req.session.data['showAddressRowSelfEmployedStartedWork'] = true
        res.redirect('apply/v1/job/started-job/self-employed/check-answers-self-employed')
    })

    router.get('/show-address-row-registered-started-work', function (req, res) {
        req.session.data['showAddressRowRegisteredDirectorStartedWork'] = true
        res.redirect('apply/v1/job/started-job/registered-director/check-answers-registered-director')
    })

    router.post('/anything-else-answer', function(request, response) {

        var anythingElse = request.session.data['anything-else']
        if (anythingElse == "Yes"){
            response.redirect("/apply/v1/other-information/add-information")
        } else {
            response.redirect("/apply/v1/task-list")
        }
    })

    router.post('/need-specialist-equipment-answer', function(request, response) {

        var specialistEquipment = request.session.data['need-specialist-equipment']
        if (specialistEquipment == "Yes"){
            response.redirect("/apply/v1/specialist-equipment/know-specialist-equipment")
        } else {
            response.redirect("/apply/v1/task-list")
        }
    })

    router.post('/know-specialist-equipment-answer', function(request, response) {

        var specialistEquipment = request.session.data['know-specialist-equipment']
        if (specialistEquipment == "Yes"){
            response.redirect("/apply/v1/specialist-equipment/specialist-equipment-type")
        } else {
            response.redirect("/apply/v1/specialist-equipment/workplace-assessment")
        }
    })

    router.post('/remove-equipment-answer', function(request, response) {

        var removeEquipment = request.session.data['remove-equipment']
        if (removeEquipment == "Yes"){
            response.redirect("/apply/v1/specialist-equipment/need-specialist-equipment")
        } else {
            response.redirect("/apply/v1/specialist-equipment/specialist-equipment-summary")
        }
    })

    router.post('/other-equipment-answer', function(request, response) {

        var otherEquipment = request.session.data['another-item']
        if (otherEquipment == "Yes"){
            response.redirect("/apply/v1/specialist-equipment/other-specialist-equipment")
        } else {
            response.redirect("/apply/v1/specialist-equipment/specialist-equipment-help")
        }
    })

    router.post('/need-support-worker-answer', function(request, response) {

        var supportWorker = request.session.data['need-support-worker']
        if (supportWorker == "Yes"){
            response.redirect("/apply/v1/support-worker/know-support-worker")
        } else {
            response.redirect("/apply/v1/task-list")
        }
    })

    router.post('/know-support-worker-answer', function(request, response) {

        var supportWorker = request.session.data['know-support-worker']
        if (supportWorker == "Yes"){
            response.redirect("/apply/v1/support-worker/which-type-support-worker")
        } else {
            response.redirect("/apply/v1/support-worker/temporary-support")
        }
    })

    router.post('/which-type-support-worker-answer', function(request, response) {

        var supportWorkerType = request.session.data['which-type-support-worker']
        if (supportWorkerType == "British Sign Language (BSL) interpreter"){
            response.redirect("/apply/v1/support-worker/support-worker-help")
        } else {
            response.redirect("/apply/v1/support-worker/support-worker-type")
        }
    })

    router.post('/support-temporarily-support-worker-answer', function(request, response) {

        var supportWorker = request.session.data['support-temporarily']
        if (supportWorker == "Yes"){
            response.redirect("/apply/v1/support-worker/support-how-long")
        } else {
            response.redirect("/apply/v1/support-worker/support-worker-hours")
        }
    })

    router.post('/temporary-support-answer', function(request, response) {

        var temporarySupport = request.session.data['temporary-support']
        if (temporarySupport == "Yes, I need a support worker on a temporary basis"){
            response.redirect("/apply/v1/support-worker/check-answers-support-worker")
        } else {
            response.redirect("/apply/v1/support-worker/check-answers-support-worker")
        }
    })

    router.post('/another-support-worker-answer', function(request, response) {

        var anotherSupportWorker = request.session.data['add-another-support-worker']
        if (anotherSupportWorker == "Yes"){
            response.redirect("/apply/v1/support-worker/need-support-worker")
        } else {
            response.redirect("/apply/v1/task-list")
        }
    })

    router.post('/remove-support-worker-answer', function(request, response) {

        var removeSupportWorker = request.session.data['remove-support-worker']
        if (removeSupportWorker == "Yes"){
            response.redirect("/apply/v1/support-worker/need-support-worker")
        } else {
            response.redirect("/apply/v1/support-worker/another-support-worker")
        }
    })

    router.post('/referral-type-answer-duplicate-referral', function(request, response) {

        var referralType = request.session.data['send-new-referral-duplicate']
        if (referralType == "Workplace Assessment"){
            response.redirect("/atwis/v2/referrals/duplicate-referrals/workplace-assessment/personal-details")
        } else {
            response.redirect("/atwis/v2/referrals/duplicate-referrals/mental-health-service/personal-details")
        }
    })


    router.post('/send-new-referral-anyway', function(request, response) {

        var sendReferralAnyway = request.session.data['send-new-referral-anyway']
        if (sendReferralAnyway == "yes"){
            response.redirect("/atwis/v2/referrals/workplace-assessment/find-address")
        } else {
            response.redirect("/atwis/v2/referrals/duplicate-referrals/referrals")
        }
    })

    router.post('/send-new-referral-anyway-mhss', function(request, response) {

        var sendReferralAnyway = request.session.data['six-month-report']
        if (sendReferralAnyway == "yes"){
            response.redirect("/atwis/v2/referrals/duplicate-referrals/referrals")
        } else {
            response.redirect("/atwis/v2/referrals/mental-health-service/find-address")
        }
    })

    router.post('/send-new-referral-anyway-in-flight', function(request, response) {

        var sendReferralAnyway = request.session.data['send-new-referral-anyway-mhss-in-flight']
        if (sendReferralAnyway == "yes"){
            response.redirect("/atwis/v2/referrals/mental-health-service/find-address")
        } else {
            response.redirect("/atwis/v2/referrals/duplicate-referrals/referrals")
        }
    })

router.post('/add-job-started-employed', function (req, res) {
    const newJob = {
        type: 'employed',
        status: 'started',
        title: req.body['job-title'],
        description: req.body['job-description'],
        employer: req.body['company-name']
    };

    if (!req.session.data['jobs']) {
        req.session.data['jobs'] = [];
    }

    req.session.data['jobs'].push(newJob);

    res.redirect('apply/v1/job/started-job/employed/another-job');
});
        
router.post('/add-job-started-registered-director', function (req, res) {
    const newJob = {
        type: 'registered director',
        status: 'started',
        title: req.body['job-title-registered-director'],
        description: req.body['job-description-registered-director']
    };

    if (!req.session.data['jobs']) {
        req.session.data['jobs'] = [];
    }

    req.session.data['jobs'].push(newJob);

    res.redirect('apply/v1/job/started-job/registered-director/another-job');
});

router.post('/add-job-started-self-employed', function (req, res) {
    const newJob = {
        type: 'self employed',
        status: 'started',
        title: req.body['job-title-self-employed'],
        description: req.body['job-description-self-employed']
    };

    if (!req.session.data['jobs']) {
        req.session.data['jobs'] = [];
    }

    req.session.data['jobs'].push(newJob);

    res.redirect('apply/v1/job/started-job/self-employed/another-job');
});

router.post('/add-job-starting-job-employed', function (req, res) {
    const newJob = {
        type: 'employed',
        status: 'starting job',
        title: req.body['job-title-starting-job'],
        description: req.body['job-description-starting-job'],
        employer: req.body['company-name-starting-job']
    };

    if (!req.session.data['jobs']) {
        req.session.data['jobs'] = [];
    }

    req.session.data['jobs'].push(newJob);

    res.redirect('apply/v1/job/starting-job/employed/another-job');
});

router.post('/add-job-starting-job-registered-director', function (req, res) {
    const newJob = {
        type: 'registered director',
        status: 'starting job',
        title: req.body['job-title-registered-director-starting-job'],
        description: req.body['job-description-registered-director-starting-job']
    };

    if (!req.session.data['jobs']) {
        req.session.data['jobs'] = [];
    }

    req.session.data['jobs'].push(newJob);

    res.redirect('apply/v1/job/starting-job/registered-director/another-job');
});

router.post('/add-job-starting-job-self-employed', function (req, res) {
    const newJob = {
        type: 'self employed',
        status: 'starting job',
        title: req.body['job-title-self-employed-starting-job'],
        description: req.body['job-description-self-employed-starting-job']
    };

    if (!req.session.data['jobs']) {
        req.session.data['jobs'] = [];
    }

    req.session.data['jobs'].push(newJob);

    res.redirect('apply/v1/job/starting-job/self-employed/another-job');
});

router.post('/difficulty-driving-answer', function(request, response) {

    var difficultyDriving = request.session.data['difficulty-driving']
    if (difficultyDriving == "Yes"){
        response.redirect("/apply/v1/travel-to-work/how-you-travel")
    } else {
        response.redirect("/apply/v1/task-list")
    }
})

router.post('/travel-options', function (req, res) {
    const selections = req.body['travel-options'];
   
    // If no checkbox selected
    if (!selections) {
      return res.redirect('/apply/v1/travel-to-work/how-you-travel');
    }
   
    // If Option A is selected (can be a single string or an array)
    if (selections === 'Public transport' || (Array.isArray(selections) && selections.includes('Public transport'))) {
      return res.redirect('/apply/v1/travel-to-work/public-transport');
    }
   
    // If Option A is not selected
    return res.redirect('/apply/v1/travel-to-work/need-travel-support');
  });

  router.post('/public-transport-answer', function(request, response) {

    var publicTransport = request.session.data['public-transport']
    if (publicTransport == "Yes"){
        response.redirect("/apply/v1/travel-to-work/need-travel-support")
    } else {
        response.redirect("/apply/v1/travel-to-work/need-travel-support")
    }
})

router.post('/need-travel-support', function (req, res) {
    const jobs = req.session.data['jobs'] || [];
    const travelChoice = req.body['need-travel-support'];

    const multipleJobs = jobs.length > 1;
   
    if (multipleJobs) {
      // Multiple jobs
      if (travelChoice === 'Taxi') {
        res.redirect('/apply/v1/travel-to-work/multiple-jobs');
      } else {
        res.redirect('/apply/v1/travel-to-work/multiple-jobs');
      }
    } else {
      // Single job
      if (travelChoice === 'Taxi') {
        res.redirect('/apply/v1/travel-to-work/taxi-help');
      } else if (travelChoice === 'Lift in a car from a friend, colleague or family member') {
        res.redirect('/apply/v1/travel-to-work/lift-to-work-help');
      } else if (travelChoice === 'Something else') {
        res.redirect('/apply/v1/travel-to-work/other-transport-help');
      } else {
        res.redirect('/apply/v1/travel-to-work/how-many-journeys');
      }
    }
  });

  router.post('/multiple-jobs', function (req, res) {
    const travelChoice = req.session.data['need-travel-support'];
   
    // No need to use or store req.body['job-for-transport']
   
    // Redirect based on travel choice
    if (travelChoice === 'Taxi') {
      return res.redirect('/apply/v1/travel-to-work/taxi-help');
    } else if (travelChoice === 'Lift in a car from a friend, colleague or family member') {
      return res.redirect('/apply/v1/travel-to-work/lift-to-work-help');
    } else if (travelChoice === 'Something else') {
      return res.redirect('/apply/v1/travel-to-work/other-transport-help');
    } else {
      return res.redirect('/apply/v1/travel-to-work/how-many-journeys');
    }
  });

  router.post('/journey-addresses-answer', function(request, response) {

    var journeyAddresses = request.session.data['journey-addresses']
    if (journeyAddresses == "Yes"){
        response.redirect("/apply/v1/travel-to-work/check-answers-work-travel")
    } else {
        response.redirect("/apply/v1/travel-to-work/check-answers-work-travel")
    }
})

router.post('/investigation-status-answer', function(request, response) {

    var investigationStatus = request.session.data['investigation-status']
    if (investigationStatus == "yes"){
        response.redirect("/atwis/v3/data-retention/customer-record")
    } else {
        response.redirect("/atwis/v3/data-retention/customer-record")
    }
})

router.post('/investigation-status', function (req, res) {
    const choice = req.body['investigation-status'];
   
    req.session.data['investigation-status'] = choice;
   
    if (choice === 'Yes') {
      // ✅ clear the checkbox value
      delete req.session.data['why-pause-deletion'];
    }
   
  })