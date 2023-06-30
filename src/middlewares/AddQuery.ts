import { MiddlewareFn } from 'type-graphql';
import Context from '../types/global/Context'

const AddQuery : MiddlewareFn<Context> = ({ context, info, ...args }, next) => {
  // console.log({ context, info, args});
  return next();
}

export default AddQuery