import { View, StyleSheet } from "react-native";
import { createShimmerPlaceholder } from "react-native-shimmer-placeholder";
import { LinearGradient } from "expo-linear-gradient";

const Shimmer = createShimmerPlaceholder(LinearGradient);

function Card() {
  return (
    <View style={styles.card}>
      <View style={styles.imageWrap}>
        <Shimmer style={styles.image} />
      </View>

      <View style={styles.info}>
        <Shimmer style={styles.line1} />
        <Shimmer style={styles.line2} />

        <View style={styles.stockRow}>
          <Shimmer style={styles.stockText} />
          <Shimmer style={styles.stockBar} />
        </View>
      </View>
    </View>
  );
}

export default function HomeProductsShimmer({ count = 8 }) {
  return (
    <View style={styles.grid}>
      {Array.from({ length: count }).map((_, idx) => (
        <Card key={idx} />
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  grid: {
    flexDirection: "row",
    flexWrap: "wrap",
    paddingHorizontal: 8,
    backgroundColor: "#fff",
    flex: 1,
  },
  card: {
    width: "48%",
    margin: "1%",
    backgroundColor: "#fff",
    borderRadius: 10,
    borderColor: "#eee",
    borderWidth: 1,
    paddingTop: 15,
    overflow: "hidden",
  },
  imageWrap: {
    alignItems: "center",
  },
  image: {
    width: 60,
    height: 60,
    borderRadius: 8,
  },
  info: {
    padding: 8,
    alignItems: "center",
  },
  line1: {
    height: 12,
    width: "85%",
    borderRadius: 6,
    marginTop: 8,
  },
  line2: {
    height: 12,
    width: "55%",
    borderRadius: 6,
    marginTop: 8,
    marginBottom: 6,
  },
  stockRow: {
    width: "100%",
    paddingHorizontal: 12,
    marginTop: 8,
    marginBottom: 10,
  },
  stockText: {
    height: 10,
    width: "50%",
    borderRadius: 6,
    marginBottom: 8,
  },
  stockBar: {
    height: 6,
    width: "100%",
    borderRadius: 100,
  },
});

