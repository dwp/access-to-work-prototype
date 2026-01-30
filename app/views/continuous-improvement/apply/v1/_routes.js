const govukPrototypeKit = require('govuk-prototype-kit')
const router = govukPrototypeKit.requests.setupRouter()

const versionPath = '/continuous-improvement/apply/v1'

router.all(versionPath + '/*', function(req, res, next){
    res.locals.versionPath = versionPath
    next()
})



// ============================================================================
// TASK CONFIGURATION
// ============================================================================
// To add a new task:
// 1. Create your question pages and check answers page
// 2. Update the task-list.html to include the new task
// 3. Add a new entry to this TASKS array below
// ============================================================================

const TASKS = [
  {
    key: 'your-details',
    secondQuestionRoute: versionPath + '/your-details/national-insurance-number',
    checkAnswersRoute: versionPath + '/your-details/check-answers-post'
  },
  {
    key: 'contact',
    secondQuestionRoute: versionPath + '/who-we-contact-answer',
    checkAnswersRoute: versionPath + '/contact/check-answers-post'
  },
  {
    key: 'conditions-disabilities',
    secondQuestionRoute: versionPath + '/conditions-disabilities/affect-you-at-work',
    checkAnswersRoute: versionPath + '/conditions-disabilities/check-answers-post'
  },
  {
    key: 'job',
    secondQuestionRoute: versionPath + '/started-job-answer',
    checkAnswersRoute: versionPath + '/job/started-job/employed/another-job'
  },
  {
    key: 'workplace-adjustments',
    secondQuestionRoute: versionPath + '/workplace-adjustments/employer-1-post',
    checkAnswersRoute: versionPath + '/workplace-adjustments/check-answers-post',
    dependsOn: ['job']
  },
  {
    key: 'specialist-equipment',
    secondQuestionRoute: versionPath + '/need-specialist-equipment-answer',
    checkAnswersRoute: versionPath + '/specialist-equipment/check-answers-post',
    dependsOn: ['your-details', 'contact', 'conditions-disabilities', 'job', 'workplace-adjustments']
  },
  {
    key: 'mental-health',
    checkAnswersRoute: versionPath + '/mental-health-support-answer',
    dependsOn: ['your-details', 'contact', 'conditions-disabilities', 'job', 'workplace-adjustments']
  },
  {
    key: 'travel-to-work',
    secondQuestionRoute: versionPath + '/difficulty-driving-answer',
    checkAnswersRoute: versionPath + '/travel-to-work/check-answers-post',
    dependsOn: ['your-details', 'contact', 'conditions-disabilities', 'job', 'workplace-adjustments']
  },
  {
    key: 'travel-in-work',
    checkAnswersRoute: versionPath + '/travel-in-work/check-answers-post',
    dependsOn: ['your-details', 'contact', 'conditions-disabilities', 'job', 'workplace-adjustments']
  },
  {
    key: 'workplace-changes',
    checkAnswersRoute: versionPath + '/workplace-changes-answer',
    dependsOn: ['your-details', 'contact', 'conditions-disabilities', 'job', 'workplace-adjustments']
  },
  {
    key: 'vehicle-changes',
    checkAnswersRoute: versionPath + '/vehicle-changes-answer',
    dependsOn: ['your-details', 'contact', 'conditions-disabilities', 'job', 'workplace-adjustments']
  },
  {
    key: 'support-worker',
    secondQuestionRoute: versionPath + '/need-support-worker-answer',
    checkAnswersRoute: versionPath + '/support-worker/check-answers-post',
    dependsOn: ['your-details', 'contact', 'conditions-disabilities', 'job', 'workplace-adjustments']
  },
  {
    key: 'other-information',
    secondQuestionRoute: versionPath + '/anything-else-answer',
    checkAnswersRoute: versionPath + '/other-information/check-answers',
    dependsOn: ['your-details', 'contact', 'conditions-disabilities', 'job', 'workplace-adjustments']
  }
  


]

