//
// For guidance on how to create filters see:
// https://prototype-kit.service.gov.uk/docs/filters
//

const govukPrototypeKit = require('govuk-prototype-kit')
const addFilter = govukPrototypeKit.views.addFilter
const moment = require('moment')
// Add your filters here

addFilter('formatDate', function(dateString){

	return moment(dateString).format("D MMMM YYYY")
})




addFilter('uniqueTypes', function (arr) {
  if (!Array.isArray(arr)) return arr;

  const seen = new Set();

  return arr.filter(item => {
    if (!item || !item.type) return false;

    if (seen.has(item.type)) {
      return false;
    }

    seen.add(item.type);
    return true;
  });
});

