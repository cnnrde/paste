// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { NextApiRequest, NextResponse } from 'next/server'
import db from '../../lib/connectDeta'
import { nanoid } from 'nanoid'

/**
 * @param {NextApiRequest} req
 * @param {NextResponse} res
 */

export default function handler(req, res) {
  if (req.method !== 'POST') {
    res.status(405).end()
    return
  }
  // parse body as json
  let body
  try {
    body = JSON.parse(req.body)
  } catch (e) {
    res.status(400).end()
    return
  }

  // validate body
  if (!body.content && !body.language) {
    res.status(400).end()
    return
  }

  // generate id
  const id = nanoid(7)
  // save to db
  db.put({
    id,
    content: body.content,
    language: body.language,
  })
    .then(() => {
      res.status(200).json({ id })
    })
    .catch((err) => {
      console.error(err)
      res.status(500).end()
    })
}