// ============================================================================
// TASK MANAGEMENT FUNCTIONS
// ============================================================================

// Function to get task status
function getTaskStatus(req, taskKey) {
  const session = req.session.data || {}

  // Find the task configuration
  const task = TASKS.find(t => t.key === taskKey)

  // Check if task has dependencies that aren't met yet
  if (task && task.dependsOn) {
    // Handle both single dependency (string) and multiple dependencies (array)
    const dependencies = Array.isArray(task.dependsOn) ? task.dependsOn : [task.dependsOn]
    const allDependenciesMet = dependencies.every(dep =>
      session.completedTasks && session.completedTasks.includes(dep)
    )
    if (!allDependenciesMet) {
      return 'cannot-start-yet'
    }
  }

  // Check if task is completed
  if (session.completedTasks && session.completedTasks.includes(taskKey)) {
    return 'completed'
  }

  // Check if task is in progress (has any data saved)
  if (session[taskKey + '_started']) {
    return 'in-progress'
  }

  return 'not-started'
}

// Function to mark task as started
function markTaskAsStarted(req, taskKey) {
  req.session.data = req.session.data || {}
  req.session.data[taskKey + '_started'] = true
}

// Function to mark task as completed
function markTaskAsCompleted(req, taskKey) {
  req.session.data = req.session.data || {}
  req.session.data.completedTasks = req.session.data.completedTasks || []

  if (!req.session.data.completedTasks.includes(taskKey)) {
    req.session.data.completedTasks.push(taskKey)
  }
}

// Function to mark task as in progress (removes from completed, keeps as started)
function markTaskAsInProgress(req, taskKey) {
  req.session.data = req.session.data || {}
  req.session.data.completedTasks = req.session.data.completedTasks || []

  // Remove from completed tasks if present
  const index = req.session.data.completedTasks.indexOf(taskKey)
  if (index > -1) {
    req.session.data.completedTasks.splice(index, 1)
  }

  // Ensure task is marked as started
  req.session.data[taskKey + '_started'] = true
}

// Function to get all task statuses
function getAllTaskStatuses(req) {
  const statuses = {}
  TASKS.forEach(task => {
    statuses[task.key] = getTaskStatus(req, task.key)
  })
  return statuses
}

// Function to count completed tasks
function countCompletedTasks(req) {
  const statuses = getAllTaskStatuses(req)
  return Object.values(statuses).filter(status => status === 'completed').length
}

// ============================================================================
// ROUTES
// ============================================================================

// Task list page - inject task statuses
router.get(versionPath + '/task-list', function (req, res) {
  const taskStatuses = getAllTaskStatuses(req)
  const completedCount = countCompletedTasks(req)

  res.render(versionPath + '/task-list', {
    taskStatuses: taskStatuses,
    completedCount: completedCount,
    totalTasks: TASKS.length
  })
})

// Automatically generate routes for all tasks
TASKS.forEach(task => {
  // POST route from first question to second question - marks task as started
  if(task.secondQuestionRoute){
    router.post(task.secondQuestionRoute, function (req, res, next) {
      console.log("task: " + task.key)
      markTaskAsStarted(req, task.key)
      next()
    })
}

  // POST route for check answers - marks task as completed
  router.post(task.checkAnswersRoute, function (req, res, next) {
    markTaskAsCompleted(req, task.key)
    res.redirect(versionPath + '/task-list')
  })
})



router.post(versionPath + '/workplace-adjustments/employer-1-post', function(req, res, next){
    let choice = req.session.data['employer-1-adjustments-discussed'];

    if(choice == "No"){
        res.redirect(versionPath + "/workplace-adjustments/occupational-health")
    } else {
        res.redirect(versionPath + "/workplace-adjustments/adjustments-made")
    }
})


