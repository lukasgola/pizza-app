import {createAppContainer} from 'react-navigation'
import {createStackNavigator} from 'react-navigation-stack'

import ViewNotes from '../screens/ViewNotes'
import AddNotes from '../screens/AddNotes'
import Order from '../screens/Order'
import OrderHalf from '../screens/OrderHalf'
import SauceOrder from '../screens/SauceOrder'

import EditNotes from '../screens/EditNotes'
import EditOrder from '../screens/EditOrder'
import EditOrderHalf from '../screens/EditOrderHalf'
import EditSauceOrder from '../screens/EditSauceOrder'


const StackNavigator = createStackNavigator({
ViewNotes: {
    screen: ViewNotes
},
AddNotes:{
    screen: AddNotes
},
Order: {
    screen: Order
},
OrderHalf: {
    screen: OrderHalf
},
SauceOrder: {
    screen: SauceOrder
},

EditNotes:{
    screen: EditNotes
},
EditOrder: {
    screen: EditOrder
},
EditOrderHalf: {
    screen: EditOrderHalf
},
EditSauceOrder: {
    screen: EditSauceOrder
},
},
{
    initialRouteName: 'ViewNotes',
    headerMode : 'none',
    mode: 'modal'
}
)

export default createAppContainer(StackNavigator)


