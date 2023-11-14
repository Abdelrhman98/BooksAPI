import _ from 'lodash';
import ODM from '../../../config/ODM.js'
import bookSchema from '../schema/index.js'

class bookModel extends ODM {
  constructor() {
    super()
    this.COLLECTION = bookSchema;
  }
}
export default new bookModel();