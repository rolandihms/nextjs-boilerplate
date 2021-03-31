// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
//Content-Methods / Functions
import { getMenu, getPage, getContent, getSettings, getToken, getPosts } from '../../src/lib/content-methods';

export default async (req, res) => {
  //console.log('API ROUTE Hello ',process.env)
  const settings = await getSettings({});
  res.status(200).json({ settings: settings })
}
