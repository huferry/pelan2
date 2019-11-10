
const flitsmeisterDataUrl = `https://tesla.flitsmeister.nl/teslaFeed.json`

const fetchData = async (url) => {
    const https = require('https')
    return new Promise((resolve, reject) => {
        https.get(url, response => {
            if (response.statusCode != 200) {
                reject(`Http error: ${response.statusCode}`)
                return
            }

            let content = ''
            response.on('data', part => content += part)
            response.on('end', () => {
                try {
                    const data = JSON.parse(content)
                    resolve(data)
                } catch(e) {
                    reject(e)
                }
            })
        })
    })
}

const matchProps = (feature, propsToMatch) => {
    if (!feature || !feature.properties) return false
    for(propName in propsToMatch) {
        if (propsToMatch[propName] && feature.properties[propName] !== propsToMatch[propName]) 
            return false
    }
    return true
}

const onlySpeedtraps = ({country, road, roadLetter, city}) => 
    feature => matchProps(feature, {
        type_description: 'speedtrap',
        country_code: country,
        road,
        location: city,
        road_letter: roadLetter
    })

/**
 * Get the speed traps data.
 * @param  { } options that can optionally contain these properties: road, roadLetter, city, country.
 *          If left null then all known speed traps will be returned.
 * @returns Array A list of speed traps.
 */
async function getSpeedTraps(options) {
    const data = await fetchData(flitsmeisterDataUrl)
    return data.features
            .filter(onlySpeedtraps(options))
            .map(f => {
                const item = f.properties
                item.geometry = f.geometry
                return item
            })
}

(async () => {
    const speedtraps = await getSpeedTraps({
        roadLetter: 'A'
    })
    console.log(speedtraps[0].geometry.coordinates)
    console.log(speedtraps, `\nTotal: ${speedtraps.length}`)
})()