import React from "react";
import { View, Text, ViewStyle, TextStyle,StyleSheet } from "react-native";
import ModalSelector from "react-native-modal-selector";
import { AppColors } from "../../shared/Config";

export interface DropDownModel {
    key: string,
    label: string
}
export interface DropDownModalSelectorProps {
    placeholder: string,
    listKeyLable: DropDownModel[],
    onChange: (selectedKey: string, selectedLabel: string) => void,
    selectStyle?: ViewStyle,
    initValueTextStyle?: TextStyle,
    overrideProps?: any,
  
}

export default function DropDownModalSelector(props: DropDownModalSelectorProps) {

    const { placeholder, listKeyLable, onChange, overrideProps, selectStyle = {}, initValueTextStyle = {} } = props;
    // console.log(selectStyle, "selectStyle-ddl")
    
    return (
    
        <ModalSelector
        
            data={listKeyLable}
            initValueTextStyle={
                {
                    color: "#000",
                    textAlign: "left",
                    ...initValueTextStyle
                }
            }
            selectStyle={{
                // textAlign: "left",
                // padding: 2,
                borderColor: AppColors.appSecondaryColor,
                ...selectStyle,
            }}
            cancelText={"Cancel"}
            selectedItemTextStyle={{ fontWeight: "bold" }}
            optionContainerStyle={{ opacity: 1 }}
            // selectTextStyle={{ textAlign: "left" }}
            initValue={placeholder ?? "Select"}
            onChange={(option) => {
                if (option.key && option.label) {
                    onChange(option.key.toString(), option.label.toString());
                } else {
                    onChange(option.key.toString(), '');
                }
                //   alert(`${option.label} (${option.key}) nom nom nom`);
            }}
            {...overrideProps}
        />
        
   
    );
}