router.post(versionPath + '/workplace-adjustments/adjustments-made-post', function(req, res, next){
    let choice = req.session.data['adjustments-made'];

    if(choice == "No"){
        res.redirect(versionPath + "/workplace-adjustments/occupational-health")
    } else {
        res.redirect(versionPath + "/workplace-adjustments/adjustments-made-details")
    }
})

router.post(versionPath + '/workplace-adjustments/oha-done-choice-post', function(req, res, next){
    let choice = req.session.data['oha-done-choice'];

    if(choice == "No"){
        res.redirect(versionPath + "/workplace-adjustments/check-answers")
    } else {
        res.redirect(versionPath + "/workplace-adjustments/oha-upload-choice")
    }
})

router.post(versionPath + '/workplace-adjustments/oha-upload-choice-post', function(req, res, next){
    let choice = req.session.data['oha-upload-choice'];

    if(choice == "No"){
        res.redirect(versionPath + "/workplace-adjustments/check-answers")
    } else {
        res.redirect(versionPath + "/workplace-adjustments/oha-upload")
    }
})

router.post(versionPath + '/civil-servant-answer', function(req, res) {

    var civilServant = req.session.data['are-you-a-civil-servant']
    if (civilServant == "yes"){
        res.redirect(versionPath + "/eligibility/any-other-jobs")
    } else {
        res.redirect(versionPath + "/eligibility/eligible")
    }
})

