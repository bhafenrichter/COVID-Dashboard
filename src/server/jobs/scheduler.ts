import Schedule from 'node-schedule';
import { trendingCountries } from './trendingCountries';
import { getTopVaccinatingCountries } from './topVaccinatingCountries';

// run the job every day 1pm
let rule = new Schedule.RecurrenceRule();
rule.hour = 13;

export const initJobs = () => {
  Schedule.scheduleJob(rule, async () => {
    console.log('Job Executed: ' + new Date());

    console.log('Updating Trending Countries');
    let results = await trendingCountries(false);

    console.log('Updating Vaccination Data');
    let vaccineResults = await getTopVaccinatingCountries();
  });
};
