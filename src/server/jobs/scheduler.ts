import Schedule from 'node-schedule';
import { trendingCountries } from './trendingCountries';
import { getTopVaccinatingCountries } from './topVaccinatingCountries';
import mcache from 'memory-cache';

// run the job every day 1pm
let rule = new Schedule.RecurrenceRule();
rule.hour = 6;
rule.minute = 0;
rule.second = 0;

export const initJobs = () => {
  Schedule.scheduleJob(rule, async () => {
    console.log('Job Executed: ' + new Date());

    console.log('Updating Trending Countries');
    let results = await trendingCountries(false);

    console.log('Updating Vaccination Data');
    let vaccineResults = await getTopVaccinatingCountries();

    console.log('Clearing Cache to freshen up data');
    mcache.clear();
  });
};
