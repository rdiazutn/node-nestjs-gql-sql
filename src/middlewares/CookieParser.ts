import cookieParser from 'cookie-parser'

const CookieParser = cookieParser()

const ParserInContext = (ctx) => {
  CookieParser(ctx.req, ctx.res, () => {})
  console.log('---Cookie parser---', Object.keys(ctx.req.cookies).length)
  if (Object.keys(ctx.req.cookies).length > 0) {
    console.log(ctx.req.cookies)
  }
  return ctx
}

export default ParserInContext