import { Dimensions, StyleSheet, View } from "react-native";
import Pdf from "react-native-pdf"

const PdfRead = ({ src }) => {
    const PdfResource = { uri: src, cache: true };
    return (
        // <Text></Text>
        <View style={{ flex: 1 }}>
            <Pdf
                trustAllCerts={false}
                source={PdfResource}
                style={styles.pdf}
                onLoadComplete={(numberOfPages, filePath) =>
                    console.log(numberOfPages)}
            />
        </View>
    )

}
export default PdfRead;
const styles = StyleSheet.create({
    pdf: {
        flex: 1,
        // width: Dimensions.get('window').width,
        height: Dimensions.get('window').height
    }
})