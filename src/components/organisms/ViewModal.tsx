import React, { useEffect, useRef, useState } from "react";
import { ScrollView, StyleProp, TextStyle, ViewComponent } from "react-native";
import { View, StyleSheet, Dimensions } from "react-native";
import { Text, Button, Overlay } from "react-native-elements";
import GlobalStyles from "../../shared/GlobalStyles";

const { width,height } = Dimensions.get("window");

export interface ViewModalProps {
    isVisible: boolean,
    setIsVisible?: any,
    children?: React.ReactElement,
    title?: string,
    titleStyle?: StyleProp<TextStyle>,
    onDismiss?: () => void,
    onSubmit?: () => void,
    closeTextOverride?: string,
    submitTextOverride?: string,
    isLoading?: boolean,
    actionButtons?: React.ReactElement,
    hideActionButtons?: boolean,
    hideSubmitButtons?: boolean,
    widthOffset?: number, 
    
}

export default function ViewModal(props: ViewModalProps) {

    const {
        isVisible,
        setIsVisible,
        children,
        title,
        titleStyle,
        onDismiss,
        onSubmit,
        closeTextOverride,
        submitTextOverride,
        isLoading,
        actionButtons,
        hideActionButtons,
        hideSubmitButtons,
        widthOffset = 80, 
    } = props;
   

    const toggleOverlay = () => {
        setIsVisible && setIsVisible(!isVisible);
        if (onDismiss) {
            onDismiss();
        }
    };
    const maxScrollViewHeight = height - 30 - 70; // 70 is the height of the action buttons

    const modalWidth = width - widthOffset; 
    

    return (
        <Overlay
            style={[styles.modalStyle]}
            isVisible={isVisible}
            onBackdropPress={toggleOverlay}
            overlayStyle={[styles.modalStyle, { width: modalWidth}]} 
            onDismiss={() => {
                // alert("onDismiss");
            }}
        >
            <ScrollView  style={{ maxHeight: maxScrollViewHeight }} showsVerticalScrollIndicator={false}>
            <View style={styles.modalBody}>
                {title && <Text style={[styles.titleStyle, titleStyle]}>{title}</Text>}

                <View>{children}</View>
            </View>
            </ScrollView>
            {
                hideActionButtons !== true &&

                <View style={GlobalStyles.rowFlexEnd}>
                    <View style={{ paddingRight: 10 }}>
                        <Button
                            type="outline"
                            title={closeTextOverride ?? "Close"}
                            onPress={toggleOverlay}
                        />
                    </View>
                    {
                        hideSubmitButtons !== true && (

                            <View>
                                <Button
                                    type="solid"
                                    title={submitTextOverride ?? "Submit"}
                                    onPress={() => {
                                        if (onSubmit) {
                                            onSubmit();
                                        }
                                    }}
                                    loading={isLoading}
                                />
                            </View>
                        )
                    }
                    {actionButtons}
                </View>}
        </Overlay>
    );
}

const styles = StyleSheet.create({
    modalStyle: {
        // width: width - 80,
        borderRadius:10
    },
    titleStyle: {
        fontSize: 15,
        fontWeight: "bold",
        marginBottom: 5,
        // textAlign: "center",
    },
    modalBody: {
        // width: width - 80,
        minHeight: 100,
        marginBottom: 10,
    },
});
