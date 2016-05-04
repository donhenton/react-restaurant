export function initialize(restaurants)
{
    return {
        'type': 'INITIALIZE',
        'payload':restaurants
    }
}
