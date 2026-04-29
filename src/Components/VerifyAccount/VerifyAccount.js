import {
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  ScrollView,
  View,
} from "react-native";
import { useEffect, useState } from "react";
import ButtonPrimary from "../../UIComponents/Button-Primary/Button-Primary";
import Feather from "@expo/vector-icons/Feather";
import * as ImagePicker from "expo-image-picker";
import Error from "../../UIComponents/Error/Error";
import entamarketApi from "../../api/entamarketApi";
import AsyncStorage from "@react-native-async-storage/async-storage";
import setToken from "../../utilities/tokenUpdater";
import LoadingModal from "../../UIComponents/LoadingModal";
import { useNavigation } from "@react-navigation/native";

const VerifyAccount = () => {
  const navigation = useNavigation();
  const [images, setImages] = useState(null);
  const [images2, setImages2] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState({
    isVisible: false,
    display: "none",
    errText: "",
  });

  useEffect(() => {
    (async () => {
      await ImagePicker.requestMediaLibraryPermissionsAsync();
    })();
  }, []);

  const pickImageHandler = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      selectionLimit: 1,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.canceled) {
      if (result.assets.length > 6) {
        setImages([]);
        setError({
          isVisible: true,
          display: "flex",
          errText: "Only 1 ID Image is required",
        });
      } else {
        setImages(result.assets);
        setError({
          isVisible: false,
          display: "none",
          errText: "",
        });
      }
    }
  };

  const pickImageHandler2 = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      selectionLimit: 1,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.canceled) {
      if (result.assets.length > 6) {
        setImages2([]);
        setError({
          isVisible: true,
          display: "flex",
          errText: "Only 1 Shop Utility Bill is required",
        });
      } else {
        setImages2(result.assets);
        setError({
          isVisible: false,
          display: "none",
          errText: "",
        });
      }
    }
  };

  const addProductsHandler = async () => {
    if (images === null || images2 === null) {
      setError({
        isVisible: true,
        display: "flex",
        errText: "Please upload the documents required",
      });
    } else {
      setError({
        isVisible: false,
        display: "none",
        errText: "",
      });
      setIsLoading(true);

      const formData = new FormData();

      for (let img of images) {
        const imgName = img.uri.split("ImagePicker/")[1];
        const imgExt = imgName.split(".")[1];
        formData.append("idCard", {
          name: imgName,
          uri: img.uri,
          type: `image/${imgExt}`,
        });
      }

      for (let img of images2) {
        const imgName = img.uri.split("ImagePicker/")[1];
        const imgExt = imgName.split(".")[1];
        formData.append("utilityBill", {
          name: imgName,
          uri: img.uri,
          type: `image/${imgExt}`,
        });
      }

      const token = await AsyncStorage.getItem("entamarketToken");
      await entamarketApi
        .post(`trader/upload-verification-docs`, formData, {
          headers: {
            Accept: "application/json",
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${token}`,
          },
        })
        .then((resp) => {
          setIsLoading(false);
          if (resp.data.msg === "success") {
            navigation.navigate("Dashboard");
          } else {
            setError({
              isVisible: true,
              display: "flex",
              errText: resp.data.msg,
            });
          }
        })
        .catch((error) => {
          setToken(error.response.data.entamarketToken);
          setIsLoading(false);
          console.log(error.response);
        });
    }
  };

  return (
    <ScrollView style={styles.container}>
      <Text>
        Please fill in the from below to continue with your Account
        verification, you are required to Upload any of the following documents.
      </Text>

      <View style={styles.textpContainer}>
        <Text style={styles.textp}>
          1. Government issued ID Card (NIN/Voter's Card/Driver's License)
        </Text>

        <Text>
          2. Shop Utility Bills Document (Electricity Bill/Water Bills/Shop Rent
          Receipt)
        </Text>
      </View>

      {error.isVisible ? (
        <Error display={error.display} text={error.errText} />
      ) : null}
      <TouchableOpacity style={styles.prodImg} onPress={pickImageHandler}>
        <Feather name="camera" size={20} />
        <Text style={styles.prodImgText}>Upload Government issued ID Card</Text>
      </TouchableOpacity>

      {images && (
        <ScrollView horizontal>
          {images.map((img) => (
            <View
              style={styles.imageConBox}
              key={img.assetId + Math.random() * 10000}
            >
              <Image source={{ uri: img.uri }} style={styles.imageBox} />
            </View>
          ))}
        </ScrollView>
      )}
      <TouchableOpacity style={styles.prodImg} onPress={pickImageHandler2}>
        <Feather name="camera" size={20} />
        <Text style={styles.prodImgText}>Upload Shop Utility Bills</Text>
      </TouchableOpacity>

      {images2 && (
        <ScrollView horizontal>
          {images2.map((img) => (
            <View
              style={styles.imageConBox}
              key={img.assetId + Math.random() * 10000}
            >
              <Image source={{ uri: img.uri }} style={styles.imageBox} />
            </View>
          ))}
        </ScrollView>
      )}

      {isLoading ? <LoadingModal visible={isLoading} /> : null}
      <ButtonPrimary value="Verify Account" btnAction={addProductsHandler} />
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#fff",
    flex: 1,
    paddingHorizontal: 10,
  },
  prodImg: {
    marginVertical: 15,
    alignItems: "center",
    borderColor: "#ccc",
    borderWidth: 2,
    borderStyle: "dashed",
    paddingVertical: 10,
  },
  prodImgText: {
    // fontWeight: "600",
  },
  imageConBox: {
    borderColor: "#ccc",
    borderWidth: 1,
    borderStyle: "dotted",
    marginRight: 13,
    padding: 3,
  },
  textpContainer: {
    marginVertical: 10,
  },
  textp: {
    marginBottom: 10,
  },
  imageBox: {
    width: 100,
    height: 100,
    resizeMode: "contain",
  },
});

export default VerifyAccount;
