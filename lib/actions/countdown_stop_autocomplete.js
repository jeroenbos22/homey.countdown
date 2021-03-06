// Fetch Homey
const Homey = require('homey');

// Fetch timers
const {Timers} = require('../timers');

// Create => register => export the FlowCardAction 'countdown_stop_autocomplete'
const actionCountdownStopAutocomplete = new Homey.FlowCardAction('countdown_stop_autocomplete')
    .register()
    .registerRunListener((args) => {

        // Build timerName
        let timerName = args.name;
        
        // Homey seems to pass args as an object (sometimes?)
        if (typeof timerName === 'object') {
            timerName = timerName.name;
        }

        // Validate name
        if (!Timers.validateName(timerName)) {
            return Promise.reject(new Error('Invalid name, only use a-z and 0-9'));
        }

        if (Timers.setTime(timerName, 0)) {
            return Promise.resolve(true);
        }

        return Promise.reject(new Error(`Failed to stop timer ${timerName}`));
    });



const actionCountdownStopAutocompleteArg = actionCountdownStopAutocomplete.getArgument('name');
actionCountdownStopAutocompleteArg.registerAutocompleteListener(Timers.autocomplete);

module.exports = actionCountdownStopAutocomplete;
