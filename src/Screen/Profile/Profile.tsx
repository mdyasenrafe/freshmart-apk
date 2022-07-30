import React, { useState } from "react";
import { Image, Modal, StyleSheet, TouchableOpacity, View } from "react-native";
import { ScrollView } from "react-native-gesture-handler";
import { useDispatch, useSelector } from "react-redux";
import { HeaderComponent } from "../../Components/HeaderComponent";
import OwnText from "../../Components/Text/OwnText";
import { Colors } from "../../Components/Theme/Color";
import Toast from "react-native-toast-message";
import {
  Ionicons,
  Feather,
  AntDesign,
  MaterialIcons,
} from "@expo/vector-icons";
import Button from "../../Components/Button";
import {
  Logout,
  EmailSuccessAction,
  ProfileSuccessAction,
} from "../../Redux/Action";

const linkData: linkDataType[] = [
  {
    id: 1,
    name: "Profile Information",
    link: "ProfileInformation",
    iconName: "user",
    iconType: "Feather",
  },
  {
    id: 2,
    name: "History",
    link: "History",
    iconName: "shoppingcart",
    iconType: "AntDesign",
  },
  {
    id: 3,
    name: "My Favourites",
    link: "Favourites",
    iconName: "favorite",
    iconType: "MaterialIcons",
  },
  {
    id: 4,
    name: "Nofification",
    link: "Notification",
    iconName: "notifications-sharp",
    iconType: "Ionicons",
  },
];

export default function Profile({ navigation }: any) {
  const { email } = useSelector((state: any) => state);
  const [modalVisible, setModalVisible] = useState<boolean>(false);
  const dispatch: any = useDispatch();
  const handleLogout = () => {
    dispatch(Logout())
      .then(() => {
        setModalVisible(false);
        dispatch(EmailSuccessAction(null));
        dispatch(ProfileSuccessAction(null));
        Toast.show({
          type: "success",
          text1: "Logout successfully",
        });
      })
      .catch((err: any) => {
        Toast.show({
          type: "error",
          text1: err.message,
        });
      });

    setModalVisible(true);
  };

  return (
    <>
      <HeaderComponent routes={"Profile"} />
      <ScrollView>
        <View style={{ flex: 1, marginHorizontal: 16 }}>
          <View style={styles.image_area}>
            <Image
              source={{ uri: email?.user?.photoUrl }}
              style={{ width: 90, height: 90, borderRadius: 50 }}
            />
          </View>
          <OwnText
            preset="h5"
            style={{ textAlign: "center", marginBottom: 16 }}
          >
            {email?.user?.name}
          </OwnText>

          {linkData.map((item: linkDataType) => (
            <TouchableOpacity
              onPress={() => navigation.navigate(item.link)}
              key={item.id}
              style={styles.link_area}
            >
              <View style={styles.iconArea}>
                {item.iconType === "Feather" ? (
                  <Feather name={item.iconName} size={24} color="black" />
                ) : item.iconType === "AntDesign" ? (
                  <AntDesign name={item.iconName} size={24} color="black" />
                ) : item.iconType === "MaterialIcons" ? (
                  <MaterialIcons name={item.iconName} size={24} color="black" />
                ) : (
                  <Ionicons name={item.iconName} size={24} color="black" />
                )}
                <OwnText style={styles.text} preset="h6">
                  {item.name}
                </OwnText>
              </View>
              <Ionicons
                name="chevron-forward-outline"
                size={24}
                color="black"
              />
            </TouchableOpacity>
          ))}
        </View>
      </ScrollView>
      <TouchableOpacity
        onPress={() => setModalVisible(true)}
        style={[styles.button, styles.mxAuto]}
      >
        <MaterialIcons name="logout" size={24} color="black" />
        <View style={styles.mxAuto}>
          <OwnText preset="h6">Logout</OwnText>
        </View>
      </TouchableOpacity>

      <Modal animationType="slide" transparent={true} visible={modalVisible}>
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <OwnText preset="bold">Do you want to Logout?</OwnText>

            <View style={{ flexDirection: "row", marginTop: 24 }}>
              <Button
                onPress={handleLogout}
                style={{ borderRadius: 8, width: 78, marginHorizontal: 16 }}
                title="Yes"
              />
              <Button
                style={{
                  borderRadius: 8,
                  width: 78,
                  backgroundColor: Colors.black,
                }}
                title="No"
                onPress={() => setModalVisible(false)}
              />
            </View>
          </View>
        </View>
      </Modal>
    </>
  );
}

const styles = StyleSheet.create({
  image_area: {
    marginLeft: "auto",
    marginRight: "auto",
    marginTop: 16,
    backgroundColor: Colors.white,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 0.5,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 2,
    padding: 16,
    borderRadius: 30,
    width: 120,
    marginBottom: 24,
  },
  link_area: {
    paddingHorizontal: 16,
    paddingVertical: 20,
    borderWidth: 1,
    borderRadius: 16,
    borderColor: Colors.white,
    backgroundColor: Colors.white,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 0.5,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 2,
    marginVertical: 8,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  iconArea: {
    flexDirection: "row",
    alignItems: "center",
  },
  text: {
    marginLeft: 12,
  },
  button: {
    width: "90%",
    flexDirection: "row",
    alignItems: "center",
    marginHorizontal: 16,
    marginVertical: 26,
    borderRadius: 8,
    backgroundColor: "#F2F3F2",
    padding: 14,
  },
  mxAuto: {
    marginLeft: "auto",
    marginRight: "auto",
  },
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 22,
  },
  modalView: {
    width: "90%",
    backgroundColor: "white",
    borderRadius: 20,
    padding: 35,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
});
