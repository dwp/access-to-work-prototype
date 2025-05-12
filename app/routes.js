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
        response.redirect("/v1/workplace-assessment/personal-details")
    } else {
        response.redirect("/v1/mental-health-service/personal-details")
    }
})

router.post('/referral-type-mhs-answer', function(request, response) {

    var referralType = request.session.data['referral-type']
    if (referralType == "Authority referral"){
        response.redirect("/v1/mental-health-service/provider-details-authority")
    } else {
        response.redirect("/v1/mental-health-service/provider-details-self-referral")
    }
})