router.post(versionPath + '/support-other-jobs-answer', function(req, res) {

    var otherJobs = req.session.data['support-for-other-jobs']
    if (otherJobs == "yes"){
        res.redirect(versionPath + "/eligibility/other-jobs")
    } else {
        res.redirect(versionPath + "/eligibility/civil-service-employment")
    }
})



    router.post(versionPath + '/who-we-contact-answer', function(req, res) {

        var contactPreference = req.session.data['who-we-contact']
        if (contactPreference == "Me"){
            res.redirect(versionPath + "/contact/telephone-number")
        } else {
            res.redirect(versionPath + "/contact/someone-else")
        }
    })

    router.post(versionPath + '/started-job-answer', function(req, res) {

        var jobStart = req.session.data['job-start']
        if (jobStart == "Yes"){
            res.redirect(versionPath + "/job/started-job/employment-status")
        } else {
            res.redirect(versionPath + "/job/starting-job/employment-status")
        }
    })

    router.post(versionPath + '/job-status-answer', function(req, res) {

        var jobStatus = req.session.data['job-status']
        if (jobStatus == "Employed"){
            res.redirect(versionPath + "/job/started-job/employed/company")
        } else if (jobStatus == "Self-employed"){
            res.redirect(versionPath + "/job/started-job/self-employed/job-title")
        } else if (jobStatus == "Registered director"){
            res.redirect(versionPath + "/job/started-job/registered-director/job-title")
        }
    })

    router.post(versionPath + '/job-status-answer-starting-job', function(req, res) {

        var jobStatus = req.session.data['job-status-starting-job']
        if (jobStatus == "Employed"){
            res.redirect(versionPath + "/job/starting-job/employed/company")
        } else if (jobStatus == "Self-employed"){
            res.redirect(versionPath + "/job/starting-job/self-employed/job-title")
        } else if (jobStatus == "Registered director"){
            res.redirect(versionPath + "/job/starting-job/registered-director/job-title")
        }
    })

    router.post(versionPath + '/hybrid-worker-answer', function(req, res) {

        var hybridWorker = req.session.data['job-start']
        if (hybridWorker == "Yes"){
            res.redirect(versionPath + "/job/started-job/employed/job-contact")
        } else {
            res.redirect(versionPath + "/job/started-job/employed/job-contact")
        }
    })

    router.post(versionPath + '/contact-permission-answer', function(req, res) {

        var contactPermission = req.session.data['contact-permission']
        if (contactPermission == "Yes"){
            res.redirect(versionPath + "/job/started-job/employed/check-answers-job")
        } else {
            res.redirect(versionPath + "/job/started-job/employed/check-answers-job")
        }
    })

    router.post(versionPath + '/another-job-answer', function(req, res) {

        var anotherJob = req.session.data['add-another-job']
        if (anotherJob == "Yes"){
            res.redirect(versionPath + "/job/employment")
        } else {
            markTaskAsCompleted(req, 'job');
            res.redirect(versionPath + "/task-list")
        }
    })

    router.post(versionPath + '/remove-job-answer', function(req, res) {

        var removeJob = req.session.data['remove-job']
        if (removeJob == "Yes"){
            res.redirect(versionPath + "/job/employment")
        } else {
            res.redirect(versionPath + "/job/started-job/employed/another-job")
        }
    })

    router.post(versionPath + '/check-date', function (req, res) {
        const day = parseInt(req.body['self-employed-start-date-day'], 10)
        const month = parseInt(req.body['self-employed-start-date-month'], 10) - 1 // JavaScript months are 0-indexed
        const year = parseInt(req.body['self-employed-start-date-year'], 10)
       
        const enteredDate = new Date(year, month, day)
        const cutoffDate = new Date(2025, 3, 6) // 6 April 2025 (month 3 = April)
       
        if (enteredDate < cutoffDate) {
          res.redirect(versionPath + '/job/started-job/self-employed/tax-year-earnings')
        } else {
          res.redirect(versionPath + '/job/started-job/self-employed/business-plan')
        }
      })

      router.post(versionPath + '/check-date-registered-director', function (req, res) {
        const day = parseInt(req.body['registered-director-start-date-day'], 10)
        const month = parseInt(req.body['registered-director-start-date-month'], 10) - 1 // JavaScript months are 0-indexed
        const year = parseInt(req.body['registered-director-start-date-year'], 10)
       
        const enteredDate = new Date(year, month, day)
        const cutoffDate = new Date(2025, 3, 6) // 6 April 2025 (month 3 = April)
       
        if (enteredDate < cutoffDate) {
          res.redirect(versionPath + '/job/started-job/registered-director/tax-year-earnings')
        } else {
          res.redirect(versionPath + '/job/started-job/registered-director/business-plan')
        }
      })

      router.post(versionPath + '/have-utr-answer', function(req, res) {

        var haveUtr = req.session.data['have-utr']
        if (haveUtr == "Yes"){
            res.redirect(versionPath + "/job/started-job/self-employed/new-utr")
        } else {
            res.redirect(versionPath + "/job/started-job/self-employed/work-hours")
        }
    })

    router.post(versionPath + '/have-utr-answer-registered-director', function(req, res) {

        var haveUtr = req.session.data['have-utr-registered-director']
        if (haveUtr == "Yes"){
            res.redirect(versionPath + "/job/started-job/registered-director/new-utr")
        } else {
            res.redirect(versionPath + "/job/started-job/registered-director/work-hours")
        }
    })

    router.post(versionPath + '/another-job-answer-self-employed', function(req, res) {

        var anotherJob = req.session.data['add-another-job-self-employed']
        if (anotherJob == "Yes"){
            res.redirect(versionPath + "/job/employment")
        } else {
            markTaskAsCompleted(req, 'job');
            res.redirect(versionPath + "/task-list")
        }
    })

    router.post(versionPath + '/another-job-answer-registered-director', function(req, res) {

        var anotherJob = req.session.data['add-another-job-registered-director']
        if (anotherJob == "Yes"){
            res.redirect(versionPath + "/job/employment")
        } else {
            markTaskAsCompleted(req, 'job');
            res.redirect(versionPath + "/task-list")
        }
    })

    router.post(versionPath + '/remove-job-answer-self-employed', function(req, res) {

        var removeJob = req.session.data['remove-job-self-employed']
        if (removeJob == "Yes"){
            res.redirect(versionPath + "/job/employment")
        } else {
            res.redirect(versionPath + "/job/started-job/self-employed/another-job")
        }
    })

    router.post(versionPath + '/remove-job-answer-registered-director', function(req, res) {

        var removeJob = req.session.data['remove-job-registered-director']
        if (removeJob == "Yes"){
            res.redirect(versionPath + "/job/employment")
        } else {
            res.redirect(versionPath + "/job/started-job/registered-director/another-job")
        }
    })





    router.post(versionPath + '/days-will-work-answer', function(req, res) {

        var workingDays = req.session.data['days-will-work']
        if (workingDays == "Yes"){
            res.redirect(versionPath + "/job/starting-job/employed/work-days")
        } else {
            res.redirect(versionPath + "/job/starting-job/employed/job-address")
        }
    })

    router.post(versionPath + '/hybrid-worker-answer-starting-job', function(req, res) {

        var hybridWorker = req.session.data['hybrid-worker-starting-job']
        if (hybridWorker == "Yes"){
            res.redirect(versionPath + "/job/starting-job/employed/job-contact")
        } else {
            res.redirect(versionPath + "/job/starting-job/employed/job-contact")
        }
    })

    router.post(versionPath + '/contact-permission-answer-starting-job', function(req, res) {

        var contactPermission = req.session.data['contact-permission-starting-job']
        if (contactPermission == "Yes"){
            res.redirect(versionPath + "/job/starting-job/employed/check-answers-job")
        } else {
            res.redirect(versionPath + "/job/starting-job/employed/check-answers-job")
        }
    })

    router.post(versionPath + '/another-job-answer-starting-job', function(req, res) {

        var anotherJob = req.session.data['add-another-job-starting-job']
        if (anotherJob == "Yes"){
            res.redirect(versionPath + "/job/employment")
        } else {
            markTaskAsCompleted(req, 'job');
            res.redirect(versionPath + "/task-list")
        }
    })

    router.post(versionPath + '/remove-job-answer-starting-job', function(req, res) {

        var removeJob = req.session.data['remove-job-starting-job']
        if (removeJob == "Yes"){
            res.redirect(versionPath + "/job/employment")
        } else {
            res.redirect(versionPath + "/job/starting-job/employed/another-job")
        }
    })

    router.post(versionPath + '/have-utr-answer-self-employed-starting-job', function(req, res) {

        var haveUtr = req.session.data['have-utr-self-employed-starting-job']
        if (haveUtr == "Yes"){
            res.redirect(versionPath + "/job/starting-job/self-employed/utr")
        } else {
            res.redirect(versionPath + "/job/starting-job/self-employed/start-date")
        }
    })

    router.post(versionPath + '/days-will-work-answer-self-employed-starting-job', function(req, res) {

        var workingDays = req.session.data['days-will-work-self-employed-starting-job']
        if (workingDays == "Yes"){
            res.redirect(versionPath + "/job/starting-job/self-employed/work-days")
        } else {
            res.redirect(versionPath + "/job/starting-job/self-employed/job-address")
        }
    })

    router.post(versionPath + '/another-job-answer-self-employed-starting-job', function(req, res) {

        var anotherJob = req.session.data['add-another-job-self-employed-starting-job']
        if (anotherJob == "Yes"){
            res.redirect(versionPath + "/job/employment")
        } else {
            markTaskAsCompleted(req, 'job');
            res.redirect(versionPath + "/task-list")
        }
    })

    router.post(versionPath + '/remove-job-answer-self-employed-starting-job', function(req, res) {

        var removeJob = req.session.data['remove-job-self-employed-starting-job']
        if (removeJob == "Yes"){
            res.redirect(versionPath + "/job/employment")
        } else {
            res.redirect(versionPath + "/job/starting-job/self-employed/another-job")
        }
    })

    router.post(versionPath + '/have-utr-answer-registered-director-starting-job', function(req, res) {

        var haveUtr = req.session.data['have-utr-registered-director-starting-job']
        if (haveUtr == "Yes"){
            res.redirect(versionPath + "/job/starting-job/registered-director/utr")
        } else {
            res.redirect(versionPath + "/job/starting-job/registered-director/start-date")
        }
    })

    router.post(versionPath + '/days-will-work-answer-registered-director-starting-job', function(req, res) {

        var workingDays = req.session.data['days-will-work-registered-director-starting-job']
        if (workingDays == "Yes"){
            res.redirect(versionPath + "/job/starting-job/registered-director/work-days")
        } else {
            res.redirect(versionPath + "/job/starting-job/registered-director/job-address")
        }
    })

    router.post(versionPath + '/another-job-answer-registered-director-starting-job', function(req, res) {

        var anotherJob = req.session.data['add-another-job-registered-director-starting-job']
        if (anotherJob == "Yes"){
            res.redirect(versionPath + "/job/employment")
        } else {
            markTaskAsCompleted(req, 'job');
            res.redirect(versionPath + "/task-list")
        }
    })

    router.post(versionPath + '/remove-job-answer-registered-director-starting-job', function(req, res) {

        var removeJob = req.session.data['remove-job-registered-director-starting-job']
        if (removeJob == "Yes"){
            res.redirect(versionPath + "/job/employment")
        } else {
            res.redirect(versionPath + "/job/starting-job/registered-director/another-job")
        }
    })

    router.get('/show-address-row', function (req, res) {
        req.session.data['showAddressRow'] = true
        res.redirect(versionPath + '/job/starting-job/registered-director/check-answers-registered-director')
    })

    router.get('/show-address-row-self-employed', function (req, res) {
        req.session.data['showAddressRowSelfEmployed'] = true
        res.redirect(versionPath + '/job/starting-job/self-employed/check-answers-self-employed')
    })

    router.get('/show-address-row-employed', function (req, res) {
        req.session.data['showAddressRowEmployed'] = true
        res.redirect(versionPath + '/job/starting-job/employed/hybrid-worker')
    })

    router.get('/show-address-row-employed-started-work', function (req, res) {
        req.session.data['showAddressRowEmployedStartedWork'] = true
        res.redirect(versionPath + '/job/started-job/employed/hybrid-worker')
    })

    router.get('/show-address-row-self-employed-started-work', function (req, res) {
        req.session.data['showAddressRowSelfEmployedStartedWork'] = true
        res.redirect(versionPath + '/job/started-job/self-employed/check-answers-self-employed')
    })

    router.get('/show-address-row-registered-started-work', function (req, res) {
        req.session.data['showAddressRowRegisteredDirectorStartedWork'] = true
        res.redirect(versionPath + '/job/started-job/registered-director/check-answers-registered-director')
    })

    router.post(versionPath + '/anything-else-answer', function(req, res) {

        var anythingElse = req.session.data['anything-else']
        if (anythingElse == "Yes"){
            markTaskAsInProgress(req, 'other-information')
            res.redirect(versionPath + "/other-information/add-information")
        } else {
            markTaskAsCompleted(req, 'other-information')
            res.redirect(versionPath + "/task-list")
        }
    })

    router.post(versionPath + '/need-specialist-equipment-answer', function(req, res) {

        var specialistEquipment = req.session.data['need-specialist-equipment']
        if (specialistEquipment == "Yes"){
            res.redirect(versionPath + "/specialist-equipment/know-specialist-equipment")
        } else {
            markTaskAsCompleted(req, 'specialist-equipment');
            res.redirect(versionPath + "/task-list")
        }
    })

    router.post(versionPath + '/know-specialist-equipment-answer', function(req, res) {

        var specialistEquipment = req.session.data['know-specialist-equipment']
        if (specialistEquipment == "Yes"){
            res.redirect(versionPath + "/specialist-equipment/specialist-equipment-type")
        } else {
            res.redirect(versionPath + "/specialist-equipment/workplace-assessment")
        }
    })

    router.post(versionPath + '/remove-equipment-answer', function(req, res) {

        var removeEquipment = req.session.data['remove-equipment']
        if (removeEquipment == "Yes"){
            res.redirect(versionPath + "/specialist-equipment/need-specialist-equipment")
        } else {
            res.redirect(versionPath + "/specialist-equipment/specialist-equipment-summary")
        }
    })

    router.post(versionPath + '/other-equipment-answer', function(req, res) {

        var otherEquipment = req.session.data['another-item']
        if (otherEquipment == "Yes"){
            res.redirect(versionPath + "/specialist-equipment/other-specialist-equipment")
        } else {
            res.redirect(versionPath + "/specialist-equipment/specialist-equipment-help")
        }
    })

    router.post(versionPath + '/need-support-worker-answer', function(req, res) {

        var supportWorker = req.session.data['need-support-worker']
        if (supportWorker == "Yes"){
            markTaskAsInProgress(req, 'support-worker')
            res.redirect(versionPath + "/support-worker/know-support-worker")
        } else {
            markTaskAsCompleted(req, 'support-worker')
            res.redirect(versionPath + "/task-list")
        }
    })

    router.post(versionPath + '/know-support-worker-answer', function(req, res) {

        var supportWorker = req.session.data['know-support-worker']
        if (supportWorker == "Yes"){
            res.redirect(versionPath + "/support-worker/which-type-support-worker")
        } else {
            res.redirect(versionPath + "/support-worker/temporary-support")
        }
    })

    router.post(versionPath + '/which-type-support-worker-answer', function(req, res) {

        var supportWorkerType = req.session.data['which-type-support-worker']
        if (supportWorkerType == "British Sign Language (BSL) interpreter"){
            res.redirect(versionPath + "/support-worker/support-worker-help")
        } else {
            res.redirect(versionPath + "/support-worker/support-worker-type")
        }
    })

    router.post(versionPath + '/support-temporarily-support-worker-answer', function(req, res) {

        var supportWorker = req.session.data['support-temporarily']
        if (supportWorker == "Yes"){
            res.redirect(versionPath + "/support-worker/support-how-long")
        } else {
            res.redirect(versionPath + "/support-worker/support-worker-hours")
        }
    })

    router.post(versionPath + '/temporary-support-answer', function(req, res) {

        var temporarySupport = req.session.data['temporary-support']
        if (temporarySupport == "Yes, I need a support worker on a temporary basis"){
            res.redirect(versionPath + "/support-worker/check-answers-support-worker")
        } else {
            res.redirect(versionPath + "/support-worker/check-answers-support-worker")
        }
    })

    router.post(versionPath + '/another-support-worker-answer', function(req, res) {

        var anotherSupportWorker = req.session.data['add-another-support-worker']
        if (anotherSupportWorker == "Yes"){
            res.redirect(versionPath + "/support-worker/need-support-worker")
        } else {
            markTaskAsCompleted(req, 'support-worker')
            res.redirect(versionPath + "/task-list")
        }
    })

    router.post(versionPath + '/remove-support-worker-answer', function(req, res) {

        var removeSupportWorker = req.session.data['remove-support-worker']
        if (removeSupportWorker == "Yes"){
            res.redirect(versionPath + "/support-worker/need-support-worker")
        } else {
            res.redirect(versionPath + "/support-worker/another-support-worker")
        }
    })



