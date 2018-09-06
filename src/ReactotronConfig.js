import Reactotron from 'reactotron-react-js'
import { reactotronRedux as reduxPlugin } from 'reactotron-redux'
import sagaPlugin from 'reactotron-redux-saga'
import tronsauce from 'reactotron-apisauce'

const reactotron = Reactotron
  .configure({ name: 'Shaka code' })
  .use(reduxPlugin())
  .use(sagaPlugin())
  .use(tronsauce())
  .connect()

export default reactotron
