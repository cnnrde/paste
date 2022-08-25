// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { NextApiRequest, NextResponse } from 'next/server'
import db from '../../lib/connectDeta'

/**
 * @param {NextApiRequest} req
 * @param {NextResponse} res
 */

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    res.status(405).end()
    return
  }
  // parse body as json
  let body
  try {
    body = JSON.parse(req.body)
  } catch (e) {
    console.log(e)
    res.status(400).end()
    return
  }

  // validate body
  if (!body.id) {
    res.status(400).end()
    console.log(req.body)
    return
  }

  // get paste from db
  const paste = await db
    .fetch({
      id: body.id,
    })
    .catch((err) => {
      console.error(err)
      res.status(500).end()
    })

  // send paste to client
  if (!paste.items[0]) {
    res.status(404).end()
    return
  }
  res.status(200).json({
    content: paste.items[0].content,
    language: paste.items[0].language,
  })
}