router.post(versionPath + '/add-job-started-employed', function (req, res) {
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

    res.redirect(versionPath + '/job/started-job/employed/another-job');
});
        
router.post(versionPath + '/add-job-started-registered-director', function (req, res) {
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

    res.redirect(versionPath + '/job/started-job/registered-director/another-job');
});

router.post(versionPath + '/add-job-started-self-employed', function (req, res) {
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

    res.redirect(versionPath + '/job/started-job/self-employed/another-job');
});

router.post(versionPath + '/add-job-starting-job-employed', function (req, res) {
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

    res.redirect(versionPath + '/job/starting-job/employed/another-job');
});

router.post(versionPath + '/add-job-starting-job-registered-director', function (req, res) {
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

    res.redirect(versionPath + '/job/starting-job/registered-director/another-job');
});

router.post(versionPath + '/add-job-starting-job-self-employed', function (req, res) {
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

    res.redirect(versionPath + '/job/starting-job/self-employed/another-job');
});

router.post(versionPath + '/difficulty-driving-answer', function(req, res) {

    var difficultyDriving = req.session.data['difficulty-driving']
    if (difficultyDriving == "Yes"){
        markTaskAsInProgress(req, 'travel-to-work');
        res.redirect(versionPath + "/travel-to-work/how-you-travel")
    } else {
        markTaskAsCompleted(req, 'travel-to-work');
        res.redirect(versionPath + "/task-list")
    }
})

