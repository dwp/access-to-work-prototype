const govukPrototypeKit = require('govuk-prototype-kit')
const router = govukPrototypeKit.requests.setupRouter()

const versionPath = '/renew/v1'

router.all(versionPath + '/*', function(req, res, next){
    res.locals.versionPath = versionPath
    next()
})

router.post(versionPath + '/civil-servant-answer', function(req, res) {

    var civilServant = req.session.data['are-you-a-civil-servant']
    if (civilServant == "yes"){
        res.redirect(versionPath + "/renewing-other-jobs")
    } else {
        res.redirect(versionPath + "/full-name")
    }
})

router.post(versionPath + '/renewing-other-jobs-answer', function(req, res) {

    var civilServant = req.session.data['are-you-renewing-other-jobs']
    if (civilServant == "yes"){
        res.redirect(versionPath + "/other-jobs")
    } else {
        res.redirect(versionPath + "/grant-end-date")
    }
})

router.post(versionPath + '/grant-date-answer', function(req, res) {

    var civilServant = req.session.data['grant-date']
    if (civilServant == "yes"){
        res.redirect(versionPath + "/grant-end-before-april")
    } else {
        res.redirect(versionPath + "/civil-service-employment")
    }
})

//Do not delete this
module.exports = router