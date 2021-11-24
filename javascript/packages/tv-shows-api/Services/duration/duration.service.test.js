const DurationService = require('./duration.service')

describe('Duration service', () => {
  it('Handles get duration for a given id correctly', () => {
    const durationService = new DurationService('http://localhost', global.mockServerPort)
    durationService.getTvShowDuration(42).then(response => {
      expect(response).toEqual(60)
    })
  })
})
