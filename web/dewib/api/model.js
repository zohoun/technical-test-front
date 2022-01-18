import { Model } from '@dewib/dw-api/utils'

export default class ApiModel extends Model {
  handleRequest (context) {
    context.url = `api/${context.url}`

    return super.handleRequest(context)
  }
}
