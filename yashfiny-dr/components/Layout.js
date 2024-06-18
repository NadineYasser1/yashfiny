import { View } from 'react-native'
import useLoading from '../hooks/useLoading'
import LoadingSpinner from './LoadingScreen'
const Layout = ({ loading, children, style }) => {
    return (
        <View style={[{ flex: 1 }, style]}>
            {children}
            {loading && <LoadingSpinner notFromNav={true} />}
        </View>
    )
}

export default Layout