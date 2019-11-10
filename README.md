# Pelan2

## Quick Start

The module is exporting the function `getSpeedTraps` which take an `option` object to filter out the result set. 

Example:
```javascript
const pelan2 = require('pelan2');

(async () => {

    // getting all the speed traps information
    // on A-roads in the Netherlands
    const speedTraps = await pelan2.getSpeedTraps({
        country: 'nl',
        roadLetter: 'A'
    })

    console.log(speedTraps)

    /* result can be such as:
    [
        {
            direction: 'Eindhoven - Venlo',
            road: 'A67',
            road_letter: 'A',
            location: 'Venlo',
            country_code: 'nl',
            type_description: 'speedtrap',
            updates: 7,
            geometry: { type: 'Point', coordinates: [Array] }
        }
    ]
    */
})
```

## Options
The `option` argument is an object that can contain these properties to filter out the result:

* `country`: country code in small letters. Only works with `nl` and `be`.
* `road`: the name of the road, is case sensitive and has to be exact.
* `roadLetter`: highway's road letter.
* `city`: the city name (case sensitive).