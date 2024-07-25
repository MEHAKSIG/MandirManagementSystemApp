import React from 'react'
import { View, Text, Image } from 'react-native'
import {
    AntDesign,
    Ionicons,
    Entypo,
    MaterialCommunityIcons,
    FontAwesome,
    FontAwesome5,
    MaterialIcons,
    Octicons,
    Feather,
    SimpleLineIcons
} from "@expo/vector-icons/";

export interface IconProps {
    size?: number,
    color?: string,
    overrideProps?: any,
    width?: number,
    height?: number
}
export interface CustomIconProps {
    name: string;
    size?: number,
    color?: string,
    overrideProps?: any,
    width?: number,
    height?: number
}
export function BuildingIcon({ size = 24, color = "#fff", ...props }) {
    return <FontAwesome5 name="building" size={size} color={color} {...props} />;
}
export function PassIcon(props: IconProps) {
    const { size = 24, color = "#000", overrideProps } = props;
    return <FontAwesome name="id-badge" size={size} color={color} {...overrideProps} />;
}
export function CustomIcon(props: CustomIconProps) {
    const { size = 24, color = "#000", overrideProps,name } = props;
    return <AntDesign name={name} size={size} color={color} {...overrideProps} />;
}
export function EventsIcon(props: IconProps) {
    const { size = 24, color = "#000", overrideProps } = props;
    return <AntDesign name="calendar" size={size} color={color} {...overrideProps} />;
}
export function DeleteIcon({ size = 24, color = "red", ...props }) {
    return <FontAwesome5 name="trash-alt" size={size} color={color} {...props} />;
  }
export function CloseIcon(props: IconProps) {
    const { size = 24, color = "#000", overrideProps } = props;
    return <Ionicons name="close" size={size} color={color} {...overrideProps} />;
}
export function DonateIcon(props: IconProps) {
    const { size = 24, color = "#000", overrideProps } = props;
    return <Ionicons name="heart-outline" size={size} color={color} {...overrideProps} />;
}
export function UserIcon(props: IconProps) {
    const { size = 24, color = "#000", overrideProps } = props;
    return <AntDesign name="user" size={size} color={color} {...overrideProps} />;
}
export function AddUserIcon(props: IconProps) {
    const { size = 24, color = "#000", overrideProps } = props;
    return <AntDesign name="addusergroup" size={size} color={color} {...overrideProps} />;
}
export function FlipCameraIcon(props: IconProps) {
    const { size = 24, color = "#000", overrideProps } = props;
    return <MaterialIcons name="flip-camera-android" size={size} color={color} {...overrideProps} />;
}
export function HoloCircleIcon(props: IconProps) {
    const { size = 24, color = "#000", overrideProps } = props;
    return <Entypo name="circle" size={size} color={color} {...overrideProps} />;
}
export function SolidCircleIcon(props: IconProps) {
    const { size = 24, color = "#000", overrideProps } = props;
    return <FontAwesome name="circle" size={size} color={color} {...overrideProps} />;
}

export function CameraIcon(props: IconProps) {
    const { size = 24, color = "#000", overrideProps } = props;
    return <Ionicons name="ios-camera-outline" size={size} color={color} {...overrideProps} />;
}

export function CameraPlusIcon(props: IconProps) {
    const { size = 24, color = "#000", overrideProps } = props;
    return <MaterialCommunityIcons name="camera-plus" size={size} color={color} {...overrideProps} />;
}
export function ImageMultipleIcon(props: IconProps) {
    const { size = 24, color = "#000", overrideProps } = props;
    return <MaterialCommunityIcons name="image-multiple" size={size} color={color} {...overrideProps} />;
}

export function DocumentIcon(props: IconProps) {
    const { size = 24, color = "#000", overrideProps } = props;
    return <AntDesign name="filetext1" size={size} color={color} {...overrideProps} />;
}

export function DashboardIcon(props: IconProps) {
    const { size = 24, color = "#000", overrideProps } = props;
    return <AntDesign name="dashboard" size={size} color={color} {...overrideProps} />;
}
export function ReportIcon(props: IconProps) {
    const { size = 24, color = "#000", overrideProps } = props;
    return <Octicons name="graph" size={size} color={color} {...overrideProps} />;
    // <Octicons name="graph" size={24} color="black" />
}

export function UserIcon2(props: IconProps) {
    const { size = 24, color = "#000", overrideProps } = props;
    return <Feather name="user" size={size} color={color} {...overrideProps} />;
}
export function UsersIcon(props: IconProps) {
    const { size = 24, color = "#000", overrideProps } = props;
    return <Feather name="users" size={size} color={color} {...overrideProps} />;
}
export function PasswordIcon(props: IconProps) {
    const { size = 24, color = "#000", overrideProps } = props;
    return <AntDesign name="lock" size={size} color={color} {...overrideProps} />;
}

