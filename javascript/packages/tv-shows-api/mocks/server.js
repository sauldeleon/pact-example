const { setupServer } = require('msw/node')
const { rest } = require('msw')

const handlers = [
  rest.get('*/duration/:tvShowId', (req, res, ctx) => {
    const { tvShowId } = req.params

    return res(
      ctx.json({
        id: tvShowId,
        duration_min: 60,
      }),
    )
  }),
]

module.exports = { setupServer: setupServer(...handlers), mockServerPort: 1111 }