router.post(versionPath + '/travel-options', function (req, res) {
    const selections = req.body['travel-options'];
   
    // If no checkbox selected
    if (!selections) {
      return res.redirect(versionPath + '/travel-to-work/how-you-travel');
    }
   
    // If Option A is selected (can be a single string or an array)
    if (selections === 'Public transport' || (Array.isArray(selections) && selections.includes('Public transport'))) {
      return res.redirect(versionPath + '/travel-to-work/public-transport');
    }
   
    // If Option A is not selected
    return res.redirect(versionPath + '/travel-to-work/need-travel-support');
  });

  router.post(versionPath + '/public-transport-answer', function(req, res) {

    var publicTransport = req.session.data['public-transport']
    if (publicTransport == "Yes"){
        res.redirect(versionPath + "/travel-to-work/need-travel-support")
    } else {
        res.redirect(versionPath + "/travel-to-work/need-travel-support")
    }
})

router.post(versionPath + '/need-travel-support', function (req, res) {
    const jobs = req.session.data['jobs'] || [];
    const travelChoice = req.body['need-travel-support'];

    const multipleJobs = jobs.length > 1;
   
    if (multipleJobs) {
      // Multiple jobs
      if (travelChoice === 'Taxi') {
        res.redirect(versionPath + '/travel-to-work/multiple-jobs');
      } else {
        res.redirect(versionPath + '/travel-to-work/multiple-jobs');
      }
    } else {
      // Single job
      if (travelChoice === 'Taxi') {
        res.redirect(versionPath + '/travel-to-work/taxi-help');
      } else if (travelChoice === 'Lift in a car from a friend, colleague or family member') {
        res.redirect(versionPath + '/travel-to-work/lift-to-work-help');
      } else if (travelChoice === 'Something else') {
        res.redirect(versionPath + '/travel-to-work/other-transport-help');
      } else {
        res.redirect(versionPath + '/travel-to-work/how-many-journeys');
      }
    }
  });

  router.post(versionPath + '/multiple-jobs', function (req, res) {
    const travelChoice = req.session.data['need-travel-support'];
   
    // No need to use or store req.body['job-for-transport']
   
    // Redirect based on travel choice
    if (travelChoice === 'Taxi') {
      return res.redirect(versionPath + '/travel-to-work/taxi-help');
    } else if (travelChoice === 'Lift in a car from a friend, colleague or family member') {
      return res.redirect(versionPath + '/travel-to-work/lift-to-work-help');
    } else if (travelChoice === 'Something else') {
      return res.redirect(versionPath + '/travel-to-work/other-transport-help');
    } else {
      return res.redirect(versionPath + '/travel-to-work/how-many-journeys');
    }
  });

  router.post(versionPath + '/journey-addresses-answer', function(req, res) {

    var journeyAddresses = req.session.data['journey-addresses']
    if (journeyAddresses == "Yes"){
        res.redirect(versionPath + "/travel-to-work/check-answers-work-travel")
    } else {
        res.redirect(versionPath + "/travel-to-work/check-answers-work-travel")
    }
})

//Do not delete this
module.exports = router