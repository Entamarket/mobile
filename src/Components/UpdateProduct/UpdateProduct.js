import {
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  ScrollView,
  View,
} from "react-native";
import { useEffect, useState } from "react";
import TextInputBox from "../../UIComponents/TextInput/TextInput";
import ButtonPrimary from "../../UIComponents/Button-Primary/Button-Primary";
import Feather from "@expo/vector-icons/Feather";
import * as ImagePicker from "expo-image-picker";
import Error from "../../UIComponents/Error/Error";
import { useRoute } from "@react-navigation/native";
import entamarketApi from "../../api/entamarketApi";
import AsyncStorage from "@react-native-async-storage/async-storage";
import setToken from "../../utilities/tokenUpdater";
import LoadingModal from "../../UIComponents/LoadingModal";
import { useNavigation } from "@react-navigation/native";
import Dropdown from "../../UIComponents/Dropdown/Dropdown";

const UpdateProduct = () => {
  const [value, setValue] = useState("Choose Category");
  const data = [
    "Vehicle",
    "Electronics",
    "Health & Beauty",
    "Electricals",
    "Fashion",
    "Groceries",
    "Babies/kids",
    "Household supplies",
    "Condiment",
    "Home/furniture appliances",
    "Construction, Tools/ repair equipment",
  ];
  const route = useRoute();
  const { shopId, shopName, shopProduct } = route.params;
  const navigation = useNavigation();
  const [images, setImages] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [showDropDown, setShowDropDrown] = useState(false);
  const [prodId, setProdId] = useState("");
  const [error, setError] = useState({
    isVisible: false,
    display: "none",
    errText: "",
  });

  const [productDetails, setProductsDetails] = useState({
    prodName: "",
    prodPrice: "",
    prodCat: "",
    prodDesc: "",
    weight: "",
    stock: "",
  });
  ``;
  useEffect(() => {
    (async () => {
      await ImagePicker.requestMediaLibraryPermissionsAsync();
      setProductsDetails({
        prodName: shopProduct.name,
        prodPrice: shopProduct.price,
        prodCat: shopProduct.category,
        prodDesc: shopProduct.description,
        prodDesc: shopProduct.description,
        weight: shopProduct.weight,
        stock: shopProduct.stock,
      });
      setValue(shopProduct.category);
      setImages(shopProduct.images);
      setProdId(shopProduct._id);
    })();
  }, []);

  const pickImageHandler = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsMultipleSelection: true,
      selectionLimit: 6,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.canceled) {
      if (result.assets.length > 6) {
        setImages([]);
        setError({
          isVisible: true,
          display: "flex",
          errText: "Product image should not be Morethan 6(Six).",
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

  const updateProductHandler = async () => {
    if (productDetails.prodName === "") {
      setError({
        isVisible: true,
        display: "flex",
        errText: "Product name is required",
      });
    } else if (productDetails.prodPrice === "") {
      setError({
        isVisible: true,
        display: "flex",
        errText: "Product price is required",
      });
    } else if (productDetails.stock === "") {
      setError({
        isVisible: true,
        display: "flex",
        errText: "Product Stock is required",
      });
    } else if (productDetails.prodCat === "") {
      setError({
        isVisible: true,
        display: "flex",
        errText: "Product category is required",
      });
    } else if (productDetails.weight === "") {
      setError({
        isVisible: true,
        display: "flex",
        errText: "Product weight is required",
      });
    } else if (productDetails.prodDesc === "") {
      setError({
        isVisible: true,
        display: "flex",
        errText: "Product description is required",
      });
    } else if (images === null) {
      setError({
        isVisible: true,
        display: "flex",
        errText: "Product image is required",
      });
    } else {
      setError({
        isVisible: false,
        display: "none",
        errText: "",
      });
      setIsLoading(true);
      const formData = new FormData();
      formData.append("name", productDetails.prodName);
      formData.append("price", productDetails.prodPrice);
      formData.append("category", productDetails.prodCat);
      formData.append("description", productDetails.prodDesc);
      formData.append("weight", productDetails.weight);
      formData.append("stock", productDetails.stock);

      for (let img of images) {
        if (img.uri) {
          const imgName = img.uri.split("ImagePicker/")[1];
          const imgExt = imgName.split(".")[1];
          formData.append("images", {
            name: imgName,
            uri: img.uri,
            type: `image/${imgExt}`,
          });
        } else {
          const imgName = img.split("/shop-")[1];
          const imgNewName = imgName.split("/")[1];
          const imgExt = imgName.split(".")[1];
          formData.append("images", {
            name: imgNewName,
            uri: img,
            type: `image/${imgExt}`,
          });
        }
      }
      const token = await AsyncStorage.getItem("entamarketToken");
      await entamarketApi
        .put(`/product/update-product?productID=${prodId}`, formData, {
          headers: {
            Accept: "application/json",
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${token}`,
          },
        })
        .then((resp) => {
          setToken(resp.data.entamarketToken);
          setIsLoading(false);
          navigation.navigate("ShopProd", { shopId, shopName });
        })
        .catch((error) => {
          console.log(error.response.data);
          setToken(error.response.data.entamarketToken);
          setIsLoading(false);
          setError({
            isVisible: true,
            display: "flex",
            errText: error.response.data.msg,
          });
        });
    }
  };

  const showDropdownHandler = () => {
    setShowDropDrown(!showDropDown);
  };

  return (
    <ScrollView style={styles.container}>
      {error.isVisible ? (
        <Error display={error.display} text={error.errText} />
      ) : null}

      <TextInputBox
        labelName="Product Name"
        value={productDetails.prodName}
        changeText={(text) => {
          setError({
            isVisible: false,
            display: "none",
            errText: "",
          });
          setProductsDetails((prev) => {
            return {
              prodName: text,
              prodPrice: prev.prodPrice,
              prodCat: prev.prodCat,
              prodDesc: prev.prodDesc,
              weight: prev.weight,
              stock: prev.stock,
            };
          });
        }}
      />
      <TextInputBox
        labelName="Product Price"
        keyboardType="numeric"
        value={productDetails.prodPrice}
        changeText={(text) => {
          setError({
            isVisible: false,
            display: "none",
            errText: "",
          });
          setProductsDetails((prev) => {
            return {
              prodName: prev.prodName,
              prodPrice: text,
              prodCat: prev.prodCat,
              prodDesc: prev.prodDesc,
              weight: prev.weight,
              stock: prev.stock,
            };
          });
        }}
      />
      <TextInputBox
        labelName="Product Quantity (In Stock)"
        keyboardType="numeric"
        value={productDetails.stock}
        changeText={(text) => {
          setError({
            isVisible: false,
            display: "none",
            errText: "",
          });

          setProductsDetails((prev) => {
            return {
              prodName: prev.prodName,
              prodPrice: prev.prodPrice,
              prodCat: prev.prodCat,
              prodDesc: prev.prodDesc,
              weight: prev.weight,
              stock: text,
            };
          });
        }}
      />

      <TextInputBox
        labelName="Product Weight"
        value={productDetails.weight}
        changeText={(text) => {
          setError({
            isVisible: false,
            display: "none",
            errText: "",
          });

          setProductsDetails((prev) => {
            return {
              prodName: prev.prodName,
              prodPrice: prev.prodPrice,
              prodCat: prev.prodCat,
              prodDesc: prev.prodDesc,
              weight: text,
              stock: prev.stock,
            };
          });
        }}
      />

      <Dropdown
        showDropDown={showDropDown}
        showDropdownHandler={showDropdownHandler}
        setProductInfo={setProductsDetails}
        setShowDropDown={setShowDropDrown}
        setError={setError}
        value={value}
        setValue={setValue}
        data={data}
        type="Product Category"
      />

      <TextInputBox
        labelName="Product Description"
        value={productDetails.prodDesc}
        multiline={true}
        changeText={(text) => {
          setError({
            isVisible: false,
            display: "none",
            errText: "",
          });
          setProductsDetails((prev) => {
            return {
              prodName: prev.prodName,
              prodPrice: prev.prodPrice,
              prodCat: prev.prodCat,
              prodDesc: text,
              weight: prev.weight,
              stock: prev.stock,
            };
          });
        }}
      />
      <TouchableOpacity style={styles.prodImg} onPress={pickImageHandler}>
        <Feather name="camera" size={20} />
        <Text style={styles.prodImgText}>Choose Product Images</Text>
      </TouchableOpacity>

      {images && (
        <ScrollView horizontal>
          {images.map((img) => (
            <View
              style={styles.imageConBox}
              key={
                img.assetId
                  ? img.assetId + Math.random() * 10000
                  : img + Math.random()
              }
            >
              <Image
                source={{ uri: img.uri ? img.uri : img }}
                style={styles.imageBox}
              />
            </View>
          ))}
        </ScrollView>
      )}

      {isLoading ? <LoadingModal visible={isLoading} /> : null}
      <ButtonPrimary value="Save Changes" btnAction={updateProductHandler} />
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#fff",
    flex: 1,
    paddingHorizontal: 20,
  },
  prodImg: {
    marginVertical: 10,
    alignItems: "center",
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
  imageBox: {
    width: 100,
    height: 100,
    resizeMode: "contain",
  },
});

export default UpdateProduct;
