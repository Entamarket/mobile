import { useState } from "react";
import { Drawer, Modal, Portal } from "react-native-paper";

const DashboardDrawer = (props) => {
  const [active, setActive] = useState("");
  return (
    <Portal>
      <Modal
        visible={props.showSideDrawer}
        onDismiss={props.closeShowDrawerMenu}
      >
        <Drawer.Section
          title="Menu"
          style={{ backgroundColor: "#fff", paddingVertical: 40 }}
        >
          <Drawer.Item
            label="Create Shop"
            active={active === "createshop"}
            onPress={() => {
              if (props.confirmTrader === null) {
                props.setshowVerifyBox(true);
              } else if (props.confirmTrader === false) {
                props.setIsPendModal(true);
              } else {
                setActive("createshop");
                props.setCreateShop(true);
                props.setshowSideDrawer(false);
              }
            }}
            icon="store-alert"
          />
          <Drawer.Item
            label="Payment Account"
            active={active === "addaccount"}
            onPress={() => {
              setActive("addaccount");
              props.navigationHandler();
            }}
            icon="bank"
          />

          <Drawer.Item
            label="Request Payment"
            active={active === "requestPayment"}
            onPress={() => {
              props.navigateToRequestPayment();
              props.setshowSideDrawer(false);
              setActive("requestPayment");
            }}
            icon="credit-card-outline"
            style={{ marginBottom: 20 }}
          />
        </Drawer.Section>
      </Modal>
    </Portal>
  );
};

export default DashboardDrawer;
