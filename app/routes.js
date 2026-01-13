//
// For guidance on how to create routes see:
// https://prototype-kit.service.gov.uk/docs/create-routes
//

const govukPrototypeKit = require('govuk-prototype-kit')
const router = govukPrototypeKit.requests.setupRouter()


router.use('/continuous-improvement/apply/v1', require('./views/continuous-improvement/apply/v1/_routes'))

// Add your routes here

router.post('/referral-type-answer', function(request, response) {

    var referralType = request.session.data['send-new-referral']
    if (referralType == "Workplace Assessment"){
        response.redirect("/atwis/v3/referrals/workplace-assessment/personal-details")
    } else {
        response.redirect("/atwis/v3/referrals/mental-health-service/personal-details")
    }
})

router.post('/referral-type-mhs-answer', function(request, response) {

    var referralType = request.session.data['referral-type']
    if (referralType == "Authority referral"){
        response.redirect("/atwis/v3/referrals/mental-health-service/provider-details-authority")
    } else {
        response.redirect("/atwis/v3/referrals/mental-health-service/provider-details-self-referral")
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
            response.redirect("/atwis/v3/referrals/referral-search")
        } else {
            response.redirect("/atwis/v3/search/find-a-case")
        }
    })


    router.post('/search-type-lead-answer', function(request, response) {

        var searchSelect = request.session.data['search-type-lead']
        if (searchSelect == "Referrals"){
            response.redirect("/atwis/v3/referrals/team-lead-referral-history/referral-search")
        } else {
            response.redirect("#")
        }
    })

    router.post('/atwis/v3/referrals/referral-search', function (req, res) {
        res.render('atwis/v3/referrals/referral-search', { data: req.body});
    });

    router.post('/atwis/v3/referrals/team-lead-referral-history/referral-search', function (req, res) {
        res.render('atwis/v3/referrals/team-lead-referral-history/referral-search', { data: req.body});
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
            response.redirect("/atwis/v3/referrals/duplicate-referrals/workplace-assessment/personal-details")
        } else {
            response.redirect("/atwis/v3/referrals/duplicate-referrals/mental-health-service/personal-details")
        }
    })


    router.post('/send-new-referral-anyway', function(request, response) {

        var sendReferralAnyway = request.session.data['send-new-referral-anyway']
        if (sendReferralAnyway == "yes"){
            response.redirect("/atwis/v3/referrals/workplace-assessment/find-address")
        } else {
            response.redirect("/atwis/v3/referrals/duplicate-referrals/referrals")
        }
    })

    router.post('/send-new-referral-anyway-mhss', function(request, response) {

        var sendReferralAnyway = request.session.data['six-month-report']
        if (sendReferralAnyway == "yes"){
            response.redirect("/atwis/v3/referrals/duplicate-referrals/referrals")
        } else {
            response.redirect("/atwis/v3/referrals/mental-health-service/find-address")
        }
    })

    router.post('/send-new-referral-anyway-in-flight', function(request, response) {

        var sendReferralAnyway = request.session.data['send-new-referral-anyway-mhss-in-flight']
        if (sendReferralAnyway == "yes"){
            response.redirect("/atwis/v3/referrals/mental-health-service/find-address")
        } else {
            response.redirect("/atwis/v3/referrals/duplicate-referrals/referrals")
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

  
router.post('/remove-home-number-answer-claim', function(request, response) {
  const removeHomeNumber = request.body['remove-home-number-claim'];

  // Save the user's answer to the session
  request.session.data['remove-home-number-claim'] = removeHomeNumber;

  // If they confirmed removal, clear the phone number
  if (removeHomeNumber === 'yes') {
    request.session.data['your-home-number-claim'] = null; // or delete it
  }

  // Redirect back to the summary page
  response.redirect("/claims/v2/personal-details/telephone-numbers");
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
  response.redirect("/claims/v2/personal-details/telephone-numbers");
})

router.post('/claims-summary', function(request, response) {

    var vehicleAdaptationsClaims = request.session.data['add-another-claim']
    if (vehicleAdaptationsClaims == "yes"){
        response.redirect("/claims/v2/start-claim/vehicle-adaptations/your-vehicle-adaptation")
    } else {
        response.redirect("/claims/v2/start-claim/vehicle-adaptations/adaptation-cost")
    }
})

router.post('/remove-vehicle-adaption-claim-answer', function(request, response) {

    var removeVehicleAdaptationsClaim = request.session.data['remove-vehicle-adaptation-claim']
    if (removeVehicleAdaptationsClaim == "yes"){
        response.redirect("/claims/v2/start-claim/vehicle-adaptations/claims-summary")
    } else {
        response.redirect("/claims/v2/start-claim/vehicle-adaptations/claims-summary")
    }
})

router.post('/add-another-invoice-answer', function(request, response) {

    var addAnotherInvoice = request.session.data['add-another-claim']
    if (addAnotherInvoice == "yes"){
        response.redirect("/claims/v2/start-claim/vehicle-adaptations/uploads")
    } else {
        response.redirect("/claims/v2/start-claim/vehicle-adaptations/who-to-pay")
    }
})

router.post('/claim-other-journeys-answer', function(request, response) {

    var addOtherMonth = request.session.data['claim-other-journeys']
    if (addOtherMonth == "yes"){
        response.redirect("/claims/v2/start-claim/travel-to-work/taxi/claim-month")
    } else {
        response.redirect("/claims/v2/start-claim/travel-to-work/taxi/total-cost")
    }
})

router.post('/add-another-invoice-taxi-answer', function(request, response) {

    var addAnotherInvoice = request.session.data['add-another-claim-taxi']
    if (addAnotherInvoice == "yes"){
        response.redirect("/claims/v2/start-claim/travel-to-work/taxi/uploads")
    } else {
        response.redirect("/claims/v2/start-claim/travel-to-work/taxi/uploads-summary")
    }
})

router.post('/claim-other-journeys-taxi-answer', function(request, response) {

    var addOtherMonth = request.session.data['claim-other-journeys-taxi']
    if (addOtherMonth == "yes"){
        response.redirect("/claims/v2/start-claim/travel-to-work/taxi/uploads")
    } else {
        response.redirect("/claims/v2/start-claim/travel-to-work/taxi/payee")
    }
})


router.post('/select-payee-taxi-answer', function(request, response) {

    var selectPayee = request.session.data['payee-select-taxi']
    if (selectPayee == "Kings Taxis"){
        response.redirect("/claims/v2/start-claim/travel-to-work/taxi/existing-account-details")
    } else {
        response.redirect("/claims/v2/start-claim/travel-to-work/taxi/who-to-pay")
    }
})

router.post('/employment-status-taxi-answer', function(request, response) {

    var employmentStatus = request.session.data['employment-status-taxi']
    if (employmentStatus == "Employed"){
        response.redirect("/claims/v2/start-claim/travel-to-work/taxi/workplace-contact")
    } else {
        response.redirect("/claims/v2/start-claim/travel-to-work/taxi/check-your-answers")
    }
})

router.post('/claim-type-answer', function(request, response) {

        var claimType = request.session.data['claim-type']
        if (claimType == "vehicle adaptation"){
            response.redirect("/claims/v2/start-claim/vehicle-adaptations/about-your-grant")
        } else if (claimType == "travel to work"){
            response.redirect("/claims/v2/start-claim/travel-to-work/about-your-grant")
        } else if (claimType == "specialist equipment"){
            response.redirect("/claims/v2/start-claim/specialist-equipment/about-your-grant")
        } else if (claimType == "support worker"){
            response.redirect("/claims/v2/start-claim/support-worker/about-your-grant")
        } else if (claimType == "travel during work"){
            response.redirect("/claims/v2/start-claim/travel-during-work/about-your-grant")
        } else if (claimType == "something else"){
            response.redirect("/claims/v2/start-claim/something-else/unable-to-claim")
        }
    })

    router.post('/journey-type-answer', function(request, response) {

    var journeyType = request.session.data['journey-type']
    if (journeyType == "taxi"){
        response.redirect("/claims/v2/start-claim/travel-to-work/taxi/claim-month")
    } else {
        response.redirect("/claims/v2/start-claim/travel-to-work/lift/claim-instructions")
    }
})

  router.post('/select-payee-details-answer', function(request, response) {

    var payeeDetails = request.session.data['select-payee-details']
    if (payeeDetails == "Lloyds bank"){
        response.redirect("/claims/v2/start-claim/travel-to-work/taxi/employment-status")
    } else {
        response.redirect("/claims/v2/start-claim/travel-to-work/taxi/who-to-pay")
    }
})

 router.post('/mileage-or-journey-answer', function(request, response) {

    var mileageOrJourney = request.session.data['mileage-or-journey']
    if (mileageOrJourney == "journeys"){
        response.redirect("/claims/v2/start-claim/travel-to-work/lift/claim-month")
    } else {
        response.redirect("/claims/v2/start-claim/travel-to-work/lift/claim-month-mileage")
    }
})

router.post('/claim-other-journeys-month-answer', function(request, response) {

    var addOtherMonthLift = request.session.data['claim-other-journeys-month']
    if (addOtherMonthLift == "yes"){
        response.redirect("/claims/v2/start-claim/travel-to-work/lift/claim-month")
    } else {
        response.redirect("/claims/v2/start-claim/travel-to-work/lift/total-journeys")
    }
})

router.post('/employment-status-lift-answer', function(request, response) {

    var employmentStatus = request.session.data['employment-status-lift']
    if (employmentStatus == "Employed"){
        response.redirect("/claims/v2/start-claim/travel-to-work/lift/workplace-contact")
    } else {
        response.redirect("/claims/v2/start-claim/travel-to-work/lift/check-your-answers")
    }
})

router.post('/claim-other-mileage-month-answer', function(request, response) {

    var addOtherMonthLift = request.session.data['claim-other-mileage-month']
    if (addOtherMonthLift == "yes"){
        response.redirect("/claims/v2/start-claim/travel-to-work/lift/claim-month-mileage")
    } else {
        response.redirect("/claims/v2/start-claim/travel-to-work/lift/total-mileage")
    }
})

router.post('/claims-summary-specialist-equipment', function(request, response) {

    var specialistEquipmentClaims = request.session.data['add-another-claim-specialist-equipment']
    if (specialistEquipmentClaims == "yes"){
        response.redirect("/claims/v2/start-claim/specialist-equipment/your-specialist-equipment")
    } else {
        response.redirect("/claims/v2/start-claim/specialist-equipment/specialist-equipment-cost")
    }
})

router.post('/upload-other-files-specialist-equipment-answer', function(request, response) {

    var addOtherFileUpload = request.session.data['upload-other-files-specialist-equipment']
    if (addOtherFileUpload == "yes"){
        response.redirect("/claims/v2/start-claim/specialist-equipment/uploads")
    } else {
        response.redirect("/claims/v2/start-claim/specialist-equipment/payee")
    }
})

router.post('/select-payee-specialist-equipment-answer', function(request, response) {

    var selectPayee = request.session.data['payee-select-specialist-equipment']
    if (selectPayee == "Kings Equipment"){
        response.redirect("/claims/v2/start-claim/specialist-equipment/existing-account-details")
    } else {
        response.redirect("/claims/v2/start-claim/specialist-equipment/who-to-pay")
    }
})

 router.post('/select-payee-details-specialist-equipment-answer', function(request, response) {

    var payeeDetails = request.session.data['select-payee-details-specialist-equipment']
    if (payeeDetails == "Lloyds bank"){
        response.redirect("/claims/v2/start-claim/specialist-equipment/check-your-answers")
    } else {
        response.redirect("/claims/v2/start-claim/specialist-equipment/check-your-answers")
    }
})

router.post('/support-worker-add-other-month-answer', function(request, response) {

    var addOtherMonth = request.session.data['add-other-month-support-worker']
    if (addOtherMonth == "yes"){
        response.redirect("/claims/v2/start-claim/support-worker/claim-month")
    } else {
        response.redirect("/claims/v2/start-claim/support-worker/total-cost")
    }
})

router.post('/add-another-invoice-support-worker-answer', function(request, response) {

    var addAnotherInvoice = request.session.data['add-another-invoice-support-worker']
    if (addAnotherInvoice == "yes"){
        response.redirect("/claims/v2/start-claim/support-worker/uploads")
    } else {
        response.redirect("/claims/v2/start-claim/support-worker/payee")
    }
})

router.post('/select-payee-support-worker-answer', function(request, response) {

    var selectPayee = request.session.data['payee-select-support-worker']
    if (selectPayee == "The Support Worker Network"){
        response.redirect("/claims/v2/start-claim/support-worker/existing-account-details")
    } else {
        response.redirect("/claims/v2/start-claim/support-worker/who-to-pay")
    }
})

router.post('/select-payee-details-support-worker-answer', function(request, response) {

    var payeeDetails = request.session.data['select-payee-details-support-worker']
    if (payeeDetails == "Lloyds bank"){
        response.redirect("/claims/v2/start-claim/support-worker/check-your-answers")
    } else {
        response.redirect("/claims/v2/start-claim/support-worker/payment-details")
    }
})

router.post('/employment-status-support-worker-answer', function(request, response) {

    var employmentStatus = request.session.data['employment-status-support-worker']
    if (employmentStatus == "Employed"){
        response.redirect("/claims/v2/start-claim/support-worker/workplace-contact")
    } else {
        response.redirect("/claims/v2/start-claim/support-worker/check-your-answers")
    }
})

router.post('/travel-during-work-add-other-month-answer', function(request, response) {

    var addOtherMonth = request.session.data['add-other-month-travel-during-work']
    if (addOtherMonth == "yes"){
        response.redirect("/claims/v2/start-claim/travel-during-work/claim-month")
    } else {
        response.redirect("/claims/v2/start-claim/travel-during-work/total-miles")
    }
})

router.post('/add-another-invoice-travel-during-work-answer', function(request, response) {

    var addAnotherInvoice = request.session.data['add-another-invoice-travel-during-work']
    if (addAnotherInvoice == "yes"){
        response.redirect("/claims/v2/start-claim/travel-during-work/uploads")
    } else {
        response.redirect("/claims/v2/start-claim/travel-during-work/payee")
    }
})

router.post('/select-payee-travel-during-work-answer', function(request, response) {

    var selectPayee = request.session.data['payee-select-travel-during-work']
    if (selectPayee == "A to B Travel Support"){
        response.redirect("/claims/v2/start-claim/travel-during-work/existing-account-details")
    } else {
        response.redirect("/claims/v2/start-claim/travel-during-work/who-to-pay")
    }
})

router.post('/select-payee-details-travel-during-work-answer', function(request, response) {

    var payeeDetails = request.session.data['select-payee-details-travel-during-work']
    if (payeeDetails == "Lloyds bank"){
        response.redirect("/claims/v2/start-claim/travel-during-work/check-your-answers")
    } else {
        response.redirect("/claims/v2/start-claim/travel-during-work/payment-details")
    }
})

router.post('/employment-status-travel-during-work-answer', function(request, response) {

    var employmentStatus = request.session.data['employment-status-travel-during-work']
    if (employmentStatus == "Employed"){
        response.redirect("/claims/v2/start-claim/travel-during-work/workplace-contact")
    } else {
        response.redirect("/claims/v2/start-claim/travel-during-work/check-your-answers")
    }
})

router.post('/sent-rejection-letter-answer', function(request, response) {

    var sentLetter = request.session.data['sent-letter']
    if (sentLetter == "yes"){
        response.redirect("/atwis/v3/csi/reject-case/case-rejected-confirmation")
    } else {
        response.redirect("/atwis/v3/csi/user-case")
    }
})

router.post('/find-applicant-answer', function(request, response) {

    var findApplicant = request.session.data['found-applicant']
    if (findApplicant == "yes"){
        response.redirect("/atwis/v3/csi/add-ni-number/add-ni-number")
    } else {
        response.redirect("/atwis/v3/csi/contact-applicant/how-to-contact-applicant")
    }
})

router.post('/how-to-contact-applicant-answer', function(request, response) {

    var contactApplicant = request.session.data['how-to-contact-applicant']
    if (contactApplicant == "email"){
        response.redirect("/atwis/v3/csi/contact-applicant/email/email-applicant")
    } else {
        response.redirect("/atwis/v3/csi/contact-applicant/telephone/telephone-applicant")
    }
})

router.post('/sent-email-answer', function(request, response) {

    var sentEmail = request.session.data['sent-email']
    if (sentEmail == "yes"){
        response.redirect("/atwis/v3/csi/contact-applicant/email/email-sent")
    } else {
        response.redirect("/atwis/v3/csi/user-case")
    }
})

router.post('/applicant-answer-phone-answer', function(request, response) {

    var phoneAnswer = request.session.data['applicant-answer-phone']
    if (phoneAnswer == "yes"){
        response.redirect("/atwis/v3/csi/contact-applicant/telephone/telephone-call-made")
    } else {
        response.redirect("/atwis/v3/csi/user-case")
    }
})

router.post('/add-ni-number-answer', function(request, response) {

    var addNiNumber = request.session.data['ni-number-found']
    if (addNiNumber == "yes"){
        response.redirect("/atwis/v3/csi/appointee/have-appointee")
    } else {
        response.redirect("/atwis/v3/csi/appointee/have-appointee")
    }
})

router.post('/have-appointee-answer', function(request, response) {

    var haveAppointee = request.session.data['have-appointee']
    if (haveAppointee == "yes"){
        response.redirect("/atwis/v3/csi/appointee/appointee-details")
    } else {
        response.redirect("/atwis/v3/csi/check-details/check-personal-details")
    }
})

router.post('/how-to-contact-applicant-check-details-answer', function(request, response) {

    var contactApplicant = request.session.data['how-to-contact-applicant-check-details']
    if (contactApplicant == "email"){
        response.redirect("/atwis/v3/csi/contact-applicant-check-details/email/email-applicant")
    } else {
        response.redirect("/atwis/v3/csi/contact-applicant-check-details/telephone/telephone-applicant")
    }
})

router.post('/applicant-answer-phone-check-details-answer', function(request, response) {

    var phoneAnswer = request.session.data['applicant-answer-phone-check-details']
    if (phoneAnswer == "no"){
        response.redirect("/atwis/v3/csi/contact-applicant-check-details/telephone/telephone-call-made")
    } else {
        response.redirect("/atwis/v3/csi/user-case")
    }
})

router.post('/sent-email-check-details-answer', function(request, response) {

    var sentEmail = request.session.data['sent-email-check-details']
    if (sentEmail == "yes"){
        response.redirect("/atwis/v3/csi/contact-applicant-check-details/email/email-sent")
    } else {
        response.redirect("/atwis/v3/csi/user-case")
    }
})


router.post('/check-personal-details', function (req, res) {
  // Just go to next page
  res.redirect('/atwis/v3/csi/check-details/check-company-details');
});

router.post('/check-company-details', function (req, res) {
  // Just go to next page
  res.redirect('/atwis/v3/csi/check-details/check-interview-details');
});

router.post('/check-company-details', function (req, res) {
  // Just go to next page
  res.redirect('/check-interview-details');
});


router.post('/check-interview-details', function (req, res) {
  const q1 = req.session.data['do-details-match'];
  const q2 = req.session.data['are-details-complete'];
  const q3 = req.session.data['are-details-complete-interview-details'];

  if (q1 === 'no' || q2 === 'no' || q3 === 'no') {
    res.redirect('/atwis/v3/csi/contact-applicant-check-details/how-to-contact-applicant');
  } else {
    res.redirect('/atwis/v3/csi/send-confirmation-email/send-confirmation-email');
  }
});

router.post('/have-you-sent-the-email-confirmation-answer', function(request, response) {

    var sentEmail = request.session.data['have-you-sent-the-email-confirmation']
    if (sentEmail == "yes"){
        response.redirect("/atwis/v3/csi/print-send-claim-form/print-send-claim-form")
    } else {
        response.redirect("/atwis/v3/csi/print-send-claim-form/print-send-claim-form")
    }
})

router.post('/have-you-printed-and-sent-the-claim-form-answer', function(request, response) {

    var claimForm = request.session.data['have-you-printed-and-sent-the-claim-form']
    if (claimForm == "yes"){
        response.redirect("/atwis/v3/csi/confirm-with-employer/confirm-with-employer")
    } else {
        response.redirect("/atwis/v3/csi/confirm-with-employer/confirm-with-employer")
    }
})

router.post('/confirmation-method-with-employer-answer', function(request, response) {

        var claimType = request.session.data['confirmation-method-with-employer']
        if (claimType == "email"){
            response.redirect("/atwis/v3/csi/confirm-with-employer/email/email-employer")
        } else if (claimType == "telephone"){
            response.redirect("/atwis/v3/csi/confirm-with-employer/telephone/telephone-employer")
        } else if (claimType == "record a response"){
            response.redirect("/atwis/v3/csi/confirm-with-employer/record-response/did-interview-happen")
        }
    })

    router.post('/sent-email-employer-check-answer', function(request, response) {

    var sentEmail = request.session.data['sent-email-employer-check']
    if (sentEmail == "yes"){
        response.redirect("/atwis/v3/csi/confirm-with-employer/email/email-sent")
    } else {
        response.redirect("/atwis/v3/csi/confirm-with-employer/record-response/did-interview-happen")
    }
})

router.post('/is-employer-available-answer', function(request, response) {

    var employerAvailability = request.session.data['is-employer-available']
    if (employerAvailability == "yes"){
        response.redirect("/atwis/v3/csi/confirm-with-employer/telephone/telephone-call-made")
    } else {
        response.redirect("/atwis/v3/csi/confirm-with-employer/record-response/did-interview-happen")
    }
})

router.post('/did-interview-happen-answer', function(request, response) {

    var didInterviewHappen = request.session.data['did-interview-happen']
    if (didInterviewHappen == "yes"){
        response.redirect("/atwis/v3/csi/tasks-completed")
    } else {
        response.redirect("/atwis/v3/csi/more-information/need-to-contact-applicant")
    }
})

router.post('/need-to-contact-applicant-more-info-answer', function(request, response) {

    var contactApplicant = request.session.data['need-to-contact-applicant-more-info']
    if (contactApplicant == "yes"){
        response.redirect("/atwis/v3/csi/more-information/how-to-contact-applicant")
    } else {
        response.redirect("/atwis/v3/csi/more-information/support-worker-cancellation-fee")
    }
})

router.post('/how-to-contact-applicant-more-info-answer', function(request, response) {

    var contactApplicant = request.session.data['how-to-contact-applicant-more-info']
    if (contactApplicant == "email"){
        response.redirect("/atwis/v3/csi/more-information/email/email-applicant")
    } else {
        response.redirect("/atwis/v3/csi/more-information/telephone/telephone-applicant")
    }
})

    router.post('/sent-email-more-info-answer', function(request, response) {

    var sentEmail = request.session.data['sent-email-more-info']
    if (sentEmail == "yes"){
        response.redirect("/atwis/v3/csi/more-information/email/email-sent")
    } else {
        response.redirect("/atwis/v3/csi/user-case")
    }
})

router.post('/applicant-answer-phone-more-info-answer', function(request, response) {

    var phoneAnswer = request.session.data['applicant-answer-phone-more-info']
    if (phoneAnswer == "no"){
        response.redirect("/atwis/v3/csi/more-information/telephone/telephone-call-made")
    } else {
        response.redirect("/atwis/v3/csi/user-case")
    }
})

router.post('/support-worker-cancellation-fee-answer', function(request, response) {

    var supportWorkerCancellationFee = request.session.data['support-worker-cancellation-fee']
    if (supportWorkerCancellationFee == "yes"){
        response.redirect("/atwis/v3/csi/more-information/cancellation-fee")
    } else {
        response.redirect("/atwis/v3/csi/more-information/reject-the-case")
    }
})

router.post('/reject-the-case-more-info-answer', function(request, response) {

    var rejectCase = request.session.data['reject-the-case-more-info']
    if (rejectCase == "yes"){
        response.redirect("/atwis/v3/csi/reject-case/reject-case")
    } else {
        response.redirect("/atwis/v3/csi/user-case")
    }
})


router.post('/copied-information-answer', function(request, response) {

    var copiedInformation = request.session.data['copied-information']
    if (copiedInformation == "yes"){
        response.redirect("/atwis/v3/other-cases/new-application/enter-urn#application-details")
    } else {
        response.redirect("/atwis/v3/other-cases/new-application/user-case#application-details")
    }
})

router.post('/copied-information-priority-answer', function(request, response) {

    var copiedInformation = request.session.data['copied-information-priority']
    if (copiedInformation == "yes"){
        response.redirect("/atwis/v3/priority-cases/enter-urn#application-details")
    } else {
        response.redirect("/atwis/v3/priority-cases/user-case#application-details")
    }
})

router.post('/end-date-answer', function(request, response) {

    var endDate = request.session.data['relevant-end-date']
    if (endDate == "yes"){
        response.redirect("/atwis/v3/documents/what-is-the-end-date")
    } else {
        response.redirect("/atwis/v3/documents/cant-change-status")
    }
})

router.post('/evidence-included-answer', function(request, response) {

    var evidenceIncluded = request.session.data['evidence-included']
    if (evidenceIncluded == "yes"){
        response.redirect("/atwis/v3/search/csi/invoice/add-invoice-details")
    } else {
        response.redirect("/atwis/v3/search/csi/check-evidence/request-missing-evidence")
    }
})

router.post('/sent-evidence-back-answer', function(request, response) {

    var sentEvidenceBack = request.session.data['sent-evidence-back']
    if (sentEvidenceBack == "yes"){
        response.redirect("/atwis/v3/search/csi/check-evidence/evidence-sent")
    } else {
        response.redirect("/atwis/v3/search/csi/user-case")
    }
})

router.post('/check-invoice-answer', function(request, response) {

    var checkInvoice = request.session.data['check-invoice']
    if (checkInvoice == "yes"){
        response.redirect("/atwis/v3/search/csi/sop-check/find-payee-on-sop")
    } else {
        response.redirect("/atwis/v3/search/csi/invoice/confirm-the-amount")
    }
})

router.post('/is-payee-on-sop-answer', function(request, response) {

    var payeeOnSop = request.session.data['is-payee-on-sop']
    if (payeeOnSop == "yes"){
        response.redirect("/atwis/v3/search/csi/sop-check/check-payee-details")
    } else {
        response.redirect("/atwis/v3/search/csi/sop-check/check-bank-details")
    }
})

router.post('/bank-details-valid-answer', function(request, response) {

    var bankDetails = request.session.data['bank-details-valid']
    if (bankDetails == "yes"){
        response.redirect("/atwis/v3/search/csi/sop-check/request-sop-change")
    } else {
        response.redirect("/atwis/v3/search/csi/sop-check/request-bank-details")
    }
})

router.post('/sent-evidence-back-sop-check-answer', function(request, response) {

    var sentEvidenceBack = request.session.data['sent-evidence-back']
    if (sentEvidenceBack == "yes"){
        response.redirect("/atwis/v3/search/csi/sop-check/evidence-sent")
    } else {
        response.redirect("/atwis/v3/search/csi/user-case")
    }
})

router.post('/has-form-been-sent-answer', function(request, response) {

    var sentForm = request.session.data['has-form-been-sent']
    if (sentForm == "yes"){
        response.redirect("/atwis/v3/search/csi/sop-check/sop7-form-sent")
    } else {
        response.redirect("/atwis/v3/search/csi/user-case")
    }
})

router.post('/do-payee-details-match-answer', function(request, response) {

    var detailsMatch = request.session.data['do-payee-details-match']
    if (detailsMatch == "yes"){
        response.redirect("/atwis/v3/search/csi/sop-check/add-sop-supplier-number")
    } else {
        response.redirect("/atwis/v3/search/csi/sop-check/request-sop-change")
    }
})

router.post('/approve-payment-answer', function(request, response) {

    var approvePayment = request.session.data['approve-payment']
    if (approvePayment == "yes"){
        response.redirect("/atwis/v3/search/csi/sop-check/payment-approved")
    } else {
        response.redirect("/atwis/v3/search/csi/user-case")
    }
})

router.post('/is-cost-reasonable-answer', function(request, response) {

    var reasonableCost = request.session.data['is-cost-reasonable']
    if (reasonableCost == "yes"){
        response.redirect("/atwis/v3/search/csi/case-manager-handover/allocate-case-to-payment-officer")
    } else {
        response.redirect("/atwis/v3/search/csi/case-manager-handover/need-to-contact-applicant")
    }
})

router.post('/need-to-contact-applicant-answer', function(request, response) {

    var contactApplicant = request.session.data['need-to-contact-applicant']
    if (contactApplicant == "yes"){
        response.redirect("/atwis/v3/search/csi/case-manager-handover/how-to-contact-applicant")
    } else {
        response.redirect("/atwis/v3/search/csi/case-manager-handover/agreed-support-cost")
    }
})

router.post('/how-to-contact-applicant-case-manager-handover-answer', function(request, response) {

    var howToContactApplicant = request.session.data['how-to-contact-applicant']
    if (howToContactApplicant == "email"){
        response.redirect("/atwis/v3/search/csi/case-manager-handover/email-applicant")
    } else {
        response.redirect("/atwis/v3/search/csi/case-manager-handover/telephone-applicant")
    }
})

router.post('/email-the-applicant-case-manager-handover-answer', function(request, response) {

    var emailApplicant = request.session.data['email-applicant']
    if (emailApplicant == "yes"){
        response.redirect("/atwis/v3/search/csi/case-manager-handover/email-sent")
    } else {
        response.redirect("/atwis/v3/search/csi/case-manager-handover/user-case")
    }
})

router.post('/telephone-the-applicant-case-manager-handover-answer', function(request, response) {

    var telephoneApplicant = request.session.data['telephone-applicant']
    if (telephoneApplicant == "yes"){
        response.redirect("/atwis/v3/search/csi/case-manager-handover/agreed-support-cost")
    } else {
        response.redirect("/atwis/v3/search/csi/case-manager-handover/telephone-call-made")
    }
})

router.post('/claim-grant-summary-support-type-answer', function(request, response) {

        var grantSummarySupportType = request.session.data['grant-summary-support-type']
        if (grantSummarySupportType == "vehicle adaptation"){
            response.redirect("/claims/v2/grant-summary/vehicle-adaptation-grant-summary")
        } else if (grantSummarySupportType == "travel to work"){
            response.redirect("/claims/v2/grant-summary/travel-to-work-grant-summary")
        } else if (grantSummarySupportType == "specialist equipment"){
            response.redirect("/claims/v2/grant-summary/specialist-equipment-grant-summary")
        } else if (grantSummarySupportType == "support worker"){
            response.redirect("/claims/v2/grant-summary/support-worker-grant-summary")
        } else if (grantSummarySupportType == "travel during work"){
            response.redirect("/claims/v2/grant-summary/multiple-jobs/select-role")
        } else if (grantSummarySupportType == "something else"){
            response.redirect("/claims/v2/grant-summary/something-else")
        }
    })

    router.post('/claim-select-role-answer', function(request, response) {

        var selectRole = request.session.data['select-role']
        if (selectRole == "job 1"){
            response.redirect("/claims/v2/grant-summary/multiple-jobs/job-1-grant-summary")
        } else if (selectRole == "job 2"){
            response.redirect("/claims/v2/grant-summary/multiple-jobs/job-2-grant-summary")
        } else if (selectRole == "different job"){
            response.redirect("/claims/v2/grant-summary/something-else")
        }
    })