export function LogoutIcon(props: IconProps) {
    const { size = 24, color = "#000", overrideProps } = props;
    return <Ionicons name="power-sharp" size={size} color={color} {...props} />;
}
export function LoginIcon(props: IconProps) {
    const { size = 24, color = "#000", overrideProps } = props;
    return <Ionicons name="log-in-outline" size={size} color={color} {...props} />;
}
export function CheckSolidCircleIcon(props: IconProps) {
    const { size = 24, color = "#000", overrideProps } = props;
    return (
        <MaterialIcons name="check-circle" size={size} color={color} {...overrideProps} />
    );
}
export function OTPIcon(props: IconProps) {
    const { overrideProps, width = 24, height = 24 } = props;
    return (
        <Image
            source={require("../../assets/icons/otp.png")}
            style={[{ width: width, height: height }]}
            {...overrideProps}
        />
    );
}

export function ShareIcon({ size = 24, color = "#000", ...props }) {
    return <AntDesign name="sharealt" size={size} color={color} {...props} />;
}

export function RefreshIcon({ size = 24, color = "#fff", ...props }) {
    return <Feather name="refresh-ccw" size={size} color={color} {...props} />;
}
export function EyeSlashIcon({ size = 24, color = "#fff", ...props }) {
    return <FontAwesome name="eye-slash" size={size} color={color} {...props} />;
}
export function EyeIcon(props: IconProps) {
    const { overrideProps, size = 24, color = '#000' } = props;
    return <AntDesign name="eyeo" size={size} color={color} {...props} />;
}
export function EyeColorfullImgIcon(props: IconProps) {
    const { overrideProps, width = 24, height = 24 } = props;
    return (
        <Image
            source={require("../../assets/icons/eye_round.png")}
            style={[{ width: width, height: height }]}
            {...props}
        />
    );
}
export function SearchIcon({ size = 24, color = "#000", ...props }) {
    return <Feather name="search" size={size} color={color} {...props} />;
}


export function PlusIcon({ size = 24, color = "#000", ...props }) {
    return <Entypo name="plus" size={size} color={color} {...props} />;
}
export function EditUserIcon({ size = 24, color = "#000", ...props }) {
    return <FontAwesome5 name="user-edit" size={size} color={color} {...props} />;
}
export function EditIcon({ size = 24, color = "#000", ...props }) {
    return <FontAwesome5 name="edit" size={size} color={color} {...props} />;
}

export function FilterIcon({ size = 24, color = "#000", ...props }) {
    return <Feather name="filter" size={size} color={color} {...props} />;
}

export function FirstArrowIcon({ size = 24, color = "#000", ...props }) {
    return <AntDesign name="stepbackward" size={size} color={color} {...props} />;
}
export function PrevArrowIcon({ size = 24, color = "#000", ...props }) {
    return <AntDesign name="caretleft" size={size} color={color} {...props} />;
}
export function NextArrowIcon({ size = 24, color = "#000", ...props }) {
    return <AntDesign name="caretright" size={size} color={color} {...props} />;
}
export function LastArrowIcon({ size = 24, color = "#000", ...props }) {
    return <AntDesign name="stepforward" size={size} color={color} {...props} />;
}

export function FollowupIcon({ size = 24, color = "#000", ...props }) {
    return <SimpleLineIcons name="user-following" size={size} color={color} {...props} />;
}
export function TodayIcon({ size = 24, color = "#000", ...props }) {
    return <Ionicons name="today" size={size} color={color} {...props} />;
}
export function LineChartIcon({ size = 24, color = "#000", ...props }) {
    return <FontAwesome name="line-chart" size={size} color={color} {...props} />;
}
export function AddChartIcon({ size = 24, color = "#000", ...props }) {
    return <MaterialIcons name="addchart" size={size} color={color} {...props} />;
}

{/* <MaterialIcons name="addchart" size={24} color="black" /> */ }
export function FileShareIcon(props: IconProps) {
    const { overrideProps, width = 30, height = 30 } = props;
    return (
        <Image
            source={require("../../assets/icons/file-sharing.png")}
            style={[{ width: width, height: height }]}
            {...overrideProps}
        />
    );
}
export function WhatsAppIcon(props: IconProps) {
    const { overrideProps, width = 30, height = 30 } = props;
    return (
        <Image
            source={require("../../assets/icons/whatsapp.png")}
            style={[{ width: width, height: height }]}
            {...overrideProps}
        />
    );
}
export function ShareOnMobileImgIcon(props: IconProps) {
    const { overrideProps, width = 30, height = 30 } = props;
    return (
        <Image
            source={require("../../assets/icons/sharing-on-mobile.png")}
            style={[{ width: width, height: height }]}
            {...overrideProps}
        />
    );
}