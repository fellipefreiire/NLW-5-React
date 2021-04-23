import { NextApiRequest, NextApiResponse } from 'next'
import data from '../../../../utils/data'

export default (req: NextApiRequest, res: NextApiResponse) => {
  const { slug } = req.query

  const result = data.episodes.filter(episode => episode.id === slug)

  const episode = result[0]

  res.status(200).json({
    episode
  })
}
