import { View, Text, StyleSheet } from 'react-native';
import ProgressBar from 'react-native-progress/Bar';
const Progress = ({ month, progress }) => {

  return (
    <View style={{ alignItems: 'center', flex: 1 }}>
      <View style={{ transform: [{ rotate: '270deg' }] }}>
        <ProgressBar progress={progress}
          width={50}
          height={10}
          borderRadius={10}
          borderWidth={0}
          color="white" // Set filled color to white
          unfilledColor="#b8e1f1" // Set unfilled color to #b8e1f1
          animated={false}

        />
      </View>
      <View style={{ marginHorizontal: 3 }}>
        <Text style={styles.monthLabel}>{month}</Text>
      </View>
    </View>
  );
}
const styles = StyleSheet.create({
  monthLabel: {
    color: 'white',
    marginTop: 23,
    fontSize: 10
  }
})
export default Progress;